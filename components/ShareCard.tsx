'use client';
import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { Share2, Download } from 'lucide-react';
import { formatCLP } from '@/lib/formatters';
import { toMonths } from '@/hooks/useSimulador';
import type { SimulatorFormData, SimulationResult } from '@/types';

function termLabel(fd: SimulatorFormData): string {
  const m = toMonths(fd.termValue, fd.termUnit);
  const y = Math.floor(m / 12);
  const rem = m % 12;
  if (y > 0 && rem > 0) return `${y} año${y > 1 ? 's' : ''} y ${rem} mes${rem > 1 ? 'es' : ''}`;
  if (y > 0) return `${y} año${y > 1 ? 's' : ''}`;
  return `${m} mes${m !== 1 ? 'es' : ''}`;
}

interface Props {
  formData: SimulatorFormData;
  result: SimulationResult;
}

// Renderizada a 540×540 + pixelRatio:2 = PNG 1080×1080 (óptimo para redes)
function CardVisual({ formData, result }: Props) {
  const completion = Math.min((result.finalAmount / result.targetAmount) * 100, 100);

  return (
    <div
      style={{
        width: '540px',
        height: '540px',
        background: 'linear-gradient(145deg, #E3F7EF 0%, #FBF5EC 50%, #FFF0E3 100%)',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Franja verde izquierda */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px', background: '#12B886' }} />

      {/* Círculos decorativos */}
      <div style={{
        position: 'absolute', top: -90, right: -90,
        width: 280, height: 280, borderRadius: '50%',
        background: 'rgba(18,184,134,0.07)',
      }} />
      <div style={{
        position: 'absolute', bottom: -60, left: 40,
        width: 180, height: 180, borderRadius: '50%',
        background: 'rgba(244,168,44,0.06)',
      }} />

      {/* Contenido */}
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '44px 48px 36px 52px', boxSizing: 'border-box' }}>

        {/* Marca */}
        <p style={{ fontSize: '12px', fontWeight: 700, color: '#0B7A56', letterSpacing: '0.07em', marginBottom: '20px' }}>
          AHORRA CON CABEZA 🇨🇱
        </p>

        {/* Objetivo */}
        <h2 style={{ fontSize: '30px', fontWeight: 700, color: '#16241D', margin: 0, lineHeight: 1.2, marginBottom: '6px', wordBreak: 'break-word' }}>
          {formData.objectiveName}
        </h2>
        <p style={{ fontSize: '15px', color: '#5C635A', marginBottom: 0 }}>
          en {termLabel(formData)}{result.reachesGoal ? ' · ✓ Meta alcanzada' : ''}
        </p>

        {/* Separador */}
        <div style={{ flex: 1 }} />

        {/* Monto final */}
        <div style={{ marginBottom: '18px' }}>
          <p style={{ fontSize: '13px', color: '#7A8077', marginBottom: '6px' }}>
            Monto final proyectado
          </p>
          <p style={{ fontSize: '46px', fontWeight: 800, color: '#12B886', lineHeight: 1, margin: 0 }}>
            {formatCLP(result.finalAmount)}
          </p>
        </div>

        {/* Surplus / Gap */}
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: result.reachesGoal ? 'rgba(18,184,134,0.1)' : 'rgba(244,168,44,0.12)',
            borderRadius: '12px', padding: '8px 16px', marginBottom: '24px', alignSelf: 'flex-start',
          }}
        >
          <span style={{ fontSize: '22px', fontWeight: 700, color: result.reachesGoal ? '#0B7A56' : '#8A5A0C' }}>
            {result.reachesGoal ? '↑' : '↑'}
          </span>
          <div>
            <p style={{ fontSize: '11px', color: '#7A8077', margin: 0 }}>
              {result.reachesGoal ? 'Te sobran' : 'Te faltan'}
            </p>
            <p style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: result.reachesGoal ? '#0B7A56' : '#8A5A0C' }}>
              {formatCLP(result.reachesGoal ? result.surplus : result.gap)}
            </p>
          </div>
        </div>

        {/* Barra de progreso */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ height: '8px', borderRadius: '99px', background: 'rgba(22,36,29,0.08)', marginBottom: '6px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: '99px',
              background: result.reachesGoal ? '#12B886' : '#F4A82C',
              width: `${completion}%`,
            }} />
          </div>
          <p style={{ fontSize: '12px', color: '#7A8077', margin: 0 }}>
            {completion.toFixed(0)}% de {formatCLP(result.targetAmount)}
          </p>
        </div>

        {/* Footer */}
        <p style={{ fontSize: '10px', color: 'rgba(22,36,29,0.3)', margin: 0 }}>
          Simulación educativa · no es asesoría financiera
        </p>

      </div>
    </div>
  );
}

export default function ShareCard({ formData, result }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleShare() {
    if (!cardRef.current || loading) return;
    setLoading(true);
    try {
      // pixelRatio:2 sobre 540px = PNG 1080×1080
      const png = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      const slug = formData.objectiveName
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/gi, '')
        .toLowerCase();
      const filename = `ahorra-${slug}.png`;

      if (typeof navigator !== 'undefined' && navigator.share) {
        try {
          const blob = await (await fetch(png)).blob();
          const file = new File([blob], filename, { type: 'image/png' });
          await navigator.share({ title: `Mi proyección: ${formData.objectiveName}`, files: [file] });
          return;
        } catch {
          // share rechazado o no soporta files → caer a descarga
        }
      }
      triggerDownload(png, filename);
    } catch (err) {
      console.error('ShareCard error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Tarjeta oculta off-screen — siempre en el DOM para que el ref esté listo */}
      <div
        style={{ position: 'fixed', left: '-9999px', top: 0, zIndex: -1, pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <div ref={cardRef}>
          <CardVisual formData={formData} result={result} />
        </div>
      </div>

      {/* Botón */}
      <button
        type="button"
        onClick={handleShare}
        disabled={loading}
        className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors w-full justify-center"
        style={{
          background: loading ? '#E3F7EF' : 'white',
          color: loading ? '#7A8077' : '#12B886',
          border: '1.5px solid',
          borderColor: loading ? '#ECE4D6' : '#12B886',
          cursor: loading ? 'default' : 'pointer',
        }}
      >
        {loading ? (
          <><Download className="w-4 h-4" />Generando imagen…</>
        ) : (
          <><Share2 className="w-4 h-4" />Compartir mi proyección</>
        )}
      </button>
    </>
  );
}

function triggerDownload(dataUrl: string, filename: string) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  a.click();
}
