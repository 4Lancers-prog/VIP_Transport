import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { useReducedMotion } from './useReducedMotion';

/**
 * Scroll-linked parallax. The element translates on Y as it passes through the
 * viewport, scrubbed to scroll. `speed` > 0 moves it up (foreground feel),
 * < 0 moves it down (background feel). Disabled under reduced motion.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.2) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed * 50 },
        {
          yPercent: speed * 50,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [speed, reduced]);

  return ref;
}
