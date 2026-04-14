'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface Slide {
  src: string
  alt: string
  caption?: string
  accent?: string
}

interface BlurCrossfadeProps {
  slides: Slide[]
  /** Интервал смены в мс */
  interval?: number
  /** Высота контейнера */
  className?: string
  /** Показывать подписи */
  showCaptions?: boolean
  /** Скругление */
  rounded?: string
}

export default function BlurCrossfade({
  slides,
  interval = 4000,
  className = 'h-[420px] sm:h-[500px]',
  showCaptions = true,
  rounded = 'rounded-3xl',
}: BlurCrossfadeProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((i) => (i + 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    const id = setInterval(next, interval)
    return () => clearInterval(id)
  }, [next, interval])

  const slide = slides[current]

  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      {/* Images */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{
            opacity: 0,
            scale: 1.08,
            filter: 'blur(20px) brightness(0.7)',
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: 'blur(0px) brightness(1)',
          }}
          exit={{
            opacity: 0,
            scale: 0.96,
            filter: 'blur(16px) brightness(0.6)',
          }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={current === 0}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Caption */}
      {showCaptions && slide.caption && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`caption-${current}`}
            className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-white text-lg sm:text-xl font-semibold tracking-tight drop-shadow-lg">
              {slide.caption}
            </p>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Progress dots */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1)
              setCurrent(i)
            }}
            className="relative w-2 h-2 rounded-full overflow-hidden bg-white/30 transition-all"
            aria-label={`Слайд ${i + 1}`}
          >
            {i === current && (
              <motion.div
                className="absolute inset-0 bg-white rounded-full"
                layoutId="dot"
                transition={{ duration: 0.4 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
