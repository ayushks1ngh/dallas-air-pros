import SEO from "@/components/SEO";
import { BUSINESS } from "@/lib/constants";

const Privacy = () => (
  <>
    <SEO title="Privacy Policy" description="Privacy policy for Dallas Air Experts. Learn how we collect, use, and protect your personal information." path="/privacy" />
    <section className="py-16 md:py-24">
      <div className="container max-w-3xl prose prose-slate">
        <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: June 2026</p>
        <h2 className="font-heading font-bold text-xl text-foreground mt-8 mb-4">Information We Collect</h2>
        <p className="text-muted-foreground">When you submit a quote request or contact form, we collect your name, phone number, email address, and details about your service needs.</p>
        <h2 className="font-heading font-bold text-xl text-foreground mt-8 mb-4">How We Use Your Information</h2>
        <p className="text-muted-foreground">We use your information solely to respond to your service inquiry, schedule appointments, and provide HVAC services. We do not sell your data to third parties.</p>
        <h2 className="font-heading font-bold text-xl text-foreground mt-8 mb-4">Data Protection</h2>
        <p className="text-muted-foreground">Your information is stored securely and accessed only by authorized team members who need it to provide service.</p>
        <h2 className="font-heading font-bold text-xl text-foreground mt-8 mb-4">Contact</h2>
        <p className="text-muted-foreground">Questions about this policy? Contact us at <a href={`mailto:${BUSINESS.email}`} className="text-primary">{BUSINESS.email}</a> or call <a href={BUSINESS.phoneHref} className="text-primary">{BUSINESS.phone}</a>.</p>
      </div>
    </section>
  </>
);

export default Privacy;
