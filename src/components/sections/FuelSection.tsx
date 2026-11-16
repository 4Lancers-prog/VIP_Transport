import { type ReactNode } from 'react';
import { FuelNozzle } from '../ui/FuelNozzle';
import { SplitHeading } from '../ui/SplitHeading';

type Variant = 'tank' | 'tanker' | 'route';

interface FuelSectionProps {
  variant?: Variant;
  eyebrow?: string;
  headingLines?: ReactNode[];
  copy?: string;
}

const DEFAULTS: Record<Variant, { eyebrow: string; headingLines: ReactNode[]; copy: string }> = {
  tank: {
    eyebrow: 'Energy distribution',
    headingLines: ['FUEL, ON', <>DEMAND.</>],
    copy: 'Metered, controlled, dependable — the right volume delivered and dispensed exactly where your operation needs it.',
  },
  tanker: {
    eyebrow: 'Loaded for the road',
    headingLines: ['EVERY TANKER,', <>FILLED <span className="text-brand-deep">RIGHT.</span></>],
    copy: 'From loading point to delivery, each consignment is loaded with care and accounted for across the whole movement.',
  },
  route: {
    eyebrow: 'Source to site',
    headingLines: ['ONE CONTINUOUS', <>FLOW.</>],
    copy: 'A single line of energy — from the fuel source, through the tanker, to your destination.',
  },
};

/**
 * Section wrapper around the petrol-nozzle animation (light surface). Pairs the
 * fuel jet with editorial copy; `variant` chooses what the nozzle fills.
 */
export function FuelSection({ variant = 'tank', eyebrow, headingLines, copy }: FuelSectionProps) {
  const d = DEFAULTS[variant];
  return (
    <section
      aria-label="Fuel dispensing"
      className="relative overflow-hidden border-y border-line bg-cream py-14 md:py-20"
    >
      <div className="shell grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <p className="section-label mb-4">{eyebrow ?? d.eyebrow}</p>
          <SplitHeading
            className="font-display text-4xl leading-[0.95] text-ink md:text-6xl"
            lines={headingLines ?? d.headingLines}
          />
          <p className="mt-6 max-w-sm text-graphite">{copy ?? d.copy}</p>
        </div>

        <FuelNozzle variant={variant} className="min-h-[340px] md:min-h-[420px]" />
      </div>
    </section>
  );
}
