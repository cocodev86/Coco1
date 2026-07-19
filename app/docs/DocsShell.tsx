import Link from "next/link";
import type { ReactNode } from "react";
import { DOC_CATEGORIES, getAllDocs, getSearchIndex } from "@/lib/docs";
import DocsSidebar from "./DocsSidebar";
import DocsSearch from "./DocsSearch";
import styles from "./docs.module.css";

export default function DocsShell({ children }: { children: ReactNode }) {
  const docs = getAllDocs();
  const navigation = DOC_CATEGORIES.map((category) => ({
    ...category,
    documents: docs
      .filter((doc) => doc.category?.slug === category.slug && !doc.isFullManual)
      .map((doc) => ({ href: doc.href, title: doc.title, id: doc.metadata.documentId })),
  }));

  return (
    <div className={styles.portal}>
      <a className={styles.skipLink} href="#docs-content">Skip to documentation</a>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <Link className={styles.brand} href="/" aria-label="Metaphor Consulting home">
            <span>M</span><strong>Metaphor</strong><small>Operating System</small>
          </Link>
          <DocsSearch records={getSearchIndex()} />
          <nav className={styles.headerLinks} aria-label="Documentation utilities">
            <Link href="/docs">Docs home</Link>
            <a href="https://github.com/cocodev86/Coco1/tree/main/docs">GitHub</a>
          </nav>
        </div>
      </header>
      <div className={styles.mobileNav}><DocsSidebar navigation={navigation} mobile /></div>
      <div className={styles.shell}>
        <aside className={styles.sidebar}><DocsSidebar navigation={navigation} /></aside>
        <main className={styles.main} id="docs-content">{children}</main>
      </div>
    </div>
  );
}
