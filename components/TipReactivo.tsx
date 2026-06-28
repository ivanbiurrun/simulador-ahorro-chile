'use client';
import { useState, useEffect } from 'react';
import { formatCLP } from '@/lib/formatters';
import { toMonths } from '@/hooks/useSimulador';
import type { SimulatorFormData, SimulationResult } from '@/types';

interface TipReactivoProps {
  formData: SimulatorFormData;
  result: SimulationResult;
}

function localTip(result: SimulationResult, formData: SimulatorFormData): string {
  const termMonths = toMonths(formData.termValue, formData.termUnit);
  const clp = formatCLP;

  if (result.reachesGoal) {
    if (result.surplus < result.targetAmount * 0.04) {
      return `Justo llegas. Para tener un colchón, suma un par de meses de aporte — es mejor llegar con margen que exacto.`;
    }
    return `Te sobran ${clp(result.surplus)}. Si no los necesitas para "${formData.objectiveName}", en un fondo mutuo podrían seguir creciendo en vez de quedarse quietos en la cuenta.`;
  }

  const extraNeeded = Math.ceil((result.gap / termMonths) / 1000) * 1000;
  return `Te faltan ${clp(result.gap)}. Sube el aporte mensual en ~${clp(extraNeeded)} o extiende el plazo unos meses para llegar — ambas palancas se potencian con el interés compuesto.`;
}

export default function TipReactivo({ formData, result }: TipReactivoProps) {
  const [tip, setTip] = useState(() => localTip(result, formData));
  const [fromAI, setFromAI] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTip(localTip(result, formData));
    setFromAI(false);
    setLoading(true);

    const termMonths = toMonths(formData.termValue, formData.termUnit);

    fetch('/api/tips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        objectiveName: formData.objectiveName,
        targetAmount: result.targetAmount,
        finalAmount: result.finalAmount,
        productType: formData.productType,
        annualRate: formData.annualRate,
        termMonths,
        reachesGoal: result.reachesGoal,
        surplus: result.surplus,
        gap: result.gap,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        const aiTip = (data.tips as string).trim();
        if (aiTip) {
          setTip(aiTip);
          setFromAI(true);
        }
      })
      .catch(() => { /* mantener localTip */ })
      .finally(() => setLoading(false));
  }, [formData, result]);

  return (
    <div className="rounded-2xl p-4 border" style={{ background: '#E7F2FD', borderColor: 'rgba(77,171,247,0.2)' }}>
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="font-semibold text-sm" style={{ color: '#1565A8' }}>💡 Consejo</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-white" style={{ color: '#4DABF7', border: '1px solid rgba(77,171,247,0.3)' }}>
          {loading ? 'cargando…' : fromAI ? 'IA · educativo' : 'educativo'}
        </span>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: '#16241D' }}>{tip}</p>

      <p className="text-[11px] mt-3 pt-2.5" style={{ borderTop: '1px solid rgba(77,171,247,0.15)', color: 'rgba(22,36,29,0.4)' }}>
        Educativo y general. No es asesoría financiera ni recomendación personal.
      </p>
    </div>
  );
}
