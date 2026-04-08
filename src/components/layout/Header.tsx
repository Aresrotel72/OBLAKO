'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  User, Menu, ChevronDown,
  Headphones, Zap, Shield,
  Car, Gamepad2, Camera, Watch, HardDrive, Gift, Tag, LogIn
} from 'lucide-react'
import MobileNav from './MobileNav'
import OblakLogo from './OblakLogo'
import { useAuth } from '@/hooks/useAuth'

// ─── Categories config ────────────────────────────────────────────────────────

const IPHONE_GROUPS = [
  {
    series: 'iPhone 17',
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
      { id: 'iphone-15',         label: 'iPhone 15' },
    ],
  },
  {
    series: 'iPhone 14 и старше',
    models: [
      { id: 'iphone-14-pro-max', label: 'iPhone 14 Pro Max' },
      { id: 'iphone-14-pro',     label: 'iPhone 14 Pro' },
      { id: 'iphone-14',         label: 'iPhone 14' },
      { id: 'iphone-13',         label: 'iPhone 13' },
      { id: 'iphone-12',         label: 'iPhone 12' },
    ],
  },
]

const ALL_CATEGORIES = [
  { icon: Shield,     label: 'Защитные стёкла',    href: '/catalog?categoryName=Стекла',       color: '#30d158' },
  { icon: Headphones, label: 'Наушники',            href: '/catalog?categoryName=Наушники',     color: '#ac8ffc' },
  { icon: Headphones, label: 'Колонки',             href: '/catalog?categoryName=Колонки',      color: '#818cf8' },
  { icon: Zap,        label: 'Зарядные устройства', href: '/catalog?categoryName=Зарядки',      color: '#f59e0b' },
  { icon: Zap,        label: 'Кабели',              href: '/catalog?categoryName=Кабели',       color: '#fb923c' },
  { icon: Zap,        label: 'Переходники',         href: '/catalog?categoryName=Переходники',  color: '#f97316' },
  { icon: Car,        label: 'Авто-аксессуары',     href: '/catalog?categoryName=Авто',         color: '#38bdf8' },
  { icon: Gamepad2,   label: 'Геймерам',            href: '/catalog?categoryName=Игровые',      color: '#f87171' },
  { icon: Camera,     label: 'Блогерам',            href: '/catalog?categoryName=Блогерам',     color: '#fb7185' },
  { icon: Watch,      label: 'Смарт-часы',          href: '/catalog?categoryName=Смарт-часы',  color: '#67e8f9' },
  { icon: HardDrive,  label: 'USB-носители',        href: '/catalog?categoryName=USB',          color: '#93c5fd' },
  { icon: HardDrive,  label: 'Проекторы',           href: '/catalog?categoryName=Проекторы',   color: '#a78bfa' },
  { icon: Gift,       label: 'Подарки',             href: '/catalog?categoryName=Подарки',      color: '#4ade80' },
]

// ─── Mega-menu: iPhone models ─────────────────────────────────────────────────

function IphoneMegaMenu() {
  return (
    <div className="bg-background-card border border-border rounded-2xl shadow-xl shadow-black/8 p-5 w-[440px]">
      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
        {IPHONE_GROUPS.map((g) => (
          <div key={g.series}>
            <p className="text-[10px] font-bold text-[#0071e3] uppercase tracking-widest mb-2 mt-3 first:mt-0">
              {g.series}
            </p>
            {g.models.map((m) => (
              <Link
                key={m.id}
                href={`/cases?model=${m.id}`}
                className="block px-2 py-1.5 rounded-lg text-sm text-foreground-secondary hover:text-foreground hover:bg-foreground/5 transition-all"
              >
                {m.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Link
          href="/cases"
          className="flex items-center justify-between px-2 py-2 rounded-lg text-sm font-semibold text-[#0071e3] hover:bg-[#0071e3]/8 transition-all"
        >
          Все чехлы для iPhone
          <span>→</span>
        </Link>
      </div>
    </div>
  )
}

// ─── Mega-menu: All categories ────────────────────────────────────────────────

function CatalogMegaMenu() {
  return (
    <div className="bg-background-card border border-border rounded-2xl shadow-xl shadow-black/8 p-5 w-[480px]">
      <div className="grid grid-cols-3 gap-1.5">
        {ALL_CATEGORIES.map(({ icon: Icon, label, href, color }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-foreground-secondary hover:text-foreground hover:bg-foreground/5 transition-all group"
          >
            <Icon size={14} style={{ color }} className="shrink-0 group-hover:scale-110 transition-transform" />
            <span className="leading-tight text-xs">{label}</span>
          </Link>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Link
          href="/catalog"
          className="flex items-center justify-between px-2 py-2 rounded-lg text-sm font-semibold text-foreground-secondary hover:text-foreground hover:bg-foreground/5 transition-all"
        >
          Весь каталог
          <span>→</span>
        </Link>
      </div>
    </div>
  )
}

// ─── Nav item ────────────────────────────────────────────────────────────────

function NavItem({
  label,
  href,
  isActive,
  mega,
}: {
  label: string
  href: string
  isActive: boolean
  mega?: React.ReactNode
}) {
  return (
    <div className="group/item relative">
      <Link
        href={href}
        className={`relative flex items-center gap-1 text-xs font-semibold uppercase tracking-widest transition-colors duration-150 py-1 ${
          isActive ? 'text-foreground' : 'text-foreground-muted hover:text-foreground'
        }`}
      >
        {label}
        {mega && (
          <ChevronDown
            size={11}
            className="transition-transform duration-200 group-hover/item:rotate-180"
          />
        )}
        {/* Slide-up underline */}
        <span
          className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${
            isActive
              ? 'w-full bg-[#0071e3] shadow-[0_0_6px_rgba(0,113,227,0.6)]'
              : 'w-0 group-hover/item:w-full bg-[#0071e3]/60'
          }`}
        />
      </Link>

      {/* Mega-menu */}
      {mega && (
        <div
          className="
            absolute top-[calc(100%+20px)] left-1/2 -translate-x-1/2 z-50
            opacity-0 translate-y-3 pointer-events-none
            group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto
            transition-all duration-200 ease-out
          "
        >
          {mega}
        </div>
      )}
    </div>
  )
}

// ─── Account Button ───────────────────────────────────────────────────────────

function AccountButton({ user }: { user: { name: string } | null }) {
  if (user) {
    return (
      <Link
        href="/account"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0071e3]/35 bg-[#0071e3]/6 hover:bg-[#0071e3]/12 hover:border-[#0071e3]/55 transition-all text-sm"
      >
        <div className="w-5 h-5 rounded-full bg-[#0071e3]/20 flex items-center justify-center">
          <User size={11} className="text-[#0071e3]" />
        </div>
        <span className="hidden sm:block text-xs font-semibold text-[#0071e3] max-w-[72px] truncate">
          {user.name.split(' ')[0]}
        </span>
      </Link>
    )
  }

  return (
    <Link
      href="/account"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-hover hover:border-[#0071e3]/45 hover:bg-[#0071e3]/6 transition-all text-xs font-semibold text-foreground-secondary hover:text-[#0071e3]"
      aria-label="Войти"
    >
      <LogIn size={14} />
      <span className="hidden sm:block">Войти</span>
    </Link>
  )
}

// ─── Header ──────────────────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const user = useAuth((s) => s.user)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`header-oblako sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? 'scrolled' : ''}`}
      >
        {/* Thin blue glow line at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0071e3]/25 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="header-grid">

            {/* Logo */}
            <Link href="/" className="shrink-0 justify-self-start">
              <OblakLogo size={36} />
            </Link>

            {/* Desktop nav */}
            <nav className="header-nav gap-6">
              <NavItem
                label="Чехлы"
                href="/cases"
                isActive={pathname.startsWith('/cases')}
                mega={<IphoneMegaMenu />}
              />
              <NavItem
                label="Каталог"
                href="/catalog"
                isActive={pathname === '/catalog'}
                mega={<CatalogMegaMenu />}
              />
              <NavItem
                label="Стёкла"
                href="/catalog?categoryName=Стекла"
                isActive={false}
              />
              <NavItem
                label="Аудио"
                href="/catalog?categoryName=Наушники"
                isActive={false}
              />
              <Link
                href="/sale"
                className="relative flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#f87171] hover:text-red-500 transition-colors py-1 group/sale"
              >
                <Tag size={12} />
                Sale
                <span className="px-1.5 py-0.5 rounded-full bg-[#ff453a]/12 text-[9px] font-black tracking-wide text-[#f87171] animate-pulse">
                  −70%
                </span>
                <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover/sale:w-full bg-[#f87171]/60 transition-all duration-300" />
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 justify-self-end">
              <AccountButton user={user} />

              {/* Mobile burger */}
              <button
                className="lg:hidden p-2 text-foreground-muted hover:text-foreground transition-colors rounded-full hover:bg-foreground/5"
                onClick={() => setMobileOpen(true)}
                aria-label="Открыть меню"
              >
                <Menu size={20} />
              </button>
            </div>

          </div>
        </div>
      </header>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </>
  )
}
