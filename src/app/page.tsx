import { Suspense } from 'react'
import Hero from '@/components/ui/Hero'
import ScrollStory from '@/components/ui/ScrollStory'
import CasesShowcase from '@/components/ui/CasesShowcase'
import ModelSelector from '@/components/cases/ModelSelector'
import Features from '@/components/ui/Features'
import StoreSection from '@/components/ui/StoreSection'
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton'

function ShowcaseSkeleton() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* ① Hero — чистый белый */}
      <div className="bg-section-white">
        <Hero />
      </div>

      {/* ② ScrollStory — scroll-анимация */}
      <ScrollStory />

      {/* Bridge: white → warm */}
      <div className="section-bridge from-section-white to-section-warm" />

      {/* ③ Витрина чехлов — тёплый молочный */}
      <div className="bg-section-warm">
        <Suspense fallback={<ShowcaseSkeleton />}>
          <CasesShowcase />
        </Suspense>
      </div>

      {/* Bridge: warm → cream */}
      <div className="section-bridge from-section-warm to-section-cream" />

      {/* ④ Выбор по модели — крем */}
      <div className="bg-section-cream">
        <ModelSelector />
      </div>

      {/* ⑤ Преимущества — крем (без разрыва) */}
      <div className="bg-section-cream">
        <Features />
      </div>

      {/* Bridge: cream → white */}
      <div className="section-bridge from-section-cream to-section-white" />

      {/* ⑥ Магазин — белый */}
      <div className="bg-section-white">
        <StoreSection />
      </div>
    </div>
  )
}
