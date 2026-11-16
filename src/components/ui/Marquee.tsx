import { type ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Infinite horizontal marquee. Duplicates its children and translates the track
 * with a pure CSS keyframe (GPU-friendly, no JS per frame). Pauses under
 * reduced motion. `reverse` flips direction; `speed` is seconds per loop.
 */
export function Marquee({
  children,
  speed = 24,
  reverse = false,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div className={`group relative flex overflow-hidden ${className}`}>
      <div
        className="flex min-w-full shrink-0 items-center"
        style={
          reduced
            ? undefined
            : {
                animation: `marquee ${speed}s linear infinite`,
                animationDirection: reverse ? 'reverse' : 'normal',
              }
        }
      >
        {children}
      </div>
      {!reduced && (
        <div
          aria-hidden="true"
          className="flex min-w-full shrink-0 items-center"
          style={{
            animation: `marquee ${speed}s linear infinite`,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
