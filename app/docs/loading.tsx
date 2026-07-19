import styles from "./docs.module.css";

export default function DocsLoading() {
  return <div className={styles.loading} aria-label="Loading documentation"><span /><span /><span /></div>;
}
