import { useRef, type ReactNode, type ElementType, type MouseEvent } from 'react';
import { gsap } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * A button/link that gently pulls toward the cursor while hovered and springs
 * back on leave. Only active on fine pointers and when motion is welcome — so
 * it never interferes with touch or reduced-motion users.
 */
interface MagneticButtonProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  strength?: number;
  // Pass-through props (href, to, onClick, type, etc.)
  [key: string]: unknown;
}

export function MagneticButton({
  children,
  as,
  className = '',
  strength = 0.4,
  ...rest
}: MagneticButtonProps) {
  const Tag = (as ?? 'button') as ElementType;
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const finePointer =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(pointer: fine)').matches;

  const active = !reduced && finePointer;

  function onMove(e: MouseEvent) {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(ref.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.5,
      ease: 'power3.out',
    });
  }

  function onLeave() {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  }

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}
