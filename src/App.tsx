import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Menu } from "lucide-react";

/**
 * Runtime sanity tests (non-breaking):
 * - Only runs in the browser, dev-friendly, won't throw UI-breaking errors.
 */
function runSanityTests() {
  try {
    if (typeof window === "undefined") return;
    const track = document.getElementById("track-record");
    const testimonials = document.getElementById("testimonials");
    const counters = track?.querySelectorAll("[data-testid=counter]") ?? [];
    console.assert(!!track, "Track Record section should exist");
    console.assert(!!testimonials, "Testimonials section should exist");
    console.assert(counters.length === 6, "There should be 6 counters in Track Record");
  } catch (e) {
    // Never break the UI due to tests
    console.warn("Sanity tests warning:", e);
  }
}

function Counter({ value, label }: { value: number; label: string }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const step = (timestamp: number, startTime: number) => {
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
      };
      requestAnimationFrame((t) => step(t, t));
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6" data-testid="counter">
      <span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent animate-gradient-x">
        {count}+
      </span>
      <p className="text-gray-700 mt-2 text-base md:text-lg">{label}</p>
    </div>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent">
          Acumen Recruiting
        </h1>
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium" aria-label="Primary">
          {['About', 'Services', 'Jobs', 'Insights', 'Contact'].map((item, i) => (
            <a key={i} href={`#${item.toLowerCase()}`} className="hover:text-indigo-600 transition">
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow">Get Started</Button>
          <button aria-label="Open Menu" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg border-t px-6 py-4 space-y-4" role="dialog" aria-label="Mobile Menu">
          {['About', 'Services', 'Jobs', 'Insights', 'Contact'].map((item, i) => (
            <a key={i} href={`#${item.toLowerCase()}`} className="block text-gray-700 hover:text-indigo-600">
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function SectionDivider({ flip = false }: { flip?: boolean }) {
  const gid = React.useId(); // avoid duplicate gradient IDs when used multiple times
  return (
    <svg
      className={`w-full h-20 ${flip ? 'rotate-180' : ''}`}
      viewBox="0 0 1440 320"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`animatedGradient-${gid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb">
            <animate attributeName="stop-color" values="#2563eb;#4f46e5;#f59e0b;#2563eb" dur="8s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#f59e0b">
            <animate attributeName="stop-color" values="#f59e0b;#2563eb;#4f46e5;#f59e0b" dur="8s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      <path
        fill={`url(#animatedGradient-${gid})`}
        d="M0,64L48,69.3C96,75,192,85,288,117.3C384,149,480,203,576,213.3C672,224,768,192,864,170.7C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 via-indigo-700 to-amber-600 text-gray-100 py-16 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-xl font-semibold mb-4">Acumen Recruiting</h3>
          <p className="text-sm leading-relaxed opacity-90">
            Boutique recruiting for the wealth management and financial services ecosystem.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {['Track Record', 'Database', 'Products', 'Pricing'].map((link, i) => (
              <li key={i}><a href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="hover:text-amber-400 transition">{link}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <p className="text-sm">Email: info@acumen-recruit.com</p>
          <p className="text-sm">Phone: +1 (555) 123-4567</p>
          <Button size="sm" className="mt-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg">Book Consultation</Button>
        </div>
      </div>
      <div className="mt-10 text-center text-xs text-gray-300">© {new Date().getFullYear()} Acumen Recruiting. All rights reserved.</div>
    </footer>
  );
}

export default function Homepage() {
  React.useEffect(() => {
    runSanityTests();
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-indigo-50 min-h-screen text-gray-900 flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative text-center py-28 px-6 max-w-6xl mx-auto bg-fixed bg-gradient-to-br from-indigo-50 via-white to-amber-50">
          {/* WRAPPED to satisfy adjacent JSX constraint */}
          <>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
            >
              Signals-Driven Recruiting <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent animate-gradient-x">
                Human-First Screening
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              High-quality candidates across wealth management and financial services — combining efficient technology with human insight.
            </motion.p>
          </>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 rounded-xl px-8 py-4 text-lg shadow-md transition-transform hover:scale-105">Get Started</Button>
            <Button size="lg" variant="outline" className="rounded-xl px-8 py-4 text-lg hover:bg-indigo-100 transition">Book Consultation</Button>
          </div>
        </section>

        <SectionDivider />

        {/* Track Record */}
        <section id="track-record" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-14 text-indigo-700">📊 Proven Track Record</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
              <Card><CardContent><Counter value={30} label="Wealth Managers" /></CardContent></Card>
              <Card><CardContent><Counter value={20} label="Financial Planners" /></CardContent></Card>
              <Card><CardContent><Counter value={8} label="Tax Advisors" /></CardContent></Card>
              <Card><CardContent><Counter value={15} label="Estate Specialists" /></CardContent></Card>
              <Card><CardContent><Counter value={5} label="Compliance Officers" /></CardContent></Card>
              <Card><CardContent><Counter value={100} label="Client Staff" /></CardContent></Card>
            </div>
          </div>
        </section>

        <SectionDivider flip />

        {/* Candidate Database */}
        <section id="database" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-14 text-indigo-700">🗄️ Candidate Database</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {["500 Wealth Managers", "200 Planners", "150 Tax Advisors", "100 Estate Specialists", "75 Compliance Officers", "975 Support Staff"].map((item, i) => (
                <Card key={i} className="hover:shadow-md transition">
                  <CardContent className="p-8 text-lg font-medium text-gray-700 text-center">{item}</CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-gray-500 mt-8 italic">
              ⚠️ Fresh sourcing ensures every engagement is local and role-relevant.
            </p>
          </div>
        </section>

        <SectionDivider />

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-12 text-indigo-700">🌟 What Our Clients Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {["“Acumen helped us hire top-tier advisors quickly.”", "“The video intros saved us hours of screening time.”", "“Transparent pricing and amazing support!”"].map((quote, i) => (
                <Card key={i} className="p-6 shadow hover:shadow-lg transition">
                  <CardContent>
                    <p className="text-gray-700 italic">{quote}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider flip />

        {/* Why Us */}
        <section id="why" className="py-24 bg-white text-center">
          <h2 className="text-4xl font-bold mb-10 text-indigo-700">✅ Why Acumen Recruiting?</h2>
          <ul className="space-y-4 text-lg text-gray-700 max-w-2xl mx-auto">
            {["Industry-specialized recruiting", "Human-first + tech-driven sourcing", "Candidate videos & resumes in portal", "Feedback loops that refine results", "Transparent, scalable pricing"].map((point, i) => (
              <li key={i} className="flex items-center gap-3 text-left">
                <CheckCircle className="text-amber-500" /> {point}
              </li>
            ))}
          </ul>
          <div className="mt-12 flex gap-4 justify-center">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 rounded-xl px-8 py-4 text-lg shadow-md transition-transform hover:scale-105">Book Consultation</Button>
            <Button size="lg" variant="outline" className="rounded-xl px-8 py-4 text-lg hover:bg-indigo-100 transition">See Pricing Plans</Button>
          </div>
        </section>
      </main>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg px-6 py-3 animate-bounce">
          Book Now
        </Button>
      </div>

      <Footer />
    </div>
  );
}
