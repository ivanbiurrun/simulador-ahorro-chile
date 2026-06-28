'use client';
import { useState, useEffect } from 'react';
import { toMonths } from '@/hooks/useSimulador';
import type { SimulatorFormData, SimulationResult } from '@/types';

interface TipReactivoProps {
  formData: SimulatorFormData;
  result: SimulationResult;
}

export default function TipReactivo({ formData, result }: TipReactivoProps) {
  const [tip, setTip] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setTip('');

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
      .then((data) => setTip((data.tips as string).trim()))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [formData, result]);

  return (
    <div className="bg-cielo-tint border border-cielo/25 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-tinta text-sm">💡 Consejo educativo</h3>
        <span className="text-xs text-cielo bg-white px-2.5 py-0.5 rounded-full border border-cielo/30">
          IA · solo educativo
        </span>
      </div>

      {loading && (
        <div className="animate-pulse space-y-2">
          <div className="h-3 bg-cielo/25 rounded-full w-full" />
          <div className="h-3 bg-cielo/25 rounded-full w-5/6" />
          <div className="h-3 bg-cielo/25 rounded-full w-4/6" />
        </div>
      )}

      {error && (
        <p className="text-sm text-gray-400 text-center py-2">
          No se pudo cargar el consejo ahora. El simulador igual funciona completo.
        </p>
      )}

      {!loading && !error && tip && (
        <>
          <p className="text-sm text-tinta leading-relaxed">{tip}</p>
          <p className="text-xs text-gray-400 mt-3 border-t border-cielo/20 pt-3">
            Educativo y general. No es asesoría financiera ni recomendación personal.
          </p>
        </>
      )}
    </div>
  );
}
