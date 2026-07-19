import Image from "next/image";
import { brand, type BrandLogoVariant } from "@/lib/branding";

type LogoProps = {
  variant?: BrandLogoVariant;
  width?: number;
  height?: number;
  size?: number;
  priority?: boolean;
  className?: string;
  alt?: string;
  theme?: "light" | "dark" | "auto";
  animated?: boolean;
};

const defaultDimensions: Record<BrandLogoVariant, [number, number]> = {
  primary: [290, 72],
  horizontal: [260, 58],
  vertical: [180, 150],
  wordmark: [220, 42],
  icon: [52, 52],
  monogram: [52, 52],
  outline: [52, 52],
  filled: [52, 52],
  light: [260, 58],
  dark: [260, 58],
  mono: [260, 58],
};

export default function Logo({
  variant = "horizontal",
  width,
  height,
  size,
  priority = false,
  className = "",
  alt = "Metaphor Automation Consulting",
  theme = "auto",
  animated = false,
}: LogoProps) {
  const resolvedVariant = theme === "dark" && variant === "horizontal"
    ? "light"
    : theme === "light" && variant === "horizontal"
      ? "dark"
      : variant;
  const [defaultWidth, defaultHeight] = defaultDimensions[resolvedVariant];
  const resolvedWidth = size ?? width ?? defaultWidth;
  const resolvedHeight = size ?? height ?? defaultHeight;

  return (
    <Image
      src={brand.logos[resolvedVariant]}
      width={resolvedWidth}
      height={resolvedHeight}
      priority={priority}
      alt={alt}
      className={`${animated ? "brand-logo--animated" : ""} ${className}`.trim()}
      style={{ width: resolvedWidth, height: "auto" }}
    />
  );
}
