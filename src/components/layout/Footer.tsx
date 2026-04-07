import Link from 'next/link'
import { MapPin, Clock, Phone, Send, Camera } from 'lucide-react'

const sections = [
  {
    title: 'Каталог',
    links: [
      { href: '/cases', label: 'Чехлы для iPhone' },
      { href: '/catalog?category=chargers', label: 'Зарядные устройства' },
      { href: '/catalog?category=headphones', label: 'Наушники' },
      { href: '/catalog?category=glass', label: 'Защитные стёкла' },
      { href: '/catalog', label: 'Все товары' },
    ],
  },
  {
    title: 'Покупателям',
    links: [
      { href: '/how-to-reserve', label: 'Как забронировать' },
      { href: '/account', label: 'Личный кабинет' },
      { href: '/account/reservations', label: 'Мои брони' },
    ],
  },
  {
    title: 'Магазин',
    links: [
      { href: '/about', label: 'О нас' },
      { href: '/contacts', label: 'Контакты' },
    ],
  },
]

const socials = [
  { icon: Send,      label: 'Telegram',  href: '#' },
  { icon: Camera,    label: 'Instagram', href: '#' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* Top gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="bg-[#0a0a0a]">
        {/* CTA banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-4">
          <div className="relative rounded-2xl border border-white/8 bg-gradient-to-br from-[#8b5cf6]/8 via-transparent to-[#0ea5e9]/6 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-[#8b5cf6]/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-[#0ea5e9]/8 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Нужна помощь с выбором?</h3>
              <p className="text-sm text-[#86868b]">Напиши нам — подберём идеальный аксессуар</p>
            </div>
            <Link
              href="#"
              data-cursor="cta"
              className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <Send size={14} />
              Написать в Telegram
            </Link>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand + contacts */}
            <div className="col-span-2">
              <Link
                href="/"
                className="inline-block text-2xl font-bold tracking-[0.25em] text-white hover:opacity-80 transition-opacity font-display"
              >
                OBLAKO
              </Link>
              <p className="mt-4 text-sm text-[#86868b] leading-relaxed max-w-xs">
                Магазин мобильных аксессуаров. Бронируй онлайн — забирай в магазине.
              </p>

              {/* Contact pills */}
              <div className="mt-5 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-sm text-[#6e6e73]">
                  <MapPin size={14} className="text-[#8b5cf6] flex-shrink-0" />
                  <span>Узбекистан, Ташкент</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6e6e73]">
                  <Clock size={14} className="text-[#8b5cf6] flex-shrink-0" />
                  <span>Ежедневно 10:00 — 21:00</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6e6e73]">
                  <Phone size={14} className="text-[#8b5cf6] flex-shrink-0" />
                  <span>+998 (XX) XXX-XX-XX</span>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-5 flex items-center gap-2">
                {socials.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    data-cursor="icon"
                    className="w-9 h-9 rounded-xl border border-white/8 bg-white/[0.03] flex items-center justify-center text-[#86868b] hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200"
                  >
                    <s.icon size={16} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Link sections */}
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-4">{section.title}</h3>
                <ul className="space-y-2.5">
                  {section.links.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-sm text-[#86868b] hover:text-white transition-colors duration-200"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[#3a3a3c]">
              &copy; {year} OBLAKO. Все права защищены.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#3a3a3c]">
              <Link href="#" className="hover:text-[#86868b] transition-colors">Политика конфиденциальности</Link>
              <Link href="#" className="hover:text-[#86868b] transition-colors">Оферта</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
