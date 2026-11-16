import { type RefObject } from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import { STATS, type Stat } from '../../data/company';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * Animated statistics band. Each figure counts up from zero when it scrolls
 * into view. Provisional values (verified === false) carry a small dagger and a
 * footnote so nothing reads as a hard, invented claim.
 */
export function Stats() {
  const ref = useScrollReveal<HTMLDivElement>({ kind: 'stagger', selector: '[data-stat]', y: 30 });
  const hasProvisional = STATS.some((s) => !s.verified);

  return (
    <section
      aria-label="By the numbers"
      className="relative overflow-hidden border-y border-charcoal bg-ink py-16 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(245,130,0,0.10),transparent_60%)]" />
      <div ref={ref} className="shell relative grid grid-cols-2 gap-10 md:grid-cols-4">
        {STATS.map((s) => (
          <StatItem key={s.label} stat={s} />
        ))}
      </div>
      {hasProvisional && (
        <p className="shell relative mt-8 text-[11px] text-steel/60">
          † Indicative figure — confirm in the company profile before publishing.
        </p>
      )}
    </section>
  );
}

function StatItem({ stat }: { stat: Stat }) {
  const { ref, display } = useCountUp(stat.value, { decimals: stat.decimals ?? 0 });
  return (
    <div data-stat className="relative">
      <div
        ref={ref as RefObject<HTMLDivElement>}
        className="font-display text-[clamp(2.6rem,7vw,4.5rem)] leading-none text-warm"
      >
        <span className="text-gradient">
          {stat.prefix}
          {display}
          {stat.suffix}
        </span>
        {!stat.verified && <span className="align-super text-base text-steel">†</span>}
      </div>
      <p className="mt-3 text-xs uppercase tracking-eyebrow text-steel md:text-sm">{stat.label}</p>
    </div>
  );
}
