import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { BUSINESS } from "@/lib/constants";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "AC Repair", to: "/ac-repair" },
  { label: "AC Installation", to: "/ac-installation" },
  { label: "Heating Repair", to: "/heating-repair" },
  { label: "HVAC Maintenance", to: "/hvac-maintenance" },
  { label: "Service Areas", to: "/service-areas" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded">
        Skip to content
      </a>
      <div className="bg-navy text-navy-foreground text-sm py-2">
        <div className="container flex items-center justify-between">
          <span>Serving Dallas & Surrounding Areas</span>
          <a href={BUSINESS.phoneHref} className="flex items-center gap-1.5 font-semibold hover:text-accent transition-colors">
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            {BUSINESS.phone}
          </a>
        </div>
      </div>
      <nav className="bg-background border-b border-border sticky top-0 z-50" aria-label="Main navigation">
        <div className="container flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="" className="h-10 w-10" />
            <div className="font-heading font-bold text-lg leading-tight">
              <span className="text-primary">Dallas Air</span>
              <br className="hidden sm:block" />
              <span className="text-foreground"> Experts</span>
            </div>
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === link.to ? "text-primary bg-secondary" : "text-foreground hover:text-primary hover:bg-secondary"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <a href={BUSINESS.phoneHref} className="hidden lg:flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
            <Phone className="w-4 h-4" aria-hidden="true" /> Call Now
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-foreground" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden bg-background border-t border-border pb-4">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className={`block px-6 py-3 text-sm font-medium transition-colors ${location.pathname === link.to ? "text-primary bg-secondary" : "text-foreground hover:text-primary hover:bg-secondary"}`}>
                {link.label}
              </Link>
            ))}
            <div className="px-6 pt-3">
              <a href={BUSINESS.phoneHref} className="flex items-center justify-center gap-2 bg-accent text-accent-foreground px-5 py-3 rounded-lg font-semibold text-sm">
                <Phone className="w-4 h-4" aria-hidden="true" /> {BUSINESS.phone}
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
