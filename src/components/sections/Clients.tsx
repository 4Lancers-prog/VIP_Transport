import { ShieldCheck, Route, Container } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ClientsMarquee } from '../ui/ClientsMarquee';
import { COMMITMENTS, CLIENTS, VERIFIED } from '../../data/company';

/**
 * Trust section (light). Commitment cards explain HOW the company works, then a
 * seamless, auto-scrolling marquee shows the real client logos supplied by the
 * owner (appears only when VERIFIED.clients and the list is populated).
 */
const ICONS = [ShieldCheck, Container, Route];

export function Clients() {
  const ref = useScrollReveal<HTMLDivElement>({ kind: 'stagger', selector: '[data-c]', y: 28 });
  const showClients = VERIFIED.clients && CLIENTS.length > 0;

  return (
    <section id="trust" className="relative border-y border-line bg-cream py-16 md:py-24">
      <div className="shell">
        <div className="mb-8 max-w-2xl">
          <p className="section-label mb-4">Why operators rely on us</p>
          <h2 className="font-display text-4xl leading-[0.95] text-ink md:text-5xl">
            Trust is built on the movement itself.
          </h2>
        </div>

        <div ref={ref} className="grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3">
          {COMMITMENTS.map((c, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div key={c.title} data-c className="bg-canvas p-8 md:p-10">
                <Icon size={26} strokeWidth={1.5} className="text-brand-deep" />
                <h3 className="mt-6 font-display text-xl text-ink">{c.title}</h3>
                <p className="mt-3 text-sm text-graphite">{c.copy}</p>
              </div>
            );
          })}
        </div>
      </div>

      {showClients && (
        <div className="mt-12 md:mt-14">
          <p className="section-label mb-8 text-center">Our valuable clients</p>
          <ClientsMarquee />
        </div>
      )}
    </section>
  );
}
