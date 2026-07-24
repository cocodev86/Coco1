import Link from "next/link";
import BrandLink from "@/components/branding/BrandLink";
import { DOC_CATEGORIES, getCategoryDocs, getCategoryManual, getSearchIndex } from "@/lib/docs";
import DocsSearch from "./DocsSearch";
import DocsSidebar from "./DocsSidebar";
import styles from "./docs.module.css";

export default function DocsShell({ children }: { children: React.ReactNode }) {
  const categories = DOC_CATEGORIES.map((category) => {
    const manual = getCategoryManual(category.slug);
    return {
      ...category,
      manual: manual
        ? { href: manual.href, title: manual.title, documentId: manual.metadata.documentId }
        : undefined,
      docs: getCategoryDocs(category.slug).map((doc) => ({
        href: doc.href,
        title: doc.title,
        documentId: doc.metadata.documentId,
      })),
    };
  });

  return (
    <div className={styles.portal}>
      <a className={styles.skipLink} href="#documentation-content">Skip to documentation</a>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <BrandLink className={styles.brand} href="/" variant="compactDark" logoWidth={174} priority />
          <DocsSearch records={getSearchIndex()} />
          <div className={styles.headerLinks}><Link href="/">Main site</Link><Link href="/blog">Insights</Link></div>
        </div>
      </header>
      <div className={styles.mobileNav}><details><summary>Browse documentation</summary><DocsSidebar categories={categories} /></details></div>
      <div className={styles.shell}>
        <aside className={styles.sidebar}><DocsSidebar categories={categories} /></aside>
        <main className={styles.main} id="documentation-content">{children}</main>
      </div>
    </div>
  );
}
