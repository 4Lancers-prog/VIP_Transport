import { Suspense, lazy } from 'react';
import { Hero } from '../components/sections/Hero';
import { HomeIntro } from '../components/sections/HomeIntro';
import { ServicesOverview } from '../components/sections/ServicesOverview';
import { WhyChoose } from '../components/sections/WhyChoose';
import { StatsBand } from '../components/sections/StatsBand';
import { Industries } from '../components/sections/Industries';
import { ClientsSection } from '../components/sections/ClientsSection';
import { CtaBand } from '../components/sections/CtaBand';
import { useSeo } from '../hooks/useSeo';
import { SEO } from '../data/company';

// Heavy, scroll-pinned chapter loaded after the hero paints.
const ScrollJourney = lazy(() =>
  import('../components/sections/ScrollJourney').then((m) => ({ default: m.ScrollJourney })),
);

export function Home() {
  useSeo(SEO.home);
  return (
    <>
      <Hero />
      <HomeIntro />
      <Suspense fallback={null}>
        <ScrollJourney />
      </Suspense>
      <ServicesOverview />
      <WhyChoose />
      <StatsBand />
      <Industries />
      <ClientsSection />
      <CtaBand
        title="Looking for a reliable transportation partner?"
        copy="Let VIP Transports support your business with dependable transportation, distribution and fuel logistics solutions. Whether you require regular goods transportation or specialised fuel distribution, our team is ready to understand your requirements and help you find the right solution."
        primary={{ label: 'Request a Free Quote', to: '/contact#quote' }}
        secondary={{ label: 'Contact Our Team', to: '/contact' }}
      />
    </>
  );
}
