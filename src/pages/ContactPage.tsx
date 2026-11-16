import { Phone, Mail } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { ContactCards } from '../components/sections/ContactCards';
import { Contact } from '../components/sections/Contact';
import { Faq } from '../components/sections/Faq';
import { CtaBand } from '../components/sections/CtaBand';
import { useSeo } from '../hooks/useSeo';
import { SEO, CONTACT } from '../data/company';

export function ContactPage() {
  useSeo(SEO.contact);
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let’s Discuss Your Transportation and Logistics Requirements"
        lede="Looking for dependable transportation, distribution or fuel logistics services? Get in touch with VIP Transports. Our team is ready to understand your business requirements, answer your questions and help you explore suitable transportation solutions."
      />
      <ContactCards />
      <Contact />
      <Faq />
      <CtaBand
        title="Your business deserves a reliable logistics partner"
        copy="Whether you are looking for regular goods transportation, organised distribution support or fuel logistics, VIP Transports is ready to discuss your requirements. Connect with us today and take the next step towards a dependable transportation partnership."
        primary={{ label: `Call ${CONTACT.phone}`, to: CONTACT.phoneHref, href: true, icon: <Phone size={18} /> }}
        secondary={{ label: 'Email Us', to: `mailto:${CONTACT.email}`, href: true, icon: <Mail size={18} /> }}
      />
    </>
  );
}
