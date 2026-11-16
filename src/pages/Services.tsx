import { Truck, Network, Radar, ShieldCheck, Settings2, MessagesSquare } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { ServiceDetails } from '../components/sections/ServiceDetail';
import { PointsGrid } from '../components/sections/PointsGrid';
import { ProcessTimeline } from '../components/sections/ProcessTimeline';
import { FleetShowcase } from '../components/sections/FleetShowcase';
import { CtaBand } from '../components/sections/CtaBand';
import { useSeo } from '../hooks/useSeo';
import { SEO, DEPENDABLE } from '../data/company';

export function Services() {
  useSeo(SEO.services);
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        crumb="Services"
        title="Complete Logistics Support for Your Business Transportation Needs"
        lede="VIP Transports offers business-focused transportation, distribution and fuel logistics services designed to support the movement of goods and essential supplies."
      />
      <ServiceDetails />
      <PointsGrid
        tone="cream"
        label="Why it works"
        lines={['What makes our logistics', 'services dependable?']}
        points={DEPENDABLE}
        icons={[Truck, Network, Radar, ShieldCheck, Settings2, MessagesSquare]}
      />
      <ProcessTimeline />
      <FleetShowcase />
      <CtaBand
        title="Need transportation support for your business?"
        copy="From commercial goods transportation to product distribution and fuel logistics, VIP Transports is ready to understand your requirements. Let’s discuss how we can support your business."
        primary={{ label: 'Get a Free Transportation Quote', to: '/contact#quote' }}
      />
    </>
  );
}
