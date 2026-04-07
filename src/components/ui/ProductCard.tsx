'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Zap, Sparkles } from 'lucide-react'
import type { CaProduct } from '@/types/product'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: CaProduct
  index?: number
}

const stockConfig: Record<CaProduct['stockStatus'], { label: string; dot: string; text: string }> = {
  ok:  { label: 'В наличии', dot: 'bg-[#30d158]', text: 'text-[#30d158]' },
  low: { label: 'Мало',      dot: 'bg-[#ffd60a]', text: 'text-[#ffd60a]' },
  out: { label: 'Нет',       dot: 'bg-[#6e6e73]', text: 'text-[#6e6e73]' },
}

// Neon glow color cycle
const NEON_COLORS = [
  { glow: 'rgba(139, 92, 246, 0.45)', border: 'rgba(139, 92, 246, 0.5)' },   // violet
  { glow: 'rgba(6, 182, 212, 0.45)',  border: 'rgba(6, 182, 212, 0.5)' },    // cyan
  { glow: 'rgba(244, 63, 94, 0.4)',   border: 'rgba(244, 63, 94, 0.45)' },   // rose
  { glow: 'rgba(34, 197, 94, 0.4)',   border: 'rgba(34, 197, 94, 0.45)' },   // green
  { glow: 'rgba(59, 130, 246, 0.45)', border: 'rgba(59, 130, 246, 0.5)' },   // blue
  { glow: 'rgba(245, 158, 11, 0.4)',  border: 'rgba(245, 158, 11, 0.45)' },  // amber
]

// Feature annotations — появляются при hover (как lovi.care / augen.pro)
function getFeatures(name: string): { label: string; value: string; icon: React.ElementType; position: string }[] {
  const n = name.toLowerCase()
  if (/кожан|leather/.test(n)) return [
    { label: 'Материал', value: 'Натуральная кожа', icon: Sparkles, position: '-top-2 -right-2' },
    { label: 'MagSafe', value: 'Встроен', icon: Zap, position: '-bottom-2 -left-2' },
  ]
  if (/силик|silic/.test(n)) return [
    { label: 'Защита', value: 'Ударопрочный', icon: Shield, position: '-top-2 -right-2' },
    { label: 'MagSafe', value: 'Встроен', icon: Zap, position: '-bottom-2 -left-2' },
  ]
  if (/прозрач|clear|ultra/.test(n)) return [
    { label: 'Дизайн', value: 'Прозрачный', icon: Sparkles, position: '-top-2 -right-2' },
    { label: 'Защита', value: 'Антишок', icon: Shield, position: '-bottom-2 -left-2' },
  ]
  return [
    { label: 'Качество', value: 'Премиум', icon: Sparkles, position: '-top-2 -right-2' },
    { label: 'MagSafe', value: 'Совместим', icon: Zap, position: '-bottom-2 -left-2' },
  ]
}

const ease = [0.16, 1, 0.3, 1] as const

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const stock = stockConfig[product.stockStatus]
  const [isHovered, setIsHovered] = useState(false)
  const features = getFeatures(product.name)
  const neonIdx = useRef(0)
  const [neon, setNeon] = useState(NEON_COLORS[0]!)

  const handleHoverStart = useCallback(() => {
    neonIdx.current = (neonIdx.current + 1) % NEON_COLORS.length
    setNeon(NEON_COLORS[neonIdx.current]!)
    setIsHovered(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.07, ease }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={() => setIsHovered(false)}
      data-cursor="card"
      className="group relative bg-[#0a0a0a] border border-white/8 rounded-3xl overflow-visible cursor-pointer flex flex-col"
      style={{
        willChange: 'transform',
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
        boxShadow: isHovered
          ? `0 0 20px ${neon.glow}, 0 0 60px ${neon.glow}, inset 0 0 20px rgba(255,255,255,0.02)`
          : '0 0 0 transparent',
        borderColor: isHovered ? neon.border : 'rgba(255,255,255,0.08)',
      }}
    >
      {/* ── Neon glow backdrop ── */}
      <div
        className="absolute -inset-px rounded-3xl pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${neon.glow} 0%, transparent 70%)`,
        }}
      />

      {/* ── Floating feature annotations (augen.pro style) ── */}
      <AnimatePresence>
        {isHovered && features.map((feat, i) => (
          <motion.div
            key={feat.label}
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ duration: 0.3, delay: i * 0.08, ease }}
            className={`absolute z-20 ${feat.position}`}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg shadow-black/20">
              <feat.icon size={12} className="text-[#8b5cf6]" />
              <div className="flex flex-col">
                <span className="text-[8px] font-medium text-[#6e6e73] uppercase tracking-wider leading-none">{feat.label}</span>
                <span className="text-[11px] font-bold text-black leading-tight">{feat.value}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Link href={`/catalog/${product.id}`} className="flex flex-col flex-1 overflow-hidden rounded-3xl relative z-10">

        {/* Бейдж наличия */}
        {product.stockStatus !== 'ok' && (
          <div className={`absolute top-4 right-4 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold
            ${product.stockStatus === 'low' ? 'bg-[#ffd60a]/15 text-[#ffd60a]' : 'bg-white/8 text-[#6e6e73]'}`}>
            <span className={`w-1 h-1 rounded-full ${stock.dot}`} />
            {stock.label}
          </div>
        )}

        {/* Изображение / Placeholder */}
        <div className="relative aspect-square bg-[#111] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 dot-grid opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Connection lines to annotations (visible on hover) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <line x1="75%" y1="20%" x2="95%" y2="5%" stroke="rgba(0,113,227,0.3)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="25%" y1="80%" x2="5%" y2="95%" stroke="rgba(0,113,227,0.3)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="75%" cy="20%" r="3" fill="rgba(0,113,227,0.5)" />
            <circle cx="25%" cy="80%" r="3" fill="rgba(0,113,227,0.5)" />
          </svg>

          <div className="relative z-10 flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-500">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#3a3a3c]">
                <rect x="8" y="4" width="16" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="11" y="7" width="10" height="12" rx="1.5" fill="currentColor" opacity="0.3"/>
                <circle cx="16" cy="23" r="1.5" fill="currentColor" opacity="0.5"/>
              </svg>
            </div>
            {product.category && (
              <span className="text-[10px] font-medium text-[#3a3a3c] uppercase tracking-widest">
                {product.category.name}
              </span>
            )}
          </div>
        </div>

        {/* Контент */}
        <div className="flex flex-col p-5 gap-3 flex-1">
          <h3 className="text-base font-bold text-white leading-snug line-clamp-2 group-hover:text-white/90 transition-colors">
            {product.name}
          </h3>

          <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/6">
            <span className="text-lg font-bold text-white">
              {formatPrice(product.sellingPrice)}
            </span>

            {product.stockStatus === 'ok' && (
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#30d158]" />
                <span className="text-xs text-[#30d158]">{stock.label}</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Кнопка «Бронь» появляется при hover — как в референсе */}
      {product.stockStatus !== 'out' && (
        <div className="relative z-10 px-5 pb-5 -mt-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Link
            href={`/catalog/${product.id}`}
            data-magnetic
            className="block w-full text-center text-xs font-bold bg-white text-black px-4 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            Подробнее →
          </Link>
        </div>
      )}
    </motion.div>
  )
}
