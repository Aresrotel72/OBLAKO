'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { MapPin, Clock, Send } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

const info = [
  {
    icon: MapPin,
    label: 'Адрес',
    value: 'ул. Богдановича 14, Полоцк',
    sub: 'ТЦ Green, 1 этаж',
  },
  {
    icon: Clock,
    label: 'Режим работы',
    value: 'Каждый день',
    sub: '10:00 — 21:00',
  },
]

const MAPS = {
  yandex: 'https://yandex.ru/map-widget/v1/?ll=28.78623%2C55.48735&z=16&pt=28.78623%2C55.48735%2Cpm2rdm&l=map',
  google:  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2311.6!2d28.7862!3d55.4873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z0KHQotCmIEdyZWVu!5e0!3m2!1sru!2sby!4v1',
}

type MapProvider = 'yandex' | 'google'

export default function StoreSection() {
  const [activeMap, setActiveMap] = useState<MapProvider>('yandex')

  return (
    <section className="w-full py-24 px-4 bg-[var(--background)] border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-3">
            Приходите к нам.
          </h2>
          <p className="text-[var(--foreground-secondary)] text-lg font-light max-w-lg mx-auto">
            Офлайн-магазин в центре Полоцка. Весь ассортимент вживую, консультация бесплатно.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Map block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="flex flex-col gap-3"
          >
            {/* Map provider toggle */}
            <div className="flex items-center gap-2 bg-[var(--background-card)] border border-[var(--border)] rounded-xl p-1 w-fit shadow-sm">
              {(['yandex', 'google'] as MapProvider[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setActiveMap(p)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    activeMap === p
                      ? 'bg-[#0071e3] text-white shadow-sm'
                      : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {p === 'yandex' ? 'Яндекс' : 'Google'} карты
                </button>
              ))}
            </div>

            {/* Map iframe */}
            <div className="relative h-[300px] rounded-2xl border border-[var(--border)] overflow-hidden bg-[var(--background-elevated)] shadow-sm">
              <iframe
                key={activeMap}
                src={MAPS[activeMap]}
                width="100%" height="100%"
                loading="lazy" allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title={`Карта — ${activeMap}`}
              />
            </div>

            {/* Direct links */}
            <div className="flex gap-2">
              <a
                href="https://yandex.ru/maps/?text=Полоцк+ул.+Богдановича+14"
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[var(--foreground-secondary)] border border-[var(--border)] hover:border-[#0071e3]/40 hover:text-[#0071e3] transition-all bg-[var(--background-card)]"
              >
                Открыть в Яндекс
              </a>
              <a
                href="https://maps.google.com/?q=Полоцк+ул.+Богдановича+14"
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[var(--foreground-secondary)] border border-[var(--border)] hover:border-[#0071e3]/40 hover:text-[#0071e3] transition-all bg-[var(--background-card)]"
              >
                Открыть в Google
              </a>
            </div>
          </motion.div>

          {/* Info block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="flex flex-col gap-3"
          >
            {info.map(({ icon: Icon, label, value, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="flex items-start gap-4 bg-[var(--background-card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-[#0071e3]/8 border border-[#0071e3]/15 flex items-center justify-center text-[#0071e3] shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-[var(--foreground-muted)] uppercase tracking-widest mb-0.5 font-semibold">{label}</p>
                  <p className="font-bold text-[var(--foreground)]">{value}</p>
                  <p className="text-sm text-[var(--foreground-secondary)] font-light">{sub}</p>
                </div>
              </motion.div>
            ))}

            {/* How to get there */}
            <div className="bg-[var(--background-card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm">
              <p className="text-[10px] text-[var(--foreground-muted)] uppercase tracking-widest mb-3 font-semibold">Как нас найти</p>
              <div className="space-y-1.5 text-sm text-[var(--foreground-secondary)]">
                <p>🚶 Центр города, пешком от ост. «Богдановича»</p>
                <p>🏬 ТЦ Green, 1 этаж, отдел аксессуаров</p>
                <p>🅿️ Парковка бесплатная рядом с ТЦ</p>
              </div>
            </div>

            {/* Social — TODO: заменить href на реальные ссылки */}
            <div className="flex gap-3 mt-1">
              <div className="flex-1 flex items-center justify-center gap-2 bg-[var(--background-card)] border border-[var(--border)] rounded-2xl py-3.5 text-sm font-semibold text-[var(--foreground-muted)] cursor-not-allowed select-none">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                Instagram
                <span className="text-[10px] font-normal opacity-50">скоро</span>
              </div>
              <div className="flex-1 flex items-center justify-center gap-2 bg-[var(--background-card)] border border-[var(--border)] rounded-2xl py-3.5 text-sm font-semibold text-[var(--foreground-muted)] cursor-not-allowed select-none">
                <Send size={17} />
                Telegram
                <span className="text-[10px] font-normal opacity-50">скоро</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
