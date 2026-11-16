import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Logo } from './ui/Logo';
import { NAV_LINKS, SERVICES, CONTACT, VERIFIED, BRAND, DEVELOPER } from '../data/company';

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const rule = el.querySelector('[data-footer-rule]');
    if (!rule) return;
    const ctx = gsap.context(() => {
      gsap.from(rule, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    }, el);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  const year = new Date().getFullYear();
  const labelCls = 'font-sans text-xs uppercase tracking-eyebrow text-steel';

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line bg-night pt-16 text-warm">
      <div className="shell">
        <span data-footer-rule className="rule-neon mb-14 h-[2px]" />

        <div className="grid gap-12 pb-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo className="text-xl text-warm" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel">
              Dependable transportation, goods distribution and fuel logistics
              solutions for businesses, from our base in Bengaluru.
            </p>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <p className={`${labelCls} mb-5`}>Navigate</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-steel transition-colors hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <p className={`${labelCls} mb-5`}>Services</p>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link to={`/services#${s.id}`} className="text-sm text-steel transition-colors hover:text-brand">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className={`${labelCls} mb-5`}>Get in touch</p>
            {VERIFIED.contact ? (
              <ul className="space-y-3 text-sm">
                <li>
                  <a href={CONTACT.phoneHref} className="flex items-center gap-2 text-steel hover:text-brand">
                    <Phone size={15} /> {CONTACT.phone}
                  </a>
                </li>
                {CONTACT.phoneAlt && (
                  <li>
                    <a href={CONTACT.phoneAltHref} className="flex items-center gap-2 text-steel hover:text-brand">
                      <Phone size={15} /> {CONTACT.phoneAlt}
                    </a>
                  </li>
                )}
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-steel hover:text-brand">
                    <Mail size={15} /> {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${CONTACT.emailAlt}`} className="flex items-center gap-2 text-steel hover:text-brand">
                    <Mail size={15} /> {CONTACT.emailAlt}
                  </a>
                </li>
                {CONTACT.addressLines.length > 0 && (
                  <li className="flex items-start gap-2 text-steel">
                    <MapPin size={15} className="mt-0.5 shrink-0" />
                    <span>{CONTACT.addressLines.join(', ')}</span>
                  </li>
                )}
              </ul>
            ) : (
              <Link to="/contact" className="btn-ghost-dark !px-5 !py-3 text-xs">
                Request a Quote
              </Link>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 py-7 text-xs text-steel md:flex-row md:items-center">
          <p>
            © {year} {BRAND.name}. All rights reserved.
          </p>
          <p>Transportation, distribution &amp; fuel logistics in Bengaluru.</p>
          <p>
            Designed &amp; developed by{' '}
            <a
              href={DEVELOPER.url}
              target="_blank"
              rel="noopener"
              className="font-semibold text-warm underline-offset-4 transition-colors hover:text-brand hover:underline focus-visible:text-brand focus-visible:underline"
            >
              {DEVELOPER.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
