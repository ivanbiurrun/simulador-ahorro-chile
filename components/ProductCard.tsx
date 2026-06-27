import type { ProductInfo } from '@/types';

const riskBadge: Record<string, string> = {
  'Muy bajo': 'bg-green-100 text-green-700 border-green-200',
  Bajo: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Medio: 'bg-amber-100 text-amber-700 border-amber-200',
  Alto: 'bg-red-100 text-red-700 border-red-200',
};

export default function ProductCard({ product }: { product: ProductInfo }) {
  return (
    <div className="bg-teal-50 border border-teal-100 rounded-2xl p-8 mt-4 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-black text-gray-900 text-lg tracking-wide uppercase">📋 Ficha Educativa</h3>
        <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${riskBadge[product.riskLevel]}`}>
          Riesgo {product.riskLevel}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-xl leading-relaxed">{product.description}</p>

      {/* Advantages */}
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Ventajas</p>
        <ul className="space-y-2">
          {product.advantages.map((adv, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start gap-2.5">
              <span className="text-green-500 mt-0.5 flex-shrink-0 font-bold text-base leading-tight">✓</span>
              <span className="leading-relaxed">{adv}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Considerations */}
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Consideraciones</p>
        <ul className="space-y-2">
          {product.considerations.map((con, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start gap-2.5">
              <span className="text-amber-500 mt-0.5 flex-shrink-0 text-base leading-tight">⚠</span>
              <span className="leading-relaxed">{con}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Best for */}
      <div className="bg-white rounded-xl p-4 border border-teal-100">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          ¿Para qué objetivo encaja?
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">{product.bestFor}</p>
      </div>

      {/* Rate terminology */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm font-bold text-amber-700 mb-2">
          📊 ¿Cómo se llama la tasa en este producto?
        </p>
        <p className="text-sm font-semibold text-amber-600 mb-1.5">"{product.rateTerminology}"</p>
        <p className="text-sm text-amber-800 leading-relaxed">{product.rateNote}</p>
      </div>
    </div>
  );
}
