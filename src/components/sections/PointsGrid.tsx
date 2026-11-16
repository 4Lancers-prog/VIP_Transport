import type { LucideIcon } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionIntro } from '../ui/SectionIntro';
import type { Point } from '../../data/company';

type IconT = LucideIcon;

/** Generic three-column grid of titled points with icons (values, dependability). */
export function PointsGrid({
  label,
  lines,
  intro,
  points,
  icons,
  tone = 'canvas',
}: {
  label: string;
  lines: string[];
  intro?: string;
  points: Point[];
  icons: IconT[];
  tone?: 'canvas' | 'cream';
}) {
  const grid = useScrollReveal<HTMLDivElement>({ kind: 'cards', selector: '[data-card]', stagger: 0.1 });
  return (
    <section className={`relative py-24 md:py-36 ${tone === 'cream' ? 'border-y border-line bg-cream' : 'bg-canvas'}`}>
      <div className="shell">
        <SectionIntro label={label} lines={lines} className="mb-14">
          {intro && <p>{intro}</p>}
        </SectionIntro>
        <div ref={grid} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article key={p.title} data-card className="neon-card group p-8">
                <Icon size={28} strokeWidth={1.5} className="text-brand transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110" />
                <h3 className="mt-7 font-display text-xl text-ink md:text-2xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite md:text-base">{p.copy}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
