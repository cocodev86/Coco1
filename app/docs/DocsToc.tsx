"use client";

import type { TocItem } from "@/lib/docs";
import styles from "./docs.module.css";

function TocLinks({ items }: { items: TocItem[] }) {
  return <nav aria-label="On this page">{items.map((item) => <a className={item.depth > 2 ? styles.tocNested : ""} href={`#${item.id}`} key={item.id}>{item.title}</a>)}</nav>;
}

export default function DocsToc({ items, mode = "both" }: { items: TocItem[]; mode?: "desktop" | "mobile" | "both" }) {
  if (!items.length) return null;
  return (
    <>
      {mode !== "mobile" && <aside className={styles.toc}><strong>On this page</strong><TocLinks items={items} /></aside>}
      {mode !== "desktop" && <details className={styles.mobileToc}><summary>On this page <span>{items.length}</span></summary><TocLinks items={items} /></details>}
    </>
  );
}
