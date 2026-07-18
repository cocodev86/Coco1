import type { Metadata } from "next";
import Link from "next/link";
import { articles, categories } from "./data";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "AI Automation Insights | Metaphor Consulting",
  description: "Practical guides, automation ideas, and digital growth strategies for small businesses building smarter systems.",
};

const guides = [
  ["01", "Automation readiness", "Determine which workflows are stable enough to automate and which need to be fixed first."],
  ["02", "Lead-system design", "Map the path from first click to qualified conversation, booking, and follow-up."],
  ["03", "Tool selection", "Compare CRMs, databases, schedulers, payment tools, and AI platforms by business outcome."],
];

export default function BlogHome() {
  return (
    <main className={styles.page}>
      <nav className={`shell ${styles.nav}`} aria-label="Blog navigation">
        <Link className="brand" href="/" aria-label="Metaphor Consulting home"><span>M</span>Metaphor</Link>
        <div className={styles.navLinks}>
          <Link href="/">Home</Link><a href="#latest">Articles</a><a href="#guides">Guides</a><Link href="/blog/search">Search</Link>
        </div>
        <Link className="button button-small" href="/#booking">Book a strategy call</Link>
      </nav>

      <section className={`shell ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">Metaphor field notes</p>
          <h1>Build a smarter business, <em>one system at a time.</em></h1>
          <p>Practical automation advice, conversion strategy, and clear explanations for growing businesses that want better systems without unnecessary complexity.</p>
          <div className={styles.heroActions}><a className="button" href="#latest">Explore the latest insights</a><Link className={styles.secondaryLink} href="/blog/search">Search all insights →</Link></div>
        </div>

        <aside className={styles.featured} aria-label="Featured article">
          <div className={styles.featuredVisual}><span>FEATURED GUIDE</span><div className={styles.workflow} aria-hidden="true"><i>Lead</i><b>→</b><i>Reply</i><b>→</b><i>Book</i></div></div>
          <div className={styles.featuredBody}><p className={styles.meta}>AI Automation · 10 min read</p><h2>The Small Business Automation Blueprint</h2><p>Start with the customer journey, remove operational friction, and build a system that saves time without creating another tool to manage.</p><span className={styles.comingSoon}>First guide coming soon</span></div>
        </aside>
      </section>

      <section className={styles.categoryBar} aria-label="Article categories"><div className={`shell ${styles.categoryTrack}`}>{categories.map((category) => <Link href={`/blog/category/${category.slug}`} key={category.slug}>{category.name}</Link>)}</div></section>

      <section className={`section shell ${styles.latest}`} id="latest">
        <div className={styles.sectionHeader}><div><p className="eyebrow">Latest articles</p><h2>Clear ideas you can put to work.</h2></div><p>Each article focuses on a real operational decision: what to automate, what to build, what to measure, and what to leave alone.</p></div>
        <div className={styles.articleGrid}>
          {articles.map((article) => (
            <article className={styles.articleCard} key={article.slug}>
              <div className={`${styles.articleVisual} ${styles[article.accent]}`}><Link href={`/blog/category/${article.categorySlug}`}>{article.category}</Link><Link href={`/blog/${article.slug}`} aria-label={`Read ${article.title}`}>↗</Link></div>
              <div className={styles.articleBody}>
                <p className={styles.meta}>{article.date} · {article.readingTime}</p>
                <h3><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3>
                <p>{article.excerpt}</p>
                <div className={styles.tagList}>{article.tags.map((tag) => <Link key={tag} href={`/blog/tag/${tag}`}>#{tag}</Link>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.guidesSection} id="guides"><div className="shell"><div className={styles.sectionHeader}><div><p className="eyebrow">Popular guide tracks</p><h2>Learn the system behind the software.</h2></div><p>Metaphor content prioritizes business logic and decision-making—not shallow lists of AI tools.</p></div><div className={styles.guideGrid}>{guides.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

      <section className={`shell ${styles.newsletter}`}><div><p className="eyebrow">The Metaphor memo</p><h2>One useful automation idea at a time.</h2><p>The newsletter signup will launch with the first published guide. No noise, trend-chasing, or daily spam.</p></div><div className={styles.newsletterStatus}><span>Newsletter</span><strong>Coming with article publishing</strong></div></section>

      <section className={styles.ctaSection}><div className={`shell ${styles.ctaInner}`}><div><p className="eyebrow">Need a system now?</p><h2>Turn the next good idea into a working business process.</h2></div><Link className="button" href="/#booking">Book a free strategy call</Link></div></section>

      <footer className={`shell ${styles.footer}`}><Link className="brand" href="/"><span>M</span>Metaphor</Link><p>AI automation insights and digital systems for growing businesses.</p><small>© 2026 Metaphor Consulting. All rights reserved.</small></footer>
    </main>
  );
}
