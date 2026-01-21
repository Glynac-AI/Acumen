// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CookieConsent from "@/components/ui/CookieConsent";

export const metadata: Metadata = {
  title: "Acumen Strategy - Modern Compliance Solutions for Wealth Management",
  description: "Software, products, and services designed to help wealth management firms navigate compliance requirements and scale their operations.",
  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FSZ476K9KS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FSZ476K9KS');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}