import { Phone, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

const EmergencyBanner = () => (
  <section className="bg-accent text-accent-foreground py-10">
    <div className="container text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Clock className="w-6 h-6" aria-hidden="true" />
        <h2 className="font-heading font-bold text-2xl md:text-3xl">24/7 Emergency HVAC Service</h2>
      </div>
      <p className="text-sm opacity-90 mb-5 max-w-xl mx-auto">
        Don't suffer in the heat or cold. Our emergency technicians are available around the clock.
      </p>
      <a href={BUSINESS.phoneHref} className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity">
        <Phone className="w-5 h-5" aria-hidden="true" /> {BUSINESS.phone}
      </a>
    </div>
  </section>
);

export default EmergencyBanner;
