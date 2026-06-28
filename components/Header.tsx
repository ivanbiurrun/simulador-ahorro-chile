import { TrendingUp } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full" style={{ background: '#0B7A56' }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">

        {/* Izquierda: logo + nombre */}
        <div className="flex items-center gap-2.5 min-w-0">
          <TrendingUp className="w-5 h-5 text-white/70 flex-shrink-0" strokeWidth={2.5} />
          <span className="font-bold text-white text-lg leading-tight whitespace-nowrap">
            Ahorra con Cabeza 🇨🇱
          </span>
        </div>

        {/* Derecha: subtítulo + autoría */}
        <p className="text-sm text-white/55 hidden sm:block text-right shrink-0">
          Simulador educativo ·{' '}
          <a
            href="https://www.linkedin.com/in/ivan-biurrun/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white underline underline-offset-2 transition-colors"
          >
            Iván Biurrun
          </a>
        </p>

      </div>
    </header>
  );
}
