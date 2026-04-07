'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'

const CATEGORIES = ['Все', 'Чехлы', 'Стекла', 'Зарядки', 'Кабели', 'Наушники', 'Аксессуары']

export default function CatalogFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentSearch = searchParams.get('search') || ''
  const currentCategory = searchParams.get('category') || ''
  const currentInStock = searchParams.get('inStock') === 'true'

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

  function handleCategoryClick(category: string) {
    updateURL({ category: category === 'Все' ? null : category })
  }

  function handleInStockToggle() {
    updateURL({ inStock: currentInStock ? null : 'true' })
  }

  return (
    <div className="space-y-3 mb-8">
      {/* Поиск */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6e6e73] pointer-events-none" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Поиск товаров..."
          className="w-full bg-[#161617] border border-white/10 rounded-xl pl-9 pr-9 py-2.5 text-sm text-white placeholder-[#6e6e73] focus:outline-none focus:border-[#8b5cf6] transition-colors"
        />
        {searchValue && (
          <button
            onClick={() => handleSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e6e73] hover:text-white transition-colors"
            aria-label="Очистить поиск"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Категории + фильтр В наличии */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              (cat === 'Все' && !currentCategory) || cat === currentCategory
                ? 'bg-[#8b5cf6] text-white'
                : 'bg-[#161617] border border-white/10 text-[#86868b] hover:border-white/25 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}

        <button
          onClick={handleInStockToggle}
          className={`ml-auto px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
            currentInStock
              ? 'border-[#30d158] bg-[#30d158]/10 text-[#30d158]'
              : 'border-white/10 bg-[#161617] text-[#86868b] hover:border-white/25 hover:text-white'
          }`}
        >
          В наличии
        </button>
      </div>
    </div>
  )
}
