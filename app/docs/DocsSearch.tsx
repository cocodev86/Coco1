"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { SearchRecord } from "@/lib/docs";
import styles from "./docs.module.css";

export default function DocsSearch({ records }: { records: SearchRecord[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return records.slice(0, 8);
    return records
      .map((record) => {
        const haystack = [record.title, record.documentId, record.category, record.headings.join(" "), record.bodyText].join(" ").toLowerCase();
        const score = terms.reduce((total, term) => total + (record.title.toLowerCase().includes(term) ? 6 : 0) + (haystack.includes(term) ? 1 : -20), 0);
        return { record, score };
      })
      .filter((item) => item.score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((item) => item.record);
  }, [query, records]);

  return (
    <>
      <button className={styles.searchTrigger} type="button" onClick={() => setOpen(true)} aria-haspopup="dialog">
        <span aria-hidden="true">⌕</span><span>Search documentation</span><kbd>⌘K</kbd>
      </button>
      {open && (
        <div className={styles.searchOverlay} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
          <section className={styles.searchDialog} role="dialog" aria-modal="true" aria-label="Search documentation">
            <div className={styles.searchInputRow}>
              <span aria-hidden="true">⌕</span>
              <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search standards, playbooks, contracts, and templates" />
              <button type="button" onClick={() => setOpen(false)}>Esc</button>
            </div>
            <div className={styles.searchResults}>
              {results.length ? results.map((record) => (
                <Link key={record.href} href={record.href} onClick={() => setOpen(false)}>
                  <div><span>{record.category}</span>{record.documentId && <span>{record.documentId}</span>}</div>
                  <strong>{record.title}</strong>
                  <p>{record.description}</p>
                </Link>
              )) : <div className={styles.searchEmpty}><strong>No matching documentation</strong><p>Try a document identifier, policy name, platform term, or client-operations topic.</p></div>}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
