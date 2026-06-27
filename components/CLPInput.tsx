'use client';
import { useState } from 'react';

interface CLPInputProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
}

export default function CLPInput({
  id,
  value,
  onChange,
  placeholder = 'Ej: 500.000',
  required = false,
  min = 0,
}: CLPInputProps) {
  const [focused, setFocused] = useState(false);

  const displayValue = focused
    ? value > 0 ? String(value) : ''
    : value > 0 ? value.toLocaleString('es-CL') : '';

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm pointer-events-none select-none">
        $
      </span>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        value={displayValue}
        placeholder={placeholder}
        required={required}
        min={min}
        className="w-full pl-7 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 bg-white transition-all"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => {
          const cleaned = e.target.value.replace(/[^\d]/g, '');
          onChange(parseInt(cleaned, 10) || 0);
        }}
      />
    </div>
  );
}
