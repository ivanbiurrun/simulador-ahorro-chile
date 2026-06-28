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

  const labelBase = 'flex items-center gap-0.5 font-medium mb-1.5';
  const inputStyle: React.CSSProperties = { border: '1px solid #ECE4D6', borderRadius: '10px' };
  const inputClass = 'w-full px-3 py-3 focus:outline-none transition-colors text-tinta bg-white placeholder:text-tinta/25 text-base';

  function inputFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    (e.currentTarget as HTMLElement).style.borderColor = '#12B886';
  }
  function inputBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    (e.currentTarget as HTMLElement).style.borderColor = '#ECE4D6';
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <h2 className="text-2xl font-bold text-tinta">Define tu objetivo</h2>

      {/* Categoría */}
      <div>
        <p className={labelBase} style={{ fontSize: '15px', color: '#5C635A' }}>Categoría</p>
        <div className="grid grid-cols-4 gap-1.5">
          {CATEGORIES.map(({ id, label, emoji }) => {
            const active = category === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setCategory(id)}
                className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all cursor-pointer"
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  border: active ? '2px solid #12B886' : '1px solid #ECE4D6',
                  background: active ? '#E3F7EF' : 'white',
                  color: active ? '#0B7A56' : '#5C635A',
                }}
                onMouseEnter={(e) => {
                  if (!active) (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(18,184,134,0.4)';
                }}
                onMouseLeave={(e) => {
                  if (!active) (e.currentTarget as HTMLButtonElement).style.borderColor = '#ECE4D6';
                }}
              >
                <span className="text-xl leading-none">{emoji}</span>
                <span className="leading-tight text-center">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nombre */}
      <div>
        <label htmlFor="objectiveName" className={labelBase} style={{ fontSize: '15px', color: '#5C635A' }}>
          Nombre del objetivo
        </label>
        <input
          id="objectiveName"
          type="text"
          value={objectiveName}
          onChange={(e) => setObjectiveName(e.target.value)}
          placeholder="Ej: Pie para un departamento"
          required
          className={inputClass}
          style={inputStyle}
          onFocus={inputFocus as React.FocusEventHandler<HTMLInputElement>}
          onBlur={inputBlur as React.FocusEventHandler<HTMLInputElement>}
        />
      </div>

      {/* Montos — 3 en una fila */}
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label htmlFor="targetAmount" className={labelBase} style={{ fontSize: '15px', color: '#5C635A' }}>
            Objetivo
            <InfoTooltip text="¿Cuánto necesitas al final?" />
          </label>
          <CLPInput id="targetAmount" value={targetAmount} onChange={setTargetAmount} placeholder="10.000.000" required />
        </div>
        <div>
          <label htmlFor="initialAmount" className={labelBase} style={{ fontSize: '15px', color: '#5C635A' }}>
            Inicial
            <InfoTooltip text="Plata ya ahorrada. Puede ser $0." />
          </label>
          <CLPInput id="initialAmount" value={initialAmount} onChange={setInitialAmount} placeholder="0" />
        </div>
        <div>
          <label htmlFor="monthlyContribution" className={labelBase} style={{ fontSize: '15px', color: '#5C635A' }}>
            Aporte/mes
            <InfoTooltip text="¿Cuánto depositarás cada mes?" />
          </label>
          <CLPInput id="monthlyContribution" value={monthlyContribution} onChange={setMonthlyContribution} placeholder="100.000" />
        </div>
      </div>

      {/* Plazo + Tasa — 2 en una fila */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className={labelBase} style={{ fontSize: '15px', color: '#5C635A' }}>
            Plazo
            <InfoTooltip text="¿En cuánto tiempo quieres llegar a tu objetivo?" />
          </label>
          <PlazoInput value={termValue} unit={termUnit} onValueChange={setTermValue} onUnitChange={setTermUnit} />
        </div>
        <div>
          <label htmlFor="annualRate" className={labelBase} style={{ fontSize: '15px', color: '#5C635A' }}>
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
              className="w-full pl-3 pr-8 py-3 focus:outline-none transition-colors text-tinta text-base"
              style={{ border: '1px solid #F4A82C', borderRadius: '10px', background: '#FDF6E8' }}
              onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = '#F4A82C'; (e.currentTarget as HTMLInputElement).style.outline = '2px solid #F4A82C'; (e.currentTarget as HTMLInputElement).style.outlineOffset = '1px'; }}
              onBlur={(e) => { (e.currentTarget as HTMLInputElement).style.outline = 'none'; }}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium pointer-events-none" style={{ color: '#C2841A' }}>%</span>
          </div>
          <p className="text-[11px] mt-1 leading-tight" style={{ color: '#C2841A' }}>⚠ Ilustrativa · editable</p>
        </div>
      </div>

      {/* Producto */}
      <div>
        <label htmlFor="productType" className={labelBase} style={{ fontSize: '15px', color: '#5C635A' }}>
          Tipo de producto
          <InfoTooltip text="Dónde guardarás tu dinero. Las fichas completas las encuentras abajo." />
        </label>
        <select
          id="productType"
          value={productType}
          onChange={(e) => handleProductChange(e.target.value as ProductType)}
          className="w-full px-3 py-3 focus:outline-none transition-colors text-tinta bg-white cursor-pointer text-base"
          style={inputStyle}
          onFocus={inputFocus as React.FocusEventHandler<HTMLSelectElement>}
          onBlur={inputBlur as React.FocusEventHandler<HTMLSelectElement>}
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
        <p className="text-xs text-riesgo rounded-xl px-3 py-2" style={{ background: '#FEE8E7', border: '1px solid rgba(232,85,78,0.2)' }}>
          {error}
        </p>
      )}

      {/* CTA */}
      <button
        type="submit"
        className="w-full py-3.5 rounded-xl font-semibold text-base text-white cursor-pointer transition-colors"
        style={{ background: '#F46A1F' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#C25A12'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#F46A1F'; }}
      >
        Ver mi proyección →
      </button>

    </form>
  );
}
