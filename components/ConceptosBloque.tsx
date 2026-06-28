'use client';
import CarruselShell from './CarruselShell';

const CONCEPTOS = [
  {
    icon: '📈',
    titulo: 'Interés compuesto',
    texto: 'Tus intereses generan más intereses. Por eso el tiempo pesa más que el monto: empezar antes rinde más que poner mucho después.',
  },
  {
    icon: '⚖️',
    titulo: 'Riesgo y rentabilidad',
    texto: 'Van juntos. Lo que puede rendir más también puede bajar. No existe "mucho y seguro" al mismo tiempo.',
  },
  {
    icon: '💧',
    titulo: 'Liquidez',
    texto: 'Qué tan rápido puedes sacar tu plata. Una cuenta es líquida; un depósito a plazo te la deja fija un tiempo.',
  },
  {
    icon: '🧩',
    titulo: 'Diversificar',
    texto: 'No pongas todo en un solo lugar. Repartir entre productos baja el riesgo de que un mal momento te pegue de lleno.',
  },
  {
    icon: '📉',
    titulo: 'Inflación',
    texto: 'Con el tiempo, la misma plata compra menos. Si tu ahorro no rinde al menos como la inflación, en la práctica estás perdiendo.',
  },
  {
    icon: '🇨🇱',
    titulo: 'UF',
    texto: 'Unidad que se ajusta con la inflación. En Chile muchos montos (arriendos, créditos) van en UF para no perder valor.',
  },
  {
    icon: '🛟',
    titulo: 'Fondo de emergencia',
    texto: 'Antes de invertir, ten 3 a 6 meses de gastos en algo líquido. Es tu colchón para imprevistos.',
  },
  {
    icon: '🕰️',
    titulo: 'Horizonte',
    texto: 'Cuándo vas a necesitar la plata. A más plazo puedes tolerar más riesgo; si la necesitas pronto, prioriza seguridad.',
  },
  {
    icon: '💸',
    titulo: 'Costos y comisiones',
    texto: 'Lo que cobra el producto te baja la rentabilidad. Una comisión chica, en muchos años, se nota.',
  },
  {
    icon: '🔢',
    titulo: 'Interés simple vs. compuesto',
    texto: 'Simple: ganas sobre el capital. Compuesto: ganas también sobre los intereses ya ganados — ese es el que hace la diferencia.',
  },
  {
    icon: '🎯',
    titulo: 'Perfil de riesgo',
    texto: 'Cuánta variación aguantas sin perder el sueño. No hay perfil bueno o malo: hay que conocer el tuyo.',
  },
  {
    icon: '🏛️',
    titulo: 'Beneficio tributario APV',
    texto: 'El Estado premia ahorrar para la jubilación: según el régimen, te devuelve impuestos o te aporta un %.',
  },
  {
    icon: '📅',
    titulo: 'Aporte constante',
    texto: 'Aportar un poco cada mes, en vez de todo de una, suaviza el efecto de los altibajos del mercado.',
  },
  {
    icon: '♻️',
    titulo: 'Reinversión',
    texto: 'Si dejas los intereses adentro en vez de gastarlos, generan más intereses. Es el motor del interés compuesto.',
  },
];

export default function ConceptosBloque() {
  return (
    <section className="max-w-[1440px] mx-auto px-10 lg:px-12 py-10">
      <CarruselShell
        scrollAmount={280}
        title={
          <>
            <h2 className="font-bold text-tinta" style={{ fontSize: '24px' }}>Conceptos en 1 minuto</h2>
            <p className="text-sm mt-1" style={{ color: '#7A8077' }}>
              Lo que conviene entender antes de decidir dónde poner tu plata.
            </p>
          </>
        }
      >
        {CONCEPTOS.map((c) => (
          <div
            key={c.titulo}
            className="bg-white rounded-2xl p-5 flex flex-col flex-shrink-0"
            style={{
              width: '260px',
              scrollSnapAlign: 'start',
              border: '1px solid #F0E9DC',
              boxShadow: '0 2px 10px rgba(22,36,29,0.06)',
            }}
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
            <p className="text-sm leading-relaxed" style={{ color: '#5C635A' }}>
              {c.texto}
            </p>
          </div>
        ))}
      </CarruselShell>
    </section>
  );
}
