import { type CSSProperties } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useCountUp } from '../../hooks/useCountUp';
import { FLEET, VERIFIED, type FleetClass } from '../../data/company';

/**
 * Fleet capacity cards (20 KL up to 40 KL) in an infinite marquee, matching
 * the clients strip: the track is duplicated and translated by exactly -50%,
 * so the loop is seamless. Hover/focus pauses it. Under reduced motion it
 * falls back to a static grid with every card visible.
 * Unit counts render as "indicative" until VERIFIED.fleet is true.
 */
export function FleetShowcase({ speedSeconds = 45 }: { speedSeconds?: number }) {
  const reduced = useReducedMotion();
  const min = Math.min(...FLEET.map((f) => f.capacityKL));
  const max = Math.max(...FLEET.map((f) => f.capacityKL));

  return (
    <section id="fleet" className="relative overflow-hidden bg-canvas py-20 md:py-28">
      <div className="shell mb-10 md:mb-12">
        <p className="section-label mb-4">The fleet</p>
        <h2 className="font-display text-4xl leading-[0.95] text-ink md:text-6xl">
          Capacity, matched to the job.
        </h2>
        <p className="mt-4 max-w-md text-sm text-graphite">
          Tankers from {min} KL up to {max} KL, so we right-size the vehicle to the
          consignment — from compact bulk runs to maximum-capacity movements.
        </p>
      </div>

      {reduced ? (
        <div className="shell grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FLEET.map((f) => (
            <FleetCard key={f.capacityKL} f={f} />
          ))}
        </div>
      ) : (
        <div className="group marquee-mask relative w-full overflow-hidden">
          <div
            className="flex w-max animate-marquee group-hover:marquee-paused group-focus-within:marquee-paused"
            style={{ '--marquee-duration': `${speedSeconds}s` } as CSSProperties}
          >
            {/* Two identical sequences, each with a trailing gap equal to the
                card gap, so a -50% translate lands seamlessly. */}
            {[0, 1].map((seq) => (
              <div
                key={seq}
                className="flex shrink-0 gap-6 pr-6 md:gap-8 md:pr-8"
                aria-hidden={seq === 1}
              >
                {FLEET.map((f) => (
                  <FleetCard key={`${seq}-${f.capacityKL}`} f={f} />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {!VERIFIED.fleet && (
        <p className="shell mt-6 text-[11px] text-graphite/70">
          Unit counts shown are indicative and pending confirmation.
        </p>
      )}
    </section>
  );
}

function FleetCard({ f }: { f: FleetClass }) {
  const [ref, kl] = useCountUp<HTMLSpanElement>({ target: f.capacityKL, duration: 1400, threshold: 0.5 });

  return (
    <article className="group/card relative flex min-h-[300px] w-[280px] shrink-0 flex-col justify-between rounded-sm border border-line bg-panel p-7 transition-[border-color,box-shadow] duration-500 hover:border-brand hover:shadow-[0_0_40px_-12px_rgba(193,154,51,0.6)] md:min-h-[360px] md:w-[340px]">
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
            className="font-display text-[5.5rem] leading-none text-ink tabular-nums transition-colors duration-500 group-hover/card:text-brand md:text-[7rem]"
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
          <span className="block font-display text-xl text-ink">{f.units ?? '—'}</span>
          <span className="text-[10px] uppercase tracking-eyebrow text-graphite">
            {VERIFIED.fleet && f.units != null ? 'in service' : 'indicative'}
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
