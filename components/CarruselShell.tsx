'use client';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarruselShellProps {
  children: React.ReactNode;
  scrollAmount?: number;
  title?: React.ReactNode;
}

export default function CarruselShell({ children, scrollAmount = 280, title }: CarruselShellProps) {
  const ref = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    ref.current?.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-5">
        <div>{title}</div>
        <div className="flex gap-2 flex-shrink-0 pt-1">
          <button
            type="button"
            onClick={() => scroll(-1)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ background: '#E3F7EF', color: '#0B7A56' }}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ background: '#E3F7EF', color: '#0B7A56' }}
            aria-label="Siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto pb-3 hide-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {children}
      </div>
    </div>
  );
}
