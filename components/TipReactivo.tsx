'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { askGemini } from '@/lib/gemini';
import { buildTipsPrompt, genericTip } from '@/lib/tips-prompt';
import { formatCLP } from '@/lib/formatters';
import { toMonths } from '@/hooks/useSimulador';
import type { SimulatorFormData, SimulationResult } from '@/types';

interface TipReactivoProps {
  formData: SimulatorFormData;
  result: SimulationResult;
}

function isCompleteSentence(text: string): boolean {
  const trimmed = text.trim();
  return trimmed.length > 30 && /[.!?]$/.test(trimmed);
}

function localTip(result: SimulationResult, formData: SimulatorFormData): string {
  const termMonths = toMonths(formData.termValue, formData.termUnit);

  if (result.reachesGoal) {
    if (result.surplus < result.targetAmount * 0.04) {
      return `Justo llegas. Para tener un colchón, sube el aporte o suma un par de meses — es mejor llegar con margen que exacto.`;
    }
    return `Te sobran ${formatCLP(result.surplus)}. Si no los necesitas para "${formData.objectiveName}", moverlos a un fondo mutuo los deja seguir creciendo en vez de quedarse quietos en la cuenta.`;
  }

  const extraMonthlyNeeded = formData.monthlyContribution > 0
    ? Math.ceil((result.gap / termMonths) / 1000) * 1000
    : null;
  const extraMonths = formData.monthlyContribution > 0
    ? Math.ceil(result.gap / formData.monthlyContribution)
    : null;
  const totalMonths = termMonths + (extraMonths ?? 0);
  const totalLabel = totalMonths >= 12
    ? `${Math.round((totalMonths / 12) * 10) / 10} años`
    : `${totalMonths} meses`;

  if (extraMonthlyNeeded !== null && extraMonths !== null) {
    return `Te faltan ${formatCLP(result.gap)} para tu meta. Subiendo el aporte en ~${formatCLP(extraMonthlyNeeded)} llegas en el mismo plazo, o estirando a ${totalLabel} sin tocar el aporte. El interés rinde más mientras más tiempo le des.`;
  }

  return `Te faltan ${formatCLP(result.gap)} para tu meta. Define un aporte mensual y extiende el plazo para llegar — el interés compuesto rinde más mientras más tiempo le des.`;
}

export default function TipReactivo({ formData, result }: TipReactivoProps) {
  const [tip, setTip] = useState<string>(() => localTip(result, formData));
  const [fromAI, setFromAI] = useState(false);
  const [loading, setLoading] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    const local = localTip(result, formData);
    setTip(local);
    setFromAI(false);
    setLoading(true);

    const prompt = buildTipsPrompt(formData, result);
    // Clave de caché: granularidad por resultado y producto
    const cacheKey = `tip_${formData.productType}_${result.reachesGoal ? 'ok' : 'nok'}_${Math.round(result.finalAmount / 50000)}`;

    let cancelled = false;

    askGemini(prompt, { cacheKey, maxRetries: 2, timeoutMs: 9000 })
      .then(({ text }) => {
        if (cancelled) return;
        if (text && isCompleteSentence(text)) {
          setTip(text);
          setFromAI(true);
        } else {
          setTip(genericTip(result));
        }
      })
      .catch(() => {
        if (!cancelled) setTip(genericTip(result));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [formData, result]);

  return (
    <div className="rounded-2xl p-4 border" style={{ background: '#E7F2FD', borderColor: 'rgba(77,171,247,0.2)' }}>
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="font-semibold text-sm flex items-center gap-1.5" style={{ color: '#1565A8' }}>
          <motion.span
            animate={reduced ? {} : { opacity: [1, 0.55, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            💡
          </motion.span>
          Consejo
        </h3>
        <span
          className="text-xs px-2 py-0.5 rounded-full bg-white"
          style={{ color: '#4DABF7', border: '1px solid rgba(77,171,247,0.3)' }}
        >
          {loading ? 'cargando…' : fromAI ? 'IA · educativo' : 'educativo'}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={tip}
          initial={reduced ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm leading-relaxed"
          style={{ color: '#16241D' }}
        >
          {tip}
        </motion.p>
      </AnimatePresence>

      <p
        className="text-[11px] mt-3 pt-2.5"
        style={{ borderTop: '1px solid rgba(77,171,247,0.15)', color: 'rgba(22,36,29,0.4)' }}
      >
        Educativo y general. No es asesoría financiera ni recomendación personal.
      </p>
    </div>
  );
}
