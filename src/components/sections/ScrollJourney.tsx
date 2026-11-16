import { useEffect, useRef, type ReactNode } from 'react';
import { MapPin, Factory, Warehouse } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Pinned, scroll-SCRUBBED journey (light surface). The tanker travels
 * left→right strictly in step with scroll, the yellow route line draws, road
 * markings stream, and destination markers appear in sequence. On reduced
 * motion or narrow screens the pin is dropped for a static tableau.
 */
export function ScrollJourney() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el || reduced) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const route = el.querySelector<SVGPathElement>('[data-route]');
        const markers = el.querySelectorAll('[data-marker]');
        const markings = el.querySelectorAll('[data-marking]');
        const bg = el.querySelector('[data-bg]');

        if (route) {
          const len = route.getTotalLength();
          gsap.set(route, { strokeDasharray: len, strokeDashoffset: len });
        }
        gsap.set(markers, { opacity: 0, y: 18 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=2200',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to('[data-truck]', { xPercent: 560, ease: 'none' }, 0);
        tl.to(bg, { xPercent: -12, ease: 'none' }, 0);
        // Warm the light surface very subtly as the journey progresses.
        tl.to(el, { backgroundColor: '#F2EEDF', ease: 'none' }, 0);
        if (route) tl.to(route, { strokeDashoffset: 0, ease: 'none' }, 0);
        tl.to(markings, { xPercent: -140, ease: 'none' }, 0);
        markers.forEach((m, i) => {
          tl.to(m, { opacity: 1, y: 0, duration: 0.14 }, 0.22 + i * 0.22);
        });
      }, el);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    // Stable wrapper: GSAP pinning wraps the <section> in a pin-spacer, so
    // React must remove THIS div on route change, never the moved section.
    <div>
      <section
        ref={root}
        aria-label="The journey of a consignment"
        className="relative flex min-h-[70svh] items-center overflow-hidden bg-cream md:min-h-screen"
        style={{ transition: 'background-color 0.2s linear' }}
      >
        {/* Parallax backdrop: distant skyline silhouette */}
        <div data-bg className="pointer-events-none absolute inset-0 opacity-[0.12]">
          <div className="absolute bottom-[30%] left-0 flex h-28 w-[140%] items-end gap-6 px-10">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="bg-brand"
                style={{ width: 28 + ((i * 13) % 40), height: 40 + ((i * 29) % 70) }}
              />
            ))}
          </div>
        </div>

        {/* Caption */}
        <div className="shell pointer-events-none absolute top-10 z-20">
          <p className="eyebrow">Reliable transportation solutions</p>
          <p className="mt-3 max-w-md font-display text-2xl text-ink md:text-4xl">
            Every consignment is a line drawn from pickup to delivery.
          </p>
        </div>

        {/* Route + road */}
        <div className="absolute inset-x-0 bottom-[26%] z-10">
          <svg
            className="h-24 w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              data-route
              d="M -20 90 C 300 60, 500 100, 760 70 S 1150 40, 1240 66"
              fill="none"
              stroke="#C19A33" style={{ filter: 'drop-shadow(0 0 6px rgba(193,154,51,0.9))' }}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          {/* Road surface (dark asphalt reads well on the light scene) */}
          <div className="relative mt-[-6px] h-16 w-full bg-[#0b0e12] border-y border-line">
            <div className="absolute top-1/2 flex w-[260%] -translate-y-1/2 gap-10 px-6">
              {Array.from({ length: 40 }).map((_, i) => (
                <span
                  key={i}
                  data-marking
                  className="h-1 w-12 shrink-0 bg-brand/70"
                />
              ))}
            </div>
          </div>

          {/* Truck (side view) riding on the road */}
          <div
            data-truck
            className="absolute bottom-10 left-[2%] w-32 will-change-transform md:w-40"
          >
            <TruckSide />
          </div>
        </div>

        {/* Destination markers */}
        <div className="shell pointer-events-none absolute inset-x-0 bottom-[42%] z-20">
          <div className="relative h-24">
            <JourneyMarker className="left-[8%]" icon={<Factory size={16} />} label="Pickup" sub="Your location" />
            <JourneyMarker className="left-[46%]" icon={<MapPin size={16} />} label="En route" sub="On the highway" />
            <JourneyMarker className="left-[82%]" icon={<Warehouse size={16} />} label="Delivery" sub="On schedule" />
          </div>
        </div>
      </section>
    </div>
  );
}

function JourneyMarker({
  className = '',
  icon,
  label,
  sub,
}: {
  className?: string;
  icon: ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <div data-marker className={`absolute ${className}`}>
      <div className="flex items-center gap-2 text-brand">
        <span className="flex h-7 w-7 items-center justify-center rounded-sm border border-brand/60">{icon}</span>
        <span className="font-display text-sm uppercase tracking-wide text-ink">{label}</span>
      </div>
      <p className="mt-1 pl-9 text-xs text-graphite">{sub}</p>
    </div>
  );
}

/** Minimal side-view tanker as inline SVG. */
function TruckSide() {
  return (
    <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="18" y="30" width="96" height="26" rx="13" fill="#4A4E55" />
      <rect x="28" y="38" width="80" height="10" rx="2" fill="#C19A33" />
      <path d="M120 56 V34 q0-6 6-6 h16 l10 12 v16 Z" fill="#C19A33" />
      <path d="M131 34 h9 l7 9 h-16 Z" fill="#2a2d33" />
      <rect x="18" y="56" width="132" height="4" fill="#3a3d42" />
      <g fill="#1a1b1e">
        <circle cx="40" cy="62" r="7" />
        <circle cx="96" cy="62" r="7" />
        <circle cx="134" cy="62" r="7" />
      </g>
      <g fill="#4A4E55">
        <circle cx="40" cy="62" r="3" />
        <circle cx="96" cy="62" r="3" />
        <circle cx="134" cy="62" r="3" />
      </g>
      <circle cx="150" cy="50" r="2.5" fill="#FFE7A0" />
    </svg>
  );
}
