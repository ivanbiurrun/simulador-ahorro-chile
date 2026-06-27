'use client';
import { useState, useEffect } from 'react';
import type { SimulatorFormData, SimulationResult } from '@/types';

interface TipsPanelProps {
  formData: SimulatorFormData;
  result: SimulationResult;
}

export default function TipsPanel({ formData, result }: TipsPanelProps) {
  const [tips, setTips] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setTips([]);

    const termMonths =
      formData.termUnit === 'años' ? formData.termValue * 12 : formData.termValue;

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
      .then((res) => res.json())
      .then((data) => {
        const parsed: string[] = (data.tips as string)
          .split(/\n\n+/)
          .map((t: string) => t.trim())
          .filter(Boolean);
        setTips(parsed);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [formData, result]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">💡 Consejo educativo</h3>
        <span className="text-xs text-gray-400 bg-white px-2 py-0.5 rounded-full border border-gray-100">
          IA · solo educativo
        </span>
      </div>

      {loading && (
        <div className="space-y-3 animate-pulse">
          {[90, 75, 85].map((w, i) => (
            <div key={i} className="bg-white rounded-xl p-3">
              <div className="h-3 bg-blue-100 rounded-full mb-2" style={{ width: `${w}%` }} />
              <div className="h-3 bg-blue-100 rounded-full" style={{ width: `${w - 20}%` }} />
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-gray-500 text-center py-3">
          No se pudieron cargar los tips ahora. El simulador igual funciona completo.
        </p>
      )}

      {!loading && !error && (
        <div className="space-y-3">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-3.5 text-sm text-gray-700 leading-relaxed shadow-sm border border-blue-50"
            >
              {tip}
            </div>
          ))}
          <p className="text-xs text-gray-400 text-center pt-1">
            Este consejo es educativo y general. No es asesoría financiera ni recomendación personal.
          </p>
        </div>
      )}
    </div>
  );
}
