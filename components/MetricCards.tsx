'use client';
import CountUp from 'react-countup';
import { formatCLP } from '@/lib/formatters';
import type { SimulationResult } from '@/types';

function Card({
  label,
  value,
  sub,
  accent,
  animate,
}: {
  label: string;
  value: number;
  sub?: string;
  accent?: 'verde' | 'riesgo' | 'default';
  animate?: boolean;
}) {
  const valueColor =
    accent === 'verde'  ? 'text-verde' :
    accent === 'riesgo' ? 'text-riesgo' :
    'text-tinta';

  return (
    <div className="bg-white rounded-2xl p-4 shadow-card">
      <p className="text-xs text-gray-400 font-medium mb-1 leading-tight">{label}</p>
      <p className={`text-lg font-bold tabular-nums leading-tight ${valueColor}`}>
        {animate ? (
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
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

export default function MetricCards({ result }: { result: SimulationResult }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card
        label="Monto final proyectado"
        value={result.finalAmount}
      />
      <Card
        label="Tu objetivo"
        value={result.targetAmount}
        sub={result.reachesGoal ? '✓ Alcanzado' : `Faltan ${formatCLP(result.gap)}`}
        accent={result.reachesGoal ? 'verde' : 'riesgo'}
      />
      <Card
        label="Total aportado"
        value={result.totalContributed}
        sub="Tu capital"
      />
      <Card
        label="Rendimiento generado"
        value={result.interestEarned}
        sub="Lo que trabajó tu plata"
        accent="verde"
        animate
      />
    </div>
  );
}
