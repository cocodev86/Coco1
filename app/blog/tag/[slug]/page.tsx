import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrandLink from "@/components/branding/BrandLink";
import { articles, tags, titleFromSlug } from "../../data";
import styles from "../../TaxonomyPage.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tags.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!tags.includes(slug)) return {};
  const title = titleFromSlug(slug);

  return createPageMetadata({
    title: `${title} Articles`,
    description: `Articles and practical guidance tagged ${title}.`,
    path: `/blog/tag/${slug}`,
  });
}: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!tags.includes(slug)) return {};
  const title = titleFromSlug(slug);
  return {
    title: `${title} Articles | Metaphor Consulting`,
    description: `Articles and practical guidance tagged ${title}.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  if (!tags.includes(slug)) notFound();
  const matches = articles.filter((article) => article.tags.includes(slug));
  const title = titleFromSlug(slug);

  return (
    <main className={styles.page}>
      <nav className={`shell ${styles.nav}`} aria-label="Tag navigation">
        <BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} priority />
        <div className={styles.navLinks}><Link href="/">Home</Link><Link href="/blog">Blog</Link></div>
        <Link className="button button-small" href="/#booking">Book a strategy call</Link>
      </nav>
      <header className={`shell ${styles.hero}`}>
        <p className="eyebrow">Blog tag</p>
        <h1>#{title}</h1>
        <p>Browse every Metaphor article connected to this topic, from strategy and implementation to measurement and optimization.</p>
        <Link className={styles.back} href="/blog">← Back to all insights</Link>
      </header>
      <section className={`shell ${styles.content}`}>
        <div className={styles.grid}>{matches.map((article) => (
          <article className={styles.card} key={article.slug}>
            <div className={`${styles.visual} ${styles[article.accent]}`}><span>{article.category}</span><strong aria-hidden="true">↗</strong></div>
            <div className={styles.body}><p className={styles.meta}>{article.date} · {article.readingTime}</p><h2>{article.title}</h2><p>{article.excerpt}</p><div className={styles.tags}>{article.tags.map((tag) => <Link key={tag} href={`/blog/tag/${tag}`}>#{tag}</Link>)}</div></div>
          </article>
        ))}</div>
      </section>
      <footer className={`shell ${styles.footer}`}><BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} /><p>AI automation insights and digital systems for growing businesses.</p><small>© 2026 Metaphor Consulting.</small></footer>
    </main>
  );
}
