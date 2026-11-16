import { useParallax } from '../../hooks/useParallax';
import { AnimatedText } from '../ui/AnimatedText';
import { SplitHeading } from '../ui/SplitHeading';
import { COVERAGE } from '../../data/company';

/**
 * Coverage band with a parallax route-grid backdrop. Copy stays generic until
 * a confirmed service-area list exists — we never claim unverified reach.
 */
export function Coverage() {
  const bg = useParallax<HTMLDivElement>(0.25);

  return (
    <section className="relative overflow-hidden border-y border-charcoal bg-charcoal/10 py-28 md:py-36">
      {/* Parallax animated grid */}
      <div ref={bg} className="pointer-events-none absolute inset-0 -top-24 opacity-40">
        <svg className="h-full w-full" viewBox="0 0 1000 600" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <radialGradient id="cov" cx="50%" cy="30%" r="60%">
              <stop offset="0" stopColor="#F58200" stopOpacity="0.18" />
              <stop offset="1" stopColor="#F58200" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1000" height="600" fill="url(#cov)" />
          {Array.from({ length: 21 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="600" stroke="#2a2a2a" strokeWidth="1" />
          ))}
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 50} x2="1000" y2={i * 50} stroke="#2a2a2a" strokeWidth="1" />
          ))}
          <path d="M120 480 L300 360 L420 400 L620 230 L820 150" stroke="#F58200" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {[[120, 480], [420, 400], [820, 150]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill="#F58200" />
          ))}
        </svg>
      </div>

      <div className="shell relative text-center">
        <p className="section-label mb-5">Coverage</p>
        <SplitHeading
          as="h2"
          className="mx-auto max-w-4xl font-display text-4xl leading-[0.95] text-warm md:text-6xl"
          lines={[COVERAGE.headline]}
        />
        <AnimatedText
          text={COVERAGE.copy}
          className="mx-auto mt-7 max-w-xl text-steel"
        />
      </div>
    </section>
  );
}
