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
        className="p-2 rounded-lg bg-background-card border border-border text-foreground-secondary hover:text-foreground hover:border-[#0071e3]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
        aria-label="Предыдущая страница"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page, i) =>
        page === null ? (
          <span key={`gap-${i}`} className="px-2 text-foreground-muted text-sm">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all ${
              page === currentPage
                ? 'bg-[#0071e3] text-white'
                : 'bg-background-card border border-border text-foreground-secondary hover:border-[#0071e3]/30 hover:text-foreground'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-background-card border border-border text-foreground-secondary hover:text-foreground hover:border-[#0071e3]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
        aria-label="Следующая страница"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
