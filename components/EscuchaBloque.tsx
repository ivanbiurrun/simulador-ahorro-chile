'use client';
import CarruselShell from './CarruselShell';

const RECURSOS = [
  {
    nombre: 'Con Peras y Manzanas',
    plataforma: 'Spotify · Chile',
    blurb: 'Francisco Ackermann explica inversión, ahorro y deudas en simple, con un invitado por capítulo.',
    emoji: '🎙️',
    tipo: 'Podcast',
    href: 'https://open.spotify.com',
    pending: false,
  },
  {
    nombre: 'Inversapiens',
    plataforma: 'Spotify · Chile',
    blurb: 'Educación financiera e inversiones: bolsa, bienes raíces, cripto, con consejos prácticos.',
    emoji: '📊',
    tipo: 'Podcast',
    href: 'https://open.spotify.com',
    pending: false,
  },
  {
    nombre: 'Kapital',
    plataforma: 'Spotify',
    blurb: 'Finanzas y economía con entrevistas largas y profundas. Para ir más a fondo.',
    emoji: '🎧',
    tipo: 'Podcast',
    href: 'https://open.spotify.com',
    pending: false,
  },
  {
    nombre: 'TED en español',
    plataforma: 'TED.com',
    blurb: 'Charlas sobre finanzas personales y ahorro curadas por Iván. Próximamente.',
    emoji: '🎯',
    tipo: 'TED',
    href: '#',
    pending: true,
  },
  {
    nombre: 'TED en español',
    plataforma: 'TED.com',
    blurb: 'Segunda charla seleccionada. Próximamente.',
    emoji: '💡',
    tipo: 'TED',
    href: '#',
    pending: true,
  },
];

export default function EscuchaBloque() {
  return (
    <section className="max-w-[1440px] mx-auto px-10 lg:px-12 py-10">
      <CarruselShell
        scrollAmount={300}
        title={
          <>
            <h2 className="font-bold text-tinta" style={{ fontSize: '24px' }}>Escucha y aprende</h2>
            <p className="text-sm mt-1" style={{ color: '#7A8077' }}>
              Podcasts y charlas recomendados · verifica links antes de publicar.
            </p>
          </>
        }
      >
        {RECURSOS.map((r, i) => (
          <a
            key={i}
            href={r.href}
            target={r.pending ? undefined : '_blank'}
            rel={r.pending ? undefined : 'noopener noreferrer'}
            className="bg-white rounded-2xl p-5 flex flex-col gap-3 flex-shrink-0 group transition-shadow hover:shadow-md"
            style={{
              width: '280px',
              scrollSnapAlign: 'start',
              border: '1px solid #F0E9DC',
              boxShadow: '0 2px 10px rgba(22,36,29,0.06)',
              textDecoration: 'none',
              opacity: r.pending ? 0.6 : 1,
              pointerEvents: r.pending ? 'none' : undefined,
            }}
            aria-disabled={r.pending}
          >
            <div className="flex items-start justify-between gap-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: '#E7F2FD' }}
              >
                {r.emoji}
              </div>
              <div className="flex flex-col items-end gap-1">
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={r.tipo === 'Podcast'
                    ? { background: '#E3F7EF', color: '#0B7A56' }
                    : { background: '#FDEBCF', color: '#8A5A0C' }}
                >
                  {r.tipo}
                </span>
                <span className="text-[10px]" style={{ color: '#7A8077' }}>{r.plataforma}</span>
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm text-tinta mb-1 leading-snug group-hover:text-verde-oscuro transition-colors">
                {r.nombre}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: '#5C635A' }}>
                {r.blurb}
              </p>
            </div>
            {!r.pending && (
              <p className="text-xs mt-auto" style={{ color: '#4DABF7' }}>
                Escuchar →
              </p>
            )}
          </a>
        ))}
      </CarruselShell>
    </section>
  );
}
