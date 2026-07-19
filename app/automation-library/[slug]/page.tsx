import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrandLink from "@/components/branding/BrandLink";
import { automations } from "../data";
import styles from "../playbook.module.css";

export function generateStaticParams() {
  return automations.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const playbook = automations.find((item) => item.slug === slug);
  if (!playbook) return {};
  return {
    title: `${playbook.title} Automation | Metaphor Consulting`,
    description: playbook.summary,
    alternates: { canonical: `/automation-library/${playbook.slug}` },
    openGraph: { title: playbook.title, description: playbook.summary, type: "article" },
  };
}

export default async function AutomationPlaybookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const playbook = automations.find((item) => item.slug === slug);
  if (!playbook) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: playbook.title,
    description: playbook.summary,
    step: playbook.workflow.map((step, index) => ({ "@type": "HowToStep", position: index + 1, name: step })),
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className={`shell ${styles.nav}`} aria-label="Playbook navigation">
        <BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} priority />
        <div className={styles.navLinks}><Link href="/automation-library">Library</Link><Link href="/blog">Insights</Link><Link href="/blog/case-studies">Case studies</Link></div>
        <Link className="button button-small" href="/#booking">Build this system</Link>
      </nav>

      <header className={`shell ${styles.hero}`}>
        <div className={styles.breadcrumbs}><Link href="/">Home</Link><span>/</span><Link href="/automation-library">Automation Library</Link><span>/</span><span>{playbook.category}</span></div>
        <h1>{playbook.title}</h1>
        <p>{playbook.summary}</p>
        <div className={styles.metaGrid}>
          <div><span>Difficulty</span><strong>{playbook.difficulty}</strong></div>
          <div><span>Build time</span><strong>{playbook.buildTime}</strong></div>
          <div><span>Potential time saved</span><strong>{playbook.monthlyHoursSaved}/month</strong></div>
          <div><span>Category</span><strong>{playbook.category}</strong></div>
        </div>
      </header>

      <div className={`shell ${styles.body}`}>
        <div className={styles.main}>
          <section className={styles.section}><h2>When this automation starts</h2><p>{playbook.trigger}</p></section>
          <section className={styles.section}><h2>Workflow architecture</h2><p>The exact implementation depends on your current tools, permissions, data quality, and exception rules. The baseline flow is:</p><ol className={styles.workflow}>{playbook.workflow.map((step) => <li key={step}>{step}</li>)}</ol></section>
          <section className={styles.section}><h2>Expected operational outcomes</h2><ul className={styles.outcomes}>{playbook.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></section>
          <section className={styles.section}><h2>Business case</h2><p>{playbook.roi}. Time-saved estimates are planning ranges, not guaranteed results. Metaphor validates the current process and baseline volume before defining measurable implementation targets.</p></section>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.panel}><h2>Build this with Metaphor</h2><p>We map the workflow, connect the stack, test exceptions, document ownership, and prepare the system for handoff.</p><div className={styles.tools}>{playbook.integrations.map((tool) => <span key={tool}>{tool}</span>)}</div><Link className="button" href="/#booking">Request an automation plan</Link></div>
          <div className={styles.note}><strong>Common fits</strong><br />{playbook.industries.join(" · ")}</div>
        </aside>
      </div>

      <footer className={`shell ${styles.footer}`}><BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} /><p>Practical automation systems for growing businesses.</p><small>© 2026 Metaphor Consulting.</small></footer>
    </main>
  );
}
