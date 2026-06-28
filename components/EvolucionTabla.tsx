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

  const thStyle: React.CSSProperties = { color: '#7A8077', fontWeight: 500 };

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #F2ECE0' }}>
        <h3 className="font-semibold text-tinta text-sm">Evolución del ahorro</h3>
        <div className="flex rounded-xl p-0.5 gap-0.5" style={{ background: 'rgba(22,36,29,0.04)' }}>
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setVista(t.key)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all cursor-pointer"
              style={
                vista === t.key
                  ? { background: 'white', color: '#0B7A56', boxShadow: '0 1px 3px rgba(22,36,29,0.1)' }
                  : { color: 'rgba(22,36,29,0.4)' }
              }
              onMouseEnter={(e) => { if (vista !== t.key) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(22,36,29,0.7)'; }}
              onMouseLeave={(e) => { if (vista !== t.key) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(22,36,29,0.4)'; }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-auto max-h-60">
        <table className="w-full text-xs tabular-nums">
          <thead className="sticky top-0 bg-white z-10" style={{ borderBottom: '1px solid #F2ECE0' }}>
            <tr>
              <th className="px-3 py-2 text-left" style={thStyle}>{vista === 'anual' ? 'Año' : 'Mes'}</th>
              <th className="px-3 py-2 text-right" style={thStyle}>Saldo inicio</th>
              <th className="px-3 py-2 text-right font-medium" style={{ color: '#0B7A56' }}>Interés</th>
              <th className="px-3 py-2 text-right" style={thStyle}>Aporte</th>
              <th className="px-3 py-2 text-right" style={thStyle}>Saldo final</th>
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
                      className="transition-colors cursor-default"
                      style={{ borderBottom: '1px solid #F2ECE0' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#FBF5EC'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                    >
                      <td className="px-3 py-2 font-medium text-tinta">Año {row.año}</td>
                      <td className="px-3 py-2 text-right" style={{ color: '#7A8077' }}>{formatCLP(row.saldoInicio)}</td>
                      <td className="px-3 py-2 text-right font-medium" style={{ color: '#0B7A56' }}>{formatCLP(row.totalIntereses)}</td>
                      <td className="px-3 py-2 text-right" style={{ color: '#7A8077' }}>{formatCLP(row.totalAportes)}</td>
                      <td className="px-3 py-2 text-right font-semibold text-tinta">{formatCLP(row.saldoFinal)}</td>
                    </motion.tr>
                  ))
                : rows.map((row) => (
                    <motion.tr
                      key={row.mes}
                      variants={rowVariants}
                      className="transition-colors cursor-default"
                      style={{ borderBottom: '1px solid #F2ECE0' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#FBF5EC'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                    >
                      <td className="px-3 py-2 font-medium text-tinta">Mes {row.mes}</td>
                      <td className="px-3 py-2 text-right" style={{ color: '#7A8077' }}>{formatCLP(row.saldoInicio)}</td>
                      <td className="px-3 py-2 text-right font-medium" style={{ color: '#0B7A56' }}>{formatCLP(row.interesMes)}</td>
                      <td className="px-3 py-2 text-right" style={{ color: '#7A8077' }}>{formatCLP(row.aporteMes)}</td>
                      <td className="px-3 py-2 text-right font-semibold text-tinta">{formatCLP(row.saldoFinal)}</td>
                    </motion.tr>
                  ))}
            </motion.tbody>
          </AnimatePresence>
        </table>
      </div>
    </div>
  );
}
