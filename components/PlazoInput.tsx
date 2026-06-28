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
    <div
      className="flex rounded-[10px] overflow-hidden transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-[#12B886]"
      style={{ border: '1px solid #ECE4D6', background: 'white' }}
    >
      <input
        type="number"
        value={value}
        onChange={(e) => onValueChange(Math.max(1, parseInt(e.target.value) || 1))}
        min={1}
        max={max}
        className="w-24 px-4 py-3 text-tinta text-center font-semibold focus:outline-none bg-transparent text-base"
        aria-label="Valor del plazo"
      />
      <div className="w-px self-stretch" style={{ background: '#ECE4D6' }} />
      <select
        value={unit}
        onChange={(e) => onUnitChange(e.target.value as TermUnit)}
        className="flex-1 px-4 py-3 text-tinta bg-transparent focus:outline-none cursor-pointer text-base"
        aria-label="Unidad del plazo"
      >
        <option value="días">días</option>
        <option value="meses">meses</option>
        <option value="años">años</option>
      </select>
    </div>
  );
}
