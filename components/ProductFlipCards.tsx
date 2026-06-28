'use client';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Wallet, Lock, TrendingUp, BarChart3 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import type { ProductType, ProductInfo } from '@/types';

const PRODUCT_ICONS: Record<ProductType, LucideIcon> = {
  cuenta_remunerada: Wallet,
  deposito_plazo:    Lock,
  apv:               TrendingUp,
  fondo_mutuo:       BarChart3,
};

// TODO: completar con tasas reales verificadas y fecha de actualización
const TOP3: Record<ProductType, Array<{ nombre: string; referencia: string }>> = {
  cuenta_remunerada: [
    { nombre: 'Mercado Pago Chile', referencia: 'mercadopago.com/cl' },
    { nombre: 'MACH',               referencia: 'somosmach.com' },
    { nombre: 'Tu banco actual',     referencia: 'web o app del banco' },
  ],
  deposito_plazo: [
    { nombre: 'Rankia Chile',            referencia: 'rankia.cl' },
    { nombre: 'Chócale',                 referencia: 'chocale.cl' },
    { nombre: 'Tu banco de preferencia', referencia: 'web o app del banco' },
  ],
  apv: [
    { nombre: 'Fintual',     referencia: 'fintual.com' },
    { nombre: 'Principal',   referencia: 'principal.cl' },
    { nombre: 'BancoEstado', referencia: 'bancoestado.cl' },
  ],
  fondo_mutuo: [
    { nombre: 'Fintual',         referencia: 'fintual.com' },
    { nombre: 'Buscafondos.cl',  referencia: 'buscafondos.cl' },
    { nombre: 'Tu administradora', referencia: 'web oficial' },
  ],
};

const RISK_STYLE: Record<ProductInfo['riskLevel'], string> = {
  'Muy bajo': 'bg-verde-tint text-verde-oscuro',
  'Bajo':     'bg-verde-tint text-verde-oscuro',
  'Medio':    'bg-mango-tint text-mango-oscuro',
  'Alto':     'bg-red-50 text-riesgo',
};

function FlipCard({ product }: { product: ProductInfo }) {
  const [flipped, setFlipped] = useState(false);
  const reduced = useReducedMotion();
  const Icon = PRODUCT_ICONS[product.id];
  const top3 = TOP3[product.id];

  return (
    <div
      className="cursor-pointer select-none"
      style={{ perspective: '1200px' }}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped((f) => !f)}
      aria-label={`Ver ficha de ${product.name}`}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: reduced ? 0 : 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', minHeight: 256 }}
      >
        {/* Frente */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          className="absolute inset-0 bg-white rounded-2xl shadow-card p-5 flex flex-col"
        >
          <div className="w-11 h-11 bg-verde-tint rounded-xl flex items-center justify-center mb-3">
            <Icon className="w-5 h-5 text-verde-oscuro" />
          </div>
          <h3 className="font-bold text-tinta text-sm mb-1.5 leading-tight">{product.name}</h3>
          <p className="text-xs leading-relaxed flex-1 line-clamp-4" style={{ color: 'rgba(22,36,29,0.6)' }}>
            {product.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${RISK_STYLE[product.riskLevel]}`}>
              Riesgo {product.riskLevel}
            </span>
            <span className="text-[10px]" style={{ color: 'rgba(22,36,29,0.25)' }}>Toca →</span>
          </div>
        </div>

        {/* Dorso */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="absolute inset-0 bg-verde-tint rounded-2xl p-5 flex flex-col"
        >
          <h3 className="font-bold text-tinta text-sm mb-3">Dónde encontrarlo</h3>
          <div className="space-y-2 flex-1">
            {top3.map((inst, i) => (
              <div key={i} className="flex items-center justify-between bg-white rounded-xl px-3 py-2">
                <span className="text-xs font-medium text-tinta">{inst.nombre}</span>
                <span className="text-[10px] ml-2 truncate" style={{ color: 'rgba(22,36,29,0.4)' }}>
                  {inst.referencia}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] mt-3 leading-snug" style={{ color: 'rgba(22,36,29,0.4)' }}>
            Referencial · verifica tasas vigentes en cada sitio oficial antes de decidir.
          </p>
          <span className="text-[10px] mt-2" style={{ color: 'rgba(22,36,29,0.25)' }}>← Toca para volver</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProductFlipCards() {
  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-tinta">Conoce los productos</h2>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(22,36,29,0.5)' }}>
          Toca cada tarjeta para ver dónde encontrarlo
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRODUCTS.map((p) => (
          <FlipCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
