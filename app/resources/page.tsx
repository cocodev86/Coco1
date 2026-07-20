import type { Metadata } from "next";
import Link from "next/link";
import BrandLink from "@/components/branding/BrandLink";
import ResourcesClient from "./ResourcesClient";
import { resources, resourceTopics, resourceTypes } from "./data";
import styles from "./resources.module.css";

export const metadata: Metadata = {
  title: "Business Automation Resources | Metaphor Consulting",
  description: "Free checklists, calculators, worksheets, templates, and guides for automation, CRM, lead capture, conversion, and client operations.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <main className={styles.page}>
      <nav className={`shell ${styles.nav}`} aria-label="Resources navigation">
        <BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} priority />
        <div className={styles.navLinks}><Link href="/blog">Insights</Link><Link href="/automation-library">Automation library</Link><Link href="/blog/case-studies">Case studies</Link></div>
        <Link className="button button-small" href="/#booking">Book a strategy call</Link>
      </nav>

      <header className={`shell ${styles.hero}`}>
        <div className={styles.heroGrid}>
          <div><p className="eyebrow">Metaphor resource center</p><h1>Make better system decisions with <em>practical tools.</em></h1><p>Use these checklists, calculators, worksheets, templates, and implementation guides to evaluate bottlenecks, estimate value, and prepare stronger automation projects.</p></div>
          <div className={styles.stats}><div><strong>{resources.length}</strong><span>launch resources</span></div><div><strong>{resourceTypes.length}</strong><span>resource formats</span></div><div><strong>{resourceTopics.length}</strong><span>operational topics</span></div></div>
        </div>
      </header>

      <div className="shell"><ResourcesClient resources={resources} types={resourceTypes} topics={resourceTopics} /></div>

      <section className={`shell ${styles.cta}`}>
        <p className="eyebrow">Need implementation support?</p><h2>Turn the completed worksheet into a working business system.</h2><p>Metaphor can review your findings, map the process, choose the stack, build the automation, test exceptions, and document the handoff.</p><Link className="button" href="/#booking">Review my workflow with Metaphor</Link>
      </section>

      <footer className={`shell ${styles.footer}`}><BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} /><p>Practical tools for smarter business systems.</p><small>© 2026 Metaphor Consulting.</small></footer>
    </main>
  );
}
