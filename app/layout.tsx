import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "@fontsource-variable/hanken-grotesk";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SmoothAnchors } from "@/components/smooth-anchors";
import { site } from "@/lib/site";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sora", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s — Sovalit" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: site.name,
    title: "Sovalit — Le digital qui fait grandir votre entreprise",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description: site.description,
  areaServed: "FR",
  knowsAbout: ["Développement web", "Applications mobiles", "Outils internes", "Data science", "Machine learning", "Intelligence artificielle"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={sora.variable}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white">
          Aller au contenu
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
        <SmoothAnchors />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
