export default function Header() {
  return (
    <header
      className="relative text-white py-16 sm:py-20 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0B7A56 0%, #12B886 100%)' }}
    >
      {/* Glow accent — upper right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 68% 30%, rgba(255,255,255,0.12) 0%, transparent 58%)',
        }}
      />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.065) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Icon + title inline */}
        <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 h-10 sm:w-14 sm:h-14 flex-shrink-0 text-white/70"
            aria-hidden="true"
          >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white">
            Ahorra con Cabeza<br />creado para Chile 🇨🇱
          </h1>
        </div>

        <p className="text-base text-white/60 mb-8">
          by{' '}
          <a
            href="https://www.linkedin.com/in/ivan-biurrun/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white underline underline-offset-2 transition-colors"
          >
            Iván Biurrun
          </a>
        </p>

        <p className="text-base sm:text-xl text-white max-w-2xl mx-auto leading-relaxed">
          Más que un simulador: una herramienta para aprender a hacer crecer tu plata. Define una meta,
          compara los productos de ahorro e inversión disponibles en Chile y entiende cómo funciona cada
          uno, para que tomes decisiones con información clara y no a ciegas.
        </p>
      </div>
    </header>
  );
}
