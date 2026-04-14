import { Suspense } from 'react'
import Hero from '@/components/ui/Hero'
import CategoryGrid from '@/components/ui/CategoryGrid'
import CasesShowcase from '@/components/ui/CasesShowcase'
import ModelSelector from '@/components/cases/ModelSelector'
import Features from '@/components/ui/Features'
import StoreSection from '@/components/ui/StoreSection'
import PopularProducts from '@/components/ui/PopularProducts'
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton'
import ScrollReveal from '@/components/ui/ScrollReveal'

function ProductsSkeleton() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="h-9 w-64 skeleton rounded-lg mb-2" />
          <div className="h-5 w-80 skeleton rounded-lg" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <Suspense fallback={<ProductsSkeleton />}>
        <CasesShowcase />
      </Suspense>
      <Suspense fallback={<ProductsSkeleton />}>
        <PopularProducts />
      </Suspense>
      <ScrollReveal>
        <ModelSelector />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <Features />
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <StoreSection />
      </ScrollReveal>
    </>
  )
}
