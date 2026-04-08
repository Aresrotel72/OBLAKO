'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { CaProduct } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface AppleProductCardProps {
  product: CaProduct
  className?: string
}

export default function AppleProductCard({ product, className }: AppleProductCardProps) {
  const [activeColor, setActiveColor] = useState<string | null>(null)
  const isNew = product.id.includes('101') || product.id.includes('103') // Demo logic for "New"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group relative flex flex-col bg-background-card border border-border rounded-[28px] overflow-hidden transition-all duration-500 hover:border-[#0071e3]/20 hover:shadow-lg hover:shadow-black/5 w-[280px] sm:w-[310px] shrink-0",
        className
      )}
    >
      <Link href={`/catalog/${product.id}`} className="flex flex-col h-full p-6 sm:p-8">

        {/* Image Section */}
        <div className="relative aspect-[4/5] mb-8 bg-background-secondary rounded-2xl overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] to-transparent" />

          {/* Label / Violator */}
          <div className="absolute top-4 left-0 right-0 px-4 flex justify-between items-start pointer-events-none">
            {isNew && (
              <span className="text-[10px] font-bold text-white bg-[#ff3b30] px-2 py-0.5 rounded-full tracking-wide uppercase">
                New
              </span>
            )}
            {product.id === 'd-101' && (
              <span className="text-[10px] font-bold text-[#0071e3] tracking-wide uppercase bg-[#0071e3]/10 px-2 py-0.5 rounded-full">
                Free Engraving
              </span>
            )}
          </div>

          {/* Placeholder for Product Image */}
          <div className="relative z-10 transition-transform duration-700 group-hover:scale-110">
             <div className="w-40 h-40 flex items-center justify-center text-black/10 group-hover:text-black/20 transition-colors">
                {product.category?.name === 'Наушники' ? (
                   <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
                ) : (
                   <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                )}
             </div>
          </div>
        </div>

        {/* Color Swatches */}
        {activeColor && (
          <div className="flex gap-2 mb-6">
            <div
              className="w-3.5 h-3.5 rounded-full border border-black/15 ring-2 ring-[#0071e3] ring-offset-2 ring-offset-background-card"
              style={{ backgroundColor: activeColor }}
            />
          </div>
        )}

        {/* Info Section */}
        <div className="mt-auto">
          <h3 className="text-[17px] sm:text-[19px] font-semibold text-foreground leading-tight mb-2 group-hover:text-[#0071e3] transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-[14px] text-foreground-muted font-medium">
            {formatPrice(product.sellingPrice)}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
