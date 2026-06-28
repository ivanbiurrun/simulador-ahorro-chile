'use client';
import dynamic from 'next/dynamic';
import MetaBanner from './MetaBanner';
import MetricCards from './MetricCards';
import EvolucionTabla from './EvolucionTabla';
import TipReactivo from './TipReactivo';
import type { SimulatorFormData, SimulationResult } from '@/types';

const GrowthChart = dynamic(() => import('./GrowthChart'), { ssr: false });

interface ResultPanelProps {
  formData: SimulatorFormData;
  result: SimulationResult;
}

export default function ResultPanel({ formData, result }: ResultPanelProps) {
  const termMonths =
    formData.termUnit === 'años' ? formData.termValue * 12 :
    formData.termUnit === 'días' ? Math.max(1, Math.round(formData.termValue / 30)) :
    formData.termValue;

  return (
    <div className="space-y-4">
      <MetaBanner formData={formData} result={result} />
      <MetricCards result={result} />

      {/* Gráfico */}
      <div className="bg-white rounded-2xl shadow-card p-4">
        <h3 className="font-semibold text-tinta text-sm mb-0.5">Tu ahorro en el tiempo</h3>
        <p className="text-xs text-gray-400 mb-4">
          Línea verde: crecimiento · Línea dorada: tu meta · Punto: cuándo llegas
        </p>
        <GrowthChart
          data={result.monthlyData}
          targetAmount={result.targetAmount}
          termMonths={termMonths}
        />
      </div>

      <EvolucionTabla tableData={result.tableData} annualData={result.annualData} />
      <TipReactivo formData={formData} result={result} />
    </div>
  );
}
