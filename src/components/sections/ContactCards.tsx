import type React from 'react';
import { Phone, Mail, MapPin, Navigation } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { CONTACT } from '../../data/company';

/** Contact page: call / email / visit cards. */
export function ContactCards() {
  const ref = useScrollReveal<HTMLDivElement>({ kind: 'cards', selector: '[data-card]', stagger: 0.14 });
  const linkCls = 'block font-display text-lg text-ink transition-colors hover:text-brand md:text-xl';
  return (
    <section className="relative bg-canvas pt-20 md:pt-28">
      <div ref={ref} className="shell grid gap-6 md:grid-cols-3">
        <article data-card className="neon-card group p-8 md:p-10">
          <Icon><Phone size={22} /></Icon>
          <h2 className="mt-8 font-display text-2xl text-ink">Call us</h2>
          <p className="mt-3 text-sm text-graphite">Speak with our team about transportation requirements, service enquiries and quotations.</p>
          <div className="mt-6 space-y-2">
            <a href={CONTACT.phoneHref} className={linkCls}>{CONTACT.phone}</a>
            <a href={CONTACT.phoneAltHref} className={linkCls}>{CONTACT.phoneAlt}</a>
          </div>
        </article>
        <article data-card className="neon-card group p-8 md:p-10">
          <Icon><Mail size={22} /></Icon>
          <h2 className="mt-8 font-display text-2xl text-ink">Email us</h2>
          <p className="mt-3 text-sm text-graphite">Send us your business enquiry or transportation requirements. Our team can connect with you to discuss the next steps.</p>
          <div className="mt-6 space-y-2">
            <a href={`mailto:${CONTACT.email}`} className={linkCls}>{CONTACT.email}</a>
            <a href={`mailto:${CONTACT.emailAlt}`} className={linkCls}>{CONTACT.emailAlt}</a>
          </div>
        </article>
        <article data-card className="neon-card group p-8 md:p-10">
          <Icon><MapPin size={22} /></Icon>
          <h2 className="mt-8 font-display text-2xl text-ink">Visit our office</h2>
          <address className="mt-3 not-italic text-graphite">
            {CONTACT.addressLines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </address>
          <a href={CONTACT.directionsHref} target="_blank" rel="noopener noreferrer" className="text-link mt-6">
            <Navigation size={16} /> Get Directions
          </a>
        </article>
      </div>
    </section>
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-sm border border-brand/40 text-brand transition-[background-color,color,box-shadow] duration-500 group-hover:bg-brand group-hover:text-black group-hover:shadow-[0_0_30px_rgba(193,154,51,0.55)]">
      {children}
    </span>
  );
}
