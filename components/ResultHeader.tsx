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
  // Clave compuesta: re-dispara si cambia amount O si cambia el estado (alcanza/no)
  const fireKey = `${Math.round(result.finalAmount)}-${result.reachesGoal}`;
  const firedRef = useRef<string | null>(null);
  const completion = Math.min((result.finalAmount / result.targetAmount) * 100, 100);
  const glowAmbar = !result.reachesGoal && !reduced;

  useEffect(() => {
    if (reduced) return;
    if (firedRef.current === fireKey) return;
    firedRef.current = fireKey;

    if (result.reachesGoal) {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.3 },
        colors: ['#12B886', '#FF8A3D', '#4DABF7', '#FBF5EC'],
        disableForReducedMotion: true,
      });
    } else {
      // Burst ámbar visible — ánimo, no fracaso
      confetti({
        particleCount: 45,
        spread: 52,
        origin: { y: 0.3 },
        colors: ['#F4A82C', '#FF8A3D', '#F46A1F', '#FDEBCF', '#FFF0E3'],
        disableForReducedMotion: true,
      });
    }
  }, [fireKey, reduced]);

  return (
    <div className="mb-2">
      {/* Pill + texto — entrada spring al cambiar de estado */}
      <motion.div
        key={result.reachesGoal ? 'alcanzada' : 'falta'}
        className="flex items-center gap-2.5 flex-wrap mb-3"
        initial={reduced ? false : { y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      >
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1"
          style={
            result.reachesGoal
              ? { background: '#E3F7EF', color: '#0B7A56' }
              : { background: '#FDEBCF', color: '#8A5A0C' }
          }
        >
          {result.reachesGoal ? '✓ Meta alcanzada' : '↑ Te falta'}
        </span>
        <p className="text-sm leading-snug" style={{ color: '#16241D' }}>
          {result.reachesGoal
            ? `Llegas a "${formData.objectiveName}" en ${termLabel(formData)} · te sobran ${formatCLP(result.surplus)}`
            : `"${formData.objectiveName}" · te faltan ${formatCLP(result.gap)}`}
        </p>
      </motion.div>

      {/* Barra de progreso */}
      <div className="relative h-1.5">
        {/* Glow ámbar cuando no alcanza — fuera del overflow-hidden del track */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={glowAmbar ? {
            boxShadow: [
              '0 0 0 0 rgba(244,168,44,0)',
              '0 0 0 5px rgba(244,168,44,0.35)',
              '0 0 0 0 rgba(244,168,44,0)',
            ],
          } : { boxShadow: '0 0 0 0 rgba(0,0,0,0)' }}
          transition={{ delay: 1, duration: 1.5, repeat: 1, repeatDelay: 0.4 }}
        />
        {/* Track */}
        <div className="h-full rounded-full overflow-hidden" style={{ background: '#E3F7EF' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: result.reachesGoal ? '#12B886' : '#F4A82C' }}
            initial={{ width: 0 }}
            animate={{ width: `${completion}%` }}
            transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 55, damping: 12 }}
          />
        </div>
      </div>
      <p className="text-xs mt-1 text-right" style={{ color: '#7A8077' }}>
        {completion.toFixed(0)}% de la meta
      </p>
    </div>
  );
}
