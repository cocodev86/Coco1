import type { Metadata } from "next";
import Link from "next/link";
import BrandLink from "@/components/branding/BrandLink";
import LibraryClient from "./LibraryClient";
import { automations, automationCategories, automationIndustries, automationIntegrations } from "./data";
import styles from "./library.module.css";

export const metadata: Metadata = {
  title: "Automation Library | Metaphor Consulting",
  description: "Explore practical automation playbooks for lead capture, booking, customer response, sales operations, and client delivery.",
  alternates: { canonical: "/automation-library" },
};

export default function AutomationLibraryPage() {
  return (
    <main className={styles.page}>
      <nav className={`shell ${styles.nav}`} aria-label="Automation library navigation">
        <BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} priority />
        <div className={styles.navLinks}><Link href="/">Home</Link><Link href="/blog">Insights</Link><Link href="/blog/case-studies">Case studies</Link></div>
        <Link className="button button-small" href="/#booking">Build my automation</Link>
      </nav>

      <header className={`shell ${styles.hero}`}>
        <div className={styles.heroGrid}>
          <div><p className="eyebrow">Metaphor automation library</p><h1>Find the system that removes your <em>next bottleneck.</em></h1><p>Browse practical automation playbooks by business problem, industry, and software. Each page explains the trigger, workflow, implementation scope, expected time savings, and business case.</p></div>
          <div className={styles.stats}><div><strong>{automations.length}</strong><span>launch playbooks</span></div><div><strong>{automationIntegrations.length}</strong><span>connected tools</span></div><div><strong>{automationIndustries.length}</strong><span>industry contexts</span></div><div><strong>1–10</strong><span>business-day builds</span></div></div>
        </div>
      </header>

      <div className="shell"><LibraryClient automations={automations} categories={automationCategories} industries={automationIndustries} integrations={automationIntegrations} /></div>

      <section className={`shell ${styles.cta}`}>
        <p className="eyebrow">Need a custom workflow?</p><h2>Turn a repeated task into a reliable operating system.</h2><p>Metaphor maps the process, connects the tools, adds safeguards, tests the workflow, and documents the handoff.</p><Link className="button" href="/#booking">Book an automation strategy call</Link>
      </section>

      <footer className={`shell ${styles.footer}`}><BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} /><p>Automation playbooks for growing businesses.</p><small>© 2026 Metaphor Consulting.</small></footer>
    </main>
  );
}
