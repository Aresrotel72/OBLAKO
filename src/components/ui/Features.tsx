'use client'

import { motion } from 'framer-motion'
import { CheckCircle, CalendarCheck, MapPin, ShieldCheck } from 'lucide-react'
import SpotlightCard from '@/components/SpotlightCard'
import SectionHeader from './SectionHeader'

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

        <SectionHeader
          eyebrow="OBLAKO · Наши преимущества"
          title="Почему OBLAKO"
          subtitle="Онлайн-витрина с офлайн-удобством. Всё честно и без лишних шагов."
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
            >
              <SpotlightCard
                className="card-glow bg-white border border-border rounded-2xl p-6 transition-colors duration-300 group cursor-default shadow-sm h-full"
                spotlightColor="rgba(0, 113, 227, 0.12)"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0071e3]/8 border border-[#0071e3]/15 flex items-center justify-center mb-5 text-[#0071e3] group-hover:bg-[#0071e3] group-hover:text-white transition-all duration-400">
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed font-light">{description}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
