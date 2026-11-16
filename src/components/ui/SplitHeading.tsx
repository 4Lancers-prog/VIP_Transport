import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SplitHeadingProps {
  /** Each entry becomes its own masked line. */
  lines: ReactNode[];
  className?: string;
  as?: 'h2' | 'h3';
}

/**
 * A heading whose lines rise out of a clipping mask on scroll. Pure CSS mask +
 * GSAP; degrades to instantly-visible under reduced motion.
 */
export function SplitHeading({ lines, className = '', as = 'h2' }: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inner = el.querySelectorAll('[data-line-inner]');

    if (reduced) {
      gsap.set(inner, { yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(inner, { yPercent: 115, rotate: 3, transformOrigin: '0% 100%' });
      gsap.to(inner, {
        yPercent: 0,
        rotate: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span data-line-inner className="block">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
