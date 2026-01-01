"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

function AnimatedStars() {
  const starsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      starsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group ref={starsRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

function CyberGrid() {
    return (
        <gridHelper args={[100, 50, 0xff006e, 0x3a86ff]} position={[0, -5, 0]} />
    )
}

function Fog() {
    return <fog attach="fog" args={['#0A0E27', 5, 30]} />
}


export default function BackgroundScene() {
  useEffect(() => {
    // Suppress Three.js warnings during hot reloads
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (args[0]?.includes?.('THREE.WebGLRenderer') || 
          args[0]?.includes?.('WebGL context')) {
        return;
      }
      originalWarn.apply(console, args);
    };
    
    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-dark-bg">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0A0E27');
        }}
      >
        <Fog />
        <ambientLight intensity={1.0} />
        <AnimatedStars />
        <Sparkles count={200} size={3} speed={0.2} opacity={0.5} scale={20} color="#00F5FF" />
        <CyberGrid />
      </Canvas>
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0E27_100%)] opacity-40" />
    </div>
  );
}
