'use client';
import CountUp from 'react-countup';
import { useReducedMotion } from 'framer-motion';
import { formatCLP } from '@/lib/formatters';
import type { SimulationResult } from '@/types';

function Card({
  label,
  value,
  sub,
  green,
  alert,
  animate,
}: {
  label: string;
  value: number;
  sub?: string;
  green?: boolean;
  alert?: boolean;
  animate?: boolean;
}) {
  const reduced = useReducedMotion();
  const valueColor = green ? 'text-verde-oscuro' : alert ? 'text-riesgo' : 'text-tinta';

  return (
    <div className="bg-white rounded-2xl p-4 shadow-card">
      <p className="text-xs font-medium mb-1.5 leading-tight" style={{ color: 'rgba(22,36,29,0.45)' }}>
        {label}
      </p>
      <p className={`text-2xl font-bold tabular-nums leading-tight ${valueColor}`}>
        {animate && !reduced ? (
          <CountUp
            key={value}
            start={0}
            end={value}
            duration={1.2}
            useEasing
            formattingFn={(n) => formatCLP(Math.round(n))}
          />
        ) : (
          formatCLP(value)
        )}
      </p>
      {sub && (
        <p className="text-xs mt-1" style={{ color: green ? '#0B7A56' : alert ? '#E8554E' : 'rgba(22,36,29,0.45)' }}>
          {sub}
        </p>
      )}
    </div>
  );
}

export default function MetricCards({ result }: { result: SimulationResult }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card label="Monto final proyectado" value={result.finalAmount} />
      <Card
        label="Tu objetivo"
        value={result.targetAmount}
        sub={result.reachesGoal ? '✓ Alcanzado' : `Faltan ${formatCLP(result.gap)}`}
        green={result.reachesGoal}
        alert={!result.reachesGoal}
      />
      <Card label="Total aportado" value={result.totalContributed} sub="Tu capital" />
      <Card
        label="Rendimiento generado"
        value={result.interestEarned}
        sub="Lo que trabajó tu plata"
        green
        animate
      />
    </div>
  );
}
