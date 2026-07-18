import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "./data";
import styles from "./case-studies.module.css";

export const metadata: Metadata = {
  title: "Automation Case Studies | Metaphor Consulting",
  description:
    "Explore practical automation system designs for service businesses and independent consultants.",
};

export default function CaseStudiesPage() {
  return (
    <main className={styles.page}>
      <nav className={`shell ${styles.nav}`} aria-label="Case studies navigation">
        <Link className="brand" href="/"><span>M</span>Metaphor</Link>
        <div className={styles.navLinks}>
          <Link href="/blog">Blog</Link>
          <Link href="/blog/search">Search</Link>
          <Link href="/#booking">Consultation</Link>
        </div>
        <Link className="button button-small" href="/#booking">Book a strategy call</Link>
      </nav>

      <section className={`shell ${styles.hero}`}>
        <p className="eyebrow">Case studies</p>
        <h1>See how scattered work becomes <em>one clear system.</em></h1>
        <p>These system breakdowns show the business problem, workflow architecture, and measurable outcomes an automation engagement is designed to create.</p>
      </section>

      <section className={`shell ${styles.grid}`}>
        {caseStudies.map((study, index) => (
          <article className={styles.card} key={study.slug}>
            <div className={styles.visual}>
              <span>{study.clientType}</span>
              <strong>0{index + 1}</strong>
            </div>
            <div className={styles.body}>
              <p className="eyebrow">System design</p>
              <h2>{study.title}</h2>
              <p>{study.summary}</p>
              <div className={styles.metrics}>
                {study.outcomes.map((outcome) => (
                  <div key={outcome.label}>
                    <b>{outcome.value}</b>
                    <span>{outcome.label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.services}>
                {study.services.map((service) => <span key={service}>{service}</span>)}
              </div>
              <Link className={styles.link} href={`/blog/case-studies/${study.slug}`}>View system breakdown →</Link>
            </div>
          </article>
        ))}
      </section>

      <footer className={`shell ${styles.footer}`}>
        <Link className="brand" href="/"><span>M</span>Metaphor</Link>
        <p>AI automation and digital systems for growing businesses.</p>
        <small>© 2026 Metaphor Consulting.</small>
      </footer>
    </main>
  );
}
