import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Gauge, Volume2, VolumeX } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { lockScroll, scrollToInstant } from '../../lib/lenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ScrollIndicator } from '../ui/ScrollIndicator';
import introLg from '../../assets/hero/hero-intro-720.mp4';
import introSm from '../../assets/hero/hero-intro-480.mp4';
import introEnd from '../../assets/hero/hero-intro-end.webp';

/**
 * Home hero with a cinematic intro.
 *
 *  1. INTRO   – page, navbar and copy stay dark; the 10 s brand film plays
 *               (headlights in fog → VIP logo → truck drives out and turns).
 *               Scrolling, a key press or “Skip intro” jumps to the end.
 *  2. SETTLE  – on the final frame the film shrinks and glides into its
 *               resting place (right side on desktop, top band on mobile),
 *               then the headline, copy and buttons animate in and the
 *               navbar fades back.
 *  3. SCROLL  – the truck drifts and the copy lifts away as you scroll.
 *
 * The intro plays once per browser session; repeat visits, reduced-motion
 * users and browsers that block autoplay go straight to the settled layout.
 */

const SESSION_KEY = 'vip-intro-seen';
const FILM_SECONDS = 10;

/** Resting place of the film. Shared by the measuring target and the film. */
const FINAL_BOX =
  'absolute left-0 right-0 top-[84px] aspect-video ' +
  'lg:left-auto lg:right-[-1%] lg:top-[max(110px,calc(54%-15vw))] lg:w-[min(66vw,1320px)]';

function shouldPlayIntro(reduced: boolean) {
  if (reduced) return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) !== '1';
  } catch {
    return true;
  }
}

export function Hero() {
  const reduced = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const filmWrap = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const finished = useRef(false);

  // Decided once on mount.
  const [playIntro] = useState(() => shouldPlayIntro(reduced));
  const [phase, setPhase] = useState<'intro' | 'settled'>(playIntro ? 'intro' : 'settled');
  const [muted, setMuted] = useState(true);
  const [src] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 900 ? introSm : introLg,
  );

  /** Copy entrance (headline lines, text, buttons, rule). */
  const revealCopy = useCallback(
    (delay = 0) => {
      const el = root.current;
      if (!el) return;
      if (reduced) {
        gsap.set(el.querySelectorAll('[data-reveal], [data-reveal] > span, [data-fade]'), { opacity: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 }, delay });
      tl.to(el.querySelectorAll('[data-fade]'), { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0)
        .to(el.querySelector('[data-reveal="eyebrow"]'), { opacity: 1, y: 0 }, 0.1)
        .set(el.querySelector('[data-reveal="headline"]'), { opacity: 1, y: 0 }, 0.2)
        .fromTo(
          el.querySelectorAll('[data-reveal="headline"] > span'),
          { opacity: 0, y: 60, skewY: 4 },
          { opacity: 1, y: 0, skewY: 0, stagger: 0.12, duration: 1.1, ease: 'expo.out' },
          0.2,
        )
        .to(el.querySelector('[data-reveal="sub"]'), { opacity: 1, y: 0 }, 0.6)
        .to(el.querySelector('[data-reveal="cta"]'), { opacity: 1, y: 0 }, 0.75)
        .fromTo(el.querySelector('[data-rule]'), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power2.out' }, 0.85);
    },
    [reduced],
  );

  /** End of the intro: settle the film, bring back the page. Runs once. */
  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* private mode – ignore */
    }

    const v = video.current;
    if (v) {
      v.poster = introEnd; // in case the film never painted a frame
      v.muted = true;
      setMuted(true);
    }

    // Keep scroll locked a moment longer so the wheel/swipe that skipped the
    // intro doesn't also scroll the page past the hero.
    document.documentElement.classList.remove('intro-on');
    window.setTimeout(() => {
      scrollToInstant(0);
      lockScroll(false);
    }, 1100);

    const wrap = filmWrap.current;
    const box = target.current;
    const section = root.current;
    if (!wrap || !box || !section) {
      setPhase('settled');
      revealCopy();
      return;
    }

    // FLIP: from full-screen to the measured resting box.
    gsap.to('[data-intro-ui]', { opacity: 0, duration: 0.4, pointerEvents: 'none' });
    gsap.fromTo(
      wrap,
      { left: 0, top: 0, right: 'auto', bottom: 'auto', width: section.clientWidth, height: wrap.offsetHeight },
      {
        left: box.offsetLeft,
        top: box.offsetTop,
        width: box.offsetWidth,
        height: box.offsetHeight,
        duration: 1.5,
        ease: 'expo.inOut',
        onComplete: () => {
          gsap.set(wrap, { clearProps: 'left,top,right,bottom,width,height' });
          setPhase('settled');
        },
      },
    );
    revealCopy(0.8);
  }, [revealCopy]);

  // React doesn't always sync the muted *property*; keep it explicit.
  useEffect(() => {
    if (video.current) video.current.muted = muted;
  }, [muted]);

  // Hide copy before first paint so nothing flashes during the intro.
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    gsap.set(el.querySelectorAll('[data-reveal]'), { opacity: 0, y: 28 });
    gsap.set(el.querySelectorAll('[data-fade]'), { opacity: 0 });
    if (playIntro) {
      document.documentElement.classList.add('intro-on');
      lockScroll(true);
    }
  }, [playIntro, reduced]);

  // Intro playback, skip controls and safety nets.
  useEffect(() => {
    if (!playIntro) {
      revealCopy(0.15);
      return;
    }
    const v = video.current;
    if (!v) return;

    let raf = 0;
    const tick = () => {
      if (progress.current && v.duration) {
        progress.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const skip = () => {
      if (finished.current) return;
      v.pause();
      if (v.duration) v.currentTime = Math.max(0, v.duration - 0.05);
      finish();
    };
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'End', 'Home', 'Escape'].includes(e.key)) {
        e.preventDefault();
        skip();
      }
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 4) skip();
    };

    v.addEventListener('ended', finish);
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchmove', skip, { passive: true });
    window.addEventListener('keydown', onKey);

    // Autoplay blocked (e.g. iOS low-power mode) → go straight to the layout.
    v.play().catch(() => skip());

    // Slow network: if the film hasn’t started within 4 s, don’t keep people waiting.
    const stall = window.setTimeout(() => {
      if (v.currentTime < 0.05) skip();
    }, 4000);
    // Belt and braces in case 'ended' never fires.
    const hardStop = window.setTimeout(skip, (FILM_SECONDS + 4) * 1000);

    (window as Window & { __vipSkipIntro?: () => void }).__vipSkipIntro = skip;

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(stall);
      window.clearTimeout(hardStop);
      v.removeEventListener('ended', finish);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchmove', skip);
      window.removeEventListener('keydown', onKey);
      // Leaving the page mid-intro must never leave the site locked/dark.
      lockScroll(false);
      document.documentElement.classList.remove('intro-on');
    };
  }, [playIntro, finish, revealCopy]);

  // Scroll-out parallax once settled.
  useEffect(() => {
    const el = root.current;
    if (!el || reduced || phase !== 'settled') return;
    const ctx = gsap.context(() => {
      const st = { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 };
      gsap.to('[data-parallax]', { xPercent: -6, yPercent: 8, scale: 1.06, ease: 'none', scrollTrigger: st });
      gsap.to('[data-copy]', { y: -90, opacity: 0.15, ease: 'none', scrollTrigger: st });
    }, el);
    return () => ctx.revert();
  }, [phase, reduced]);

  const intro = phase === 'intro';

  return (
    <section
      ref={root}
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[100svh] w-full overflow-hidden bg-night lg:flex lg:items-center"
    >
      {/* Atmosphere (fades in after the intro) */}
      <div data-fade className="pointer-events-none absolute inset-0 bg-neon-grid animate-gridpan opacity-40" aria-hidden="true" />
      <div
        data-fade
        className="pointer-events-none absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-brand/10 blur-[120px] animate-drift"
        aria-hidden="true"
      />

      {/* Invisible measuring box: where the film comes to rest. */}
      <div ref={target} className={`${FINAL_BOX} pointer-events-none invisible`} aria-hidden="true" />

      {/* ---- Film ---------------------------------------------------------- */}
      <div ref={filmWrap} className={`${intro ? 'absolute inset-x-0 top-0 h-[100svh]' : FINAL_BOX} z-[5]`}>
        <div data-parallax className="hero-film h-full w-full will-change-transform">
          <video
            ref={video}
            src={src}
            poster={playIntro ? undefined : introEnd}
            muted={muted}
            playsInline
            preload={playIntro ? 'auto' : 'none'}
            aria-label="VIP Transports brand film: a fuel tanker drives out of the fog"
            className={`h-full w-full ${intro ? 'object-contain lg:object-cover' : 'object-contain'}`}
          />
          {/* Neon floor glow under the wheels */}
          <div
            data-fade
            className="pointer-events-none absolute bottom-[10%] left-[14%] right-[4%] h-10 rounded-[50%] bg-brand/20 blur-2xl"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Readability scrim behind the copy on wide screens */}
      <div
        data-fade
        className="pointer-events-none absolute inset-y-0 left-0 z-[6] hidden w-[46%] bg-gradient-to-r from-black via-black/80 to-transparent lg:block"
        aria-hidden="true"
      />
      <div data-fade className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-32 bg-gradient-to-t from-black to-transparent" aria-hidden="true" />

      {/* ---- Copy ---------------------------------------------------------- */}
      <div className="shell relative z-10" aria-hidden={intro}>
        <div
          data-copy
          className="max-w-xl pb-16 pt-[calc(84px+56.25vw+1rem)] lg:max-w-[min(38vw,560px)] lg:py-28"
        >
          <p data-reveal="eyebrow" className="eyebrow-dark mb-6 flex items-center gap-3">
            <span className="inline-block h-2 w-2 bg-brand animate-glowpulse" />
            Your trusted transportation &amp; logistics partner
          </p>

          <h1 data-reveal="headline" className="text-[clamp(2.3rem,3.9vw,4rem)] leading-[1] text-warm">
            <span className="block">Moving your business</span>
            <span className="block">forward with reliable</span>
            <span className="block neon-text">transportation solutions</span>
          </h1>

          <div data-reveal="sub" className="mt-6 max-w-md space-y-4 text-base leading-relaxed text-steel lg:max-w-sm xl:max-w-md">
            <p>
              At VIP Transports, we understand that efficient transportation is essential to keeping your
              business running smoothly. We provide dependable transportation, goods distribution and fuel
              logistics solutions designed to meet the diverse requirements of businesses across
              industries.
            </p>
            <p className="hidden 2xl:block">
              With a focus on safety, timely delivery, operational efficiency and customer satisfaction, we
              help businesses move their goods and manage their logistics requirements with confidence.
            </p>
          </div>

          <div data-reveal="cta" className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/contact" className="btn-primary" tabIndex={intro ? -1 : undefined}>
              Get a Free Quote
              <ChevronRight size={18} strokeWidth={2.5} />
            </Link>
            <Link to="/services" className="btn-ghost-dark bg-night/40 backdrop-blur-sm" tabIndex={intro ? -1 : undefined}>
              <Gauge size={18} strokeWidth={2} />
              Explore Our Services
            </Link>
          </div>

          <span data-rule className="rule-neon mt-10 max-w-xs" />
        </div>
      </div>

      {/* ---- Intro controls ------------------------------------------------ */}
      {playIntro && (
        <div data-intro-ui className="fixed inset-x-0 bottom-0 z-20">
          <div className="shell flex items-center justify-end gap-3 pb-6 md:pb-8">
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
              className="intro-control flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-steel transition-colors hover:border-brand hover:text-brand"
            >
              {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
            <button
              type="button"
              onClick={() => (window as Window & { __vipSkipIntro?: () => void }).__vipSkipIntro?.()}
              className="intro-control rounded-full border border-white/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-steel transition-colors hover:border-brand hover:text-brand"
            >
              Skip intro
            </button>
          </div>
          <div className="h-[2px] w-full bg-white/5">
            <div
              ref={progress}
              className="h-full origin-left bg-brand shadow-[0_0_10px_rgba(193,154,51,0.8)]"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      )}

      {/* ---- Scroll indicator --------------------------------------------- */}
      <div data-fade className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 lg:block">
        <ScrollIndicator />
      </div>
    </section>
  );
}
