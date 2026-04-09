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

// Feature annotations — появляются при hover
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

  const handleHoverStart = useCallback(() => {
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
      className="group relative bg-background-card border border-border rounded-3xl overflow-visible cursor-pointer flex flex-col shadow-sm"
      style={{
        willChange: 'transform',
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
        boxShadow: isHovered
          ? '0 12px 48px rgba(0,113,227,0.12), 0 2px 16px rgba(0,0,0,0.06)'
          : '0 1px 3px rgba(0,0,0,0.04)',
        borderColor: isHovered ? 'rgba(0,113,227,0.25)' : undefined,
      }}
    >
      {/* ── Floating feature annotations ── */}
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
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg shadow-black/10 border border-black/5">
              <feat.icon size={12} className="text-[#0071e3]" />
              <div className="flex flex-col">
                <span className="text-[8px] font-medium text-foreground-muted uppercase tracking-wider leading-none">{feat.label}</span>
                <span className="text-[11px] font-bold text-foreground leading-tight">{feat.value}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Link href={`/catalog/${product.id}`} className="flex flex-col flex-1 overflow-hidden rounded-3xl relative z-10">

        {/* Бейдж наличия */}
        {product.stockStatus !== 'ok' && (
          <div className={`absolute top-4 right-4 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold
            ${product.stockStatus === 'low' ? 'bg-[#ffd60a]/15 text-[#ffd60a]' : 'bg-black/5 text-[#6e6e73]'}`}>
            <span className={`w-1 h-1 rounded-full ${stock.dot}`} />
            {stock.label}
          </div>
        )}

        {/* Изображение / Placeholder */}
        <div className="relative aspect-square bg-background-secondary overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 dot-grid opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Connection lines to annotations (visible on hover) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <line x1="75%" y1="20%" x2="95%" y2="5%" stroke="rgba(0,113,227,0.25)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="25%" y1="80%" x2="5%" y2="95%" stroke="rgba(0,113,227,0.25)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="75%" cy="20%" r="3" fill="rgba(0,113,227,0.4)" />
            <circle cx="25%" cy="80%" r="3" fill="rgba(0,113,227,0.4)" />
          </svg>

          <div className="relative z-10 flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-500">
            <div className="w-16 h-16 rounded-2xl bg-black/5 border border-black/8 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-foreground-muted">
                <rect x="8" y="4" width="16" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="11" y="7" width="10" height="12" rx="1.5" fill="currentColor" opacity="0.3"/>
                <circle cx="16" cy="23" r="1.5" fill="currentColor" opacity="0.5"/>
              </svg>
            </div>
            {product.category && (
              <span className="text-[10px] font-medium text-foreground-muted uppercase tracking-widest">
                {product.category.name}
              </span>
            )}
          </div>
        </div>

        {/* Контент — Apple product card style */}
        <div className="flex flex-col px-4 pb-4 pt-3 gap-1.5 flex-1">
          <h3 className="text-product-name line-clamp-2 group-hover:text-foreground-secondary transition-colors duration-200">
            {product.name}
          </h3>

          <div className="flex items-center justify-between mt-0.5">
            <span className="text-price">
              {formatPrice(product.sellingPrice)}
            </span>

            {product.stockStatus === 'ok' && (
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#30d158]" />
                <span className="text-[11px] text-[#30d158]">{stock.label}</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Кнопка «Подробнее» появляется при hover */}
      {product.stockStatus !== 'out' && (
        <div className="relative z-10 px-4 pb-4 -mt-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Link
            href={`/catalog/${product.id}`}
            className="block w-full text-center text-[12px] font-semibold bg-[#0071e3] text-white px-4 py-2 rounded-full hover:bg-[#0077ed] transition-colors"
          >
            Забронировать
          </Link>
        </div>
      )}
    </motion.div>
  )
}
