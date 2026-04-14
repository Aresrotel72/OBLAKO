'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ─── ЗАМЕНИ эти URL на фото поставщика ───────────────────────────────────────
// Формат: любой HTTPS-адрес к JPG/PNG/WEBP
// Рекомендуемый размер: от 600×900px, вертикальный (портрет)
const STORY_IMAGES = [
  // Ch1 — замени на фото поставщика
  'https://fastly.picsum.photos/id/663/600/900.jpg?hmac=ho50slFnebT_xQ7-Ei9Uox4fCOiXNggJUVhd_SwzkUE',
  // Ch2 — замени на фото поставщика
  'https://fastly.picsum.photos/id/471/600/900.jpg?hmac=usCErIXfV_ZySO861hAsmMG301C9DP89CxeMFwEl2BQ',
  // Ch3 — замени на фото поставщика
  'https://fastly.picsum.photos/id/485/600/900.jpg?hmac=4kbmDXLJ3yvTQ30eUkxc7zMopwBfvHSfz7_xIgGcHSk',
  // Ch4 — замени на фото поставщика
  'https://fastly.picsum.photos/id/611/600/900.jpg?hmac=LLEtukbrX7YaE9i1LRKSEKIUZ05pJko_CJgBehrBnQY',
]
// ─────────────────────────────────────────────────────────────────────────────

function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="story-char"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  )
}

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef        = useRef<HTMLDivElement>(null)
  const phoneRef     = useRef<SVGSVGElement>(null)
  const outlineRef   = useRef<SVGRectElement>(null)
  const caseFillRef  = useRef<SVGRectElement>(null)

  // Image panel refs (one per chapter)
  const img0 = useRef<HTMLDivElement>(null)
  const img1 = useRef<HTMLDivElement>(null)
  const img2 = useRef<HTMLDivElement>(null)
  const img3 = useRef<HTMLDivElement>(null)

  // Chapter text refs
  const c0 = useRef<HTMLDivElement>(null)
  const c1 = useRef<HTMLDivElement>(null)
  const c2 = useRef<HTMLDivElement>(null)
  const c3 = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const container = containerRef.current
    if (!container) return

    const chars = (r: React.RefObject<HTMLDivElement | null>) =>
      r.current ? Array.from(r.current.querySelectorAll<HTMLElement>('.story-char')) : []
    const body = (r: React.RefObject<HTMLDivElement | null>) =>
      r.current?.querySelector<HTMLElement>('.story-body') ?? null

    const chs = [c0, c1, c2, c3].map(r => ({ chars: chars(r), body: body(r) }))
    const imgRefs = [img0, img1, img2, img3]
    const ctaEl = c3.current?.querySelector<HTMLElement>('.story-cta')

    // ── Initial states ──────────────────────────────────────────
    chs.forEach(({ chars: c, body: b }) => {
      gsap.set(c, { opacity: 0, y: 28 })
      b && gsap.set(b, { opacity: 0, y: 10 })
    })
    ctaEl && gsap.set(ctaEl, { opacity: 0, y: 10 })
    imgRefs.forEach(r => r.current && gsap.set(r.current, { opacity: 0 }))
    outlineRef.current  && gsap.set(outlineRef.current,  { strokeDashoffset: 1500 })
    caseFillRef.current && gsap.set(caseFillRef.current, { fillOpacity: 0 })

    // ── Scrub timeline ──────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    })

    const D  = 0.5
    const ST = 0.05

    // ─── CH 1: Защита — SVG wireframe ────────────────────────────
    tl.to(outlineRef.current, { strokeDashoffset: 0, duration: D * 3, ease: 'none' }, 0)
    tl.to(img0.current, { opacity: 1, duration: D }, D * 0.3)
    tl.to(chs[0].chars, { opacity: 1, y: 0, duration: D, stagger: ST }, D * 0.5)
    tl.to(chs[0].body,  { opacity: 1, y: 0, duration: D }, D * 1.5)

    // transition 1→2
    tl.to(chs[0].chars, { opacity: 0, y: -24, duration: D * 0.5, stagger: ST * 0.5 }, D * 3)
    tl.to(chs[0].body,  { opacity: 0,          duration: D * 0.4 }, D * 3)
    tl.to(img0.current, { opacity: 0, duration: D * 0.8 }, D * 3)
    // SVG fades out, real photo fades in
    tl.to(phoneRef.current, { opacity: 0, duration: D * 0.8 }, D * 3.1)
    tl.to(caseFillRef.current, { fillOpacity: 0.88, duration: D * 1.5 }, D * 3.2)
    tl.to(img1.current, { opacity: 1, duration: D * 1 }, D * 3.4)
    tl.to(bgRef.current, { backgroundColor: '#020c1b', duration: D * 1.5 }, D * 3)

    // ─── CH 2: Стиль — Photo 1 ───────────────────────────────────
    tl.to(chs[1].chars, { opacity: 1, y: 0, duration: D, stagger: ST }, D * 4.5)
    tl.to(chs[1].body,  { opacity: 1, y: 0, duration: D }, D * 5.2)

    // transition 2→3
    tl.to(chs[1].chars, { opacity: 0, y: -24, duration: D * 0.5, stagger: ST * 0.5 }, D * 6.5)
    tl.to(chs[1].body,  { opacity: 0,          duration: D * 0.4 }, D * 6.5)
    tl.to(img1.current, { opacity: 0, duration: D * 0.8 }, D * 6.5)
    tl.to(img2.current, { opacity: 1, duration: D * 1   }, D * 6.8)
    tl.to(bgRef.current, { backgroundColor: '#020f0f', duration: D }, D * 6.5)

    // ─── CH 3: Свобода — Photo 2 (rotated) ───────────────────────
    tl.to(chs[2].chars, { opacity: 1, y: 0, duration: D, stagger: ST }, D * 8.2)
    tl.to(chs[2].body,  { opacity: 1, y: 0, duration: D }, D * 9)

    // transition 3→4
    tl.to(chs[2].chars, { opacity: 0, y: -24, duration: D * 0.5, stagger: ST * 0.5 }, D * 10.2)
    tl.to(chs[2].body,  { opacity: 0,          duration: D * 0.4 }, D * 10.2)
    tl.to(img2.current, { opacity: 0, duration: D * 0.8 }, D * 10.2)
    tl.to(img3.current, { opacity: 1, duration: D * 1   }, D * 10.5)
    tl.to(bgRef.current, { backgroundColor: '#080808', duration: D }, D * 10.2)

    // ─── CH 4: Твой. — Photo 3 lifestyle ─────────────────────────
    tl.to(chs[3].chars, { opacity: 1, y: 0, duration: D * 1.2, stagger: ST * 1.5 }, D * 11.5)
    tl.to(chs[3].body,  { opacity: 1, y: 0, duration: D }, D * 12.5)
    ctaEl && tl.to(ctaEl, { opacity: 1, y: 0, duration: D }, D * 13)

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background */}
        <div ref={bgRef} className="absolute inset-0 bg-[#080808]" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* ── Content ────────────────────────────────────────────── */}
        <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24 px-6 sm:px-10 md:px-16">

          {/* ── Visual panel (SVG wireframe → photos) ─────────────── */}
          <div className="flex-shrink-0 relative" style={{ width: 220, height: 380 }}>

            {/* ── iPhone SVG (Chapter 1) ────────────────────────────── */}
            <svg
              ref={phoneRef}
              viewBox="0 0 200 420"
              className="absolute inset-0 w-full h-full drop-shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <rect
                ref={caseFillRef}
                x="8" y="8" width="184" height="404" rx="44"
                fill="#0071e3" fillOpacity="0"
              />
              <rect
                ref={outlineRef}
                x="8" y="8" width="184" height="404" rx="44"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.5"
                strokeDasharray="1500"
                strokeDashoffset="1500"
              />
              <rect x="20" y="52"  width="160" height="306" rx="10"  fill="#050505" opacity="0.96" />
              <rect x="70" y="21"  width="60"  height="18"  rx="9"   fill="#030303" />
              <circle cx="86" cy="30" r="4.5" fill="#030303" />
              <rect x="191" y="116" width="5.5" height="38" rx="2.5" fill="rgba(255,255,255,0.12)" />
              <rect x="3.5"  y="106" width="5"   height="28" rx="2.5" fill="rgba(255,255,255,0.12)" />
              <rect x="3.5"  y="142" width="5"   height="28" rx="2.5" fill="rgba(255,255,255,0.12)" />
              <rect x="76"   y="378" width="48"  height="5"  rx="2.5" fill="rgba(255,255,255,0.22)" />
              <rect x="28"  y="68"  width="144" height="9"  rx="4.5" fill="rgba(255,255,255,0.055)" />
              <rect x="28"  y="84"  width="100" height="7"  rx="3.5" fill="rgba(255,255,255,0.035)" />
              <rect x="28"  y="104" width="144" height="88" rx="10"  fill="rgba(255,255,255,0.025)" />
              <rect x="28"  y="204" width="68"  height="68" rx="10"  fill="rgba(255,255,255,0.025)" />
              <rect x="104" y="204" width="68"  height="68" rx="10"  fill="rgba(255,255,255,0.025)" />
            </svg>

            {/* ── Photo layers (crossfade per chapter) ──────────────── */}
            {STORY_IMAGES.map((src, i) => {
              const refs = [img0, img1, img2, img3]
              return (
                <div
                  key={i}
                  ref={refs[i]}
                  className="absolute inset-0 rounded-3xl overflow-hidden"
                  style={{ opacity: 0 }}
                >
                  <Image
                    src={src}
                    alt={`Глава ${i + 1}`}
                    fill
                    sizes="220px"
                    className="object-cover"
                    priority={i === 0}
                  />
                  {/* Dark vignette on photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                </div>
              )
            })}
          </div>

          {/* ── Chapter text area ──────────────────────────────────── */}
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md" style={{ height: 300 }}>

            {/* Chapter 1 — Защита */}
            <div ref={c0} className="absolute inset-0 flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.45em] uppercase text-white/20 font-mono mb-5 block">01</span>
              <h2 className="font-display font-bold text-white leading-none tracking-tight mb-5"
                style={{ fontSize: 'clamp(52px, 8vw, 100px)' }}>
                <Chars text="Защита" />
              </h2>
              <p className="story-body text-sm sm:text-base text-white/40 font-light leading-relaxed">
                Military-grade материалы.<br />
                Выдерживает падения с 3 метров.
              </p>
            </div>

            {/* Chapter 2 — Стиль */}
            <div ref={c1} className="absolute inset-0 flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.45em] uppercase text-white/20 font-mono mb-5 block">02</span>
              <h2 className="font-display font-bold text-white leading-none tracking-tight mb-5"
                style={{ fontSize: 'clamp(52px, 8vw, 100px)' }}>
                <Chars text="Стиль" />
              </h2>
              <p className="story-body text-sm sm:text-base text-white/40 font-light leading-relaxed">
                Более 200 моделей.<br />
                Apple, mophie, Tech21 — в одном месте.
              </p>
            </div>

            {/* Chapter 3 — Свобода */}
            <div ref={c2} className="absolute inset-0 flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.45em] uppercase text-white/20 font-mono mb-5 block">03</span>
              <h2 className="font-display font-bold text-white leading-none tracking-tight mb-5"
                style={{ fontSize: 'clamp(52px, 8vw, 100px)' }}>
                <Chars text="Свобода" />
              </h2>
              <p className="story-body text-sm sm:text-base text-white/40 font-light leading-relaxed">
                Бронируй онлайн —<br />
                забирай сегодня в ТЦ Green.
              </p>
            </div>

            {/* Chapter 4 — Твой. */}
            <div ref={c3} className="absolute inset-0 flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.45em] uppercase text-white/20 font-mono mb-5 block">04</span>
              <h2 className="font-display font-bold text-white leading-none tracking-tight mb-5"
                style={{ fontSize: 'clamp(52px, 8vw, 100px)' }}>
                <Chars text="Твой." />
              </h2>
              <p className="story-body text-sm sm:text-base text-white/40 font-light leading-relaxed">
                г. Полоцк, ул. Богдановича 14.<br />
                Каждый день 10:00–21:00
              </p>
              <Link
                href="/cases"
                className="story-cta mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors w-fit"
              >
                Выбрать чехол
                <ArrowRight size={15} />
              </Link>
            </div>

          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute right-5 sm:right-7 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="w-1 h-1 rounded-full bg-white/25" />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
          <span className="text-[9px] tracking-[0.5em] uppercase text-white/20 font-mono">Scroll</span>
          <div className="w-px h-6 bg-gradient-to-b from-white/20 to-transparent" />
        </div>

      </div>
    </div>
  )
}
