import { CheckCircle2, ShieldCheck, Clock, Users, Target, Gauge, MessagesSquare } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionIntro } from '../ui/SectionIntro';
import { WHY_CHOOSE } from '../../data/company';

const ICONS = [CheckCircle2, ShieldCheck, Clock, Users, Target, Gauge, MessagesSquare];

/** Home: sticky intro on the left, seven reasons sliding in on the right. */
export function WhyChoose() {
  const list = useScrollReveal<HTMLUListElement>({ kind: 'right', selector: '[data-row]', stagger: 0.09, start: 'top 80%' });
  return (
    <section className="relative overflow-hidden border-y border-line bg-cream py-24 md:py-36">
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-brand/[0.07] blur-[120px] animate-drift"
        aria-hidden="true"
      />
      <div className="shell relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionIntro label="Why VIP Transports" lines={['A transportation partner', 'you can depend on']}>
            <p>
              Choosing the right logistics partner is about more than moving goods from one location to
              another. It is about finding a team that understands your business priorities and works
              towards delivering consistent results.
            </p>
          </SectionIntro>
        </div>

        <ul ref={list} className="divide-y divide-line border-y border-line">
          {WHY_CHOOSE.map((p, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li key={p.title} data-row className="group relative flex gap-5 py-7 md:gap-7">
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-line text-brand transition-[border-color,box-shadow] duration-500 group-hover:border-brand group-hover:shadow-[0_0_20px_rgba(193,154,51,0.4)]">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="font-display text-xl text-ink transition-colors duration-300 group-hover:text-brand md:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-graphite">{p.copy}</p>
                </div>
                <span className="absolute -bottom-px left-0 h-px w-0 bg-brand transition-[width] duration-700 ease-cinematic group-hover:w-full" />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
