import { Marquee } from '../ui/Marquee';
import { MARQUEE_WORDS } from '../../data/company';

/**
 * A scrolling keyword strip used as a transition between chapters. Two rows can
 * be stacked with opposite directions for a richer effect (see `reverse`).
 */
export function MarqueeStrip({ reverse = false, speed = 26 }: { reverse?: boolean; speed?: number }) {
  return (
    <div
      aria-hidden="true"
      className="marquee-fade select-none border-y border-charcoal bg-charcoal/20 py-5"
    >
      <Marquee speed={speed} reverse={reverse}>
        {MARQUEE_WORDS.map((w, i) => (
          <span key={`${w}-${i}`} className="flex items-center">
            <span className="px-6 font-display text-2xl uppercase tracking-tight text-warm/80 md:text-4xl">
              {w}
            </span>
            <span className="text-brand">◆</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
