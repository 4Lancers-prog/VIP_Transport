/**
 * Static poster shown instead of the WebGL canvas when:
 *   - WebGL is unavailable, or
 *   - the user prefers reduced motion.
 *
 * It's an SVG side-silhouette of a petroleum tanker over the same dark,
 * orange-lit atmosphere — so the hero still reads as "fuel tanker", fast, with
 * zero GPU cost and no motion.
 */
export function HeroPoster() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_30%,rgba(255,180,0,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_80%_at_80%_90%,rgba(159,180,208,0.10),transparent_60%)]" />
      <div className="absolute inset-0 bg-grain opacity-60" />

      {/* Tanker silhouette */}
      <svg
        className="absolute bottom-[12%] right-[-2%] w-[min(86vw,1100px)] max-w-none opacity-95"
        viewBox="0 0 900 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9aa1ab" />
            <stop offset="0.5" stopColor="#d7dbe0" />
            <stop offset="1" stopColor="#6d7580" />
          </linearGradient>
          <linearGradient id="road" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FFB400" stopOpacity="0" />
            <stop offset="0.5" stopColor="#FFB400" />
            <stop offset="1" stopColor="#FFB400" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Tank */}
        <rect x="120" y="120" width="430" height="110" rx="55" fill="url(#steel)" />
        <rect x="150" y="155" width="370" height="40" rx="6" fill="#FFB400" />
        {/* Cab */}
        <path d="M560 230 V150 q0-20 20-20 h70 l40 50 v50 Z" fill="#FFB400" />
        <path d="M612 150 h40 l30 38 h-70 Z" fill="#0a0f14" />
        {/* Chassis */}
        <rect x="120" y="230" width="560" height="14" fill="#1a1d22" />
        {/* Wheels */}
        {[180, 250, 430, 500, 620].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="252" r="26" fill="#0c0d0f" />
            <circle cx={cx} cy="252" r="11" fill="#c9ccd1" />
          </g>
        ))}
        {/* Headlight glow */}
        <circle cx="688" cy="212" r="8" fill="#ffd27a" />
      </svg>

      {/* Animated-looking road line (static here) */}
      <div className="absolute bottom-[14%] left-0 h-px w-full bg-[image:url()]">
        <div className="h-px w-full" style={{ background: 'url(#road)' }} />
      </div>
      <svg
        className="absolute bottom-[13%] left-0 h-2 w-full"
        viewBox="0 0 900 8"
        preserveAspectRatio="none"
      >
        <rect x="0" y="3" width="900" height="2" fill="url(#road)" />
      </svg>
    </div>
  );
}
