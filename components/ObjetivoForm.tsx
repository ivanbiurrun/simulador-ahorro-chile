'use client';
import { useState } from 'react';
import PlazoInput from './PlazoInput';
import InfoTooltip from './InfoTooltip';
import CLPInput from './CLPInput';
import RatesGuideModal from './RatesGuideModal';
import { PRODUCTS, getProductById } from '@/lib/products';
import { CATEGORIES } from '@/lib/categories';
import type { ProductType, TermUnit, CategoryType, SimulatorFormData } from '@/types';

interface ObjetivoFormProps {
  onSubmit: (formData: SimulatorFormData) => void;
}

export default function ObjetivoForm({ onSubmit }: ObjetivoFormProps) {
  const [objectiveName, setObjectiveName] = useState('');
  const [category, setCategory] = useState<CategoryType>('vivienda');
  const [targetAmount, setTargetAmount] = useState(0);
  const [initialAmount, setInitialAmount] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [termValue, setTermValue] = useState(24);
  const [termUnit, setTermUnit] = useState<TermUnit>('meses');
  const [productType, setProductType] = useState<ProductType>('cuenta_remunerada');
  const [annualRate, setAnnualRate] = useState(PRODUCTS[0].defaultRate);
  const [error, setError] = useState('');

  function handleProductChange(id: ProductType) {
    setProductType(id);
    const p = getProductById(id);
    if (p) setAnnualRate(p.defaultRate);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (targetAmount === 0) {
      setError('Ingresa un monto objetivo mayor a $0 para proyectar.');
      return;
    }
    setError('');
    onSubmit({ objectiveName, category, targetAmount, initialAmount, monthlyContribution, termValue, termUnit, productType, annualRate });
  }

  const inputBase = 'w-full px-3 py-2.5 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-verde transition-colors text-tinta bg-white placeholder:text-tinta/25 text-sm';
  const labelBase = 'block text-xs font-medium text-tinta/60 mb-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Categoría */}
      <div>
        <p className={labelBase}>Categoría del objetivo</p>
        <div className="grid grid-cols-4 gap-1.5">
          {CATEGORIES.map(({ id, label, Icon }) => {
            const active = category === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setCategory(id)}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl border-2 transition-all text-[11px] font-medium cursor-pointer ${
                  active
                    ? 'border-verde bg-verde-tint text-verde-oscuro'
                    : 'border-gray-100 bg-white text-tinta/40 hover:border-verde/30 hover:text-tinta/70'
                }`}
              >
                <Icon className={`w-4 h-4 transition-colors ${active ? 'text-verde' : 'text-tinta/30'}`} />
                <span className="leading-tight text-center">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nombre */}
      <div>
        <label htmlFor="objectiveName" className={labelBase}>
          Nombre del objetivo
        </label>
        <input
          id="objectiveName"
          type="text"
          value={objectiveName}
          onChange={(e) => setObjectiveName(e.target.value)}
          placeholder="Ej: Pie para un departamento"
          required
          className={inputBase}
        />
      </div>

      {/* Montos — 3 en una fila */}
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label htmlFor="targetAmount" className="flex items-center gap-0.5 text-xs font-medium text-tinta/60 mb-1">
            Objetivo
            <InfoTooltip text="¿Cuánto necesitas al final?" />
          </label>
          <CLPInput id="targetAmount" value={targetAmount} onChange={setTargetAmount} placeholder="10.000.000" required />
        </div>
        <div>
          <label htmlFor="initialAmount" className="flex items-center gap-0.5 text-xs font-medium text-tinta/60 mb-1">
            Inicial
            <InfoTooltip text="Plata ya ahorrada. Puede ser $0." />
          </label>
          <CLPInput id="initialAmount" value={initialAmount} onChange={setInitialAmount} placeholder="0" />
        </div>
        <div>
          <label htmlFor="monthlyContribution" className="flex items-center gap-0.5 text-xs font-medium text-tinta/60 mb-1">
            Aporte/mes
            <InfoTooltip text="¿Cuánto depositarás cada mes?" />
          </label>
          <CLPInput id="monthlyContribution" value={monthlyContribution} onChange={setMonthlyContribution} placeholder="100.000" />
        </div>
      </div>

      {/* Plazo + Tasa — 2 en una fila */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="flex items-center gap-0.5 text-xs font-medium text-tinta/60 mb-1">
            Plazo
            <InfoTooltip text="¿En cuánto tiempo quieres llegar a tu objetivo?" />
          </label>
          <PlazoInput value={termValue} unit={termUnit} onValueChange={setTermValue} onUnitChange={setTermUnit} />
        </div>
        <div>
          <label htmlFor="annualRate" className="flex items-center gap-0.5 text-xs font-medium text-tinta/60 mb-1">
            Tasa anual
            <InfoTooltip text="Valor ilustrativo y editable. Ingresa la tasa real del producto." />
          </label>
          <div className="relative">
            <input
              id="annualRate"
              type="number"
              value={annualRate}
              onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
              step={0.1} min={0} max={100}
              required
              className="w-full pl-3 pr-8 py-2.5 border-2 border-alerta/60 rounded-xl focus:outline-none focus:border-alerta transition-colors text-tinta bg-alerta-tint text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-tinta/40 text-sm pointer-events-none">%</span>
          </div>
          <p className="text-[10px] text-mango-oscuro mt-1 leading-tight">⚠ Ilustrativa · editable</p>
        </div>
      </div>

      {/* Producto */}
      <div>
        <label htmlFor="productType" className="flex items-center gap-0.5 text-xs font-medium text-tinta/60 mb-1">
          Tipo de producto
          <InfoTooltip text="Dónde guardarás tu dinero. Las fichas completas las encuentras abajo." />
        </label>
        <select
          id="productType"
          value={productType}
          onChange={(e) => handleProductChange(e.target.value as ProductType)}
          className="w-full px-3 py-2.5 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-verde transition-colors text-tinta bg-white cursor-pointer text-sm"
        >
          {PRODUCTS.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Fuente de tasas */}
      <RatesGuideModal />

      {/* Error */}
      {error && (
        <p className="text-xs text-riesgo bg-red-50 border border-red-100 rounded-xl px-3 py-2">
          {error}
        </p>
      )}

      {/* CTA */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl font-semibold text-sm text-white cursor-pointer transition-colors"
        style={{ background: '#F46A1F' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#C25A12'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#F46A1F'; }}
      >
        Ver mi proyección →
      </button>

    </form>
  );
}
