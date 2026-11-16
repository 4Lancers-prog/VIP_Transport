import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BRAND } from '../../data/company';

/**
 * An original petroleum tanker built entirely from three.js primitives.
 *
 * Why primitives instead of a downloaded GLTF: no licensing ambiguity, no heavy
 * asset to fetch, and it reads unmistakably as a *fuel tanker* (cab-over tractor
 * + horizontal cylindrical tank + multi-axle bogie) rather than a generic van.
 *
 * The brand name is painted onto the tank as a CanvasTexture decal — a subtle,
 * swappable stand-in for the real logo (see note on the decal below).
 */

const ORANGE = new THREE.Color(BRAND.colors.orange);
const STEEL = new THREE.Color('#c9ccd1');
const DARK = new THREE.Color('#1a1d22');
const TIRE = new THREE.Color('#0c0d0f');

/** Canvas-painted decal for the tank side. Replace with the real logo texture. */
function useTankDecal(): THREE.CanvasTexture | null {
  return useMemo(() => {
    if (typeof document === 'undefined') return null;
    const w = 1024;
    const h = 256;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Brushed-steel base so the tank still looks metallic where there's no ink.
    ctx.fillStyle = '#c9ccd1';
    ctx.fillRect(0, 0, w, h);

    // Orange band.
    ctx.fillStyle = BRAND.colors.orange;
    ctx.fillRect(0, h * 0.34, w, h * 0.32);

    // Wordmark (placeholder for the supplied logo artwork).
    ctx.fillStyle = '#111111';
    ctx.font = '700 120px Arial, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    // letterSpacing is supported in modern canvas 2D contexts; guard the
    // assignment so it's type-safe on any TS lib version and a no-op where
    // the runtime doesn't support it.
    (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = '8px';
    ctx.fillText('VIP TRANSPORT', w / 2, h / 2);

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 4;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

interface WheelProps {
  position: [number, number, number];
}

function Wheel({ position }: WheelProps) {
  return (
    <group position={position} rotation={[0, 0, Math.PI / 2]}>
      {/* Tire */}
      <mesh castShadow>
        <cylinderGeometry args={[0.52, 0.52, 0.34, 28]} />
        <meshStandardMaterial color={TIRE} roughness={0.9} metalness={0.1} />
      </mesh>
      {/* Hub */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.36, 18]} />
        <meshStandardMaterial color={STEEL} roughness={0.35} metalness={0.8} />
      </mesh>
    </group>
  );
}

interface TankerModelProps {
  /** Spin the wheels / idle bob. Disabled for the reduced-motion poster. */
  animate?: boolean;
}

export function TankerModel({ animate = true }: TankerModelProps) {
  const group = useRef<THREE.Group>(null);
  const decal = useTankDecal();

  // Wheel positions: front steer axle on the tractor + tandem bogies.
  const wheelRows = useMemo(() => {
    const rows: [number, number, number][] = [];
    const z = 0.92; // half track width
    const axleX = [3.1, 0.2, -0.8, -3.0, -3.8]; // tractor front, drive tandem, trailer tandem
    axleX.forEach((x) => {
      rows.push([x, -0.52, z]);
      rows.push([x, -0.52, -z]);
    });
    return rows;
  }, []);

  useFrame((state) => {
    if (!animate || !group.current) return;
    const t = state.clock.elapsedTime;
    // Very subtle idle float so the parked truck feels alive, not frozen.
    group.current.position.y = Math.sin(t * 0.8) * 0.015;
  });

  return (
    <group ref={group} dispose={null}>
      {/* ---- TRACTOR UNIT ---------------------------------------------- */}
      {/* Chassis rail */}
      <mesh position={[1.6, -0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.25, 1.5]} />
        <meshStandardMaterial color={DARK} roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Cab body */}
      <mesh position={[2.9, 0.55, 0]} castShadow>
        <boxGeometry args={[1.5, 1.5, 1.8]} />
        <meshStandardMaterial color={ORANGE} roughness={0.35} metalness={0.3} />
      </mesh>
      {/* Cab roof fairing */}
      <mesh position={[2.75, 1.45, 0]} castShadow>
        <boxGeometry args={[1.0, 0.35, 1.7]} />
        <meshStandardMaterial color={ORANGE} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Windscreen */}
      <mesh position={[3.63, 0.75, 0]} rotation={[0, 0, -0.18]} castShadow>
        <boxGeometry args={[0.08, 0.8, 1.55]} />
        <meshStandardMaterial
          color={'#0a0f14'}
          roughness={0.1}
          metalness={0.6}
          emissive={'#0b1b2a'}
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Grille / bumper */}
      <mesh position={[3.72, 0.0, 0]} castShadow>
        <boxGeometry args={[0.12, 0.6, 1.7]} />
        <meshStandardMaterial color={STEEL} roughness={0.4} metalness={0.85} />
      </mesh>
      {/* Headlights */}
      {[-0.6, 0.6].map((z) => (
        <mesh key={z} position={[3.78, 0.15, z]}>
          <boxGeometry args={[0.06, 0.18, 0.3]} />
          <meshStandardMaterial
            color={'#fff6e0'}
            emissive={'#ffd27a'}
            emissiveIntensity={1.4}
          />
        </mesh>
      ))}
      {/* Exhaust stack */}
      <mesh position={[2.1, 0.9, -0.85]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 1.9, 12]} />
        <meshStandardMaterial color={STEEL} roughness={0.3} metalness={0.9} />
      </mesh>

      {/* ---- TANK TRAILER ---------------------------------------------- */}
      {/* Horizontal cylindrical petroleum tank */}
      <mesh position={[-1.4, 0.35, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.95, 0.95, 5.4, 40]} />
        <meshStandardMaterial
          color={STEEL}
          roughness={0.28}
          metalness={0.85}
          envMapIntensity={0.8}
        />
      </mesh>
      {/* End caps (domed) */}
      {[1.3, -4.1].map((x) => (
        <mesh key={x} position={[x, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
          <sphereGeometry args={[0.95, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={STEEL} roughness={0.3} metalness={0.85} />
        </mesh>
      ))}
      {/* Decal band on the tank (front-facing +Z side) */}
      {decal && (
        <mesh position={[-1.4, 0.4, 0.955]} rotation={[0, 0, 0]}>
          <planeGeometry args={[4.6, 1.15]} />
          <meshStandardMaterial
            map={decal}
            roughness={0.4}
            metalness={0.2}
            transparent
          />
        </mesh>
      )}
      {/* Baffle rings for a tanker read */}
      {[-0.1, -1.4, -2.7].map((x) => (
        <mesh key={x} position={[x, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.96, 0.05, 10, 40]} />
          <meshStandardMaterial color={DARK} roughness={0.5} metalness={0.5} />
        </mesh>
      ))}
      {/* Top manway hatches */}
      {[-0.2, -1.5, -2.8].map((x) => (
        <mesh key={x} position={[x, 1.28, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.14, 16]} />
          <meshStandardMaterial color={DARK} roughness={0.5} metalness={0.6} />
        </mesh>
      ))}
      {/* Trailer underframe */}
      <mesh position={[-1.4, -0.3, 0]} castShadow>
        <boxGeometry args={[5.2, 0.16, 1.1]} />
        <meshStandardMaterial color={DARK} roughness={0.7} metalness={0.3} />
      </mesh>
      {/* Rear underrun bar */}
      <mesh position={[-4.3, -0.55, 0]}>
        <boxGeometry args={[0.1, 0.5, 1.4]} />
        <meshStandardMaterial color={STEEL} roughness={0.5} metalness={0.7} />
      </mesh>

      {/* ---- WHEELS ---------------------------------------------------- */}
      {wheelRows.map((p, i) => (
        <Wheel key={i} position={p} />
      ))}
    </group>
  );
}
