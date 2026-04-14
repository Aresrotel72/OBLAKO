import Link from 'next/link'
import type { CaProduct } from '@/types/product'
import ProductCard from './ProductCard'
import { ArrowRight } from 'lucide-react'
import { ALL_DEMO_PRODUCTS } from '@/lib/demo-products'
import SectionHeader from './SectionHeader'

async function fetchProducts(): Promise<CaProduct[]> {
  try {
    const { getProducts } = await import('@/lib/ca-api')
    const res = await getProducts({ limit: 8, inStock: true })
    const data = Array.isArray(res?.data) ? res.data : []
    return data.length > 0 ? data : ALL_DEMO_PRODUCTS.slice(0, 8)
  } catch {
    return ALL_DEMO_PRODUCTS.slice(0, 8)
  }
}

export default async function PopularProducts() {
  const products = await fetchProducts()

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Каталог · Всегда в наличии"
          title="Популярные товары"
          subtitle="Актуальный остаток — обновляется в реальном времени."
          align="left"
          shopAllHref="/catalog"
          shopAllLabel="Весь каталог"
          className="mb-10"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/catalog" className="link-apple text-sm">
            Смотреть все товары <ArrowRight size={13} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}
