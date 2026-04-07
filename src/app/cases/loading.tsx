import { CatalogGridSkeleton } from '@/components/catalog/CatalogGrid'

export default function CasesLoading() {
  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-2 mb-6">
          <div className="h-4 w-12 skeleton rounded" />
          <div className="h-4 w-2 skeleton rounded" />
          <div className="h-4 w-16 skeleton rounded" />
          <div className="h-4 w-2 skeleton rounded" />
          <div className="h-4 w-14 skeleton rounded" />
        </div>
        <div className="mb-8">
          <div className="h-10 w-64 skeleton rounded-lg mb-2" />
          <div className="h-5 w-80 skeleton rounded-lg" />
        </div>
        <div className="space-y-3 mb-8">
          <div className="h-7 w-40 skeleton rounded-full" />
          <div className="h-9 w-44 skeleton rounded-xl" />
          <div className="h-11 w-full skeleton rounded-xl" />
        </div>
        <CatalogGridSkeleton />
      </div>
    </main>
  )
}
