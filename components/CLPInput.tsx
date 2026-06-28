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
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2 font-medium text-sm pointer-events-none select-none"
        style={{ color: '#7A8077' }}
      >
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
        className="w-full pl-7 pr-4 py-3 rounded-[10px] focus:outline-none transition-all text-tinta bg-white text-base"
        style={{ border: '1px solid #ECE4D6' }}
        onFocus={(e) => {
          setFocused(true);
          (e.currentTarget as HTMLInputElement).style.borderColor = '#12B886';
        }}
        onBlur={(e) => {
          setFocused(false);
          (e.currentTarget as HTMLInputElement).style.borderColor = '#ECE4D6';
        }}
        onChange={(e) => {
          const cleaned = e.target.value.replace(/[^\d]/g, '');
          onChange(parseInt(cleaned, 10) || 0);
        }}
      />
    </div>
  );
}
