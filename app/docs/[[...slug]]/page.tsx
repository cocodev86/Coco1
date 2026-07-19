import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryPage from "../CategoryPage";
import DocsHome from "../DocsHome";
import DocsToc from "../DocsToc";
import MarkdownDocument from "../MarkdownDocument";
import styles from "../docs.module.css";
import { DOC_CATEGORIES, getAdjacentDocs, getAllDocs, getDocBySlug } from "@/lib/docs";

type PageProps = { params: Promise<{ slug?: string[] }> };
const siteUrl = "https://metaphor-consulting.vercel.app";

export function generateStaticParams() {
  return [
    { slug: undefined },
    ...DOC_CATEGORIES.map((category) => ({ slug: [category.slug] })),
    ...getAllDocs().map((doc) => ({ slug: doc.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  if (!slug.length) return {
    title: "Metaphor Operating System Documentation",
    description: "Standards, playbooks, platform architecture, strategy, and templates for Metaphor Automation Consulting.",
    alternates: { canonical: "/docs" },
    openGraph: { title: "Metaphor Operating System", description: "The operating handbook and enterprise knowledge base for Metaphor Automation Consulting.", url: `${siteUrl}/docs`, type: "website" },
  };
  const category = slug.length === 1 ? DOC_CATEGORIES.find((item) => item.slug === slug[0]) : undefined;
  const doc = getDocBySlug(slug);
  if (category) return { title: `${category.title} | Metaphor OS`, description: category.description, alternates: { canonical: `/docs/${category.slug}` } };
  if (!doc) return {};
  const description = doc.bodyText.slice(0, 155);
  return {
    title: `${doc.title} | Metaphor OS`, description,
    alternates: { canonical: doc.href },
    openGraph: { title: doc.title, description, url: `${siteUrl}${doc.href}`, type: "article" },
  };
}

export default async function DocsPage({ params }: PageProps) {
  const { slug = [] } = await params;
  if (!slug.length) return <DocsHome />;
  const category = slug.length === 1 ? DOC_CATEGORIES.find((item) => item.slug === slug[0]) : undefined;
  if (category) return <CategoryPage category={category} />;
  const doc = getDocBySlug(slug);
  if (!doc) notFound();
  const { previous, next } = getAdjacentDocs(doc);

  return (
    <div className={styles.documentLayout}>
      <article className={styles.document}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/docs">Docs</Link><span>/</span>{doc.category && <><Link href={`/docs/${doc.category.slug}`}>{doc.category.code}</Link><span>/</span></>}<span aria-current="page">{doc.metadata.documentId || doc.title}</span></nav>
        <header className={styles.docHeader}>
          <div className={styles.docBadges}>{doc.category && <span>{doc.category.code}</span>}{doc.metadata.status && <span data-status={doc.metadata.status.toLowerCase()}>{doc.metadata.status}</span>}</div>
          <h1>{doc.title}</h1>
          <dl className={styles.metadata}>
            {doc.metadata.documentId && <div><dt>Document ID</dt><dd>{doc.metadata.documentId}</dd></div>}
            {doc.metadata.version && <div><dt>Version</dt><dd>{doc.metadata.version}</dd></div>}
            {doc.metadata.owner && <div><dt>Owner</dt><dd>{doc.metadata.owner}</dd></div>}
            {doc.metadata.classification && <div><dt>Classification</dt><dd>{doc.metadata.classification}</dd></div>}
            {doc.metadata.date && <div><dt>Last updated</dt><dd>{doc.metadata.date}</dd></div>}
          </dl>
          <a className={styles.sourceLink} href={doc.sourceHref}>View source on GitHub ↗</a>
        </header>
        <DocsToc items={doc.toc} mode="mobile" />
        <MarkdownDocument doc={doc} />
        <footer className={styles.docFooter}>
          <div className={styles.prevNext}>{previous ? <Link href={previous.href}><small>← Previous</small><strong>{previous.title}</strong></Link> : <span />}{next && <Link href={next.href}><small>Next →</small><strong>{next.title}</strong></Link>}</div>
          {doc.category && <Link className={styles.backCategory} href={`/docs/${doc.category.slug}`}>Back to {doc.category.title}</Link>}
        </footer>
      </article>
      <DocsToc items={doc.toc} mode="desktop" />
    </div>
  );
}
