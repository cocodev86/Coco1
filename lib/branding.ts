export const brand = {
  name: "Metaphor Automation Consulting",
  shortName: "Metaphor",
  tagline: "Intelligent Systems. Automated Results.",
  description:
    "AI automation consulting, intelligent websites, lead capture, booking systems, and connected business operations for growing companies.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://metaphor.dev",
  colors: {
    ink: "#0D0D14",
    graphite: "#1F2229",
    violet: "#6C4CFF",
    lime: "#B7FF2A",
    ivory: "#F7F6F2",
  },
  logos: {
    primary: "/brand/logos/metaphor-primary.svg",
    horizontal: "/brand/logos/metaphor-horizontal.svg",
    vertical: "/brand/logos/metaphor-primary.svg",
    wordmark: "/brand/logos/metaphor-wordmark.svg",
    icon: "/brand/logos/metaphor-icon.svg",
    monogram: "/brand/logos/metaphor-monogram.svg",
    outline: "/brand/logos/metaphor-outline.svg",
    filled: "/brand/logos/metaphor-filled.svg",
    light: "/brand/logos/metaphor-light.svg",
    dark: "/brand/logos/metaphor-dark.svg",
    mono: "/brand/logos/metaphor-filled.svg",
  },
  social: {
    openGraph: "/brand/logos/metaphor-primary.svg",
    twitter: "/brand/logos/metaphor-primary.svg",
  },
} as const;

export type BrandLogoVariant = keyof typeof brand.logos;
