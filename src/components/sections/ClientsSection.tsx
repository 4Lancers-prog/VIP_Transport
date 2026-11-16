import { ClientsMarquee } from '../ui/ClientsMarquee';
import { SectionIntro } from '../ui/SectionIntro';
import { CLIENTS, VERIFIED } from '../../data/company';

/** Client logos in a seamless loop. Hidden when no approved logos exist. */
export function ClientsSection() {
  if (!VERIFIED.clients || CLIENTS.length === 0) return null;
  return (
    <section aria-label="Our clients" className="relative overflow-hidden border-y border-line bg-cream py-20 md:py-28">
      <div className="shell mb-12">
        <SectionIntro align="center" label="Our clients" lines={['Trusted by businesses.', 'Driven by relationships.']}>
          <p>
            Strong business relationships are built through consistency, communication and dependable
            service. We value the organisations that trust VIP Transports with their transportation and
            distribution requirements.
          </p>
        </SectionIntro>
      </div>
      <ClientsMarquee />
    </section>
  );
}
