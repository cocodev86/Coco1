"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { BlogArticle } from "../data";
import styles from "./search.module.css";

type SearchClientProps = {
  articles: BlogArticle[];
};

export default function SearchClient({ articles }: SearchClientProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return articles;

    return articles.filter((article) => {
      const searchableText = [
        article.title,
        article.excerpt,
        article.category,
        article.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return normalizedQuery
        .split(/\s+/)
        .every((term) => searchableText.includes(term));
    });
  }, [articles, normalizedQuery]);

  return (
    <section className={styles.searchArea} aria-labelledby="search-heading">
      <div className={styles.searchBox}>
        <label htmlFor="blog-search" id="search-heading">Search Metaphor insights</label>
        <div className={styles.inputWrap}>
          <span aria-hidden="true">⌕</span>
          <input id="blog-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try automation, CRM, conversion..." autoComplete="off" />
          {query && <button type="button" onClick={() => setQuery("")}>Clear</button>}
        </div>
        <p aria-live="polite">{results.length} {results.length === 1 ? "article" : "articles"}{normalizedQuery ? ` matching “${query.trim()}”` : " available"}</p>
      </div>

      {results.length > 0 ? (
        <div className={styles.results}>
          {results.map((article) => (
            <article className={styles.resultCard} key={article.slug}>
              <div className={styles.resultTopline}>
                <Link href={`/blog/category/${article.categorySlug}`}>{article.category}</Link>
                <span>{article.readingTime}</span>
              </div>
              <h2><Link href={`/blog/${article.slug}`}>{article.title}</Link></h2>
              <p>{article.excerpt}</p>
              <div className={styles.tags}>{article.tags.map((tag) => <Link key={tag} href={`/blog/tag/${tag}`}>#{tag}</Link>)}</div>
              <Link className={styles.status} href={`/blog/${article.slug}`}>Read article →</Link>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <strong>No matching articles yet.</strong>
          <p>Try a broader term, a category name, or one of the tags shown across the blog.</p>
          <button type="button" onClick={() => setQuery("")}>Reset search</button>
        </div>
      )}
    </section>
  );
}
