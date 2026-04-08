'use client'

import Link from 'next/link'
import { X, User, ChevronRight, Tag, Smartphone, Headphones, Zap, Shield, Car, Gamepad2, Camera, Watch, HardDrive, Gift } from 'lucide-react'
import { useEffect } from 'react'
import type React from 'react'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  pathname: string
}

interface NavItem {
  href: string
  label: string
  icon?: React.ElementType
  accent?: string
}

const SECTIONS: { title: string; items: NavItem[] }[] = [
  {
    title: 'Главное',
    items: [
      { href: '/',        label: 'Главная' },
      { href: '/catalog', label: 'Весь каталог' },
    ],
  },
  {
    title: 'Чехлы',
    items: [
      { href: '/cases',                              label: 'Чехлы iPhone', icon: Smartphone },
      { href: '/catalog?categoryName=Стекла',        label: 'Защитные стёкла', icon: Shield },
      { href: '/sale',                               label: 'Распродажа Android', icon: Tag, accent: '#ff453a' },
    ],
  },
  {
    title: 'Аудио & Питание',
    items: [
      { href: '/catalog?categoryName=Наушники',      label: 'Наушники', icon: Headphones },
      { href: '/catalog?categoryName=Колонки',       label: 'Колонки', icon: Headphones },
      { href: '/catalog?categoryName=Зарядки',       label: 'Зарядные устройства', icon: Zap },
      { href: '/catalog?categoryName=Кабели',        label: 'Кабели', icon: Zap },
      { href: '/catalog?categoryName=Переходники',   label: 'Переходники', icon: Zap },
    ],
  },
  {
    title: 'Гаджеты',
    items: [
      { href: '/catalog?categoryName=Смарт-часы',   label: 'Смарт-часы', icon: Watch },
      { href: '/catalog?categoryName=Авто',          label: 'Авто-аксессуары', icon: Car },
      { href: '/catalog?categoryName=Игровые',       label: 'Геймерам', icon: Gamepad2 },
      { href: '/catalog?categoryName=USB',           label: 'USB-носители', icon: HardDrive },
      { href: '/catalog?categoryName=Проекторы',     label: 'Проекторы', icon: HardDrive },
    ],
  },
  {
    title: 'Для творчества',
    items: [
      { href: '/catalog?categoryName=Блогерам',      label: 'Блогерам', icon: Camera },
      { href: '/catalog?categoryName=Подарки',       label: 'Подарки', icon: Gift },
    ],
  },
]

export default function MobileNav({ isOpen, onClose, pathname }: MobileNavProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 z-50 lg:hidden flex flex-col
          bg-background border-l border-border overflow-y-auto
          transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-border shrink-0 sticky top-0 bg-background/95 backdrop-blur-xl z-10">
          <span className="text-base font-bold tracking-[0.18em] text-foreground">OBLAKO</span>
          <button
            onClick={onClose}
            className="p-2 text-foreground-muted hover:text-foreground transition-colors rounded-full hover:bg-black/5"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sale banner */}
        <Link
          href="/sale"
          onClick={onClose}
          className="mx-4 mt-4 flex items-center justify-between px-4 py-3 rounded-2xl bg-[#ff453a]/8 border border-[#ff453a]/20"
        >
          <div className="flex items-center gap-2">
            <Tag size={15} className="text-[#ff453a]" />
            <span className="text-sm font-bold text-[#ff453a]">Распродажа Android</span>
          </div>
          <span className="text-xs font-bold text-[#ff453a] bg-[#ff453a]/12 px-2 py-0.5 rounded-full">
            SALE
          </span>
        </Link>

        {/* Categories */}
        <nav className="flex flex-col px-4 py-4 gap-6">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="text-[10px] font-semibold text-foreground-muted uppercase tracking-widest px-2 mb-2">
                {section.title}
              </p>
              <div className="space-y-0.5">
                {section.items.map(({ href, label, icon: Icon, accent }) => {
                  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href.split('?')[0]))
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                        isActive
                          ? 'bg-[#0071e3]/8 text-foreground font-medium'
                          : 'text-foreground-secondary hover:text-foreground hover:bg-black/4'
                      }`}
                      style={accent ? { color: accent } : undefined}
                    >
                      <span className="flex items-center gap-2.5">
                        {Icon && <Icon size={15} className="shrink-0" style={accent ? { color: accent } : undefined} />}
                        {label}
                      </span>
                      <ChevronRight size={14} className="opacity-40" />
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-5 border-t border-border mt-auto shrink-0">
          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center gap-2.5 text-sm text-foreground-secondary hover:text-foreground transition-colors px-2"
          >
            <User size={16} />
            Личный кабинет
          </Link>
          <p className="text-[11px] text-foreground-muted mt-4 px-2 leading-relaxed">
            г. Полоцк, ул. Богдановича 14<br />
            ТЦ Green · Каждый день 10:00–21:00
          </p>
        </div>
      </div>
    </>
  )
}
