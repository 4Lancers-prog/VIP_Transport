import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface Options {
  /** Final number to count to. */
  target: number;
  /** Animation length in ms. */
  duration?: number;
  /** Fraction of the element visible before counting starts (0–1). */
  threshold?: number;
}

/**
 * Counts from 0 to `target` once the returned ref scrolls into view, exactly
 * once. Uses requestAnimationFrame with an ease-out curve so the number
 * decelerates into its final value. Under prefers-reduced-motion it jumps
 * straight to the target (no animation).
 *
 * Returns [ref, value]: attach `ref` to the element that should trigger the
 * count, and render `value` (already rounded).
 */
export function useCountUp<T extends HTMLElement = HTMLDivElement>({
  target,
  duration = 2000,
  threshold = 0.4,
}: Options) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      setValue(target);
      return;
    }

    let rafId = 0;

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        // easeOutExpo — fast then settling.
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setValue(Math.round(target * eased));
        if (t < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        });
      },
      { threshold },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [target, duration, threshold, reduced]);

  return [ref, value] as const;
}
