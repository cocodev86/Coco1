import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { DM_Sans, Manrope } from "next/font/google";
import { BrandProvider } from "@/components/branding/BrandProvider";
import { brand } from "@/lib/branding";
import "./globals.css";
import "./booking.css";

const bodyFont = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const headingFont = Manrope({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: "Metaphor Automation Consulting | Intelligent Business Systems",
    template: "%s | Metaphor Automation Consulting",
  },
  description: brand.description,
  applicationName: brand.name,
  manifest: "/brand/favicons/site.webmanifest",
  icons: {
    icon: [{ url: "/brand/favicons/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/brand/favicons/favicon.svg",
    apple: "/brand/favicons/favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: brand.name,
    description: brand.description,
    url: brand.url,
    images: [{ url: brand.social.openGraph, width: 1200, height: 630, alt: brand.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.description,
    images: [brand.social.twitter],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: brand.colors.ivory },
    { media: "(prefers-color-scheme: dark)", color: brand.colors.ink },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body>
        <BrandProvider>{children}</BrandProvider>
        <Analytics />
      </body>
    </html>
  );
}
