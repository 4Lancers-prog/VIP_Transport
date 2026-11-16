import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * ============================================================================
 *  FUEL NOZZLE — a petrol dispenser "gun" shooting a real liquid fuel jet.
 * ============================================================================
 *
 *  HOW IT'S MADE
 *  - The nozzle (the "gun") is drawn as inline SVG, positioned over a <canvas>.
 *  - A Canvas 2D particle emitter fires amber droplets from the spout tip with
 *    an initial velocity + gravity, so they arc out like a real fuel jet.
 *  - Droplets that reach the target are "absorbed":
 *      • variant="tank"   → fills a tank; the amber level rises and glows.
 *      • variant="tanker" → fills the side-view petroleum tanker.
 *      • variant="route"  → feeds a glowing route line that charges toward a
 *                           destination node (logistics metaphor).
 *
 *  PERFORMANCE / A11Y
 *  - rAF loop runs ONLY while the component is on screen (IntersectionObserver).
 *  - DPR-aware, ResizeObserver-driven canvas sizing.
 *  - prefers-reduced-motion → a static "already filled / drawn" frame, no loop.
 *
 *  This is a visual metaphor for fuel distribution — not a depiction of real
 *  fuel handling.
 * ============================================================================
 */

type Variant = 'tank' | 'tanker' | 'route';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
}

interface FuelNozzleProps {
  variant?: Variant;
  className?: string;
}

const ORANGE = '#FFB400';
const AMBER = '#FFC93C';
const AMBER_LIGHT = '#FFE2B0';

export function FuelNozzle({ variant = 'tank', className = '' }: FuelNozzleProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let W = 0;
    let H = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const particles: Particle[] = [];
    let fill = 0; // 0..1 for tank/tanker
    let charge = 0; // 0..1 for route
    let holdUntil = 0; // timestamp to hold a full state before resetting
    let last = performance.now();

    // Geometry recomputed on resize (CSS-pixel space).
    let geo = computeGeometry(variant, 1, 1);

    function size() {
      const rect = wrap!.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      canvas!.style.width = `${W}px`;
      canvas!.style.height = `${H}px`;
      geo = computeGeometry(variant, W, H);
    }

    function emit() {
      const { tipX, tipY, aimX, aimY } = geo;
      const count = 3;
      for (let i = 0; i < count; i++) {
        const ax = aimX - tipX;
        const ay = aimY - tipY;
        const d = Math.hypot(ax, ay) || 1;
        const speed = 3.6 + Math.random() * 1.6;
        const spread = (Math.random() - 0.5) * 0.5;
        particles.push({
          x: tipX + (Math.random() - 0.5) * 3,
          y: tipY + (Math.random() - 0.5) * 3,
          vx: (ax / d) * speed + spread,
          vy: (ay / d) * speed,
          r: 1.6 + Math.random() * 1.8,
          life: 1,
        });
      }
    }

    function step(dt: number) {
      const g = 0.16 * dt; // gravity per frame-normalised step
      const full = variant === 'route' ? charge >= 1 : fill >= 1;
      const now = performance.now();

      if (!full && now >= holdUntil) emit();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += g;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= 0.004 * dt;

        const absorbed = absorb(p, geo, variant, fill);
        if (absorbed) {
          if (variant === 'route') charge = Math.min(1, charge + 0.0055);
          else fill = Math.min(1, fill + 0.0045);
          particles.splice(i, 1);
          continue;
        }
        if (p.life <= 0 || p.y > H + 40 || p.x < -40 || p.x > W + 40) {
          particles.splice(i, 1);
        }
      }

      // Loop: once full, hold briefly, then reset so the pour repeats.
      if (full && holdUntil === 0) holdUntil = now + 1400;
      if (full && now >= holdUntil && particles.length === 0) {
        fill = 0;
        charge = 0;
        holdUntil = 0;
      }
    }

    function render(time: number) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.save();
      ctx!.scale(dpr, dpr);

      drawTarget(ctx!, geo, variant, fill, charge, time);

      // Fuel jet droplets.
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = AMBER_LIGHT;
        ctx!.globalAlpha = Math.max(0.2, p.life);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      ctx!.restore();
    }

    function loop(now: number) {
      if (!running) return;
      const dt = Math.min(2.5, (now - last) / 16.6667);
      last = now;
      step(dt);
      render(now);
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    }

    function drawStatic() {
      // Reduced motion: a single filled/charged frame, no animation.
      fill = 1;
      charge = 1;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.save();
      ctx!.scale(dpr, dpr);
      drawTarget(ctx!, geo, variant, 1, 1, 0);
      ctx!.restore();
    }

    size();
    const ro = new ResizeObserver(() => {
      size();
      if (reduced) drawStatic();
    });
    ro.observe(wrap);

    if (reduced) {
      drawStatic();
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) start();
          else stop();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(wrap);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
    };
  }, [variant, reduced]);

  return (
    <div
      ref={wrapRef}
      className={`relative w-full ${className}`}
      role="img"
      aria-label="A fuel dispenser nozzle pouring fuel"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      {/* The nozzle "gun" sits on top of the canvas, anchored to the emit point. */}
      <NozzleSVG variant={variant} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Geometry                                                                   */
/* -------------------------------------------------------------------------- */

interface Geo {
  tipX: number;
  tipY: number;
  aimX: number;
  aimY: number;
  tank: { x: number; y: number; w: number; h: number; r: number };
  route: { from: [number, number]; to: [number, number] };
}

function computeGeometry(variant: Variant, W: number, H: number): Geo {
  if (variant === 'route') {
    const tipX = W * 0.14;
    const tipY = H * 0.30;
    return {
      tipX,
      tipY,
      aimX: W * 0.4,
      aimY: H * 0.5,
      tank: { x: 0, y: 0, w: 0, h: 0, r: 0 },
      route: { from: [W * 0.14, H * 0.62], to: [W * 0.9, H * 0.42] },
    };
  }

  // tank + tanker: nozzle pours down into a container centred low.
  const tankW = W * (variant === 'tanker' ? 0.62 : 0.44);
  const tankH = H * (variant === 'tanker' ? 0.34 : 0.5);
  const tankX = (W - tankW) / 2;
  const tankY = H * 0.46;
  const tipX = tankX + tankW * 0.5;
  const tipY = H * 0.14;
  return {
    tipX,
    tipY,
    aimX: tipX,
    aimY: tankY + tankH * 0.5,
    tank: { x: tankX, y: tankY, w: tankW, h: tankH, r: variant === 'tanker' ? tankH / 2 : 10 },
    route: { from: [0, 0], to: [0, 0] },
  };
}

/* -------------------------------------------------------------------------- */
/*  Absorption test                                                            */
/* -------------------------------------------------------------------------- */

function absorb(p: Particle, geo: Geo, variant: Variant, fill: number): boolean {
  if (variant === 'route') {
    // Absorbed once it reaches the route's start reservoir area.
    const [rx, ry] = geo.route.from;
    return Math.hypot(p.x - rx, p.y - ry) < 26 && p.y > ry - 20;
  }
  const t = geo.tank;
  const fillTopY = t.y + t.h - fill * t.h;
  return p.x > t.x && p.x < t.x + t.w && p.y >= fillTopY;
}

/* -------------------------------------------------------------------------- */
/*  Target drawing                                                             */
/* -------------------------------------------------------------------------- */

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function drawTarget(
  ctx: CanvasRenderingContext2D,
  geo: Geo,
  variant: Variant,
  fill: number,
  charge: number,
  time: number,
) {
  if (variant === 'route') {
    drawRoute(ctx, geo, charge, time);
    return;
  }
  const t = geo.tank;

  // Container casing.
  ctx.save();
  roundRectPath(ctx, t.x, t.y, t.w, t.h, t.r);
  ctx.strokeStyle = '#3a3b3f';
  ctx.lineWidth = 3;
  ctx.fillStyle = 'rgba(20,21,24,0.6)';
  ctx.fill();
  ctx.stroke();

  // Clip to the container and draw the rising fuel.
  roundRectPath(ctx, t.x, t.y, t.w, t.h, t.r);
  ctx.clip();

  const level = t.y + t.h - fill * t.h;
  const grad = ctx.createLinearGradient(0, level, 0, t.y + t.h);
  grad.addColorStop(0, AMBER);
  grad.addColorStop(1, ORANGE);
  ctx.fillStyle = grad;

  // Wavy liquid surface.
  ctx.beginPath();
  ctx.moveTo(t.x, level);
  const amp = fill > 0 && fill < 1 ? 3 : 1.2;
  for (let x = t.x; x <= t.x + t.w; x += 6) {
    const y = level + Math.sin(x * 0.06 + time * 0.004) * amp;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(t.x + t.w, t.y + t.h);
  ctx.lineTo(t.x, t.y + t.h);
  ctx.closePath();
  ctx.fill();

  // Surface glow line.
  ctx.beginPath();
  ctx.moveTo(t.x, level);
  for (let x = t.x; x <= t.x + t.w; x += 6) {
    const y = level + Math.sin(x * 0.06 + time * 0.004) * amp;
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = AMBER_LIGHT;
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.restore();

  if (variant === 'tanker') drawTankerOutline(ctx, t);
}

function drawTankerOutline(ctx: CanvasRenderingContext2D, t: Geo['tank']) {
  // Wheels + cab hint so the filled cylinder reads as a petroleum tanker.
  ctx.save();
  ctx.fillStyle = '#0c0d0f';
  const wy = t.y + t.h + 10;
  const xs = [t.x + t.w * 0.22, t.x + t.w * 0.34, t.x + t.w * 0.78, t.x + t.w * 0.9];
  for (const x of xs) {
    ctx.beginPath();
    ctx.arc(x, wy, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#c9ccd1';
    ctx.beginPath();
    ctx.arc(x, wy, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0c0d0f';
  }
  // Cab block
  ctx.fillStyle = ORANGE;
  roundRectPath(ctx, t.x + t.w + 6, t.y + t.h * 0.3, t.w * 0.16, t.h * 0.7, 4);
  ctx.fill();
  ctx.restore();
}

function drawRoute(ctx: CanvasRenderingContext2D, geo: Geo, charge: number, time: number) {
  const [fx, fy] = geo.route.from;
  const [tx, ty] = geo.route.to;
  const cx = (fx + tx) / 2;
  const cy = Math.min(fy, ty) - 60;

  // Base route (dim).
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(fx, fy);
  ctx.quadraticCurveTo(cx, cy, tx, ty);
  ctx.strokeStyle = '#2a2b2f';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Charged portion grows with `charge`.
  const steps = 60;
  ctx.beginPath();
  for (let i = 0; i <= steps * charge; i++) {
    const u = i / steps;
    const x = (1 - u) * (1 - u) * fx + 2 * (1 - u) * u * cx + u * u * tx;
    const y = (1 - u) * (1 - u) * fy + 2 * (1 - u) * u * cy + u * u * ty;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = ORANGE;
  ctx.lineWidth = 5;
  ctx.shadowColor = ORANGE;
  ctx.shadowBlur = 12;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Reservoir node + destination node.
  ctx.fillStyle = ORANGE;
  ctx.beginPath();
  ctx.arc(fx, fy, 7, 0, Math.PI * 2);
  ctx.fill();
  const destPulse = 7 + Math.sin(time * 0.006) * (charge >= 1 ? 2.5 : 0);
  ctx.beginPath();
  ctx.arc(tx, ty, destPulse, 0, Math.PI * 2);
  ctx.fillStyle = charge >= 1 ? AMBER : '#2a2b2f';
  ctx.fill();
  ctx.restore();
}

/* -------------------------------------------------------------------------- */
/*  The nozzle "gun" (SVG overlay)                                             */
/* -------------------------------------------------------------------------- */

function NozzleSVG({ variant }: { variant: Variant }) {
  // Position the nozzle so its spout tip sits at the emit point used in geometry.
  const pos =
    variant === 'route'
      ? 'left-[6%] top-[12%] w-[120px] -rotate-[20deg]'
      : 'left-1/2 top-[2%] w-[120px] -translate-x-1/2 rotate-90';

  return (
    <div className={`pointer-events-none absolute ${pos}`} aria-hidden="true">
      <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]">
        {/* Hose */}
        <path d="M2 64 C 20 64, 24 54, 40 54" stroke="#1a1d22" strokeWidth="10" strokeLinecap="round" />
        {/* Grip body */}
        <path d="M36 40 h40 q10 0 10 10 v16 q0 8 -8 8 h-18 q-10 0 -14 -10 l-10 -16 q-2 -8 8 -8 Z" fill="#FFB400" />
        {/* Trigger guard */}
        <path d="M58 66 q-2 12 10 14" stroke="#242424" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Trigger */}
        <path d="M60 60 l10 12" stroke="#242424" strokeWidth="5" strokeLinecap="round" />
        {/* Spout */}
        <rect x="84" y="44" width="62" height="12" rx="3" fill="#c9ccd1" />
        <rect x="140" y="43" width="10" height="14" rx="2" fill="#9aa1ab" />
        {/* Spout tip highlight */}
        <rect x="146" y="45" width="5" height="10" rx="2" fill="#6d7580" />
        {/* Body highlight */}
        <path d="M40 44 h30" stroke="#FFC93C" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      </svg>
    </div>
  );
}
