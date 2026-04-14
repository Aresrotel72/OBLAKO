'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'
import * as maath from 'maath/easing'

interface BlobProps {
  position: [number, number, number]
  scale: number
  speed: number
  offset: number
}

function GlassBlob({ position, scale, speed, offset }: BlobProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { pointer } = useThree()

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.3
    meshRef.current.position.x = position[0] + Math.cos(t * 0.7) * 0.15
    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.3
    meshRef.current.rotation.z = Math.cos(t * 0.3) * 0.2
    maath.damp3(
      meshRef.current.position,
      [
        position[0] + pointer.x * 0.4 + Math.cos(t * 0.7) * 0.15,
        position[1] + pointer.y * 0.3 + Math.sin(t) * 0.3,
        position[2],
      ],
      0.15,
      state.delta
    )
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshTransmissionMaterial
        backside
        samples={8}
        resolution={512}
        transmission={1}
        roughness={0.05}
        thickness={1.5}
        ior={1.5}
        chromaticAberration={0.04}
        anisotropy={0.3}
        distortion={0.2}
        distortionScale={0.5}
        temporalDistortion={0.1}
        color="#c8e4ff"
        attenuationColor="#0071e3"
        attenuationDistance={2}
      />
    </mesh>
  )
}

function Scene() {
  const blobs = useMemo(() => [
    { position: [-2.2,  0.5, 0] as [number,number,number], scale: 1.1, speed: 0.5, offset: 0    },
    { position: [ 2.0, -0.3, -0.5] as [number,number,number], scale: 0.8, speed: 0.7, offset: 2  },
    { position: [ 0.2,  1.0, -1] as [number,number,number], scale: 0.6, speed: 0.9, offset: 4    },
    { position: [-0.8, -1.0,  0.5] as [number,number,number], scale: 0.45, speed: 1.1, offset: 1 },
    { position: [ 3.0,  1.2, -1] as [number,number,number], scale: 0.55, speed: 0.6, offset: 3   },
  ], [])

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-3, 2, 2]} intensity={2} color="#0071e3" />
      <pointLight position={[3, -2, 1]} intensity={1.5} color="#5ac8fa" />
      {blobs.map((b, i) => (
        <GlassBlob key={i} {...b} />
      ))}
    </>
  )
}

export default function FluidGlass() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Scene />
    </Canvas>
  )
}
