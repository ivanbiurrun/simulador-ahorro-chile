'use client';
import { useRef } from 'react';
import ResultHeader from './ResultHeader';
import MetricCards from './MetricCards';
import EvolucionTabla from './EvolucionTabla';
import TipReactivo from './TipReactivo';
import ShareCard from './ShareCard';
import type { SimulatorFormData, SimulationResult } from '@/types';

interface ResultPanelProps {
  formData: SimulatorFormData;
  result: SimulationResult;
}

export default function ResultPanel({ formData, result }: ResultPanelProps) {
  const captureRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-4">
      {/* Zona capturable — brand header + resultado + disclaimer */}
      <div
        ref={captureRef}
        className="rounded-2xl overflow-hidden"
        style={{ background: '#FBF5EC', boxShadow: '0 2px 14px rgba(22,36,29,0.07)' }}
      >
        {/* Header de marca */}
        <div
          className="flex items-center justify-between px-5 py-2.5"
          style={{ background: '#0B7A56' }}
        >
          <span style={{ color: 'white', fontWeight: 700, fontSize: '12px', letterSpacing: '0.07em' }}>
            AHORRA CON CABEZA 🇨🇱
          </span>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>Simulación educativa</span>
        </div>

        {/* Contenido del resultado */}
        <div className="p-5 space-y-4">
          <ResultHeader formData={formData} result={result} />
          <MetricCards result={result} />
          <EvolucionTabla tableData={result.tableData} annualData={result.annualData} />
          <TipReactivo formData={formData} result={result} />
        </div>

        {/* Disclaimer */}
        <div className="px-5 pb-4">
          <p className="text-center" style={{ fontSize: '10px', color: 'rgba(22,36,29,0.35)' }}>
            Ahorra con Cabeza · Simulación educativa · no es asesoría financiera
          </p>
        </div>
      </div>

      {/* Botón de compartir — fuera de la zona capturable */}
      <ShareCard captureRef={captureRef} objectiveName={formData.objectiveName} />
    </div>
  );
}
