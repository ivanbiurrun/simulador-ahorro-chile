// Estructura lista para enchufar un feed/RSS. Reemplazar los placeholders con titular + URL real.
// Regla: nunca reproducir el texto del artículo — solo titular propio + fuente + fecha + link.
const NOTICIAS_PLACEHOLDER = [
  {
    titular: 'Las tasas de depósitos a plazo subieron en el último trimestre',
    fuente: 'Rankia Chile',
    fecha: '2025-06',
    url: 'https://www.rankia.cl',
  },
  {
    titular: 'Cómo elegir un fondo mutuo según tu horizonte de ahorro',
    fuente: 'Chócale',
    fecha: '2025-05',
    url: 'https://chocale.cl',
  },
  {
    titular: 'APV: todo lo que necesitas saber antes de cotizar',
    fuente: 'CMF Chile',
    fecha: '2025-04',
    url: 'https://www.cmfchile.cl',
  },
];

export default function NovedadesBloque() {
  return (
    <section className="max-w-[1440px] mx-auto px-10 lg:px-12 pb-10">
      <div className="mb-6">
        <h2 className="font-bold text-tinta" style={{ fontSize: '24px' }}>Para seguir aprendiendo</h2>
        <p className="text-sm mt-1" style={{ color: '#7A8077' }}>
          Artículos externos seleccionados. Siempre verifica la fecha y la fuente original.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {NOTICIAS_PLACEHOLDER.map((n) => (
          <a
            key={n.titular}
            href={n.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-5 flex flex-col gap-3 group transition-shadow hover:shadow-md"
            style={{ border: '1px solid #F0E9DC', boxShadow: '0 2px 10px rgba(22,36,29,0.06)', textDecoration: 'none' }}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: '#E3F7EF', color: '#0B7A56' }}
              >
                {n.fuente}
              </span>
              <span className="text-[11px]" style={{ color: '#7A8077' }}>{n.fecha}</span>
            </div>

            <p
              className="font-semibold text-sm leading-snug group-hover:text-verde-oscuro transition-colors"
              style={{ color: '#16241D' }}
            >
              {n.titular}
            </p>

            <p className="text-xs mt-auto" style={{ color: '#7A8077' }}>
              Leer nota →
            </p>
          </a>
        ))}
      </div>

      <p className="text-xs mt-4" style={{ color: 'rgba(22,36,29,0.35)' }}>
        * Titulares y fechas son placeholders de ejemplo. Reemplazar con links reales antes de publicar.
      </p>
    </section>
  );
}
