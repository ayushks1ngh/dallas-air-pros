import ServicePageLayout from "@/components/ServicePageLayout";
import heatingImg from "@/assets/heating-repair.jpg";

const HeatingRepair = () => (
  <ServicePageLayout
    title="Heating Repair Services in Dallas"
    subtitle="Heating System Repair"
    description="Stay warm through Texas winters with reliable heating repair. We service furnaces, heat pumps, and all heating systems with same-day availability."
    image={heatingImg}
    path="/heating-repair"
    features={[
      "Furnace repair and troubleshooting",
      "Heat pump diagnostics and repair",
      "Pilot light and ignition repair",
      "Blower motor and fan repair",
      "Gas leak detection and repair",
      "Complete system diagnostics",
    ]}
    benefits={[
      "Same-day service in most cases",
      "All work backed by warranty",
      "Transparent, upfront pricing",
      "Certified heating specialists",
      "24/7 emergency availability",
    ]}
  />
);

export default HeatingRepair;
