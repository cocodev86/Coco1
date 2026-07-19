import Link from "next/link";
import { DOC_CATEGORIES, getAllDocs } from "@/lib/docs";
import styles from "./docs.module.css";

const readingOrder = [
  ["MOS-0005", "Company Constitution"],
  ["MOS-0002", "Architecture Principles"],
  ["MOS-0003", "Engineering Standards"],
  ["MPB-0001", "Company Operating Manual"],
  ["MCO-0001", "Client Experience Standard"],
] as const;

export default function DocsHome() {
  const docs = getAllDocs().filter((doc) => !doc.isFullManual);
  const quickLinks = readingOrder.map(([id, fallback]) => docs.find((doc) => doc.metadata.documentId === id) || { href: "/docs", title: fallback, metadata: { documentId: id } });
  return (
    <div className={styles.home}>
      <section className={styles.homeHero}>
        <p className={styles.kicker}>Company knowledge base · Version controlled</p>
        <h1>The operating system for how Metaphor thinks, builds, and delivers.</h1>
        <p>One source of truth for company standards, operating playbooks, client experience, platform architecture, strategy, and reusable delivery templates.</p>
        <div className={styles.heroActions}><a className={styles.primaryButton} href="#categories">Explore documentation</a><Link href="/docs/contributing">Add a document →</Link></div>
        <dl className={styles.stats}><div><dt>Document units</dt><dd>{docs.length}</dd></div><div><dt>Families</dt><dd>{DOC_CATEGORIES.length}</dd></div><div><dt>Source format</dt><dd>Markdown</dd></div></dl>
      </section>

      <section className={styles.homeSection} id="categories">
        <div className={styles.sectionTitle}><div><p className={styles.kicker}>Documentation map</p><h2>Browse by operating domain</h2></div><p>Each family has a distinct governance purpose and a predictable identifier.</p></div>
        <div className={styles.categoryGrid}>{DOC_CATEGORIES.map((category) => {
          const count = docs.filter((doc) => doc.category?.slug === category.slug).length;
          return <Link href={`/docs/${category.slug}`} className={styles.categoryCard} key={category.slug}><span>{category.code}</span><div><h3>{category.title}</h3><p>{category.description}</p></div><small>{count} {count === 1 ? "document" : "documents"} →</small></Link>;
        })}</div>
      </section>

      <section className={styles.homeSection}>
        <div className={styles.sectionTitle}><div><p className={styles.kicker}>Start here</p><h2>Recommended reading order</h2></div><p>Begin with authority and principles, then move into execution and client delivery.</p></div>
        <ol className={styles.readingList}>{quickLinks.map((doc, index) => <li key={doc.metadata.documentId}><Link href={doc.href}><span>0{index + 1}</span><div><small>{doc.metadata.documentId}</small><strong>{doc.title.replace(/^\w+-\d{4}\s+[—-]\s+/, "")}</strong></div><b aria-hidden="true">→</b></Link></li>)}</ol>
      </section>

      <section className={styles.updatePanel}><div><p className={styles.kicker}>Recently updated</p><h2>Change history stays in Git.</h2><p>Source documents do not currently define last-updated metadata. GitHub remains the authoritative audit trail until dates are added to document headers.</p></div><a href="https://github.com/cocodev86/Coco1/commits/main/docs">View documentation history →</a></section>
    </div>
  );
}
