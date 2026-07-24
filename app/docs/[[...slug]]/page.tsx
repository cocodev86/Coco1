import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { DOC_CATEGORIES, getAdjacentDocs, getAllDocs, getCategoryDocs, getCategoryManual, getDocBySlug } from "@/lib/docs";
import MarkdownDocument from "../MarkdownDocument";
import styles from "../docs.module.css";

type PageProps = { params: Promise<{ slug?: string[] }> };

export function generateStaticParams() {
  return [
    { slug: [] },
    ...DOC_CATEGORIES.map((category) => ({ slug: [category.slug] })),
    ...getAllDocs().map((doc) => ({ slug: doc.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  if (!slug.length) {
    return createPageMetadata({
      title: "Documentation",
      description: "The Metaphor operating system, playbooks, client operations, platform architecture, strategy, templates, and controlled legal resources.",
      path: "/docs",
    });
  }

  const category = slug.length === 1 ? DOC_CATEGORIES.find((item) => item.slug === slug[0]) : undefined;
  if (category) return createPageMetadata({ title: category.title, description: category.description, path: `/docs/${category.slug}` });

  const doc = getDocBySlug(slug);
  if (!doc) return {};
  return createPageMetadata({ title: doc.title, description: doc.description, path: doc.href, type: "article" });
}

function DocsHome() {
  const docs = getAllDocs().filter((doc) => !doc.isFullManual);
  return (
    <div className={styles.home}>
      <header className={styles.homeHero}>
        <p className={styles.kicker}>Metaphor operating system</p>
        <h1>One governed source for how Metaphor operates, builds, and delivers.</h1>
        <p>Browse current standards, playbooks, platform architecture, client operations, verified legal templates, strategy, and reusable delivery assets generated directly from the repository documentation tree.</p>
        <div className={styles.heroActions}><Link className={styles.primaryButton} href="/docs/mos">Start with MOS</Link><Link href="/docs/contributing">Contributor guidance →</Link></div>
        <dl className={styles.stats}><div><dt>Documents</dt><dd>{docs.length}</dd></div><div><dt>Domains</dt><dd>{DOC_CATEGORIES.length}</dd></div><div><dt>Source</dt><dd>GitHub</dd></div></dl>
      </header>
      <section className={styles.homeSection}>
        <div className={styles.sectionTitle}><div><p className={styles.kicker}>Knowledge domains</p><h2>Browse by operating context.</h2></div><p>Each route is generated from current Markdown. Updating the source updates navigation, search, metadata, and adjacent-document flow.</p></div>
        <div className={styles.categoryGrid}>
          {DOC_CATEGORIES.map((category) => (
            <Link className={styles.categoryCard} href={`/docs/${category.slug}`} key={category.slug}>
              <span>{category.code}</span><div><h3>{category.title}</h3><p>{category.description}</p></div><small>{getCategoryDocs(category.slug).length} documents →</small>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function CategoryPage({ slug }: { slug: string }) {
  const category = DOC_CATEGORIES.find((item) => item.slug === slug);
  if (!category) notFound();
  const docs = getCategoryDocs(category.slug);
  const manual = getCategoryManual(category.slug);
  return (
    <div className={styles.categoryPage}>
      <header className={styles.categoryHero}>
        <p className={styles.kicker}>{category.code}</p>
        <h1>{category.title}</h1>
        <p>{category.description}</p>
        <div>
          <span>{docs.length} current documents</span>
          {manual && <Link href={manual.href}>Read the complete manual</Link>}
          <Link href="/docs">All documentation</Link>
        </div>
      </header>
      <section className={styles.documentList}><h2>Documents</h2>{docs.map((doc, index) => (
        <Link href={doc.href} key={doc.href}><span>{String(index + 1).padStart(2, "0")}</span><div>{doc.metadata.documentId && <small>{doc.metadata.documentId}</small>}<strong>{doc.title}</strong><p>{doc.description}</p></div><b aria-hidden="true">→</b></Link>
      ))}</section>
    </div>
  );
}

export default async function DocsPage({ params }: PageProps) {
  const { slug = [] } = await params;
  if (!slug.length) return <DocsHome />;
  if (slug.length === 1 && DOC_CATEGORIES.some((item) => item.slug === slug[0])) return <CategoryPage slug={slug[0]} />;

  const doc = getDocBySlug(slug);
  if (!doc) notFound();
  const { previous, next } = getAdjacentDocs(doc);

  return (
    <div className={styles.documentLayout}>
      <article className={styles.document}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/docs">Docs</Link><span>/</span>{doc.category && <><Link href={`/docs/${doc.category.slug}`}>{doc.category.code}</Link><span>/</span></>}<span aria-current="page">{doc.metadata.documentId || doc.title}</span></nav>
        <header className={styles.docHeader}>
          <div className={styles.docBadges}>{doc.category && <span>{doc.category.code}</span>}{doc.metadata.status && <span>{doc.metadata.status}</span>}</div>
          <h1>{doc.title}</h1>
          <dl className={styles.metadata}>{doc.metadata.documentId && <div><dt>Document ID</dt><dd>{doc.metadata.documentId}</dd></div>}{doc.metadata.version && <div><dt>Version</dt><dd>{doc.metadata.version}</dd></div>}{doc.metadata.owner && <div><dt>Owner</dt><dd>{doc.metadata.owner}</dd></div>}{doc.metadata.classification && <div><dt>Classification</dt><dd>{doc.metadata.classification}</dd></div>}{doc.metadata.date && <div><dt>Last updated</dt><dd>{doc.metadata.date}</dd></div>}</dl>
          <a className={styles.sourceLink} href={doc.sourceHref}>View source on GitHub ↗</a>
        </header>
        {doc.toc.length > 0 && <details className={styles.mobileToc}><summary>On this page</summary>{doc.toc.map((item) => <a href={`#${item.id}`} key={item.id}>{item.title}</a>)}</details>}
        <MarkdownDocument doc={doc} />
        <footer className={styles.docFooter}><div className={styles.prevNext}>{previous ? <Link href={previous.href}><small>← Previous</small><strong>{previous.title}</strong></Link> : <span />}{next && <Link href={next.href}><small>Next →</small><strong>{next.title}</strong></Link>}</div></footer>
      </article>
      {doc.toc.length > 0 && <aside className={styles.toc}><strong>On this page</strong><nav>{doc.toc.map((item) => <a className={item.depth > 2 ? styles.tocNested : undefined} href={`#${item.id}`} key={item.id}>{item.title}</a>)}</nav></aside>}
    </div>
  );
}
