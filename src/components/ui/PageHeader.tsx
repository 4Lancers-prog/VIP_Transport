import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Inner-page hero: light band with a subtle gold grid, a drifting glow, a
 * breadcrumb and a word-by-word headline reveal.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  crumb,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  crumb?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.1 });
      tl.from('[data-ph-top]', { y: 20, opacity: 0, duration: 0.7, stagger: 0.08 })
        .from('[data-word]', { yPercent: 110, rotate: 4, opacity: 0, duration: 1, stagger: 0.045 }, '-=0.4')
        .from('[data-ph-lede]', { y: 24, opacity: 0, filter: 'blur(10px)', duration: 0.9 }, '-=0.7')
        .from('[data-ph-rule]', { scaleX: 0, duration: 1.2, ease: 'power2.out' }, '-=0.6');
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <header className="relative overflow-hidden border-b border-line bg-cream pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-neon-grid animate-gridpan" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-brand/10 blur-[130px] animate-drift"
        aria-hidden="true"
      />

      <div ref={ref} className="shell relative">
        <nav aria-label="Breadcrumb" data-ph-top className="mb-6 flex items-center gap-2 text-xs text-graphite">
          <Link to="/" className="transition-colors hover:text-brand">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-ink">{crumb ?? eyebrow}</span>
        </nav>
        <p data-ph-top className="eyebrow mb-5 flex items-center gap-3">
          <span className="inline-block h-2 w-2 bg-brand animate-glowpulse" />
          {eyebrow}
        </p>
        <h1 className="max-w-5xl font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1] text-ink text-balance">
          {title.split(' ').map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
              <span data-word className="inline-block">
                {w}
                {'\u00A0'}
              </span>
            </span>
          ))}
        </h1>
        {lede && (
          <p data-ph-lede className="mt-7 max-w-2xl text-graphite md:text-lg">
            {lede}
          </p>
        )}
        <span data-ph-rule className="rule-neon mt-10 block max-w-xs" />
      </div>
    </header>
  );
}
