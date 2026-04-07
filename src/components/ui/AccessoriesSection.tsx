'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import AppleProductCard from './AppleProductCard'
import { DEMO_ACCESSORIES } from '@/lib/demo-products'

interface AccessoriesSectionProps {
  title?: string
  subtitle?: string
  categories?: string[]
  className?: string
}

export default function AccessoriesSection({ 
  title = "Sound Essentials", 
  subtitle = "Experience the next level of sound.",
  categories = ["Наушники", "Звук"],
  className 
}: AccessoriesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Filter products by category (demo logic)
  const products = DEMO_ACCESSORIES.filter(p => 
    p.category && (categories.includes(p.category.name) || categories.includes('All'))
  )

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section className={cn("py-24 overflow-hidden", className)}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 mb-12">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-[32px] sm:text-[40px] font-semibold text-[#f5f5f7] tracking-tight leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[17px] sm:text-[19px] text-[#86868b] font-medium max-w-xl">
                {subtitle}
              </p>
            )}
          </div>
          <div className="hidden sm:flex items-center gap-3 mb-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={cn(
                "w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300",
                canScrollLeft ? "bg-white/5 hover:bg-white/10 text-white cursor-pointer" : "text-white/20 cursor-default"
              )}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={cn(
                "w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300",
                canScrollRight ? "bg-white/5 hover:bg-white/10 text-white cursor-pointer" : "text-white/20 cursor-default"
              )}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth px-6 sm:px-12 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product, i) => (
          <AppleProductCard 
            key={product.id} 
            product={product} 
            className="snap-start"
          />
        ))}

        {/* View All Card */}
        <div className="snap-start w-[280px] sm:w-[310px] shrink-0 bg-[#161617] rounded-[28px] p-8 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer hover:bg-[#1d1d1f] transition-all duration-500">
           <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-[#8b5cf6] group-hover:scale-110 transition-transform duration-500">
              <ArrowRight size={24} />
           </div>
           <h3 className="text-[19px] font-semibold text-[#f5f5f7]">Все аксессуары</h3>
           <Link href="/catalog" className="absolute inset-0 z-10" />
        </div>
      </div>
    </section>
  )
}
