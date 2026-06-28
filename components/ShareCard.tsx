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

function CardVisual({ formData, result }: Props) {
  const completion = Math.min((result.finalAmount / result.targetAmount) * 100, 100);

  return (
    <div
      style={{
        width: '600px',
        height: '340px',
        background: 'linear-gradient(135deg, #E3F7EF 0%, #FBF5EC 60%, #FFF0E3 100%)',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        padding: '36px 40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Círculo decorativo */}
      <div
        style={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'rgba(18,184,134,0.08)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div>
        <p
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#0B7A56',
            marginBottom: '10px',
            letterSpacing: '0.06em',
          }}
        >
          AHORRA CON CABEZA 🇨🇱
        </p>
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#16241D',
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {formData.objectiveName}
        </h2>
        <p style={{ fontSize: '14px', color: '#5C635A', marginTop: '6px' }}>
          en {termLabel(formData)}
          {result.reachesGoal ? ' · ✓ Meta alcanzada' : ' · En progreso'}
        </p>
      </div>

      {/* Cifras */}
      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontSize: '12px', color: '#7A8077', marginBottom: '4px' }}>
            Monto final proyectado
          </p>
          <p
            style={{
              fontSize: '38px',
              fontWeight: 700,
              color: '#12B886',
              margin: 0,
              lineHeight: 1,
            }}
          >
            {formatCLP(result.finalAmount)}
          </p>
        </div>
        <div>
          <p style={{ fontSize: '12px', color: '#7A8077', marginBottom: '4px' }}>
            {result.reachesGoal ? 'Te sobran' : 'Te faltan'}
          </p>
          <p
            style={{
              fontSize: '24px',
              fontWeight: 700,
              margin: 0,
              lineHeight: 1,
              color: result.reachesGoal ? '#0B7A56' : '#8A5A0C',
            }}
          >
            {formatCLP(result.reachesGoal ? result.surplus : result.gap)}
          </p>
        </div>
      </div>

      {/* Barra de progreso + footer */}
      <div>
        <div
          style={{
            height: '6px',
            borderRadius: '99px',
            background: 'rgba(18,184,134,0.18)',
            marginBottom: '8px',
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: '99px',
              background: result.reachesGoal ? '#12B886' : '#F4A82C',
              width: `${completion}%`,
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '11px', color: '#7A8077', margin: 0 }}>
            {completion.toFixed(0)}% de {formatCLP(result.targetAmount)}
          </p>
          <p style={{ fontSize: '10px', color: 'rgba(22,36,29,0.35)', margin: 0 }}>
            Simulación educativa · no es asesoría financiera
          </p>
        </div>
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
      const png = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      const filename = `ahorra-${formData.objectiveName
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()}.png`;

      if (typeof navigator !== 'undefined' && navigator.share) {
        try {
          const blob = await (await fetch(png)).blob();
          const file = new File([blob], filename, { type: 'image/png' });
          await navigator.share({ title: `Mi proyección: ${formData.objectiveName}`, files: [file] });
        } catch {
          // Si share falla (permisos, etc.) caer a descarga
          triggerDownload(png, filename);
        }
      } else {
        triggerDownload(png, filename);
      }
    } catch (err) {
      console.error('ShareCard error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Tarjeta oculta fuera de pantalla — siempre en el DOM para el ref */}
      <div
        style={{ position: 'fixed', left: '-9999px', top: 0, zIndex: -1, pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <div ref={cardRef}>
          <CardVisual formData={formData} result={result} />
        </div>
      </div>

      {/* Botón compartir */}
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
          <>
            <Download className="w-4 h-4" />
            Generando imagen…
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            Compartir mi proyección
          </>
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
