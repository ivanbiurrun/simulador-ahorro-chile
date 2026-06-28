import { toMonths } from '@/hooks/useSimulador';
import type { SimulatorFormData, SimulationResult } from '@/types';

const PRODUCT_NAMES: Record<string, string> = {
  cuenta_remunerada: 'Cuenta Remunerada/Vista',
  deposito_plazo: 'Depósito a Plazo',
  apv: 'APV (Ahorro Previsional Voluntario)',
  fondo_mutuo: 'Fondo Mutuo',
};

const clp = (n: number) => new Intl.NumberFormat('es-CL').format(Math.round(n));

export function buildTipsPrompt(formData: SimulatorFormData, result: SimulationResult): string {
  const termMonths = toMonths(formData.termValue, formData.termUnit);
  const productName = PRODUCT_NAMES[formData.productType] ?? formData.productType;
  const termYears = (termMonths / 12).toFixed(1);

  const resultLine = result.reachesGoal
    ? `✓ SUPERÓ la meta: proyecta terminar con $${clp(result.surplus)} CLP de excedente.`
    : `✗ NO alcanza la meta: le faltan $${clp(result.gap)} CLP para llegar al objetivo.`;

  const resultInstruction = result.reachesGoal
    ? `El consejo DEBE mencionar el excedente de $${clp(result.surplus)} CLP y orientar educativamente sobre qué podría hacer con esa plata extra. Usa frases como "una opción es...", "podrías evaluar...", "vale la pena considerar...". Nunca menciones productos, instituciones ni tasas específicas.`
    : `El consejo DEBE mencionar que faltan $${clp(result.gap)} CLP y orientar sobre las palancas disponibles: aumentar el aporte mensual, extender el plazo, o revisar el instrumento. Usa frases como "una opción es...", "podrías evaluar si...", "considera que...". Nunca digas qué instrumento elegir.`;

  return `Eres un educador financiero chileno. Tu rol es enseñar conceptos de finanzas personales de forma clara y accesible.

El usuario simuló este escenario de ahorro:
- Objetivo: "${formData.objectiveName}"
- Producto elegido: ${productName}
- Tasa ilustrativa usada: ${formData.annualRate}% anual
- Plazo: ${termMonths} meses (${termYears} años)
- Meta de ahorro: $${clp(result.targetAmount)} CLP
- Proyección final: $${clp(result.finalAmount)} CLP
- RESULTADO: ${resultLine}

Genera EXACTAMENTE 1 consejo educativo que reaccione directamente al resultado de esta simulación.

INSTRUCCIÓN CLAVE:
${resultInstruction}

REGLAS ESTRICTAS — sin excepción:
1. SOLO educar: nunca prescribir qué hacer puntualmente ni recomendar productos o instituciones específicos.
2. NUNCA decir "te recomiendo", "deberías invertir en", "te conviene X producto".
3. NUNCA presentar tasas o rentabilidades como garantizadas o reales.
4. Usar EXCLUSIVAMENTE español chileno con tratamiento de "tú". JAMÁS voseo ("vos", "hacés", "podés").
5. Comenzar con un emoji relevante.
6. El consejo debe ser UNA IDEA COMPLETA: entre 2 y 4 oraciones completas, sin dejar frases a medias.

Formato: solo el texto del consejo. Sin numeración, sin títulos, sin texto antes ni después.`;
}

export function genericTip(result: SimulationResult): string {
  if (result.reachesGoal) {
    return `🎯 Con esta simulación proyectas superar la meta por ${clp(result.surplus)} CLP. Una opción es evaluar si extender el plazo te permite llegar a un segundo objetivo con ese mismo impulso. Recuerda que las condiciones de mercado cambian, así que conviene verificar las tasas vigentes antes de tomar cualquier decisión.`;
  }
  return `📊 La simulación muestra que te faltan ${clp(result.gap)} CLP para llegar a la meta. Una opción es aumentar el aporte mensual aunque sea un poco: gracias al efecto del interés compuesto, ese ajuste tiene más impacto cuanto antes lo hagas. También podrías evaluar extender el plazo o revisar si el tipo de instrumento elegido es el más adecuado para tu horizonte de tiempo.`;
}
