import Link from "next/link";
import styles from "./docs.module.css";

export default function DocsNotFound() {
  return <section className={styles.notFound}><span>404</span><h1>Documentation page not found</h1><p>The document may have moved or the link may be outdated.</p><Link className={styles.primaryButton} href="/docs">Return to documentation</Link></section>;
}
