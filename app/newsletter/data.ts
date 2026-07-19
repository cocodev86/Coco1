export type NewsletterSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type NewsletterIssue = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  publishedAt: string;
  readingTime: string;
  topics: string[];
  sections: NewsletterSection[];
};

export const newsletterTopics = [
  "AI automation",
  "Lead systems",
  "Web strategy",
  "CRM operations",
  "Client delivery",
];

export const newsletterIssues: NewsletterIssue[] = [
  {
    slug: "automate-the-delay-not-the-relationship",
    number: "001",
    title: "Automate the delay, not the relationship",
    summary: "A practical rule for deciding where automation should remove friction and where a human response still creates the most value.",
    publishedAt: "July 19, 2026",
    readingTime: "4 min read",
    topics: ["AI automation", "Lead systems"],
    sections: [
      {
        heading: "The useful distinction",
        paragraphs: [
          "The best small-business automations do not replace the relationship. They remove the delay before the relationship begins.",
          "A lead should not wait two hours for an acknowledgment, but a qualified prospect may still need a thoughtful human response. Automate the receipt, routing, enrichment, reminder, and scheduling. Keep judgment, reassurance, and negotiation human when those moments materially affect trust.",
        ],
      },
      {
        heading: "A simple workflow",
        paragraphs: ["Start with the point where silence currently enters the customer journey."],
        bullets: [
          "Capture the inquiry in one system of record.",
          "Send an immediate, context-aware acknowledgment.",
          "Collect the minimum information required to route the lead.",
          "Alert the correct owner with a response deadline.",
          "Escalate when the deadline passes without action.",
        ],
      },
      {
        heading: "The operating question",
        paragraphs: [
          "For every step, ask whether speed, consistency, or judgment matters most. Automate steps dominated by speed and consistency. Preserve human control where judgment carries the value.",
        ],
      },
    ],
  },
  {
    slug: "one-source-of-truth-before-more-tools",
    number: "002",
    title: "Choose one source of truth before adding more tools",
    summary: "Why fragmented customer data creates more operational risk than a missing automation—and how to fix the foundation first.",
    publishedAt: "July 19, 2026",
    readingTime: "5 min read",
    topics: ["CRM operations", "Client delivery"],
    sections: [
      {
        heading: "The hidden cost of fragmentation",
        paragraphs: [
          "Many teams do not have a software shortage. They have an authority problem: no one knows which system contains the current customer status, next action, or owner.",
          "Automation multiplies whatever process already exists. When the underlying records conflict, automation distributes the conflict faster.",
        ],
      },
      {
        heading: "Define the record",
        paragraphs: ["Before connecting tools, document what the primary customer record must contain."],
        bullets: [
          "Identity and contact information",
          "Lifecycle stage",
          "Current owner",
          "Last meaningful interaction",
          "Next required action and deadline",
          "Consent and communication preferences",
        ],
      },
      {
        heading: "Then connect the edges",
        paragraphs: [
          "Forms, calendars, inboxes, payment systems, and AI assistants should read from or write back to the source of truth. They should not become competing databases unless the architecture explicitly requires it.",
        ],
      },
    ],
  },
];
