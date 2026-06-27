'use client';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceDot,
  ResponsiveContainer,
} from 'recharts';
import type { MonthlyDataPoint } from '@/types';

interface GrowthChartProps {
  data: MonthlyDataPoint[];
  targetAmount: number;
  termMonths: number;
}

function formatYAxis(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}MM`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

function formatCLP(value: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(value);
}

function xLabel(mes: number, termMonths: number): string {
  if (termMonths <= 36) return mes % 3 === 0 ? `M${mes}` : '';
  const y = Math.floor(mes / 12);
  return mes % 12 === 0 && y > 0 ? `A${y}` : '';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const saldo = payload[0]?.value ?? 0;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs min-w-[150px]">
      <p className="font-semibold text-gray-600 mb-1.5">Mes {label}</p>
      <p className="font-bold text-teal-700 text-sm">{formatCLP(saldo)}</p>
    </div>
  );
}

export default function GrowthChart({ data, targetAmount, termMonths }: GrowthChartProps) {
  const crossing = targetAmount > 0 ? data.find((d) => d.saldo >= targetAmount) : null;

  return (
    <ResponsiveContainer width="100%" height={270}>
      <AreaChart data={data} margin={{ top: 16, right: 20, left: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="gradSaldo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#14b8a6" stopOpacity={0.55} />
            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.04} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
        <XAxis
          dataKey="mes"
          tickFormatter={(v) => xLabel(v, termMonths)}
          tick={{ fontSize: 10, fill: '#9ca3af' }}
          axisLine={{ stroke: '#e5e7eb' }}
          tickLine={false}
        />
        <YAxis
          tickFormatter={formatYAxis}
          tick={{ fontSize: 10, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
          width={58}
        />
        <Tooltip content={<CustomTooltip />} />

        {/* Target reference line */}
        {targetAmount > 0 && (
          <ReferenceLine
            y={targetAmount}
            stroke="#f59e0b"
            strokeDasharray="6 4"
            strokeWidth={1.5}
            label={{
              value: 'Tu objetivo',
              position: 'insideTopRight',
              fontSize: 10,
              fill: '#d97706',
            }}
          />
        )}

        {/* Crossing point marker */}
        {crossing && (
          <ReferenceDot
            x={crossing.mes}
            y={crossing.saldo}
            r={7}
            fill="#10b981"
            stroke="white"
            strokeWidth={2.5}
            label={{
              value: '✓ Meta',
              position: 'top',
              fontSize: 10,
              fill: '#059669',
              fontWeight: 600,
            }}
          />
        )}

        {/* Single area: saldo total */}
        <Area
          type="monotone"
          dataKey="saldo"
          stroke="#0d9488"
          strokeWidth={2.5}
          fill="url(#gradSaldo)"
          dot={false}
          activeDot={{ r: 5, fill: '#0d9488', stroke: 'white', strokeWidth: 2 }}
          name="Tu ahorro"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
