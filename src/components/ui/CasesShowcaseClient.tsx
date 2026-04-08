'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { CaProduct } from '@/types/product'
import { formatPrice } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
  products: CaProduct[]
}

interface Theme {
  caseFill: string
  caseHighlight: string
  ringColor: string
  glowColor: string
  accent: string
  swatches: string[]
}

// ─── Themes ───────────────────────────────────────────────────────────────────

const THEMES: Theme[] = [
  {
    caseFill: '#b0b0b4', caseHighlight: '#d1d1d6',
    ringColor: 'rgba(120,120,128,0.5)', glowColor: 'rgba(120,120,128,0.12)',
    accent: '#6e6e73', swatches: ['#8e8e93', '#636366', '#0071e3'],
  },
  {
    caseFill: '#1a4080', caseHighlight: '#2563eb',
    ringColor: 'rgba(96,165,250,0.55)', glowColor: 'rgba(59,130,246,0.12)',
    accent: '#0071e3', swatches: ['#3b82f6', '#1d4ed8', '#60a5fa'],
  },
  {
    caseFill: '#e8e8ec', caseHighlight: '#f5f5f7',
    ringColor: 'rgba(180,180,185,0.4)', glowColor: 'rgba(180,180,185,0.1)',
    accent: '#1d1d1f', swatches: ['#f5f5f7', '#d1d1d6', '#8e8e93'],
  },
  {
    caseFill: '#7c6945', caseHighlight: '#c4a97d',
    ringColor: 'rgba(196,169,125,0.55)', glowColor: 'rgba(196,169,125,0.12)',
    accent: '#8b7355', swatches: ['#c4a97d', '#8b7355', '#6b5c43'],
  },
  {
    caseFill: '#14532d', caseHighlight: '#22c55e',
    ringColor: 'rgba(74,222,128,0.5)', glowColor: 'rgba(74,222,128,0.1)',
    accent: '#16a34a', swatches: ['#4ade80', '#166534', '#14532d'],
  },
  {
    caseFill: '#581c87', caseHighlight: '#c084fc',
    ringColor: 'rgba(192,132,252,0.55)', glowColor: 'rgba(192,132,252,0.12)',
    accent: '#7c3aed', swatches: ['#c084fc', '#a855f7', '#7e22ce'],
  },
]

// ─── Categories ───────────────────────────────────────────────────────────────

const CATEGORIES = ['Все', 'iPhone 17 Pro', 'iPhone 17', 'iPhone 16', 'iPhone 15']

// ─── Case SVG ─────────────────────────────────────────────────────────────────

function CaseSvg({ theme, id }: { theme: Theme; id: string }) {
  const gradId = `cg-${id}`
  const shineId = `sh-${id}`
  const dotId = `dt-${id}`
  const shadowId = `sd-${id}`

  return (
    <svg viewBox="0 0 140 240" width="100%" className="drop-shadow-xl">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={theme.caseHighlight} stopOpacity="1" />
          <stop offset="100%" stopColor={theme.caseFill} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={shineId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <pattern id={dotId} x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="0.7" fill="#000" opacity="0.04" />
        </pattern>
        <filter id={shadowId}>
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000" floodOpacity="0.15" />
        </filter>
      </defs>

      <rect x="12" y="10" width="116" height="220" rx="24" fill={`url(#${gradId})`} filter={`url(#${shadowId})`} />
      <rect x="12" y="10" width="116" height="220" rx="24" fill={`url(#${dotId})`} />
      <rect x="12" y="10" width="116" height="100" rx="24" fill={`url(#${shineId})`} />

      {/* Camera */}
      <rect x="34" y="22" width="52" height="56" rx="14" fill="#000" opacity="0.5" />
      <circle cx="50" cy="42" r="10" fill="#111" />
      <circle cx="50" cy="42" r="6" fill="#0a0a0a" />
      <circle cx="50" cy="42" r="2.5" fill="#1a1a1a" />
      <circle cx="70" cy="42" r="10" fill="#111" />
      <circle cx="70" cy="42" r="6" fill="#0a0a0a" />
      <circle cx="70" cy="42" r="2.5" fill="#1a1a1a" />
      <circle cx="60" cy="58" r="7" fill="#111" />
      <circle cx="60" cy="58" r="4" fill="#0a0a0a" />
      <circle cx="46" cy="38" r="2" fill="#fff" opacity="0.18" />
      <circle cx="66" cy="38" r="2" fill="#fff" opacity="0.18" />

      {/* MagSafe */}
      <circle cx="70" cy="165" r="42" fill="none" stroke={theme.ringColor} strokeWidth="1.5" strokeDasharray="4 8" />
      <circle cx="70" cy="165" r="30" fill="none" stroke={theme.ringColor} strokeWidth="1" opacity="0.5" />
      <circle cx="70" cy="165" r="8" fill={theme.caseHighlight} opacity="0.25" />

      {/* Buttons */}
      <rect x="126" y="72" width="6" height="36" rx="3" fill={theme.caseFill} />
      <rect x="8" y="68" width="6" height="22" rx="3" fill={theme.caseFill} />
      <rect x="8" y="97" width="6" height="22" rx="3" fill={theme.caseFill} />
    </svg>
  )
}

// ─── PS-Style Product Card ────────────────────────────────────────────────────

function PSProductCard({
  product,
  theme,
  isActive,
  index,
  onClick,
}: {
  product: CaProduct
  theme: Theme
  isActive: boolean
  index: number
  onClick: (i: number) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="flex-shrink-0"
      style={{ width: 'clamp(160px, 20vw, 210px)' }}
    >
      <button
        onClick={() => onClick(index)}
        className="w-full group text-left"
      >
        {/* Case Visual */}
        <div
          className={`relative rounded-2xl overflow-hidden border transition-all duration-300 ${
            isActive
              ? 'border-[#0071e3]/30 shadow-lg shadow-[#0071e3]/8'
              : 'border-border hover:border-black/15'
          }`}
          style={{
            background: isActive
              ? `radial-gradient(ellipse at 50% 30%, ${theme.glowColor} 0%, var(--background-secondary) 80%)`
              : 'var(--background-secondary)',
            paddingTop: '12%',
            paddingBottom: '12%',
          }}
        >
          {/* Glow beneath case */}
          {isActive && (
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full blur-2xl opacity-40 pointer-events-none"
              style={{ background: theme.glowColor }}
            />
          )}

          {/* Floating case animation */}
          <div
            className={`relative z-10 mx-auto transition-transform duration-500 ${
              isActive ? 'case-float' : 'group-hover:-translate-y-1'
            }`}
            style={{ width: '60%' }}
          >
            <CaseSvg theme={theme} id={`card-${index}`} />
          </div>

          {/* Active indicator line */}
          {isActive && (
            <motion.div
              layoutId="ps-active-line"
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-1.5 mt-3 px-1">
          {theme.swatches.map((color, i) => (
            <div
              key={color}
              className={`rounded-full border transition-all duration-200 ${
                i === 0 && isActive ? 'border-black/40 scale-110' : 'border-black/10'
              }`}
              style={{
                background: color,
                width: i === 0 && isActive ? 12 : 10,
                height: i === 0 && isActive ? 12 : 10,
              }}
            />
          ))}
        </div>

        {/* Name */}
        <div className="mt-2 px-1">
          <p className={`text-sm font-medium leading-snug line-clamp-2 transition-colors duration-200 ${
            isActive ? 'text-foreground' : 'text-foreground-muted group-hover:text-foreground-secondary'
          }`}>
            {product.name.split(' ').slice(0, 4).join(' ')}
          </p>
          <p className={`text-xs mt-0.5 transition-colors duration-200 ${
            isActive ? 'text-[#0071e3]' : 'text-foreground-muted'
          }`}>
            {formatPrice(product.sellingPrice)}
          </p>
        </div>
      </button>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1] as const

export default function CasesShowcaseClient({ products }: Props) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [activeCategory, setActiveCategory] = useState('Все')
  const rowRef = useRef<HTMLDivElement>(null)

  const handleSelect = useCallback((i: number) => setActiveIdx(i), [])

  const filteredProducts = activeCategory === 'Все'
    ? products
    : products.filter(p => p.name.toLowerCase().includes(activeCategory.toLowerCase().replace('iphone ', 'iphone ')))

  const displayProducts = filteredProducts.slice(0, 6)
  const active = displayProducts[activeIdx] ?? displayProducts[0]

  // Reset active when category changes
  useEffect(() => { setActiveIdx(0) }, [activeCategory])

  if (products.length === 0) {
    return (
      <section className="py-24 px-4 text-center text-foreground-muted">
        <p>Загружаем коллекцию…</p>
      </section>
    )
  }

  const activeTheme = THEMES[activeIdx % THEMES.length]!

  return (
    <section className="py-28 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease }}
            className="text-[11px] font-semibold tracking-[0.22em] uppercase text-foreground-muted mb-4"
          >
            OBLAKO · Чехлы для iPhone™
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05, ease }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-foreground tracking-tight leading-[0.92] mb-4"
          >
            Защита с характером.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease }}
            className="text-foreground-muted text-base sm:text-lg font-light"
          >
            Премиальные чехлы с MagSafe · Приходите — подберём идеальный.
          </motion.p>
        </div>

        {/* ── Category Tabs ── */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15, ease }}
          className="flex items-center justify-center gap-0 mb-16 overflow-x-auto scrollbar-hide"
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  isActive ? 'text-foreground' : 'text-foreground-muted hover:text-foreground-secondary'
                }`}
              >
                {cat}
                {isActive && (
                  <motion.div
                    layoutId="ps-tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
              </button>
            )
          })}
        </motion.nav>

        {/* ── Horizontal Product Lineup ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {displayProducts.length > 0 ? (
              <div
                ref={rowRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 justify-start lg:justify-center"
              >
                {displayProducts.map((product, i) => (
                  <PSProductCard
                    key={product.id}
                    product={product}
                    theme={THEMES[i % THEMES.length]!}
                    isActive={i === activeIdx}
                    index={i}
                    onClick={handleSelect}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-foreground-muted py-12">
                Чехлов для этой серии пока нет
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Active Product Detail Bar ── */}
        {active && (
          <motion.div
            key={`detail-${activeIdx}-${activeCategory}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease }}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 rounded-2xl border border-border bg-background-card shadow-sm"
          >
            <div className="flex items-center gap-4">
              {/* Mini case icon */}
              <div className="w-10 flex-shrink-0 opacity-80">
                <svg viewBox="0 0 140 240" className="w-full">
                  <rect x="12" y="10" width="116" height="220" rx="24" fill={activeTheme.caseFill} />
                  <rect x="12" y="10" width="116" height="60" rx="24" fill={activeTheme.caseHighlight} opacity="0.2" />
                  <rect x="34" y="22" width="52" height="38" rx="12" fill="#000" opacity="0.4" />
                  <circle cx="70" cy="165" r="28" fill="none" stroke={activeTheme.ringColor} strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm leading-snug">{active.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                    style={{
                      color: activeTheme.accent,
                      borderColor: `${activeTheme.accent}30`,
                      background: `${activeTheme.accent}0a`,
                    }}
                  >
                    MagSafe
                  </span>
                  {active.stockStatus === 'ok' && (
                    <span className="flex items-center gap-1 text-[10px] text-[#30d158]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#30d158] animate-pulse" />
                      В наличии
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:flex-row flex-col w-full sm:w-auto">
              <span className="text-2xl font-bold text-foreground">{formatPrice(active.sellingPrice)}</span>
              <div className="flex gap-2 w-full sm:w-auto">
                <Link
                  href={`/catalog/${active.id}`}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm font-bold text-white text-center transition-all hover:opacity-90 active:scale-95 bg-[#0071e3]"
                >
                  Забронировать
                </Link>
                <Link
                  href={`/catalog/${active.id}`}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm font-medium text-foreground-muted border border-border hover:border-[#0071e3]/30 hover:text-[#0071e3] transition-all flex items-center justify-center gap-1"
                >
                  Детали <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Link to all ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <Link
            href="/cases"
            className="inline-flex items-center gap-1.5 text-sm text-[#0071e3] hover:underline"
          >
            Смотреть все чехлы <ArrowRight size={14} />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
