import { type ReactNode } from 'react';
import { Fuel, Truck, Network, CalendarClock } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SERVICES } from '../../data/company';

/**
 * Capabilities as alternating editorial rows on a light surface. Each row flips
 * sides for an art-directed rhythm. Content comes from company.ts.
 */
const ICONS = [Fuel, Truck, Network, CalendarClock];

export function Services() {
  return (
    <section id="services" className="relative bg-canvas py-16 md:py-24">
      <div className="shell">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
          <div>
            <p className="section-label mb-4">Capabilities</p>
            <h2 className="max-w-xl font-display text-4xl leading-[0.95] text-ink md:text-6xl">
              What we move, and how.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-graphite">
            Fuel-first logistics done properly — from distribution and tanker
            transport to broader transportation and multi-location delivery.
          </p>
        </div>

        <div className="divide-y divide-line">
          {SERVICES.map((svc, i) => {
            const Icon = ICONS[i % ICONS.length];
            return <ServiceRow key={svc.id} index={svc.index} title={svc.title} copy={svc.copy} icon={<Icon size={22} strokeWidth={1.6} />} flip={i % 2 === 1} />;
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  index,
  title,
  copy,
  icon,
  flip,
}: {
  index: string;
  title: string;
  copy: string;
  icon: ReactNode;
  flip: boolean;
}) {
  const ref = useScrollReveal<HTMLDivElement>({ kind: 'stagger', selector: '[data-s]', y: 30 });
  return (
    <div
      ref={ref}
      className={`group grid items-center gap-6 py-10 md:grid-cols-[auto_1fr_auto] md:gap-12 md:py-14 ${
        flip ? 'md:[&>[data-visual]]:order-first' : ''
      }`}
    >
      <span data-s className="font-display text-5xl text-line transition-colors duration-500 group-hover:text-brand-deep md:text-7xl">
        {index}
      </span>

      <div data-s className="max-w-xl">
        <h3 className="font-display text-2xl text-ink md:text-3xl">{title}</h3>
        <p className="mt-3 text-graphite">{copy}</p>
      </div>

      <div
        data-visual
        data-s
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm border border-line text-graphite transition-all duration-500 group-hover:border-brand group-hover:bg-brand/10 group-hover:text-brand-deep md:h-20 md:w-20"
      >
        {icon}
      </div>
    </div>
  );
}
