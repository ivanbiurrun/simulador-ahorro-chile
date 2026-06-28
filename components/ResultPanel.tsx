'use client';
import ResultHeader from './ResultHeader';
import MetricCards from './MetricCards';
import EvolucionTabla from './EvolucionTabla';
import TipReactivo from './TipReactivo';
import type { SimulatorFormData, SimulationResult } from '@/types';

interface ResultPanelProps {
  formData: SimulatorFormData;
  result: SimulationResult;
}

export default function ResultPanel({ formData, result }: ResultPanelProps) {
  return (
    <div className="space-y-4">
      <ResultHeader formData={formData} result={result} />
      <MetricCards result={result} />
      <EvolucionTabla tableData={result.tableData} annualData={result.annualData} />
      <TipReactivo formData={formData} result={result} />
    </div>
  );
}
