'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, RotateCcw } from 'lucide-react';

const CACHE_TTL_MS = 5 * 60 * 1000;

function readCache(key: string): string | null {
  try {
    const raw = localStorage.getItem('chatc_' + key);
    if (!raw) return null;
    const { text, ts } = JSON.parse(raw) as { text: string; ts: number };
    if (Date.now() - ts > CACHE_TTL_MS) { localStorage.removeItem('chatc_' + key); return null; }
    return text;
  } catch { return null; }
}

function writeCache(key: string, text: string): void {
  try { localStorage.setItem('chatc_' + key, JSON.stringify({ text, ts: Date.now() })); } catch {}
}

function simpleHash(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const SUGERENCIAS = [
  '¿Qué diferencia hay entre un depósito a plazo y una cuenta remunerada?',
  '¿Cómo funciona el APV en Chile?',
  '¿Qué es un fondo mutuo de renta fija?',
  '¿Cuándo conviene tener fondo de emergencia?',
];

export default function ChatIA() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  async function send(question?: string) {
    const q = (question ?? input).trim();
    if (!q || loading) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setLoading(true);

    const cacheKey = simpleHash(q.toLowerCase().replace(/\s+/g, ' ').trim());

    const cached = readCache(cacheKey);
    if (cached) {
      setMessages((m) => [...m, { role: 'ai', text: cached }]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json() as { answer?: string; fallback?: boolean };
      const answer = data.answer ?? 'La IA está con mucha demanda ahora, intenta de nuevo en unos segundos. Mientras tanto, revisa la sección "Conceptos en 1 minuto" más abajo.';
      if (!data.fallback) writeCache(cacheKey, answer);
      setMessages((m) => [...m, { role: 'ai', text: answer }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'ai', text: 'La IA está con mucha demanda ahora, intenta de nuevo en unos segundos. Mientras tanto, revisa la sección "Conceptos en 1 minuto" más abajo.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Burbuja flotante */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            type="button"
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 flex items-center gap-2.5 px-4 py-3 rounded-full font-semibold text-sm text-white z-50"
            style={{ background: '#12B886', boxShadow: '0 4px 24px rgba(18,184,134,0.4)' }}
          >
            <MessageCircle className="w-4 h-4 flex-shrink-0" />
            ¿Tienes dudas? Pregunta
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel de chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl overflow-hidden"
            style={{
              width: 'min(380px, calc(100vw - 24px))',
              height: 'min(520px, calc(100dvh - 80px))',
              background: 'white',
              boxShadow: '0 8px 40px rgba(22,36,29,0.18)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ background: '#12B886' }}
            >
              <div>
                <p className="font-semibold text-white text-sm leading-tight">Chat educativo 💬</p>
                <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  Pregunta sobre los productos de ahorro
                </p>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => { setMessages([]); setInput(''); }}
                    className="flex items-center gap-1 text-white/80 hover:text-white transition-colors px-2 py-1 rounded-lg text-[11px] font-medium"
                    aria-label="Volver al inicio"
                    title="Nueva pregunta"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Inicio
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-white/70 hover:text-white transition-colors p-1 rounded-lg"
                  aria-label="Cerrar chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.length === 0 && (
                <div className="py-2">
                  <p className="text-sm mb-3" style={{ color: '#5C635A' }}>
                    Pregunta lo que quieras sobre los productos financieros de Chile:
                  </p>
                  <div className="space-y-2">
                    {SUGERENCIAS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        disabled={loading}
                        className="w-full text-left text-xs px-3 py-2 rounded-xl transition-colors"
                        style={{
                          background: '#F5F5F4',
                          color: '#16241D',
                          border: '1px solid #F0E9DC',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = '#E3F7EF';
                          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(18,184,134,0.3)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = '#F5F5F4';
                          (e.currentTarget as HTMLButtonElement).style.borderColor = '#F0E9DC';
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
                    style={
                      m.role === 'user'
                        ? { background: '#12B886', color: 'white', borderBottomRightRadius: '5px' }
                        : { background: '#F5F5F4', color: '#16241D', borderBottomLeftRadius: '5px' }
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div
                    className="rounded-2xl px-3.5 py-2.5 text-sm"
                    style={{
                      background: '#F5F5F4',
                      color: '#7A8077',
                      borderBottomLeftRadius: '5px',
                    }}
                  >
                    pensando…
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="flex-shrink-0 px-3 pb-3 pt-2"
              style={{ borderTop: '1px solid #F0E9DC' }}
            >
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
                  }}
                  placeholder="Escribe tu pregunta…"
                  disabled={loading}
                  className="flex-1 text-sm px-3 py-2.5 rounded-xl focus:outline-none transition-colors"
                  style={{ border: '1px solid #ECE4D6', color: '#16241D', background: 'white' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#12B886'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#ECE4D6'; }}
                />
                <button
                  type="button"
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{
                    background: loading || !input.trim() ? '#F5F5F4' : '#12B886',
                    color: loading || !input.trim() ? '#7A8077' : 'white',
                    cursor: loading || !input.trim() ? 'default' : 'pointer',
                  }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p
                className="text-[10px] mt-2 text-center"
                style={{ color: 'rgba(22,36,29,0.35)' }}
              >
                Respuestas educativas generadas por IA · no es asesoría financiera
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
