import Logo from "./Logo";

type BrandIconProps = {
  size?: number;
  className?: string;
  label?: string;
  variant?: "icon" | "monogram" | "outline" | "filled";
};

export default function BrandIcon({
  size = 32,
  className,
  label = "Metaphor",
  variant = "icon",
}: BrandIconProps) {
  return <Logo variant={variant} size={size} className={className} alt={label} />;
}
