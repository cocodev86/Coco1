import type { Metadata } from "next";
import Link from "next/link";
import BrandLink from "@/components/branding/BrandLink";
import MobileMenu from "../MobileMenu";
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

const publicMenu = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Booking", href: "/#booking" },
];

export default function BlogHome() {
  return (
    <main className={styles.page}>
      <nav className={`nav shell ${styles.nav}`} aria-label="Primary navigation">
        <BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} priority />
        <div className="navlinks">
          {publicMenu.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </div>
        <Link className="button button-small" href="/#booking">Book a strategy call</Link>
        <MobileMenu links={publicMenu} ctaHref="/#booking" menuId="blog-mobile-navigation" />
      </nav>

      <section className={`shell ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">Metaphor field notes</p>
          <h1>Build a smarter business, <em>one system at a time.</em></h1>
          <p>Practical automation advice, conversion strategy, and clear explanations for growing businesses that want better systems without unnecessary complexity.</p>
          <div className={styles.heroActions}><Link className="button" href="/automation-explorer">Generate my automation roadmap</Link><Link className={styles.secondaryLink} href="/newsletter">Read the Metaphor memo →</Link></div>
        </div>

        <aside className={styles.featured} aria-label="Featured tool">
          <div className={styles.featuredVisual}><span>FLAGSHIP DIAGNOSTIC</span><div className={styles.workflow} aria-hidden="true"><i>Assess</i><b>→</b><i>Score</i><b>→</b><i>Prioritize</i></div></div>
          <div className={styles.featuredBody}><p className={styles.meta}>Automation Explorer · 4 steps</p><h2>Find the clearest automation opportunity</h2><p>Estimate recoverable time, assess readiness, and receive a ranked implementation roadmap based on your workflow.</p><Link href="/automation-explorer">Start the assessment →</Link></div>
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

      <section className={`shell ${styles.newsletter}`}><div><p className="eyebrow">Automation explorer</p><h2>Diagnose the bottleneck before choosing the software.</h2><p>Get a readiness score, directional value estimate, and three-system priority roadmap.</p></div><div className={styles.newsletterStatus}><span>4-step assessment</span><strong><Link href="/automation-explorer">Generate my roadmap →</Link></strong></div></section>
      <section className={`shell ${styles.newsletter}`}><div><p className="eyebrow">Automation library</p><h2>Start with a proven workflow pattern.</h2><p>Search implementation playbooks by bottleneck, industry, and software stack.</p></div><div className={styles.newsletterStatus}><span>6 launch playbooks</span><strong><Link href="/automation-library">Explore the library →</Link></strong></div></section>
      <section className={`shell ${styles.newsletter}`}><div><p className="eyebrow">Free resources</p><h2>Use the checklist before you buy the software.</h2><p>Work through calculators, worksheets, SOP templates, and audit tools.</p></div><div className={styles.newsletterStatus}><span>6 launch resources</span><strong><Link href="/resources">Open the resource center →</Link></strong></div></section>
      <section className={`shell ${styles.newsletter}`}><div><p className="eyebrow">Case studies</p><h2>See the architecture behind a better workflow.</h2><p>Explore representative system designs showing the bottleneck, automation plan, connected tools, and target outcomes.</p></div><div className={styles.newsletterStatus}><span>System breakdowns</span><strong><Link href="/blog/case-studies">Explore case studies →</Link></strong></div></section>

      <section className={styles.guidesSection} id="guides"><div className="shell"><div className={styles.sectionHeader}><div><p className="eyebrow">Popular guide tracks</p><h2>Learn the system behind the software.</h2></div><p>Metaphor content prioritizes business logic and decision-making—not shallow lists of AI tools.</p></div><div className={styles.guideGrid}>{guides.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

      <section className={`shell ${styles.newsletter}`}><div><p className="eyebrow">The Metaphor memo</p><h2>One useful systems idea at a time.</h2><p>Choose your topics, read the public archive, and subscribe without daily noise or shallow trend summaries.</p></div><div className={styles.newsletterStatus}><span>2 launch issues</span><strong><Link href="/newsletter">Read and subscribe →</Link></strong></div></section>

      <section className={styles.ctaSection}><div className={`shell ${styles.ctaInner}`}><div><p className="eyebrow">Need a system now?</p><h2>Turn the next good idea into a working business process.</h2></div><Link className="button" href="/#booking">Book a free strategy call</Link></div></section>
      <footer className={`shell ${styles.footer}`}><BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} /><p>AI automation insights and digital systems for growing businesses.</p><small>© 2026 Metaphor Consulting. All rights reserved.</small></footer>
    </main>
  );
}
