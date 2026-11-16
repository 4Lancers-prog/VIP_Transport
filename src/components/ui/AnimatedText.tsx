import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Reveals text word-by-word on scroll: each word rises and fades in with a
 * stagger. Splits on spaces (keeping the markup simple and screen-reader
 * friendly — the full string stays readable). Reduced motion shows it at once.
 */
export function AnimatedText({
  text,
  className = '',
  stagger = 0.03,
  y = 18,
  start = 'top 85%',
}: {
  text: string;
  className?: string;
  stagger?: number;
  y?: number;
  start?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = el.querySelectorAll('[data-word]');

    if (reduced) {
      gsap.set(spans, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(spans, {
        opacity: 0,
        y,
        duration: 0.7,
        ease: 'power3.out',
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [reduced, stagger, y, start]);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span data-word className="inline-block">
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </p>
  );
}
