import Link from "next/link";
import type { DocCategory } from "@/lib/docs";
import { getCategoryDocs } from "@/lib/docs";
import styles from "./docs.module.css";

export default function CategoryPage({ category }: { category: DocCategory }) {
  const docs = getCategoryDocs(category.slug);
  const manual = getCategoryDocs(category.slug, true).find((doc) => doc.isFullManual);
  return (
    <div className={styles.categoryPage}>
      <header className={styles.categoryHero}><p className={styles.kicker}>{category.code} document family</p><h1>{category.title}</h1><p>{category.description}</p><div><span>{docs.length} {docs.length === 1 ? "document" : "documents"}</span>{manual && <Link href={manual.href}>View complete source manual →</Link>}</div></header>
      <section className={styles.documentList} aria-labelledby="category-documents"><h2 id="category-documents">Documents</h2>{docs.map((doc, index) => <Link href={doc.href} key={doc.href}><span>{String(index + 1).padStart(2, "0")}</span><div>{doc.metadata.documentId && <small>{doc.metadata.documentId}</small>}<strong>{doc.title.replace(/^\w+-\d{4}\s+[—-]\s+/, "")}</strong><p>{doc.bodyText.slice(0, 170)}…</p></div><b aria-hidden="true">→</b></Link>)}</section>
    </div>
  );
}
