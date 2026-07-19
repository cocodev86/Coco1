import Logo from "./Logo";
import styles from "./Logo.module.css";

export type BrandMarkVariant =
  | "symbolColor"
  | "symbolDark"
  | "symbolLight"
  | "symbolViolet"
  | "symbolOutline"
  | "symbolMicro"
  | "monogram";

type BrandMarkProps = {
  size?: number;
  variant?: BrandMarkVariant;
  className?: string;
  label?: string;
  decorative?: boolean;
};

export default function BrandMark({
  size = 32,
  variant = "symbolColor",
  className = "",
  label = "Metaphor",
  decorative = false,
}: BrandMarkProps) {
  return (
    <span className={`${styles.mark} ${className}`.trim()}>
      <Logo
        variant={variant}
        width={size}
        height={size}
        alt={label}
        decorative={decorative}
      />
    </span>
  );
}
