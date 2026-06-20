import ServicePageLayout from "@/components/ServicePageLayout";
import maintenanceImg from "@/assets/maintenance.jpg";

const HVACMaintenance = () => (
  <ServicePageLayout
    title="HVAC Maintenance Plans in Dallas"
    subtitle="Preventive Maintenance"
    description="Regular HVAC maintenance extends your system's life, improves efficiency, and prevents costly breakdowns. Join our maintenance plan for priority service."
    image={maintenanceImg}
    path="/hvac-maintenance"
    features={[
      "Bi-annual system tune-ups",
      "Filter replacement and cleaning",
      "Refrigerant level check",
      "Electrical connection inspection",
      "Thermostat calibration",
      "Full system performance report",
    ]}
    benefits={[
      "Up to 30% energy savings",
      "Priority scheduling for plan members",
      "15% discount on all repairs",
      "Extends equipment lifespan by years",
      "No overtime charges for members",
    ]}
  />
);

export default HVACMaintenance;
