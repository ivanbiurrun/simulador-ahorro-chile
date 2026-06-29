'use client';
import CarruselShell from './CarruselShell';

const RECURSOS = [
  {
    nombre: 'Con Peras y Finanzas',
    plataforma: 'Spotify · Chile',
    blurb: 'Francisco Ackermann explica inversión, ahorro y deudas en simple, con un invitado por capítulo.',
    emoji: '🎙️',
    tipo: 'Podcast',
    href: 'https://open.spotify.com/show/2ctcLbQpVuGc2V4ecAnbBC',
    pending: false,
  },
  {
    nombre: 'Inversapiens',
    plataforma: 'Spotify · Chile',
    blurb: 'Educación financiera e inversiones: bolsa, bienes raíces, cripto, con consejos prácticos.',
    emoji: '📊',
    tipo: 'Podcast',
    href: 'https://open.spotify.com/show/1Fflo9LU5Bm4mq26FVNc4C',
    pending: false,
  },
  {
    nombre: 'Kapital',
    plataforma: 'Spotify · Joan Tubau',
    blurb: 'Finanzas y economía con entrevistas largas y profundas. Para ir más a fondo.',
    emoji: '🎧',
    tipo: 'Podcast',
    href: 'https://open.spotify.com/show/4LV2hhtduA5qOUbzf5Ek6C',
    pending: false,
  },
  {
    nombre: 'La batalla entre tu yo presente y tu yo futuro',
    plataforma: 'TED · Daniel Goldstein',
    blurb: '¿Por qué nos cuesta ahorrar? Goldstein explica cómo nuestro cerebro sabotea las decisiones de largo plazo.',
    emoji: '🧠',
    tipo: 'TED',
    href: 'https://www.ted.com/talks/daniel_goldstein_the_battle_between_your_present_and_future_self',
    pending: false,
  },
  {
    nombre: 'Cómo aprendí a leer e invertir en bolsa en prisión',
    plataforma: 'TED · Curtis Carroll',
    blurb: 'Una historia poderosa sobre educación financiera y cómo cambiar la mentalidad con la que pensamos en el dinero.',
    emoji: '📈',
    tipo: 'TED',
    href: 'https://www.ted.com/talks/curtis_wall_street_carroll_how_i_learned_to_read_and_trade_stocks_in_prison',
    pending: false,
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
              Podcasts y charlas para aprender sobre finanzas personales.
            </p>
          </>
        }
      >
        {RECURSOS.map((r, i) => (
          <a
            key={i}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-5 flex flex-col gap-3 flex-shrink-0 group transition-shadow hover:shadow-md"
            style={{
              width: '280px',
              scrollSnapAlign: 'start',
              border: '1px solid #F0E9DC',
              boxShadow: '0 2px 10px rgba(22,36,29,0.06)',
              textDecoration: 'none',
            }}
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
            <p className="text-xs mt-auto" style={{ color: r.tipo === 'TED' ? '#F4A82C' : '#4DABF7' }}>
              {r.tipo === 'TED' ? 'Ver charla →' : 'Escuchar →'}
            </p>
          </a>
        ))}
      </CarruselShell>
    </section>
  );
}
