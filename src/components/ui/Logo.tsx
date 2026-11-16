import { BRAND } from '../../data/company';

/**
 * Brand signature. If a real logo file is supplied (BRAND.logoSrc) it's used at
 * a restrained size. Until then, a typographic wordmark stands in. The wordmark
 * text inherits its colour from the parent (so it works on both light and dark
 * bars); the "VIP" chip stays yellow with dark text.
 */
export function Logo({ className = '', compact = false }: { className?: string; compact?: boolean }) {
  if (BRAND.logoSrc) {
    return (
      <img
        src={BRAND.logoSrc}
        alt={`${BRAND.name} logo`}
        className={`h-auto w-[108px] md:w-[128px] ${className}`}
        width={128}
        height={40}
      />
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 font-display leading-none ${className}`}
      aria-label={BRAND.name}
    >
      <span className="flex h-7 items-center bg-brand px-1.5 text-black shadow-[0_0_14px_rgba(193,154,51,0.5)]">VIP</span>
      {!compact && <span className="tracking-tight">TRANSPORTS</span>}
    </span>
  );
}
