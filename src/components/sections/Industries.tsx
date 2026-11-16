import { Factory, Store, ShoppingBasket, Droplets, HardHat, Pill, Package, ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionIntro } from '../ui/SectionIntro';
import { INDUSTRIES } from '../../data/company';

const ICONS = [Factory, Store, ShoppingBasket, Droplets, HardHat, Pill, Package];

/** Home: industries served as large type rows that light up on hover. */
export function Industries() {
  const list = useScrollReveal<HTMLDivElement>({ kind: 'scale', selector: '[data-ind]', stagger: 0.07 });
  return (
    <section className="relative bg-canvas py-24 md:py-36">
      <div className="shell">
        <SectionIntro label="Industries" lines={['Transportation support for', 'different business industries']} className="mb-14">
          <p>
            Different industries have different transportation and distribution requirements. VIP
            Transports aims to provide flexible logistics support that helps businesses maintain
            efficient operations.
          </p>
        </SectionIntro>

        <div ref={list} className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((name, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={name}
                data-ind
                className={`neon-card group !rounded-none !border-0 hover:!translate-y-0 hover:!shadow-none flex items-center gap-5 p-7 md:p-8 ${
                  i === INDUSTRIES.length - 1 ? 'lg:col-span-3 sm:col-span-2' : ''
                }`}
              >
                <Icon size={26} strokeWidth={1.5} className="shrink-0 text-brand transition-transform duration-500 group-hover:scale-110" />
                <span className="flex-1 font-display text-lg leading-tight text-ink md:text-xl">{name}</span>
                <ArrowUpRight size={18} className="text-graphite opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-brand group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
