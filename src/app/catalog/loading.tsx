import { CatalogGridSkeleton } from '@/components/catalog/CatalogGrid'

export default function CatalogLoading() {
  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="h-10 w-40 skeleton rounded-lg mb-2" />
          <div className="h-5 w-80 skeleton rounded-lg" />
        </div>
        {/* Фильтры */}
        <div className="space-y-3 mb-8">
          <div className="h-11 w-full skeleton rounded-xl" />
          <div className="flex gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-7 w-20 skeleton rounded-full" />
            ))}
          </div>
        </div>
        <CatalogGridSkeleton />
      </div>
    </main>
  )
}
