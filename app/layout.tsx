import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
import "./booking.css";

const bodyFont = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const headingFont = Manrope({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Metaphor Consulting | AI Automation & Digital Systems",
  description:
    "AI-powered websites, lead capture, booking automation, and business systems designed to save time and increase profit.",
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