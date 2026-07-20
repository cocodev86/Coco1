import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrandLink from "@/components/branding/BrandLink";
import { newsletterIssues } from "../data";
import styles from "./issue.module.css";

export function generateStaticParams() {
  return newsletterIssues.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const issue = newsletterIssues.find((item) => item.slug === slug);
  if (!issue) return {};

  return createPageMetadata({
    title: issue.title,
    description: issue.summary,
    path: `/newsletter/${issue.slug}`,
    type: "article",
    authors: ["Coco"],
  });
}

export default async function NewsletterIssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const issue = newsletterIssues.find((item) => item.slug === slug);
  if (!issue) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: issue.title,
    description: issue.summary,
    datePublished: "2026-07-19",
    author: { "@type": "Person", name: "Coco" },
    publisher: { "@type": "Organization", name: "Metaphor Consulting" },
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className={`shell ${styles.nav}`} aria-label="Newsletter issue navigation">
        <BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} priority />
        <div className={styles.navLinks}><Link href="/newsletter">Newsletter</Link><Link href="/blog">Insights</Link><Link href="/resources">Resources</Link></div>
        <Link className="button button-small" href="/newsletter#subscribe">Subscribe</Link>
      </nav>

      <header className={`shell ${styles.hero}`}>
        <div className={styles.breadcrumbs}><Link href="/">Home</Link><span>/</span><Link href="/newsletter">Newsletter</Link><span>/</span><span>Memo {issue.number}</span></div>
        <h1>{issue.title}</h1>
        <p className={styles.summary}>{issue.summary}</p>
        <div className={styles.meta}><span>Memo {issue.number}</span><span>{issue.publishedAt}</span><span>{issue.readingTime}</span></div>
        <div className={styles.topics}>{issue.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
      </header>

      <article className={`shell ${styles.body}`}>
        {issue.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
          </section>
        ))}
      </article>

      <section className={`shell ${styles.cta}`}><h2>Put the idea into operation.</h2><p>Metaphor can map the workflow, choose the stack, implement the automation, and document the handoff.</p><Link className="button" href="/#booking">Book a strategy call</Link></section>
      <footer className={`shell ${styles.footer}`}><BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} /><p>The Metaphor Memo.</p><small>© 2026 Metaphor Consulting.</small></footer>
    </main>
  );
}
