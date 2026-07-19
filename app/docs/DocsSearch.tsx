"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { SearchRecord } from "@/lib/docs";
import styles from "./docs.module.css";

function excerpt(record: SearchRecord, query: string) {
  const text = `${record.headings.join(". ")} ${record.bodyText}`;
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  const start = Math.max(0, index < 0 ? 0 : index - 60);
  const value = text.slice(start, start + 180).trim();
  return `${start ? "…" : ""}${value}${start + 180 < text.length ? "…" : ""}`;
}

export default function DocsSearch({ records }: { records: SearchRecord[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return records
      .map((record) => {
        const haystack = `${record.title} ${record.documentId || ""} ${record.category} ${record.headings.join(" ")} ${record.bodyText}`.toLowerCase();
        return { record, score: terms.reduce((score, term) => score + (haystack.includes(term) ? 1 : 0), 0) };
      })
      .filter((result) => result.score === terms.length)
      .slice(0, 8);
  }, [query, records]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault(); setOpen(true); requestAnimationFrame(() => inputRef.current?.focus());
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className={styles.searchWrap}>
      <button className={styles.searchTrigger} type="button" onClick={() => { setOpen(true); requestAnimationFrame(() => inputRef.current?.focus()); }}>
        <span aria-hidden="true">⌕</span><span>Search documentation</span><kbd>⌘ K</kbd>
      </button>
      {open && (
        <div className={styles.searchOverlay} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section className={styles.searchDialog} role="dialog" aria-modal="true" aria-label="Search documentation">
            <div className={styles.searchInputRow}><span aria-hidden="true">⌕</span><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search titles, IDs, headings, and content…" aria-label="Search query" /><button type="button" onClick={() => setOpen(false)} aria-label="Close search">Esc</button></div>
            <div className={styles.searchResults} aria-live="polite">
              {!query.trim() && <div className={styles.searchEmpty}><strong>Search the operating system</strong><p>Try “architecture,” “client lifecycle,” “AI governance,” or a document ID.</p></div>}
              {query.trim() && !results.length && <div className={styles.searchEmpty}><strong>No results found</strong><p>Try a broader term or browse by category.</p></div>}
              {results.map(({ record }) => (
                <Link href={record.href} key={record.href} onClick={() => setOpen(false)}>
                  <div><span>{record.category}</span>{record.documentId && <b>{record.documentId}</b>}</div>
                  <strong>{record.title}</strong><p>{excerpt(record, query)}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
