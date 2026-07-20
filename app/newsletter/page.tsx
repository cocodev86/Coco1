import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import BrandLink from "@/components/branding/BrandLink";
import SubscribeForm from "./SubscribeForm";
import { newsletterIssues } from "./data";
import styles from "./newsletter.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "The Metaphor Memo",
  description: "A practical newsletter about AI automation, lead systems, CRM operations, web strategy, and better client delivery.",
  path: "/newsletter",
});

export default function NewsletterPage() {
  return (
    <main className={styles.page}>
      <nav className={`shell ${styles.nav}`} aria-label="Newsletter navigation">
        <BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} priority />
        <div className={styles.navLinks}><Link href="/blog">Insights</Link><Link href="/automation-library">Automation library</Link><Link href="/resources">Resources</Link></div>
        <a className="button button-small" href="#subscribe">Subscribe</a>
      </nav>

      <header className={`shell ${styles.hero}`}>
        <div className={styles.heroGrid}>
          <div><p className="eyebrow">The Metaphor memo</p><h1>One useful system idea, <em>without the noise.</em></h1><p>Short, practical notes for owners and operators building smarter lead capture, customer response, CRM, web, and delivery systems.</p></div>
          <aside className={styles.promise}><strong>Built for action.</strong><span>No daily trend summaries. No shallow tool lists. Each issue explains one operational decision and gives you a concrete way to apply it.</span></aside>
        </div>
      </header>

      <section className={`shell ${styles.signup}`} id="subscribe">
        <div className={styles.signupCopy}><p className="eyebrow">Choose what matters</p><h2>Get the memo that fits your work.</h2><p>Select the topics you care about. Your preferences travel with the subscription payload so the connected email platform can segment future issues correctly.</p></div>
        <SubscribeForm />
      </section>

      <section className={styles.archive}>
        <div className="shell">
          <div className={styles.archiveHeader}><div><p className="eyebrow">Issue archive</p><h2>Read before you subscribe.</h2></div><p>Every issue is published as a permanent, searchable page so the newsletter also strengthens Metaphor’s public knowledge base.</p></div>
          <div className={styles.issueGrid}>
            {newsletterIssues.map((issue) => (
              <article className={styles.issueCard} key={issue.slug}>
                <div className={styles.issueMeta}><span>Memo {issue.number}</span><span>{issue.publishedAt}</span><span>{issue.readingTime}</span></div>
                <h3><Link href={`/newsletter/${issue.slug}`}>{issue.title}</Link></h3>
                <p>{issue.summary}</p>
                <div className={styles.topicList}>{issue.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
                <Link className={styles.readLink} href={`/newsletter/${issue.slug}`}>Read the issue →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className={`shell ${styles.footer}`}><BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} /><p>Practical systems guidance for growing businesses.</p><small>© 2026 Metaphor Consulting.</small></footer>
    </main>
  );
}
