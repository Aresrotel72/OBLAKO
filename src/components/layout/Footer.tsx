import Link from 'next/link'
import { MapPin, Clock, Phone, Send, Camera } from 'lucide-react'

const sections = [
  {
    title: 'Каталог',
    links: [
      { href: '/cases',                          label: 'Чехлы для iPhone'      },
      { href: '/catalog?category=chargers',      label: 'Зарядные устройства'   },
      { href: '/catalog?category=headphones',    label: 'Наушники'              },
      { href: '/catalog?category=glass',         label: 'Защитные стёкла'       },
      { href: '/catalog',                        label: 'Все товары'            },
    ],
  },
  {
    title: 'Покупателям',
    links: [
      { href: '/how-to-reserve',           label: 'Как забронировать' },
      { href: '/account',                  label: 'Личный кабинет'   },
      { href: '/account/reservations',     label: 'Мои брони'        },
    ],
  },
  {
    title: 'Магазин',
    links: [
      { href: '/about',    label: 'О нас'     },
      { href: '/contacts', label: 'Контакты'  },
    ],
  },
]

const socials = [
  { icon: Send,   label: 'Telegram',  href: '#' },
  { icon: Camera, label: 'Instagram', href: '#' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-[var(--border)]">

      <div className="bg-[var(--background-secondary)]">
        {/* CTA banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-4">
          <div className="relative rounded-2xl border border-[#0071e3]/15 bg-gradient-to-br from-[#0071e3]/6 via-transparent to-[#0077ed]/4 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden shadow-sm">
            {/* Glow */}
            <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-[#0071e3]/8 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-[#0077ed]/6 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-1">Нужна помощь с выбором?</h3>
              <p className="text-sm text-[var(--foreground-secondary)]">Напиши нам — подберём идеальный аксессуар</p>
            </div>
            <Link
              href="#"
              data-cursor="cta"
              className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0071e3] text-white text-sm font-bold hover:bg-[#0077ed] transition-colors flex-shrink-0 shadow-sm"
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
                className="inline-block text-2xl font-bold tracking-[0.25em] text-[var(--foreground)] hover:opacity-70 transition-opacity font-display"
              >
                OBLAKO
              </Link>
              <p className="mt-4 text-sm text-[var(--foreground-secondary)] leading-relaxed max-w-xs">
                Магазин мобильных аксессуаров. Бронируй онлайн — забирай в магазине.
              </p>

              {/* Contact pills */}
              <div className="mt-5 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-sm text-[var(--foreground-secondary)]">
                  <MapPin size={14} className="text-[#0071e3] flex-shrink-0" />
                  <span>г. Полоцк, ул. Богдановича 14</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--foreground-secondary)]">
                  <Clock size={14} className="text-[#0071e3] flex-shrink-0" />
                  <span>Ежедневно 10:00 — 21:00</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
                  <Phone size={14} className="text-[var(--foreground-muted)] flex-shrink-0" />
                  <span>Телефон будет указан позже</span>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-5 flex items-center gap-2">
                {socials.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl border border-[var(--border)] bg-[var(--background-card)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[#0071e3] hover:border-[#0071e3]/30 transition-all duration-200"
                  >
                    <s.icon size={16} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Link sections */}
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-[0.2em] mb-4">{section.title}</h3>
                <ul className="space-y-2.5">
                  {section.links.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-sm text-[var(--foreground-secondary)] hover:text-[#0071e3] transition-colors duration-200"
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
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[var(--foreground-muted)]">
              &copy; {year} OBLAKO. Все права защищены.
            </p>
            <div className="flex items-center gap-4 text-xs text-[var(--foreground-muted)]">
              <Link href="#" className="hover:text-[var(--foreground-secondary)] transition-colors">Политика конфиденциальности</Link>
              <Link href="#" className="hover:text-[var(--foreground-secondary)] transition-colors">Оферта</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
