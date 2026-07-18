import styles from "./PricingFaq.module.css";

const faqs = [
  {
    question: "How long does a build take?",
    answer:
      "Most focused landing page and automation builds take 7–14 business days. Larger or more complex systems are scoped individually, with the timeline confirmed before work begins.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes. Most projects begin with a deposit, with the remaining balance divided into milestone payments. Larger systems can also be delivered in phases.",
  },
  {
    question: "What happens after booking?",
    answer:
      "We review your request, confirm the appointment by email, and use the consultation to understand your goals, current workflow, and priorities. You then receive a clear recommendation, scope, price, and timeline with no obligation to proceed.",
  },
  {
    question: "Can you work with my existing tools?",
    answer:
      "Yes. We can improve your current setup and connect tools such as HubSpot, Stripe, Supabase, Calendly, Google Workspace, CRMs, and other platforms with available APIs.",
  },
];

export default function PricingFaq() {
  return (
    <section className={styles.faq} aria-labelledby="pricing-faq-title">
      <div className={styles.heading}>
        <p>Common questions</p>
        <h3 id="pricing-faq-title">What to know before you book.</h3>
      </div>
      <div className={styles.list}>
        {faqs.map((faq, index) => (
          <details className={styles.item} key={faq.question} open={index === 0}>
            <summary className={styles.question}>{faq.question}</summary>
            <div className={styles.answer}>
              <p>{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
