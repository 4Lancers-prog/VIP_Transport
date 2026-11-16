import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Animated route map: a neon route draws itself on scroll, then a pulse
 * travels along it from pickup to delivery on a loop.
 */
export function RouteGraphic({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      const path = el.querySelector<SVGPathElement>('[data-route]');
      if (!path) return;
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 75%', once: true } });
      tl.from(el, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'power3.out' })
        .to(path, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, '-=0.4')
        .from('[data-node]', { scale: 0, transformOrigin: '50% 50%', stagger: 0.25, duration: 0.5, ease: 'back.out(3)' }, '-=1.4')
        .from('[data-tag]', { y: 12, opacity: 0, stagger: 0.15, duration: 0.5 }, '-=0.6');
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  const d = 'M40 330 L140 250 L200 280 L300 150 L360 90';

  return (
    <div ref={ref} className={`relative min-h-[340px] overflow-hidden rounded-sm border border-line bg-panel ${className}`}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="rg-glow" cx="70%" cy="25%" r="70%">
            <stop offset="0" stopColor="#C19A33" stopOpacity="0.18" />
            <stop offset="1" stopColor="#C19A33" stopOpacity="0" />
          </radialGradient>
          <filter id="rg-blur">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <rect width="400" height="400" fill="url(#rg-glow)" />
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" stroke="#EAE3D2" strokeWidth="1" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="#EAE3D2" strokeWidth="1" />
        ))}
        <path d={d} stroke="#C19A33" strokeWidth="8" opacity="0.25" filter="url(#rg-blur)" strokeLinecap="round" strokeLinejoin="round" />
        <path data-route d={d} stroke="#C19A33" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle data-node cx="40" cy="330" r="7" fill="#C19A33" />
        <circle data-node cx="200" cy="280" r="5" fill="#DDBB55" />
        <circle data-node cx="360" cy="90" r="7" fill="#C19A33" />
        {!reduced && (
          <circle r="5" fill="#C19A33">
            <animateMotion dur="4s" repeatCount="indefinite" path={d} begin="2.6s" />
            <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" begin="2.6s" />
          </circle>
        )}
      </svg>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] uppercase tracking-eyebrow text-graphite">
        <span data-tag>Pickup</span>
        <span data-tag>En route</span>
        <span data-tag className="text-brand">Delivery</span>
      </div>
    </div>
  );
}
