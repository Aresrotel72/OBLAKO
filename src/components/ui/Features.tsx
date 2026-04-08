'use client'

import { motion } from 'framer-motion'
import { CheckCircle, CalendarCheck, MapPin, ShieldCheck } from 'lucide-react'

const features = [
  {
    icon: CheckCircle,
    title: 'Актуальный остаток',
    description: 'Синхронизация с магазином в реальном времени. Видишь наличие — значит товар есть прямо сейчас.',
  },
  {
    icon: CalendarCheck,
    title: 'Бронирование онлайн',
    description: 'Забронируй товар в пару кликов. Мы придержим его до твоего визита — без предоплаты.',
  },
  {
    icon: MapPin,
    title: 'Самовывоз сегодня',
    description: 'Приходи в магазин в удобное время и забирай свой заказ. Быстро, без очередей.',
  },
  {
    icon: ShieldCheck,
    title: 'Гарантия 14 дней',
    description: 'Не подошло? Вернём деньги или обменяем без лишних вопросов.',
  },
]

const ease = [0.16, 1, 0.3, 1] as const

export default function Features() {
  return (
    <section className="py-24 px-4 bg-background-secondary">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-foreground mb-3">
            Почему OBLAKO
          </h2>
          <p className="text-foreground-secondary text-lg font-light">
            Онлайн-витрина с офлайн-удобством
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
              whileHover={{ y: -6 }}
              className="card-glow bg-background-card border border-border rounded-2xl p-6 transition-colors duration-300 group cursor-default shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#0071e3]/8 border border-[#0071e3]/15 flex items-center justify-center mb-5 text-[#0071e3] group-hover:bg-[#0071e3] group-hover:text-white transition-all duration-400">
                <Icon size={22} />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-foreground-secondary leading-relaxed font-light">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
