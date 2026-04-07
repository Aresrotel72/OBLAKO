export default function ProductLoading() {
  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Хлебные крошки */}
        <div className="flex items-center gap-2 mb-8">
          {[40, 16, 60, 16, 80, 16, 160].map((w, i) =>
            i % 2 === 1 ? (
              <span key={i} className="text-[#6e6e73]">/</span>
            ) : (
              <div key={i} className={`h-4 skeleton rounded`} style={{ width: w }} />
            )
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Вьювер */}
          <div className="aspect-square skeleton rounded-2xl" />

          {/* Инфо */}
          <div className="flex flex-col gap-4">
            <div className="h-6 w-24 skeleton rounded-full" />
            <div className="h-9 w-full skeleton rounded-lg" />
            <div className="h-9 w-3/4 skeleton rounded-lg" />
            <div className="h-4 w-32 skeleton rounded" />
            <div className="h-12 w-48 skeleton rounded-lg" />
            <div className="h-5 w-40 skeleton rounded" />
            <div className="space-y-2 pt-4 border-t border-white/8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 skeleton rounded" style={{ width: `${90 - i * 10}%` }} />
              ))}
            </div>
            <div className="h-14 w-full skeleton rounded-xl mt-2" />
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 skeleton rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
