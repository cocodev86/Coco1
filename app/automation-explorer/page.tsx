import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import BrandLink from "@/components/branding/BrandLink";
import ExplorerClient from "./ExplorerClient";
import styles from "./explorer.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "AI Automation Explorer",
  description: "Assess your workflow, estimate recoverable time, and receive a prioritized automation roadmap based on your business profile.",
  path: "/automation-explorer",
});

export default function AutomationExplorerPage() {
  return (
    <main className={styles.page}>
      <nav className={`shell ${styles.nav}`} aria-label="Automation explorer navigation">
        <BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} priority />
        <div className={styles.navLinks}><Link href="/blog">Insights</Link><Link href="/automation-library">Automation library</Link><Link href="/resources">Resources</Link><Link href="/newsletter">Newsletter</Link></div>
        <Link className="button button-small" href="/#booking">Talk to Metaphor</Link>
      </nav>

      <header className={`shell ${styles.hero}`}>
        <div className={styles.heroGrid}>
          <div>
            <p className="eyebrow">Metaphor automation explorer</p>
            <h1>Find the automation with the clearest <em>business case.</em></h1>
            <p>Answer four short sections about your workload, lead volume, software, and bottleneck. The explorer will estimate your opportunity and rank the systems most likely to create operational leverage.</p>
          </div>
          <aside className={styles.heroAside}><strong>4 steps</strong><span>No account required. Results are generated in your browser.</span></aside>
        </div>
      </header>

      <div className="shell"><ExplorerClient /></div>

      <footer className={`shell ${styles.footer}`}><BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} /><p>Directional automation diagnostics for growing businesses.</p><small>© 2026 Metaphor Consulting.</small></footer>
    </main>
  );
}
