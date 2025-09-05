import * as React from "react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Shield,
  Users2,
  LineChart,
  Rocket,
  CheckCircle2,
} from "lucide-react";

/**
 * Single-page 2026 Landing for Acumen Recruiting
 * - No external animation libs; responsive; a11y-first
 * - Sections: Hero, Proven Track Record, Candidate DB, Process,
 *   Products & Pricing, Salary Multipliers, Success Fee, Estimator, CTA.
 */

// ---------- Helpers (no motion libs) ----------
function StatCard({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <Card className="border-0 bg-white/80 shadow-sm rounded-2xl">
      <CardContent className="p-5 text-center">
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <li className="rounded-2xl border bg-white/80 p-6 shadow-sm">
      <div className="text-xs text-muted-foreground">{number}</div>
      <div className="font-medium mt-1">{title}</div>
      <p className="text-sm text-muted-foreground mt-1 leading-6">{text}</p>
    </li>
  );
}

// ---------- Pricing data ----------
type BandKey = "0-60" | "60-120" | "120-300";
const bandMultiplier: Record<BandKey, number> = {
  "0-60": 1,
  "60-120": 2,
  "120-300": 3,
};
const successFee: Record<BandKey, number> = {
  "0-60": 500,
  "60-120": 2000,
  "120-300": 6000,
};
const snapshotPrices = { 20: 200, 50: 450, 100: 800 } as const; // base @ 0–60k
const deepdivePrices = { 10: 300, 20: 550, 50: 1250 } as const; // base @ 0–60k
const bundlePrices = { Starter: 450, Growth: 900, Enterprise: 2000 } as const; // base @ 0–60k
type ProductType = "Snapshot" | "DeepDive" | "Bundle";
type Selection = { product: ProductType; tierKey: string };

// ---------- Components ----------
function PricingEstimator() {
  const [band, setBand] = useState<BandKey>("0-60");
  const [sel, setSel] = useState<Selection>({
    product: "Snapshot",
    tierKey: "20",
  });
  const [hires, setHires] = useState<number>(1);

  const base = useMemo(() => {
    if (sel.product === "Snapshot")
      return snapshotPrices[Number(sel.tierKey) as 20 | 50 | 100];
    if (sel.product === "DeepDive")
      return deepdivePrices[Number(sel.tierKey) as 10 | 20 | 50];
    return bundlePrices[sel.tierKey as keyof typeof bundlePrices];
  }, [sel]);

  const price = Math.round(base * bandMultiplier[band]);
  const fee = successFee[band] * Math.max(0, hires || 0);
  const total = price + fee;

  const changeProduct = (p: ProductType) => {
    const nextSel: Selection =
      p === "Snapshot"
        ? { product: p, tierKey: "20" }
        : p === "DeepDive"
        ? { product: p, tierKey: "10" }
        : { product: p, tierKey: "Starter" };
    setSel(nextSel);
  };

  return (
    <Card className="border-0 shadow-xl rounded-2xl" aria-label="Pricing Estimator">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Pricing Estimator</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 text-sm">
        {/* Salary Band */}
        <div>
          <div className="mb-2 text-xs text-muted-foreground">Compensation Band</div>
          <div className="flex flex-wrap gap-2">
            {(["0-60", "60-120", "120-300"] as BandKey[]).map((b) => (
              <button
                key={b}
                onClick={() => setBand(b)}
                className={`rounded-full border px-3 py-1 ${
                  band === b ? "bg-sky-600 text-white border-sky-600" : "bg-white/80"
                }`}
                aria-pressed={band === b}
              >
                {b}k
              </button>
            ))}
          </div>
        </div>

        {/* Product & Tier */}
        <div className="grid md:grid-cols-2 gap-3">
          <label>
            <span className="text-xs text-muted-foreground">Product</span>
            <select
              className="mt-1 w-full rounded-md border px-3 py-2 bg-white/80"
              value={sel.product}
              onChange={(e) => changeProduct(e.target.value as ProductType)}
            >
              <option>Snapshot</option>
              <option>DeepDive</option>
              <option>Bundle</option>
            </select>
          </label>

          <label>
            <span className="text-xs text-muted-foreground">Tier</span>
            {sel.product === "Snapshot" && (
              <select
                className="mt-1 w-full rounded-md border px-3 py-2 bg-white/80"
                value={sel.tierKey}
                onChange={(e) => setSel({ ...sel, tierKey: e.target.value })}
              >
                <option value="20">20 videos</option>
                <option value="50">50 videos</option>
                <option value="100">100 videos</option>
              </select>
            )}
            {sel.product === "DeepDive" && (
              <select
                className="mt-1 w-full rounded-md border px-3 py-2 bg-white/80"
                value={sel.tierKey}
                onChange={(e) => setSel({ ...sel, tierKey: e.target.value })}
              >
                <option value="10">10 interviews</option>
                <option value="20">20 interviews</option>
                <option value="50">50 interviews</option>
              </select>
            )}
            {sel.product === "Bundle" && (
              <select
                className="mt-1 w-full rounded-md border px-3 py-2 bg-white/80"
                value={sel.tierKey}
                onChange={(e) => setSel({ ...sel, tierKey: e.target.value })}
              >
                <option>Starter</option>
                <option>Growth</option>
                <option>Enterprise</option>
              </select>
            )}
          </label>
        </div>

        {/* Hires */}
        <label>
          <span className="text-xs text-muted-foreground">
            Expected # of hires (for success fee)
          </span>
          <Input
            type="number"
            inputMode="numeric"
            value={hires}
            onChange={(e) => setHires(Number(e.target.value || 0))}
            className="mt-1"
          />
        </label>

        {/* Output */}
        <div className="grid md:grid-cols-3 gap-3">
          <div className="rounded-xl border bg-white/80 p-3">
            <div className="text-xs text-muted-foreground">Product Price</div>
            <div className="text-xl font-bold">${price.toLocaleString()}</div>
            <div className="text-[11px] text-muted-foreground">
              Band multiplier ×{bandMultiplier[band]}
            </div>
          </div>
          <div className="rounded-xl border bg-white/80 p-3">
            <div className="text-xs text-muted-foreground">Success Fee</div>
            <div className="text-xl font-bold">${fee.toLocaleString()}</div>
            <div className="text-[11px] text-muted-foreground">
              ${successFee[band].toLocaleString()} per hire
            </div>
          </div>
          <div className="rounded-xl border bg-white/80 p-3">
            <div className="text-xs text-muted-foreground">Estimated Total</div>
            <div className="text-xl font-bold">${total.toLocaleString()}</div>
            <div className="text-[11px] text-muted-foreground">
              Taxes/discounts excluded
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ROIWidget() {
  const [salary, setSalary] = useState<number>(140000);
  const [daysSaved, setDaysSaved] = useState<number>(30);
  const [revenuePerDay, setRevenuePerDay] = useState<number>(2500);

  const savings = useMemo(() => {
    const speed = daysSaved * revenuePerDay;
    const feeDelta = salary * 0.1; // illustrative
    return Math.max(0, Math.round(speed + feeDelta));
  }, [salary, daysSaved, revenuePerDay]);

  return (
    <Card className="border-0 shadow-xl bg-white/90 rounded-2xl" aria-label="Hiring ROI Estimator">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Hiring ROI Estimator</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-muted-foreground">
            Base Salary ($)
            <Input
              type="number"
              inputMode="numeric"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value || 0))}
              className="mt-1"
            />
          </label>
          <label className="text-xs text-muted-foreground">
            Days Saved
            <Input
              type="number"
              inputMode="numeric"
              value={daysSaved}
              onChange={(e) => setDaysSaved(Number(e.target.value || 0))}
              className="mt-1"
            />
          </label>
          <label className="text-xs text-muted-foreground col-span-2">
            Revenue Impact / Day ($)
            <Input
              type="number"
              inputMode="numeric"
              value={revenuePerDay}
              onChange={(e) => setRevenuePerDay(Number(e.target.value || 0))}
              className="mt-1"
            />
          </label>
        </div>
        <div className="rounded-xl border bg-white/80 p-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Estimated Savings</p>
            <p className="text-2xl font-bold tracking-tight">
              ${savings.toLocaleString()}
            </p>
          </div>
          <Badge className="text-xs" variant="secondary">
            Model: speed + fee delta
          </Badge>
        </div>
        <Button size="sm" className="w-full">
          Discuss Your Numbers <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

// ---------- Page ----------
export default function Landing() {
  return (
    <div className="min-h-screen bg-[radial-gradient(60%_50%_at_20%_10%,rgba(14,165,233,0.18),transparent),radial-gradient(60%_50%_at_80%_0%,rgba(59,130,246,0.15),transparent)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:m-3 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:shadow"
      >
        Skip to content
      </a>

      {/* HERO */}
      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[560px] w-[1600px] rounded-full bg-gradient-to-r from-sky-400/25 via-cyan-300/20 to-blue-400/25 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pt-10 pb-14 grid gap-10 md:grid-cols-[1.1fr,0.9fr] items-start">
          <div>
            <Badge variant="secondary" className="mb-4">
              Acumen Recruiting (acumen-recruit.com)
            </Badge>
            <h1 className="text-5xl/tight md:text-7xl/tight font-extrabold tracking-tight">
              Signals-Driven Sourcing{" "}
              <span className="bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
                Human-First Screening
              </span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl">
              We combine efficient technology with human insight to deliver
              candidates who are screened, local, and relevant — at a fraction
              of traditional recruiting costs.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" aria-label="Book a 15-min Discovery">
                <a href="/contact">
                  Book a 15-min Discovery <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" aria-label="See Pricing & Process">
                <a href="#pricing">See Pricing & Process</a>
              </Button>
            </div>
            <div className="mt-6 text-sm text-muted-foreground">
              <CheckCircle2 className="inline mr-2 h-4 w-4 text-sky-600" />
              Trusted by RIA and private-bank teams in multiple U.S. and GCC markets.
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4" aria-label="Key performance metrics">
              <StatCard value="5–7 days" label="Time-to-Shortlist" />
              <StatCard value="78%" label="Qualified Interview Rate" />
              <StatCard value="42%" label="Average Cost Savings" />
              <StatCard value="9/10" label="Local Placement Ratio" />
            </div>
            <ROIWidget />
          </div>
        </div>
      </section>

      {/* PROVEN TRACK RECORD */}
      <section className="mx-auto max-w-7xl px-4" aria-label="Proven track record">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard value="30+" label="Wealth Managers" />
          <StatCard value="20" label="Licensed Financial Planners" />
          <StatCard value="8" label="Tax Advisors" />
          <StatCard value="15" label="Estate Planning Specialists" />
          <StatCard value="5" label="Compliance Officers" />
          <StatCard value="100s" label="Support Hires" />
        </div>
      </section>

      {/* CANDIDATE DATABASE */}
      <section className="mx-auto max-w-7xl px-4 py-12" aria-label="Candidate database">
        <Card className="border-0 shadow-xl rounded-2xl bg-white/85">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">Candidate Database (Pre-Screened 2,000)</h2>
            <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-sm">
              <StatCard value={500} label="Wealth Managers / Advisors" />
              <StatCard value={200} label="Licensed Financial Planners" />
              <StatCard value={150} label="Tax Advisors & Accountants" />
              <StatCard value={100} label="Estate Planning Specialists" />
              <StatCard value={75} label="Compliance Officers" />
              <StatCard value={975} label="Support Staff (Client, Ops, Mktg, Admin)" />
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              ⚠️ We launch fresh recruiting for every engagement to ensure candidates are local and role-appropriate.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* WHY ACUMEN */}
      <section className="mx-auto max-w-7xl px-4 py-12" aria-label="Why Acumen">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <Badge variant="secondary">Why Acumen</Badge>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              Less Noise. Higher Signal. Faster Hires.
            </h2>
            <p className="mt-3 text-muted-foreground max-w-prose">
              We blend wealth-tech data with senior recruiters who understand advisor
              books, client promises, and compliance realities. The result is a shortlist you can act on.
            </p>
            <div className="mt-6 grid gap-3">
              <Card className="border-0 shadow-md rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-sky-600">
                    <div className="rounded-xl bg-sky-50 p-2"><Shield className="h-5 w-5" /></div>
                    <h3 className="font-semibold text-lg">Compliance-Ready Vetting</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-6">
                    Background & credential checks aligned to broker-dealer and RIA standards.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-sky-600">
                    <div className="rounded-xl bg-sky-50 p-2"><LineChart className="h-5 w-5" /></div>
                    <h3 className="font-semibold text-lg">Signals-Driven Sourcing</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-6">
                    Wealth-tech data and market signals to surface passive advisors at the right moment.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-sky-600">
                    <div className="rounded-xl bg-sky-50 p-2"><Users2 className="h-5 w-5" /></div>
                    <h3 className="font-semibold text-lg">Human-Centric Screening</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-6">
                    Behavioral interviews that de-risk client fit: book, values, and client experience.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-sky-600">
                    <div className="rounded-xl bg-sky-50 p-2"><Rocket className="h-5 w-5" /></div>
                    <h3 className="font-semibold text-lg">Speed Without Noise</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-6">
                    Shortlists of 3–5 highly viable candidates — not inbox-flooding.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Simple visual panel for roles */}
          <Card className="border-0 shadow-xl bg-gradient-to-b from-white/80 to-white/60 rounded-2xl" aria-label="Roles we fill">
            <CardContent className="p-6">
              <div className="font-semibold text-sky-700">Roles We Fill</div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                {[
                  "Financial Advisor",
                  "Private Banker",
                  "Client Service",
                  "Ops Lead",
                  "Trader",
                  "Compliance",
                  "Portfolio Analyst",
                  "Wealth Tech",
                ].map((r) => (
                  <span key={r} className="rounded-full border px-3 py-1 bg-white/80">
                    {r}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-4 w-4" />
                Background checks, references, and credentials handled.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* PROCESS */}
      <section id="main" className="mx-auto max-w-7xl px-4 py-12" aria-label="How it works">
        <div className="text-center">
          <Badge variant="secondary">How It Works</Badge>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
            A Crisp, Five-Step Process
          </h2>
        </div>
        <ol className="mt-8 grid gap-4 md:grid-cols-5">
          <Step number="01" title="Screening Call with Account Manager" text="We understand your role, comp, location, and success criteria. If we believe we can help, we proceed." />
          <Step number="02" title="Plan Purchase & Kickoff" text="Recruiting begins within 1 week. We finalize Talent Snapshot™ & DeepDive™ questions." />
          <Step number="03" title="Candidate Video Delivery" text="Videos + resumes delivered in your client portal with email alerts." />
          <Step number="04" title="Feedback Loop" text="After the first 3 videos, we review with you and refine questions for fit." />
          <Step number="05" title="Ongoing Recruiting & Updates" text="Continuous candidate flow until your plan is fulfilled; track everything online." />
        </ol>
      </section>

      {/* PRODUCTS & PRICING */}
      <section className="mx-auto max-w-7xl px-4 py-12" id="pricing" aria-label="Products and pricing">
        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle>Talent Snapshot™</CardTitle>
            </CardHeader>
            <CardContent className="text-sm grid gap-2">
              <p>Pre-recorded introductions for fast, affordable screening.</p>
              <ul className="list-disc pl-4 text-muted-foreground">
                <li>20 = $200</li>
                <li>50 = $450</li>
                <li>100 = $800</li>
              </ul>
              <div className="text-[11px] text-muted-foreground">
                Pricing shown for 0–60k roles; multipliers apply for higher bands.
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle>Talent DeepDive™</CardTitle>
            </CardHeader>
            <CardContent className="text-sm grid gap-2">
              <p>Recruiter-led, structured interviews recorded for review.</p>
              <ul className="list-disc pl-4 text-muted-foreground">
                <li>10 = $300</li>
                <li>20 = $550</li>
                <li>50 = $1,250</li>
              </ul>
              <div className="text-[11px] text-muted-foreground">
                Pricing shown for 0–60k roles; multipliers apply for higher bands.
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle>Complete Talent Pack™</CardTitle>
            </CardHeader>
            <CardContent className="text-sm grid gap-2">
              <p>Bundle of Snapshot™ + DeepDive™ for scale and depth.</p>
              <ul className="list-disc pl-4 text-muted-foreground">
                <li>Starter = $450 (20 raw + 10 live)</li>
                <li>Growth = $900 (50 raw + 20 live)</li>
                <li>Enterprise = $2,000 (100 raw + 50 live)</li>
              </ul>
              <div className="text-[11px] text-muted-foreground">
                Pricing shown for 0–60k roles; multipliers apply for higher bands.
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-4">
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle>Salary-Based Multipliers</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="grid grid-cols-3 gap-2 text-center">
                <StatCard value="×1" label="0–60k" />
                <StatCard value="×2" label="60–120k" />
                <StatCard value="×3" label="120–300k" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle>Success Fee (per hire)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="grid grid-cols-3 gap-2 text-center">
                <StatCard value="$500" label="0–60k" />
                <StatCard value="$2,000" label="60–120k" />
                <StatCard value="$6,000" label="120–300k" />
              </div>
            </CardContent>
          </Card>

          <PricingEstimator />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24">
        <Card className="border-0 shadow-2xl overflow-hidden rounded-2xl">
          <CardContent className="p-8 md:p-10 relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl"
            />
            <div className="grid md:grid-cols-[1.2fr,0.8fr] gap-6 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Ready to meet a shortlist in 7 days?
                </h3>
                <p className="text-muted-foreground mt-2 max-w-prose">
                  Let’s talk about the role, your book, and the client outcomes you need.
                  We’ll bring data and a plan.
                </p>
              </div>
              <div className="flex gap-3 md:justify-end">
                <Button asChild size="lg">
                  <a href="/contact" aria-label="Schedule a call">
                    Schedule a Call
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#pricing" aria-label="See pricing">
                    See Pricing
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* SEO: Organization JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Acumen Recruiting",
            url: "https://acumen-recruit.com",
            description:
              "Boutique recruiting for wealth management & financial services.",
            logo: "/logo.png",
          }),
        }}
      />
    </div>
  );
}
