import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProduct } from '@/lib/ca-api'
import { formatPrice } from '@/lib/utils'
import ProductViewer3DWrapper from '@/components/product/ProductViewer3DWrapper'
import ReservationButton from '@/components/product/ReservationButton'
import CatalogGrid, { CatalogGridSkeleton } from '@/components/catalog/CatalogGrid'
import { Suspense } from 'react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  try {
    const product = await getProduct(id)
    return {
      title: `${product.name} — OBLAKO`,
      description: product.description || `${product.name} — мобильные аксессуары в Минске`,
    }
  } catch {
    return { title: 'Товар не найден — OBLAKO' }
  }
}

const stockConfig = {
  ok:  { text: 'В наличии',     dot: 'bg-[#30d158]', color: 'text-[#30d158]' },
  low: { text: 'Мало осталось', dot: 'bg-[#ffd60a]', color: 'text-[#ffd60a]' },
  out: { text: 'Нет в наличии', dot: 'bg-[#6e6e73]', color: 'text-[#6e6e73]' },
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let product
  try {
    product = await getProduct(id)
  } catch {
    notFound()
  }

  const stock = stockConfig[product.stockStatus]

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Хлебные крошки */}
        <nav className="flex items-center gap-2 text-sm text-[#6e6e73] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Главная</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-white transition-colors">Каталог</Link>
          {product.category && (
            <>
              <span>/</span>
              <Link
                href={`/catalog?category=${encodeURIComponent(product.category.name)}`}
                className="hover:text-white transition-colors"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-white line-clamp-1 max-w-[200px]">{product.name}</span>
        </nav>

        {/* Основной блок */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">

          {/* ─── Левая колонка: 360° вьювер ─── */}
          <div>
            <ProductViewer3DWrapper productName={product.name} />
          </div>

          {/* ─── Правая колонка: инфо ─── */}
          <div className="flex flex-col gap-5">
            {/* Категория */}
            {product.category && (
              <Link
                href={`/catalog?category=${encodeURIComponent(product.category.name)}`}
                className="inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 text-[#8b5cf6] hover:bg-[#8b5cf6]/25 transition-colors"
              >
                {product.category.name}
              </Link>
            )}

            {/* Название */}
            <h1 className="text-2xl sm:text-3xl font-semibold text-white leading-snug">
              {product.name}
            </h1>

            {/* Артикул */}
            {product.article && (
              <p className="text-sm text-[#6e6e73]">
                Артикул: <span className="text-[#86868b] font-mono">{product.article}</span>
              </p>
            )}

            {/* Цена */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-white">
                {formatPrice(product.sellingPrice)}
              </span>
            </div>

            {/* Статус наличия */}
            <div className="flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${stock.dot}`} />
              <span className={`text-sm font-medium ${stock.color}`}>{stock.text}</span>
              {product.stockStatus !== 'out' && (
                <span className="text-sm text-[#6e6e73]">
                  · {product.quantity} {product.unit}
                </span>
              )}
            </div>

            {/* Описание */}
            {product.description && (
              <p className="text-sm text-[#86868b] leading-relaxed border-t border-white/8 pt-4">
                {product.description}
              </p>
            )}

            {/* CTA */}
            <div className="flex flex-col gap-3 mt-2">
              {product.stockStatus !== 'out' ? (
                <ReservationButton
                  product={{
                    id: product.id,
                    name: product.name,
                    sellingPrice: product.sellingPrice,
                    quantity: product.quantity,
                    unit: product.unit,
                  }}
                  productPagePath={`/catalog/${id}`}
                />
              ) : (
                <button
                  disabled
                  className="w-full py-3.5 rounded-xl bg-[#1c1c1e] border border-white/10 text-[#6e6e73] text-sm font-semibold cursor-not-allowed select-none"
                >
                  Нет в наличии
                </button>
              )}
              <p className="text-xs text-center text-[#6e6e73]">
                Бронирование · самовывоз из магазина
              </p>
            </div>

            {/* Инфо-блок */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { label: 'Доставка', value: 'Самовывоз' },
                { label: 'Оплата', value: 'Наличные / карта' },
                { label: 'Гарантия', value: '14 дней' },
                { label: 'Возврат', value: 'По закону' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col gap-0.5 p-3 rounded-xl bg-[#161617] border border-white/8"
                >
                  <span className="text-[10px] text-[#6e6e73] uppercase tracking-wide">{label}</span>
                  <span className="text-sm text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Похожие товары */}
        {product.category && (
          <section>
            <h2 className="text-xl font-semibold text-white mb-6">
              Ещё из категории «{product.category.name}»
            </h2>
            <Suspense fallback={<CatalogGridSkeleton count={4} />}>
              <CatalogGrid
                categoryName={product.category.name}
                limit={4}
              />
            </Suspense>
          </section>
        )}
      </div>
    </main>
  )
}
