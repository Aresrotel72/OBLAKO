'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Tag, Gift, ArrowRight, Filter } from 'lucide-react'
import { useState } from 'react'
import { DEMO_ANDROID_SALE } from '@/lib/demo-products'
import { formatPrice } from '@/lib/utils'

const ease = [0.16, 1, 0.3, 1] as const

const BRANDS = ['Все', 'Samsung', 'Xiaomi', 'Redmi', 'Huawei', 'Honor']

const brandOf = (name: string) => {
  const n = name.toLowerCase()
  if (n.includes('samsung')) return 'Samsung'
  if (n.includes('redmi')) return 'Redmi'
  if (n.includes('xiaomi')) return 'Xiaomi'
  if (n.includes('huawei')) return 'Huawei'
  if (n.includes('honor')) return 'Honor'
  return 'Другие'
}

export default function SalePage() {
  const [activeBrand, setActiveBrand] = useState('Все')

  const filtered = activeBrand === 'Все'
    ? DEMO_ANDROID_SALE
    : DEMO_ANDROID_SALE.filter((p) => brandOf(p.name) === activeBrand)

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#6e6e73] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Главная</Link>
          <span>/</span>
          <span className="text-[#ff453a]">Распродажа</span>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a0808] to-[#2d1010] border border-[#ff453a]/20 p-8 sm:p-12 mb-10"
        >
          <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(255,69,58,0.15) 0%, transparent 70%)' }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Tag size={18} className="text-[#ff453a]" />
              <span className="text-xs font-bold text-[#ff453a] uppercase tracking-widest">Распродажа</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
              Чехлы Android<br />
              <span className="text-[#ff453a]">до −70%</span>
            </h1>
            <p className="text-[#86868b] text-base sm:text-lg max-w-lg leading-relaxed mb-6">
              Более 1000 чехлов для Samsung, Xiaomi, Huawei, Honor и Redmi.
              Отличный выбор или в подарок к заказу от 50 BYN.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ff453a]/10 border border-[#ff453a]/20 text-sm text-[#ff453a] font-semibold">
                <Gift size={15} />
                Подарок при заказе от 50 BYN
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-[#86868b]">
                1000+ чехлов в наличии
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gift banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="flex items-start gap-4 bg-[#0a1f0a] border border-[#30d158]/25 rounded-2xl p-5 mb-8"
        >
          <div className="w-10 h-10 rounded-xl bg-[#30d158]/15 flex items-center justify-center shrink-0">
            <Gift size={20} className="text-[#30d158]" />
          </div>
          <div>
            <p className="font-semibold text-white mb-1">Чехол Android — в подарок</p>
            <p className="text-sm text-[#86868b]">
              При заказе любого товара от <span className="text-white font-semibold">50 BYN</span> — выберите
              Android-чехол бесплатно прямо в нашем магазине.
              Скажите продавцу: «хочу чехол в подарок» 🎁
            </p>
          </div>
        </motion.div>

        {/* Brand filter */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Filter size={14} className="text-[#6e6e73]" />
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => setActiveBrand(b)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeBrand === b
                  ? 'bg-[#ff453a] text-white shadow-lg shadow-[#ff453a]/20'
                  : 'bg-white/5 border border-white/10 text-[#86868b] hover:text-white hover:border-white/25'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.04, ease }}
              className="bg-[#0f0f11] border border-white/8 rounded-2xl overflow-hidden hover:border-[#ff453a]/30 transition-all group hover:-translate-y-1 duration-200"
              style={{ willChange: 'transform' }}
            >
              {/* Image area */}
              <div className="aspect-square bg-[#111] flex items-center justify-center relative">
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#ff453a]/15 border border-[#ff453a]/30 text-[10px] font-bold text-[#ff453a]">
                  SALE
                </div>
                <svg viewBox="0 0 100 160" width="60" className="text-[#3a3a3c] drop-shadow-lg">
                  <rect x="8" y="6" width="84" height="148" rx="16" fill="#2a2a2c" />
                  <rect x="22" y="14" width="38" height="28" rx="8" fill="#111" opacity="0.8" />
                  <circle cx="50" cy="108" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                </svg>
                {/* Brand label */}
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-[#6e6e73] uppercase tracking-widest">
                  {brandOf(product.name)}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 mb-1">
                  {product.name}
                </h3>
                <p className="text-[11px] text-[#6e6e73] mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-[#ff453a]">{formatPrice(product.sellingPrice)}</p>
                  </div>
                  <span className="text-[10px] text-[#30d158] font-semibold">
                    {product.quantity} шт
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#86868b]">Нет товаров в этой категории</div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#86868b] mb-4">Хотите что-то конкретное? Уточните наличие напрямую.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-100 transition-all"
          >
            На главную <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </main>
  )
}
