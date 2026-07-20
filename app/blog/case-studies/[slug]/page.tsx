import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrandLink from "@/components/branding/BrandLink";
import { caseStudies, getCaseStudy } from "../data";
import styles from "../case-studies.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return createPageMetadata({
    title: study.title,
    description: study.summary,
    path: `/blog/case-studies/${study.slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <main className={styles.page}>
      <nav className={`shell ${styles.nav}`} aria-label="Case study navigation">
        <BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} priority />
        <div className={styles.navLinks}>
          <Link href="/blog">Blog</Link>
          <Link href="/blog/case-studies">Case studies</Link>
          <Link href="/blog/search">Search</Link>
        </div>
        <Link className="button button-small" href="/#booking">Book a strategy call</Link>
      </nav>

      <header className={`shell ${styles.detailHero}`}>
        <div className={styles.crumbs}>
          <Link href="/blog">Blog</Link><span>/</span>
          <Link href="/blog/case-studies">Case studies</Link><span>/</span>
          <span>{study.clientType}</span>
        </div>
        <p className="eyebrow">{study.clientType}</p>
        <h1>{study.title}</h1>
        <p>{study.summary}</p>
        {study.status === "concept" && (
          <div className={styles.notice}>
            Representative system-design scenario. Metrics shown are target outcomes, not verified client results.
          </div>
        )}
      </header>

      <section className={`shell ${styles.detailGrid}`}>
        <div>
          <article className={styles.panel}>
            <p className="eyebrow">The challenge</p>
            <h2>Where the process was breaking down</h2>
            <p>{study.challenge}</p>
          </article>

          <article className={styles.panel}>
            <p className="eyebrow">The system</p>
            <h2>What Metaphor would connect</h2>
            <ul>
              {study.system.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className={styles.services}>
              {study.services.map((service) => <span key={service}>{service}</span>)}
            </div>
          </article>
        </div>

        <aside>
          <article className={styles.panel}>
            <p className="eyebrow">Target outcomes</p>
            <h2>What the system is designed to improve</h2>
            <div className={styles.outcomeGrid}>
              {study.outcomes.map((outcome) => (
                <div className={styles.outcome} key={outcome.label}>
                  <strong>{outcome.value}</strong>
                  <span>{outcome.label}</span>
                </div>
              ))}
            </div>
          </article>

          <div className={styles.cta}>
            <p className="eyebrow">Build your version</p>
            <h2>Map the system your business needs next.</h2>
            <p>We will identify the bottleneck, define the workflow, and recommend the smallest useful system.</p>
            <Link className="button" href="/#booking">Book a free strategy call</Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
