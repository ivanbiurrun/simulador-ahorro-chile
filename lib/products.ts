import type { ProductInfo } from '@/types';

export const PRODUCTS: ProductInfo[] = [
  {
    id: 'cuenta_remunerada',
    name: 'Cuenta Remunerada / Vista',
    defaultRate: 3.0,
    riskLevel: 'Muy bajo',
    description:
      'Una cuenta bancaria que paga intereses por el saldo que mantienes en ella. Puedes depositar y retirar cuando quieras, sin plazo mínimo. Es el producto más accesible y líquido del mercado.',
    advantages: [
      'Liquidez inmediata: accedes a tu dinero en cualquier momento.',
      'Riesgo muy bajo: los depósitos tienen garantía estatal hasta UF 250 por persona, por institución.',
      'Sin plazo fijo ni penalidades por retiro anticipado.',
    ],
    considerations: [
      'Las tasas suelen ser más bajas que otros productos de mayor plazo.',
      'La tasa puede variar en el tiempo, no está garantizada.',
    ],
    bestFor:
      'Para objetivos de corto plazo (0–1 año) donde podrías necesitar la plata rápido, como un fondo de emergencia o ahorro para un gasto próximo. Acá la liquidez importa más que la rentabilidad.',
    rateTerminology: 'Tasa anual o interés',
    rateNote:
      'En este producto verás la tasa como "tasa anual" o simplemente "interés". Es directa: si dice 3% anual, eso recibirás sobre tu saldo promedio en el año.',
  },
  {
    id: 'deposito_plazo',
    name: 'Depósito a Plazo',
    defaultRate: 5.5,
    riskLevel: 'Muy bajo',
    description:
      'Dejas un monto fijo en el banco por un período determinado (1 mes, 3 meses, 1 año…) y al vencimiento recuperas tu capital más los intereses pactados. La tasa queda fija desde el inicio.',
    advantages: [
      'Tasa fija y conocida de antemano: sabes exactamente cuánto ganarás.',
      'Riesgo muy bajo: también cuenta con garantía estatal de UF 250.',
      'Buena alternativa para metas con una fecha clara.',
    ],
    considerations: [
      'Baja liquidez: retiro anticipado puede implicar penalidades o pérdida de intereses.',
      'El dinero queda "bloqueado" hasta que vence el plazo.',
    ],
    bestFor:
      'Para objetivos con fecha definida y dinero que no necesitas tocar antes de esa fecha, como las vacaciones del próximo verano o un gasto programado. La certeza del retorno es la ventaja clave.',
    rateTerminology: 'Tasa de interés (a veces mensual)',
    rateNote:
      '¡Atención! En depósitos a plazo, la tasa suele expresarse de forma MENSUAL (ej: 0,45% mensual). Para comparar con tasas anuales, multiplica por 12 como aproximación: 0,45% × 12 ≈ 5,4% anual. Este simulador usa tasa anual, así que haz esa conversión antes de ingresar el dato.',
  },
  {
    id: 'apv',
    name: 'APV (Ahorro Previsional Voluntario)',
    defaultRate: 6.5,
    riskLevel: 'Medio',
    description:
      'El APV es un instrumento de ahorro para la jubilación con beneficios tributarios otorgados por el Estado chileno. Puedes ahorrar en distintos tipos de fondos y el Estado te bonifica parte de lo que aportas o te permite descontar de impuestos.',
    advantages: [
      'Beneficio tributario: el Estado puede bonificarte hasta 15% de tus aportes (Régimen A) o puedes deducir de la base imponible (Régimen B).',
      'Potencial de mayor rentabilidad a largo plazo que productos de renta fija.',
      'Amplia variedad de fondos según tu tolerancia al riesgo.',
    ],
    considerations: [
      'Baja liquidez: hay restricciones para retirar antes de jubilarte sin perder los beneficios tributarios.',
      'La rentabilidad es histórica, no garantizada: puede variar año a año.',
      'Requiere entender qué régimen y tipo de fondo conviene según tu situación tributaria.',
    ],
    bestFor:
      'Para objetivos de largo plazo (10+ años), especialmente complementar la jubilación. La baja liquidez y los beneficios tributarios lo hacen particularmente atractivo si tienes un horizonte temporal extenso y no necesitarás ese dinero pronto.',
    rateTerminology: 'Rentabilidad (histórica, no garantizada)',
    rateNote:
      'En el APV no hay una "tasa fija": verás "rentabilidad" expresada como porcentaje, y siempre es HISTÓRICA — refleja lo que rindió el fondo en períodos pasados, no garantiza el futuro. Varía según el fondo que elijas (desde más conservador hasta más agresivo en acciones).',
  },
  {
    id: 'fondo_mutuo',
    name: 'Fondo Mutuo',
    defaultRate: 5.5,
    riskLevel: 'Medio',
    description:
      'Un fondo mutuo reúne el dinero de muchos ahorradores y lo invierte en una cartera diversificada (bonos, acciones, instrumentos de deuda, etc.). Una administradora profesional gestiona las inversiones. Puedes entrar y salir con más flexibilidad que en un depósito a plazo.',
    advantages: [
      'Diversificación: tu plata se invierte en múltiples activos, reduciendo el riesgo de que "todo salga mal".',
      'Gestión profesional: expertos toman las decisiones de inversión.',
      'Variedad: desde fondos conservadores de renta fija hasta fondos de acciones con más riesgo y potencial.',
    ],
    considerations: [
      'Rentabilidad NO garantizada: puede ser positiva o negativa.',
      'Tiene comisión de administración que afecta la rentabilidad neta.',
      'El riesgo varía mucho entre fondos: compara antes de elegir.',
    ],
    bestFor:
      'Para objetivos de mediano a largo plazo (2+ años) donde puedas tolerar cierta variabilidad en el valor de tu inversión a cambio de un mayor potencial de retorno. Para plazos muy cortos, los fondos de renta fija o money market son alternativas más estables dentro de esta categoría.',
    rateTerminology: 'Rentabilidad (histórica, no garantizada)',
    rateNote:
      'Los fondos mutuos muestran "rentabilidad" en vez de "tasa", y siempre es HISTÓRICA: refleja cómo rindió el fondo en períodos pasados. No garantiza el futuro. Además, la rentabilidad que ves puede ser antes o después de la comisión de administración — verifica cuál es la rentabilidad NETA para comparar bien.',
  },
];

export function getProductById(id: string): ProductInfo | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
