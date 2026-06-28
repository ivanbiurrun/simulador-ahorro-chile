const CHIPS = [
  { icon: '🎯', text: 'Define tu meta' },
  { icon: '📈', text: 'Proyecta cómo crece' },
  { icon: '💡', text: 'Aprende al hacerlo' },
];

export default function HeroIntro() {
  return (
    <section
      className="py-5 sm:py-6"
      style={{ background: 'linear-gradient(160deg, #E3F7EF 0%, #FBF5EC 100%)' }}
    >
      <div className="max-w-[1440px] mx-auto px-10 lg:px-12">
        <h1 className="font-bold text-tinta mb-2 leading-tight" style={{ fontSize: '32px' }}>
          Ahorra con cabeza 🇨🇱
        </h1>
        <p className="mb-1" style={{ fontSize: '16px', lineHeight: 1.5, color: '#5C635A', maxWidth: '680px' }}>
          Aprende a hacer crecer tu plata: compara los productos de ahorro e inversión de Chile
          y entiende cómo funciona cada uno.
        </p>
        <p className="mb-4" style={{ fontSize: '13px', color: '#7A8077' }}>
          por{' '}
          <a
            href="https://www.linkedin.com/in/ivan-biurrun/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-tinta transition-colors"
            style={{ color: '#7A8077' }}
          >
            Iván Biurrun
          </a>
        </p>
        <div className="flex flex-wrap gap-2">
          {CHIPS.map((c) => (
            <span
              key={c.text}
              className="inline-flex items-center gap-1.5 bg-white font-medium rounded-full"
              style={{
                fontSize: '13px',
                color: '#16241D',
                border: '1px solid rgba(18,184,134,0.2)',
                padding: '5px 12px',
              }}
            >
              {c.icon} {c.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
