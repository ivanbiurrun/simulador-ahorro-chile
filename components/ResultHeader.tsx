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

  return (
    <div className="mb-2">
      {/* Pill + texto */}
      <div className="flex items-center gap-2.5 flex-wrap mb-3">
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1"
          style={
            result.reachesGoal
              ? { background: '#E3F7EF', color: '#0B7A56' }
              : { background: '#FDEBCF', color: '#8A5A0C' }
          }
        >
          {result.reachesGoal ? '✓ Meta alcanzada' : (
            <>
              ↑ Te falta
            </>
          )}
        </span>
        <p className="text-sm leading-snug" style={{ color: '#16241D' }}>
          {result.reachesGoal
            ? `Llegas a "${formData.objectiveName}" en ${termLabel(formData)} · te sobran ${formatCLP(result.surplus)}`
            : `"${formData.objectiveName}" · te faltan ${formatCLP(result.gap)}`}
        </p>
      </div>

      {/* Barra de progreso — anima en los dos casos */}
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#E3F7EF' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: result.reachesGoal ? '#12B886' : '#F4A82C' }}
          initial={{ width: 0 }}
          animate={{ width: `${completion}%` }}
          transition={{ duration: reduced ? 0 : 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
      <p className="text-xs mt-1 text-right" style={{ color: '#7A8077' }}>
        {completion.toFixed(0)}% de la meta
      </p>
    </div>
  );
}
