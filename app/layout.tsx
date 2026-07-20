import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { DM_Sans, Manrope } from "next/font/google";
import { brand } from "@/lib/brand";
import "./globals.css";
import "./booking.css";

const bodyFont = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const headingFont = Manrope({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Metaphor Consulting | AI Automation & Digital Systems",
  description:
    "AI-powered websites, lead capture, booking automation, and business systems designed to save time and increase profit.",
  manifest: brand.icons.manifest,
  icons: {
    icon: [
      { url: brand.icons.favicon, sizes: "any" },
      { url: brand.icons.faviconSvg, type: "image/svg+xml" },
      { url: "/brand/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: brand.icons.appleTouch, sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: brand.icons.safariPinnedTab,
      },
    ],
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
