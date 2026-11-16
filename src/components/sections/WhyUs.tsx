import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SplitHeading } from '../ui/SplitHeading';
import { TiltCard } from '../ui/TiltCard';
import { WHY_US } from '../../data/company';

/**
 * "Why choose us" — a grid of tilt-on-hover cards, each revealing on scroll.
 * Describes the company's approach (not awards or certifications).
 */
export function WhyUs() {
  const ref = useScrollReveal<HTMLDivElement>({ kind: 'stagger', selector: '[data-why]', y: 36 });

  return (
    <section className="relative bg-ink py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_90%_10%,rgba(245,130,0,0.08),transparent_55%)]" />
      <div className="shell relative">
        <div className="mb-14 max-w-2xl">
          <p className="section-label mb-4">Why VIP Transport</p>
          <SplitHeading
            className="font-display text-4xl leading-[0.95] text-warm md:text-6xl"
            lines={['BUILT TO MOVE FUEL', <>— AND NOTHING <span className="text-brand">LESS.</span></>]}
          />
        </div>

        <div ref={ref} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {WHY_US.map((w) => (
            <div data-why key={w.index}>
              <TiltCard className="group h-full border border-charcoal bg-charcoal/20 p-7 transition-colors duration-500 hover:border-brand/60">
                <span className="font-display text-4xl text-charcoal transition-colors duration-500 group-hover:text-brand">
                  {w.index}
                </span>
                <h3 className="mt-5 font-display text-xl text-warm">{w.title}</h3>
                <p className="mt-3 text-sm text-steel">{w.copy}</p>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
