"use client";

import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect, Suspense, Component, ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { TrackballControls, Image as DreiImage, Billboard, Text } from '@react-three/drei'
import { getTechIconUrl } from '@/lib/techMap'

class Catch extends Component<{ fallback: ReactNode, children: ReactNode }, { error: boolean }> {
  state = { error: false }
  static getDerivedStateFromError() { return { error: true } }
  componentDidCatch(error: any) {
      // Suppress logs for expected errors
  }
  render() {
    if (this.state.error) return this.props.fallback
    return this.props.children
  }
}

function SkillIcon({ position, skill }: { position: THREE.Vector3, skill: string }) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false)
  const over = (e: any) => (e.stopPropagation(), setHovered(true))
  const out = () => setHovered(false)
  
  const iconUrl = useMemo(() => getTechIconUrl(skill), [skill]);

  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer'
    return () => { document.body.style.cursor = 'auto' }
  }, [hovered])

  useFrame(({ camera }) => {
     if (ref.current) {
        ref.current.quaternion.copy(camera.quaternion)
     }
  })

  // If we have a valid icon URL, render the icon with a fallback to text on error
  if (iconUrl) {
      return (
        <group ref={ref} position={position}>
            <Catch fallback={
                <Billboard>
                    <Text 
                        fontSize={2.5} 
                        color={hovered ? "#00F5FF" : "#3A86FF"} // Cyan on hover, Blue default
                        font="/fonts/Orbitron-Bold.woff"
                        onPointerOver={over} 
                        onPointerOut={out}
                        outlineWidth={0.02}
                        outlineColor="black"
                    >
                        {skill}
                    </Text>
                </Billboard>
            }>
                <DreiImage 
                    url={iconUrl} 
                    transparent 
                    side={THREE.DoubleSide}
                    toneMapped={false}
                    scale={hovered ? 6 : 5} 
                    onPointerOver={over} 
                    onPointerOut={out}
                />
            </Catch>
            {/* Tooltip for icon */}
            {hovered && (
                <Billboard position={[0, -3.5, 0]}>
                    <Text 
                        fontSize={1} 
                        color="white" 
                        font="/fonts/Orbitron-Bold.woff"
                        outlineWidth={0.05}
                        outlineColor="#000000"
                    >
                        {skill.toUpperCase()}
                    </Text>
                </Billboard>
            )}
        </group>
      )
  }

  // If no icon URL, render as 3D Text directly (Abstract skills)
  return (
    <group ref={ref} position={position}>
        <Billboard>
            <Text 
                fontSize={2.5} 
                color={hovered ? "#FF006E" : "white"}
                font="/fonts/Orbitron-Bold.woff"
                onPointerOver={over} 
                onPointerOut={out}
                outlineWidth={0.02}
                outlineColor="#000000"
            >
                {skill}
            </Text>
        </Billboard>
    </group>
  )
}

function Cloud({ count = 4, radius = 20, skills = [] }: { count?: number, radius?: number, skills?: string[] }) {
  const words = useMemo(() => {
    const temp = []
    const spherical = new THREE.Spherical()
    const phiSpan = Math.PI / (count + 1)
    const thetaSpan = (Math.PI * 2) / count
    
    if (skills.length === 0) return [];

    let k = 0;
    // We want to distribute all skills in the cloud. 
    // If skills.length is large, we might need more points than count*count.
    // For now, we'll keep the grid distribution but ensure we use the skills we have.
    const totalPoints = count * count;
    
    for (let i = 1; i < count + 1; i++) {
      for (let j = 0; j < count; j++) {
        temp.push([
            new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), 
            skills[k % skills.length]
        ])
        k++;
      }
    }
    return temp
  }, [count, radius, skills])
  
  return (
      <>
        {words.map(([pos, word], index) => (
            <SkillIcon key={index} position={pos as THREE.Vector3} skill={word as string} />
        ))}
      </>
  )
}

export default function SkillsCloud({ skills }: { skills?: string[] }) {
  return (
    <div className="h-[600px] w-full cursor-move">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
            <fog attach="fog" args={['#202025', 0, 80]} />
            <Suspense fallback={null}>
                <Cloud count={5} radius={20} skills={skills} />
            </Suspense>
            <TrackballControls noZoom />
        </Canvas>
    </div>
  )
}
