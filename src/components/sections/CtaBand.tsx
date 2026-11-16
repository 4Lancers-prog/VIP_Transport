import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface CtaLink {
  label: string;
  to: string;
  /** Use a plain anchor (tel:, mailto:, external). */
  href?: boolean;
  icon?: ReactNode;
}

/** Neon-green closing band with animated stripes and two calls to action. */
export function CtaBand({
  title,
  copy,
  primary,
  secondary,
}: {
  title: string;
  copy?: string;
  primary: CtaLink;
  secondary?: CtaLink;
}) {
  const ref = useScrollReveal<HTMLDivElement>({ kind: 'blur', selector: ':scope > *', stagger: 0.12 });
  const darkBtn =
    'inline-flex items-center gap-2 rounded-none bg-night px-7 py-4 font-sans text-sm font-semibold uppercase tracking-wide text-brand transition-[transform,box-shadow] duration-300 ease-cinematic hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.8)]';
  const outlineBtn =
    'inline-flex items-center gap-2 rounded-none border-2 border-night/80 px-7 py-[14px] font-sans text-sm font-semibold uppercase tracking-wide text-black transition-colors duration-300 hover:bg-night hover:text-brand';

  const render = (l: CtaLink, cls: string) =>
    l.href ? (
      <a href={l.to} className={cls}>
        {l.icon}
        {l.label}
      </a>
    ) : (
      <Link to={l.to} className={cls}>
        {l.label} <ChevronRight size={18} strokeWidth={2.5} />
      </Link>
    );

  return (
    <section className="relative overflow-hidden bg-brand py-20 text-black md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] animate-gridpan"
        style={{
          backgroundImage: 'repeating-linear-gradient(135deg, #0b0e12 0 2px, transparent 2px 22px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />
      <div ref={ref} className="shell relative grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-16">
        <div>
          <h2 className="max-w-2xl font-display text-3xl leading-[0.98] text-balance md:text-5xl">{title}</h2>
          {copy && <p className="mt-5 max-w-xl text-black/75 md:text-lg">{copy}</p>}
        </div>
        <div className="flex flex-wrap gap-4 md:justify-end">
          {render(primary, darkBtn)}
          {secondary && render(secondary, outlineBtn)}
        </div>
      </div>
    </section>
  );
}
