'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface Props {
  productName: string
}

export default function ProductViewer3D({ productName }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [interacted, setInteracted] = useState(false)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.clientWidth
    const h = mount.clientHeight

    // ── Scene ──
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0d0d0f)

    // Fog для глубины
    scene.fog = new THREE.FogExp2(0x0d0d0f, 0.18)

    // ── Camera ──
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100)
    camera.position.set(0, 0.3, 5)

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    mount.appendChild(renderer.domElement)

    // ── Phone group ──
    const group = new THREE.Group()
    scene.add(group)

    // Корпус телефона (чуть закруглённый видом — используем BoxGeometry)
    const bodyGeo = new THREE.BoxGeometry(1.5, 3.0, 0.18)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1c1c1e,
      metalness: 0.85,
      roughness: 0.15,
    })
    const body = new THREE.Mesh(bodyGeo, bodyMat)
    body.castShadow = true
    group.add(body)

    // Боковая рамка — чуть светлее
    const frameGeo = new THREE.BoxGeometry(1.52, 3.02, 0.16)
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x2d2d30,
      metalness: 0.9,
      roughness: 0.1,
    })
    const frame = new THREE.Mesh(frameGeo, frameMat)
    frame.position.z = -0.01
    group.add(frame)

    // Экран
    const screenGeo = new THREE.BoxGeometry(1.3, 2.6, 0.02)
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x000005,
      emissive: new THREE.Color(0x0a1025),
      emissiveIntensity: 0.6,
      metalness: 0.0,
      roughness: 0.05,
    })
    const screen = new THREE.Mesh(screenGeo, screenMat)
    screen.position.z = 0.1
    group.add(screen)

    // Dynamic Island
    const islandGeo = new THREE.CapsuleGeometry(0.065, 0.18, 8, 16)
    const islandMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.3 })
    const island = new THREE.Mesh(islandGeo, islandMat)
    island.rotation.z = Math.PI / 2
    island.position.set(0, 1.1, 0.12)
    group.add(island)

    // Камера сзади (кружок)
    const camGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.04, 32)
    const camMat = new THREE.MeshStandardMaterial({ color: 0x111115, metalness: 0.6, roughness: 0.3 })
    const camMesh = new THREE.Mesh(camGeo, camMat)
    camMesh.rotation.x = Math.PI / 2
    camMesh.position.set(-0.35, 1.0, -0.1)
    group.add(camMesh)

    const camLensGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.06, 32)
    const camLensMat = new THREE.MeshStandardMaterial({ color: 0x050510, metalness: 0.1, roughness: 0.05 })
    const camLens = new THREE.Mesh(camLensGeo, camLensMat)
    camLens.rotation.x = Math.PI / 2
    camLens.position.set(-0.35, 1.0, -0.12)
    group.add(camLens)

    // Кнопка сбоку
    const btnGeo = new THREE.BoxGeometry(0.04, 0.28, 0.06)
    const btnMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2e, metalness: 0.9, roughness: 0.1 })
    const btn = new THREE.Mesh(btnGeo, btnMat)
    btn.position.set(0.77, 0.2, 0)
    group.add(btn)

    // ── Свет ──
    const ambient = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambient)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5)
    keyLight.position.set(3, 5, 6)
    keyLight.castShadow = true
    scene.add(keyLight)

    // Синий акцентный свет (фирменный OBLAKO)
    const blueLight = new THREE.PointLight(0x0071e3, 4, 12)
    blueLight.position.set(-4, 2, 4)
    scene.add(blueLight)

    // Холодный риминг свет сзади
    const rimLight = new THREE.PointLight(0x4488ff, 2, 10)
    rimLight.position.set(4, -3, -4)
    scene.add(rimLight)

    // Тёплый снизу
    const bottomLight = new THREE.PointLight(0xffeedd, 0.5, 8)
    bottomLight.position.set(0, -4, 3)
    scene.add(bottomLight)

    // ── Вращение ──
    let autoRotate = true
    let isDragging = false
    let prevX = 0
    let prevY = 0
    let targetRotY = 0
    let targetRotX = 0.1
    let t = 0

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true
      autoRotate = false
      prevX = e.clientX
      prevY = e.clientY
      setInteracted(true)
      mount.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return
      const dx = e.clientX - prevX
      const dy = e.clientY - prevY
      targetRotY += dx * 0.012
      targetRotX += dy * 0.006
      targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX))
      prevX = e.clientX
      prevY = e.clientY
    }

    const onPointerUp = () => { isDragging = false }

    mount.addEventListener('pointerdown', onPointerDown)
    mount.addEventListener('pointermove', onPointerMove)
    mount.addEventListener('pointerup', onPointerUp)
    mount.addEventListener('pointercancel', onPointerUp)

    // ── Animation loop ──
    let animId: number

    const animate = () => {
      animId = requestAnimationFrame(animate)
      t += 0.008

      if (autoRotate) {
        group.rotation.y = t * 0.6
        group.rotation.x = Math.sin(t * 0.4) * 0.12
      } else {
        group.rotation.y += (targetRotY - group.rotation.y) * 0.12
        group.rotation.x += (targetRotX - group.rotation.x) * 0.12
      }

      // Пульсация синего света
      blueLight.intensity = 3.5 + Math.sin(t * 1.2) * 0.8

      renderer.render(scene, camera)
    }

    animate()

    // ── Resize ──
    const observer = new ResizeObserver(() => {
      if (!mount) return
      const nw = mount.clientWidth
      const nh = mount.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    })
    observer.observe(mount)

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(animId)
      observer.disconnect()
      mount.removeEventListener('pointerdown', onPointerDown)
      mount.removeEventListener('pointermove', onPointerMove)
      mount.removeEventListener('pointerup', onPointerUp)
      mount.removeEventListener('pointercancel', onPointerUp)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
      ;[bodyGeo, frameGeo, screenGeo, islandGeo, camGeo, camLensGeo, btnGeo].forEach(g => g.dispose())
      ;[bodyMat, frameMat, screenMat, islandMat, camMat, camLensMat, btnMat].forEach(m => m.dispose())
    }
  }, [])

  return (
    <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-border cursor-grab active:cursor-grabbing select-none">
      <div ref={mountRef} className="w-full h-full" style={{ touchAction: 'none' }} />

      {/* Бейдж */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-black/8 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] animate-pulse" />
        <span className="text-[10px] font-medium text-foreground tracking-wide">3D</span>
      </div>

      {/* Подсказка */}
      {!interacted && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-black/8 shadow-sm pointer-events-none whitespace-nowrap">
          <span className="text-xs text-foreground-muted">↔ Перетащи для поворота</span>
        </div>
      )}
    </div>
  )
}
