'use client'

import BlurCrossfade from '@/components/ui/BlurCrossfade'
import ScrollReveal from '@/components/ui/ScrollReveal'

const SLIDES = [
  {
    src: '/showcase/case-black.jpg',
    alt: 'iPhone в премиальном чехле с AirPods',
    caption: 'Премиальная защита для iPhone',
  },
  {
    src: '/showcase/case-colorful.jpg',
    alt: 'iPhone в чехле, вид сбоку',
    caption: 'Идеальная посадка на каждую модель',
  },
  {
    src: '/showcase/airpods.jpg',
    alt: 'AirPods Pro в кейсе',
    caption: 'AirPods и аксессуары',
  },
  {
    src: '/showcase/iphone-clear.jpg',
    alt: 'Коллекция iPhone',
    caption: 'Аксессуары для всех поколений',
  },
]

export default function ShowcaseSection() {
  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* Текст */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071e3]/8 border border-[#0071e3]/15 text-[#0071e3] text-xs font-semibold uppercase tracking-widest mb-5">
                Коллекция 2026
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-tight mb-4">
                Стиль.<br />
                <span className="text-[#0071e3]">Защита.</span><br />
                Качество.
              </h2>
              <p className="text-foreground-secondary leading-relaxed mb-6">
                Подобрали лучшие аксессуары для вашего iPhone.
                Каждый чехол — идеальная посадка, каждое стекло — полная защита.
                Бронируйте онлайн, забирайте в магазине.
              </p>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#30d158]" />
                  <span className="text-foreground-muted">В наличии</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0071e3]" />
                  <span className="text-foreground-muted">Бронь 24ч</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#ffd60a]" />
                  <span className="text-foreground-muted">Возврат 14 дн</span>
                </div>
              </div>
            </div>

            {/* Карусель */}
            <BlurCrossfade
              slides={SLIDES}
              interval={4500}
              className="h-[360px] sm:h-[460px]"
            />

          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
