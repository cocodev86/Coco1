import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "../data";
import SearchClient from "./SearchClient";
import styles from "./search.module.css";

export const metadata: Metadata = {
  title: "Search Insights | Metaphor Consulting",
  description:
    "Search Metaphor Consulting articles by automation topic, business challenge, category, or tag.",
};

export default function BlogSearchPage() {
  return (
    <main className={styles.page}>
      <nav className={`shell ${styles.nav}`} aria-label="Blog navigation">
        <Link className="brand" href="/" aria-label="Metaphor Consulting home">
          <span>M</span>Metaphor
        </Link>
        <div className={styles.navLinks}>
          <Link href="/blog">Blog</Link>
          <Link href="/blog#latest">Articles</Link>
          <Link href="/blog/search" aria-current="page">Search</Link>
        </div>
        <Link className="button button-small" href="/#booking">
          Book a strategy call
        </Link>
      </nav>

      <header className={`shell ${styles.hero}`}>
        <p className="eyebrow">Search the knowledge base</p>
        <h1>
          Find the right insight for your <em>next business decision.</em>
        </h1>
        <p>
          Search across article titles, summaries, categories, and tags. Results update instantly and remain fully private in your browser.
        </p>
      </header>

      <div className="shell">
        <SearchClient articles={articles} />
      </div>

      <footer className={`shell ${styles.footer}`}>
        <Link className="brand" href="/"><span>M</span>Metaphor</Link>
        <p>AI automation insights and digital systems for growing businesses.</p>
        <small>© 2026 Metaphor Consulting. All rights reserved.</small>
      </footer>
    </main>
  );
}
