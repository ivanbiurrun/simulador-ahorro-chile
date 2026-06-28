'use client';
import { useState } from 'react';
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
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* Columna izquierda — formulario */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h2 className="text-xl font-bold text-tinta mb-0.5">Define tu objetivo</h2>
            <p className="text-sm text-gray-400 mb-6">
              Completa los datos y proyectamos cómo crece tu plata.
            </p>
            <ObjetivoForm onSubmit={handleSubmit} />
          </div>

          {/* Columna derecha — resultados */}
          <div id="results" className="min-h-[200px]">
            {result && formData ? (
              <ResultPanel formData={formData} result={result} />
            ) : (
              <div className="bg-white rounded-2xl shadow-card p-8 text-center border border-gray-50">
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #0B7A56 0%, #12B886 100%)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                </div>
                <h3 className="font-semibold text-tinta mb-2">Tu proyección aparecerá aquí</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">
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
                    <div key={item.label} className="bg-crema rounded-xl p-3 border border-gray-100">
                      <div className="text-xl mb-1">{item.icon}</div>
                      <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Sección de productos — full width, separada del grid */}
      <div className="mt-4 border-t border-gray-100">
        <ProductFlipCards />
      </div>
    </>
  );
}
