import { NextRequest, NextResponse } from 'next/server';

const MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-2.0-flash'] as const;

interface TipsRequest {
  objectiveName: string;
  targetAmount: number;
  finalAmount: number;
  productType: string;
  annualRate: number;
  termMonths: number;
  reachesGoal: boolean;
  surplus: number;
  gap: number;
}

const PRODUCT_NAMES: Record<string, string> = {
  cuenta_remunerada: 'Cuenta Remunerada/Vista',
  deposito_plazo: 'Depósito a Plazo',
  apv: 'APV (Ahorro Previsional Voluntario)',
  fondo_mutuo: 'Fondo Mutuo',
};

function buildPrompt(d: TipsRequest): string {
  const productName = PRODUCT_NAMES[d.productType] ?? d.productType;
  const termYears = (d.termMonths / 12).toFixed(1);
  const clp = (n: number) => new Intl.NumberFormat('es-CL').format(n);

  const resultLine = d.reachesGoal
    ? `✓ SUPERÓ la meta: proyecta terminar con $${clp(d.surplus)} CLP de excedente sobre el objetivo.`
    : `✗ NO alcanza la meta: le faltan $${clp(d.gap)} CLP para llegar al objetivo.`;

  const resultInstruction = d.reachesGoal
    ? `El consejo DEBE mencionar el excedente de $${clp(d.surplus)} CLP y orientar de forma educativa sobre qué podría hacer con esa plata extra: ¿conviene mantenerla más tiempo en el mismo instrumento? ¿vale la pena diversificar hacia otra categoría de ahorro? ¿extender el plazo? Usa frases como "una opción es...", "podrías evaluar...", "vale la pena considerar...". Nunca menciones productos, instituciones ni tasas específicas.`
    : `El consejo DEBE mencionar que faltan $${clp(d.gap)} CLP y orientar sobre las palancas disponibles para acercarse a la meta: aumentar el aporte mensual (aunque sea un poco, el efecto se acumula), extender el plazo, o revisar si el tipo de instrumento es adecuado para el horizonte de tiempo. Usa frases como "una opción es...", "podrías evaluar si...", "considera que...". Nunca digas qué instrumento elegir.`;

  return `Eres un educador financiero chileno. Tu rol es enseñar conceptos de finanzas personales de forma clara y accesible.

El usuario simuló este escenario de ahorro:
- Objetivo: "${d.objectiveName}"
- Producto elegido: ${productName}
- Tasa ilustrativa usada: ${d.annualRate}% anual
- Plazo: ${d.termMonths} meses (${termYears} años)
- Meta de ahorro: $${clp(d.targetAmount)} CLP
- Proyección final: $${clp(d.finalAmount)} CLP
- RESULTADO: ${resultLine}

Genera EXACTAMENTE 1 consejo educativo que reaccione directamente al resultado de esta simulación.

INSTRUCCIÓN CLAVE:
${resultInstruction}

REGLAS ESTRICTAS — sin excepción:
1. SOLO educar: nunca prescribir qué hacer puntualmente ni recomendar productos o instituciones específicos
2. NUNCA decir "te recomiendo", "deberías invertir en", "te conviene X producto" ni mencionar bancos, AFP, fintechs u otras instituciones por nombre
3. NUNCA presentar tasas o rentabilidades como garantizadas o reales
4. Usar EXCLUSIVAMENTE español chileno con tratamiento de "tú". JAMÁS usar voseo ("vos", "hacés", "podés", "tomá"). Correcto: "cuando ahorras", "si aumentas tus aportes", "considera", "puedes". Incorrecto: "cuando ahorrás", "si aumentás".
5. Comenzar con un emoji relevante
6. El consejo debe ser UNA IDEA COMPLETA: entre 2 y 4 oraciones completas, sin dejar frases a medias ni terminar con coma.

Formato: solo el texto del consejo. Sin numeración, sin títulos, sin texto antes ni después.`;
}

function genericTips(d: TipsRequest): string {
  const clp = (n: number) => new Intl.NumberFormat('es-CL').format(n);

  if (d.reachesGoal) {
    return `🎯 Con esta simulación proyectas superar la meta por $${clp(d.surplus)} CLP. Una opción es evaluar si extender el plazo o mantener los aportes te permite llegar a un segundo objetivo con ese mismo impulso; otra es revisar si el instrumento elegido sigue siendo el más adecuado para ese horizonte más largo. Recuerda que las condiciones de mercado cambian, así que conviene verificar las tasas vigentes antes de tomar cualquier decisión.`;
  }

  return `📊 La simulación muestra que te faltan $${clp(d.gap)} CLP para llegar a la meta. Una opción es aumentar el aporte mensual aunque sea un poco: gracias al efecto del interés compuesto, ese ajuste tiene más impacto cuanto antes lo hagas. También podrías evaluar extender el plazo o revisar si el tipo de instrumento elegido es el más adecuado para tu horizonte de tiempo, ya que diferentes productos tienen distintos niveles de liquidez y rentabilidad potencial.`;
}

async function callGemini(model: string, prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 500, temperature: 0.7 },
      }),
      signal: AbortSignal.timeout(25000),
    }
  );

  if (res.status === 429 || res.status === 503) {
    throw new Error(`retryable:${res.status}`);
  }
  if (!res.ok) {
    throw new Error(`error:${res.status}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('empty response');
  return text as string;
}

export async function POST(request: NextRequest) {
  try {
    const body: TipsRequest = await request.json();
    const prompt = buildPrompt(body);

    for (const model of MODELS) {
      try {
        const tips = await callGemini(model, prompt);
        return NextResponse.json({ tips, model });
      } catch {
        continue;
      }
    }

    return NextResponse.json({ tips: genericTips(body), model: 'fallback' });
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
