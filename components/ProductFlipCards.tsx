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

const PRODUCT_ACCENT: Record<ProductType, string> = {
  cuenta_remunerada: '#378ADD',
  deposito_plazo:    '#1D9E75',
  fondo_mutuo:       '#7F77DD',
  apv:               '#D85A30',
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
    { nombre: 'Fintual',           referencia: 'fintual.com' },
    { nombre: 'Buscafondos.cl',    referencia: 'buscafondos.cl' },
    { nombre: 'Tu administradora', referencia: 'web oficial' },
  ],
};

const RISK_STYLE: Record<ProductInfo['riskLevel'], React.CSSProperties> = {
  'Muy bajo': { background: '#E3F7EF', color: '#0B7A56' },
  'Bajo':     { background: '#E3F7EF', color: '#0B7A56' },
  'Medio':    { background: '#FDEBCF', color: '#8A5A0C' },
  'Alto':     { background: '#FEE8E7', color: '#C0392B' },
};

function FlipCard({ product }: { product: ProductInfo }) {
  const [flipped, setFlipped] = useState(false);
  const reduced = useReducedMotion();
  const Icon = PRODUCT_ICONS[product.id];
  const accent = PRODUCT_ACCENT[product.id];
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
        style={{ transformStyle: 'preserve-3d', position: 'relative', minHeight: 270 }}
      >
        {/* Frente */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderLeft: `3px solid ${accent}`,
            boxShadow: '0 2px 10px rgba(22,36,29,0.06)',
            border: `1px solid #F0E9DC`,
            borderLeftWidth: '3px',
            borderLeftColor: accent,
          }}
          className="absolute inset-0 bg-white rounded-2xl p-5 flex flex-col"
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 flex-shrink-0"
            style={{ background: `${accent}18` }}
          >
            <Icon className="w-5 h-5" style={{ color: accent }} />
          </div>
          <h3 className="font-semibold text-tinta mb-2 leading-tight" style={{ fontSize: '18px', fontWeight: 600 }}>
            {product.name}
          </h3>
          <div className="flex-1 overflow-y-auto pr-1 -mr-1" style={{ maxHeight: '90px' }}>
            <p className="leading-relaxed" style={{ fontSize: '15px', color: '#5C635A' }}>
              {product.description}
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={RISK_STYLE[product.riskLevel]}
            >
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
            background: `${accent}12`,
            border: `1px solid ${accent}30`,
          }}
          className="absolute inset-0 rounded-2xl p-5 flex flex-col"
        >
          <h3 className="font-bold text-tinta text-sm mb-3">Dónde encontrarlo</h3>
          <div className="space-y-2 flex-1">
            {top3.map((inst, i) => (
              <div key={i} className="flex items-center justify-between bg-white rounded-xl px-3 py-2" style={{ border: '1px solid #F0E9DC' }}>
                <span className="text-xs font-medium text-tinta">{inst.nombre}</span>
                <span className="text-[10px] ml-2 truncate" style={{ color: '#7A8077' }}>
                  {inst.referencia}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] mt-3 leading-snug" style={{ color: '#7A8077' }}>
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
    <section className="max-w-[1440px] mx-auto px-10 lg:px-12 py-10">
      <div className="mb-6">
        <h2 className="font-bold text-tinta" style={{ fontSize: '24px', fontWeight: 700 }}>Conoce los productos</h2>
        <p className="text-sm mt-1" style={{ color: '#7A8077' }}>
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
