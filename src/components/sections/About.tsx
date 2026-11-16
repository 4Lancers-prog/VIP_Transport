import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SplitHeading } from '../ui/SplitHeading';
import { EXPERIENCE_YEARS } from '../../data/company';

/**
 * Editorial company introduction. Light split layout: oversized headline +
 * original copy on one side; an animated route graphic on the other.
 */
export function About() {
  const copyRef = useScrollReveal<HTMLDivElement>({ kind: 'stagger', selector: '[data-stag]' });

  return (
    <section id="about" className="relative bg-canvas py-16 md:py-24">
      <div className="shell grid gap-10 md:grid-cols-2 md:gap-16">
        {/* Left: headline + copy */}
        <div>
          <p className="section-label mb-6">About VIP Transport</p>
          <SplitHeading
            className="font-display text-4xl leading-[0.95] text-ink md:text-6xl"
            lines={['CONNECTING BUSINESS', <>ACROSS ROADS &amp; <span className="text-brand-deep">INDUSTRIES.</span></>]}
          />

          <div ref={copyRef} className="mt-8 max-w-md space-y-5 text-graphite">
            <p data-stag>
              For over {EXPERIENCE_YEARS} years, VIP Transport has been a trusted
              logistics partner — moving bulk high-speed diesel and petroleum
              products for the operations that depend on a steady fuel supply.
            </p>
            <p data-stag>
              The work is simple to describe and hard to do well: get the right
              volume of fuel from where it is to where it needs to be, on time,
              handled safely. A modern tanker fleet, experienced drivers and a
              clear process make that happen, shipment after shipment.
            </p>
            <p data-stag className="text-ink">
              We don't just move fuel — we build lasting partnerships through
              reliable service, timely deliveries and uncompromising safety.
            </p>
          </div>
        </div>

        {/* Right: animated route graphic */}
        <AboutRoute />
      </div>
    </section>
  );
}

function AboutRoute() {
  const ref = useScrollReveal<HTMLDivElement>({ kind: 'mask', duration: 1 });
  return (
    <div ref={ref} className="relative min-h-[320px] overflow-hidden rounded-sm border border-line bg-cream">
      <div className="absolute inset-0 bg-grain-light opacity-60" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="aglow" cx="30%" cy="30%" r="70%">
            <stop offset="0" stopColor="#FFB400" stopOpacity="0.28" />
            <stop offset="1" stopColor="#FFB400" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill="url(#aglow)" />
        {/* Grid */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" stroke="#E8E7E0" strokeWidth="1" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="#E8E7E0" strokeWidth="1" />
        ))}
        {/* Route */}
        <path d="M40 330 L140 250 L200 280 L300 150 L360 90" stroke="#F0A500" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="40" cy="330" r="7" fill="#F0A500" />
        <circle cx="360" cy="90" r="7" fill="#F0A500" />
        <circle cx="200" cy="280" r="5" fill="#FFC93C" />
      </svg>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] uppercase tracking-eyebrow text-graphite">
        <span>Loading point</span>
        <span className="text-brand-deep">Delivery</span>
      </div>
    </div>
  );
}
