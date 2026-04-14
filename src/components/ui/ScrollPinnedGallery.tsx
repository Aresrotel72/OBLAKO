'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface GallerySlide {
  src: string
  alt: string
  title: string
  desc: string
  accent?: string
}

interface ScrollPinnedGalleryProps {
  slides: GallerySlide[]
}

export default function ScrollPinnedGallery({ slides }: ScrollPinnedGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    if (!containerRef.current) return

    const images = imageRefs.current.filter(Boolean) as HTMLDivElement[]
    const texts = textRefs.current.filter(Boolean) as HTMLDivElement[]

    // Pin the whole section
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${slides.length * 100}%`,
      pin: true,
      pinSpacing: true,
    })

    // Animate each slide
    images.forEach((img, i) => {
      if (i === 0) return // first slide is already visible

      const progress = i / slides.length

      // Image enters
      gsap.fromTo(img,
        { opacity: 0, scale: 1.15, filter: 'blur(12px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${progress * 100 - 8}% top`,
            end: `${progress * 100 + 8}% top`,
            scrub: 0.6,
          },
        }
      )

      // Previous image exits
      const prev = images[i - 1]
      if (prev) {
        gsap.to(prev, {
          opacity: 0,
          scale: 0.92,
          filter: 'blur(8px)',
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${progress * 100 - 8}% top`,
            end: `${progress * 100 + 8}% top`,
            scrub: 0.6,
          },
        })
      }
    })

    // Animate texts
    texts.forEach((text, i) => {
      if (i === 0) return

      const progress = i / slides.length

      gsap.fromTo(text,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${progress * 100 - 5}% top`,
            end: `${progress * 100 + 5}% top`,
            scrub: 0.4,
          },
        }
      )

      // Hide previous text
      const prevText = texts[i - 1]
      if (prevText) {
        gsap.to(prevText, {
          opacity: 0,
          y: -30,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${progress * 100 - 5}% top`,
            end: `${progress * 100 + 5}% top`,
            scrub: 0.4,
          },
        })
      }
    })
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background images */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          ref={(el) => { imageRefs.current[i] = el }}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0, zIndex: i }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority={i === 0}
          />
          {/* Darken overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Text overlays */}
      <div className="absolute inset-0 flex items-end pb-16 sm:pb-24 z-20">
        <div className="relative w-full max-w-5xl mx-auto px-6">
          {slides.map((slide, i) => (
            <div
              key={`text-${slide.title}`}
              ref={(el) => { textRefs.current[i] = el }}
              className="absolute bottom-0 left-6 right-6"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {/* Category label */}
              {slide.accent && (
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{
                    background: `${slide.accent}20`,
                    color: slide.accent,
                    border: `1px solid ${slide.accent}40`,
                  }}
                >
                  {slide.title}
                </div>
              )}
              <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-3 drop-shadow-2xl">
                {slide.title}
              </h3>
              <p className="text-base sm:text-lg text-white/70 max-w-md leading-relaxed drop-shadow-lg">
                {slide.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
        <span className="text-white/40 text-[10px] uppercase tracking-[0.2em]">Скролл</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10 z-30">
        <div
          className="h-full bg-white/60 transition-all duration-300"
          id="gallery-progress"
        />
      </div>
    </section>
  )
}
