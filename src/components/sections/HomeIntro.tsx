import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { SectionIntro } from '../ui/SectionIntro';
import { RouteGraphic } from '../ui/RouteGraphic';

/** Home: "Reliable Transportation Solutions That Keep Your Business Moving". */
export function HomeIntro() {
  return (
    <section className="relative bg-canvas py-24 md:py-36">
      <div className="shell grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <SectionIntro label="Who we are" lines={['Reliable transportation solutions', 'that keep your business moving']}>
            <p>
              Every successful business depends on a reliable transportation network. Whether it involves
              moving goods between locations, managing regular product distribution or arranging fuel
              deliveries, having the right logistics partner makes a significant difference.
            </p>
            <p>
              VIP Transports provides business-focused transportation and logistics solutions that help
              organisations manage the movement of goods efficiently. We combine practical industry
              experience, professional coordination and a commitment to safe transportation to support our
              customers’ day-to-day operational needs.
            </p>
            <p className="text-ink">
              From transportation and distribution to fuel logistics, we aim to simplify business operations
              through dependable service and consistent support.
            </p>
          </SectionIntro>
          <Link to="/about-us" className="btn-ghost mt-10">
            Know More About Us <ChevronRight size={18} />
          </Link>
        </div>
        <RouteGraphic />
      </div>
    </section>
  );
}
