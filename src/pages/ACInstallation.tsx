import ServicePageLayout from "@/components/ServicePageLayout";
import acInstallImg from "@/assets/ac-install.jpg";

const ACInstallation = () => (
  <ServicePageLayout
    title="AC Installation Services in Dallas"
    subtitle="Air Conditioning Installation"
    description="Upgrade to a modern, energy-efficient cooling system. Our experts help you choose the right unit and install it perfectly for maximum comfort and savings."
    image={acInstallImg}
    path="/ac-installation"
    features={[
      "Free in-home consultation and estimate",
      "Top brands: Carrier, Trane, Lennox, Goodman",
      "Proper load calculation for optimal sizing",
      "Full system installation with ductwork",
      "Smart thermostat setup included",
      "Old system removal and recycling",
    ]}
    benefits={[
      "Financing options available",
      "10-year manufacturer warranty",
      "Energy Star certified systems",
      "Licensed and insured installers",
      "Post-installation inspection and walkthrough",
    ]}
  />
);

export default ACInstallation;
