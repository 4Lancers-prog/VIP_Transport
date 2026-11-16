import { Target, Eye } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionIntro } from '../ui/SectionIntro';
import { RouteGraphic } from '../ui/RouteGraphic';

/** About: business-focused approach, with the animated route map. */
export function Approach() {
  return (
    <section className="relative bg-canvas py-24 md:py-36">
      <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <SectionIntro label="Our approach" lines={['A business-focused approach', 'to transportation and logistics']}>
          <p>
            At VIP Transports, we understand that transportation challenges can directly affect business
            productivity, customer satisfaction and supply-chain performance.
          </p>
          <p>
            Our objective is to simplify these challenges by offering transportation, distribution and fuel
            logistics services that meet the operational needs of businesses across different sectors.
          </p>
          <p>
            We focus on understanding the nature of each requirement, coordinating transportation activities
            efficiently and maintaining clear communication throughout the service process.
          </p>
          <p className="text-ink">
            Our commitment goes beyond simply transporting goods. We aim to become a dependable logistics
            partner that businesses can rely on for their ongoing transportation requirements.
          </p>
        </SectionIntro>
        <RouteGraphic className="lg:min-h-[480px]" />
      </div>
    </section>
  );
}

/** About: mission and vision panels sliding in from opposite sides. */
export function MissionVision() {
  const left = useScrollReveal<HTMLDivElement>({ kind: 'left', duration: 1.1 });
  const right = useScrollReveal<HTMLDivElement>({ kind: 'right', duration: 1.1 });
  const panel = 'neon-card group h-full p-8 md:p-12';
  return (
    <section className="relative overflow-hidden border-y border-line bg-cream py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-neon-grid opacity-50" aria-hidden="true" />
      <div className="shell relative grid gap-6 lg:grid-cols-2">
        <div ref={left}>
          <article className={panel}>
            <p className="eyebrow flex items-center gap-3">
              <Target size={16} /> Our mission
            </p>
            <h2 className="mt-6 font-display text-3xl leading-[1] text-ink text-balance md:text-4xl">
              Making business transportation safer, simpler and more reliable
            </h2>
            <p className="mt-6 text-graphite">
              Our mission is to provide safe, reliable and cost-effective transportation and logistics
              solutions through professional coordination, experienced personnel and a customer-first
              approach.
            </p>
            <p className="mt-4 text-graphite">
              We strive to understand the unique requirements of every customer, maintain consistent service
              standards and contribute to smoother business operations through dependable logistics support.
            </p>
          </article>
        </div>
        <div ref={right}>
          <article className={panel}>
            <p className="eyebrow flex items-center gap-3">
              <Eye size={16} /> Our vision
            </p>
            <h2 className="mt-6 font-display text-3xl leading-[1] text-ink text-balance md:text-4xl">
              Building a more connected and efficient logistics network
            </h2>
            <p className="mt-6 text-graphite">
              Our vision is to become a preferred transportation and logistics partner by delivering
              efficient, innovative and sustainable supply-chain solutions.
            </p>
            <p className="mt-4 text-graphite">
              We aim to continuously improve our service capabilities, strengthen customer relationships and
              establish higher standards of reliability, safety and operational excellence.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

/** About: closing statement. */
export function WhyBusinesses() {
  return (
    <section className="relative bg-canvas py-24 md:py-32">
      <div className="shell">
        <SectionIntro align="center" label="Why businesses choose us" lines={['Why businesses choose', 'VIP Transports']}>
          <p>
            We recognise that every shipment matters to the business depending on it. Our service philosophy
            is built around understanding customer priorities and maintaining dependable logistics operations.
          </p>
          <p>
            From transportation coordination to distribution support and fuel logistics, we aim to provide
            solutions that help businesses manage their requirements with greater confidence.
          </p>
        </SectionIntro>
      </div>
    </section>
  );
}
