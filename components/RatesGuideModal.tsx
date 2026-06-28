'use client';
import { useState } from 'react';

export default function RatesGuideModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-sm transition-colors"
        style={{ color: '#0B7A56' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#07543B'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#0B7A56'; }}
      >
        🔍 ¿Dónde encuentro las tasas reales?
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(22,36,29,0.5)' }}
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto">
            <div
              className="sticky top-0 bg-white p-5 flex justify-between items-center rounded-t-2xl"
              style={{ borderBottom: '1px solid #F0E9DC' }}
            >
              <h2 className="text-base font-bold text-tinta">¿Dónde encuentro las tasas reales?</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                style={{ color: '#7A8077' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#F2ECE0'; (e.currentTarget as HTMLButtonElement).style.color = '#5C635A'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#7A8077'; }}
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-sm leading-relaxed" style={{ color: '#5C635A' }}>
                Las tasas cambian seguido. Conviene comparar varias fuentes y verificar directamente con
                la institución antes de tomar cualquier decisión.
              </p>

              {/* Comparadores neutrales */}
              <div className="rounded-xl p-4" style={{ border: '1px solid rgba(18,184,134,0.2)', background: '#E3F7EF' }}>
                <h3 className="font-semibold mb-2 text-tinta">📊 Comparadores de tasas</h3>
                <p className="text-sm mb-3 leading-relaxed" style={{ color: '#16241D' }}>
                  Sitios independientes que rankean y comparan tasas de distintas instituciones.
                  Son un buen punto de partida para comparar antes de ir directo al banco o fintech.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.rankia.cl/blog/mejores-depositos-a-plazo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors w-fit"
                    style={{ background: '#0B7A56' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#07543B'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#0B7A56'; }}
                  >
                    Rankia Chile — depósitos a plazo ↗
                  </a>
                  <a
                    href="https://chocale.cl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors w-fit"
                    style={{ background: '#0B7A56' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#07543B'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#0B7A56'; }}
                  >
                    Chócale — ranking de tasas ↗
                  </a>
                </div>
              </div>

              {/* Depósito a Plazo */}
              <div className="rounded-xl p-4" style={{ border: '1px solid rgba(244,168,44,0.3)', background: '#FDF6E8' }}>
                <h3 className="font-semibold mb-1.5" style={{ color: '#8A5A0C' }}>⚠️ Depósito a Plazo: ojo con la tasa</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5C3A0A' }}>
                  En Chile, los bancos suelen publicar la tasa del depósito a plazo como{' '}
                  <strong>tasa mensual</strong> (por ejemplo, 0,40% mensual). Para usarla en este
                  simulador necesitas la <strong>tasa anual</strong>: multiplica por 12 como aproximación.
                </p>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: '#5C3A0A' }}>
                  Ejemplo: <strong>0,40% mensual × 12 = 4,8% anual</strong>. Ese es el valor que debes
                  ingresar en el campo de tasa del simulador.
                </p>
              </div>

              {/* Fondos Mutuos y APV */}
              <div className="rounded-xl p-4" style={{ border: '1px solid #F0E9DC' }}>
                <h3 className="font-semibold mb-1.5 text-tinta">📈 Fondos Mutuos y APV</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5C635A' }}>
                  La rentabilidad histórica la publican las propias administradoras en su sitio o app.
                  Recuerda que varía mes a mes y no garantiza el futuro. Revisa períodos de 1, 3 y 5 años
                  para tener una imagen más completa antes de usar una tasa en el simulador.
                </p>
              </div>

              {/* Cuentas Remuneradas */}
              <div className="rounded-xl p-4" style={{ border: '1px solid #F0E9DC' }}>
                <h3 className="font-semibold mb-1.5 text-tinta">🏧 Cuentas Remuneradas/Vista</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5C635A' }}>
                  Cada banco o fintech publica su tasa directamente en su sitio web o app. Búscala bajo
                  "cuenta remunerada" o "cuenta con interés". Las tasas cambian seguido, así que conviene
                  verificarlas de forma directa y no fiarse solo de comparadores de terceros.
                </p>
              </div>

              <div className="rounded-xl p-4" style={{ border: '1px solid #F0E9DC', background: '#FBF5EC' }}>
                <p className="text-sm leading-relaxed" style={{ color: '#5C635A' }}>
                  ⚠️ <strong style={{ color: '#16241D' }}>Importante:</strong> las tasas en este simulador son 100% ilustrativas y
                  editables. No representan ningún producto real ni condiciones vigentes. Siempre verifica
                  directamente con las instituciones reguladas antes de tomar cualquier decisión.
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => setOpen(false)}
                className="w-full text-white py-3 rounded-xl font-semibold transition-colors"
                style={{ background: '#0B7A56' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#07543B'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#0B7A56'; }}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
