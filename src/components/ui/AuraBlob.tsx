'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 pos = position;
    float t = uTime * 0.25;

    float n1 = snoise(pos * 1.5 + t);
    float n2 = snoise(pos * 3.0 + t * 1.3) * 0.5;
    float n3 = snoise(pos * 5.0 + t * 0.7) * 0.25;
    float displacement = (n1 + n2 + n3) * 0.4;

    // Mouse influence
    vec2 mouseDir = normalize(uMouse + vec2(0.001));
    float mouseInfluence = dot(pos.xy, mouseDir) * length(uMouse) * 0.2;
    displacement += mouseInfluence;

    // Scroll morph
    displacement *= 1.0 + uScroll * 0.5;

    vDisplacement = displacement;
    pos += normal * displacement;
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  void main() {
    vec3 viewDir = normalize(-vPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.0);

    // Light colors for dark background
    vec3 coldBlue  = vec3(0.55, 0.78, 1.0);   // #8cc7ff
    vec3 lavender  = vec3(0.68, 0.62, 1.0);   // #ae9eff
    vec3 mint      = vec3(0.55, 1.0, 0.85);   // #8cffd9
    vec3 white     = vec3(1.0, 1.0, 1.0);

    float colorMix = vDisplacement * 2.5 + 0.5;
    vec3 color = mix(coldBlue, lavender, smoothstep(0.0, 0.5, colorMix));
    color = mix(color, mint, smoothstep(0.4, 1.0, colorMix));

    // Iridescent shimmer
    float iri = sin(vPosition.x * 4.0 + vPosition.y * 3.0 + uTime * 0.6) * 0.5 + 0.5;
    color = mix(color, white, iri * 0.15);

    // Bright fresnel rim
    color += fresnel * white * 0.5;

    // Glow alpha — bright center, soft edges
    float alpha = 0.5 + fresnel * 0.4;

    gl_FragColor = vec4(color, alpha);
  }
`

export default function AuraBlob({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const scrollRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const w = container.offsetWidth || window.innerWidth
    const h = container.offsetHeight || window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Style canvas to fill container
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.inset = '0'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'

    const geometry = new THREE.IcosahedronGeometry(1.4, 48)

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Events
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.ty = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      scrollRef.current = max > 0 ? window.scrollY / max : 0
    }

    const onResize = () => {
      const cw = container.offsetWidth || window.innerWidth
      const ch = container.offsetHeight || window.innerHeight
      camera.aspect = cw / ch
      camera.updateProjectionMatrix()
      renderer.setSize(cw, ch)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    let raf: number
    const clock = new THREE.Clock()

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      uniforms.uTime.value = t

      const m = mouseRef.current
      m.x += (m.tx - m.x) * 0.04
      m.y += (m.ty - m.y) * 0.04
      uniforms.uMouse.value.set(m.x, m.y)
      uniforms.uScroll.value = scrollRef.current

      mesh.rotation.x = t * 0.06 + m.y * 0.4
      mesh.rotation.y = t * 0.1 + m.x * 0.4
      mesh.position.x += (m.x * 0.5 - mesh.position.x) * 0.025
      mesh.position.y += (m.y * 0.4 - mesh.position.y) * 0.025

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
