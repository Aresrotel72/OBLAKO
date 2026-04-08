import Link from 'next/link'
import { getProducts } from '@/lib/ca-api'
import type { CaProduct } from '@/types/product'
import ProductCard from './ProductCard'
import { ArrowRight } from 'lucide-react'
import { ALL_DEMO_PRODUCTS } from '@/lib/demo-products'

export default async function PopularProducts() {
  let products: CaProduct[] = []
  let error = false

  try {
    const res = await getProducts({ limit: 8, inStock: true })
    products = res.data
  } catch {
    error = true
  }

  // Используем демо-товары если API пустой
  if (!error && products.length === 0) {
    products = ALL_DEMO_PRODUCTS.slice(0, 8)
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-foreground mb-2">
              Популярные товары
            </h2>
            <p className="text-foreground-muted">Актуальный остаток — обновляется в реальном времени</p>
          </div>
          <Link
            href="/catalog"
            className="hidden sm:flex items-center gap-1 text-sm text-[#0071e3] hover:underline"
          >
            Все товары <ArrowRight size={14} />
          </Link>
        </div>

        {error && (
          <div className="rounded-2xl border border-border bg-background-card p-8 text-center text-foreground-muted">
            Не удалось загрузить товары. Попробуйте позже.
          </div>
        )}

        {!error && products.length === 0 && (
          <div className="rounded-2xl border border-border bg-background-card p-8 text-center text-foreground-muted">
            Товары в наличии пока отсутствуют.
          </div>
        )}

        {!error && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/catalog"
            className="text-sm text-[#0071e3] hover:underline"
          >
            Смотреть все товары →
          </Link>
        </div>
      </div>
    </section>
  )
}
