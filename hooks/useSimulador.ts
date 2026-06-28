import { useMemo } from 'react';
import { simulate } from '@/lib/calculations';
import type { SimulatorFormData, SimulationResult } from '@/types';

function toMonths(value: number, unit: 'días' | 'meses' | 'años'): number {
  if (unit === 'años') return value * 12;
  if (unit === 'días') return Math.max(1, Math.round(value / 30));
  return value;
}

export function useSimulador(formData: SimulatorFormData | null): SimulationResult | null {
  return useMemo(() => {
    if (!formData || formData.targetAmount === 0) return null;
    const termMonths = toMonths(formData.termValue, formData.termUnit);
    return simulate(
      formData.initialAmount,
      formData.monthlyContribution,
      formData.annualRate,
      termMonths,
      formData.targetAmount,
    );
  }, [formData]);
}

export { toMonths };
