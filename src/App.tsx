import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Menu,
  ArrowRight,
  Shield,
  Clock,
  Video,
  Users,
  Star,
  Sparkles,
  TrendingUp,
  PlayCircle,
  Moon,
  Sun,
} from "lucide-react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

/**
 * Runtime sanity tests (non-breaking):
 * These help validate landing-page requirements without breaking UI.
 */
function runSanityTests() {
  try {
    if (typeof window === "undefined") return;
    const hero = document.getElementById("hero");
    const ctas = hero?.querySelectorAll('[data-testid="primary-cta"]') ?? [];
    const steps =
      document.getElementById("how-it-works")?.querySelectorAll('[data-testid="step"]') ?? [];
    const counters = document.querySelectorAll('[data-testid="counter"]') ?? [];
    const pricing =
      document.getElementById("pricing")?.querySelectorAll('[data-testid="pricing-card"]') ?? [];

    console.assert(!!hero, "Hero section should exist");
    console.assert(ctas.length >= 1, "Primary CTA should be present in hero");
    console.assert(steps.length === 3, "There should be exactly 3 steps in How it Works");
    console.assert(counters.length >= 3, "There should be at least 3 counters");
    console.assert(pricing.length === 3, "Pricing should render exactly 3 cards");
  } catch (e) {
    console.warn("Sanity tests warning:", e);
  }
}

/* =========================================================
   Dark Mode (persisted)
   ========================================================= */
function useTheme() {
  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (
      (localStorage.getItem("theme") as "light" | "dark") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    );
  });

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-white/10 px-2.5 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/10"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}

/* =========================================================
   Shared / Base UI
   ========================================================= */

function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 bg-black text-white px-3 py-2 rounded"
    >
      Skip to content
    </a>
  );
}

function Counter({ value, label }: { value: number; label: string }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      const duration = 1800;
      const step = (timestamp: number, startTime: number) => {
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
      };
      requestAnimationFrame((t) => step(t, t));
    }
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center p-4"
      data-testid="counter"
      aria-label={`${label}: ${count}+`}
    >
      <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent">
        {count}+
      </span>
      <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm md:text-base text-center">{label}</p>
    </div>
  );
}

function SectionDivider({ flip = false }: { flip?: boolean }) {
  const gid = React.useId();
  return (
    <svg
      className={`w-full h-20 ${flip ? "rotate-180" : ""}`}
      viewBox="0 0 1440 320"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`animatedGradient-${gid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb">
            <animate
              attributeName="stop-color"
              values="#2563eb;#4f46e5;#f59e0b;#2563eb"
              dur="8s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#f59e0b">
            <animate
              attributeName="stop-color"
              values="#f59e0b;#2563eb;#4f46e5;#f59e0b"
              dur="8s"
              repeatCount="indefinite"
            />
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

function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const NAV = [
    { label: "About", href: "/about", type: "route" },
    { label: "Services", href: "/services", type: "route" },
    { label: "Jobs", href: "/jobs", type: "route" },
    { label: "Insights", href: "/insights", type: "route" },
    { label: "Contact", href: "/contact", type: "route" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/70 backdrop-blur-lg border-b border-gray-200 dark:border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent"
        >
          Acumen Recruiting
        </Link>
        <nav className="hidden md:flex gap-8 text-gray-700 dark:text-gray-200 font-medium" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.label} to={item.href} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white shadow text-sm"
          >
            Get Started
          </Link>
          <button aria-label="Open Menu" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div
          className="md:hidden bg-white dark:bg-zinc-950 shadow-lg border-t border-gray-200 dark:border-white/10 px-6 py-4 space-y-4"
          role="dialog"
          aria-label="Mobile Menu"
        >
          {[{ label: "Home", href: "/" }, ...NAV].map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
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
            {[
              { label: "How It Works", href: "/#how-it-works" },
              { label: "Pricing", href: "/#pricing" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-amber-300 transition">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <p className="text-sm">Email: info@acumen-recruit.com</p>
          <p className="text-sm">Phone: +1 (555) 123-4567</p>
          <Link to="/contact" className="inline-flex mt-4 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg">
            Book Consultation
          </Link>
        </div>
      </div>
      <div className="mt-10 text-center text-xs text-gray-200">
        © {new Date().getFullYear()} Acumen Recruiting. All rights reserved.
      </div>
    </footer>
  );
}

/* =========================================================
   Homepage Helpers
   ========================================================= */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-xs font-medium text-gray-800 dark:text-gray-100">
      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      {children}
    </span>
  );
}

function GradientOrbs() {
  return (
    <>
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-30 bg-indigo-300" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-30 bg-amber-300" />
    </>
  );
}

function LogosMarquee() {
  const logos = ["WealthCo", "FinServe", "EstatePro", "PlanWise", "AssetDuty", "HorizonWM"];
  return (
    <div className="relative overflow-hidden border-y border-gray-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-12 py-4 animate-[marquee_18s_linear_infinite] whitespace-nowrap">
          {logos.concat(logos).map((l, i) => (
            <span key={i} className="text-gray-500 dark:text-gray-400 font-semibold opacity-80">
              {l}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0%);} 100% { transform: translateX(-50%);} }
      `}</style>
    </div>
  );
}

function ValueBand() {
  const items = [
    { icon: <Clock className="h-5 w-5" />, title: "Shortlist in 7 days", desc: "Fast + structured process" },
    { icon: <Video className="h-5 w-5" />, title: "Video-screened talent", desc: "Snapshot & DeepDive" },
    { icon: <Shield className="h-5 w-5" />, title: "Transparent pricing", desc: "Tiered & predictable" },
  ];
  return (
    <section className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-amber-500 text-white">
      <div className="max-w-6xl mx-auto px-6 py-6 grid gap-4 md:grid-cols-3">
        {items.map((x) => (
          <div key={x.title} className="flex items-start gap-3">
            <div className="mt-0.5">{x.icon}</div>
            <div>
              <div className="font-semibold">{x.title}</div>
              <div className="text-sm opacity-90">{x.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: <Users className="h-4 w-4" />, text: "Local, role-ready shortlists" },
    { icon: <Star className="h-4 w-4" />, text: "Client NPS +68" },
    { icon: <TrendingUp className="h-4 w-4" />, text: "40+ roles covered" },
  ];
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      {items.map((it) => (
        <span
          key={it.text}
          className="inline-flex items-center gap-2 text-xs md:text-sm text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-full px-3 py-1.5"
        >
          {it.icon}
          {it.text}
        </span>
      ))}
    </div>
  );
}

function StickyCTA() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-4 inset-x-0 z-50">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/95 dark:bg-zinc-900/80 backdrop-blur border border-gray-200 dark:border-white/10 shadow-lg px-4 py-3">
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-200">
            Ready to review candidates on video this week?
          </p>
          <div className="flex gap-2">
            <a
              href="/#pricing"
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-sm hover:bg-gray-50 dark:hover:bg-white/10"
            >
              See Pricing
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm"
            >
              Book Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Homepage Sections
   ========================================================= */

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden text-left py-20 md:py-28 px-6 max-w-6xl mx-auto rounded-2xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-indigo-50 via-white to-amber-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900"
      aria-labelledby="hero-title"
    >
      <GradientOrbs />
      <div className="grid md:grid-cols-12 gap-10 items-center">
        {/* Left copy */}
        <div className="md:col-span-7">
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-gray-900 dark:text-white"
          >
            Finance-Specialized Recruiting. Qualified, video-screened talent in{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent">
              7 days
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl leading-relaxed"
          >
            We blend Talent Snapshot™ videos with recruiter-led DeepDive™ interviews to deliver local,
            role-ready shortlists—fast.
          </motion.p>

          <ul className="grid sm:grid-cols-2 gap-2 mb-8">
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Pre-screened video intros (Snapshot™)
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Structured DeepDive™ interviews
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Local & role-appropriate shortlists
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Transparent, tiered pricing
            </li>
          </ul>

          <div className="flex gap-3 md:gap-4 items-center">
            <Link
              to="/contact"
              data-testid="primary-cta"
              className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg bg-amber-500 hover:bg-amber-600 rounded-xl text-white shadow-md transition-transform hover:scale-[1.02]"
            >
              Book Consultation
            </Link>
            <a
              href="/#pricing"
              className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-xl border border-gray-200 dark:border-white/10 hover:bg-indigo-50 dark:hover:bg-white/10 transition inline-flex items-center gap-2"
            >
              See Pricing <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <TrustStrip />

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>30+ Wealth Managers placed</Badge>
            <Badge>20 Planners • 8 Tax Advisors</Badge>
          </div>
        </div>

        {/* Right visual */}
        <div className="md:col-span-5">
          <div className="relative aspect-[4/3] rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 shadow-sm overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-6 gap-2 p-4">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-gray-200 dark:border-white/10 bg-gradient-to-br from-indigo-50 to-white dark:from-zinc-800 dark:to-zinc-900"
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-indigo-500/10 p-6">
                <PlayCircle className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center">
              <div className="flex gap-2">
                <span className="h-2 w-10 rounded bg-indigo-500/80" />
                <span className="h-2 w-10 rounded bg-blue-500/70" />
                <span className="h-2 w-10 rounded bg-amber-500/70" />
              </div>
            </div>
            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/90 dark:bg-zinc-900/80 border border-gray-200 dark:border-white/10 rounded-full px-2.5 py-1 text-xs text-gray-800 dark:text-gray-100">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Talent Snapshot™
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HighlightsStrip() {
  const items = [
    { k: "Time-to-Shortlist", v: "7 days" },
    { k: "Client NPS", v: "+68" },
    { k: "Roles Covered", v: "40+" },
    { k: "Markets", v: "US & Canada" },
  ];
  return (
    <section className="bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-4 py-8">
        {items.map(({ k, v }) => (
          <Card
            key={k}
            className="shadow-sm border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 backdrop-blur"
          >
            <CardContent className="p-5">
              <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{k}</div>
              <div className="text-xl font-extrabold mt-1 text-gray-900 dark:text-white">{v}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

/* Neutral counters to satisfy tests (not "Proof") */
function StatsCounters() {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-indigo-700 dark:text-indigo-400">
          Our Recruiting Footprint
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
          <Counter value={30} label="Wealth Managers" />
          <Counter value={20} label="Financial Planners" />
          <Counter value={8} label="Tax Advisors" />
          <Counter value={15} label="Estate Specialists" />
          <Counter value={5} label="Compliance Officers" />
          <Counter value={100} label="Client Staff" />
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services-teaser" className="py-16 md:py-24 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700 dark:text-indigo-400">
          Services
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Talent Snapshot™", desc: "Asynchronous videos for fast screening." },
            { name: "Talent DeepDive™", desc: "Recruiter-led structured interviews." },
            { name: "Complete Talent Pack™", desc: "Bundle for volume + depth." },
          ].map((svc) => (
            <Card
              key={svc.name}
              className="transition-transform hover:scale-[1.02] hover:shadow-lg border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 backdrop-blur"
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{svc.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{svc.desc}</p>
                <div className="mt-2">
                 <Link
  to="/services"
  className="inline-flex items-center justify-center px-4 py-2 rounded-md border
             border-gray-300 dark:border-white/20
             bg-white hover:bg-gray-50
             dark:bg-white/10 dark:hover:bg-white/20
             text-gray-900 dark:text-white
             font-medium transition-colors
             focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
             focus-visible:ring-offset-2 focus-visible:ring-offset-white
             dark:focus-visible:ring-offset-zinc-900"
>
  Explore
</Link>

                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700 dark:text-indigo-400">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Brief", desc: "Kickoff to align on role, location & must-haves." },
            { title: "Video Screens", desc: "Snapshot™ intros + DeepDive™ interviews." },
            { title: "Shortlist in 7 Days", desc: "Local, role-ready candidates to your portal." },
          ].map((step, i) => (
            <Card
              key={i}
              data-testid="step"
              className="hover:shadow-md transition-transform hover:scale-105 border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 backdrop-blur"
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {i + 1}. {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/contact"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow"
          >
            Start Hiring
          </Link>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-20 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700 dark:text-indigo-400">
          Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Starter", price: "$450", note: "20 Snapshot + 10 DeepDive", badge: "Most Popular" },
            { name: "Growth", price: "$900", note: "50 Snapshot + 20 DeepDive" },
            { name: "Enterprise", price: "$2,000", note: "100 Snapshot + 50 DeepDive" },
          ].map((p, i) => (
            <Card
              key={p.name}
              data-testid="pricing-card"
              className={`${i === 0 ? "ring-2 ring-amber-400" : ""} transition-transform hover:scale-105 hover:shadow-lg border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 backdrop-blur`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{p.name}</h3>
                  {i === 0 && <span className="text-amber-600 dark:text-amber-400 text-xs font-semibold">{p.badge}</span>}
                </div>
                <div className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">{p.price}</div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">{p.note}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  Pricing scales with compensation (60–120k ×2, 120–300k ×3). Success fee applies.
                </p>
                <div className="mt-4">
                  <Link
  to="/contact"
  className="inline-flex items-center justify-center px-4 py-2 rounded-md
             bg-amber-500 hover:bg-amber-600 text-white font-semibold
             shadow-sm transition-colors
             focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500
             focus-visible:ring-offset-2 focus-visible:ring-offset-white
             dark:focus-visible:ring-offset-zinc-900"
>
  Choose Plan
</Link>

                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Pages
   ========================================================= */

function Homepage() {
  React.useEffect(() => {
    runSanityTests();
  }, []);
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-indigo-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 min-h-screen text-gray-900 dark:text-gray-100 flex flex-col">
      <SkipLink />
      <Header />
      <main id="main" className="flex-1">
        <HeroSection />
        <ValueBand />
        <LogosMarquee />
        <SectionDivider />
        <HighlightsStrip />
        <SectionDivider flip />
        <ServicesSection />
        <SectionDivider />
        <HowItWorksSection />
        <SectionDivider flip />
        <PricingSection />
        <SectionDivider />
        <StatsCounters />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}

/* Empty placeholders for now (step-by-step focus on homepage) */
function EmptyPage({ title = "Coming soon." }: { title?: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-3"> {title} </h1>
        <p className="text-gray-600 dark:text-gray-300">This page is intentionally empty for now.</p>
      </main>
      <Footer />
    </div>
  );
}

function AboutPage() { return <EmptyPage title="About" />; }
function ServicesPage() { return <EmptyPage title="Services" />; }
function JobsPage() { return <EmptyPage title="Jobs" />; }
function InsightsPage() { return <EmptyPage title="Insights" />; }
function ContactPage() { return <EmptyPage title="Contact" />; }

/* =========================================================
   Router (Default Export)
   ========================================================= */
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
