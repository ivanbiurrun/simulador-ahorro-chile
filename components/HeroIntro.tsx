const CHIPS = [
  { icon: '🎯', text: 'Define tu meta' },
  { icon: '📈', text: 'Proyecta cómo crece' },
  { icon: '💡', text: 'Aprende al hacerlo' },
];

export default function HeroIntro() {
  return (
    <section
      className="py-8 sm:py-10"
      style={{ background: 'linear-gradient(160deg, #E3F7EF 0%, #FBF5EC 100%)' }}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-tinta mb-3 leading-tight">
          Ahorra con cabeza
        </h1>
        <p className="text-sm sm:text-base leading-relaxed max-w-2xl mb-5" style={{ color: '#16241Daa' }}>
          Más que un simulador: aprende a hacer crecer tu plata. Define una meta, compara los
          productos de ahorro e inversión que existen en Chile y entiende cómo funciona cada uno
          — para decidir con información, no a ciegas.
        </p>
        <div className="flex flex-wrap gap-2">
          {CHIPS.map((c) => (
            <span
              key={c.text}
              className="inline-flex items-center gap-1.5 bg-white text-tinta text-xs font-medium px-3 py-1.5 rounded-full shadow-sm"
              style={{ border: '1px solid rgba(18,184,134,0.2)' }}
            >
              {c.icon} {c.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
