'use client';
import { useState, useRef, useEffect } from 'react';

interface InfoTooltipProps {
  text: string;
}

export default function InfoTooltip({ text }: InfoTooltipProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <span ref={ref} className="relative inline-flex items-center ml-1.5 flex-shrink-0">
      <button
        type="button"
        className="w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center focus:outline-none transition-colors cursor-help"
        style={{ background: '#E3F7EF', color: '#0B7A56' }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible((v) => !v)}
        aria-label="Más información"
      >
        i
      </button>
      {visible && (
        <div
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 text-white text-xs rounded-xl shadow-2xl leading-relaxed pointer-events-none"
          style={{ background: '#16241D' }}
        >
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" style={{ borderTopColor: '#16241D' }} />
        </div>
      )}
    </span>
  );
}
