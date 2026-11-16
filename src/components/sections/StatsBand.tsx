import { type ReactNode } from 'react';
import { Truck, Globe2, Droplets, Users } from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp';
import { STATS, type Stat } from '../../data/company';
import { SectionIntro } from '../ui/SectionIntro';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * Headline figures with count-up animation. Each number ticks from 0 to its
 * confirmed value when the band scrolls into view, decelerating into place.
 * Black band, neon accents.
 */
const ICONS = [Truck, Globe2, Droplets, Users];

export function StatsBand() {
  const grid = useScrollReveal<HTMLDListElement>({ kind: 'cards', selector: '[data-stat]', stagger: 0.12 });
  return (
    <section
      aria-label="Key figures"
      className="relative overflow-hidden border-y border-line bg-cream py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-grain-light opacity-60" />
      {/* Soft yellow glow top-right */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_0%,rgba(193,154,51,0.10),transparent_60%)]" />

      <div className="shell relative">
        <SectionIntro label="By the numbers" lines={['Our journey in numbers']} className="mb-12 md:mb-16" />

        <dl ref={grid} className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => {
            const Icon = ICONS[i % ICONS.length];
            return <StatItem key={stat.label} stat={stat} icon={<Icon size={24} strokeWidth={1.6} />} />;
          })}
        </dl>
      </div>
    </section>
  );
}

function StatItem({ stat, icon }: { stat: Stat; icon: ReactNode }) {
  const [ref, value] = useCountUp<HTMLDivElement>({ target: stat.value, duration: 2200 });

  return (
    <div ref={ref} data-stat className="neon-card group !rounded-none !border-0 hover:!translate-y-0 hover:!shadow-none px-7 py-10 md:px-8 md:py-12">
      {/* Yellow top accent that widens on hover */}
      <span className="absolute left-0 top-0 h-[3px] w-10 bg-brand shadow-[0_0_14px_rgba(193,154,51,0.9)] transition-all duration-500 group-hover:w-full" />

      <div className="mb-6 text-brand">{icon}</div>

      <dd className="font-display text-[2.7rem] leading-none text-ink tabular-nums md:text-[3.4rem]">
        {value.toLocaleString('en-IN')}
        {stat.suffix && <span className="text-brand">{stat.suffix}</span>}
      </dd>

      <dt className="mt-4 text-sm leading-snug text-graphite">{stat.label}</dt>
    </div>
  );
}
