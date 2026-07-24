import Link from "next/link";
import styles from "./docs.module.css";

export default function DocsNotFound() {
  return <div className={styles.notFound}><span>404</span><h1>This documentation route does not exist.</h1><p>The source may have moved, been renamed, or not yet been published.</p><Link className={styles.primaryButton} href="/docs">Return to documentation</Link></div>;
}
