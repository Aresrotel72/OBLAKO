'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', String(page))
    }
    router.push(`${pathname}?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Показываем не более 5 страниц вокруг текущей
  const pages: (number | null)[] = []
  const delta = 2
  const left = currentPage - delta
  const right = currentPage + delta

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= left && i <= right)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== null) {
      pages.push(null) // разрыв
    }
  }

  return (
    <div className="flex items-center justify-center gap-1.5">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-[#161617] border border-white/10 text-[#86868b] hover:text-white hover:border-white/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Предыдущая страница"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page, i) =>
        page === null ? (
          <span key={`gap-${i}`} className="px-2 text-[#6e6e73] text-sm">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all ${
              page === currentPage
                ? 'bg-[#8b5cf6] text-white'
                : 'bg-[#161617] border border-white/10 text-[#86868b] hover:border-white/25 hover:text-white'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-[#161617] border border-white/10 text-[#86868b] hover:text-white hover:border-white/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Следующая страница"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
