import { PageHeader } from '../components/ui/PageHeader';
import { Services } from '../components/sections/Services';
import { FleetShowcase } from '../components/sections/FleetShowcase';
import { FuelSection } from '../components/sections/FuelSection';

export function Capabilities() {
  return (
    <>
      <PageHeader
        eyebrow="Capabilities & Fleet"
        title="What we move, and how."
        lede="Four tightly-scoped capabilities and a tanker fleet sized to the job — from compact bulk runs to high-volume movements."
      />
      <Services />
      {/* Fuel moment #3 — the jet loads the petroleum tanker itself. */}
      <FuelSection variant="tanker" />
      <FleetShowcase />
    </>
  );
}
