'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

const MODEL_GROUPS = [
  {
    series: 'iPhone 17',
    badge: 'NEW',
    models: [
      { id: 'iphone-17-pro-max', label: 'iPhone 17 Pro Max' },
      { id: 'iphone-17-pro',     label: 'iPhone 17 Pro' },
      { id: 'iphone-17-air',     label: 'iPhone 17 Air' },
      { id: 'iphone-17',         label: 'iPhone 17' },
    ],
  },
  {
    series: 'iPhone 16',
    models: [
      { id: 'iphone-16-pro-max', label: 'iPhone 16 Pro Max' },
      { id: 'iphone-16-pro',     label: 'iPhone 16 Pro' },
      { id: 'iphone-16-plus',    label: 'iPhone 16 Plus' },
      { id: 'iphone-16',         label: 'iPhone 16' },
    ],
  },
  {
    series: 'iPhone 15',
    models: [
      { id: 'iphone-15-pro-max', label: 'iPhone 15 Pro Max' },
      { id: 'iphone-15-pro',     label: 'iPhone 15 Pro' },
      { id: 'iphone-15-plus',    label: 'iPhone 15 Plus' },
      { id: 'iphone-15',         label: 'iPhone 15' },
    ],
  },
  {
    series: 'iPhone 14',
    models: [
      { id: 'iphone-14-pro-max', label: 'iPhone 14 Pro Max' },
      { id: 'iphone-14-pro',     label: 'iPhone 14 Pro' },
      { id: 'iphone-14',         label: 'iPhone 14' },
    ],
  },
  {
    series: 'Старше',
    models: [
      { id: 'iphone-13-pro-max', label: 'iPhone 13 Pro Max' },
      { id: 'iphone-13-pro',     label: 'iPhone 13 Pro' },
      { id: 'iphone-13',         label: 'iPhone 13' },
      { id: 'iphone-12',         label: 'iPhone 12' },
    ],
  },
]

export default function ModelSelector() {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)

  function handleSelect(id: string) {
    setSelected(id)
    router.push(`/cases?model=${id}`)
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-foreground mb-3">
            Выбери свою модель
          </h2>
          <p className="text-foreground-muted">
            Показываем только чехлы, которые подходят именно к твоему iPhone
          </p>
        </div>

        {/* Группы моделей */}
        <div className="space-y-8">
          {MODEL_GROUPS.map((group) => (
            <div key={group.series}>
              <div className="flex items-center gap-2 mb-3 px-1">
                <p className="text-xs font-medium text-foreground-muted uppercase tracking-widest">
                  {group.series}
                </p>
                {'badge' in group && group.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#0071e3]/12 text-[#0071e3] tracking-wide">
                    {group.badge}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {group.models.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => handleSelect(id)}
                    className={`group relative flex items-center justify-between px-4 py-3 rounded-xl
                      border text-sm font-medium text-left transition-all duration-200
                      ${
                        selected === id
                          ? 'border-[#0071e3] bg-[#0071e3]/8 text-foreground'
                          : 'border-border bg-background-card text-foreground-secondary hover:border-[#0071e3]/30 hover:text-foreground hover:bg-[#0071e3]/4'
                      }`}
                  >
                    <span>{label}</span>
                    <ChevronRight
                      size={14}
                      className={`shrink-0 transition-transform duration-200 ${
                        selected === id ? 'text-[#0071e3]' : 'text-foreground-muted group-hover:translate-x-0.5'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
