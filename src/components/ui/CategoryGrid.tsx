'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Shield, Layers, Headphones, Battery, Cable, Watch, Speaker, Smartphone } from 'lucide-react'

const categories = [
  { name: 'Чехлы',      icon: Shield,      href: '/cases'                        },
  { name: 'Стёкла',     icon: Layers,      href: '/catalog?category=glass'       },
  { name: 'Наушники',   icon: Headphones,  href: '/catalog?category=headphones'  },
  { name: 'Зарядки',    icon: Battery,     href: '/catalog?category=chargers'    },
  { name: 'Кабели',     icon: Cable,       href: '/catalog?category=cables'      },
  { name: 'Часы',       icon: Watch,       href: '/catalog?category=watches'     },
  { name: 'Колонки',    icon: Speaker,     href: '/catalog?category=speakers'    },
  { name: 'Все товары', icon: Smartphone,  href: '/catalog'                      },
]

export default function CategoryGrid() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (q) router.push(`/catalog?search=${encodeURIComponent(q)}`)
  }

  return (
    <section className="py-14 px-4 bg-background">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">

        {/* Search bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[560px]"
        >
          <div className="relative group">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none transition-colors duration-200 group-focus-within:text-accent"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск аксессуаров…"
              className="
                w-full
                bg-background-card border border-border
                hover:border-border-hover focus:border-[#0071e3]/50
                rounded-full
                pl-11 pr-5 py-3
                text-sm text-foreground placeholder-foreground-muted
                outline-none
                transition-all duration-200
                shadow-sm
              "
            />
          </div>
        </motion.form>

        {/* Category circles */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-8 sm:gap-x-8">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={cat.href} className="group flex flex-col items-center gap-3 w-[80px] sm:w-[96px]">
                  <div className="
                    w-[80px] h-[80px] sm:w-[96px] sm:h-[96px]
                    rounded-full
                    border border-border
                    bg-background-card
                    flex items-center justify-center
                    transition-all duration-300
                    group-hover:border-[#0071e3]/40
                    group-hover:bg-[#0071e3]/6
                    group-hover:scale-105
                    group-active:scale-95
                    shadow-sm
                  ">
                    <Icon
                      size={28}
                      strokeWidth={1.5}
                      className="text-foreground-muted transition-colors duration-300 group-hover:text-[#0071e3]"
                    />
                  </div>
                  <span className="text-[12px] sm:text-[13px] text-foreground-secondary group-hover:text-[#0071e3] transition-colors duration-300 text-center leading-tight">
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
