import { getProducts } from '@/lib/ca-api'
import ProductCard from '@/components/ui/ProductCard'
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton'
import Pagination from '@/components/catalog/Pagination'

interface CatalogGridProps {
  search?: string
  categoryName?: string
  page?: number
  inStock?: boolean
  limit?: number
}

export default async function CatalogGrid({
  search,
  categoryName,
  page = 1,
  inStock,
  limit = 12,
}: CatalogGridProps) {
  const data = await getProducts({ search, categoryName, page, inStock, limit })

  if (data.data.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-black/4 border border-border flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-foreground-muted">
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M18 18l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="text-foreground-secondary text-base font-medium">Ничего не найдено</p>
        <p className="text-foreground-muted text-sm mt-1">Попробуйте изменить фильтры или запрос</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Количество */}
      <p className="text-sm text-foreground-muted">
        Найдено: <span className="text-foreground">{data.total}</span> товаров
      </p>

      {/* Сетка */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.data.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      {/* Пагинация */}
      {data.totalPages > 1 && (
        <Pagination currentPage={data.page} totalPages={data.totalPages} />
      )}
    </div>
  )
}

export function CatalogGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="space-y-8">
      <div className="h-4 w-40 skeleton rounded" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
