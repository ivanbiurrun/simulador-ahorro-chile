'use client';
import { useState } from 'react';
import { ChevronDown, TrendingUp } from 'lucide-react';

const INSTRUMENTS = [
  {
    emoji: '📈',
    name: 'Acciones',
    description:
      'Una acción es una pequeña parte de la propiedad de una empresa. Si la empresa crece, sube el precio de tu acción y puedes ganar. También puedes recibir dividendos (una parte de las utilidades). Pero si la empresa va mal, tu inversión puede perder valor.',
    risk: 'Alto',
    liquidity: 'Alta (bolsa abierta en horario bursátil)',
    horizon: 'Largo plazo (5+ años recomendado)',
    whyNoSim:
      'El precio de las acciones sube y baja según el mercado, los resultados de la empresa, la economía global y factores impredecibles. No existe una "tasa" fija ni garantizada. Proyectar con una tasa fija daría una cifra falsa que podría llevar a decisiones muy equivocadas.',
    whatToLook:
      'Rentabilidad histórica en períodos largos (5–10+ años), volatilidad, sector, bolsa donde cotiza (Bolsa de Santiago, NYSE, etc.).',
  },
  {
    emoji: '🧩',
    name: 'ETFs (Fondos Cotizados)',
    description:
      'Un ETF es una canasta de activos —puede incluir acciones, bonos o materias primas— que cotiza en bolsa como si fuera una sola acción. Te permite diversificar con una sola operación y generalmente tiene costos de gestión bajos.',
    risk: 'Variable (depende del tipo de ETF)',
    liquidity: 'Alta (se compran y venden en bolsa)',
    horizon: 'Mediano a largo plazo (3+ años)',
    whyNoSim:
      'El valor del ETF fluctúa con el mercado. Un ETF de acciones tecnológicas puede caer 30% en un año y subir 40% al siguiente. No hay tasa garantizada ni predecible, por eso no es posible simular con precisión.',
    whatToLook:
      'Tipo de activos que incluye, TER (comisión de gestión anual), volumen de transacción, índice que replica.',
  },
  {
    emoji: '📄',
    name: 'Bonos',
    description:
      'Un bono es un préstamo que le haces a una empresa o gobierno: ellos se comprometen a devolverte el capital más intereses en un plazo definido. Los bonos de gobierno suelen ser más seguros; los corporativos tienen más riesgo pero mayor retorno potencial.',
    risk: 'Bajo a medio (según emisor y plazo)',
    liquidity: 'Variable (algunos se transan en mercado secundario, otros no)',
    horizon: 'Variado (corto a largo plazo)',
    whyNoSim:
      'Aunque los bonos tienen una tasa acordada al emitirse, su precio en el mercado secundario fluctúa con las tasas de interés del mercado. Además, en Chile para invertir directamente suelen requerirse montos altos o hacerlo a través de fondos especializados.',
    whatToLook:
      'Clasificación de riesgo del emisor (rating), plazo, tasa cupón, si está denominado en UF o pesos.',
  },
];

export default function RentaVariableSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-8">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-white border border-gray-200 rounded-2xl p-5 flex items-center justify-between hover:border-gray-300 transition-all shadow-sm group text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 group-hover:text-violet-700 transition-colors">
              Conocé otros instrumentos: Renta Variable
            </p>
            <p className="text-sm text-gray-400">Acciones, ETFs y Bonos · Solo educativo · Sin simulación de tasa fija</p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-3 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {INSTRUMENTS.map((item) => (
            <div key={item.name} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{item.emoji}</span>
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>

              <div className="space-y-1.5">
                {[
                  { label: 'Riesgo', value: item.risk },
                  { label: 'Liquidez', value: item.liquidity },
                  { label: 'Horizonte', value: item.horizon },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-2 text-xs">
                    <span className="text-gray-400 font-medium w-20 flex-shrink-0">{label}:</span>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-violet-50 border border-violet-100 rounded-xl p-3">
                <p className="text-xs font-semibold text-violet-700 mb-1.5">
                  ¿Por qué no se simula con tasa fija?
                </p>
                <p className="text-xs text-violet-800 leading-relaxed">{item.whyNoSim}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-gray-500 mb-1">Qué mirar al investigar:</p>
                <p className="text-xs text-gray-600 leading-relaxed">{item.whatToLook}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
