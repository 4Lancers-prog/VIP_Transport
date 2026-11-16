import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { setLenis } from '../lib/lenis';

/**
 * Smooth scrolling via Lenis, correctly synchronised with GSAP ScrollTrigger.
 *
 * - Lenis drives ScrollTrigger.update on every scroll.
 * - GSAP's ticker drives Lenis' RAF loop (single RAF for the whole app).
 * - Disabled entirely when the user prefers reduced motion: native scrolling
 *   stays, and ScrollTrigger falls back to the browser's own scroll events.
 */
export function useLenis(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    setLenis(lenis);
    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => {
      // GSAP ticker time is in seconds; Lenis expects milliseconds.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      setLenis(null);
      lenis.destroy();
    };
  }, [enabled]);
}
