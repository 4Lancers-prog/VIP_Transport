import { useRef, type ReactNode, type MouseEvent } from 'react';
import { gsap } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * 3D tilt-on-hover card with a moving sheen. The card rotates toward the cursor
 * in perspective and a soft highlight tracks the pointer. Fine-pointer +
 * motion-friendly only; otherwise it renders as a plain static container.
 */
export function TiltCard({
  children,
  className = '',
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const finePointer =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(pointer: fine)').matches;
  const active = !reduced && finePointer;

  function onMove(e: MouseEvent) {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    gsap.to(ref.current, {
      rotateY: (px - 0.5) * max * 2,
      rotateX: -(py - 0.5) * max * 2,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 900,
      transformOrigin: 'center',
    });
    if (glare.current) {
      gsap.to(glare.current, {
        opacity: 0.18,
        duration: 0.3,
        background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, #fff, transparent 60%)`,
      });
    }
  }

  function onLeave() {
    if (!ref.current) return;
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
    if (glare.current) gsap.to(glare.current, { opacity: 0, duration: 0.4 });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative [transform-style:preserve-3d] ${className}`}
    >
      {children}
      <div
        ref={glare}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0"
      />
    </div>
  );
}
