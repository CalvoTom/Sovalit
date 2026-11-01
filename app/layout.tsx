import type { Metadata, Viewport } from "next";
import { Montserrat, Sora } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-sora", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-montserrat", display: "swap" });

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

export const viewport: Viewport = { themeColor: "#0079e0" };

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
    <html lang="fr" className={`${sora.variable} ${montserrat.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-electrik focus:px-5 focus:py-3 focus:text-white">
          Aller au contenu
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
