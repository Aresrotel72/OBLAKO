'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// @ts-ignore
import LiquidEther from '@/components/LiquidEther'
import ShinyText from '@/components/ShinyText'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return
    gsap.to(contentRef.current, {
      y: -80, ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center text-center px-4 py-36 sm:py-48 overflow-hidden bg-background"
    >
      {/* LiquidEther background */}
      <div className="absolute inset-0 pointer-events-none">
        <LiquidEther
          mouseForce={55}
          cursorSize={35}
          isViscous={false}
          viscous={30}
          colors={["#0071e3", "#5ac8fa", "#e8f4ff"]}
          autoDemo
          autoSpeed={1.2}
          autoIntensity={2.5}
          isBounce={false}
          resolution={0.5}
          dt={0.025}
        />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Vertical accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-[#0071e3]/40 to-transparent pointer-events-none" />

      {/* Central radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none glow-pulse"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,113,227,0.10) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-3xl mx-auto">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full border border-[#0071e3]/25 bg-[#0071e3]/8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] animate-pulse" />
          <ShinyText
            text="Мобильные аксессуары · Полоцк"
            speed={3}
            color="#0071e3"
            shineColor="#5ac8fa"
            spread={100}
            className="text-xs font-medium tracking-widest uppercase"
          />
        </motion.div>

        {/* Заголовок — кинетика слов + новый текст */}
        <h1 className="font-display font-bold tracking-tighter leading-[0.92] text-foreground mb-6 select-none">

          {/* Строка 1: «Чехол» ← слева, «—» ↓ сверху */}
          <div className="flex items-baseline justify-center gap-4 sm:gap-6">
            <motion.span
              initial={{ opacity: 0, x: -180, rotate: -6 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0 }}
              className="inline-block text-5xl sm:text-7xl lg:text-8xl"
            >
              Чехол
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              className="inline-block text-4xl sm:text-6xl lg:text-7xl text-foreground-muted font-light"
            >
              —
            </motion.span>
          </div>

          {/* Строка 2: «это» → справа, «характер.» ↑ снизу + scale */}
          <div className="flex items-baseline justify-center gap-3 sm:gap-5 mt-1">
            <motion.span
              initial={{ opacity: 0, x: 180 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
              className="inline-block text-5xl sm:text-7xl lg:text-8xl text-foreground"
            >
              это
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.45, y: 48, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
              className="inline-block text-5xl sm:text-7xl lg:text-8xl"
              style={{
                background: 'linear-gradient(135deg, #0071e3 0%, #5ac8fa 60%, #0071e3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              характер.
            </motion.span>
          </div>
        </h1>

        {/* Подзаголовок */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease }}
          className="text-lg sm:text-xl text-foreground-secondary leading-relaxed max-w-xl mx-auto mb-10 font-light"
        >
          Стиль, который защищает. Реальный остаток —
          бронируй онлайн, забирай сегодня.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease }}
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
              <span className="arrow-bounce inline-block"><ArrowRight size={16} /></span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/catalog"
              data-magnetic
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-medium text-foreground-secondary border border-border bg-white/70 backdrop-blur-sm hover:border-[#0071e3]/40 hover:text-[#0071e3] hover:bg-white transition-all duration-200 shadow-sm"
            >
              Весь каталог
            </Link>
          </motion.div>
        </motion.div>

        {/* Метрики */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-14 flex flex-wrap justify-center gap-3 text-xs text-foreground-muted"
        >
          {[
            { val: '200+', label: 'моделей чехлов' },
            { val: '24ч',  label: 'бронирование'   },
            { val: '14 дн',label: 'возврат'         },
          ].map(({ val, label }) => (
            <div key={label} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-border shadow-sm">
              <span className="font-semibold text-foreground text-sm">{val}</span>
              <span className="text-foreground-muted">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
