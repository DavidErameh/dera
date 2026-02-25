"use client";

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { useInView } from 'react-intersection-observer';
import { motion } from 'motion/react';
import * as THREE from 'three';

const OrbMesh = ({ inView }: { inView: boolean }) => {
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const originalPositions = useRef<Float32Array | null>(null);
  
  // Store original vertex positions on first render
  useMemo(() => {
    // Will be populated in useFrame on first call
  }, []);

  useFrame((state) => {
    if (!inView || !innerMeshRef.current) return;
    const time = state.clock.getElapsedTime();
    const geometry = innerMeshRef.current.geometry;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    
    // Store original positions on the first frame
    if (!originalPositions.current) {
      originalPositions.current = new Float32Array(posAttr.array.length);
      originalPositions.current.set(posAttr.array);
    }
    
    const orig = originalPositions.current;
    // Wave direction: upper-left to lower-right (normalized diagonal)
    const dirX = 1 / Math.sqrt(2);
    const dirY = -1 / Math.sqrt(2);
    
    for (let i = 0; i < posAttr.count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;
      
      const ox = orig[ix];
      const oy = orig[iy];
      const oz = orig[iz];
      
      // Project vertex onto wave direction for phase
      const projection = ox * dirX + oy * dirY;
      
      // Ripple displacement along the vertex normal (outward)
      const length = Math.sqrt(ox * ox + oy * oy + oz * oz);
      const nx = ox / length;
      const ny = oy / length;
      const nz = oz / length;
      
      const ripple = Math.sin(projection * 10 - time * 2) * 0.06;
      
      posAttr.array[ix] = ox + nx * ripple;
      posAttr.array[iy] = oy + ny * ripple;
      posAttr.array[iz] = oz + nz * ripple;
    }
    
    posAttr.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <group>
      {/* Inner Core Orb - Brand Blue with directional wave ripple */}
      <mesh ref={innerMeshRef}>
        <icosahedronGeometry args={[2.15, 48]} />
        <meshStandardMaterial
          color="#1A3FD4"
          roughness={0.35}
          metalness={0.15}
        />
      </mesh>

      {/* Outer Glass Shell - transparent light sky blue */}
      <Sphere args={[2.6, 64, 64]}>
        <meshStandardMaterial
          color="#4A6CF7"
          transparent={true}
          opacity={0.18}
          roughness={0.1}
          metalness={0.05}
          side={THREE.FrontSide}
          depthWrite={false}
        />
      </Sphere>

      {/* Second shell layer for rim/edge highlight effect */}
      <Sphere args={[2.62, 64, 64]}>
        <meshStandardMaterial
          color="#7B9BF7"
          transparent={true}
          opacity={0.08}
          roughness={0}
          metalness={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
};

const LiquidOrb = ({ className }: { className?: string }) => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <motion.div 
      ref={ref} 
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <Suspense fallback={<div className="w-full h-full bg-[#87CEEB] rounded-full opacity-20 animate-pulse" />}>
        <Canvas
          camera={{ position: [0, 0, 6] }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
        >
          {/* Cold, bright ambient + soft directional for 3D depth */}
          <ambientLight intensity={1.5} color="#D6E4FF" />
          <directionalLight position={[5, 5, 5]} intensity={1.3} color="#E0EAFF" />
          <directionalLight position={[-3, -2, 4]} intensity={0.6} color="#C8DAFF" />
          <OrbMesh inView={inView} />
        </Canvas>
      </Suspense>
    </motion.div>
  );
};

export default LiquidOrb;
