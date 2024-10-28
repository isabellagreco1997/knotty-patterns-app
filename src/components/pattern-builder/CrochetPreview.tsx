import React, { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import type { Round } from '../../types/pattern';

interface CrochetPreviewProps {
  rounds: Round[];
  currentRound: Round;
}

function calculateRoundRadius(round: Round, baseRadius: number): number {
  let radius = baseRadius;
  round.stitches.forEach(stitch => {
    if (stitch.type === 'inc') {
      radius *= 1.15; // Increase radius for inc stitches
    } else if (stitch.type === 'dec') {
      radius *= 0.85; // Decrease radius for dec stitches
    }
  });
  return radius;
}

function AmigurumiMesh({ rounds }: { rounds: Round[] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    if (!rounds || rounds.length === 0) return new THREE.BufferGeometry();

    const vertices: number[] = [];
    const indices: number[] = [];
    const normals: number[] = [];
    
    const segmentsPerRound = 32;
    const roundHeight = 0.15; // Height per round
    const initialRadius = 0.3; // Starting radius for magic ring
    
    let currentRadius = initialRadius;
    let lastRingVertices: number[] = [];
    let currentHeight = 0;

    // Create vertices for each round
    rounds.forEach((round, roundIndex) => {
      if (round.isText) return; // Skip text-only rounds

      const nextRingVertices: number[] = [];
      
      // Calculate radius based on increases/decreases
      if (roundIndex > 0) {
        currentRadius = calculateRoundRadius(round, currentRadius);
      }

      // Create vertices for current round
      for (let i = 0; i <= segmentsPerRound; i++) {
        const theta = (i / segmentsPerRound) * Math.PI * 2;
        const x = Math.cos(theta) * currentRadius;
        const z = Math.sin(theta) * currentRadius;
        
        // Add slight randomness for organic feel
        const jitter = 0.02;
        const rx = (Math.random() - 0.5) * jitter;
        const ry = (Math.random() - 0.5) * jitter;
        const rz = (Math.random() - 0.5) * jitter;
        
        vertices.push(x + rx, currentHeight + ry, z + rz);
        
        // Calculate normal for smooth shading
        const normal = new THREE.Vector3(x, 0, z).normalize();
        normals.push(normal.x, normal.y, normal.z);
        
        nextRingVertices.push(vertices.length / 3 - 1);
      }

      // Create faces between current and last ring
      if (roundIndex > 0 && lastRingVertices.length > 0) {
        for (let i = 0; i < segmentsPerRound; i++) {
          const v0 = lastRingVertices[i];
          const v1 = lastRingVertices[i + 1];
          const v2 = nextRingVertices[i];
          const v3 = nextRingVertices[i + 1];

          // Create two triangles for each quad
          indices.push(v0, v1, v2);
          indices.push(v2, v1, v3);
        }
      }

      lastRingVertices = nextRingVertices;
      currentHeight += roundHeight;
    });

    // Create geometry and set attributes
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }, [rounds]);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhongMaterial 
        color="#7C3AED"
        shininess={5}
        flatShading={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function CrochetPreview({ rounds, currentRound }: CrochetPreviewProps) {
  const isMagicRing = rounds && rounds.length > 0 && rounds[0].notes?.toLowerCase().includes('magic ring');

  if (!isMagicRing) {
    return (
      <div className="w-full h-[400px] bg-neutral-50 rounded-lg flex items-center justify-center">
        <p className="text-neutral-500 text-center px-4">
          3D preview is only available for patterns that start with a magic ring.
          <br />
          <span className="text-sm">
            This helps ensure accurate visualization of amigurumi projects.
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] bg-neutral-50 rounded-lg overflow-hidden relative">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 4]} />
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
        />
        
        <color attach="background" args={['#f8fafc']} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <hemisphereLight intensity={0.3} />
        
        <group rotation={[0, Math.PI / 6, 0]} position={[0, -1, 0]}>
          <AmigurumiMesh rounds={rounds} />
        </group>
      </Canvas>

      <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg p-2 text-sm text-neutral-600">
        <p>Mouse controls:</p>
        <ul className="text-xs">
          <li>Left click + drag: Rotate</li>
          <li>Right click + drag: Pan</li>
          <li>Scroll: Zoom</li>
        </ul>
      </div>
    </div>
  );
}