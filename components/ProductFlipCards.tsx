'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Lock, TrendingUp, BarChart3 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import type { ProductType, ProductInfo } from '@/types';

// ── Íconos por producto ────────────────────────────────────────────────────
const PRODUCT_ICONS: Record<ProductType, LucideIcon> = {
  cuenta_remunerada: Wallet,
  deposito_plazo:    Lock,
  apv:               TrendingUp,
  fondo_mutuo:       BarChart3,
};

// ── Top 3 curado (v1 — completar con datos reales y fecha de actualización) ─
// TODO: reemplazar con tasas reales verificadas y agregar campo `fecha`
const TOP3: Record<ProductType, Array<{ nombre: string; referencia: string }>> = {
  cuenta_remunerada: [
    { nombre: 'Mercado Pago Chile', referencia: 'mercadopago.com/cl' },
    { nombre: 'MACH',               referencia: 'somosmach.com' },
    { nombre: 'Tu banco actual',     referencia: 'web o app del banco' },
  ],
  deposito_plazo: [
    { nombre: 'Rankia Chile',       referencia: 'rankia.cl' },
    { nombre: 'Chócale',            referencia: 'chocale.cl' },
    { nombre: 'Tu banco de preferencia', referencia: 'web o app del banco' },
  ],
  apv: [
    { nombre: 'Fintual',            referencia: 'fintual.com' },
    { nombre: 'Principal',          referencia: 'principal.cl' },
    { nombre: 'BancoEstado',        referencia: 'bancoestado.cl' },
  ],
  fondo_mutuo: [
    { nombre: 'Fintual',            referencia: 'fintual.com' },
    { nombre: 'Buscafondos.cl',     referencia: 'buscafondos.cl' },
    { nombre: 'Tu administradora',  referencia: 'web oficial' },
  ],
};

// ── Estilos de riesgo ──────────────────────────────────────────────────────
const RISK_STYLE: Record<ProductInfo['riskLevel'], string> = {
  'Muy bajo': 'bg-verde-tint text-verde-oscuro',
  'Bajo':     'bg-verde-tint text-verde-oscuro',
  'Medio':    'bg-mango-tint text-mango-oscuro',
  'Alto':     'bg-red-50 text-riesgo',
};

// ── FlipCard individual ────────────────────────────────────────────────────
function FlipCard({ product }: { product: ProductInfo }) {
  const [flipped, setFlipped] = useState(false);
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
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', minHeight: 264 }}
      >
        {/* ── Frente ── */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          className="absolute inset-0 bg-white rounded-2xl shadow-card p-5 flex flex-col"
        >
          <div className="w-12 h-12 bg-verde-tint rounded-xl flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-verde" />
          </div>

          <h3 className="font-bold text-tinta text-sm mb-1.5 leading-tight">{product.name}</h3>

          <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-4">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${RISK_STYLE[product.riskLevel]}`}>
              Riesgo {product.riskLevel}
            </span>
            <span className="text-[10px] text-gray-300">Toca para ver →</span>
          </div>
        </div>

        {/* ── Dorso ── */}
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
                <span className="text-[10px] text-gray-400 ml-2 truncate">{inst.referencia}</span>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-gray-400 mt-3 leading-snug">
            Referencial · verifica tasas vigentes en cada sitio oficial antes de decidir.
          </p>

          <span className="text-[10px] text-gray-300 mt-2">← Toca para volver</span>
        </div>
      </motion.div>
    </div>
  );
}

// ── Grid de 4 tarjetas ─────────────────────────────────────────────────────
export default function ProductFlipCards() {
  return (
    <section className="max-w-6xl mx-auto px-4 pb-12">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-tinta">Conoce los productos</h2>
        <p className="text-sm text-gray-400 mt-1">
          Toca cada tarjeta para ver dónde encontrarlo · Ficha educativa completa al seleccionarlo en el formulario.
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
