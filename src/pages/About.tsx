import { ShieldCheck, Handshake, HardHat, HeartHandshake, Zap, RefreshCcw } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Approach, MissionVision, WhyBusinesses } from '../components/sections/AboutSections';
import { PointsGrid } from '../components/sections/PointsGrid';
import { StatsBand } from '../components/sections/StatsBand';
import { ClientsSection } from '../components/sections/ClientsSection';
import { CtaBand } from '../components/sections/CtaBand';
import { useSeo } from '../hooks/useSeo';
import { SEO, CORE_VALUES } from '../data/company';

export function About() {
  useSeo(SEO.about);
  return (
    <>
      <PageHeader
        eyebrow="About VIP Transports"
        crumb="About Us"
        title="Connecting Businesses Through Reliable Transportation and Logistics"
        lede="VIP Transports is committed to helping businesses move goods, manage distribution and meet their fuel transportation requirements through dependable logistics solutions. We believe transportation is an important part of every successful business operation. Our focus is on providing services that support efficiency, safety, timely execution and long-term customer relationships."
      />
      <Approach />
      <MissionVision />
      <PointsGrid
        label="Our core values"
        lines={['The values behind', 'every delivery']}
        points={CORE_VALUES}
        icons={[Handshake, ShieldCheck, HardHat, HeartHandshake, Zap, RefreshCcw]}
      />
      <StatsBand />
      <WhyBusinesses />
      <ClientsSection />
      <CtaBand
        title="Let’s build a reliable transportation partnership"
        copy="Looking for a logistics partner who understands your business requirements? Connect with VIP Transports to discuss your transportation and distribution needs."
        primary={{ label: 'Get in Touch', to: '/contact' }}
      />
    </>
  );
}
