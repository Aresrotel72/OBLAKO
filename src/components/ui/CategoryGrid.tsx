'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Smartphone,
  Shield,
  Headphones,
  Battery,
  Cable,
  Watch,
  Speaker,
  Layers,
} from 'lucide-react'

const categories = [
  { name: 'Чехлы',      icon: Shield,      href: '/cases',                         color: '#8b5cf6' },
  { name: 'Стёкла',     icon: Layers,      href: '/catalog?category=glass',        color: '#0ea5e9' },
  { name: 'Наушники',   icon: Headphones,  href: '/catalog?category=headphones',   color: '#f43f5e' },
  { name: 'Зарядки',    icon: Battery,      href: '/catalog?category=chargers',     color: '#22c55e' },
  { name: 'Кабели',     icon: Cable,       href: '/catalog?category=cables',       color: '#f59e0b' },
  { name: 'Часы',       icon: Watch,       href: '/catalog?category=watches',      color: '#ec4899' },
  { name: 'Колонки',    icon: Speaker,     href: '/catalog?category=speakers',     color: '#14b8a6' },
  { name: 'Аксессуары', icon: Smartphone,  href: '/catalog',                       color: '#6366f1' },
]

const ease = [0.16, 1, 0.3, 1] as const

export default function CategoryGrid() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            Категории
          </h2>
          <p className="text-sm text-[#86868b]">Найди то, что нужно</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.45, delay: i * 0.05, ease }}
              >
                <Link
                  href={cat.href}
                  data-cursor="icon"
                  className="group flex flex-col items-center gap-2.5 py-5 px-2 rounded-2xl border border-white/6 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 30%, ${cat.color}15 0%, transparent 70%)`,
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${cat.color}12`,
                      border: `1px solid ${cat.color}25`,
                    }}
                  >
                    <Icon
                      size={20}
                      className="transition-colors duration-300"
                      style={{ color: cat.color }}
                    />
                  </div>

                  {/* Label */}
                  <span className="relative z-10 text-xs font-medium text-[#86868b] group-hover:text-white transition-colors duration-300 text-center leading-tight">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
