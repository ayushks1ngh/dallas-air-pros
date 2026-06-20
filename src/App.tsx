import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";
import StructuredData from "./components/StructuredData";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const ACRepair = lazy(() => import("./pages/ACRepair"));
const ACInstallation = lazy(() => import("./pages/ACInstallation"));
const HeatingRepair = lazy(() => import("./pages/HeatingRepair"));
const HVACMaintenance = lazy(() => import("./pages/HVACMaintenance"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Sonner />
          <StructuredData />
          <BrowserRouter>
            <Navbar />
            <main id="main-content">
              <Suspense fallback={<div className="min-h-screen" />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/ac-repair" element={<ACRepair />} />
                  <Route path="/ac-installation" element={<ACInstallation />} />
                  <Route path="/heating-repair" element={<HeatingRepair />} />
                  <Route path="/hvac-maintenance" element={<HVACMaintenance />} />
                  <Route path="/service-areas" element={<ServiceAreas />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
