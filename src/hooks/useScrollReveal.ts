import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { useReducedMotion } from './useReducedMotion';

export type RevealKind = 'up' | 'mask' | 'stagger' | 'left' | 'right' | 'scale' | 'blur' | 'cards';

interface Options {
  kind?: RevealKind;
  /** CSS selector for children to stagger (stagger / cards / blur with selector). */
  selector?: string;
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
}

/**
 * Scroll-triggered reveals. Scoped in a gsap.context and reverted on unmount.
 *
 *   up      – fade + rise
 *   left    – slide in from the left
 *   right   – slide in from the right
 *   scale   – grow from 92% with a soft fade
 *   blur    – de-blur + rise (rich “focus pull” for copy blocks)
 *   mask    – clip-path wipe from the top
 *   stagger – children (selector) rise one after another
 *   cards   – children pop in with a 3D tilt + scale, staggered from the start
 *
 * Under prefers-reduced-motion targets are shown immediately.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options: Options = {}) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  const {
    kind = 'up',
    selector,
    y = 40,
    duration = 0.9,
    stagger = 0.12,
    start = 'top 82%',
    once = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets: Element[] | NodeListOf<Element> = selector ? el.querySelectorAll(selector) : [el];

    if (reduced) {
      targets.forEach((t) => {
        const s = (t as HTMLElement).style;
        s.opacity = '1';
        s.transform = 'none';
        s.clipPath = 'none';
        s.filter = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const scrollTrigger = { trigger: el, start, once } as const;
      const base = { duration, ease: 'power3.out', stagger, scrollTrigger };

      switch (kind) {
        case 'mask':
          gsap.from(targets, { ...base, clipPath: 'inset(0 0 100% 0)', duration: duration + 0.2 });
          break;
        case 'left':
          gsap.from(targets, { ...base, x: -70, opacity: 0 });
          break;
        case 'right':
          gsap.from(targets, { ...base, x: 70, opacity: 0 });
          break;
        case 'scale':
          gsap.from(targets, { ...base, scale: 0.92, opacity: 0, y: 20 });
          break;
        case 'blur':
          gsap.from(targets, { ...base, y: y * 0.6, opacity: 0, filter: 'blur(12px)', duration: duration + 0.2 });
          break;
        case 'cards':
          gsap.set(el, { perspective: 1000 });
          gsap.from(targets, {
            ...base,
            y: 60,
            opacity: 0,
            rotateX: -14,
            scale: 0.94,
            transformOrigin: '50% 100%',
            duration: duration + 0.1,
            stagger: { each: stagger, from: 'start' },
            ease: 'expo.out',
            clearProps: 'transform',
          });
          break;
        case 'stagger':
        case 'up':
        default:
          gsap.from(targets, { ...base, y, opacity: 0 });
      }
    }, el);

    return () => ctx.revert();
  }, [reduced, kind, selector, y, duration, stagger, start, once]);

  return ref;
}
