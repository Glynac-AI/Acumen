import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Shield, Users2, LineChart, Rocket, Building2, Star, Globe2 } from "lucide-react";

/**
 * Homepage2026.tsx — Ultra 2026 Redesign (attention‑grabbing, a11y‑first)
 * ----------------------------------------------------------------------
 * This page composes modern, conversion‑oriented sections with no external
 * animation libs (CSS only) and fits within your React Router layout.
 *
 * NEW (based on your latest brief):
 *  - Proven Track Record + Candidate Database sections
 *  - 2026‑ready Products & Pricing with salary‑band multipliers
 *  - Interactive Pricing Estimator + Success Fee table
 *  - Strong, accessible content structure and SEO microdata
 */

// ---------- Types ----------------------------------------------------------
interface Logo { name: string; src: string; alt?: string }
interface Metric { label: string; value: string }
interface Testimonial { quote: string; name: string; title: string; company: string }
interface Feature { title: string; description: string; icon: React.ReactNode }
interface Step { label: string; title: string; text: string }

type BandKey = "0-60" | "60-120" | "120-300";

export interface HomeContent {
  hero?: {
    eyebrow?: string;
    title: string;
    highlight: string;
    subtitle: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  trust?: { logos: Logo[] };
  kpis?: Metric[];
  features?: Feature[];
  steps?: Step[];
  testimonials?: Testimonial[];
}

// ---------- Defaults -------------------------------------------------------
const defaults: Required<HomeContent> = {
  hero: {
    eyebrow: "Wealth & Financial Services Recruiting",
    title: "Signals‑Driven Sourcing",
    highlight: "Human‑First Screening",
    subtitle:
      "We combine efficient technology with human insight to deliver candidates who are screened, local, and relevant — at a fraction of traditional recruiting costs.",
    primary: { label: "Book a 15‑min Discovery", href: "/contact" },
    secondary: { label: "See Pricing & Process", href: "#process" },
  },
  trust: {
    logos: [
      { name: "Fidelity", src: "/logos/fidelity.svg" },
      { name: "Schwab", src: "/logos/schwab.svg" },
      { name: "Pershing", src: "/logos/pershing.svg" },
      { name: "Plaid", src: "/logos/plaid.svg" },
      { name: "Morningstar", src: "/logos/morningstar.svg" },
    ],
  },
  kpis: [
    { label: "Time‑to‑Shortlist", value: "5–7 days" },
    { label: "Qualified Interview Rate", value: "78%" },
    { label: "Average Cost Savings", value: "42%" },
    { label: "Local Placement Ratio", value: "9/10" },
  ],
  features: [
    { title: "Compliance‑Ready Vetting", description: "Background & credential checks aligned to broker‑dealer and RIA standards.", icon: <Shield className="h-5 w-5" aria-hidden /> },
    { title: "Signals‑Driven Sourcing", description: "Wealth‑tech data and market signals to surface passive advisors at the right moment.", icon: <LineChart className="h-5 w-5" aria-hidden /> },
    { title: "Human‑Centric Screening", description: "Behavioral interviews that de‑risk client fit: book, values, and client experience.", icon: <Users2 className="h-5 w-5" aria-hidden /> },
    { title: "Speed Without Noise", description: "Shortlists of 3–5 highly viable candidates — not inbox‑flooding.", icon: <Rocket className="h-5 w-5" aria-hidden /> },
  ],
  steps: [
    { label: "01", title: "Screening Call", text: "We understand your role, comp, location, and success criteria." },
    { label: "02", title: "Plan Purchase & Kickoff", text: "Recruiting begins within 1 week. We finalize Talent Snapshot™ & DeepDive™ questions." },
    { label: "03", title: "Candidate Video Delivery", text: "Candidates submit Snapshot videos + resumes to your portal (email alerts)." },
    { label: "04", title: "Feedback Loop", text: "After 3 videos, we review with you and refine questions for fit." },
    { label: "05", title: "Ongoing Recruiting", text: "Continuous candidate flow until your plan is fulfilled; all activity tracked." },
  ],
  testimonials: [
    { quote: "Acumen delivered three finalists in six days; two were on our competitors’ radar the following week.", name: "L. Harper", title: "COO", company: "$4B RIA, Texas" },
    { quote: "We cut cost per hire nearly in half while improving quality. Their local network in private banking is the real differentiator.", name: "M. Singh", title: "Head of Talent", company: "Private Bank, GCC" },
  ],
};

// ---------- Helpers --------------------------------------------------------
const usePRM = () => {
  const [prm, set] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    set(mq.matches);
    const onChange = () => set(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return prm;
};

// ---------- ROI Calculator -------------------------------------------------
function RoiCalculator() {
  const [salary, setSalary] = useState(140000);
  const [daysSaved, setDaysSaved] = useState(30);
  const [revenuePerDay, setRevenuePerDay] = useState(2500);
  const savings = useMemo(() => {
    const speedGain = daysSaved * revenuePerDay;
    const feeDelta = salary * 0.1;
    return Math.max(0, Math.round(speedGain + feeDelta));
  }, [salary, daysSaved, revenuePerDay]);
  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur rounded-2xl" aria-label="Hiring ROI Estimator">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Hiring ROI Estimator</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-muted-foreground">Base Salary ($)
            <Input type="number" inputMode="numeric" value={salary} onChange={(e)=>setSalary(parseInt(e.target.value||"0"))} className="mt-1" />
          </label>
          <label className="text-xs text-muted-foreground">Days Saved
            <Input type="number" inputMode="numeric" value={daysSaved} onChange={(e)=>setDaysSaved(parseInt(e.target.value||"0"))} className="mt-1" />
          </label>
          <label className="text-xs text-muted-foreground col-span-2">Revenue Impact / Day ($)
            <Input type="number" inputMode="numeric" value={revenuePerDay} onChange={(e)=>setRevenuePerDay(parseInt(e.target.value||"0"))} className="mt-1" />
          </label>
        </div>
        <div className="rounded-xl border bg-white/80 p-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Estimated Savings</p>
            <p className="text-2xl font-bold tracking-tight">${savings.toLocaleString()}</p>
          </div>
          <Badge className="text-xs" variant="secondary">Model: speed + fee delta</Badge>
        </div>
        <Button size="sm" className="w-full">Discuss Your Numbers<ArrowRight className="ml-2 h-4 w-4"/></Button>
      </CardContent>
    </Card>
  );
}

// ---------- Marquee (CSS only) --------------------------------------------
function LogoMarquee({ logos }: { logos: Logo[] }) {
  const prm = usePRM();
  return (
    <div className="relative overflow-hidden py-6">
      <div className={`flex items-center gap-10 whitespace-nowrap ${prm?"":"animate-marquee"}`}>
        {[...logos, ...logos].map((l, i) => (
          <img key={l.name+"-"+i} src={l.src} alt={l.alt ?? l.name} className="h-6 opacity-70" />
        ))}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 22s linear infinite; }
      `}</style>
    </div>
  );
}

// ---------- Feature Card ---------------------------------------------------
function FeatureCard({ f }: { f: Feature }) {
  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow rounded-2xl">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 text-sky-600"><div className="rounded-xl bg-sky-50 p-2">{f.icon}</div><h3 className="font-semibold text-lg">{f.title}</h3></div>
        <p className="text-sm text-muted-foreground mt-2 leading-6">{f.description}</p>
      </CardContent>
    </Card>
  );
}

// ---------- Testimonial Card ----------------------------------------------
function Testimonial({ t }: { t: Testimonial }) {
  return (
    <Card className="border-0 bg-white/80 backdrop-blur rounded-2xl shadow-md">
      <CardContent className="p-6">
        <Star className="h-5 w-5 text-yellow-500" aria-hidden />
        <p className="mt-3 text-sm leading-6">“{t.quote}”</p>
        <p className="mt-3 text-xs text-muted-foreground"><span className="font-medium">{t.name}</span> · {t.title}, {t.company}</p>
      </CardContent>
    </Card>
  );
}

// ---------- Pricing Data & Estimator --------------------------------------
const bandMultiplier: Record<BandKey, number> = { "0-60": 1, "60-120": 2, "120-300": 3 };
const successFee: Record<BandKey, number> = { "0-60": 500, "60-120": 2000, "120-300": 6000 };

const snapshotPrices = { 20: 200, 50: 450, 100: 800 } as const; // 0–60k base
const deepdivePrices = { 10: 300, 20: 550, 50: 1250 } as const; // 0–60k base
const bundlePrices = { Starter: 450, Growth: 900, Enterprise: 2000 } as const; // 0–60k base

type ProductType = "Snapshot" | "DeepDive" | "Bundle";

type Selection = { product: ProductType; tierKey: string };

function PricingEstimator() {
  const [band, setBand] = useState<BandKey>("0-60");
  const [sel, setSel] = useState<Selection>({ product: "Snapshot", tierKey: "20" });
  const [hires, setHires] = useState(1);

  const base = useMemo(() => {
    if (sel.product === "Snapshot") return snapshotPrices[Number(sel.tierKey) as 20|50|100];
    if (sel.product === "DeepDive") return deepdivePrices[Number(sel.tierKey) as 10|20|50];
    return bundlePrices[sel.tierKey as keyof typeof bundlePrices];
  }, [sel]);

  const price = Math.round(base * bandMultiplier[band]);
  const fee = successFee[band] * Math.max(0, hires || 0);
  const total = price + fee;

  const changeProduct = (p: ProductType) => {
    const nextSel: Selection = p === "Snapshot" ? { product: p, tierKey: "20" } : p === "DeepDive" ? { product: p, tierKey: "10" } : { product: p, tierKey: "Starter" };
    setSel(nextSel);
  };

  return (
    <Card className="border-0 shadow-xl rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Pricing Estimator</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 text-sm">
        {/* Salary Band Toggle */}
        <div>
          <div className="mb-2 text-xs text-muted-foreground">Compensation Band</div>
          <div className="flex flex-wrap gap-2">
            {(["0-60","60-120","120-300"] as BandKey[]).map((b)=>(
              <button key={b} onClick={()=>setBand(b)} className={`rounded-full border px-3 py-1 ${band===b?"bg-sky-600 text-white border-sky-600":"bg-white/80"}`} aria-pressed={band===b}>{b}k</button>
            ))}
          </div>
        </div>

        {/* Product & Tier */}
        <div className="grid md:grid-cols-2 gap-3">
          <label>
            <span className="text-xs text-muted-foreground">Product</span>
            <select className="mt-1 w-full rounded-md border px-3 py-2 bg-white/80" value={sel.product} onChange={(e)=>changeProduct(e.target.value as ProductType)}>
              <option>Snapshot</option>
              <option>DeepDive</option>
              <option>Bundle</option>
            </select>
          </label>

          <label>
            <span className="text-xs text-muted-foreground">Tier</span>
            {sel.product === "Snapshot" && (
              <select className="mt-1 w-full rounded-md border px-3 py-2 bg-white/80" value={sel.tierKey} onChange={(e)=>setSel({ ...sel, tierKey: e.target.value })}>
                <option value="20">20 videos</option>
                <option value="50">50 videos</option>
                <option value="100">100 videos</option>
              </select>
            )}
            {sel.product === "DeepDive" && (
              <select className="mt-1 w-full rounded-md border px-3 py-2 bg-white/80" value={sel.tierKey} onChange={(e)=>setSel({ ...sel, tierKey: e.target.value })}>
                <option value="10">10 interviews</option>
                <option value="20">20 interviews</option>
                <option value="50">50 interviews</option>
              </select>
            )}
            {sel.product === "Bundle" && (
              <select className="mt-1 w-full rounded-md border px-3 py-2 bg-white/80" value={sel.tierKey} onChange={(e)=>setSel({ ...sel, tierKey: e.target.value })}>
                <option>Starter</option>
                <option>Growth</option>
                <option>Enterprise</option>
              </select>
            )}
          </label>
        </div>

        {/* Hires */}
        <label>
          <span className="text-xs text-muted-foreground">Expected # of hires (for success fee)</span>
          <Input type="number" inputMode="numeric" value={hires} onChange={(e)=>setHires(parseInt(e.target.value||"0"))} className="mt-1" />
        </label>

        {/* Output */}
        <div className="grid md:grid-cols-3 gap-3">
          <div className="rounded-xl border bg-white/80 p-3"><div className="text-xs text-muted-foreground">Product Price</div><div className="text-xl font-bold">${price.toLocaleString()}</div><div className="text-[11px] text-muted-foreground">Band multiplier ×{bandMultiplier[band]}</div></div>
          <div className="rounded-xl border bg-white/80 p-3"><div className="text-xs text-muted-foreground">Success Fee</div><div className="text-xl font-bold">${fee.toLocaleString()}</div><div className="text-[11px] text-muted-foreground">${successFee[band].toLocaleString()} per hire</div></div>
          <div className="rounded-xl border bg-white/80 p-3"><div className="text-xs text-muted-foreground">Estimated Total</div><div className="text-xl font-bold">${total.toLocaleString()}</div><div className="text-[11px] text-muted-foreground">Taxes & discounts excluded</div></div>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------- Page (no header/footer) ---------------------------------------
export default function Homepage2026({ content }: { content?: HomeContent }) {
  const hero = { ...defaults.hero, ...(content?.hero ?? {}) };
  const trust = content?.trust ?? defaults.trust;
  const kpis = content?.kpis?.length ? content.kpis : defaults.kpis;
  const features = content?.features?.length ? content.features : defaults.features;
  const steps = content?.steps?.length ? content.steps : defaults.steps;
  const testimonials = content?.testimonials?.length ? content.testimonials : defaults.testimonials;

  return (
    <div className="min-h-screen bg-[radial-gradient(60%_50%_at_20%_10%,rgba(14,165,233,0.18),transparent),radial-gradient(60%_50%_at_80%_0%,rgba(59,130,246,0.15),transparent)]">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:m-3 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:shadow">Skip to content</a>

      {/* HERO */}
      <section className="relative">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[560px] w-[1600px] rounded-full bg-gradient-to-r from-sky-400/25 via-cyan-300/20 to-blue-400/25 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-14 grid gap-10 md:grid-cols-[1.1fr,0.9fr] items-start">
          <div>
            <Badge variant="secondary" className="mb-4"><Building2 className="mr-1 h-4 w-4"/> {hero.eyebrow}</Badge>
            <h1 className="text-5xl/tight md:text-7xl/tight font-extrabold tracking-tight">
              {hero.title} <span className="bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">{hero.highlight}</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl">{hero.subtitle}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" aria-label={hero.primary.label}><a href={hero.primary.href}>{hero.primary.label} <ArrowRight className="ml-2 h-4 w-4"/></a></Button>
              <Button asChild size="lg" variant="outline" aria-label={hero.secondary.label}><a href={hero.secondary.href}>{hero.secondary.label}</a></Button>
            </div>
            <div className="mt-10" aria-label="Trusted by leading brands"><LogoMarquee logos={trust.logos} /></div>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4" aria-label="Key performance metrics">
              {kpis.map((m)=> (
                <Card key={m.label} className="border-0 shadow-sm bg-white/80 rounded-2xl"><CardContent className="p-6"><p className="text-3xl font-bold tracking-tight">{m.value}</p><p className="text-xs text-muted-foreground mt-1">{m.label}</p></CardContent></Card>
              ))}
            </div>
            <RoiCalculator />
          </div>
        </div>
      </section>

      {/* PROVEN TRACK RECORD */}
      <section className="mx-auto max-w-7xl px-4" aria-label="Proven track record">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            {label:"Wealth Managers", value:"30+"},
            {label:"Licensed Financial Planners", value:"20"},
            {label:"Tax Advisors", value:"8"},
            {label:"Estate Planning Specialists", value:"15"},
            {label:"Compliance Officers", value:"5"},
            {label:"Support Hires", value:"100s"},
          ].map((x)=> (
            <div key={x.label} className="rounded-xl border bg-white/80 px-4 py-3 text-center shadow-sm">
              <div className="text-2xl font-bold">{x.value}</div>
              <div className="text-xs text-muted-foreground">{x.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CANDIDATE DATABASE */}
      <section className="mx-auto max-w-7xl px-4 py-12" aria-label="Candidate database">
        <Card className="border-0 shadow-xl rounded-2xl bg-white/85">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">Candidate Database (Pre‑Screened 2,000)</h2>
            <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-sm">
              {[
                {label:"Wealth Managers / Advisors", value:500},
                {label:"Licensed Financial Planners", value:200},
                {label:"Tax Advisors & Accountants", value:150},
                {label:"Estate Planning Specialists", value:100},
                {label:"Compliance Officers", value:75},
                {label:"Support Staff", value:975},
              ].map((i)=> (
                <div key={i.label} className="rounded-xl border bg-white/80 px-3 py-3 text-center"><div className="text-lg font-semibold">{i.value.toLocaleString()}</div><div className="text-xs text-muted-foreground">{i.label}</div></div>
              ))}
            </div>
            <div className="mt-4 text-xs text-muted-foreground">⚠️ We launch fresh recruiting for every engagement to ensure candidates are local and role‑appropriate.</div>
          </CardContent>
        </Card>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-16" id="features">
        <div className="grid md:grid-cols-[1fr,1.1fr] gap-10 items-start">
          <div>
            <Badge variant="secondary">Why Acumen</Badge>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Less Noise. Higher Signal. Faster Hires.</h2>
            <p className="mt-3 text-muted-foreground max-w-prose">We blend wealth‑tech data with senior recruiters who understand advisor books, client promises, and compliance realities. The result is a shortlist you can act on.</p>
            <div className="mt-6 grid gap-3">
              {features.map((f)=> <FeatureCard key={f.title} f={f}/>) }
            </div>
          </div>
          <Card className="border-0 shadow-xl bg-gradient-to-b from-white/80 to-white/60 rounded-2xl" aria-label="Roles we fill">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sky-600"><Globe2 className="h-5 w-5"/><h3 className="font-semibold">Roles We Fill</h3></div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                {["Financial Advisor","Private Banker","Client Service","Ops Lead","Trader","Compliance","Portfolio Analyst","Wealth Tech"].map((r)=> (
                  <span key={r} className="rounded-full border px-3 py-1 bg-white/80">{r}</span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground"><Shield className="h-4 w-4"/>Background checks, references, credentials handled.</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* PROCESS */}
      <section id="main" className="mx-auto max-w-7xl px-4 py-16" aria-label="How it works">
        <div className="text-center"><Badge variant="secondary">How It Works</Badge><h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">A Crisp, Five‑Step Process</h2></div>
        <ol className="mt-8 grid gap-4 md:grid-cols-5">
          {steps.map((s)=> (
            <li key={s.label} className="rounded-2xl border bg-white/80 p-6 shadow-sm"><div className="text-xs text-muted-foreground">{s.label}</div><div className="font-medium mt-1">{s.title}</div><p className="text-sm text-muted-foreground mt-1 leading-6">{s.text}</p></li>
          ))}
        </ol>
      </section>

      {/* PRODUCTS & PRICING */}
      <section className="mx-auto max-w-7xl px-4 pb-16" id="pricing" aria-label="Products and pricing">
        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="pb-2"><CardTitle>Talent Snapshot™</CardTitle></CardHeader>
            <CardContent className="text-sm grid gap-2">
              <p>Pre‑recorded candidate introductions for fast, affordable screening.</p>
              <ul className="list-disc pl-4 text-muted-foreground">
                <li>20 = $200</li>
                <li>50 = $450</li>
                <li>100 = $800</li>
              </ul>
              <div className="text-[11px] text-muted-foreground">Pricing shown for 0–60k roles; multipliers apply for higher bands.</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="pb-2"><CardTitle>Talent DeepDive™</CardTitle></CardHeader>
            <CardContent className="text-sm grid gap-2">
              <p>Structured, recruiter‑led interviews recorded for review.</p>
              <ul className="list-disc pl-4 text-muted-foreground">
                <li>10 = $300</li>
                <li>20 = $550</li>
                <li>50 = $1,250</li>
              </ul>
              <div className="text-[11px] text-muted-foreground">Pricing shown for 0–60k roles; multipliers apply for higher bands.</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="pb-2"><CardTitle>Complete Talent Pack™</CardTitle></CardHeader>
            <CardContent className="text-sm grid gap-2">
              <p>Bundle of Snapshot™ + DeepDive™ for scale and depth.</p>
              <ul className="list-disc pl-4 text-muted-foreground">
                <li>Starter = $450 (20 raw + 10 live)</li>
                <li>Growth = $900 (50 raw + 20 live)</li>
                <li>Enterprise = $2,000 (100 raw + 50 live)</li>
              </ul>
              <div className="text-[11px] text-muted-foreground">Pricing shown for 0–60k roles; multipliers apply for higher bands.</div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-4">
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="pb-2"><CardTitle>Salary‑Based Multipliers</CardTitle></CardHeader>
            <CardContent className="text-sm">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl border bg-white/80 p-3"><div className="text-lg font-semibold">×1</div><div className="text-xs text-muted-foreground">0–60k</div></div>
                <div className="rounded-xl border bg-white/80 p-3"><div className="text-lg font-semibold">×2</div><div className="text-xs text-muted-foreground">60–120k</div></div>
                <div className="rounded-xl border bg-white/80 p-3"><div className="text-lg font-semibold">×3</div><div className="text-xs text-muted-foreground">120–300k</div></div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="pb-2"><CardTitle>Success Fee (per hire)</CardTitle></CardHeader>
            <CardContent className="text-sm">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl border bg-white/80 p-3"><div className="text-lg font-semibold">$500</div><div className="text-xs text-muted-foreground">0–60k</div></div>
                <div className="rounded-xl border bg-white/80 p-3"><div className="text-lg font-semibold">$2,000</div><div className="text-xs text-muted-foreground">60–120k</div></div>
                <div className="rounded-xl border bg-white/80 p-3"><div className="text-lg font-semibold">$6,000</div><div className="text-xs text-muted-foreground">120–300k</div></div>
              </div>
            </CardContent>
          </Card>

          <PricingEstimator />
        </div>
      </section>

      {/* PROOF */}
      <section className="mx-auto max-w-7xl px-4 py-16" id="proof" aria-label="Client testimonials">
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t,i)=> <Testimonial key={i} t={t} />)}
        </div>
        <div className="mt-10 flex items-center justify-center"><Button asChild size="lg"><a href="/case-studies">Explore Case Studies</a></Button></div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 pb-20" aria-label="Frequently asked questions">
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {q:"How fast can I see a shortlist?", a:"Typically within 5–7 business days for well‑scoped roles."},
            {q:"What regions do you cover?", a:"Primarily U.S. and GCC markets with partners in EU/UK as needed."},
            {q:"How do you screen candidates?", a:"Structured behavioral interviews, CRD/license checks, references, and book/client‑fit assessment."},
            {q:"Do you handle compliance?", a:"Yes—background, credentials, and broker‑dealer/RIA‑aligned vetting."},
          ].map((f)=> (
            <details key={f.q} className="rounded-xl border bg-white/80 p-4 shadow-sm">
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24">
        <Card className="border-0 shadow-2xl overflow-hidden rounded-2xl">
          <CardContent className="p-8 md:p-10 relative">
            <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="grid md:grid-cols-[1.2fr,0.8fr] gap-6 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Ready to meet a shortlist in 7 days?</h3>
                <p className="text-muted-foreground mt-2 max-w-prose">Let’s talk about the role, your book, and the client outcomes you need. We’ll bring data and a plan.</p>
              </div>
              <div className="flex gap-3 md:justify-end">
                <Button asChild size="lg"><a href="/contact" aria-label="Schedule a call">Schedule a Call</a></Button>
                <Button asChild size="lg" variant="outline"><a href="#pricing" aria-label="See pricing">See Pricing</a></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* SEO: JSON‑LD (Organization) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context":"https://schema.org","@type":"Organization","name":"Acumen Recruiting","url":"https://acumen-recruit.com","sameAs":[],"description":"Boutique recruiting for wealth management & financial services.","logo":"/logo.png"})}} />
    </div>
  );
}

/*
// ------------------- TESTS (Vitest + RTL) -------------------
// Copy into __tests__/Homepage2026.test.tsx
import { render, screen } from "@testing-library/react";
import React from "react";
import Homepage2026 from "../pages/Homepage2026";

describe("Homepage2026 Ultra", () => {
  it("renders hero and CTA", () => {
    render(<Homepage2026 />);
    expect(screen.getByText(/Signals‑Driven Sourcing/i)).toBeInTheDocument();
    expect(screen.getByText(/Book a 15‑min Discovery/i)).toBeInTheDocument();
  });
  it("shows KPI tiles, ROI widget and FAQ", () => {
    render(<Homepage2026 />);
    expect(screen.getByText(/Time‑to‑Shortlist/i)).toBeInTheDocument();
    expect(screen.getByText(/Hiring ROI Estimator/i)).toBeInTheDocument();
    expect(screen.getByText(/Frequently asked questions/i)).toBeInTheDocument();
  });
  it("estimates pricing with band multipliers", () => {
    render(<Homepage2026 />);
    expect(screen.getByText(/Pricing Estimator/i)).toBeInTheDocument();
  });
});
*/
