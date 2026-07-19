"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ResourceItem } from "./data";
import styles from "./resources.module.css";

export default function ResourcesClient({ resources, types, topics }: { resources: ResourceItem[]; types: string[]; topics: string[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [topic, setTopic] = useState("All");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return resources.filter((resource) => {
      const haystack = [resource.title, resource.description, resource.type, ...resource.audience, ...resource.topics].join(" ").toLowerCase();
      return (!normalized || haystack.includes(normalized)) && (type === "All" || resource.type === type) && (topic === "All" || resource.topics.includes(topic));
    });
  }, [query, resources, topic, type]);

  const reset = () => { setQuery(""); setType("All"); setTopic("All"); };

  return (
    <section className={styles.browser} aria-labelledby="resource-browser-title">
      <div className={styles.browserHeader}>
        <div><p className="eyebrow">Resource browser</p><h2 id="resource-browser-title">Choose the tool for the decision in front of you.</h2></div>
        <p>{filtered.length} of {resources.length} resources</p>
      </div>

      <div className={styles.filters}>
        <label><span>Search</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search checklists, CRM, ROI..." /></label>
        <label><span>Format</span><select value={type} onChange={(event) => setType(event.target.value)}><option>All</option>{types.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Topic</span><select value={topic} onChange={(event) => setTopic(event.target.value)}><option>All</option>{topics.map((item) => <option key={item}>{item}</option>)}</select></label>
        <button type="button" onClick={reset}>Reset</button>
      </div>

      {filtered.length ? (
        <div className={styles.grid}>
          {filtered.map((resource) => (
            <article className={styles.card} key={resource.slug}>
              <div className={styles.cardTop}><span>{resource.type}</span><strong>{resource.timeToUse}</strong></div>
              <h3><Link href={`/resources/${resource.slug}`}>{resource.title}</Link></h3>
              <p>{resource.description}</p>
              <div className={styles.topicList}>{resource.topics.map((item) => <span key={item}>{item}</span>)}</div>
              <Link className={styles.cardLink} href={`/resources/${resource.slug}`}>Open resource →</Link>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.empty}><h3>No matching resources.</h3><p>Try a broader search or reset the filters.</p><button type="button" onClick={reset}>Show all resources</button></div>
      )}
    </section>
  );
}