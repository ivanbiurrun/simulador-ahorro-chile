'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { formatCLP } from '@/lib/formatters';
import type { TableDataPoint, AnnualSummaryPoint } from '@/types';

type Vista = 'mensual' | 'trimestral' | 'anual';

interface EvolucionTablaProps {
  tableData: TableDataPoint[];
  annualData: AnnualSummaryPoint[];
}

export default function EvolucionTabla({ tableData, annualData }: EvolucionTablaProps) {
  const [vista, setVista] = useState<Vista>('mensual');
  const reduced = useReducedMotion();

  const lastMes = tableData[tableData.length - 1]?.mes ?? 0;

  const rows = useMemo(() => {
    if (vista === 'anual') return [];
    const base = tableData.filter((r) => r.mes > 0);
    if (vista === 'trimestral') return base.filter((r) => r.mes % 3 === 0 || r.mes === lastMes);
    return base;
  }, [vista, tableData, lastMes]);

  const TABS: { key: Vista; label: string }[] = [
    { key: 'mensual',    label: 'Mensual' },
    { key: 'trimestral', label: 'Trimestral' },
    { key: 'anual',      label: 'Anual' },
  ];

  const rowVariants = {
    hidden:  { opacity: 0, y: reduced ? 0 : 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.16 } },
  };

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'rgba(22,36,29,0.05)' }}>
        <h3 className="font-semibold text-tinta text-sm">Evolución del ahorro</h3>
        <div className="flex rounded-xl p-0.5 gap-0.5" style={{ background: 'rgba(22,36,29,0.04)' }}>
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setVista(t.key)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                vista === t.key
                  ? 'bg-white text-verde-oscuro shadow-sm'
                  : 'text-tinta/40 hover:text-tinta/70'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-auto max-h-60">
        <table className="w-full text-xs tabular-nums">
          <thead className="sticky top-0 bg-white z-10" style={{ borderBottom: '1px solid rgba(22,36,29,0.05)' }}>
            <tr>
              <th className="px-3 py-2 text-left font-medium" style={{ color: 'rgba(22,36,29,0.4)' }}>
                {vista === 'anual' ? 'Año' : 'Mes'}
              </th>
              <th className="px-3 py-2 text-right font-medium" style={{ color: 'rgba(22,36,29,0.4)' }}>Saldo inicio</th>
              <th className="px-3 py-2 text-right font-medium text-verde-oscuro">Interés</th>
              <th className="px-3 py-2 text-right font-medium" style={{ color: 'rgba(22,36,29,0.4)' }}>Aporte</th>
              <th className="px-3 py-2 text-right font-medium" style={{ color: 'rgba(22,36,29,0.4)' }}>Saldo final</th>
            </tr>
          </thead>

          <AnimatePresence mode="wait">
            <motion.tbody
              key={vista}
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: reduced ? 0 : 0.016 } } }}
            >
              {vista === 'anual'
                ? annualData.map((row) => (
                    <motion.tr
                      key={row.año}
                      variants={rowVariants}
                      className="hover:bg-crema transition-colors"
                      style={{ borderBottom: '1px solid rgba(22,36,29,0.04)' }}
                    >
                      <td className="px-3 py-2 text-tinta font-medium">Año {row.año}</td>
                      <td className="px-3 py-2 text-right" style={{ color: 'rgba(22,36,29,0.55)' }}>{formatCLP(row.saldoInicio)}</td>
                      <td className="px-3 py-2 text-right text-verde-oscuro font-medium">{formatCLP(row.totalIntereses)}</td>
                      <td className="px-3 py-2 text-right" style={{ color: 'rgba(22,36,29,0.55)' }}>{formatCLP(row.totalAportes)}</td>
                      <td className="px-3 py-2 text-right text-tinta font-semibold">{formatCLP(row.saldoFinal)}</td>
                    </motion.tr>
                  ))
                : rows.map((row) => (
                    <motion.tr
                      key={row.mes}
                      variants={rowVariants}
                      className="hover:bg-crema transition-colors"
                      style={{ borderBottom: '1px solid rgba(22,36,29,0.04)' }}
                    >
                      <td className="px-3 py-2 text-tinta font-medium">Mes {row.mes}</td>
                      <td className="px-3 py-2 text-right" style={{ color: 'rgba(22,36,29,0.55)' }}>{formatCLP(row.saldoInicio)}</td>
                      <td className="px-3 py-2 text-right text-verde-oscuro font-medium">{formatCLP(row.interesMes)}</td>
                      <td className="px-3 py-2 text-right" style={{ color: 'rgba(22,36,29,0.55)' }}>{formatCLP(row.aporteMes)}</td>
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
