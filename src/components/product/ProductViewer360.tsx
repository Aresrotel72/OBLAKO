'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'

interface ProductViewer360Props {
  images: string[]       // URL кадров (пусто → placeholder)
  productName: string
  autoPlay?: boolean     // медленная авто-ротация
}

const FRAME_PX = 8       // пикселей на смену кадра
const AUTO_INTERVAL = 80 // мс между кадрами при авто-ротации

export default function ProductViewer360({ images, productName, autoPlay = true }: ProductViewer360Props) {
  const hasImages = images.length > 0
  const total = hasImages ? images.length : 36

  const [frame, setFrame] = useState(0)
  const [interacted, setInteracted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const dragging = useRef(false)
  const startX = useRef(0)
  const accumX = useRef(0)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // --- Авто-ротация ---
  function startAuto() {
    if (!autoPlay || interacted) return
    autoRef.current = setInterval(() => {
      setFrame((f) => (f + 1) % total)
    }, AUTO_INTERVAL)
  }
  function stopAuto() {
    if (autoRef.current) {
      clearInterval(autoRef.current)
      autoRef.current = null
    }
  }

  useEffect(() => {
    if (!interacted) startAuto()
    return stopAuto
  }, [interacted]) // eslint-disable-line react-hooks/exhaustive-deps

  // --- Drag ---
  const onDragStart = useCallback((x: number) => {
    dragging.current = true
    startX.current = x
    accumX.current = 0
    stopAuto()
    if (!interacted) setInteracted(true)
  }, [interacted])

  const onDragMove = useCallback((x: number) => {
    if (!dragging.current) return
    accumX.current += x - startX.current
    startX.current = x
    const steps = Math.floor(Math.abs(accumX.current) / FRAME_PX)
    if (steps > 0) {
      const dir = accumX.current > 0 ? 1 : -1
      setFrame((f) => ((f + dir * steps) % total + total) % total)
      accumX.current = accumX.current % FRAME_PX
    }
  }, [total])

  const onDragEnd = useCallback(() => {
    dragging.current = false
  }, [])

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => onDragStart(e.clientX)
  const onMouseMove = (e: React.MouseEvent) => onDragMove(e.clientX)
  const onMouseUp = () => onDragEnd()
  const onMouseLeave = () => onDragEnd()

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => onDragStart(e.touches[0].clientX)
  const onTouchMove = (e: React.TouchEvent) => { e.preventDefault(); onDragMove(e.touches[0].clientX) }
  const onTouchEnd = () => onDragEnd()

  // Preload first image
  useEffect(() => {
    if (!hasImages) { setIsLoaded(true); return }
    const img = new Image()
    img.src = images[0]
    img.onload = () => setIsLoaded(true)
  }, [hasImages, images])

  return (
    <div className="relative w-full select-none">
      {/* Основной контейнер */}
      <div
        ref={containerRef}
        className="relative aspect-square w-full rounded-2xl overflow-hidden bg-background-secondary border border-border cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: 'none' }}
      >
        {hasImages ? (
          /* ─── Реальные изображения ─── */
          <>
            {images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={i === 0 ? productName : ''}
                draggable={false}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-75 ${
                  i === frame ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              />
            ))}
            {!isLoaded && (
              <div className="absolute inset-0 skeleton" />
            )}
          </>
        ) : (
          /* ─── Placeholder ─── */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            {/* Анимированное кольцо */}
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full border-2 border-black/5" />
              <div
                className="absolute inset-0 rounded-full border-2 border-t-[#0071e3] border-r-[#0071e3]/30 border-b-transparent border-l-transparent"
                style={{
                  transform: `rotate(${frame * (360 / total)}deg)`,
                  transition: 'transform 60ms linear',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl">📦</span>
              </div>
            </div>
            <p className="text-xs text-foreground-muted">Фото появятся скоро</p>
          </div>
        )}

        {/* 360° бейдж */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-black/8 shadow-sm">
          <RotateCcw size={10} className="text-[#0071e3]" />
          <span className="text-[10px] font-medium text-foreground tracking-wide">360°</span>
        </div>

        {/* Подсказка (исчезает после взаимодействия) */}
        {!interacted && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-black/8 shadow-sm pointer-events-none">
            <span className="text-xs text-foreground-muted">↔ Перетащи для поворота</span>
          </div>
        )}
      </div>

      {/* Индикатор кадра */}
      {hasImages && (
        <div className="mt-2 flex justify-center">
          <div className="flex gap-1">
            {Array.from({ length: Math.min(total, 12) }).map((_, i) => {
              const sectionSize = total / 12
              const active = Math.floor(frame / sectionSize) === i
              return (
                <div
                  key={i}
                  className={`h-0.5 rounded-full transition-all duration-150 ${
                    active ? 'w-4 bg-[#8b5cf6]' : 'w-2 bg-white/15'
                  }`}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
