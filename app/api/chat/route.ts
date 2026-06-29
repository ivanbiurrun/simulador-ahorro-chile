import { NextRequest, NextResponse } from 'next/server';

const MODELS = ['gemini-2.5-flash-lite', 'gemini-2.5-flash', 'gemini-2.0-flash'] as const;

const SYSTEM_PROMPT = `Eres un educador financiero chileno. Respondes preguntas educativas sobre los 4 productos de ahorro e inversión del mercado chileno: cuenta remunerada/vista, depósito a plazo, APV (Ahorro Previsional Voluntario) y fondos mutuos.

REGLAS ESTRICTAS:
1. Responder SOLO sobre ahorro, inversión, estos 4 productos y conceptos de finanzas personales en Chile.
2. NO dar asesoría ni recomendación personal. Si preguntan "¿en qué debería invertir?" o "¿qué me conviene?", aclarar que es educativo y sugerir consultar a un asesor financiero.
3. Si la pregunta es off-topic, redirigir amablemente: "Puedo ayudarte con dudas sobre cuenta remunerada, depósito a plazo, APV o fondos mutuos."
4. Respuestas cortas: 2–4 frases. Directo al grano, sin relleno.
5. Tono simple, en tú, español chileno. Nunca voseo ("vos", "hacés", "podés").
6. Nunca mencionar tasas específicas ni garantías de retorno.`;

const FALLBACK = 'La IA está con mucha demanda ahora, intenta de nuevo en unos segundos. Mientras tanto, revisa la sección "Conceptos en 1 minuto" más abajo.';

async function callModel(model: string, question: string, apiKey: string): Promise<string> {
  const prompt = `${SYSTEM_PROMPT}\n\nPregunta: ${question}\n\nResponde en 2–4 frases, directo al grano.`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 350, temperature: 0.7 },
      }),
      signal: AbortSignal.timeout(15000),
    }
  );

  if (res.status === 429 || res.status === 503) throw new Error(`retryable:${res.status}`);
  if (!res.ok) throw new Error(`error:${res.status}`);

  const data = await res.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('empty');
  return text.trim();
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 500 });

  let question: string;
  try {
    const body = await request.json();
    question = typeof body.question === 'string' ? body.question.trim() : '';
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!question) return NextResponse.json({ error: 'Missing question' }, { status: 400 });

  for (const model of MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const answer = await callModel(model, question, apiKey);
        return NextResponse.json({ answer });
      } catch (err) {
        const retryable = err instanceof Error && err.message.startsWith('retryable');
        if (retryable && attempt === 0) {
          await new Promise((r) => setTimeout(r, 2000));
          continue;
        }
        break;
      }
    }
  }

  return NextResponse.json({ answer: FALLBACK, fallback: true });
}
