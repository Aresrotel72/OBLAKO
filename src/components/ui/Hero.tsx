'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ElegantShape } from './shape-landing-hero'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const shapesRef = useRef<HTMLDivElement>(null)

  // GSAP parallax: content scrolls up faster, shapes drift slower
  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current || !shapesRef.current) return

    gsap.to(contentRef.current, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    gsap.to(shapesRef.current, {
      y: 60,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative flex flex-col items-center justify-center text-center px-4 py-36 sm:py-48 overflow-hidden bg-[#030303]">

      {/* ── Shape Landing Hero shapes (3 шт — меньше compositor layers) ── */}
      <div ref={shapesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <ElegantShape
          delay={0.2}
          width={600}
          height={140}
          rotate={-12}
          gradient="from-[#0071e3]/[0.14]"
          className="-left-[6%] top-[14%]"
        />
        <ElegantShape
          delay={0.45}
          width={440}
          height={110}
          rotate={17}
          gradient="from-[#5e5ce6]/[0.12]"
          className="right-[-3%] top-[10%]"
        />
        <ElegantShape
          delay={0.65}
          width={260}
          height={70}
          rotate={-20}
          gradient="from-[#30d158]/[0.09]"
          className="left-[18%] bottom-[10%]"
        />
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

      {/* Vertical accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-[#0071e3]/60 to-transparent pointer-events-none" />

      {/* Central radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none glow-pulse"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,113,227,0.18) 0%, transparent 70%)',
        }}
      />

      {/* ── Content ── */}
      <div ref={contentRef} className="relative z-10 max-w-3xl mx-auto">

        {/* Лейбл */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full border border-[#0071e3]/25 bg-[#0071e3]/8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] animate-pulse" />
          <p className="text-xs font-medium text-[#0071e3] tracking-widest uppercase">
            Мобильные аксессуары · Полоцк
          </p>
        </motion.div>

        {/* Заголовок */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] text-white mb-6"
        >
          Защити свой
          <br />
          <span className="gradient-text">iPhone.</span>
        </motion.h1>

        {/* Подзаголовок */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="text-lg sm:text-xl text-[#86868b] leading-relaxed max-w-xl mx-auto mb-10 font-light"
        >
          Премиальные чехлы для каждой модели. Актуальные остатки,
          бронирование онлайн — забирай сегодня.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/cases"
              data-magnetic
              data-cursor="cta"
              className="btn-primary inline-flex items-center justify-center gap-2 text-sm font-semibold group"
            >
              Выбрать чехол
              <span className="arrow-bounce inline-block">
                <ArrowRight size={16} />
              </span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/catalog"
              data-magnetic
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-medium text-[#f5f5f7] border border-white/15 hover:border-white/35 hover:bg-white/5 transition-all duration-200"
            >
              Весь каталог
            </Link>
          </motion.div>
        </motion.div>

        {/* Метрики */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-14 flex flex-wrap justify-center gap-8 text-xs text-[#6e6e73]"
        >
          {[
            { val: '200+', label: 'моделей чехлов' },
            { val: '24ч', label: 'бронирование' },
            { val: '14 дн', label: 'возврат' },
          ].map(({ val, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="font-semibold text-[#86868b] text-sm">{val}</span>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}
