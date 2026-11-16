import { Link } from 'react-router-dom';
import { Check, ChevronRight, Truck, Network, Fuel } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SplitHeading } from '../ui/SplitHeading';
import { SERVICES, type Service } from '../../data/company';

const ICONS = [Truck, Network, Fuel];

/** Services page: sticky jump-nav, then one long-form block per service. */
export function ServiceDetails() {
  const nav = useScrollReveal<HTMLDivElement>({ kind: 'cards', selector: '[data-jump]', stagger: 0.1 });
  return (
    <>
      <section className="relative bg-canvas pt-20 md:pt-28">
        <div className="shell">
          <p className="max-w-3xl text-lg text-graphite md:text-xl">
            We understand that every business has unique transportation requirements. Our service approach
            focuses on reliability, safe handling, efficient coordination and timely delivery to help
            organisations maintain smooth operations.
          </p>
          <div ref={nav} className="mt-12 grid gap-4 sm:grid-cols-3">
            {SERVICES.map((s, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <Link key={s.id} data-jump to={{ hash: s.id }} className="neon-card group flex items-center gap-4 p-5">
                  <Icon size={22} className="text-brand" />
                  <span className="flex-1 font-display text-lg text-ink">{s.title}</span>
                  <ChevronRight size={18} className="text-graphite transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      {SERVICES.map((s, i) => (
        <ServiceBlock key={s.id} s={s} flip={i % 2 === 1} Icon={ICONS[i % ICONS.length]} />
      ))}
    </>
  );
}

function ServiceBlock({ s, flip, Icon }: { s: Service; flip: boolean; Icon: typeof Truck }) {
  const copy = useScrollReveal<HTMLDivElement>({ kind: 'blur', selector: '[data-p]', stagger: 0.12 });
  const list = useScrollReveal<HTMLUListElement>({ kind: flip ? 'left' : 'right', selector: 'li', stagger: 0.07, y: 0 });
  const panel = useScrollReveal<HTMLDivElement>({ kind: 'scale' });

  return (
    <section id={s.id} className="relative scroll-mt-24 overflow-hidden border-b border-line bg-canvas py-24 md:py-32">
      <span
        className={`pointer-events-none absolute top-16 select-none font-display text-[22vw] leading-none text-white/[0.025] md:text-[16vw] ${flip ? 'left-4' : 'right-4'}`}
        aria-hidden="true"
      >
        {s.index}
      </span>
      <div className={`shell relative grid gap-12 lg:grid-cols-2 lg:gap-20 ${flip ? 'lg:[&>*:first-child]:order-last' : ''}`}>
        <div>
          <p className="eyebrow mb-5 flex items-center gap-3">
            <Icon size={16} /> {s.title}
          </p>
          <SplitHeading className="font-display text-4xl leading-[0.98] text-ink text-balance md:text-5xl" lines={[s.heading]} />
          <div ref={copy} className="mt-8 space-y-5 text-graphite md:text-lg">
            {s.paragraphs.map((p) => (
              <p key={p} data-p>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div ref={panel} className="neon-card self-start p-8 hover:!translate-y-0 md:p-10">
          <p className="font-display text-xl text-ink">{s.listIntro}</p>
          <ul ref={list} className="mt-6 space-y-3">
            {s.points.map((pt) => (
              <li key={pt} className="flex items-start gap-3 text-ink/90">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-black shadow-[0_0_10px_rgba(193,154,51,0.6)]">
                  <Check size={13} strokeWidth={3} />
                </span>
                {pt}
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-graphite">{s.closing}</p>
          <Link to="/contact#quote" className="btn-primary mt-8">
            {s.pageCta} <ChevronRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
