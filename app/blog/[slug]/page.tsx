import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  return {
    title: `${article.title} | Metaphor Consulting`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <main className={styles.page}>
      <nav className={`shell ${styles.nav}`} aria-label="Article navigation">
        <Link className="brand" href="/"><span>M</span>Metaphor</Link>
        <div className={styles.navLinks}>
          <Link href="/blog">Blog</Link>
          <Link href="/blog/search">Search</Link>
          <Link href={`/blog/category/${article.categorySlug}`}>{article.category}</Link>
        </div>
        <Link className="button button-small" href="/#booking">Book a strategy call</Link>
      </nav>

      <header className={`shell ${styles.articleHero}`}>
        <div className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/blog">Blog</Link><span>/</span><Link href={`/blog/category/${article.categorySlug}`}>{article.category}</Link>
        </div>
        <h1>{article.title}</h1>
        <p className={styles.dek}>{article.excerpt}</p>
        <div className={styles.byline}>
          <span>By Coco · Metaphor Consulting</span>
          <span>{article.date}</span>
          <span>{article.readingTime}</span>
        </div>
        <div className={styles.articleVisual}><span>{article.category}</span></div>
      </header>

      <article className={`shell ${styles.content}`}>
        <p>This article is part of the Metaphor field notes: practical guidance for building smarter business systems without unnecessary complexity.</p>
        <div className={styles.notice}><strong>Article in production.</strong> The full editorial version will be published here while preserving this permanent URL, taxonomy, and related-content structure.</div>
        <h2>What this guide will cover</h2>
        <p>{article.excerpt} The finished guide will translate the strategy into concrete decisions, examples, and an implementation framework suitable for small and growing businesses.</p>
        <div className={styles.tags}>{article.tags.map((tag) => <Link href={`/blog/tag/${tag}`} key={tag}>#{tag}</Link>)}</div>
      </article>

      <div className="shell"><RelatedArticles article={article} /></div>

      <footer className={`shell ${styles.footer}`}>
        <Link className="brand" href="/"><span>M</span>Metaphor</Link>
        <p>AI automation insights and digital systems for growing businesses.</p>
        <small>© 2026 Metaphor Consulting. All rights reserved.</small>
      </footer>
    </main>
  );
}
