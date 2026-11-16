import { type CSSProperties } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CLIENTS, type Client } from '../../data/company';

/**
 * Infinite, horizontally-scrolling strip of client logos. The track is
 * duplicated once and translated by exactly -50%, so the loop is seamless.
 * Logos sit on small, uniform white tiles (reversed/white logos get a dark
 * chip). Hover/focus pauses the motion; under reduced-motion it falls back to
 * a static, centered wrap — no animation, all logos visible.
 */
export function ClientsMarquee({ speedSeconds = 38 }: { speedSeconds?: number }) {
  const reduced = useReducedMotion();

  // Reduced motion: static wrap, no marquee.
  if (reduced) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4">
        {CLIENTS.map((c) => (
          <LogoTile key={c.name} client={c} />
        ))}
      </div>
    );
  }

  return (
    <div className="group marquee-mask relative w-full overflow-hidden">
      <div
        className="flex w-max animate-marquee group-hover:marquee-paused group-focus-within:marquee-paused"
        style={{ '--marquee-duration': `${speedSeconds}s` } as CSSProperties}
      >
        {/* Two identical sequences. Each carries its tile gap AND a matching
            trailing gap (pr-4), so the whole track is evenly spaced and a -50%
            translate lands sequence 2 exactly where sequence 1 began — seamless. */}
        {[0, 1].map((seq) => (
          <div key={seq} className="flex shrink-0 gap-4 pr-4" aria-hidden={seq === 1}>
            {CLIENTS.map((c) => (
              <LogoTile key={`${seq}-${c.name}`} client={c} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LogoTile({ client }: { client: Client }) {
  return (
    <div
      className={`flex h-20 w-36 shrink-0 items-center justify-center rounded-md border px-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(193,154,51,0.45)] md:h-24 md:w-44 ${
        client.dark ? 'border-line bg-panel' : 'border-white/10 bg-white'
      }`}
    >
      <img
        src={client.logoSrc}
        alt={`${client.name} logo`}
        loading="lazy"
        className="max-h-12 w-auto max-w-full object-contain md:max-h-14"
      />
    </div>
  );
}
