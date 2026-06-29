'use client';
import { useState } from 'react';
import { toPng } from 'html-to-image';
import { Share2, Download } from 'lucide-react';

interface Props {
  captureRef: React.RefObject<HTMLDivElement | null>;
  objectiveName: string;
}

export default function ShareCard({ captureRef, objectiveName }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleShare() {
    if (!captureRef.current || loading) return;
    setLoading(true);
    try {
      const png = await toPng(captureRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: '#FBF5EC',
      });
      const slug = objectiveName
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
          await navigator.share({ title: `Mi proyección: ${objectiveName}`, files: [file] });
          return;
        } catch {
          // share rechazado o sin soporte para files → caer a descarga
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
  );
}

function triggerDownload(dataUrl: string, filename: string) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  a.click();
}
