// src/App.tsx
import * as React from "react";
import { motion, useInView } from "framer-motion";
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
  ChevronRight,
  HelpCircle,
  Building2,
  Target,
  Rocket,
  Handshake,
  Quote,
  Award,
} from "lucide-react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

/* =========================================================
   Minimal shadcn-style stubs (remove if you use your own)
   ========================================================= */
function cn(...cls: (string | false | null | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

export const Button = ({
  className,
  children,
  variant = "solid",
  ...rest
}: React.HTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
}) => {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white";
  const styles =
    variant === "solid"
      ? "bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
      : variant === "outline"
      ? "border border-gray-300 bg-white hover:bg-gray-50 text-gray-900"
      : "text-gray-700 hover:bg-black/5";
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    <button
      className={cn(base, styles, "min-h-[44px] min-w-[44px]", className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export const Card = ({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...rest}
    className={cn(
      "rounded-2xl border border-gray-200 bg-white/80 backdrop-blur",
      className
    )}
  >
    {children}
  </div>
);
export const CardContent = ({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...rest} className={cn("p-6", className)}>
    {children}
  </div>
);

/* =========================================================
   Runtime sanity tests (non-breaking)
   ========================================================= */
function runSanityTests() {
  try {
    if (typeof window === "undefined") return;
    const hero = document.getElementById("hero");
    const ctas =
      hero?.querySelectorAll('[data-testid="primary-cta"]') ?? [];
    const steps =
      document
        .getElementById("how-it-works")
        ?.querySelectorAll('[data-testid="step"]') ?? [];
    const counters =
      document.querySelectorAll('[data-testid="counter"]') ?? [];
    const pricing =
      document
        .getElementById("pricing")
        ?.querySelectorAll('[data-testid="pricing-card"]') ?? [];

    console.assert(!!hero, "Hero section should exist");
    console.assert(ctas.length >= 1, "Primary CTA should be present in hero");
    console.assert(
      steps.length === 3,
      "There should be exactly 3 steps in How it Works"
    );
    console.assert(counters.length >= 3, "There should be at least 3 counters");
    console.assert(pricing.length === 3, "Pricing should render exactly 3 cards");
  } catch (e) {
    console.warn("Sanity tests warning:", e);
  }
}

/* =========================================================
   Base UI
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
      <p className="text-gray-700 mt-1 text-sm md:text-base text-center">
        {label}
      </p>
    </div>
  );
}

export function SectionDivider({ flip = false }: { flip?: boolean }) {
  const gid = React.useId();
  return (
    <svg
      className={cn("w-full h-16 md:h-20", flip && "rotate-180")}
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

/* =========================================================
   About Mega Menu (hover/focus)
   - Anchored to the "About" nav item
   - Backdrop prevents overlap with sticky chips
   - Closes on scroll, wheel, click-outside, or Esc
   ========================================================= */
function AboutMegaMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  const items: { id: AboutId; title: string; subtitle: string }[] = [
    { id: "mission", title: "Mission", subtitle: "What we stand for" },
    { id: "process", title: "Process", subtitle: "Snapshot™ + DeepDive™" },
    { id: "products", title: "Products", subtitle: "Modular options & pricing" },
    { id: "case", title: "Case Study", subtitle: "Before & after results" },
    { id: "team", title: "Team", subtitle: "Meet our people" },
    { id: "faq", title: "FAQ", subtitle: "Common questions" },
  ];

  const go = (id: AboutId) => {
    onClose();
    navigate(`/about#${id}`);
  };

  React.useEffect(() => {
    if (!open) return;
    const close = () => onClose();
    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("wheel", close, { passive: true });
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("wheel", close);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* backdrop */}
      <div className="fixed inset-0 z-[65]" aria-hidden onClick={onClose} />
      {/* centered mega panel under header */}
      <div
        className="absolute left-1/2 top-full -translate-x-1/2 z-[70] pt-2"
        onMouseLeave={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="dialog"
        aria-label="About menu"
      >
        <div className="w-[min(92vw,1040px)]">
          <div className="rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
            {/* top chips */}
            <div className="flex gap-3 p-4 overflow-x-auto">
              {items.map((x) => (
                <button
                  key={x.id}
                  onClick={() => go(x.id)}
                  className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-indigo-50 focus-visible:ring-2 focus-visible:ring-indigo-500 whitespace-nowrap"
                >
                  {x.title}
                </button>
              ))}
            </div>

            {/* details */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 pt-0">
              {items.map((x) => (
                <div
                  key={x.id}
                  className="rounded-xl border border-gray-200 bg-white p-4 hover:shadow-sm transition"
                >
                  <div className="text-[10px] tracking-wider text-indigo-600 font-bold">
                    {x.title.toUpperCase()}
                  </div>
                  <div className="text-base font-semibold mt-1">{x.subtitle}</div>
                  <div className="text-gray-500 text-sm mt-1">
                    Open the “{x.title}” section on the About page.
                  </div>
                  <div className="mt-3">
                    <Button
                      onClick={() => go(x.id)}
                      className="px-3"
                      variant="outline"
                    >
                      Go <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   Layout
   ========================================================= */
export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setMobileOpen(false);
    setAboutOpen(false);
  }, [location.pathname]);

  const NAV = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Jobs", href: "/jobs" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-[60] bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <Link
            to="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent"
          >
            Acumen Recruiting
          </Link>

          <nav
            className="hidden md:flex gap-8 text-gray-700 font-medium"
            aria-label="Primary"
          >
            {/* About with hover mega menu */}
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onFocus={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <Link to="/about" className="hover:text-indigo-600 transition">
                About
              </Link>
              <AboutMegaMenu open={aboutOpen} onClose={() => setAboutOpen(false)} />
            </div>

            {NAV.slice(1).map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="hover:text-indigo-600 transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow text-sm min-h-[44px]"
            >
              Get Started
            </Link>
            <button
              aria-label="Open Menu"
              className="md:hidden min-h-[44px] min-w-[44px]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            className="md:hidden bg-white shadow-lg border-t border-gray-200 px-6 py-4 space-y-4"
            role="dialog"
            aria-label="Mobile Menu"
          >
            {[{ label: "Home", href: "/" }, ...[
              { label: "About", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Jobs", href: "/jobs" },
              { label: "Insights", href: "/insights" },
              { label: "Contact", href: "/contact" },
            ]].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block text-gray-700 hover:text-indigo-600"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export function Footer() {
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
          <Link
            to="/contact"
            className="inline-flex mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg min-h-[44px]"
          >
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
   Helpers
   ========================================================= */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-gray-200 text-xs font-medium text-gray-800">
      <CheckCircle className="h-4 w-4 text-emerald-600" />
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
    <div className="relative overflow-hidden border-y border-gray-200 bg-white/80">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-12 py-4 animate-[marquee_18s_linear_infinite] whitespace-nowrap">
          {logos.concat(logos).map((l, i) => (
            <span key={i} className="text-gray-500 font-semibold opacity-80">
              {l}
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { 0% { transform: translateX(0%);} 100% { transform: translateX(-50%);} }`}</style>
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
      <div className="max-w-7xl mx-auto px-6 py-6 grid gap-4 md:grid-cols-3">
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
          className="inline-flex items-center gap-2 text-xs md:text-sm text-gray-700 bg-white/80 border border-gray-200 rounded-full px-3 py-1.5"
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
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/95 backdrop-blur border border-gray-200 shadow-lg px-4 py-3">
          <p className="text-sm md:text-base text-gray-700">
            Ready to review candidates on video this week?
          </p>
          <div className="flex gap-2">
            <a
              href="/#pricing"
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
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
   Sections
   ========================================================= */
export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden text-left py-20 md:py-28 px-0 bg-gradient-to-br from-indigo-50 via-white to-amber-50 border-b border-gray-200/60"
      aria-labelledby="hero-title"
    >
      <GradientOrbs />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          {/* Copy */}
          <div className="md:col-span-7">
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-gray-900"
              style={{ maxWidth: "20ch" }}
            >
              Finance-specialized recruiting.{" "}
              <br className="hidden sm:block" />
              Video-screened talent in{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent">
                7 days
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed"
              style={{ maxWidth: "65ch" }}
            >
              We blend Talent Snapshot™ videos with recruiter-led DeepDive™
              interviews to deliver local, role-ready shortlists—fast.
            </motion.p>

            <ul className="grid sm:grid-cols-2 gap-2 mb-8">
              {[
                "Pre-screened video intros (Snapshot™)",
                "Structured DeepDive™ interviews",
                "Local & role-appropriate shortlists",
                "Transparent, tiered pricing",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  {t}
                </li>
              ))}
            </ul>

            <div className="flex gap-3 md:gap-4 items-center">
              <Link
                to="/contact"
                data-testid="primary-cta"
                className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg bg-amber-500 hover:bg-amber-600 rounded-xl text-white shadow-md transition-transform hover:scale-[1.02] min-h-[44px]"
              >
                Book Consultation
              </Link>
              <a
                href="/#pricing"
                className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-xl border border-gray-300 hover:bg-indigo-50 transition inline-flex items-center gap-2 min-h-[44px]"
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

          {/* Visual */}
          <div className="md:col-span-5">
            <div className="relative aspect-[4/3] rounded-2xl border border-gray-200 bg-white/80 shadow-sm overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-6 gap-2 p-4">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-gray-200 bg-gradient-to-br from-indigo-50 to-white"
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-indigo-500/10 p-6">
                  <PlayCircle className="h-10 w-10 text-indigo-600" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center">
                <div className="flex gap-2">
                  <span className="h-2 w-10 rounded bg-indigo-500/80" />
                  <span className="h-2 w-10 rounded bg-blue-500/70" />
                  <span className="h-2 w-10 rounded bg-amber-500/70" />
                </div>
              </div>
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/90 border border-gray-200 rounded-full px-2.5 py-1 text-xs text-gray-800">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                Talent Snapshot™
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Why Acumen */
function WhyAcumen() {
  const items = [
    { icon: <Clock className="h-5 w-5" />, title: "Speed", desc: "Shortlist in 7 days" },
    { icon: <Video className="h-5 w-5" />, title: "Clarity", desc: "Video-screened talent" },
    { icon: <Shield className="h-5 w-5" />, title: "Predictability", desc: "Transparent pricing" },
  ];
  return (
    <>
      <ValueBand />
      <LogosMarquee />
      <SectionDivider />
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 grid gap-6 sm:grid-cols-3">
          {items.map((x) => (
            <Card key={x.title} className="hover:shadow-md transition-shadow">
              <CardContent>
                <div className="flex items-center gap-3">
                  {x.icon}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {x.title}
                  </h3>
                </div>
                <p className="mt-2 text-gray-600">{x.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

/* Mini Product Tour */
function MiniProductTour() {
  const steps = [
    {
      title: "Kickoff & Questions",
      desc: "We align on role, location, and tailored Snapshot™/DeepDive™ prompts.",
      cta: "See example prompts",
    },
    {
      title: "Video Screens",
      desc: "Candidates record Snapshot™ intros; we run DeepDive™ interviews.",
      cta: "View sample screen",
    },
    {
      title: "Shortlist Delivery",
      desc: "You receive videos + resumes in your portal, with running updates.",
      cta: "Explore the portal",
    },
  ];
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">
          See the Flow
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <Card key={s.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-xs text-gray-500 mb-2">{i + 1} / 3</div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {s.title}
                </h3>
                <p className="text-gray-600 mt-2">{s.desc}</p>
                <Button variant="outline" className="mt-4">
                  {s.cta} <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Stats */
function StatsCounters() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-indigo-700">
          At a Glance
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

/* How it works */
function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">
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
              className="hover:shadow-md transition-transform hover:scale-[1.02]"
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {i + 1}. {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/contact"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow min-h-[44px]"
          >
            Start Hiring
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Pricing */
function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">
          Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Starter",
              price: "$450",
              note: "20 Snapshot + 10 DeepDive",
              badge: "Most Popular",
            },
            { name: "Growth", price: "$900", note: "50 Snapshot + 20 DeepDive" },
            { name: "Enterprise", price: "$2,000", note: "100 Snapshot + 50 DeepDive" },
          ].map((p, i) => (
            <Card
              key={p.name}
              data-testid="pricing-card"
              className={cn(
                "hover:shadow-lg transition-transform hover:scale-[1.02]",
                i === 0 && "ring-2 ring-amber-400"
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{p.name}</h3>
                  {i === 0 && (
                    <span className="text-amber-600 text-xs font-semibold">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="text-3xl font-extrabold mb-2 text-gray-900">
                  {p.price}
                </div>
                <p className="text-gray-600 text-sm mb-1">{p.note}</p>
                <p className="text-gray-500 text-xs">
                  Pricing scales with compensation (60–120k ×2, 120–300k ×3).
                  Success fee applies.
                </p>
                <div className="mt-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm min-h-[44px]"
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

/* FAQ */
function FAQ() {
  const faqs = [
    {
      q: "How fast do we see candidates?",
      a: "You’ll receive your first Snapshot™ videos within a few days; full shortlist within 7 days.",
    },
    {
      q: "Do you use the same database for every role?",
      a: "We maintain a 2,000+ candidate database, but spin up fresh, local sourcing for each engagement.",
    },
    {
      q: "Can we customize the questions?",
      a: "Yes—during kickoff we align on Snapshot™ and DeepDive™ prompts; you can refine after the first 3 candidates.",
    },
  ];
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-indigo-700">
          FAQs
        </h2>
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((f) => (
            <Card key={f.q} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-indigo-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{f.q}</h3>
                    <p className="text-gray-600 mt-1">{f.a}</p>
                  </div>
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
   ABOUT PAGE — colorful, with gradient dividers + chips
   ========================================================= */
type AboutId = "mission" | "process" | "products" | "case" | "team" | "faq";
const ABOUT_IDS: AboutId[] = ["mission", "process", "products", "case", "team", "faq"];

function useScrollToHash() {
  const { hash } = useLocation();
  React.useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 88;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [hash]);
}

function ChipsNav({
  active,
  onJump,
}: {
  active: AboutId | null;
  onJump: (id: AboutId) => void;
}) {
  return (
    <div className="sticky top-[64px] z-[30] bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex gap-3 overflow-x-auto">
          {ABOUT_IDS.map((id) => (
            <button
              key={id}
              onClick={() => onJump(id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm whitespace-nowrap transition",
                active === id
                  ? "border-indigo-500 text-indigo-700 bg-indigo-50"
                  : "border-gray-200 text-gray-800 hover:bg-gray-50"
              )}
            >
              {id === "case" ? "Case Study" : id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutHero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-indigo-50 via-white to-amber-50 border-b border-gray-200/60">
      <GradientOrbs />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-3 tracking-tight text-gray-900">
            Inside{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent">
              Acumen
            </span>
          </h1>
          <p className="text-lg text-gray-700 max-w-prose">
            We’re a boutique recruiting partner dedicated to wealth management and financial
            services—blending human judgment with efficient video workflows.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              to="/contact"
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow inline-flex items-center gap-2"
            >
              Book a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/#pricing"
              className="px-5 py-3 rounded-xl border border-gray-300 hover:bg-indigo-50 text-gray-900 font-semibold shadow-sm"
            >
              See Pricing
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>30+ Wealth Managers placed</Badge>
            <Badge>20 Planners • 8 Tax Advisors</Badge>
            <Badge>Client NPS +68</Badge>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="relative aspect-[4/3] rounded-2xl border border-gray-200 bg-white/80 shadow-sm overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-6 gap-2 p-4">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-gray-200 bg-gradient-to-br from-indigo-50 to-white"
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-indigo-500/10 p-6">
                <Award className="h-10 w-10 text-indigo-600" />
              </div>
            </div>
            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/90 border border-gray-200 rounded-full px-2.5 py-1 text-xs text-gray-800">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Proven process
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSectionMission() {
  return (
    <section id="mission" className="bg-gradient-to-b from-white via-indigo-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-6">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Elevate hiring outcomes for RIAs, broker-dealers, and planning/tax firms by combining{" "}
            <strong>Talent Snapshot™</strong> (short video intros) and{" "}
            <strong>DeepDive™</strong> (structured interviews) into a fast, predictable process.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
              Role-fit over volume
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
              Local + compensation-aligned shortlists
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
              Transparent, tiered pricing
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>30+ Wealth Managers</Badge>
            <Badge>20 Planners • 8 Tax Advisors</Badge>
            <Badge>Client NPS +68</Badge>
          </div>
        </div>
        <div className="md:col-span-6">
          <Card>
            <CardContent>
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5" />
                <h3 className="text-lg font-semibold text-gray-900">Pillars</h3>
              </div>
              <p className="text-gray-600 mt-2">
                Each shortlist is tuned to your market, comp, and must-haves.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                {[
                  { icon: <Rocket className="h-5 w-5" />, t: "Fast iteration" },
                  { icon: <Handshake className="h-5 w-5" />, t: "Partner mindset" },
                ].map((x) => (
                  <div key={x.t} className="rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-2 text-gray-800 font-medium">
                      {x.icon} {x.t}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function AboutSectionProcess() {
  const steps = [
    { title: "Kickoff & Brief", desc: "Align on role, location & tailored prompts.", icon: <Clock className="h-5 w-5" /> },
    { title: "Snapshot™ + DeepDive™", desc: "Video intros & structured interviews.", icon: <Video className="h-5 w-5" /> },
    { title: "Shortlist in 7 Days", desc: "Local, role-ready candidates to your portal.", icon: <PlayCircle className="h-5 w-5" /> },
  ];
  return (
    <section id="process" className="bg-gradient-to-r from-indigo-50 via-white to-amber-50 border-y border-gray-200/70 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-indigo-700">
          Our Process
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <Card key={s.title} className="hover:shadow-md transition-shadow">
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{i + 1} / 3</span>
                  <div className="rounded-full p-2 bg-indigo-50 border border-indigo-100">
                    {s.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mt-3 text-gray-900">
                  {s.title}
                </h3>
                <p className="text-gray-600 mt-1">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSectionProducts() {
  const PRODUCTS = [
    {
      name: "Talent Snapshot™",
      price: "0–60k: 20=$200 • 50=$450 • 100=$800",
      note: "Pre-recorded introductions for fast, affordable screening.",
    },
    {
      name: "Talent DeepDive™",
      price: "0–60k: 10=$300 • 20=$550 • 50=$1,250",
      note: "Structured, recruiter-led interviews recorded for review.",
    },
    {
      name: "Complete Talent Pack™",
      price: "Starter=$450 • Growth=$900 • Enterprise=$2,000",
      note: "Bundle of Snapshot™ + DeepDive™ for scale and depth.",
    },
  ];
  return (
    <section id="products" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-indigo-700">
          Products
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <Card key={p.name} className="hover:shadow-lg transition-shadow">
              <CardContent>
                <h3 className="text-xl font-semibold text-gray-900">{p.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{p.note}</p>
                <div className="mt-4 p-3 rounded-lg border border-gray-200 bg-white/70 text-gray-800 text-sm">
                  {p.price}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent>
              <h3 className="text-lg font-semibold text-gray-900">
                Salary-Based Pricing
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                <li>0–60k: Standard pricing above</li>
                <li>60k–120k: Pricing doubles</li>
                <li>120k–300k: Pricing triples</li>
              </ul>
              <p className="text-gray-600 text-sm mt-2">
                Applies to Snapshot™, DeepDive™, and success fees.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent>
              <h3 className="text-lg font-semibold text-gray-900">
                Success Fee (by Compensation)
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                <li>$500 per hire → Roles paying 0–60k</li>
                <li>$2,000 per hire → Roles paying 60k–120k</li>
                <li>$6,000 per hire → Roles paying 120k–300k</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function AboutSectionCaseTeam() {
  const WHO = [
    { title: "RIAs & Wealth Managers", desc: "Advisor, Associate, Client Service, Ops" },
    { title: "Broker-Dealers", desc: "Registered Reps, Compliance, Supervision" },
    { title: "Tax & Planning Firms", desc: "EA/CPA, Planners, Para-Planning, Admin" },
  ];
  const TEAM = [
    { name: "Alex Kim", role: "Principal Recruiter", badge: "RIA & Broker-Dealer", initials: "AK" },
    { name: "Morgan Patel", role: "Sourcing Lead", badge: "Planners & Tax", initials: "MP" },
    { name: "Riley Chen", role: "Client Success", badge: "Nationwide Accounts", initials: "RC" },
  ];
  const TESTIMONIALS = [
    {
      quote:
        "The Snapshot + DeepDive combo cut our time-to-hire in half. We met stronger candidates with far less back-and-forth.",
      name: "Director of Wealth",
      org: "HorizonWM",
    },
    {
      quote:
        "Clear communication, relevant shortlists, and transparent pricing—we wish we’d found them sooner.",
      name: "COO",
      org: "PlanWise",
    },
  ];
  return (
    <section id="case" className="bg-gradient-to-b from-white via-indigo-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-indigo-700">
          Case Study & Who We Serve
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {WHO.map((x) => (
            <Card key={x.title}>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {x.title}
                  </h3>
                </div>
                <p className="text-gray-600 mt-2">{x.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <SectionDivider />

        <div id="team" className="pt-2">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-8">
            Meet the Team
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {TEAM.map((m) => (
              <Card key={m.name}>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-amber-500 text-white flex items-center justify-center font-bold">
                      {m.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{m.name}</div>
                      <div className="text-sm text-gray-600">{m.role}</div>
                      <div className="text-xs text-indigo-700 mt-1">{m.badge}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <SectionDivider />

        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <Card key={idx} className="hover:shadow-md">
              <CardContent>
                <div className="flex items-center gap-2 text-indigo-600">
                  <Quote className="h-4 w-4" />
                  <span className="text-xs font-semibold">Testimonial</span>
                </div>
                <p className="mt-3 text-gray-800">{t.quote}</p>
                <p className="mt-4 text-sm text-gray-600">
                  — {t.name}, {t.org}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutFAQ() {
  return (
    <section id="faq" className="bg-white">
      <FAQ />
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
    <div className="bg-white min-h-screen text-gray-900 flex flex-col">
      <SkipLink />
      <Header />
      <main id="main" className="flex-1">
        <HeroSection />
        <WhyAcumen />
        <SectionDivider flip />
        <MiniProductTour />
        <SectionDivider />
        <HowItWorksSection />
        <SectionDivider flip />
        <PricingSection />
        <SectionDivider />
        <StatsCounters />
        <SectionDivider flip />
        <FAQ />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}

/* ABOUT with smooth scrolling + active chip */
function AboutPage() {
  useScrollToHash();
  const [active, setActive] = React.useState<AboutId | null>("mission");

  const observerRef = React.useRef<IntersectionObserver | null>(null);
  React.useEffect(() => {
    const sections = ABOUT_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];

    observerRef.current?.disconnect();
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActive(visible.target.id as AboutId);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((sec) => obs.observe(sec));
    observerRef.current = obs;
    return () => obs.disconnect();
  }, []);

  const jump = (id: AboutId) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 88;
    window.history.pushState({}, "", `/about#${id}`);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main id="main">
        <AboutHero />
        <ChipsNav active={active} onJump={jump} />
        <AboutSectionMission />
        <SectionDivider />
        <AboutSectionProcess />
        <SectionDivider flip />
        <AboutSectionProducts />
        <SectionDivider />
        <AboutSectionCaseTeam />
        <SectionDivider flip />
        <AboutFAQ />
      </main>
      <Footer />
    </div>
  );
}

/* Simple placeholders for other routes */
function EmptyPage({ title = "Coming soon." }: { title?: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white text-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-3">{title}</h1>
        <p className="text-gray-600">This page is intentionally empty for now.</p>
      </main>
      <Footer />
    </div>
  );
}

function ServicesPage() {
  return <EmptyPage title="Services" />;
}
function JobsPage() {
  return <EmptyPage title="Jobs" />;
}
function InsightsPage() {
  return <EmptyPage title="Insights" />;
}
function ContactPage() {
  return <EmptyPage title="Contact" />;
}

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
