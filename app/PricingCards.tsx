import styles from "./PricingCards.module.css";

const plans = [
  {
    name: "Launch",
    price: "$1,250+",
    description: "For a focused offer that needs a polished online presence.",
    features: [
      "One-page conversion site",
      "Lead capture form",
      "Mobile optimization",
      "Basic analytics",
    ],
  },
  {
    name: "Automate",
    price: "$2,500+",
    description: "For businesses ready to reduce response time and manual work.",
    features: [
      "Everything in Launch",
      "Booking or CRM integration",
      "Automated lead replies",
      "Workflow setup and testing",
    ],
  },
  {
    name: "Scale",
    price: "$5,000+",
    description: "For custom systems spanning multiple tools and customer touchpoints.",
    features: [
      "Custom automation architecture",
      "Advanced integrations",
      "Database and client portal options",
      "Launch support and optimization",
    ],
  },
];

export default function PricingCards() {
  return (
    <>
      <p className={styles.swipeHint} aria-hidden="true">
        Swipe to compare <span>→</span>
      </p>
      <div className={`pricing-grid ${styles.track}`} aria-label="Pricing plans">
        {plans.map((plan, index) => (
          <article
            className={`price-card ${styles.card} ${index === 1 ? "featured" : ""}`}
            key={plan.name}
          >
            {index === 1 && <span className="popular">Most popular</span>}
            <h3>{plan.name}</h3>
            <strong>{plan.price}</strong>
            <p>{plan.description}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>
            <a href="#booking" className={index === 1 ? "button" : "button outline"}>
              Get started
            </a>
          </article>
        ))}
      </div>
    </>
  );
}
