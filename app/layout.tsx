import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Metaphor Consulting | AI Automation & Digital Systems",
  description:
    "AI-powered websites, lead capture, booking automation, and business systems designed to save time and increase profit.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
