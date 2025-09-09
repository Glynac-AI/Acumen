// src/pages/AboutPage.tsx
import * as React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Star,
  TrendingUp,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Clock,
  Video,
  PlayCircle,
  Target,
  Rocket,
  Handshake,
  Quote,
  Award,
  Building2,
  Shield,
  Package,
  Layers,
  ListChecks,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// ✅ use the real, exported names from App.tsx
import {
  Header,
  Footer,
  Card,
  CardContent,
  SectionDivider,
} from "../App";

/** soft background behind hero */
function SoftGridBG() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-[26rem] w-[26rem] rounded-full bg-indigo-200/50 blur-3xl" />
      <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-amber-200/50 blur-3xl" />
      <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-white" />
      <div className="absolute inset-0 bg-[radial-gradient(transparent_1px,rgba(0,0,0,0.02)_1px)] [background-size:16px_16px]" />
    </div>
  );
}

/** Utility: smooth scroll with header offset */
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 96; // ~ header height
  window.scrollTo({ top: y, behavior: "smooth" });
}

type SectionId = "mission" | "process" | "products" | "case" | "team" | "faq";
const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "mission", label: "Mission" },
  { id: "process", label: "Process" },
  { id: "products", label: "Products" },
  { id: "case", label: "Case Study" },
  { id: "team", label: "Team" },
  { id: "faq", label: "FAQ" },
];

export default function AboutPage() {
  const location = useLocation();
  const [active, setActive] = React.useState<SectionId>("mission");

  // handle deep link
  React.useEffect(() => {
    const hash = location.hash?.replace("#", "") as SectionId | "";
    if (hash) {
      requestAnimationFrame(() => scrollToId(hash));
      setActive((prev) => (SECTIONS.some((s) => s.id === hash) ? (hash as SectionId) : prev));
    }
  }, [location.hash]);

  // watch sections to update active tab
  React.useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("id") as SectionId | null;
            if (id) setActive(id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const KPI = [
    { icon: <Users className="h-4 w-4" />, text: "30+ Wealth Managers placed" },
    { icon: <Users className="h-4 w-4" />, text: "20 Licensed Planners" },
    { icon: <Users className="h-4 w-4" />, text: "8 Tax Advisors" },
    { icon: <Star className="h-4 w-4" />, text: "Client NPS +68" },
    { icon: <TrendingUp className="h-4 w-4" />, text: "40+ roles covered" },
  ];

  const PRODUCTS = [
    {
      name: "Talent Snapshot™",
      price: "0–60k: 20=$200 • 50=$450 • 100=$800",
      note: "Pre-recorded introductions for fast, affordable screening.",
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: "Talent DeepDive™",
      price: "0–60k: 10=$300 • 20=$550 • 50=$1,250",
      note: "Structured, recruiter-led interviews recorded for review.",
      icon: <Layers className="h-5 w-5" />,
    },
    {
      name: "Complete Talent Pack™",
      price: "Starter=$450 • Growth=$900 • Enterprise=$2,000",
      note: "Bundle of Snapshot™ + DeepDive™ for scale and depth.",
      icon: <ListChecks className="h-5 w-5" />,
    },
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
    {
      quote:
        "They understood the role nuances and the local talent market better than larger firms we’ve used.",
      name: "Managing Partner",
      org: "EstatePro",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white text-gray-900">
      <Header />
      <main className="relative">
        {/* HERO */}
        <section id="about-hero" className="relative overflow-hidden">
          <SoftGridBG />
          <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-10">
            <div className="grid md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-7">
                <motion.h1
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-6xl font-extrabold mb-4 leading-[1.1]"
                >
                  Inside{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent">
                    Acumen
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08 }}
                  className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-prose"
                >
                  We’re a boutique recruiting partner dedicated to wealth management and financial services. We blend
                  human judgment with efficient video workflows to bring you <strong>local, role-ready shortlists</strong>—fast.
                </motion.p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {KPI.map((k) => (
                    <span
                      key={k.text}
                      className="inline-flex items-center gap-2 text-xs md:text-sm text-gray-800 bg-white/90 border border-gray-200 rounded-full px-3 py-1.5"
                    >
                      {k.icon}
                      {k.text}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex gap-3">
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
              </div>

              {/* Visual grid */}
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
          </div>

          {/* Sticky chips nav (single, non-duplicated) */}
          <div className="sticky top-[72px] z-40 bg-gradient-to-r from-white/90 via-white/80 to-white/90 backdrop-blur border-y border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap gap-3">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToId(s.id)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition",
                    active === s.id
                      ? "border-indigo-400 bg-indigo-50 text-indigo-700 shadow-sm"
                      : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <SectionDivider />
        <section id="mission" className="scroll-mt-28 bg-gradient-to-b from-white via-indigo-50/50 to-white">
          <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-700">Our Mission</h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Elevate hiring outcomes for RIAs, broker-dealers, and planning/tax firms by combining{" "}
                <strong>Talent Snapshot™</strong> (short video intros) and <strong>DeepDive™</strong> (structured
                interviews) into a fast, predictable process.
              </p>
              <ul className="mt-4 space-y-2 text-gray-800">
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-emerald-600 mt-0.5" /> Role-fit over volume
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-5 w-5 text-indigo-600 mt-0.5" /> Local + compensation-aligned shortlists
                </li>
                <li className="flex items-start gap-2">
                  <Rocket className="h-5 w-5 text-amber-600 mt-0.5" /> Transparent, tiered pricing
                </li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-gray-700">
                  <Users className="h-4 w-4" /> 30+ Wealth Managers placed
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-gray-700">
                  <Users className="h-4 w-4" /> 20 Planners • 8 Tax Advisors
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-gray-700">
                  <Star className="h-4 w-4" /> Client NPS +68
                </span>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-2xl border border-indigo-100 bg-white/80 p-4 shadow-sm">
                <div className="text-sm text-indigo-700 font-semibold inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Proven process
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <SectionDivider flip />
        <section
          id="process"
          className="scroll-mt-28 bg-gradient-to-r from-indigo-50/40 via-white to-amber-50/40 border-y border-gray-200/60"
        >
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">Our Process</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Kickoff & Brief",
                  desc: "Align on role, location, and tailored prompts.",
                  icon: <Clock className="h-5 w-5" />,
                },
                {
                  step: "2",
                  title: "Snapshot™ + DeepDive™",
                  desc: "Video intros & structured interviews, recorded for review.",
                  icon: <Video className="h-5 w-5" />,
                },
                {
                  step: "3",
                  title: "Shortlist in 7 Days",
                  desc: "Local, role-ready candidates delivered to your portal.",
                  icon: <PlayCircle className="h-5 w-5" />,
                },
              ].map((s, i) => (
                <Card key={s.title} className="relative bg-white/90">
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{s.step} / 3</span>
                      <div className="rounded-full p-2 bg-indigo-50 border border-indigo-100">{s.icon}</div>
                    </div>
                    <h3 className="text-xl font-semibold mt-3 text-gray-900">{s.title}</h3>
                    <p className="text-gray-600 mt-1">{s.desc}</p>
                  </CardContent>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-indigo-300 to-amber-300" />
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <SectionDivider />
        <section id="products" className="scroll-mt-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-indigo-700">Products</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {PRODUCTS.map((p) => (
                <Card key={p.name} className="hover:shadow-lg transition-shadow">
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full p-2 bg-indigo-50 border border-indigo-100">{p.icon}</span>
                      <h3 className="text-xl font-semibold text-gray-900">{p.name}</h3>
                    </div>
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
                  <h3 className="text-lg font-semibold text-gray-900">Salary-Based Pricing</h3>
                  <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                    <li>0–60k: Standard pricing above</li>
                    <li>60k–120k: Pricing doubles</li>
                    <li>120k–300k: Pricing triples</li>
                  </ul>
                  <p className="text-gray-600 text-sm mt-2">Applies to Snapshot™, DeepDive™, and success fees.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent>
                  <h3 className="text-lg font-semibold text-gray-900">Success Fee (by Compensation)</h3>
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

        {/* Case & Who we serve */}
        <SectionDivider flip />
        <section
          id="case"
          className="scroll-mt-28 bg-gradient-to-r from-white via-indigo-50 to-white border-y border-gray-200/70"
        >
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-8">
              Case Study & Who We Serve
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent>
                  <h3 className="text-lg font-semibold text-gray-900">Before & After</h3>
                  <p className="text-gray-600 mt-1">
                    Reduced time-to-hire 50% for a multi-office RIA; improved pass-through to final round by 38%.
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                    <span className="rounded-md border bg-white px-2 py-1">Ops</span>
                    <span className="rounded-md border bg-white px-2 py-1">Client Service</span>
                    <span className="rounded-md border bg-white px-2 py-1">Advisors</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <h3 className="text-lg font-semibold text-gray-900">Who We Serve</h3>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                    <div className="rounded-lg border p-3 bg-white/80">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" /> RIAs & Wealth Managers
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Advisor, Associate, Client Service, Ops</div>
                    </div>
                    <div className="rounded-lg border p-3 bg-white/80">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" /> Broker-Dealers
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Registered Reps, Compliance, Supervision</div>
                    </div>
                    <div className="rounded-lg border p-3 bg-white/80">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" /> Tax & Planning Firms
                      </div>
                      <div className="text-xs text-gray-600 mt-1">EA/CPA, Planners, Para-Planning, Admin</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <SectionDivider />
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-6 py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-8">
              What Clients Say
            </h2>
            <div className="relative overflow-hidden">
              <div className="flex gap-6 animate-marquee-slow">
                {TESTIMONIALS.concat(TESTIMONIALS).map((t, idx) => (
                  <Card key={idx} className="min-w-[320px] max-w-sm">
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
          </div>
        </section>

        {/* Team */}
        <SectionDivider flip />
        <section id="team" className="scroll-mt-28 bg-gradient-to-b from-white to-indigo-50/60">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-10">
              Meet the Team
            </h2>
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
        </section>

        {/* FAQ */}
        <SectionDivider />
        <section id="faq" className="scroll-mt-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-indigo-700">FAQs</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  q: "How fast do we see candidates?",
                  a: "You’ll receive your first Snapshot™ videos within a few days; full shortlist within 7 days.",
                },
                {
                  q: "Do you use the same database for every role?",
                  a: "We maintain a 2,000+ candidate database, and launch fresh local sourcing for each engagement.",
                },
                {
                  q: "Can we customize the questions?",
                  a: "Yes—during kickoff we align on Snapshot™ and DeepDive™ prompts; refine after the first 3 candidates.",
                },
              ].map((f) => (
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

        {/* CTA */}
        <SectionDivider flip />
        <section className="relative my-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-500 to-amber-500">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(transparent_1px,rgba(255,255,255,0.3)_1px)] [background-size:18px_18px]" />
                <div className="relative p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h3 className="text-white text-2xl md:text-3xl font-extrabold">
                      Ready to meet candidates this week?
                    </h3>
                    <p className="text-white/90 mt-1">Get Snapshot™ videos and a curated shortlist fast.</p>
                  </div>
                  <div className="flex gap-3">
                    <Link to="/contact" className="px-5 py-3 rounded-xl bg-white text-indigo-700 font-semibold shadow">
                      Book Consultation
                    </Link>
                    <a href="/#pricing" className="px-5 py-3 rounded-xl border border-white/70 text-white font-semibold">
                      See Pricing
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back/home actions */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="flex gap-3">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow inline-flex items-center gap-2"
            >
              Book a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-indigo-50 text-gray-900 font-semibold shadow-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// tiny cn helper (local)
function cn(...cls: (string | false | null | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}
