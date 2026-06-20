import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { BUSINESS } from "@/lib/constants";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  phone: z.string().min(7, "Valid phone required").max(20),
  email: z.string().email("Valid email required").max(255),
  service: z.string().min(1, "Select a service"),
  message: z.string().max(1000).optional(),
});

type FormData = z.infer<typeof schema>;

const QuoteForm = ({ sourcePage = "unknown" }: { sourcePage?: string }) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    if (!isSupabaseConfigured) {
      console.warn("Supabase not configured — form submission skipped");
      setStatus("success");
      return;
    }
    const { error } = await supabase.from("leads").insert({ ...data, source_page: sourcePage });
    setStatus(error ? "error" : "success");
  };

  if (status === "success") {
    return (
      <div className="bg-secondary rounded-xl p-8 text-center">
        <h3 className="font-heading font-bold text-2xl text-foreground mb-2">Thank You!</h3>
        <p className="text-muted-foreground">We'll get back to you within 30 minutes during business hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-xl shadow-lg p-8 border border-border">
      <h3 className="font-heading font-bold text-2xl text-foreground mb-2">Get a Free Quote</h3>
      <p className="text-muted-foreground text-sm mb-6">Fill out the form or call us directly.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="sr-only">Full Name</label>
          <input id="name" {...register("name")} placeholder="Full Name" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">Phone Number</label>
          <input id="phone" type="tel" {...register("phone")} placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Email Address</label>
          <input id="email" type="email" {...register("email")} placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="service" className="sr-only">Service Type</label>
          <select id="service" {...register("service")} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="">Select Service</option>
            <option>AC Repair</option>
            <option>AC Installation</option>
            <option>Heating Repair</option>
            <option>HVAC Maintenance</option>
            <option>Other</option>
          </select>
          {errors.service && <p className="text-destructive text-xs mt-1">{errors.service.message}</p>}
        </div>
        <div>
          <label htmlFor="message" className="sr-only">Message</label>
          <textarea id="message" {...register("message")} placeholder="Describe your issue..." rows={3} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        </div>
        <button type="submit" disabled={status === "loading"} className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
          {status === "loading" ? "Submitting..." : "Request Free Quote"}
        </button>
        {status === "error" && <p className="text-destructive text-sm text-center">Something went wrong. Please call us instead.</p>}
      </div>
      <div className="mt-4 text-center">
        <span className="text-muted-foreground text-xs">Or call now: </span>
        <a href={BUSINESS.phoneHref} className="text-primary font-semibold text-sm inline-flex items-center gap-1">
          <Phone className="w-3.5 h-3.5" /> {BUSINESS.phone}
        </a>
      </div>
    </form>
  );
};

export default QuoteForm;
