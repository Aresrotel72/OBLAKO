'use client'

import { useState, useCallback, memo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Zap, Gem, ArrowRight } from 'lucide-react'
import type { CaProduct } from '@/types/product'
import { formatPrice } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Props {
  products: CaProduct[]
}

interface Theme {
  bgFrom: string
  bgTo: string
  caseFill: string
  caseHighlight: string
  ringColor: string
  glowColor: string
  accent: string
  swatches: string[]
}

interface Metrics {
  material: string
  protection: number
  magsafe: number
  quality: number
}

// ─── Theme palette ────────────────────────────────────────────────────────────

const THEMES: Theme[] = [
  {
    bgFrom: '#0e0e10', bgTo: '#1a1a1e',
    caseFill: '#3a3a3c', caseHighlight: '#636366',
    ringColor: 'rgba(99,99,102,0.6)',
    glowColor: 'rgba(99,99,102,0.35)',
    accent: '#8e8e93',
    swatches: ['#636366', '#8e8e93', '#3a85f0'],
  },
  {
    bgFrom: '#050f20', bgTo: '#0a1f3d',
    caseFill: '#1a4080', caseHighlight: '#2563eb',
    ringColor: 'rgba(96,165,250,0.55)',
    glowColor: 'rgba(59,130,246,0.4)',
    accent: '#60a5fa',
    swatches: ['#3b82f6', '#1d4ed8', '#60a5fa'],
  },
  {
    bgFrom: '#101010', bgTo: '#1c1c1e',
    caseFill: '#2a2a2c', caseHighlight: 'rgba(255,255,255,0.18)',
    ringColor: 'rgba(255,255,255,0.35)',
    glowColor: 'rgba(255,255,255,0.1)',
    accent: '#f5f5f7',
    swatches: ['#ffffff', '#d1d1d6', '#8e8e93'],
  },
  {
    bgFrom: '#120f08', bgTo: '#221a0d',
    caseFill: '#7c6945', caseHighlight: '#c4a97d',
    ringColor: 'rgba(196,169,125,0.55)',
    glowColor: 'rgba(196,169,125,0.35)',
    accent: '#c4a97d',
    swatches: ['#c4a97d', '#8b7355', '#6b5c43'],
  },
  {
    bgFrom: '#08150d', bgTo: '#0f2218',
    caseFill: '#14532d', caseHighlight: '#22c55e',
    ringColor: 'rgba(74,222,128,0.5)',
    glowColor: 'rgba(74,222,128,0.3)',
    accent: '#4ade80',
    swatches: ['#4ade80', '#166534', '#14532d'],
  },
  {
    bgFrom: '#10081e', bgTo: '#1a0e30',
    caseFill: '#581c87', caseHighlight: '#c084fc',
    ringColor: 'rgba(192,132,252,0.55)',
    glowColor: 'rgba(192,132,252,0.35)',
    accent: '#c084fc',
    swatches: ['#c084fc', '#a855f7', '#7e22ce'],
  },
]

// ─── Metrics detection ────────────────────────────────────────────────────────

function getMetrics(name: string): Metrics {
  const n = name.toLowerCase()
  if (/кожан|leather/.test(n)) return { material: 'Натуральная кожа', protection: 88, magsafe: 100, quality: 95 }
  if (/силик|silic/.test(n)) return { material: 'Мягкий силикон', protection: 82, magsafe: 100, quality: 87 }
  if (/прозрач|clear|ultra/.test(n)) return { material: 'Поликарбонат', protection: 62, magsafe: 100, quality: 74 }
  if (/титан|titan/.test(n)) return { material: 'Авиа-алюминий', protection: 95, magsafe: 100, quality: 98 }
  return { material: 'Премиум материал', protection: 78, magsafe: 100, quality: 84 }
}

// ─── Case SVG ─────────────────────────────────────────────────────────────────

function CaseSvg({ theme }: { theme: Theme }) {
  return (
    <svg viewBox="0 0 140 240" width="100%" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="caseGrad" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={theme.caseHighlight} stopOpacity="1" />
          <stop offset="100%" stopColor={theme.caseFill} stopOpacity="1" />
        </linearGradient>
        <linearGradient id="shineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="centerGlow" cx="50%" cy="70%" r="50%">
          <stop offset="0%" stopColor={theme.caseHighlight} stopOpacity="0.12" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <pattern id="dotTex" x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="0.7" fill="#fff" opacity="0.07" />
        </pattern>
        <filter id="caseShadow">
          <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#000" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* Case body */}
      <rect x="12" y="10" width="116" height="220" rx="24" fill="url(#caseGrad)" filter="url(#caseShadow)" />
      {/* Texture overlay */}
      <rect x="12" y="10" width="116" height="220" rx="24" fill="url(#dotTex)" />
      {/* Shine */}
      <rect x="12" y="10" width="116" height="100" rx="24" fill="url(#shineGrad)" />
      {/* Inner glow */}
      <rect x="12" y="10" width="116" height="220" rx="24" fill="url(#centerGlow)" />

      {/* Camera cutout */}
      <rect x="34" y="22" width="52" height="56" rx="14" fill="#000" opacity="0.75" />
      {/* Lenses */}
      <circle cx="50" cy="42" r="10" fill="#111" />
      <circle cx="50" cy="42" r="6" fill="#0a0a0a" />
      <circle cx="50" cy="42" r="2.5" fill="#1a1a1a" />
      <circle cx="70" cy="42" r="10" fill="#111" />
      <circle cx="70" cy="42" r="6" fill="#0a0a0a" />
      <circle cx="70" cy="42" r="2.5" fill="#1a1a1a" />
      <circle cx="60" cy="58" r="7" fill="#111" />
      <circle cx="60" cy="58" r="4" fill="#0a0a0a" />
      {/* Lens highlights */}
      <circle cx="46" cy="38" r="2" fill="#fff" opacity="0.18" />
      <circle cx="66" cy="38" r="2" fill="#fff" opacity="0.18" />

      {/* MagSafe outer ring */}
      <circle cx="70" cy="165" r="42" fill="none" stroke={theme.ringColor} strokeWidth="1.5" strokeDasharray="4 8" />
      {/* MagSafe inner ring */}
      <circle cx="70" cy="165" r="30" fill="none" stroke={theme.ringColor} strokeWidth="1" opacity="0.5" />
      {/* MagSafe center dot */}
      <circle cx="70" cy="165" r="8" fill={theme.caseHighlight} opacity="0.25" />

      {/* Side buttons */}
      <rect x="126" y="72" width="6" height="36" rx="3" fill={theme.caseFill} />
      <rect x="8" y="68" width="6" height="22" rx="3" fill={theme.caseFill} />
      <rect x="8" y="97" width="6" height="22" rx="3" fill={theme.caseFill} />
    </svg>
  )
}

// ─── Metric Bar ───────────────────────────────────────────────────────────────

function MetricBar({ label, value, accent, icon: Icon, delay }: {
  label: string
  value: number
  accent: string
  icon: React.ElementType
  delay: number
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-[#86868b]">
          <Icon size={12} />
          <span>{label}</span>
        </div>
        <span className="font-semibold text-white">{value}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}aa, ${accent})` }}
        />
      </div>
    </div>
  )
}

// ─── Product Visual ───────────────────────────────────────────────────────────
// Все бесконечные анимации — CSS (compositor thread, без JS overhead)

function ProductVisual({ theme }: { theme: Theme }) {
  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: 360 }}>
      {/* Glow under case — уменьшен blur-2xl вместо blur-3xl */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 h-14 rounded-full blur-2xl opacity-50 pointer-events-none"
        style={{ background: theme.glowColor }}
      />

      {/* Outer rotating ring — CSS animation */}
      <div
        className="ring-spin-cw absolute"
        style={{ width: 300, height: 300 }}
      >
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <circle
            cx="150" cy="150" r="140"
            fill="none"
            stroke={theme.ringColor}
            strokeWidth="1"
            strokeDasharray="6 20"
          />
        </svg>
      </div>

      {/* Inner counter-rotating ring — CSS animation */}
      <div
        className="ring-spin-ccw absolute"
        style={{ width: 230, height: 230 }}
      >
        <svg viewBox="0 0 230 230" className="w-full h-full">
          <circle
            cx="115" cy="115" r="108"
            fill="none"
            stroke={theme.ringColor}
            strokeWidth="0.7"
            strokeDasharray="3 12"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Floating case — CSS animation */}
      <div className="case-float relative z-10 w-[170px]">
        <CaseSvg theme={theme} />
      </div>
    </div>
  )
}

// ─── Product Thumb ────────────────────────────────────────────────────────────

function ProductThumb({ product, theme, isActive, index, onClick }: {
  product: CaProduct
  theme: Theme
  isActive: boolean
  index: number
  onClick: (i: number) => void
}) {
  return (
    <button
      onClick={() => onClick(index)}
      className={`relative flex-shrink-0 w-28 rounded-2xl overflow-hidden border transition-all duration-200
        active:scale-95 hover:scale-[1.03] ${
        isActive ? 'border-white/40 ring-1 ring-white/20' : 'border-white/8 hover:border-white/20'
      }`}
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${theme.bgFrom}, ${theme.bgTo})`
          : 'rgba(20,20,22,1)',
      }}
    >
      <div className="py-4 px-2 flex flex-col items-center gap-2">
        <div className="w-10 relative">
          <svg viewBox="0 0 140 240" className="w-full drop-shadow-lg">
            <rect x="12" y="10" width="116" height="220" rx="24" fill={theme.caseFill} />
            <rect x="12" y="10" width="116" height="60" rx="24" fill={theme.caseHighlight} opacity="0.15" />
            <rect x="34" y="22" width="52" height="38" rx="12" fill="#000" opacity="0.7" />
            <circle cx="70" cy="165" r="28" fill="none" stroke={theme.ringColor} strokeWidth="1.5" />
          </svg>
        </div>
        <span className="text-[10px] text-[#86868b] text-center leading-tight line-clamp-2 px-1">
          {product.name.split(' ').slice(0, 3).join(' ')}
        </span>
        {isActive && (
          <span className="text-[9px] font-bold" style={{ color: theme.accent }}>●</span>
        )}
      </div>
    </button>
  )
}

const ProductThumbMemo = memo(ProductThumb)

// ─── Main Component ───────────────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1] as const

export default function CasesShowcaseClient({ products }: Props) {
  const [activeIdx, setActiveIdx] = useState(0)

  const handleSelect = useCallback((i: number) => setActiveIdx(i), [])

  if (products.length === 0) {
    return (
      <section className="py-24 px-4 text-center text-[#86868b]">
        <p>Загружаем коллекцию чехлов…</p>
      </section>
    )
  }

  const product = products[activeIdx]!
  const theme = THEMES[activeIdx % THEMES.length]!
  const metrics = getMetrics(product.name)

  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-white/12 bg-white/4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
            <span className="text-[11px] font-semibold text-[#86868b] tracking-[0.18em] uppercase">
              Коллекция чехлов
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.05, ease }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4"
          >
            Защита с характером.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12, ease }}
            className="text-[#86868b] text-base sm:text-lg leading-relaxed"
          >
            Премиальные чехлы с MagSafe для всей линейки iPhone.<br className="hidden sm:block" />
            Приходите — подберём идеальный.
          </motion.p>
        </div>

        {/* ── Spatial Showcase ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            data-cursor="view"
            className="relative rounded-[2.5rem] overflow-hidden border border-white/8 mb-6"
            style={{
              background: `linear-gradient(135deg, ${theme.bgFrom} 0%, ${theme.bgTo} 100%)`,
            }}
          >
            {/* Ambient background glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 60% 70% at 20% 50%, ${theme.glowColor} 0%, transparent 60%)`,
              }}
            />
            <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-0 lg:gap-0 min-h-[520px]">

              {/* Left: Product Visual */}
              <div className="flex-1 flex items-center justify-center py-14 lg:py-10 px-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: -30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.7, ease }}
                  className="w-full max-w-[320px]"
                >
                  <ProductVisual theme={theme} />
                </motion.div>
              </div>

              {/* Vertical divider (desktop) */}
              <div className="hidden lg:block w-px self-stretch bg-white/6" />

              {/* Right: Product Details */}
              <div className="flex-1 flex flex-col justify-center px-8 lg:px-12 pb-10 lg:py-12 w-full">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease }}
                  className="space-y-7"
                >
                  {/* Category badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border"
                      style={{ color: theme.accent, borderColor: `${theme.accent}40`, background: `${theme.accent}12` }}
                    >
                      {metrics.material}
                    </span>
                    {product.stockStatus === 'ok' && (
                      <span className="flex items-center gap-1 text-[11px] text-[#30d158]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#30d158] animate-pulse" />
                        В наличии
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-1.5">
                      {product.name}
                    </h3>
                    <p className="text-[#86868b] text-sm">MagSafe · iPhone совместимость</p>
                  </div>

                  {/* Color swatches */}
                  <div className="flex items-center gap-2">
                    {theme.swatches.map((color, i) => (
                      <motion.div
                        key={color}
                        whileHover={{ scale: 1.3 }}
                        className={`w-5 h-5 rounded-full border-2 cursor-pointer transition-all ${
                          i === 0 ? 'border-white/60 scale-110' : 'border-white/15'
                        }`}
                        style={{ background: color }}
                      />
                    ))}
                    <span className="text-[11px] text-[#6e6e73] ml-1">+3 цвета</span>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-3">
                    <MetricBar label="MagSafe совместимость" value={metrics.magsafe} accent={theme.accent} icon={Zap} delay={0.2} />
                    <MetricBar label="Противоударная защита" value={metrics.protection} accent={theme.accent} icon={Shield} delay={0.35} />
                    <MetricBar label="Качество материала" value={metrics.quality} accent={theme.accent} icon={Gem} delay={0.5} />
                  </div>

                  {/* Price + CTA */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                    <div>
                      <div className="text-3xl font-bold text-white">
                        {formatPrice(product.sellingPrice)}
                      </div>
                      <div className="text-xs text-[#6e6e73] mt-0.5">Бронь на 24 часа</div>
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href={`/catalog/${product.id}`}
                        data-cursor="cta"
                        className="px-5 py-2.5 rounded-xl text-sm font-bold text-black transition-all hover:opacity-90 active:scale-95"
                        style={{ background: theme.accent === '#f5f5f7' ? '#fff' : theme.accent }}
                      >
                        Забронировать
                      </Link>
                      <Link
                        href={`/catalog/${product.id}`}
                        className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#86868b] border border-white/12 hover:border-white/25 hover:text-white transition-all flex items-center gap-1"
                      >
                        Детали <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Product Switcher ── */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-start lg:justify-center">
          {products.slice(0, 8).map((p, i) => (
            <ProductThumbMemo
              key={p.id}
              product={p}
              theme={THEMES[i % THEMES.length]!}
              isActive={i === activeIdx}
              index={i}
              onClick={handleSelect}
            />
          ))}
        </div>

        {/* Link to all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mt-8 text-center"
        >
          <Link href="/cases" className="inline-flex items-center gap-1.5 text-sm text-[#0071e3] hover:underline">
            Смотреть все чехлы <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
