"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
        // Rotate based on time
        meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        
        // Slight mouse interaction (parallax)
        const { x, y } = state.mouse;
        meshRef.current.rotation.x += y * 0.01;
        meshRef.current.rotation.y += x * 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={2.5}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#3A86FF"
          emissive="#00F5FF"
          emissiveIntensity={0.5}
          wireframe
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-60">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} color="#FF006E" />
        <directionalLight position={[-2, -5, -2]} intensity={1} color="#00F5FF" />
        <AnimatedShape />
      </Canvas>
    </div>
  );
}
