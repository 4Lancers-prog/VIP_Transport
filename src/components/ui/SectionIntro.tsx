import { type ReactNode } from 'react';
import { SplitHeading } from './SplitHeading';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/** Label + masked-line heading + blurred-in copy. Shared section opener. */
export function SectionIntro({
  label,
  lines,
  children,
  className = '',
  align = 'left',
}: {
  label?: string;
  lines: ReactNode[];
  children?: ReactNode;
  className?: string;
  align?: 'left' | 'center';
}) {
  const copy = useScrollReveal<HTMLDivElement>({ kind: 'blur', selector: ':scope > *', stagger: 0.1 });
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {label && (
        <p className={`eyebrow mb-5 flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
          <span className="inline-block h-2 w-2 bg-brand animate-glowpulse" />
          {label}
        </p>
      )}
      <SplitHeading className="font-display text-4xl leading-[0.98] text-ink text-balance md:text-6xl" lines={lines} />
      {children && (
        <div ref={copy} className={`mt-7 space-y-5 text-graphite md:text-lg ${center ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
          {children}
        </div>
      )}
    </div>
  );
}
