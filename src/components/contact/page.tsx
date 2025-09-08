"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Menu } from "lucide-react";

/** Lightweight sanity tests for the page (non-blocking in production) */
function runSanityTests() {
  try {
    if (typeof window === "undefined") return;
    const form = document.querySelector('form[data-testid="contact-form"]');
    const inputs = form?.querySelectorAll("input, textarea") ?? [];
    console.assert(!!form, "Contact form should render");
    console.assert(inputs.length >= 5, "Form should include all inputs");
  } catch (e) {
    console.warn("ContactPage sanity tests:", e);
  }
}

/** Local Header (self-contained to avoid cross-imports) */
function Header() {
  const [open, setOpen] = React.useState(false);
  const NAV = [
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Services", href: "/services" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Proof", href: "/#proof" },
    { label: "Contact", href: "/contact" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <a href="/" className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent">
          Acumen Recruiting
        </a>
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className="hover:text-indigo-600 transition">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow">
            Get Started
          </Button>
          <button aria-label="Open Menu" className="md:hidden" onClick={() => setOpen((s) => !s)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white shadow-lg border-t px-6 py-4 space-y-4" role="dialog" aria-label="Mobile Menu">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className="block text-gray-700 hover:text-indigo-600">
              {n.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

/** Local Footer */
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
              { label: "About", href: "/about" },
              { label: "Team", href: "/team" },
              { label: "Services", href: "/services" },
              { label: "How It Works", href: "/#how-it-works" },
              { label: "Pricing", href: "/#pricing" },
              { label: "Proof", href: "/#proof" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-amber-400 transition">
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
          <Button size="sm" className="mt-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg">
            Book Consultation
          </Button>
        </div>
      </div>
      <div className="mt-10 text-center text-xs text-gray-300">
        © {new Date().getFullYear()} Acumen Recruiting. All rights reserved.
      </div>
    </footer>
  );
}

/** Contact Page */
export default function Page() {
  React.useEffect(runSanityTests, []);

  type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    role: string;
    comp: string;
    message: string;
    consent: boolean;
    website?: string; // honeypot
  };

  const [data, setData] = React.useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    comp: "",
    message: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);

  function validate(d: FormData) {
    const e: Record<string, string> = {};
    if (!d.firstName.trim()) e.firstName = "Required";
    if (!d.lastName.trim()) e.lastName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = "Enter a valid email";
    if (!d.company.trim()) e.company = "Required";
    if (!d.role.trim()) e.role = "Required";
    if (!d.message.trim()) e.message = "Please add a short note";
    if (!d.consent) e.consent = "Please consent to be contacted";
    if (d.website && d.website.trim().length > 0) e.website = "Bot detected"; // honeypot
    return e;
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length === 0) {
      // TODO: Replace with your real API (e.g., /api/contact) or third-party form endpoint.
      console.log("Contact submission:", data);
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-gradient-to-b from-white via-indigo-50 to-white min-h-screen text-gray-900">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <section className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-3">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tell us about your role and timeline. We’ll confirm fit on a quick call and kick off within a week.
          </p>
        </section>

        {submitted ? (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Thanks — we’ll be in touch shortly.</h2>
            <p className="text-gray-600">
              Prefer email?{" "}
              <a className="underline" href="mailto:info@acumen-recruit.com">
                info@acumen-recruit.com
              </a>{" "}
              • +1 (555) 123-4567
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <form
              onSubmit={onSubmit}
              noValidate
              data-testid="contact-form"
              className="md:col-span-3 bg-white rounded-xl shadow p-6"
            >
              {/* Honeypot (hidden) */}
              <div className="hidden">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  value={data.website}
                  onChange={(e) => setData({ ...data, website: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium">
                    First name
                  </label>
                  <input
                    id="firstName"
                    autoComplete="given-name"
                    className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                    value={data.firstName}
                    onChange={(e) => setData({ ...data, firstName: e.target.value })}
                    required
                  />
                  {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    autoComplete="family-name"
                    className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                    value={data.lastName}
                    onChange={(e) => setData({ ...data, lastName: e.target.value })}
                    required
                  />
                  {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Work email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-600 text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium">
                    Company
                  </label>
                  <input
                    id="company"
                    className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring ${
                      errors.company ? "border-red-500" : "border-gray-300"
                    }`}
                    value={data.company}
                    onChange={(e) => setData({ ...data, company: e.target.value })}
                    required
                  />
                  {errors.company && <p className="text-red-600 text-xs mt-1">{errors.company}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="role" className="block text-sm font-medium">
                    Role you’re hiring
                  </label>
                  <input
                    id="role"
                    className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring ${
                      errors.role ? "border-red-500" : "border-gray-300"
                    }`}
                    value={data.role}
                    onChange={(e) => setData({ ...data, role: e.target.value })}
                    required
                  />
                  {errors.role && <p className="text-red-600 text-xs mt-1">{errors.role}</p>}
                </div>
                <div>
                  <label htmlFor="comp" className="block text-sm font-medium">
                    Estimated compensation
                  </label>
                  <select
                    id="comp"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring"
                    value={data.comp}
                    onChange={(e) => setData({ ...data, comp: e.target.value })}
                  >
                    <option value="">Select a range</option>
                    <option>0–60k</option>
                    <option>60k–120k</option>
                    <option>120k–300k</option>
                    <option>300k+</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="block text-sm font-medium">
                  What do you need?
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  value={data.message}
                  onChange={(e) => setData({ ...data, message: e.target.value })}
                  required
                />
                {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message}</p>}
              </div>

              <div className="mt-4 flex items-start gap-2">
                <input
                  id="consent"
                  type="checkbox"
                  className="mt-1"
                  checked={data.consent}
                  onChange={(e) => setData({ ...data, consent: e.target.checked })}
                  required
                />
                <label htmlFor="consent" className="text-sm text-gray-700">
                  I agree to be contacted about this inquiry and related services.
                </label>
              </div>
              {errors.consent && <p className="text-red-600 text-xs mt-1">{errors.consent}</p>}

              <div className="mt-6 flex gap-3">
                <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
                  Submit
                </Button>
                <a className="px-4 py-2 rounded-md border" href="mailto:info@acumen-recruit.com">
                  Email Us
                </a>
              </div>
            </form>

            <aside className="md:col-span-2">
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
                  <p className="text-sm text-gray-700">
                    Email:{" "}
                    <a className="underline" href="mailto:info@acumen-recruit.com">
                      info@acumen-recruit.com
                    </a>
                  </p>
                  <p className="text-sm text-gray-700">Phone: +1 (555) 123-4567</p>
                  <p className="text-sm text-gray-700">Hours: Mon–Fri, 9:00–18:00</p>
                  <div className="mt-4 h-56 w-full rounded-lg bg-gradient-to-br from-indigo-100 to-amber-100 flex items-center justify-center text-sm text-gray-600">
                    Map placeholder
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
