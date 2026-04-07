import Link from 'next/link'

export default function ProductNotFound() {
  return (
    <main className="min-h-screen px-4 py-12 flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl mb-6">📦</p>
        <h1 className="text-2xl font-semibold text-white mb-2">Товар не найден</h1>
        <p className="text-[#86868b] mb-8">
          Возможно, он был удалён или артикул изменился
        </p>
        <Link
          href="/catalog"
          className="px-6 py-3 rounded-xl bg-[#8b5cf6] text-white text-sm font-semibold hover:bg-[#8b5cf6]/80 transition-colors"
        >
          В каталог
        </Link>
      </div>
    </main>
  )
}
