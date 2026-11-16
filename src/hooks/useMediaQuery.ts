import { useEffect, useState } from 'react';

/**
 * Reactive media-query hook. Returns the correct value on the very first render
 * (reads matchMedia synchronously), then keeps it live as the viewport changes —
 * so layouts that depend on breakpoints (e.g. "is this a phone?") are right
 * immediately, with no flash.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
