'use client';
import { useState } from 'react';

export default function RatesGuideModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-blue-600 text-sm hover:text-blue-800 hover:underline transition-colors"
      >
        🔍 ¿Dónde encuentro las tasas reales?
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-5 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-base font-bold text-gray-900">¿Dónde encuentro las tasas reales?</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                Las tasas cambian seguido. Conviene comparar varias fuentes y verificar directamente con
                la institución antes de tomar cualquier decisión.
              </p>

              {/* Comparadores neutrales */}
              <div className="border border-teal-100 rounded-xl p-4 bg-teal-50">
                <h3 className="font-semibold text-teal-900 mb-2">📊 Comparadores de tasas</h3>
                <p className="text-sm text-teal-800 mb-3 leading-relaxed">
                  Sitios independientes que rankean y comparan tasas de distintas instituciones.
                  Son un buen punto de partida para comparar antes de ir directo al banco o fintech.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.rankia.cl/blog/mejores-depositos-a-plazo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors w-fit"
                  >
                    Rankia Chile — depósitos a plazo ↗
                  </a>
                  <a
                    href="https://chocale.cl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors w-fit"
                  >
                    Chócale — ranking de tasas ↗
                  </a>
                </div>
              </div>

              {/* Depósito a Plazo — nota tasa mensual/anual */}
              <div className="border border-amber-200 rounded-xl p-4 bg-amber-50">
                <h3 className="font-semibold text-amber-900 mb-1.5">⚠️ Depósito a Plazo: ojo con la tasa</h3>
                <p className="text-sm text-amber-800 leading-relaxed">
                  En Chile, los bancos suelen publicar la tasa del depósito a plazo como{' '}
                  <strong>tasa mensual</strong> (por ejemplo, 0,40% mensual). Para usarla en este
                  simulador necesitas la <strong>tasa anual</strong>: multiplica por 12 como aproximación.
                </p>
                <p className="text-sm text-amber-800 mt-2 leading-relaxed">
                  Ejemplo: <strong>0,40% mensual × 12 = 4,8% anual</strong>. Ese es el valor que debes
                  ingresar en el campo de tasa del simulador.
                </p>
              </div>

              {/* Fondos Mutuos y APV */}
              <div className="border border-gray-100 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-1.5">📈 Fondos Mutuos y APV</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  La rentabilidad histórica la publican las propias administradoras en su sitio o app.
                  Recuerda que varía mes a mes y no garantiza el futuro. Revisa períodos de 1, 3 y 5 años
                  para tener una imagen más completa antes de usar una tasa en el simulador.
                </p>
              </div>

              {/* Cuentas Remuneradas */}
              <div className="border border-gray-100 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-1.5">🏧 Cuentas Remuneradas/Vista</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Cada banco o fintech publica su tasa directamente en su sitio web o app. Búscala bajo
                  "cuenta remunerada" o "cuenta con interés". Las tasas cambian seguido, así que conviene
                  verificarlas de forma directa y no fiarse solo de comparadores de terceros.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  ⚠️ <strong>Importante:</strong> las tasas en este simulador son 100% ilustrativas y
                  editables. No representan ningún producto real ni condiciones vigentes. Siempre verifica
                  directamente con las instituciones reguladas antes de tomar cualquier decisión.
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => setOpen(false)}
                className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors"
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
