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

  function handleProductChange(id: ProductType) {
    setProductType(id);
    const p = getProductById(id);
    if (p) setAnnualRate(p.defaultRate);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (targetAmount === 0) return;
    onSubmit({
      objectiveName,
      category,
      targetAmount,
      initialAmount,
      monthlyContribution,
      termValue,
      termUnit,
      productType,
      annualRate,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Categoría */}
      <div>
        <label className="flex items-center gap-1 text-sm font-medium text-tinta mb-2">
          Categoría del objetivo
          <InfoTooltip text="¿A qué apunta tu meta? Ayuda a visualizar el plan en los resultados." />
        </label>
        <div className="grid grid-cols-4 gap-2">
          {CATEGORIES.map(({ id, label, Icon }) => {
            const active = category === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setCategory(id)}
                className={`flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl border-2 transition-all text-xs font-medium cursor-pointer ${
                  active
                    ? 'border-verde bg-verde-tint text-verde-oscuro'
                    : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200 hover:text-gray-600'
                }`}
              >
                <Icon className={`w-5 h-5 transition-colors ${active ? 'text-verde' : 'text-gray-300'}`} />
                <span className="leading-tight text-center">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nombre del objetivo */}
      <div>
        <label htmlFor="objectiveName" className="flex items-center gap-1 text-sm font-medium text-tinta mb-1.5">
          Nombre del objetivo
          <InfoTooltip text="Ponle un nombre concreto que te motive. Ej: 'Pie para un depto', 'Viaje a Europa', 'Fondo de emergencia'." />
        </label>
        <input
          id="objectiveName"
          type="text"
          value={objectiveName}
          onChange={(e) => setObjectiveName(e.target.value)}
          placeholder="Ej: Pie para un departamento"
          required
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-verde transition-colors text-tinta bg-white placeholder:text-gray-300"
        />
      </div>

      {/* Monto objetivo */}
      <div>
        <label htmlFor="targetAmount" className="flex items-center gap-1 text-sm font-medium text-tinta mb-1.5">
          Monto objetivo
          <InfoTooltip text="¿Cuánto dinero necesitas al final? Ej: si quieres un pie de $10.000.000, ese es tu monto objetivo." />
        </label>
        <CLPInput
          id="targetAmount"
          value={targetAmount}
          onChange={setTargetAmount}
          placeholder="Ej: 10.000.000"
          required
        />
      </div>

      {/* Monto inicial */}
      <div>
        <label htmlFor="initialAmount" className="flex items-center gap-1 text-sm font-medium text-tinta mb-1.5">
          Monto inicial
          <InfoTooltip text="¿Cuánta plata ya tienes ahorrada y vas a poner de entrada? Puede ser $0 si partes de cero." />
        </label>
        <CLPInput
          id="initialAmount"
          value={initialAmount}
          onChange={setInitialAmount}
          placeholder="Ej: 500.000 (o 0 si partes de cero)"
        />
      </div>

      {/* Aporte mensual */}
      <div>
        <label htmlFor="monthlyContribution" className="flex items-center gap-1 text-sm font-medium text-tinta mb-1.5">
          Aporte mensual
          <InfoTooltip text="¿Cuánto depositarás cada mes? La constancia es clave: el interés compuesto hace que aportes regulares tengan un impacto enorme a largo plazo." />
        </label>
        <CLPInput
          id="monthlyContribution"
          value={monthlyContribution}
          onChange={setMonthlyContribution}
          placeholder="Ej: 100.000"
        />
      </div>

      {/* Plazo */}
      <div>
        <label className="flex items-center gap-1 text-sm font-medium text-tinta mb-1.5">
          Plazo
          <InfoTooltip text="¿En cuánto tiempo quieres llegar a tu objetivo? A mayor plazo, más tiempo tiene tu plata para crecer." />
        </label>
        <PlazoInput
          value={termValue}
          unit={termUnit}
          onValueChange={setTermValue}
          onUnitChange={setTermUnit}
        />
      </div>

      {/* Tipo de producto */}
      <div>
        <label htmlFor="productType" className="flex items-center gap-1 text-sm font-medium text-tinta mb-1.5">
          Tipo de producto
          <InfoTooltip text="El instrumento donde guardarás tu dinero. Cada uno tiene distintos niveles de riesgo, liquidez y rentabilidad. Las fichas educativas las encuentras abajo." />
        </label>
        <select
          id="productType"
          value={productType}
          onChange={(e) => handleProductChange(e.target.value as ProductType)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-verde transition-colors text-tinta bg-white cursor-pointer"
        >
          {PRODUCTS.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Tasa anual */}
      <div>
        <label htmlFor="annualRate" className="flex items-center gap-1 text-sm font-medium text-tinta mb-1.5">
          Tasa anual estimada
          <InfoTooltip text="Valor ilustrativo y editable. Ingresa la tasa real del producto que estés evaluando. Las fichas abajo te dicen dónde buscarla." />
        </label>
        <div className="relative">
          <input
            id="annualRate"
            type="number"
            value={annualRate}
            onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
            step={0.1}
            min={0}
            max={100}
            required
            className="w-full pl-4 pr-10 py-3 border-2 border-alerta rounded-xl focus:outline-none focus:border-mango transition-colors text-tinta bg-alerta-tint"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold pointer-events-none">%</span>
        </div>
        <p className="text-xs text-mango-oscuro mt-1.5">⚠ Ilustrativa · editable · no refleja tasas reales vigentes</p>
      </div>

      {/* Fuente de tasas */}
      <div className="pb-1">
        <RatesGuideModal />
      </div>

      {/* CTA */}
      <button
        type="submit"
        className="w-full py-3.5 rounded-xl font-semibold text-base text-white bg-mango hover:bg-mango-oscuro transition-colors cursor-pointer shadow-sm"
      >
        Ver mi proyección →
      </button>

    </form>
  );
}
