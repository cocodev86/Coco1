"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MobileMenu.module.css";

export type MobileMenuLink = {
  label: string;
  href: string;
};

type MobileMenuProps = {
  links?: MobileMenuLink[];
  ctaHref?: string;
  ctaLabel?: string;
  menuId?: string;
};

const defaultLinks: MobileMenuLink[] = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Booking", href: "#booking" },
];

export default function MobileMenu({
  links = defaultLinks,
  ctaHref = "#booking",
  ctaLabel = "Book a strategy call",
  menuId = "mobile-navigation",
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return (
    <div className={styles.root}>
      <button
        ref={buttonRef}
        className={styles.button}
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <div
        ref={menuRef}
        id={menuId}
        className={`${styles.menu}${open ? ` ${styles.open}` : ""}`}
      >
        <nav aria-label="Mobile navigation">
          {links.map(({ label, href }) => (
            <a key={`${label}-${href}`} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a className={styles.cta} href={ctaHref} onClick={() => setOpen(false)}>
            {ctaLabel}
          </a>
        </nav>
      </div>
    </div>
  );
}
