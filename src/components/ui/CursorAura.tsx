'use client'

import { useEffect, useRef } from 'react'

export default function CursorAura() {
  const blobRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -400, y: -400 })
  const cur = useRef({ x: -400, y: -400 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let raf: number
    const loop = () => {
      // Smooth lerp — капля плавно догоняет курсор
      cur.current.x += (pos.current.x - cur.current.x) * 0.055
      cur.current.y += (pos.current.y - cur.current.y) * 0.055
      if (blobRef.current) {
        blobRef.current.style.transform =
          `translate(${cur.current.x - 200}px, ${cur.current.y - 200}px) translateZ(0)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={blobRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[1] aura-blob"
    />
  )
}
