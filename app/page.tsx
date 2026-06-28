'use client';
import { useState } from 'react';
import HeroIntro from '@/components/HeroIntro';
import ObjetivoForm from '@/components/ObjetivoForm';
import ResultPanel from '@/components/ResultPanel';
import ProductFlipCards from '@/components/ProductFlipCards';
import ConceptosBloque from '@/components/ConceptosBloque';
import NovedadesBloque from '@/components/NovedadesBloque';
import { useSimulador } from '@/hooks/useSimulador';
import type { SimulatorFormData } from '@/types';
import { formatCLP } from '@/lib/formatters';

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

      <main className="max-w-[1440px] mx-auto px-10 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 items-start">

          {/* Columna izquierda — formulario */}
          <div className="bg-white rounded-2xl p-7" style={{ boxShadow: '0 2px 10px rgba(22,36,29,0.06)', border: '1px solid #F0E9DC' }}>
            <ObjetivoForm onSubmit={handleSubmit} />
          </div>

          {/* Columna derecha — resultado, sticky en desktop */}
          <div id="results" className="lg:sticky lg:top-6 lg:self-start">
            {result && formData ? (
              <ResultPanel formData={formData} result={result} />
            ) : (
              /* Estado cero — layout real del resultado, atenuado */
              <div className="space-y-4" style={{ opacity: 0.65 }}>

                {/* ResultHeader neutro */}
                <div>
                  <p className="text-sm mb-3" style={{ color: '#7A8077' }}>
                    Completa tu objetivo y toca{' '}
                    <span className="font-medium" style={{ color: '#F46A1F' }}>"Ver mi proyección"</span>{' '}
                    para ver la proyección aquí.
                  </p>
                  <div className="h-1.5 rounded-full" style={{ background: '#E3F7EF' }}>
                    <div className="h-full w-0 rounded-full" style={{ background: '#12B886' }} />
                  </div>
                  <p className="text-xs mt-1 text-right" style={{ color: '#7A8077' }}>0%</p>
                </div>

                {/* 4 metric cards en cero */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Monto final proyectado', sub: '',                       green: false },
                    { label: 'Tu objetivo',             sub: '—',                     green: false },
                    { label: 'Total aportado',          sub: 'Tu capital',            green: false },
                    { label: 'Rendimiento generado',    sub: 'Lo que trabajará tu plata', green: true },
                  ].map((c) => (
                    <div
                      key={c.label}
                      className="rounded-2xl p-4"
                      style={{
                        background: c.green ? '#E3F7EF' : '#FFFFFF',
                        boxShadow: '0 2px 10px rgba(22,36,29,0.06)',
                      }}
                    >
                      <p className="font-medium mb-1.5 leading-tight" style={{ fontSize: '13px', color: '#7A8077' }}>{c.label}</p>
                      <p className="font-bold tabular-nums" style={{ fontSize: '30px', color: c.green ? '#0B7A56' : '#16241D' }}>
                        {formatCLP(0)}
                      </p>
                      {c.sub && <p className="text-xs mt-1" style={{ color: '#7A8077' }}>{c.sub}</p>}
                    </div>
                  ))}
                </div>

                {/* Tabla placeholder */}
                <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 10px rgba(22,36,29,0.06)' }}>
                  <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #F2ECE0' }}>
                    <h3 className="font-semibold text-tinta text-sm">Evolución del ahorro</h3>
                    <div className="flex rounded-xl p-0.5 gap-0.5" style={{ background: 'rgba(22,36,29,0.04)' }}>
                      {['Mensual', 'Trimestral', 'Anual'].map((t, i) => (
                        <span
                          key={t}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg"
                          style={i === 0
                            ? { background: 'white', color: '#0B7A56', boxShadow: '0 1px 3px rgba(22,36,29,0.1)' }
                            : { color: 'rgba(22,36,29,0.4)' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <table className="w-full text-xs tabular-nums">
                    <thead style={{ borderBottom: '1px solid #F2ECE0' }}>
                      <tr>
                        {['Mes', 'Saldo inicio', 'Interés', 'Aporte', 'Saldo final'].map((h, i) => (
                          <th
                            key={h}
                            className={`px-3 py-2 font-medium ${i === 0 ? 'text-left' : 'text-right'}`}
                            style={{ color: '#7A8077' }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #F2ECE0' }}>
                        <td className="px-3 py-2.5 font-medium" style={{ color: '#5C635A' }}>—</td>
                        <td className="px-3 py-2.5 text-right" style={{ color: '#7A8077' }}>—</td>
                        <td className="px-3 py-2.5 text-right font-medium" style={{ color: '#0B7A56' }}>—</td>
                        <td className="px-3 py-2.5 text-right" style={{ color: '#7A8077' }}>—</td>
                        <td className="px-3 py-2.5 text-right font-semibold text-tinta">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            )}
          </div>

        </div>
      </main>

      <div className="mt-6" style={{ borderTop: '1px solid rgba(22,36,29,0.06)' }}>
        <ProductFlipCards />
      </div>

      <div style={{ borderTop: '1px solid rgba(22,36,29,0.06)' }}>
        <ConceptosBloque />
      </div>

      <div style={{ borderTop: '1px solid rgba(22,36,29,0.06)' }}>
        <NovedadesBloque />
      </div>
    </>
  );
}
