import { Suspense } from 'react'
import CatalogFilters from '@/components/catalog/CatalogFilters'
import CatalogGrid, { CatalogGridSkeleton } from '@/components/catalog/CatalogGrid'

export const metadata = {
  title: 'Каталог — OBLAKO',
  description: 'Мобильные аксессуары: чехлы, стекла, зарядки и кабели для iPhone',
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; page?: string; inStock?: string }>
}) {
  const sp = await searchParams
  const page = Math.max(1, parseInt(sp.page || '1') || 1)
  const search = sp.search?.trim() || undefined
  const categoryName = sp.category?.trim() || undefined
  const inStock = sp.inStock === 'true' ? true : undefined

  const gridKey = `${search}-${categoryName}-${page}-${inStock}`

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-2">
            Каталог
          </h1>
          <p className="text-[#86868b]">
            Мобильные аксессуары: чехлы, стекла, зарядки и многое другое
          </p>
        </div>

        {/* Фильтры (client) */}
        <CatalogFilters />

        {/* Сетка товаров */}
        <Suspense key={gridKey} fallback={<CatalogGridSkeleton />}>
          <CatalogGrid
            search={search}
            categoryName={categoryName}
            page={page}
            inStock={inStock}
            limit={12}
          />
        </Suspense>
      </div>
    </main>
  )
}
