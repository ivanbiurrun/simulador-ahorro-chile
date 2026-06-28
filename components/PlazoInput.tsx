'use client';
import type { TermUnit } from '@/types';

interface PlazoInputProps {
  value: number;
  unit: TermUnit;
  onValueChange: (v: number) => void;
  onUnitChange: (u: TermUnit) => void;
}

export default function PlazoInput({ value, unit, onValueChange, onUnitChange }: PlazoInputProps) {
  const max = unit === 'días' ? 365 : unit === 'años' ? 50 : 600;

  return (
    <div className="flex rounded-xl border-2 border-gray-200 bg-white overflow-hidden focus-within:border-verde transition-colors">
      <input
        type="number"
        value={value}
        onChange={(e) => onValueChange(Math.max(1, parseInt(e.target.value) || 1))}
        min={1}
        max={max}
        className="w-24 px-4 py-3 text-tinta text-center font-semibold focus:outline-none bg-transparent"
        aria-label="Valor del plazo"
      />
      <div className="w-px bg-gray-200 self-stretch" />
      <select
        value={unit}
        onChange={(e) => onUnitChange(e.target.value as TermUnit)}
        className="flex-1 px-4 py-3 text-tinta bg-transparent focus:outline-none cursor-pointer"
        aria-label="Unidad del plazo"
      >
        <option value="días">días</option>
        <option value="meses">meses</option>
        <option value="años">años</option>
      </select>
    </div>
  );
}
