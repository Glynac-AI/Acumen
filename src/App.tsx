import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import * as CounselingPages from "./pages/counseling";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/counseling/succession-planning" element={<CounselingPages.SuccessionPlanning />} />
              <Route path="/counseling/recruiting" element={<CounselingPages.Recruiting />} />
              <Route path="/counseling/tax-planning" element={<CounselingPages.TaxPlanning />} />
              <Route path="/counseling/estate-planning" element={<CounselingPages.EstatePlanning />} />
              <Route path="/counseling/holistic-planning" element={<CounselingPages.HolisticPlanning />} />
              <Route path="/counseling/client-retention" element={<CounselingPages.ClientRetention />} />
              <Route path="/counseling/portfolio-evaluation" element={<CounselingPages.PortfolioEvaluation />} />
              <Route path="/counseling/task-automation" element={<CounselingPages.TaskAutomation />} />
              <Route path="/counseling/sales-coaching" element={<CounselingPages.SalesCoaching />} />
              <Route path="/counseling/lead-generation" element={<CounselingPages.LeadGeneration />} />
              <Route path="/counseling/practice-management" element={<CounselingPages.PracticeManagement />} />
              <Route path="/counseling/well-being" element={<CounselingPages.WellBeing/>} />
              {/* Removing wellness route since it doesn't exist in CounselingPages */}
              <Route path="/contact" element={<Contact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
