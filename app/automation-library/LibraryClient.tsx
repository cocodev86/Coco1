"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AutomationPlaybook } from "./data";
import styles from "./library.module.css";

type Props = {
  automations: AutomationPlaybook[];
  categories: string[];
  industries: string[];
  integrations: string[];
};

export default function LibraryClient({ automations, categories, industries, integrations }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [industry, setIndustry] = useState("All");
  const [integration, setIntegration] = useState("All");

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return automations.filter((item) => {
      const text = [item.title, item.summary, item.category, ...item.industries, ...item.integrations].join(" ").toLowerCase();
      return terms.every((term) => text.includes(term))
        && (category === "All" || item.category === category)
        && (industry === "All" || item.industries.includes(industry))
        && (integration === "All" || item.integrations.includes(integration));
    });
  }, [automations, category, industry, integration, query]);

  const reset = () => {
    setQuery("");
    setCategory("All");
    setIndustry("All");
    setIntegration("All");
  };

  return (
    <section className={styles.library} aria-labelledby="library-heading">
      <div className={styles.controls}>
        <label className={styles.searchLabel} htmlFor="automation-search" id="library-heading">
          Search the library
          <input id="automation-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try lead response, Stripe, barber..." />
        </label>
        <label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option>All</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Industry<select value={industry} onChange={(event) => setIndustry(event.target.value)}><option>All</option>{industries.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Integration<select value={integration} onChange={(event) => setIntegration(event.target.value)}><option>All</option>{integrations.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>

      <div className={styles.resultsHeader}>
        <p aria-live="polite"><strong>{results.length}</strong> {results.length === 1 ? "automation" : "automations"}</p>
        <button type="button" onClick={reset}>Reset filters</button>
      </div>

      {results.length ? (
        <div className={styles.grid}>
          {results.map((item) => (
            <article className={styles.card} key={item.slug}>
              <div className={styles.cardTop}><span>{item.category}</span><strong>{item.difficulty}</strong></div>
              <h2><Link href={`/automation-library/${item.slug}`}>{item.title}</Link></h2>
              <p>{item.summary}</p>
              <dl><div><dt>Build time</dt><dd>{item.buildTime}</dd></div><div><dt>Time saved</dt><dd>{item.monthlyHoursSaved}/mo</dd></div></dl>
              <div className={styles.pills}>{item.integrations.slice(0, 3).map((tool) => <span key={tool}>{tool}</span>)}</div>
              <Link className={styles.cardLink} href={`/automation-library/${item.slug}`}>View automation playbook →</Link>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.empty}><h2>No matching automations.</h2><p>Try a broader keyword or reset one of the filters.</p><button type="button" onClick={reset}>Show all automations</button></div>
      )}
    </section>
  );
}