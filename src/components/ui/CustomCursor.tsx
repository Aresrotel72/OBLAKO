'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const SPRING = { damping: 25, stiffness: 300, mass: 0.5 }
const RING_SPRING = { damping: 20, stiffness: 200, mass: 0.8 }

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const magnetTarget = useRef<{ x: number; y: number } | null>(null)

  // Raw mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Dot follows tightly
  const dotX = useSpring(mouseX, SPRING)
  const dotY = useSpring(mouseX, SPRING)

  // Ring follows loosely
  const ringX = useSpring(mouseX, RING_SPRING)
  const ringY = useSpring(mouseY, RING_SPRING)

  // Ring scale
  const ringScale = useSpring(1, { damping: 20, stiffness: 300 })

  useEffect(() => {
    // Detect mobile / touch devices
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasFinePointer) {
      setIsMobile(true)
      return
    }
    setIsMobile(false)

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-magnetic]')
      if (interactive) {
        setIsHovering(true)
        ringScale.set(1.8)

        // Magnetic effect for [data-magnetic] elements
        const magnetic = target.closest('[data-magnetic]') as HTMLElement | null
        if (magnetic) {
          const rect = magnetic.getBoundingClientRect()
          magnetTarget.current = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          }
        }
      } else {
        setIsHovering(false)
        ringScale.set(1)
        magnetTarget.current = null
      }
    }

    const handleLeave = () => {
      setIsHidden(true)
    }

    const handleEnter = () => {
      setIsHidden(false)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
    }
  }, [mouseX, mouseY, dotX, dotY, ringScale])

  // Don't render on mobile/touch
  if (isMobile) return null

  return (
    <>
      {/* Global cursor hide */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHidden ? 0 : 1,
        }}
      >
        <div
          className="rounded-full bg-white"
          style={{
            width: isHovering ? 6 : 8,
            height: isHovering ? 6 : 8,
            transition: 'width 0.2s, height 0.2s',
          }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          scale: ringScale,
          opacity: isHidden ? 0 : 0.5,
        }}
      >
        <div
          className="rounded-full border border-white/60"
          style={{
            width: 36,
            height: 36,
            transition: 'border-color 0.2s',
            borderColor: isHovering ? 'rgba(0,113,227,0.6)' : 'rgba(255,255,255,0.4)',
          }}
        />
      </motion.div>
    </>
  )
}
