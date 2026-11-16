import { useEffect, useState } from 'react';

/**
 * Tracks the user's `prefers-reduced-motion` setting and keeps it live if the
 * OS preference changes mid-session. Every animated section reads this and
 * degrades to a static, accessible experience when it returns true.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    // addEventListener is supported in all evergreen browsers.
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
