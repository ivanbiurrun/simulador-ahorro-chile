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
}: {
  label: string;
  value: number;
  sub?: string;
  green?: boolean;
  alert?: boolean;
}) {
  const reduced = useReducedMotion();
  const valueColor = green ? '#0B7A56' : alert ? '#E8554E' : '#16241D';
  const subColor   = green ? '#0B7A56' : alert ? '#E8554E' : '#7A8077';

  return (
    <div
      className="rounded-2xl p-4 shadow-card"
      style={{ background: green ? '#E3F7EF' : '#FFFFFF' }}
    >
      <p className="font-medium mb-1.5 leading-tight" style={{ fontSize: '13px', color: '#7A8077' }}>
        {label}
      </p>
      <p className="font-bold tabular-nums leading-tight" style={{ fontSize: '30px', color: valueColor }}>
        {!reduced ? (
          <CountUp
            key={value}
            start={0}
            end={value}
            duration={1.1}
            useEasing
            formattingFn={(n) => formatCLP(Math.round(n))}
          />
        ) : (
          formatCLP(value)
        )}
      </p>
      {sub && (
        <p className="text-xs mt-1" style={{ color: subColor }}>
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
      />
    </div>
  );
}
