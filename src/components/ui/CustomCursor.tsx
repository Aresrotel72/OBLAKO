'use client'

import { useEffect, useRef } from 'react'

/*
  OBLAKO Cursor — невидимый, но оставляет след:
  1. Тёмное пятно (multiply) — мягкая тень под курсором
  2. Синий ореол снаружи — едва заметный свет по краям
  Курсор = невидим, вся магия через blend-mode
*/

export default function CustomCursor() {
  const shadowRef = useRef<HTMLDivElement>(null)
  const haloRef   = useRef<HTMLDivElement>(null)

  const pos        = useRef({ x: -500, y: -500 })
  const shadowPos  = useRef({ x: -500, y: -500 })
  const haloPos    = useRef({ x: -500, y: -500 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      document.documentElement.style.setProperty('--cx', `${e.clientX}px`)
      document.documentElement.style.setProperty('--cy', `${e.clientY}px`)
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    let raf: number
    const loop = () => {
      raf = requestAnimationFrame(loop)

      // Тёмное пятно — быстро
      shadowPos.current.x += (pos.current.x - shadowPos.current.x) * 0.15
      shadowPos.current.y += (pos.current.y - shadowPos.current.y) * 0.15

      // Синий ореол — медленнее, создаёт глубину
      haloPos.current.x += (pos.current.x - haloPos.current.x) * 0.06
      haloPos.current.y += (pos.current.y - haloPos.current.y) * 0.06

      if (shadowRef.current) {
        shadowRef.current.style.transform =
          `translate(${shadowPos.current.x}px, ${shadowPos.current.y}px) translate(-50%, -50%)`
      }
      if (haloRef.current) {
        haloRef.current.style.transform =
          `translate(${haloPos.current.x}px, ${haloPos.current.y}px) translate(-50%, -50%)`
      }
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <style>{`@media (pointer: fine) { * { cursor: none !important; } }`}</style>

      {/* Синий ореол — большой, медленный, едва заметный */}
      <div
        ref={haloRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[2]"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0,113,227,0.07) 0%, rgba(0,113,227,0.03) 40%, transparent 70%)',
          willChange: 'transform',
        }}
      />

      {/* Тёмное пятно — быстрое, деликатное, создаёт тень */}
      <div
        ref={shadowRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[3]"
        style={{
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.05) 45%, transparent 70%)',
          mixBlendMode: 'multiply',
          filter: 'blur(12px)',
          willChange: 'transform',
        }}
      />
    </>
  )
}
