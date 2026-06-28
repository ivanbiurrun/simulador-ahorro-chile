'use client';
import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { getCategoryInfo } from '@/lib/categories';
import { formatCLP } from '@/lib/formatters';
import { toMonths } from '@/hooks/useSimulador';
import type { SimulatorFormData, SimulationResult } from '@/types';

interface MetaBannerProps {
  formData: SimulatorFormData;
  result: SimulationResult;
}

function termLabel(formData: SimulatorFormData): string {
  const months = toMonths(formData.termValue, formData.termUnit);
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y > 0 && m > 0) return `${y} año${y > 1 ? 's' : ''} y ${m} mes${m > 1 ? 'es' : ''}`;
  if (y > 0) return `${y} año${y > 1 ? 's' : ''}`;
  return `${months} mes${months !== 1 ? 'es' : ''}`;
}

export default function MetaBanner({ formData, result }: MetaBannerProps) {
  const lastFiredRef = useRef<number | null>(null);
  const { Icon } = getCategoryInfo(formData.category);
  const completion = Math.min((result.finalAmount / result.targetAmount) * 100, 100);

  useEffect(() => {
    if (result.reachesGoal && lastFiredRef.current !== result.finalAmount) {
      lastFiredRef.current = result.finalAmount;
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.35 },
        colors: ['#12B886', '#FF8A3D', '#4DABF7', '#FBF5EC'],
        disableForReducedMotion: true,
      });
    }
  }, [result.reachesGoal, result.finalAmount]);

  if (result.reachesGoal) {
    return (
      <div
        className="rounded-2xl p-5 text-white overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0B7A56 0%, #12B886 100%)' }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="font-bold text-base leading-tight">
              ¡Llegas a &ldquo;{formData.objectiveName}&rdquo;!
            </p>
            <p className="text-sm text-white/80 mt-0.5">
              en {termLabel(formData)} · te sobran {formatCLP(result.surplus)} 🎉
            </p>
          </div>
        </div>
        {/* Barra de progreso */}
        <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full" style={{ width: '100%' }} />
        </div>
        <p className="text-xs text-white/60 mt-1.5 text-right">100% de la meta</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-5 bg-alerta-tint border border-alerta/40">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 bg-alerta/15 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="w-7 h-7 text-alerta" />
        </div>
        <div>
          <p className="font-bold text-base text-tinta leading-tight">
            &ldquo;{formData.objectiveName}&rdquo; todavía no llega
          </p>
          <p className="text-sm text-mango-oscuro mt-0.5">
            Te faltan {formatCLP(result.gap)} · ajusta el aporte o el plazo
          </p>
        </div>
      </div>
      {/* Barra de progreso */}
      <div className="h-1.5 bg-alerta/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-alerta rounded-full transition-all duration-700"
          style={{ width: `${completion}%` }}
        />
      </div>
      <p className="text-xs text-mango-oscuro mt-1.5 text-right">{completion.toFixed(0)}% de la meta</p>
    </div>
  );
}
