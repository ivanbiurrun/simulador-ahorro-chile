// Client-side Gemini client — cascada de modelos, reintentos y caché localStorage.
const MODELS = ['gemini-2.5-flash-lite', 'gemini-2.5-flash', 'gemini-2.0-flash'] as const;
type GeminiModel = (typeof MODELS)[number];

const CACHE_PREFIX = 'gmc_';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 min

interface CacheEntry {
  text: string;
  ts: number;
}

function readCache(key: string): string | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { text, ts }: CacheEntry = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL_MS) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return text;
  } catch {
    return null;
  }
}

function writeCache(key: string, text: string): void {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ text, ts: Date.now() }));
  } catch {
    // storage full or unavailable — ignorar
  }
}

async function callModel(model: GeminiModel, prompt: string, timeoutMs: number): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) throw new Error('no_key');

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 450, temperature: 0.7 },
      }),
      signal: AbortSignal.timeout(timeoutMs),
    }
  );

  if (res.status === 429 || res.status === 503) throw new Error(`retryable:${res.status}`);
  if (!res.ok) throw new Error(`error:${res.status}`);

  const data = await res.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('empty');
  return text;
}

export interface GeminiResult {
  text: string;
  model: GeminiModel | 'cache';
  fromCache: boolean;
}

export async function askGemini(
  prompt: string,
  opts: { maxRetries?: number; timeoutMs?: number; cacheKey?: string } = {}
): Promise<GeminiResult> {
  const { maxRetries = 2, timeoutMs = 9000, cacheKey } = opts;

  if (cacheKey) {
    const cached = readCache(cacheKey);
    if (cached) return { text: cached, model: 'cache', fromCache: true };
  }

  for (const model of MODELS) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const text = await callModel(model, prompt, timeoutMs);
        if (cacheKey) writeCache(cacheKey, text);
        return { text, model, fromCache: false };
      } catch (err) {
        const retryable = err instanceof Error && err.message.startsWith('retryable');
        if (retryable && attempt < maxRetries - 1) {
          await new Promise((r) => setTimeout(r, 2000));
          continue;
        }
        break; // pasar al siguiente modelo
      }
    }
  }

  throw new Error('all_models_failed');
}
