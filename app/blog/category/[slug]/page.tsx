import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrandLink from "@/components/branding/BrandLink";
import { articles, categories } from "../../data";
import styles from "../../TaxonomyPage.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) return {};

  return createPageMetadata({
    title: `${category.name} Articles`,
    description: `Practical ${category.name.toLowerCase()} guides and strategies for growing businesses.`,
    path: `/blog/category/${slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const matches = articles.filter((article) => article.categorySlug === slug);

  return (
    <main className={styles.page}>
      <nav className={`shell ${styles.nav}`} aria-label="Category navigation">
        <BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} priority />
        <div className={styles.navLinks}><Link href="/">Home</Link><Link href="/blog">Blog</Link></div>
        <Link className="button button-small" href="/#booking">Book a strategy call</Link>
      </nav>
      <header className={`shell ${styles.hero}`}>
        <p className="eyebrow">Blog category</p>
        <h1>{category.name}</h1>
        <p>Focused articles, practical frameworks, and implementation guidance for businesses improving this part of their digital system.</p>
        <Link className={styles.back} href="/blog">← Back to all insights</Link>
      </header>
      <section className={`shell ${styles.content}`}>
        {matches.length ? <div className={styles.grid}>{matches.map((article) => (
          <article className={styles.card} key={article.slug}>
            <div className={`${styles.visual} ${styles[article.accent]}`}><span>{article.category}</span><strong aria-hidden="true">↗</strong></div>
            <div className={styles.body}><p className={styles.meta}>{article.date} · {article.readingTime}</p><h2>{article.title}</h2><p>{article.excerpt}</p><div className={styles.tags}>{article.tags.map((tag) => <Link key={tag} href={`/blog/tag/${tag}`}>#{tag}</Link>)}</div></div>
          </article>
        ))}</div> : <div className={styles.empty}>Articles for this category are being prepared. The archive route is live and ready for publishing.</div>}
      </section>
      <footer className={`shell ${styles.footer}`}><BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} /><p>AI automation insights and digital systems for growing businesses.</p><small>© 2026 Metaphor Consulting.</small></footer>
    </main>
  );
}
