'use client';
import { useState } from 'react';
import SimulatorForm from '@/components/SimulatorForm';
import ResultsPanel from '@/components/ResultsPanel';
import RentaVariableSection from '@/components/RentaVariableSection';
import type { SimulatorFormData, SimulationResult } from '@/types';

export default function Home() {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [formData, setFormData] = useState<SimulatorFormData | null>(null);

  function handleResult(fd: SimulatorFormData, res: SimulationResult) {
    setFormData(fd);
    setResult(res);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  return (
    <>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-0.5">Define tu objetivo</h2>
            <p className="text-sm text-gray-400 mb-6">
              Completa los datos y proyectamos cómo crece tu plata.
            </p>
            <SimulatorForm onResult={handleResult} />
          </div>

          {/* Results */}
          <div id="results" className="min-h-[200px]">
            {result && formData ? (
              <ResultsPanel formData={formData} result={result} />
            ) : (
              <div className="bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 rounded-2xl p-8 text-center border border-teal-100">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="font-semibold text-gray-800 mb-2 text-lg">Tu proyección aparecerá aquí</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                  Completa el formulario y haz clic en{' '}
                  <span className="font-medium text-teal-600">&quot;Simular ahorro&quot;</span> para ver
                  cómo crece tu plata en el tiempo.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  {[
                    { icon: '🎯', label: 'Define tu meta' },
                    { icon: '📈', label: 'Ve la proyección' },
                    { icon: '💡', label: 'Aprende al hacerlo' },
                  ].map((item) => (
                    <div key={item.label} className="bg-white rounded-xl p-3 border border-teal-100 shadow-sm">
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

      {/* Renta variable section */}
      <div className="mt-4">
        <RentaVariableSection />
      </div>
    </>
  );
}
