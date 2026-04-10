'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Zap, Sparkles, Hand } from 'lucide-react'
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
  if (/кожан|leather|techwoven/.test(n)) return [
    { label: 'Покрытие', value: 'Приятный на ощупь слой', icon: Hand, position: '-top-3 -right-3' },
    { label: 'MagSafe', value: 'Мгновенная зарядка', icon: Zap, position: '-bottom-3 -left-3' },
  ]
  if (/силик|silic/.test(n)) return [
    { label: 'Углы', value: 'Усиленная защита углов', icon: Shield, position: '-top-3 -right-3' },
    { label: 'Покрытие', value: 'Приятный на ощупь слой', icon: Hand, position: '-bottom-3 -left-3' },
  ]
  if (/прозрач|clear|ultra/.test(n)) return [
    { label: 'Дизайн', value: 'Видна красота iPhone', icon: Sparkles, position: '-top-3 -right-3' },
    { label: 'Защита', value: 'Усиленные углы', icon: Shield, position: '-bottom-3 -left-3' },
  ]
  if (/flex|ударо|armor/.test(n)) return [
    { label: 'Падение', value: 'Защита при падении 3м', icon: Shield, position: '-top-3 -right-3' },
    { label: 'Углы', value: 'Амортизация ударов', icon: Zap, position: '-bottom-3 -left-3' },
  ]
  return [
    { label: 'Качество', value: 'Премиум-материалы', icon: Sparkles, position: '-top-3 -right-3' },
    { label: 'MagSafe', value: 'Полная совместимость', icon: Zap, position: '-bottom-3 -left-3' },
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
        <div className="relative aspect-square bg-gradient-to-b from-[#f5f5f7] to-[#ececee] overflow-hidden flex items-center justify-center">
          {/* Connection lines to annotations (visible on hover) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <line x1="72%" y1="18%" x2="96%" y2="2%" stroke="rgba(0,113,227,0.4)" strokeWidth="1.5" strokeDasharray="4 3">
              <animate attributeName="stroke-dashoffset" from="14" to="0" dur="0.8s" fill="freeze" />
            </line>
            <line x1="28%" y1="82%" x2="4%" y2="98%" stroke="rgba(0,113,227,0.4)" strokeWidth="1.5" strokeDasharray="4 3">
              <animate attributeName="stroke-dashoffset" from="14" to="0" dur="0.8s" fill="freeze" />
            </line>
            <circle cx="72%" cy="18%" r="3.5" fill="rgba(0,113,227,0.5)">
              <animate attributeName="r" from="0" to="3.5" dur="0.4s" fill="freeze" />
            </circle>
            <circle cx="28%" cy="82%" r="3.5" fill="rgba(0,113,227,0.5)">
              <animate attributeName="r" from="0" to="3.5" dur="0.4s" fill="freeze" />
            </circle>
            {/* Arrowheads */}
            <polygon points="96,2 90,6 92,0" fill="rgba(0,113,227,0.5)" className="opacity-0 group-hover:opacity-100 transition-opacity delay-300" />
            <polygon points="4,98 10,94 8,100" fill="rgba(0,113,227,0.5)" className="opacity-0 group-hover:opacity-100 transition-opacity delay-300" />
          </svg>

          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-3 group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
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
          )}
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
