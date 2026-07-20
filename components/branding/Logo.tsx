import Image from "next/image";
import { brand, type BrandLogoVariant } from "@/lib/brand";
import styles from "./Logo.module.css";

const dimensions: Record<BrandLogoVariant, readonly [number, number]> = {
  horizontalDark: [720, 128],
  horizontalLight: [720, 128],
  horizontalMonoDark: [720, 128],
  horizontalMonoLight: [720, 128],
  stackedDark: [600, 290],
  stackedLight: [600, 290],
  compactDark: [720, 128],
  compactLight: [720, 128],
  wordmarkDark: [560, 105],
  wordmarkLight: [560, 105],
  wordmarkMono: [560, 105],
  symbolColor: [128, 128],
  symbolDark: [128, 128],
  symbolLight: [128, 128],
  symbolViolet: [128, 128],
  symbolOutline: [128, 128],
  symbolMicro: [128, 128],
  monogram: [128, 128],
};

type LogoProps = {
  variant?: BrandLogoVariant;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  alt?: string;
  decorative?: boolean;
};

export default function Logo({
  variant = "horizontalDark",
  width,
  height,
  priority = false,
  className = "",
  alt = brand.displayName,
  decorative = false,
}: LogoProps) {
  const [sourceWidth, sourceHeight] = dimensions[variant];
  const resolvedWidth = width ?? sourceWidth;
  const resolvedHeight = height ?? Math.round((resolvedWidth / sourceWidth) * sourceHeight);

  return (
    <Image
      src={brand.logos[variant]}
      width={resolvedWidth}
      height={resolvedHeight}
      priority={priority}
      alt={decorative ? "" : alt}
      aria-hidden={decorative || undefined}
      className={`${styles.logo} ${className}`.trim()}
      sizes={`${resolvedWidth}px`}
      draggable={false}
    />
  );
}
