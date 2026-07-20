import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { DM_Sans, Manrope } from "next/font/google";
import { brand } from "@/lib/brand";
import "./globals.css";
import "./booking.css";

const bodyFont = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const headingFont = Manrope({ subsets: ["latin"], variable: "--font-heading" });
const defaultTitle = "Metaphor Consulting | AI Automation & Digital Systems";

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: { default: defaultTitle, template: "%s | Metaphor Consulting" },
  applicationName: brand.displayName,
  description: brand.description,
  alternates: { canonical: "/" },
  manifest: brand.icons.manifest,
  icons: {
    icon: [
      { url: brand.icons.favicon, sizes: "any" },
      { url: brand.icons.faviconSvg, type: "image/svg+xml" },
      { url: "/brand/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: brand.icons.appleTouch, sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: brand.icons.safariPinnedTab }],
  },
  openGraph: {
    type: "website",
    title: defaultTitle,
    description: brand.description,
    url: "/",
    siteName: brand.shortName,
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${brand.shortName} — ${brand.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: brand.description,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "msapplication-TileColor": brand.colors.ink,
    "msapplication-config": "/brand/favicons/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: brand.colors.ivory },
    { media: "(prefers-color-scheme: dark)", color: brand.colors.ink },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
