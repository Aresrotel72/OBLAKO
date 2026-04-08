import Link from 'next/link'

export default function ProductNotFound() {
  return (
    <main className="min-h-screen px-4 py-12 flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl mb-6">📦</p>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Товар не найден</h1>
        <p className="text-foreground-muted mb-8">
          Возможно, он был удалён или артикул изменился
        </p>
        <Link
          href="/catalog"
          className="px-6 py-3 rounded-xl bg-[#0071e3] text-white text-sm font-semibold hover:bg-[#0077ed] transition-colors"
        >
          В каталог
        </Link>
      </div>
    </main>
  )
}
