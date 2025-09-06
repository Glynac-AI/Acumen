import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Menu } from "lucide-react";

/**
 * Runtime sanity tests (non-breaking):
 * These help validate landing-page requirements without breaking UI.
 */
function runSanityTests() {
  try {
    if (typeof window === "undefined") return;
    const hero = document.getElementById("hero");
    const ctas = hero?.querySelectorAll('[data-testid="primary-cta"]') ?? [];
    const steps = document.getElementById("how-it-works")?.querySelectorAll('[data-testid="step"]') ?? [];
    const counters = document.querySelectorAll('[data-testid="counter"]') ?? [];
    const pricing = document.getElementById("pricing")?.querySelectorAll('[data-testid="pricing-card"]') ?? [];

    console.assert(!!hero, "Hero section should exist");
    console.assert(ctas.length >= 1, "Primary CTA should be present in hero");
    console.assert(steps.length === 3, "There should be exactly 3 steps in How it Works");
    console.assert(counters.length >= 3, "There should be at least 3 proof counters");
    console.assert(pricing.length === 3, "Pricing should render exactly 3 cards");
  } catch (e) {
    console.warn("Sanity tests warning:", e);
  }
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
    <div ref={ref} className="flex flex-col items-center justify-center p-4" data-testid="counter">
      <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent">
        {count}+
      </span>
      <p className="text-gray-700 mt-1 text-sm md:text-base text-center">{label}</p>
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
  const gid = React.useId();
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
            {['About', 'Services', 'How It Works', 'Pricing', 'Proof', 'Contact'].map((link, i) => (
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
        {/* HERO — concise landing message with trust inline */}
        <section id="hero" className="relative text-center py-24 md:py-28 px-6 max-w-6xl mx-auto bg-fixed bg-gradient-to-br from-indigo-50 via-white to-amber-50 rounded-2xl">
          {/* wrap adjacent motion elements */}
          <>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight"
            >
              Finance‑Specialized Recruiting. Qualified, video‑screened talent in <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent">7 days</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base md:text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              We blend structured recruiter interviews with Talent Snapshot™ videos to deliver local, role‑ready shortlists—fast.
            </motion.p>
          </>

          <div className="flex gap-3 md:gap-4 justify-center mb-8">
            <Button data-testid="primary-cta" size="lg" className="bg-amber-500 hover:bg-amber-600 rounded-xl px-6 md:px-8 py-3 md:py-4 text-base md:text-lg shadow-md transition-transform hover:scale-[1.02]">Book Consultation</Button>
            <Button size="lg" variant="outline" className="rounded-xl px-6 md:px-8 py-3 md:py-4 text-base md:text-lg hover:bg-indigo-100 transition">See Pricing</Button>
          </div>

          {/* Inline trust row: logos + micro‑stats + one quote */}
          <div className="grid gap-4 md:gap-6 md:grid-cols-3 items-center text-left md:text-center">
            <div className="flex flex-wrap justify-center md:justify-center gap-4 opacity-80 text-gray-500 text-sm">
              {['WealthCo','FinServe','EstatePro','PlanWise'].map((logo) => (
                <span key={logo} className="font-semibold">{logo}</span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-3 py-2 bg-white/70 border rounded-full text-sm">30+ Wealth Managers</div>
              <div className="px-3 py-2 bg-white/70 border rounded-full text-sm">20 Planners</div>
              <div className="px-3 py-2 bg-white/70 border rounded-full text-sm">8 Tax Advisors</div>
            </div>
            <p className="text-gray-600 text-sm italic text-center">“Video intros saved us hours—shortlist was spot‑on.”</p>
          </div>
        </section>

        <SectionDivider />

        {/* ABOUT US */}
        <section id="about" className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-700">About Acumen Recruiting</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We are a boutique recruiting firm focused exclusively on the wealth management and financial services ecosystem.
                  Our model blends <strong>human‑first evaluation</strong> with <strong>signals‑driven sourcing</strong> to deliver local, role‑ready shortlists faster than traditional agencies.
                </p>
                <ul className="space-y-3 text-gray-700">
                  {["Finance‑only specialization (RIAs, broker‑dealers, private banks, family offices)",
                    "Structured recruiter interviews + asynchronous Talent Snapshot™ videos",
                    "Transparent, salary‑aware pricing with aligned success fees",
                    "Compliance‑friendly process with auditable candidate records",
                    "Diversity‑conscious sourcing with standardized scorecards"].map((point) => (
                    <li key={point} className="flex items-start gap-2"><CheckCircle className="text-amber-500 mt-0.5" /> <span>{point}</span></li>
                  ))}
                </ul>
                <div className="mt-6 flex gap-3">
                  <Button className="bg-amber-500 hover:bg-amber-600">Meet the Team</Button>
                  <Button variant="outline">Our Story</Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[{k:"Fill Time",v:"7 days"},{k:"Client NPS",v:"+68"},{k:"Roles Covered",v:"40+"},{k:"Markets",v:"US & Canada"}].map(({k,v}) => (
                  <Card key={k} className="shadow-sm">
                    <CardContent className="p-6">
                      <div className="text-sm text-gray-500 mb-1">{k}</div>
                      <div className="text-2xl font-extrabold">{v}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Industries */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">Industries We Serve</h3>
              <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-700">
                {["Registered Investment Advisors (RIA)","Broker‑Dealers","Private Banking","Family Offices","Trust & Estate","Tax & Accounting","Asset / Wealth Tech","Insurance & Risk"].map((s) => (
                  <Card key={s} className="hover:shadow-md transition">
                    <CardContent className="p-4">{s}</CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SectionDivider flip />

        {/* SERVICES */}
        <section id="services" className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[{
                name: 'Talent Snapshot™',
                desc: 'Asynchronous, pre‑recorded candidate introductions answering your role‑specific prompts for fast screening.',
                items: ['Faster top‑of‑funnel','Role‑aligned prompts','Shareable clips']
              },{
                name: 'Talent DeepDive™',
                desc: 'Structured, recruiter‑led interviews recorded for review with standardized scorecards and compliance notes.',
                items: ['Structured rubric','Recorded & time‑stamped','Bias‑checked scoring']
              },{
                name: 'Complete Talent Pack™',
                desc: 'Bundle: Snapshot + DeepDive for both volume and depth. Best for multi‑role or team builds.',
                items: ['Scale + quality','Lower unit cost','Team builds']
              }].map((svc) => (
                <Card key={svc.name} className="transition-transform hover:scale-[1.02] hover:shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{svc.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{svc.desc}</p>
                    <ul className="text-sm text-gray-700 space-y-2">
                      {svc.items.map((i) => (<li key={i} className="flex gap-2 items-start"><CheckCircle className="text-amber-500 mt-0.5" /> {i}</li>))}
                    </ul>
                    <div className="mt-4"><Button variant="outline">Learn More</Button></div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add‑ons */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[{
                name:'Success Fee Placement',
                desc:'Pay a fixed success fee on hire (tiered by compensation). Pairs with Snapshot/DeepDive for end‑to‑end recruiting.'
              },{
                name:'Diversity & Compliance',
                desc:'Inclusive sourcing, standardized rubrics, auditable notes, and OFCCP‑friendly workflows.'
              },{
                name:'Employer Branding Boost',
                desc:'Role pages, candidate one‑pagers, and script help so your value proposition lands with talent.'
              }].map((addon)=> (
                <Card key={addon.name} className="transition-transform hover:scale-[1.02] hover:shadow-lg">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2">{addon.name}</h4>
                    <p className="text-gray-600 text-sm">{addon.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* HOW IT WORKS — 3 steps */}
        <section id="how-it-works" className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {title: 'Brief', desc: 'Fast kickoff call to align on role, location, and must‑haves.'},
                {title: 'Video Screens', desc: 'Talent Snapshot™ intros + recruiter‑led DeepDive™ interviews.'},
                {title: 'Shortlist in 7 Days', desc: 'Local, role‑ready candidates delivered to your portal.'},
              ].map((step, i) => (
                <Card key={i} data-testid="step" className="hover:shadow-md transition-transform transform hover:scale-105">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{i+1}. {step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button className="bg-amber-500 hover:bg-amber-600">Start Hiring</Button>
            </div>
          </div>
        </section>

        <SectionDivider flip />

        {/* PRICING SNAPSHOT — highlight most chosen */}
        <section id="pricing" className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">Transparent Pricing</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[{
                name: 'Starter', price: '$450', note: '20 Snapshot + 10 DeepDive', badge: 'Most Popular', comp: '0–60k roles'
              },{
                name: 'Growth', price: '$900', note: '50 Snapshot + 20 DeepDive', comp: '0–60k roles'
              },{
                name: 'Enterprise', price: '$2,000', note: '100 Snapshot + 50 DeepDive', comp: '0–60k roles'
              }].map((p, i) => (
                <Card key={p.name} data-testid="pricing-card" className={`${i===0 ? 'ring-2 ring-amber-400' : ''} transition-transform transform hover:scale-105 hover:shadow-lg`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{p.name}</h3>
                      {i===0 && <span className="text-amber-600 text-xs font-semibold">{p.badge}</span>}
                    </div>
                    <div className="text-3xl font-extrabold mb-2">{p.price}</div>
                    <p className="text-gray-600 text-sm mb-1">{p.note}</p>
                    <p className="text-gray-500 text-xs">Pricing scales with compensation (60–120k x2, 120–300k x3). Success fee applies.</p>
                    <div className="mt-4"><Button variant="outline">Choose Plan</Button></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* PROOF — counters + quotes */}
        <section id="proof" className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-indigo-700">Proven Outcomes</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center mb-10">
              <Counter value={30} label="Wealth Managers" />
              <Counter value={20} label="Financial Planners" />
              <Counter value={8} label="Tax Advisors" />
              <Counter value={15} label="Estate Specialists" />
              <Counter value={5} label="Compliance Officers" />
              <Counter value={100} label="Client Staff" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {["“Shortlist quality was excellent—we moved to offers faster.”", "“Transparent pricing and recruiter support were standout.”"].map((q) => (
                <Card key={q} className="p-6 shadow-sm transition-shadow hover:shadow-md">
                  <CardContent>
                    <p className="text-gray-700 italic">{q}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
