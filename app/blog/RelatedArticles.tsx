import Link from "next/link";
import type { BlogArticle } from "./data";
import { getRelatedArticles } from "./related";
import styles from "./article.module.css";

export default function RelatedArticles({ article }: { article: BlogArticle }) {
  const related = getRelatedArticles(article);

  if (!related.length) return null;

  return (
    <section className={styles.related} aria-labelledby="related-heading">
      <div className={styles.relatedHeader}>
        <div>
          <p className="eyebrow">Keep exploring</p>
          <h2 id="related-heading">Related articles</h2>
        </div>
        <Link href="/blog/search">Search all insights →</Link>
      </div>
      <div className={styles.relatedGrid}>
        {related.map((item) => (
          <article className={styles.relatedCard} key={item.slug}>
            <Link className={styles.relatedVisual} href={`/blog/${item.slug}`}>
              <span>{item.category}</span>
              <strong aria-hidden="true">↗</strong>
            </Link>
            <div className={styles.relatedBody}>
              <p>{item.readingTime}</p>
              <h3><Link href={`/blog/${item.slug}`}>{item.title}</Link></h3>
              <p>{item.excerpt}</p>
              <div className={styles.relatedTags}>
                {item.tags.slice(0, 2).map((tag) => (
                  <Link href={`/blog/tag/${tag}`} key={tag}>#{tag}</Link>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
