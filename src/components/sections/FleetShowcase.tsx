import { useCountUp } from '../../hooks/useCountUp';
import { FLEET, VERIFIED, type FleetClass } from '../../data/company';

/**
 * Fleet capacity cards (20 KL up to 40 KL) in a grid: 4 per row on desktop,
 * so eight classes sit in two rows; 2 per row on tablets, 1 on phones.
 * Each card counts its capacity up and fills a tank gauge to scale against
 * the largest class, so sizes compare at a glance.
 * Unit counts render as "indicative" until VERIFIED.fleet is true.
 */
export function FleetShowcase() {
  const min = Math.min(...FLEET.map((f) => f.capacityKL));
  const max = Math.max(...FLEET.map((f) => f.capacityKL));

  return (
    <section id="fleet" className="relative bg-canvas py-20 md:py-28">
      <div className="shell">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label mb-4">The fleet</p>
            <h2 className="font-display text-4xl leading-[0.95] text-ink md:text-6xl">
              Capacity, matched to the job.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-graphite">
            Tankers from {min} KL up to {max} KL, so we right-size the vehicle to the
            consignment — from compact bulk runs to maximum-capacity movements.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {FLEET.map((f) => (
            <FleetCard key={f.capacityKL} f={f} max={max} />
          ))}
        </div>

        {!VERIFIED.fleet && (
          <p className="mt-6 text-[11px] text-graphite/70">
            Unit counts shown are indicative and pending confirmation.
          </p>
        )}
      </div>
    </section>
  );
}

function FleetCard({ f, max }: { f: FleetClass; max: number }) {
  const [ref, kl] = useCountUp<HTMLSpanElement>({ target: f.capacityKL, duration: 1400, threshold: 0.5 });
  const fill = (kl / max) * 100;
  const isLargest = f.capacityKL === max;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-md border bg-panel p-6 transition-[transform,border-color,box-shadow] duration-500 ease-cinematic hover:-translate-y-1 hover:border-brand hover:shadow-[0_18px_40px_-18px_rgba(193,154,51,0.55)] ${
        isLargest ? 'border-brand/60' : 'border-line'
      }`}
    >
      {/* Gold rule that draws across the top on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 ease-cinematic group-hover:scale-x-100"
      />

      <div className="flex items-center justify-between">
        <span className="section-label">Class {f.capacityKL}</span>
        {isLargest && (
          <span className="rounded-sm bg-brand/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-deep">
            Largest
          </span>
        )}
      </div>

      {/* Big capacity (counts up) */}
      <div className="mt-6 flex items-end gap-2">
        <span
          ref={ref}
          className="font-display text-7xl leading-none text-ink tabular-nums transition-colors duration-500 group-hover:text-brand-deep"
        >
          {kl}
        </span>
        <span className="mb-2 font-display text-xl text-graphite">KL</span>
      </div>
      <p className="mt-2 text-sm text-graphite">{f.label}</p>

      {/* Tank gauge, to scale against the largest class */}
      <div className="mt-6">
        <div
          className="h-2.5 w-full overflow-hidden rounded-full bg-line"
          role="img"
          aria-label={`${f.capacityKL} KL of ${max} KL`}
        >
          <div className="h-full rounded-full bg-brand" style={{ width: `${fill}%` }} />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-graphite/80 tabular-nums">
          <span>0</span>
          <span>{max} KL</span>
        </div>
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
    <svg
      viewBox="0 0 90 36"
      className="h-8 w-20 text-graphite transition-colors duration-500 group-hover:text-brand"
      fill="none"
      aria-hidden="true"
    >
      <rect x="6" y="12" width="46" height="13" rx="6.5" fill="currentColor" opacity="0.5" />
      <path d="M54 25 V15 q0-3 3-3 h8 l5 6 v7 Z" fill="currentColor" opacity="0.7" />
      <circle cx="20" cy="28" r="4" fill="currentColor" />
      <circle cx="46" cy="28" r="4" fill="currentColor" />
      <circle cx="64" cy="28" r="4" fill="currentColor" />
    </svg>
  );
}
