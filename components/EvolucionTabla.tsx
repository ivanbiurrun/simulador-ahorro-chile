'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCLP } from '@/lib/formatters';
import type { TableDataPoint, AnnualSummaryPoint } from '@/types';

type Vista = 'mensual' | 'trimestral' | 'anual';

interface EvolucionTablaProps {
  tableData: TableDataPoint[];
  annualData: AnnualSummaryPoint[];
}

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18 } },
};

const bodyVariants = {
  visible: { transition: { staggerChildren: 0.018 } },
};

export default function EvolucionTabla({ tableData, annualData }: EvolucionTablaProps) {
  const [vista, setVista] = useState<Vista>('mensual');

  const lastMes = tableData[tableData.length - 1]?.mes ?? 0;

  const monthlyRows = useMemo(
    () => tableData.filter((r) => r.mes > 0),
    [tableData],
  );

  const trimestralRows = useMemo(
    () => tableData.filter((r) => r.mes > 0 && (r.mes % 3 === 0 || r.mes === lastMes)),
    [tableData, lastMes],
  );

  const TABS: { key: Vista; label: string }[] = [
    { key: 'mensual',     label: 'Mensual' },
    { key: 'trimestral',  label: 'Trimestral' },
    { key: 'anual',       label: 'Anual' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      {/* Header + toggle */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-50">
        <h3 className="font-semibold text-tinta text-sm">Evolución del ahorro</h3>
        <div className="flex rounded-xl bg-gray-50 p-0.5 gap-0.5">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setVista(t.key)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                vista === t.key
                  ? 'bg-white text-verde shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-auto max-h-64">
        <table className="w-full text-xs tabular-nums">
          <thead className="sticky top-0 bg-white border-b border-gray-50 z-10">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-gray-400">
                {vista === 'anual' ? 'Año' : vista === 'trimestral' ? 'Mes' : 'Mes'}
              </th>
              <th className="px-3 py-2 text-right font-medium text-gray-400">Saldo inicio</th>
              <th className="px-3 py-2 text-right font-medium text-gray-400 text-verde">Interés</th>
              <th className="px-3 py-2 text-right font-medium text-gray-400">Aporte</th>
              <th className="px-3 py-2 text-right font-medium text-gray-400">Saldo final</th>
            </tr>
          </thead>

          <AnimatePresence mode="wait">
            <motion.tbody
              key={vista}
              initial="hidden"
              animate="visible"
              variants={bodyVariants}
            >
              {vista === 'anual'
                ? annualData.map((row) => (
                    <motion.tr
                      key={row.año}
                      variants={rowVariants}
                      className="border-b border-gray-50 hover:bg-crema transition-colors"
                    >
                      <td className="px-3 py-2 text-tinta font-medium">Año {row.año}</td>
                      <td className="px-3 py-2 text-right text-gray-500">{formatCLP(row.saldoInicio)}</td>
                      <td className="px-3 py-2 text-right text-verde font-medium">{formatCLP(row.totalIntereses)}</td>
                      <td className="px-3 py-2 text-right text-gray-500">{formatCLP(row.totalAportes)}</td>
                      <td className="px-3 py-2 text-right text-tinta font-semibold">{formatCLP(row.saldoFinal)}</td>
                    </motion.tr>
                  ))
                : (vista === 'trimestral' ? trimestralRows : monthlyRows).map((row) => (
                    <motion.tr
                      key={row.mes}
                      variants={rowVariants}
                      className="border-b border-gray-50 hover:bg-crema transition-colors"
                    >
                      <td className="px-3 py-2 text-tinta font-medium">Mes {row.mes}</td>
                      <td className="px-3 py-2 text-right text-gray-500">{formatCLP(row.saldoInicio)}</td>
                      <td className="px-3 py-2 text-right text-verde font-medium">{formatCLP(row.interesMes)}</td>
                      <td className="px-3 py-2 text-right text-gray-500">{formatCLP(row.aporteMes)}</td>
                      <td className="px-3 py-2 text-right text-tinta font-semibold">{formatCLP(row.saldoFinal)}</td>
                    </motion.tr>
                  ))}
            </motion.tbody>
          </AnimatePresence>
        </table>
      </div>
    </div>
  );
}
