'use client';
import dynamic from 'next/dynamic';
import TipsPanel from './TipsPanel';
import MonthlyTable from './MonthlyTable';
import { formatCLP } from '@/lib/formatters';
import { getCategoryInfo } from '@/lib/categories';
import type { SimulatorFormData, SimulationResult } from '@/types';

const GrowthChart = dynamic(() => import('./GrowthChart'), { ssr: false });

interface ResultsPanelProps {
  formData: SimulatorFormData;
  result: SimulationResult;
}

interface StatCardProps {
  label: string;
  value: string;
  subtitle?: string;
  accent: 'teal' | 'green' | 'emerald' | 'red' | 'gray';
}

function StatCard({ label, value, subtitle, accent }: StatCardProps) {
  const styles = {
    teal:    'border-teal-200 bg-teal-50',
    green:   'border-green-200 bg-green-50',
    emerald: 'border-emerald-200 bg-emerald-50',
    red:     'border-red-200 bg-red-50',
    gray:    'border-gray-200 bg-gray-50',
  };
  const text = {
    teal:    'text-teal-700',
    green:   'text-green-700',
    emerald: 'text-emerald-700',
    red:     'text-red-700',
    gray:    'text-gray-700',
  };
  return (
    <div className={`border rounded-2xl p-4 ${styles[accent]}`}>
      <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
      <p className={`text-lg font-bold leading-tight ${text[accent]}`}>{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}

export default function ResultsPanel({ formData, result }: ResultsPanelProps) {
  const termMonths = formData.termUnit === 'años' ? formData.termValue * 12 : formData.termValue;
  const catInfo = getCategoryInfo(formData.category);
  const { Icon: CatIcon } = catInfo;

  return (
    <div className="space-y-5">

      {/* Goal banner with category icon */}
      <div
        className={`rounded-2xl p-5 flex items-center gap-4 border ${
          result.reachesGoal ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}
      >
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${catInfo.bg}`}>
          <CatIcon className={`w-10 h-10 ${catInfo.color}`} />
        </div>
        <div>
          <p className={`font-bold text-base ${result.reachesGoal ? 'text-green-800' : 'text-red-800'}`}>
            {result.reachesGoal
              ? `¡Llegas a "${formData.objectiveName}"!`
              : `No llegas a "${formData.objectiveName}"`}
          </p>
          <p className={`text-sm mt-0.5 ${result.reachesGoal ? 'text-green-600' : 'text-red-600'}`}>
            {result.reachesGoal
              ? `Te sobran ${formatCLP(result.surplus)} sobre el objetivo.`
              : `Te faltan ${formatCLP(result.gap)}. Puedes aumentar el aporte mensual o extender el plazo.`}
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Monto final proyectado"
          value={formatCLP(result.finalAmount)}
          accent="teal"
        />
        <StatCard
          label="Tu objetivo"
          value={formatCLP(result.targetAmount)}
          accent={result.reachesGoal ? 'emerald' : 'red'}
          subtitle={result.reachesGoal ? '✓ Alcanzado' : '✗ No alcanzado'}
        />
        <StatCard
          label="Total aportado"
          value={formatCLP(result.totalContributed)}
          accent="gray"
          subtitle="Tu capital"
        />
        <StatCard
          label="Rendimiento generado"
          value={formatCLP(result.interestEarned)}
          accent="green"
          subtitle="Lo que trabajó tu plata"
        />
      </div>

      {/* Monthly table */}
      <MonthlyTable tableData={result.tableData} annualData={result.annualData} />

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <h3 className="font-semibold text-gray-900 text-sm mb-0.5">Tu ahorro en el tiempo</h3>
        <p className="text-xs text-gray-400 mb-4">
          Línea teal: crecimiento de tu ahorro · Línea dorada: tu objetivo · Punto verde: cuando llegas
        </p>
        <GrowthChart data={result.monthlyData} targetAmount={result.targetAmount} termMonths={termMonths} />
      </div>

      {/* AI Tips */}
      <TipsPanel formData={formData} result={result} />
    </div>
  );
}
