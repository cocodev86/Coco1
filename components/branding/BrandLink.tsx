import Link from "next/link";
import type { ComponentProps } from "react";
import { brand, type BrandLogoVariant } from "@/lib/brand";
import Logo from "./Logo";
import styles from "./Logo.module.css";

type BrandLinkProps = Omit<ComponentProps<typeof Link>, "children"> & {
  variant?: BrandLogoVariant;
  logoWidth?: number;
  priority?: boolean;
  label?: string;
};

export default function BrandLink({
  variant = "compactDark",
  logoWidth = 176,
  priority = false,
  label = `${brand.shortName} home`,
  className = "",
  ...linkProps
}: BrandLinkProps) {
  return (
    <Link
      {...linkProps}
      aria-label={label}
      className={`${styles.link} ${className}`.trim()}
    >
      <Logo variant={variant} width={logoWidth} priority={priority} decorative />
    </Link>
  );
}
