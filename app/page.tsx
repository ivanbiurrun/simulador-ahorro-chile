'use client';
import { useState } from 'react';
import HeroIntro from '@/components/HeroIntro';
import ObjetivoForm from '@/components/ObjetivoForm';
import ResultPanel from '@/components/ResultPanel';
import ProductFlipCards from '@/components/ProductFlipCards';
import { useSimulador } from '@/hooks/useSimulador';
import type { SimulatorFormData } from '@/types';

export default function Home() {
  const [formData, setFormData] = useState<SimulatorFormData | null>(null);
  const result = useSimulador(formData);

  function handleSubmit(fd: SimulatorFormData) {
    setFormData(fd);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  return (
    <>
      <HeroIntro />

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 items-start">

          {/* Columna izquierda — formulario ~38% */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <ObjetivoForm onSubmit={handleSubmit} />
          </div>

          {/* Columna derecha — resultado ~62%, sticky en desktop */}
          <div id="results" className="min-h-[200px] lg:sticky lg:top-6 lg:self-start">
            {result && formData ? (
              <ResultPanel formData={formData} result={result} />
            ) : (
              <div className="bg-white rounded-2xl shadow-card p-8 text-center">
                <div
                  className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #0B7A56 0%, #12B886 100%)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                </div>
                <h3 className="font-semibold text-tinta mb-2">Tu proyección aparecerá aquí</h3>
                <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: 'rgba(22,36,29,0.45)' }}>
                  Completa el formulario y toca{' '}
                  <span className="font-medium text-mango">&ldquo;Ver mi proyección&rdquo;</span>{' '}
                  para ver cómo crece tu plata.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { icon: '🎯', label: 'Define tu meta' },
                    { icon: '📈', label: 'Ve la proyección' },
                    { icon: '💡', label: 'Aprende al hacerlo' },
                  ].map((item) => (
                    <div key={item.label} className="bg-crema rounded-xl p-3">
                      <div className="text-xl mb-1">{item.icon}</div>
                      <p className="text-xs font-medium" style={{ color: 'rgba(22,36,29,0.5)' }}>{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      <div className="mt-4" style={{ borderTop: '1px solid rgba(22,36,29,0.06)' }}>
        <ProductFlipCards />
      </div>
    </>
  );
}
