import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BRAND } from '../../data/company';

/**
 * Industrial haze: a field of slow-drifting motes catching the orange key light.
 * Kept lightweight (a single Points cloud) so it's cheap on mid-range GPUs.
 */
export function Particles({ count = 220, animate = true }: { count?: number; animate?: boolean }) {
  const points = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = Math.random() * 7 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 1;
      speeds[i] = 0.1 + Math.random() * 0.3;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    if (!animate || !points.current) return;
    const arr = points.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = arr.getY(i) + speeds[i] * delta * 0.35;
      if (y > 6.5) y = -1;
      arr.setY(i, y);
    }
    arr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color={BRAND.colors.amber}
        transparent
        opacity={0.55}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/** Dark ground plane with a subtle reflective sheen under the tanker. */
export function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]} receiveShadow>
      <planeGeometry args={[60, 40]} />
      <meshStandardMaterial color={'#0a0b0d'} roughness={0.55} metalness={0.4} />
    </mesh>
  );
}
