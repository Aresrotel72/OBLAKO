'use client'

import { use, useRef, useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { Search, X, ChevronDown } from 'lucide-react'
import CatalogGrid, { CatalogGridSkeleton } from '@/components/catalog/CatalogGrid'

// Плоский список всех моделей для поиска метки по id
const ALL_MODELS = [
  { id: 'iphone-17-pro-max', label: 'iPhone 17 Pro Max' },
  { id: 'iphone-17-pro',     label: 'iPhone 17 Pro' },
  { id: 'iphone-17-air',     label: 'iPhone 17 Air' },
  { id: 'iphone-17',         label: 'iPhone 17' },
  { id: 'iphone-16-pro-max', label: 'iPhone 16 Pro Max' },
  { id: 'iphone-16-pro',     label: 'iPhone 16 Pro' },
  { id: 'iphone-16-plus',    label: 'iPhone 16 Plus' },
  { id: 'iphone-16',         label: 'iPhone 16' },
  { id: 'iphone-15-pro-max', label: 'iPhone 15 Pro Max' },
  { id: 'iphone-15-pro',     label: 'iPhone 15 Pro' },
  { id: 'iphone-15-plus',    label: 'iPhone 15 Plus' },
  { id: 'iphone-15',         label: 'iPhone 15' },
  { id: 'iphone-14-pro-max', label: 'iPhone 14 Pro Max' },
  { id: 'iphone-14-pro',     label: 'iPhone 14 Pro' },
  { id: 'iphone-14',         label: 'iPhone 14' },
  { id: 'iphone-13-pro-max', label: 'iPhone 13 Pro Max' },
  { id: 'iphone-13-pro',     label: 'iPhone 13 Pro' },
  { id: 'iphone-13',         label: 'iPhone 13' },
  { id: 'iphone-12',         label: 'iPhone 12' },
]

function modelSlugToLabel(slug: string): string {
  return ALL_MODELS.find((m) => m.id === slug)?.label ?? slug.replace(/-/g, ' ')
}

// ─── Фильтры для /cases ─────────────────────────────────────────────────────

function CasesFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentModel = searchParams.get('model') || ''
  const currentSearch = searchParams.get('search') || ''
  const currentInStock = searchParams.get('inStock') === 'true'
  const [showModels, setShowModels] = useState(false)
  const [searchValue, setSearchValue] = useState(currentSearch)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setSearchValue(currentSearch)
  }, [currentSearch])

  function updateURL(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === '') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    }
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`)
  }

  function handleSearchChange(value: string) {
    setSearchValue(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      updateURL({ search: value || null })
    }, 400)
  }

  return (
    <div className="space-y-3 mb-8">
      {/* Выбранная модель */}
      {currentModel && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground-muted">Модель:</span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/30 text-[#0071e3] text-sm font-medium">
            {modelSlugToLabel(currentModel)}
            <button
              onClick={() => updateURL({ model: null })}
              className="hover:text-foreground transition-colors"
              aria-label="Сбросить модель"
            >
              <X size={12} />
            </button>
          </span>
        </div>
      )}

      {/* Кнопка выбора модели */}
      <div className="relative">
        <button
          onClick={() => setShowModels((v) => !v)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background-card border border-border text-sm text-foreground-secondary hover:border-[#0071e3]/30 hover:text-foreground transition-all"
        >
          <span>{currentModel ? 'Изменить модель' : 'Выбрать модель'}</span>
          <ChevronDown
            size={14}
            className={`transition-transform ${showModels ? 'rotate-180' : ''}`}
          />
        </button>

        {showModels && (
          <div className="absolute top-10 left-0 z-20 w-64 bg-background-card border border-border rounded-2xl p-3 shadow-2xl">
            <div className="flex flex-wrap gap-2">
              {ALL_MODELS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => {
                    updateURL({ model: id })
                    setShowModels(false)
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    id === currentModel
                      ? 'bg-[#0071e3] text-white'
                      : 'bg-background-secondary text-foreground-secondary hover:text-foreground hover:bg-background-elevated'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Поиск + В наличии */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Поиск чехлов..."
            className="w-full bg-background-card border border-border rounded-xl pl-9 pr-9 py-2.5 text-sm text-foreground placeholder-foreground-muted focus:outline-none focus:border-[#0071e3]/50 transition-colors shadow-sm"
          />
          {searchValue && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <button
          onClick={() => updateURL({ inStock: currentInStock ? null : 'true' })}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all border whitespace-nowrap ${
            currentInStock
              ? 'border-[#30d158] bg-[#30d158]/10 text-[#30d158]'
              : 'border-border bg-background-card text-foreground-secondary hover:border-[#0071e3]/30 hover:text-foreground'
          }`}
        >
          В наличии
        </button>
      </div>
    </div>
  )
}

// ─── Страница /cases ─────────────────────────────────────────────────────────

export default function CasesPage({
  searchParams,
}: {
  searchParams: Promise<{ model?: string; search?: string; page?: string; inStock?: string }>
}) {
  const sp = use(searchParams)
  const model = sp.model?.trim() || undefined
  const search = sp.search?.trim() || undefined
  const page = Math.max(1, parseInt(sp.page || '1') || 1)
  const inStock = sp.inStock === 'true' ? true : undefined

  // Объединяем модель и поиск для передачи в API
  const combinedSearch = [model ? modelSlugToLabel(model) : '', search ?? '']
    .filter(Boolean)
    .join(' ') || undefined

  const title = model ? `Чехлы для ${modelSlugToLabel(model)}` : 'Чехлы для iPhone'
  const gridKey = `${model}-${search}-${page}-${inStock}`

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Хлебные крошки */}
        <div className="flex items-center gap-2 text-sm text-foreground-muted mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            Главная
          </Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-foreground transition-colors">
            Каталог
          </Link>
          <span>/</span>
          <span className="text-foreground">Чехлы</span>
        </div>

        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mb-2">{title}</h1>
          <p className="text-foreground-muted">
            {model
              ? `Чехлы, совместимые с ${modelSlugToLabel(model)}`
              : 'Выберите модель iPhone, чтобы найти подходящий чехол'}
          </p>
        </div>

        {/* Фильтры */}
        <CasesFilters />

        {/* Сетка */}
        <Suspense key={gridKey} fallback={<CatalogGridSkeleton />}>
          <CatalogGrid
            search={combinedSearch}
            categoryName="Чехлы"
            page={page}
            inStock={inStock}
            limit={12}
          />
        </Suspense>
      </div>
    </main>
  )
}
