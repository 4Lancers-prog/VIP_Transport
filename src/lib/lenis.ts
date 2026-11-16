import type Lenis from 'lenis';

/**
 * Shared handle to the app's Lenis instance, so route changes can reset its
 * internal scroll target (window.scrollTo alone is overridden by Lenis), and
 * so the home intro can lock scrolling while the video plays.
 */
let instance: Lenis | null = null;
let locked = false;

export const setLenis = (l: Lenis | null) => {
  instance = l;
  if (l && locked) l.stop();
};

/** Lock / unlock page scrolling (used by the hero intro video). */
export function lockScroll(on: boolean) {
  locked = on;
  document.documentElement.style.overflow = on ? 'hidden' : '';
  if (instance) {
    if (on) instance.stop();
    else instance.start();
  }
}

/** Jump instantly to the top (or to an element), through Lenis when active. */
export function scrollToInstant(target: number | HTMLElement, offset = 0) {
  if (instance) {
    instance.scrollTo(target, { immediate: true, force: true, offset });
    if (!locked) instance.start();
  } else {
    const y =
      typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo(0, y);
  }
}

/** Smooth scroll to an element (used for #section links). */
export function scrollToSmooth(target: HTMLElement, offset = 0) {
  if (instance) instance.scrollTo(target, { offset, duration: 1.2 });
  else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
