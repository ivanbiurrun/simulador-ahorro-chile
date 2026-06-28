const CONCEPTOS = [
  {
    icon: '📈',
    titulo: 'Interés compuesto',
    texto:
      'Tus intereses generan más intereses. Por eso el tiempo pesa más que el monto: empezar antes rinde más que poner mucho después.',
  },
  {
    icon: '⚖️',
    titulo: 'Riesgo y rentabilidad',
    texto:
      'Van juntos. Lo que puede rendir más también puede bajar. No existe "mucho y seguro" al mismo tiempo.',
  },
  {
    icon: '💧',
    titulo: 'Liquidez',
    texto:
      'Qué tan rápido puedes sacar tu plata. Una cuenta es líquida; un depósito a plazo te la deja fija un tiempo.',
  },
  {
    icon: '🧩',
    titulo: 'Diversificar',
    texto:
      'No pongas todo en un solo lugar. Repartir entre productos baja el riesgo de que un mal momento te pegue de lleno.',
  },
];

export default function ConceptosBloque() {
  return (
    <section className="max-w-[1440px] mx-auto px-10 lg:px-12 py-10">
      <div className="mb-6">
        <h2 className="font-bold text-tinta" style={{ fontSize: '24px' }}>Conceptos en 1 minuto</h2>
        <p className="text-sm mt-1" style={{ color: '#7A8077' }}>
          Lo que conviene entender antes de decidir dónde poner tu plata.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CONCEPTOS.map((c) => (
          <div
            key={c.titulo}
            className="bg-white rounded-2xl p-5 flex flex-col"
            style={{ border: '1px solid #F0E9DC', boxShadow: '0 2px 10px rgba(22,36,29,0.06)' }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 flex-shrink-0 text-2xl"
              style={{ background: '#E3F7EF' }}
            >
              {c.icon}
            </div>
            <h3 className="font-semibold text-tinta mb-2" style={{ fontSize: '16px' }}>
              {c.titulo}
            </h3>
            <div className="flex-1 overflow-y-auto pr-1 -mr-1" style={{ maxHeight: '80px' }}>
              <p className="text-sm leading-relaxed" style={{ color: '#5C635A' }}>
                {c.texto}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
