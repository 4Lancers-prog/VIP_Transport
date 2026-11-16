import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useCountUp } from '../../hooks/useCountUp';
import { FLEET, VERIFIED, type FleetClass } from '../../data/company';

/**
 * Horizontal fleet gallery on a light surface. On wide screens the track scrubs
 * horizontally with vertical scroll (controlled, not hijacked); on mobile /
 * reduced-motion it's a vertical stack. Each capacity number counts up.
 * Unit counts render as "indicative" until VERIFIED.fleet is true.
 */
export function FleetShowcase() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = root.current;
    const el = track.current;
    if (!section || !el || reduced) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const distance = el.scrollWidth - el.clientWidth;
        if (distance <= 0) return;
        gsap.to(el, {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance + window.innerHeight * 0.6}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, section);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    // Stable wrapper: GSAP pinning wraps the <section> in a pin-spacer, so
    // React must remove THIS div on route change, never the moved section.
    <div>
      <section id="fleet" ref={root} className="relative overflow-hidden bg-canvas py-20 md:py-0">
        <div className="shell flex h-auto flex-col justify-center md:h-screen">
          <div className="mb-10 md:mb-12 md:pt-20">
            <p className="section-label mb-4">The fleet</p>
            <h2 className="font-display text-4xl leading-[0.95] text-ink md:text-6xl">
              Capacity, matched to the job.
            </h2>
            <p className="mt-4 max-w-md text-sm text-graphite">
              Tankers across four capacity classes, so we right-size the vehicle to
              the consignment — from compact bulk runs to high-volume movements.
            </p>
          </div>

          {/* Track */}
          <div
            ref={track}
            className="flex flex-col gap-6 md:w-max md:flex-row md:gap-8 md:pb-20 md:will-change-transform"
          >
            {FLEET.map((f) => (
              <FleetCard key={f.capacityKL} f={f} />
            ))}
          </div>

          {!VERIFIED.fleet && (
            <p className="mt-2 text-[11px] text-graphite/70 md:absolute md:bottom-6">
              Unit counts shown are indicative and pending confirmation.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function FleetCard({ f }: { f: FleetClass }) {
  const [ref, kl] = useCountUp<HTMLSpanElement>({ target: f.capacityKL, duration: 1400, threshold: 0.5 });

  return (
    <article className="group relative flex min-h-[220px] flex-col justify-between rounded-sm border border-line bg-panel p-7 transition-[border-color,box-shadow] duration-500 hover:border-brand hover:shadow-[0_0_40px_-12px_rgba(193,154,51,0.6)] md:min-h-[360px] md:w-[340px]">
      {/* Technical annotation */}
      <div className="flex items-start justify-between">
        <span className="section-label">Class {String(f.capacityKL).padStart(2, '0')}</span>
        <span className="font-display text-xs text-graphite">KL</span>
      </div>

      {/* Big capacity (counts up) */}
      <div>
        <div className="flex items-end gap-2">
          <span
            ref={ref}
            className="font-display text-[5.5rem] leading-none text-ink tabular-nums transition-colors duration-500 group-hover:text-brand md:text-[7rem]"
          >
            {kl}
          </span>
          <span className="mb-4 font-display text-2xl text-graphite">KL</span>
        </div>
        <p className="mt-2 text-sm text-graphite">{f.label}</p>
      </div>

      {/* Tanker glyph + unit count */}
      <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <FleetGlyph />
        <div className="text-right">
          <span className="block font-display text-xl text-ink">{f.units}</span>
          <span className="text-[10px] uppercase tracking-eyebrow text-graphite">
            {VERIFIED.fleet ? 'in service' : 'indicative'}
          </span>
        </div>
      </div>
    </article>
  );
}

function FleetGlyph() {
  return (
    <svg viewBox="0 0 90 36" className="h-8 w-20 text-graphite" fill="none" aria-hidden="true">
      <rect x="6" y="12" width="46" height="13" rx="6.5" fill="currentColor" opacity="0.5" />
      <path d="M54 25 V15 q0-3 3-3 h8 l5 6 v7 Z" fill="currentColor" opacity="0.7" />
      <circle cx="20" cy="28" r="4" fill="currentColor" />
      <circle cx="46" cy="28" r="4" fill="currentColor" />
      <circle cx="64" cy="28" r="4" fill="currentColor" />
    </svg>
  );
}
