"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./docs.module.css";

type Navigation = Array<{
  slug: string;
  code: string;
  title: string;
  documents: Array<{ href: string; title: string; id?: string }>;
}>;

export default function DocsSidebar({ navigation, mobile = false }: { navigation: Navigation; mobile?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const content = (
    <nav className={styles.navTree} aria-label="Documentation navigation">
      <Link className={`${styles.navHome} ${pathname === "/docs" ? styles.active : ""}`} href="/docs" onClick={() => setOpen(false)}>Overview</Link>
      {navigation.map((category) => (
        <details className={styles.navGroup} key={category.slug} open={pathname.includes(`/docs/${category.slug}`)}>
          <summary><span>{category.code}</span>{category.title}</summary>
          <div>
            <Link className={pathname === `/docs/${category.slug}` ? styles.active : ""} href={`/docs/${category.slug}`} onClick={() => setOpen(false)}>Category overview</Link>
            {category.documents.map((doc) => (
              <Link className={pathname === doc.href ? styles.active : ""} href={doc.href} key={doc.href} onClick={() => setOpen(false)}>
                {doc.id && <small>{doc.id}</small>}{doc.title.replace(/^\w+-\d{4}\s+[—-]\s+/, "")}
              </Link>
            ))}
          </div>
        </details>
      ))}
      <Link className={`${styles.contributingLink} ${pathname === "/docs/contributing" ? styles.active : ""}`} href="/docs/contributing" onClick={() => setOpen(false)}>Contributor guide</Link>
    </nav>
  );

  if (!mobile) return content;
  return (
    <>
      <button className={styles.mobileNavButton} type="button" aria-expanded={open} aria-controls="mobile-docs-nav" onClick={() => setOpen((value) => !value)}>
        <span>Browse documentation</span><b aria-hidden="true">{open ? "×" : "☰"}</b>
      </button>
      {open && <div className={styles.mobileNavPanel} id="mobile-docs-nav">{content}</div>}
    </>
  );
}
