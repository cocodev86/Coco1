import styles from "./HeroSupportingCopy.module.css";

export default function HeroSupportingCopy() {
  return (
    <p className="lede">
      <span className={styles.mobile}>
        AI-powered pages and automations that capture leads, respond faster, and turn more interest into booked business.
      </span>
      <span className={styles.desktop}>
        Metaphor Consulting builds AI-driven landing pages, booking systems, lead capture, and automated follow-up that save time, improve response speed, and increase profit.
      </span>
    </p>
  );
}
