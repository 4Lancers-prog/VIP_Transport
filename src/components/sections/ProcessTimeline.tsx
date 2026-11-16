import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { PROCESS } from '../../data/company';
import { SectionIntro } from '../ui/SectionIntro';

/**
 * Operational timeline on a light surface. A single yellow route line draws
 * across/down all five stages as the section scrolls, each marker activating
 * as the line reaches it.
 */
export function ProcessTimeline() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const line = el.querySelector<SVGPathElement>('[data-line]');
    const steps = el.querySelectorAll<HTMLElement>('[data-step]');

    if (reduced) {
      if (line) gsap.set(line, { strokeDashoffset: 0 });
      gsap.set(steps, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (line) {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(line, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 70%', scrub: 0.5 },
        });
      }
      steps.forEach((step, i) => {
        gsap.from(step, {
          opacity: 0,
          y: 40,
          scale: 0.94,
          filter: 'blur(8px)',
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: step, start: 'top 80%', once: true },
          delay: i * 0.02,
        });
      });
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  return (
    <section id="process" ref={root} className="relative bg-cream py-24 md:py-36">
      <div className="shell">
        <div className="mb-16">
          <SectionIntro label="How it works" lines={['How our transportation', 'process works']} />
        </div>

        {/* Desktop: horizontal line across the top of the row */}
        <div className="relative">
          <svg
            className="absolute left-0 top-6 hidden h-8 w-full md:block"
            viewBox="0 0 1000 20"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path data-line d="M10 10 H990" stroke="#C19A33" style={{ filter: 'drop-shadow(0 0 6px rgba(193,154,51,0.8))' }} strokeWidth="2.5" fill="none" />
          </svg>

          <ol className="grid gap-10 md:grid-cols-5 md:gap-6">
            {PROCESS.map((step) => (
              <li key={step.index} data-step className="relative">
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-sm border border-brand bg-night font-display text-lg text-brand shadow-[0_0_18px_rgba(193,154,51,0.35)]">
                  {step.index}
                </span>
                <h3 className="mt-5 font-display text-xl text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-graphite">{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
