'use client'

import { useEffect, useRef, useCallback } from 'react'

/*
  OBLAKO Custom Cursor — RAF-driven, zero-lag, GPU-accelerated.

  Usage: add data-cursor attributes to elements:
    data-cursor="pointer"  — links/buttons: ring scales up, dot shrinks
    data-cursor="card"     — product cards: neon glow ring + color cycle
    data-cursor="icon"     — icons: ring explodes into particles then reforms
    data-cursor="cta"      — CTA buttons: big magnetic pull + label
    data-cursor="view"     — images/previews: ring becomes "Смотреть" label
    data-magnetic          — magnetic snap to element center
*/

// ─── Neon color palette for card hover cycling ─────────────────────────
const NEON = [
  { r: 139, g: 92,  b: 246 }, // violet
  { r: 6,   g: 182, b: 212 }, // cyan
  { r: 244, g: 63,  b: 94  }, // rose
  { r: 34,  g: 197, b: 94  }, // green
  { r: 59,  g: 130, b: 246 }, // blue
  { r: 245, g: 158, b: 11  }, // amber
]

type CursorMode = 'default' | 'pointer' | 'card' | 'icon' | 'cta' | 'view'

// ─── Particle system for icon hover ────────────────────────────────────
interface Particle {
  x: number; y: number
  vx: number; vy: number
  life: number; maxLife: number
  size: number
  color: string
}

function createParticles(cx: number, cy: number, count: number): Particle[] {
  const particles: Particle[] = []
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
    const speed = 1.5 + Math.random() * 2.5
    const colors = ['#8b5cf6', '#06b6d4', '#f43f5e', '#22c55e', '#3b82f6', '#f59e0b']
    particles.push({
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1, maxLife: 0.4 + Math.random() * 0.3,
      size: 2 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)]!,
    })
  }
  return particles
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailCanvasRef = useRef<HTMLCanvasElement>(null)

  // State refs (no re-renders)
  const mouse = useRef({ x: -100, y: -100 })
  const dotPos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const mode = useRef<CursorMode>('default')
  const prevMode = useRef<CursorMode>('default')
  const hidden = useRef(false)
  const clicking = useRef(false)
  const particles = useRef<Particle[]>([])
  const neonIndex = useRef(0)
  const neonColor = useRef(NEON[0]!)
  const neonTarget = useRef(NEON[0]!)
  const magnetTarget = useRef<{ x: number; y: number; w: number; h: number } | null>(null)
  const trail = useRef<{ x: number; y: number; age: number }[]>([])
  const velocity = useRef({ x: 0, y: 0 })
  const prevMouse = useRef({ x: -100, y: -100 })

  // ─── Detect cursor mode from DOM target ──────────────────────────────
  const detectMode = useCallback((target: HTMLElement): CursorMode => {
    const el = target.closest('[data-cursor]') as HTMLElement | null
    if (el) return (el.dataset.cursor as CursorMode) || 'pointer'

    const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-magnetic]')
    if (interactive) return 'pointer'

    return 'default'
  }, [])

  useEffect(() => {
    // Skip on touch devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current!
    const ring = ringRef.current!
    const glow = glowRef.current!
    const label = labelRef.current!
    const canvas = canvasRef.current!
    const trailCanvas = trailCanvasRef.current!
    const ctx = canvas.getContext('2d')!
    const trailCtx = trailCanvas.getContext('2d')!

    // Size canvases to viewport
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      trailCanvas.width = window.innerWidth * dpr
      trailCanvas.height = window.innerHeight * dpr
      trailCtx.scale(dpr, dpr)
      trailCanvas.style.width = window.innerWidth + 'px'
      trailCanvas.style.height = window.innerHeight + 'px'
    }
    resize()

    // ─── Event handlers ─────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const newMode = detectMode(target)

      if (newMode !== mode.current) {
        prevMode.current = mode.current
        mode.current = newMode

        // On card enter — cycle neon color
        if (newMode === 'card') {
          neonIndex.current = (neonIndex.current + 1) % NEON.length
          neonTarget.current = NEON[neonIndex.current]!
        }

        // On icon enter — spawn particles
        if (newMode === 'icon') {
          particles.current = createParticles(ringPos.current.x, ringPos.current.y, 12)
        }
      }

      // Magnetic target
      const magnetic = target.closest('[data-magnetic], [data-cursor="cta"]') as HTMLElement | null
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect()
        magnetTarget.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, w: rect.width, h: rect.height }
      } else {
        magnetTarget.current = null
      }
    }

    const onDown = () => { clicking.current = true }
    const onUp = () => { clicking.current = false }
    const onLeave = () => { hidden.current = true }
    const onEnter = () => { hidden.current = false }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    window.addEventListener('resize', resize)

    // ─── Animation loop ─────────────────────────────────────────────
    let raf: number
    const DOT_LERP = 0.18
    const RING_LERP = 0.1
    const COLOR_LERP = 0.06

    const loop = () => {
      raf = requestAnimationFrame(loop)

      const mx = mouse.current.x
      const my = mouse.current.y

      // Velocity tracking
      velocity.current.x = mx - prevMouse.current.x
      velocity.current.y = my - prevMouse.current.y
      prevMouse.current = { x: mx, y: my }
      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2)

      // ── Magnetic pull ────────────────────────────────────────────
      let targetX = mx
      let targetY = my
      if (magnetTarget.current) {
        const mt = magnetTarget.current
        const pull = mode.current === 'cta' ? 0.35 : 0.2
        targetX = mx + (mt.x - mx) * pull
        targetY = my + (mt.y - my) * pull
      }

      // ── Lerp positions ──────────────────────────────────────────
      dotPos.current.x += (targetX - dotPos.current.x) * DOT_LERP
      dotPos.current.y += (targetY - dotPos.current.y) * DOT_LERP
      ringPos.current.x += (targetX - ringPos.current.x) * RING_LERP
      ringPos.current.y += (targetY - ringPos.current.y) * RING_LERP

      // ── Trail ────────────────────────────────────────────────────
      if (speed > 1.5) {
        trail.current.push({ x: dotPos.current.x, y: dotPos.current.y, age: 0 })
        if (trail.current.length > 20) trail.current.shift()
      }

      // ── Opacity ──────────────────────────────────────────────────
      const opacity = hidden.current ? 0 : 1

      // ── Dot style ────────────────────────────────────────────────
      const dotSize = mode.current === 'default' ? 8 : mode.current === 'card' ? 4 : mode.current === 'view' ? 0 : 5
      const dotScale = clicking.current ? 0.6 : 1

      dot.style.transform = `translate(${dotPos.current.x - dotSize / 2}px, ${dotPos.current.y - dotSize / 2}px) scale(${dotScale})`
      dot.style.width = dotSize + 'px'
      dot.style.height = dotSize + 'px'
      dot.style.opacity = String(opacity)

      // ── Ring style ───────────────────────────────────────────────
      let ringSize: number
      let ringBorder: string
      let ringBg: string
      let ringOpacity: number

      // Lerp neon color
      const nc = neonColor.current
      const nt = neonTarget.current
      nc.r += (nt.r - nc.r) * COLOR_LERP
      nc.g += (nt.g - nc.g) * COLOR_LERP
      nc.b += (nt.b - nc.b) * COLOR_LERP
      const neonRgb = `${Math.round(nc.r)}, ${Math.round(nc.g)}, ${Math.round(nc.b)}`

      switch (mode.current) {
        case 'card':
          ringSize = 60 + Math.sin(Date.now() * 0.004) * 4 // Pulsing
          ringBorder = `rgba(${neonRgb}, 0.7)`
          ringBg = `rgba(${neonRgb}, 0.08)`
          ringOpacity = 1
          break
        case 'icon':
          ringSize = 50
          ringBorder = `rgba(${neonRgb}, 0.5)`
          ringBg = `rgba(${neonRgb}, 0.05)`
          ringOpacity = 0.9
          break
        case 'pointer':
          ringSize = 48
          ringBorder = 'rgba(0, 113, 227, 0.5)'
          ringBg = 'rgba(0, 113, 227, 0.04)'
          ringOpacity = 0.8
          break
        case 'cta':
          ringSize = 70
          ringBorder = 'rgba(139, 92, 246, 0.6)'
          ringBg = 'rgba(139, 92, 246, 0.08)'
          ringOpacity = 1
          break
        case 'view':
          ringSize = 80
          ringBorder = 'rgba(255,255,255, 0.3)'
          ringBg = 'rgba(0,0,0,0.5)'
          ringOpacity = 1
          break
        default:
          ringSize = 36
          ringBorder = 'rgba(255, 255, 255, 0.3)'
          ringBg = 'transparent'
          ringOpacity = 0.5
      }

      // Speed stretch
      const stretch = Math.min(speed * 0.008, 0.15)
      const angle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI)
      const scaleX = 1 + stretch
      const scaleY = 1 - stretch * 0.5
      const clickScale = clicking.current ? 0.85 : 1

      ring.style.transform = `translate(${ringPos.current.x - ringSize / 2}px, ${ringPos.current.y - ringSize / 2}px) rotate(${angle}deg) scale(${scaleX * clickScale}, ${scaleY * clickScale})`
      ring.style.width = ringSize + 'px'
      ring.style.height = ringSize + 'px'
      ring.style.borderColor = ringBorder
      ring.style.backgroundColor = ringBg
      ring.style.opacity = String(opacity * ringOpacity)

      // ── Glow (for card mode) ─────────────────────────────────────
      if (mode.current === 'card') {
        const glowSize = 120 + Math.sin(Date.now() * 0.003) * 15
        glow.style.transform = `translate(${ringPos.current.x - glowSize / 2}px, ${ringPos.current.y - glowSize / 2}px)`
        glow.style.width = glowSize + 'px'
        glow.style.height = glowSize + 'px'
        glow.style.background = `radial-gradient(circle, rgba(${neonRgb}, 0.2) 0%, rgba(${neonRgb}, 0.05) 40%, transparent 70%)`
        glow.style.opacity = String(opacity)
      } else {
        glow.style.opacity = '0'
      }

      // ── Label (for view mode) ────────────────────────────────────
      if (mode.current === 'view') {
        label.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
        label.style.opacity = String(opacity)
      } else {
        label.style.opacity = '0'
      }

      // ── Draw particles ───────────────────────────────────────────
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const dt = 1 / 60

      particles.current = particles.current.filter(p => {
        p.life -= dt / p.maxLife
        if (p.life <= 0) return false
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.96
        p.vy *= 0.96

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.life * 0.8
        ctx.fill()
        ctx.globalAlpha = 1
        return true
      })

      // ── Draw trail ───────────────────────────────────────────────
      trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height)

      for (let i = trail.current.length - 1; i >= 0; i--) {
        const t = trail.current[i]!
        t.age += 0.04
        if (t.age >= 1) {
          trail.current.splice(i, 1)
          continue
        }
        const alpha = (1 - t.age) * 0.3
        const size = (1 - t.age) * 4

        trailCtx.beginPath()
        trailCtx.arc(t.x, t.y, size, 0, Math.PI * 2)
        if (mode.current === 'card') {
          trailCtx.fillStyle = `rgba(${neonRgb}, ${alpha})`
        } else {
          trailCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        }
        trailCtx.fill()
      }
    }

    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('resize', resize)
    }
  }, [detectMode])

  return (
    <>
      {/* Hide native cursor */}
      <style>{`@media (pointer: fine) { * { cursor: none !important; } }`}</style>

      {/* Trail canvas */}
      <canvas
        ref={trailCanvasRef}
        className="fixed inset-0 z-[9996] pointer-events-none"
        aria-hidden
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9997] pointer-events-none"
        aria-hidden
      />

      {/* Neon glow (card mode) */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full opacity-0"
        style={{ transition: 'opacity 0.3s', filter: 'blur(25px)' }}
        aria-hidden
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border-2 backdrop-blur-[1px]"
        style={{ transition: 'width 0.25s, height 0.25s, border-color 0.3s, background-color 0.3s, opacity 0.2s' }}
        aria-hidden
      />

      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-white mix-blend-difference"
        style={{ transition: 'width 0.2s, height 0.2s, opacity 0.2s' }}
        aria-hidden
      />

      {/* Label (view mode) */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none opacity-0"
        style={{ transition: 'opacity 0.25s' }}
        aria-hidden
      >
        <span className="text-[11px] font-bold text-white tracking-wider uppercase">
          Смотреть
        </span>
      </div>
    </>
  )
}
