import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from '../../lib/gsap';
import { TankerModel } from './TankerModel';
import { Particles, Ground } from './Atmosphere';
import { BRAND } from '../../data/company';

/**
 * Cinematic camera intro. On mount the camera starts far, low and dark, then
 * eases in to settle the tanker into a 3/4 composition. Skipped when reduced
 * motion is requested — the camera just starts at its final resting pose.
 */
function CameraIntro({ enabled }: { enabled: boolean }) {
  const { camera } = useThree();
  const done = useRef(false);

  useEffect(() => {
    const rest = { x: 6.2, y: 1.9, z: 7.4 };
    if (!enabled || done.current) {
      camera.position.set(rest.x, rest.y, rest.z);
      camera.lookAt(0, 0.3, 0);
      return;
    }
    done.current = true;

    camera.position.set(11.5, 0.6, 12.5);
    camera.lookAt(0, 0.3, 0);

    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
    tl.to(camera.position, { x: rest.x, y: rest.y, z: rest.z, duration: 3.4 }, 0);
    tl.eventCallback('onUpdate', () => camera.lookAt(0, 0.3, 0));

    return () => {
      tl.kill();
    };
  }, [camera, enabled]);

  return null;
}

interface HeroSceneProps {
  /** false under prefers-reduced-motion: static pose, no particles, no idle. */
  animate?: boolean;
  onReady?: () => void;
}

export function HeroScene({ animate = true, onReady }: HeroSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
      camera={{ fov: 38, near: 0.1, far: 100, position: [6.2, 1.9, 7.4] }}
      onCreated={({ scene, gl }) => {
        scene.fog = new THREE.FogExp2(0x0a0a0c, 0.045);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        onReady?.();
      }}
    >
      {/* Key light — warm orange rim, the "thin orange light" of the brief.
          No dynamic shadow map here (the grounded shadow comes from the baked
          ContactShadows below) — that removes a full render pass each frame. */}
      <spotLight
        position={[-6, 6, 4]}
        angle={0.6}
        penumbra={0.8}
        intensity={120}
        color={BRAND.colors.orange}
      />
      {/* Cool fill from the opposite side for depth. */}
      <directionalLight position={[8, 4, -6]} intensity={1.2} color={'#9fb4d0'} />
      <ambientLight intensity={0.25} />

      <Suspense fallback={null}>
        <CameraIntro enabled={animate} />
        <TankerModel animate={animate} />
        {animate && <Particles count={120} animate={animate} />}
        <Ground />
        {/* frames={1} bakes the contact shadow once instead of re-rendering it
            every frame — a big win, and imperceptible since the truck is static. */}
        <ContactShadows
          position={[0, -1.03, 0]}
          opacity={0.55}
          scale={22}
          blur={2.4}
          far={6}
          frames={1}
          color="#000000"
        />
        {/*
          Studio IBL assembled in-scene from Lightformers — no HDR fetched from
          any CDN, so reflections work fully offline. Gives the steel tank
          believable highlights and a warm orange streak down one flank.
        */}
        <Environment resolution={256} frames={1}>
          <Lightformer intensity={2.2} position={[0, 4, -6]} scale={[12, 6, 1]} color="#2a3240" />
          <Lightformer
            intensity={3.5}
            position={[-5, 2, 3]}
            scale={[2, 8, 1]}
            color={BRAND.colors.orange}
          />
          <Lightformer intensity={1.6} position={[6, 3, 2]} scale={[3, 6, 1]} color="#cfe0f5" />
          <Lightformer intensity={1.2} position={[0, -3, 4]} scale={[10, 3, 1]} color="#15181d" />
        </Environment>
      </Suspense>
    </Canvas>
  );
}

export default HeroScene;
