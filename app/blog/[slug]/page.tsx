import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrandLink from "@/components/branding/BrandLink";
import RelatedArticles from "../RelatedArticles";
import { articles } from "../data";
import styles from "../article.module.css";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};

  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    type: "article",
    keywords: article.tags,
    authors: [article.author],
    publishedTime: article.date,
    modifiedTime: article.updated ?? article.date,
    tags: article.tags,
  });
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} | Metaphor Consulting`,
    description: article.excerpt,
    keywords: article.tags,
    authors: [{ name: article.author }],
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      authors: [article.author],
      tags: article.tags,
      url: `/blog/${article.slug}`,
      siteName: "Metaphor Consulting",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: "Metaphor Consulting" },
    mainEntityOfPage: `/blog/${article.slug}`,
    articleSection: article.category,
    keywords: article.tags.join(", "),
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className={`shell ${styles.nav}`} aria-label="Article navigation">
        <BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} priority />
        <div className={styles.navLinks}>
          <Link href="/blog">Blog</Link>
          <Link href="/blog/case-studies">Case studies</Link>
          <Link href="/blog/search">Search</Link>
          <Link href={`/blog/category/${article.categorySlug}`}>{article.category}</Link>
        </div>
        <Link className="button button-small" href="/#booking">Book a strategy call</Link>
      </nav>

      <header className={`shell ${styles.articleHero}`}>
        <div className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/blog">Blog</Link><span>/</span><Link href={`/blog/category/${article.categorySlug}`}>{article.category}</Link>
        </div>
        <p className={styles.categoryLabel}>{article.category}</p>
        <h1>{article.title}</h1>
        <p className={styles.dek}>{article.excerpt}</p>
        <div className={styles.byline}>
          <div className={styles.authorMark} aria-hidden="true">C</div>
          <div>
            <strong>{article.author}</strong>
            <span>Founder & Systems Architect, Metaphor Consulting</span>
          </div>
          <dl>
            <div><dt>Published</dt><dd>{article.date}</dd></div>
            <div><dt>Reading time</dt><dd>{article.readingTime}</dd></div>
          </dl>
        </div>
        <div className={`${styles.articleVisual} ${styles[article.accent]}`}>
          <span>{article.category}</span>
          <strong>Metaphor field notes</strong>
        </div>
      </header>

      <div className={`shell ${styles.articleLayout}`}>
        <aside className={styles.sidebar}>
          <nav aria-label="Table of contents">
            <p>In this guide</p>
            {article.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}
          </nav>
          <div className={styles.sidebarCta}>
            <strong>Need this system built?</strong>
            <p>Turn the strategy into a working automation designed around your actual workflow.</p>
            <Link href="/#booking">Discuss your workflow →</Link>
          </div>
        </aside>

        <article className={styles.content}>
          <p className={styles.intro}>The strongest business systems remove friction without making the operation harder to understand. This guide breaks the decision into practical steps you can evaluate, implement, and measure.</p>

          <section className={styles.takeaways} aria-labelledby="takeaways-heading">
            <p>Executive summary</p>
            <h2 id="takeaways-heading">Key takeaways</h2>
            <ul>{article.keyTakeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}</ul>
          </section>

          {article.sections.map((section) => (
            <section className={styles.articleSection} id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            </section>
          ))}

          <aside className={styles.inlineCta}>
            <p className="eyebrow">From strategy to system</p>
            <h2>Build the workflow around your business—not the other way around.</h2>
            <p>Metaphor designs focused automation systems for lead capture, booking, customer communication, payments, and internal operations.</p>
            <Link className="button" href="/#booking">Book a strategy call</Link>
          </aside>

          <div className={styles.articleFooter}>
            <div className={styles.tags}>{article.tags.map((tag) => <Link href={`/blog/tag/${tag}`} key={tag}>#{tag}</Link>)}</div>
            <Link href="/blog">← Back to all insights</Link>
          </div>
        </article>
      </div>

      <div className="shell"><RelatedArticles article={article} /></div>

      <footer className={`shell ${styles.footer}`}>
        <BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} />
        <p>AI automation insights and digital systems for growing businesses.</p>
        <small>© 2026 Metaphor Consulting. All rights reserved.</small>
      </footer>
    </main>
  );
}
