import { Link } from 'react-router-dom';
import { Truck, Network, Fuel, ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionIntro } from '../ui/SectionIntro';
import { SERVICES } from '../../data/company';

const ICONS = [Truck, Network, Fuel];

/** Home: three service cards with a 3D pop-in and cursor-following glow. */
export function ServicesOverview() {
  const grid = useScrollReveal<HTMLDivElement>({ kind: 'cards', selector: '[data-card]', stagger: 0.14 });
  return (
    <section id="services" className="relative bg-canvas py-24 md:py-36">
      <div className="shell">
        <SectionIntro label="What we do" lines={['Comprehensive transportation', 'and logistics services']} className="mb-16" />

        <div ref={grid} className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <article key={s.id} data-card className="neon-card group flex flex-col p-8 md:p-10">
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-sm border border-brand/40 text-brand transition-[background-color,color,box-shadow] duration-500 group-hover:bg-brand group-hover:text-black group-hover:shadow-[0_0_30px_rgba(193,154,51,0.55)]">
                    <Icon size={24} strokeWidth={1.7} />
                  </span>
                  <span className="font-display text-5xl text-line transition-colors duration-500 group-hover:text-brand/40">
                    {s.index}
                  </span>
                </div>
                <h3 className="mt-10 font-display text-2xl text-ink md:text-[1.7rem]">{s.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-graphite md:text-base">{s.copy}</p>
                <Link to={`/services#${s.id}`} className="text-link mt-8">
                  {s.cta}
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand shadow-[0_0_12px_rgba(193,154,51,0.9)] transition-[width] duration-700 ease-cinematic group-hover:w-full" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
