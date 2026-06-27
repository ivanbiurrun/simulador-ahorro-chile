'use client';
import { useState } from 'react';
import { formatCLP } from '@/lib/formatters';
import type { TableDataPoint, AnnualSummaryPoint } from '@/types';

interface MonthlyTableProps {
  tableData: TableDataPoint[];
  annualData: AnnualSummaryPoint[];
}

type View = 'mensual' | 'anual';

export default function MonthlyTable({ tableData, annualData }: MonthlyTableProps) {
  const [view, setView] = useState<View>('mensual');

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">Tabla detallada</h3>
          <p className="text-xs text-gray-400 mt-0.5">Mira cómo evoluciona tu plata cada período</p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-0.5 gap-0.5">
          {(['mensual', 'anual'] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                view === v
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-auto max-h-64">
        {view === 'mensual' ? (
          <table className="w-full text-xs min-w-[500px]">
            <thead className="sticky top-0 bg-white border-b border-gray-100 z-10">
              <tr>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-500">Mes</th>
                <th className="px-3 py-2.5 text-right font-semibold text-gray-500">Saldo inicio</th>
                <th className="px-3 py-2.5 text-right font-semibold text-emerald-600">Interés del mes</th>
                <th className="px-3 py-2.5 text-right font-semibold text-teal-600">Aporte</th>
                <th className="px-3 py-2.5 text-right font-semibold text-gray-800">Saldo final</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr
                  key={row.mes}
                  className={`border-b border-gray-50 hover:bg-teal-50/30 transition-colors ${
                    i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                  }`}
                >
                  <td className="px-3 py-2 text-gray-500 font-medium">
                    {row.mes === 0 ? 'Inicio' : `M${row.mes}`}
                  </td>
                  <td className="px-3 py-2 text-right text-gray-600 tabular-nums">
                    {formatCLP(row.saldoInicio)}
                  </td>
                  <td className="px-3 py-2 text-right text-emerald-600 font-medium tabular-nums">
                    {row.interesMes > 0 ? `+${formatCLP(row.interesMes)}` : '—'}
                  </td>
                  <td className="px-3 py-2 text-right text-teal-600 tabular-nums">
                    {row.aporteMes > 0 ? `+${formatCLP(row.aporteMes)}` : '—'}
                  </td>
                  <td className="px-3 py-2 text-right font-semibold text-gray-900 tabular-nums">
                    {formatCLP(row.saldoFinal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-xs min-w-[500px]">
            <thead className="sticky top-0 bg-white border-b border-gray-100 z-10">
              <tr>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-500">Año</th>
                <th className="px-3 py-2.5 text-right font-semibold text-gray-500">Saldo inicio</th>
                <th className="px-3 py-2.5 text-right font-semibold text-emerald-600">Intereses del año</th>
                <th className="px-3 py-2.5 text-right font-semibold text-teal-600">Aportes del año</th>
                <th className="px-3 py-2.5 text-right font-semibold text-gray-800">Saldo final</th>
              </tr>
            </thead>
            <tbody>
              {annualData.map((row, i) => (
                <tr
                  key={row.año}
                  className={`border-b border-gray-50 hover:bg-teal-50/30 transition-colors ${
                    i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                  }`}
                >
                  <td className="px-3 py-2 text-gray-500 font-medium">Año {row.año}</td>
                  <td className="px-3 py-2 text-right text-gray-600 tabular-nums">{formatCLP(row.saldoInicio)}</td>
                  <td className="px-3 py-2 text-right text-emerald-600 font-medium tabular-nums">+{formatCLP(row.totalIntereses)}</td>
                  <td className="px-3 py-2 text-right text-teal-600 tabular-nums">+{formatCLP(row.totalAportes)}</td>
                  <td className="px-3 py-2 text-right font-semibold text-gray-900 tabular-nums">{formatCLP(row.saldoFinal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
