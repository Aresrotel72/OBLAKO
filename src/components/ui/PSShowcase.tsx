'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { CaProduct } from '@/types/product'
import { formatPrice } from '@/lib/utils'

interface Props {
  products: CaProduct[]
}

// ─── Color mapping for case SVGs ─────────────────────────────────────────────

interface CaseColor {
  fill: string
  highlight: string
  ring: string
  dot: string
  label: string
}

const CASE_COLORS: CaseColor[] = [
  { fill: '#f5f0e8', highlight: '#faf6ef', ring: 'rgba(200,185,155,0.4)', dot: '#f5f0e8', label: 'Vanilla' },
  { fill: '#2d5a3d', highlight: '#3a7a52', ring: 'rgba(58,122,82,0.4)', dot: '#2d5a3d', label: 'Green' },
  { fill: '#1a1a1e', highlight: '#2a2a2e', ring: 'rgba(100,100,110,0.4)', dot: '#1a1a1e', label: 'Black' },
  { fill: '#e8e0f0', highlight: '#f0eaf8', ring: 'rgba(180,160,220,0.4)', dot: '#c4b5fd', label: 'Lavender' },
  { fill: '#f5c6d0', highlight: '#fad4dc', ring: 'rgba(245,180,195,0.4)', dot: '#f5c6d0', label: 'Pink' },
  { fill: '#d4e4f7', highlight: '#e6eef8', ring: 'rgba(180,200,230,0.4)', dot: '#a8c8f0', label: 'Blue' },
  { fill: '#f0e6d0', highlight: '#f8f0e0', ring: 'rgba(200,180,140,0.4)', dot: '#c8a870', label: 'Sienna' },
  { fill: '#e0e0e0', highlight: '#f0f0f0', ring: 'rgba(200,200,200,0.4)', dot: '#e0e0e0', label: 'Clear' },
]

// ─── Minimal Case SVG ────────────────────────────────────────────────────────

function CaseMinimal({ color, size = 200 }: { color: CaseColor; size?: number }) {
  return (
    <svg viewBox="0 0 140 240" width={size} className="drop-shadow-xl transition-transform duration-500">
      <defs>
        <linearGradient id={`cg-${color.label}`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={color.highlight} />
          <stop offset="100%" stopColor={color.fill} />
        </linearGradient>
        <linearGradient id={`sh-${color.label}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Body */}
      <rect x="12" y="10" width="116" height="220" rx="24" fill={`url(#cg-${color.label})`} />
      {/* Shine */}
      <rect x="12" y="10" width="116" height="110" rx="24" fill={`url(#sh-${color.label})`} />

      {/* Camera cutout */}
      <rect x="34" y="22" width="52" height="56" rx="14" fill="rgba(0,0,0,0.12)" />
      <circle cx="50" cy="42" r="9" fill="rgba(0,0,0,0.15)" />
      <circle cx="50" cy="42" r="5" fill="rgba(0,0,0,0.2)" />
      <circle cx="70" cy="42" r="9" fill="rgba(0,0,0,0.15)" />
      <circle cx="70" cy="42" r="5" fill="rgba(0,0,0,0.2)" />
      <circle cx="60" cy="58" r="6" fill="rgba(0,0,0,0.15)" />

      {/* MagSafe ring */}
      <circle cx="70" cy="160" r="36" fill="none" stroke={color.ring} strokeWidth="1.2" />
      <circle cx="70" cy="160" r="26" fill="none" stroke={color.ring} strokeWidth="0.8" opacity="0.5" />

      {/* Side buttons */}
      <rect x="126" y="72" width="5" height="32" rx="2.5" fill={color.fill} opacity="0.6" />
      <rect x="9" y="68" width="5" height="20" rx="2.5" fill={color.fill} opacity="0.6" />
      <rect x="9" y="95" width="5" height="20" rx="2.5" fill={color.fill} opacity="0.6" />
    </svg>
  )
}

// ─── Model tabs ──────────────────────────────────────────────────────────────

const MODEL_TABS = ['Все', 'iPhone 17 Pro', 'iPhone 17', 'iPhone Air', 'iPhone 17e'] as const

function filterByModel(products: CaProduct[], tab: string): CaProduct[] {
  if (tab === 'Все') return products
  return products.filter(p => p.name.toLowerCase().includes(tab.replace('iPhone ', '').toLowerCase()))
}

// ─── Ease ────────────────────────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1] as const

// ─── Main Component ──────────────────────────────────────────────────────────

export default function PSShowcase({ products }: Props) {
  const [activeTab, setActiveTab] = useState<string>('Все')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const filtered = filterByModel(products, activeTab)
  const selected = filtered[selectedIdx]

  // Reset selection when tab changes
  useEffect(() => {
    setSelectedIdx(0)
  }, [activeTab])

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 300
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  if (products.length === 0) return null

  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* ── Logo + Title ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-12"
        >
          {/* OBLAKO mini icon */}
          <div className="flex justify-center mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>

          {/* Tabs */}
          <nav className="flex items-center justify-center gap-6 mb-10">
            {MODEL_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative text-sm font-medium pb-2 transition-colors duration-300 ${
                  activeTab === tab ? 'text-white' : 'text-[#6e6e73] hover:text-[#86868b]'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="ps-tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Чехлы для iPhone
          </h2>
        </motion.div>

        {/* ── Product lineup ── */}
        <div className="relative">
          {/* Scroll buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all -translate-x-1/2 backdrop-blur-sm hidden md:flex"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all translate-x-1/2 backdrop-blur-sm hidden md:flex"
          >
            <ChevronRight size={18} />
          </button>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Products scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide py-8 px-8 snap-x snap-mandatory"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => {
                const color = CASE_COLORS[i % CASE_COLORS.length]!
                const isSelected = i === selectedIdx

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease }}
                    className="snap-center flex-shrink-0"
                  >
                    <button
                      onClick={() => setSelectedIdx(i)}
                      className={`group relative flex flex-col items-center w-[180px] sm:w-[200px] py-8 px-4 rounded-3xl transition-all duration-400 ${
                        isSelected
                          ? 'bg-white/[0.06] border border-white/15 shadow-lg shadow-white/[0.03]'
                          : 'bg-transparent border border-transparent hover:bg-white/[0.03]'
                      }`}
                    >
                      {/* Case SVG */}
                      <div className={`transition-transform duration-500 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}>
                        <CaseMinimal color={color} size={isSelected ? 140 : 120} />
                      </div>

                      {/* Color dots */}
                      <div className="flex items-center gap-1.5 mt-5 mb-3">
                        {CASE_COLORS.slice(0, 4).map((c, ci) => (
                          <div
                            key={ci}
                            className={`w-3 h-3 rounded-full border transition-all duration-200 ${
                              ci === (i % CASE_COLORS.length)
                                ? 'border-white/50 scale-125'
                                : 'border-white/10 hover:border-white/30'
                            }`}
                            style={{ background: c.dot }}
                          />
                        ))}
                      </div>

                      {/* Name */}
                      <p className="text-xs text-[#86868b] text-center leading-snug line-clamp-2 mb-1 min-h-[32px]">
                        {product.name.replace(/iPhone \d+\w?\s*(Pro Max|Pro|Air)?/i, '').trim() || product.name}
                      </p>

                      {/* Price */}
                      <p className={`text-sm font-bold transition-colors ${isSelected ? 'text-white' : 'text-white/60'}`}>
                        {formatPrice(product.sellingPrice)}
                      </p>

                      {/* Selected indicator */}
                      {isSelected && (
                        <motion.div
                          layoutId="ps-selected"
                          className="absolute -bottom-1 w-8 h-1 rounded-full bg-white/30"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Selected product details ── */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease }}
              className="mt-4 rounded-3xl border border-white/8 bg-white/[0.02] backdrop-blur-sm p-8 sm:p-10"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {selected.stockStatus === 'ok' && (
                      <span className="flex items-center gap-1.5 text-xs text-[#30d158]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#30d158]" />
                        В наличии
                      </span>
                    )}
                    {selected.stockStatus === 'low' && (
                      <span className="flex items-center gap-1.5 text-xs text-[#ffd60a]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffd60a]" />
                        Заканчивается
                      </span>
                    )}
                    {selected.article && (
                      <span className="text-xs text-[#6e6e73]">Арт. {selected.article}</span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {selected.name}
                  </h3>

                  {selected.description && (
                    <p className="text-sm text-[#86868b] max-w-lg">
                      {selected.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">
                      {formatPrice(selected.sellingPrice)}
                    </div>
                    <div className="text-xs text-[#6e6e73] mt-0.5">Бронь на 24 часа</div>
                  </div>

                  <Link
                    href={`/catalog/${selected.id}`}
                    data-cursor="cta"
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black text-sm font-bold hover:bg-white/90 active:scale-95 transition-all"
                  >
                    Подробнее <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── View all link ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
          className="mt-10 text-center"
        >
          <Link
            href="/cases"
            className="inline-flex items-center gap-1.5 text-sm text-[#86868b] hover:text-white transition-colors"
          >
            Смотреть все чехлы <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
