"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./docs.module.css";

type SidebarCategory = {
  slug: string;
  code: string;
  title: string;
  docs: { href: string; title: string; documentId?: string }[];
};

export default function DocsSidebar({ categories }: { categories: SidebarCategory[] }) {
  const pathname = usePathname();

  return (
    <nav className={styles.navTree} aria-label="Documentation navigation">
      <Link className={pathname === "/docs" ? styles.active : styles.navHome} href="/docs">Documentation home</Link>
      {categories.map((category) => {
        const activeCategory = pathname === `/docs/${category.slug}` || pathname.startsWith(`/docs/${category.slug}/`);
        return (
          <details className={styles.navGroup} key={category.slug} open={activeCategory}>
            <summary><span>{category.code}</span>{category.title}</summary>
            <div>
              <Link className={pathname === `/docs/${category.slug}` ? styles.active : undefined} href={`/docs/${category.slug}`}>Category overview</Link>
              {category.docs.map((doc) => (
                <Link className={pathname === doc.href ? styles.active : undefined} href={doc.href} key={doc.href}>
                  {doc.documentId && <small>{doc.documentId}</small>}{doc.title}
                </Link>
              ))}
            </div>
          </details>
        );
      })}
      <Link className={pathname === "/docs/contributing" ? styles.active : styles.contributingLink} href="/docs/contributing">Contributor guidance</Link>
    </nav>
  );
}
