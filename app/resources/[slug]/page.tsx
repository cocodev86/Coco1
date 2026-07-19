import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrandLink from "@/components/branding/BrandLink";
import { resources } from "../data";
import PrintButton from "./PrintButton";
import styles from "./resource.module.css";

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resource = resources.find((item) => item.slug === slug);
  if (!resource) return {};
  return {
    title: `${resource.title} | Metaphor Consulting`,
    description: resource.description,
    alternates: { canonical: `/resources/${resource.slug}` },
    openGraph: { title: resource.title, description: resource.description, type: "article" },
  };
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = resources.find((item) => item.slug === slug);
  if (!resource) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: resource.title,
    description: resource.description,
    totalTime: resource.timeToUse,
    step: resource.instructions.map((instruction, index) => ({ "@type": "HowToStep", position: index + 1, text: instruction })),
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <nav className={`shell ${styles.nav}`} aria-label="Resource navigation">
        <BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} priority />
        <div className={styles.navLinks}><Link href="/resources">Resources</Link><Link href="/automation-library">Automation library</Link><Link href="/blog">Insights</Link></div>
        <Link className="button button-small" href="/#booking">Get implementation help</Link>
      </nav>

      <header className={`shell ${styles.hero}`}>
        <div className={styles.breadcrumbs}><Link href="/">Home</Link><span>/</span><Link href="/resources">Resources</Link><span>/</span><span>{resource.type}</span></div>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}><p className="eyebrow">{resource.type} · {resource.timeToUse}</p><h1>{resource.title}</h1><p>{resource.description}</p></div>
          <div className={styles.meta}><div><span>Designed for</span><strong>{resource.audience[0]}</strong></div><div><span>Primary outcome</span><strong>Actionable decision</strong></div></div>
        </div>
      </header>

      <div className={`shell ${styles.layout}`}>
        <article className={styles.content}>
          <section className={styles.panel}><h2>What this resource helps you produce</h2><p>{resource.outcome}</p></section>
          <section className={styles.panel}><h2>What is included</h2><ul>{resource.includes.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section className={styles.panel}><h2>How to use it</h2><ol className={styles.steps}>{resource.instructions.map((item) => <li key={item}>{item}</li>)}</ol></section>
          <section className={styles.panel}><h2>Working notes</h2><p>Use the space below when printing or saving this page. Record the workflow owner, current bottleneck, evidence, assumptions, required approvals, and next action.</p><p>__________________________________________________________________</p><p>__________________________________________________________________</p><p>__________________________________________________________________</p></section>
        </article>

        <aside className={styles.sidebar}>
          <div className={styles.download}><p className="eyebrow">Free resource</p><h2>Take this tool into your workflow review.</h2><p>Print the page or save it as a PDF, complete it with your team, and use the findings to scope the next system improvement.</p><PrintButton /></div>
          <div className={styles.panel}><h2>Topics</h2><div className={styles.tags}>{resource.topics.map((topic) => <span key={topic}>{topic}</span>)}</div></div>
          <div className={styles.panel}><h2>Need the system built?</h2><p>Metaphor can convert the completed resource into requirements, architecture, automation, testing, and documentation.</p><Link href="/#booking"><strong>Book a strategy call →</strong></Link></div>
        </aside>
      </div>

      <footer className={`shell ${styles.footer}`}><BrandLink className="brand" href="/" variant="compactDark" logoWidth={176} /><p>Practical resources for smarter systems.</p><small>© 2026 Metaphor Consulting.</small></footer>
    </main>
  );
}
