'use client';
import CarruselShell from './CarruselShell';

const RECURSOS = [
  {
    titular: 'Comparador de depósitos a plazo en Chile',
    fuente: 'Rankia Chile',
    descripcion: 'Compara tasas actualizadas de depósitos a plazo en los principales bancos.',
    url: 'https://www.rankia.cl/deposito-a-plazo',
  },
  {
    titular: 'Compara fondos mutuos de todas las administradoras',
    fuente: 'Buscafondos',
    descripcion: 'Busca, compara y filtra fondos mutuos del mercado chileno en un solo lugar.',
    url: 'https://buscafondos.cl',
  },
  {
    titular: 'Tasas de depósitos a plazo en tiempo real',
    fuente: 'DepósitoAPlazo.cl',
    descripcion: 'Ranking actualizado diariamente con las mejores tasas del mercado.',
    url: 'https://depositoaplazo.cl',
  },
  {
    titular: 'Educación financiera: inversión, ahorro y más',
    fuente: 'Fintual EDU',
    descripcion: 'Blog de educación financiera con artículos claros, en español chileno.',
    url: 'https://edu.fintual.cl',
  },
  {
    titular: 'Todo sobre fondos mutuos en Chile',
    fuente: 'Chócale',
    descripcion: 'Guías y comparativas de productos financieros para el inversionista chileno.',
    url: 'https://chocale.cl',
  },
  {
    titular: 'APV, fondos y ahorro: guía del regulador',
    fuente: 'CMF Educa',
    descripcion: 'Educación financiera oficial de la Comisión para el Mercado Financiero.',
    url: 'https://www.cmfeduca.cl',
  },
  {
    titular: 'Estadísticas e información oficial del sistema financiero',
    fuente: 'CMF Chile',
    descripcion: 'Información regulatoria y estadísticas de las instituciones financieras del país.',
    url: 'https://www.cmfchile.cl',
  },
  {
    titular: 'Reclamos y derechos del consumidor financiero',
    fuente: 'SERNAC',
    descripcion: 'Conoce tus derechos frente a bancos, seguros y servicios financieros.',
    url: 'https://www.sernac.cl',
  },
];

export default function NovedadesBloque() {
  return (
    <section className="max-w-[1440px] mx-auto px-10 lg:px-12 pb-10">
      <CarruselShell
        scrollAmount={360}
        title={
          <>
            <h2 className="font-bold text-tinta" style={{ fontSize: '24px' }}>Para seguir aprendiendo</h2>
            <p className="text-sm mt-1" style={{ color: '#7A8077' }}>
              Artículos seleccionados para profundizar.
            </p>
          </>
        }
      >
        {RECURSOS.map((n) => (
          <a
            key={n.url}
            href={n.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-5 flex flex-col gap-2.5 flex-shrink-0 group transition-shadow hover:shadow-md"
            style={{
              width: '300px',
              scrollSnapAlign: 'start',
              border: '1px solid #F0E9DC',
              boxShadow: '0 2px 10px rgba(22,36,29,0.06)',
              textDecoration: 'none',
            }}
          >
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded-full self-start"
              style={{ background: '#E3F7EF', color: '#0B7A56' }}
            >
              {n.fuente}
            </span>
            <p
              className="font-semibold text-sm leading-snug group-hover:text-verde-oscuro transition-colors"
              style={{ color: '#16241D' }}
            >
              {n.titular}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: '#5C635A' }}>
              {n.descripcion}
            </p>
            <p className="text-xs mt-auto" style={{ color: '#7A8077' }}>
              Visitar →
            </p>
          </a>
        ))}
      </CarruselShell>
    </section>
  );
}
