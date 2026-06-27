'use client';
import { useState } from 'react';
import InfoTooltip from './InfoTooltip';
import CLPInput from './CLPInput';
import ProductCard from './ProductCard';
import RatesGuideModal from './RatesGuideModal';
import { PRODUCTS, getProductById } from '@/lib/products';
import { CATEGORIES } from '@/lib/categories';
import { simulate } from '@/lib/calculations';
import type { ProductType, TermUnit, CategoryType, SimulatorFormData, SimulationResult } from '@/types';

interface SimulatorFormProps {
  onResult: (formData: SimulatorFormData, result: SimulationResult) => void;
}

export default function SimulatorForm({ onResult }: SimulatorFormProps) {
  const [objectiveName, setObjectiveName] = useState('');
  const [category, setCategory] = useState<CategoryType>('vivienda');
  const [targetAmount, setTargetAmount] = useState(0);
  const [initialAmount, setInitialAmount] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [termValue, setTermValue] = useState(24);
  const [termUnit, setTermUnit] = useState<TermUnit>('meses');
  const [productType, setProductType] = useState<ProductType>('cuenta_remunerada');
  const [annualRate, setAnnualRate] = useState(PRODUCTS[0].defaultRate);

  const selectedProduct = getProductById(productType);

  function handleProductChange(id: ProductType) {
    setProductType(id);
    const p = getProductById(id);
    if (p) setAnnualRate(p.defaultRate);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (targetAmount === 0) return;
    const termMonths = termUnit === 'años' ? termValue * 12 : termValue;
    const result = simulate(initialAmount, monthlyContribution, annualRate, termMonths, targetAmount);
    onResult(
      { objectiveName, category, targetAmount, initialAmount, monthlyContribution, termValue, termUnit, productType, annualRate },
      result
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Categoría del objetivo */}
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          Categoría del objetivo
          <InfoTooltip text="¿A qué apunta tu meta? Elegir una categoría ayuda a contextualizar tu plan y aparece en los resultados." />
        </label>
        <div className="grid grid-cols-4 gap-2">
          {CATEGORIES.map(({ id, label, Icon, color }) => (
            <button
              key={id}
              type="button"
              onClick={() => setCategory(id)}
              className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all text-xs font-medium ${
                category === id
                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                  : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:text-gray-700'
              }`}
            >
              <Icon className={`w-5 h-5 ${category === id ? color : 'text-gray-400'}`} />
              <span className="leading-tight text-center">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Nombre del objetivo */}
      <div>
        <label htmlFor="objectiveName" className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
          Nombre del objetivo
          <InfoTooltip text="¿Para qué estás ahorrando? Ponle un nombre concreto que te motive. Ej: 'Pie para un depto', 'Viaje a Europa', 'Fondo de emergencia'." />
        </label>
        <input
          id="objectiveName"
          type="text"
          value={objectiveName}
          onChange={(e) => setObjectiveName(e.target.value)}
          placeholder="Ej: Pie para un departamento"
          required
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent text-gray-800 bg-white transition-all placeholder:text-gray-300"
        />
      </div>

      {/* Monto objetivo */}
      <div>
        <label htmlFor="targetAmount" className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
          Monto objetivo (CLP)
          <InfoTooltip text="¿Cuánto dinero necesitas al final? Ej: si quieres ahorrar para un pie de $10.000.000, ese es tu monto objetivo." />
        </label>
        <CLPInput id="targetAmount" value={targetAmount} onChange={setTargetAmount} placeholder="Ej: 10.000.000" required />
      </div>

      {/* Monto inicial */}
      <div>
        <label htmlFor="initialAmount" className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
          Monto inicial (CLP)
          <InfoTooltip text="¿Cuánta plata ya tienes ahorrada y vas a poner de entrada? Puede ser $0 si partes de cero." />
        </label>
        <CLPInput id="initialAmount" value={initialAmount} onChange={setInitialAmount} placeholder="Ej: 500.000 (o 0 si partes de cero)" />
      </div>

      {/* Aporte mensual */}
      <div>
        <label htmlFor="monthlyContribution" className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
          Aporte mensual (CLP)
          <InfoTooltip text="¿Cuánto depositarás cada mes? La constancia es clave: cuando tus ganancias también generan ganancias (interés compuesto), pequeños aportes regulares tienen un impacto enorme a largo plazo." />
        </label>
        <CLPInput id="monthlyContribution" value={monthlyContribution} onChange={setMonthlyContribution} placeholder="Ej: 100.000" />
      </div>

      {/* Plazo */}
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
          Plazo
          <InfoTooltip text="¿En cuánto tiempo quieres llegar a tu objetivo? Podés expresarlo en meses o años. A mayor plazo, más tiempo tiene tu plata para crecer." />
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={termValue}
            onChange={(e) => setTermValue(Math.max(1, parseInt(e.target.value) || 1))}
            min={1}
            max={termUnit === 'años' ? 50 : 600}
            required
            className="w-24 px-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-800 text-center"
          />
          <select
            value={termUnit}
            onChange={(e) => setTermUnit(e.target.value as TermUnit)}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-800 bg-white"
          >
            <option value="meses">meses</option>
            <option value="años">años</option>
          </select>
        </div>
      </div>

      {/* Tipo de producto */}
      <div>
        <label htmlFor="productType" className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
          Tipo de producto
          <InfoTooltip text="El instrumento donde guardarás tu dinero. Cada uno tiene características distintas de riesgo, liquidez y rentabilidad. Al elegir uno verás su ficha educativa." />
        </label>
        <select
          id="productType"
          value={productType}
          onChange={(e) => handleProductChange(e.target.value as ProductType)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-800 bg-white"
        >
          {PRODUCTS.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        {selectedProduct && <ProductCard product={selectedProduct} />}
      </div>

      {/* Tasa anual */}
      <div>
        <label htmlFor="annualRate" className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
          Tasa anual estimada (%)
          <InfoTooltip text="La tasa de rendimiento anual para el cálculo. El valor por defecto es ILUSTRATIVO. Editalo con la tasa real del producto que estés considerando. Buscala en CMF Educa u otras fuentes oficiales." />
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
            className="w-full pl-4 pr-10 py-3 border-2 border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-800 bg-amber-50"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold pointer-events-none">%</span>
        </div>
        <p className="text-xs text-amber-700 mt-1.5">⚠ Valor ilustrativo · editable · no refleja tasas reales vigentes</p>
      </div>

      {/* Rates guide link */}
      <div className="pb-1">
        <RatesGuideModal />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-3.5 rounded-xl font-semibold text-base hover:bg-teal-700 active:bg-teal-800 transition-colors shadow-sm shadow-teal-200 cursor-pointer"
      >
        Simular ahorro →
      </button>
    </form>
  );
}
