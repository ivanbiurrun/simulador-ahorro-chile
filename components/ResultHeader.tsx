'use client';
import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { formatCLP } from '@/lib/formatters';
import { toMonths } from '@/hooks/useSimulador';
import type { SimulatorFormData, SimulationResult } from '@/types';

interface ResultHeaderProps {
  formData: SimulatorFormData;
  result: SimulationResult;
}

function termLabel(fd: SimulatorFormData): string {
  const m = toMonths(fd.termValue, fd.termUnit);
  const y = Math.floor(m / 12);
  const rem = m % 12;
  if (y > 0 && rem > 0) return `${y} año${y > 1 ? 's' : ''} y ${rem} mes${rem > 1 ? 'es' : ''}`;
  if (y > 0) return `${y} año${y > 1 ? 's' : ''}`;
  return `${m} mes${m !== 1 ? 'es' : ''}`;
}

export default function ResultHeader({ formData, result }: ResultHeaderProps) {
  const reduced = useReducedMotion();
  const firedRef = useRef<number | null>(null);
  const completion = Math.min((result.finalAmount / result.targetAmount) * 100, 100);

  useEffect(() => {
    if (result.reachesGoal && !reduced && firedRef.current !== result.finalAmount) {
      firedRef.current = result.finalAmount;
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.3 },
        colors: ['#12B886', '#FF8A3D', '#4DABF7', '#FBF5EC'],
        disableForReducedMotion: true,
      });
    }
  }, [result.reachesGoal, result.finalAmount, reduced]);

  const pillSuccess = 'bg-verde-tint text-verde-oscuro';
  const pillWarn    = 'bg-alerta-tint text-alerta';

  return (
    <div className="mb-2">
      {/* Pill + texto en una línea */}
      <div className="flex items-center gap-2.5 flex-wrap mb-3">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${result.reachesGoal ? pillSuccess : pillWarn}`}>
          {result.reachesGoal ? '✓ Meta alcanzada' : 'Te falta'}
        </span>
        <p className="text-sm text-tinta leading-snug">
          {result.reachesGoal
            ? `Llegas a "${formData.objectiveName}" en ${termLabel(formData)} · te sobran ${formatCLP(result.surplus)}`
            : `"${formData.objectiveName}" · te faltan ${formatCLP(result.gap)}`}
        </p>
      </div>

      {/* Barra de progreso */}
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(22,36,29,0.08)' }}>
        <motion.div
          className={`h-full rounded-full ${result.reachesGoal ? 'bg-verde' : 'bg-alerta'}`}
          initial={{ width: 0 }}
          animate={{ width: `${completion}%` }}
          transition={{ duration: reduced ? 0 : 0.8, ease: 'easeOut' }}
        />
      </div>
      <p className="text-xs mt-1 text-right" style={{ color: 'rgba(22,36,29,0.4)' }}>
        {completion.toFixed(0)}% de la meta
      </p>
    </div>
  );
}
