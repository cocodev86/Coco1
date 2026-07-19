export type ArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  tags: string[];
  readingTime: string;
  date: string;
  updated?: string;
  author: string;
  accent: "purple" | "lime" | "ink";
  keyTakeaways: string[];
  sections: ArticleSection[];
};

export const articles: BlogArticle[] = [
  {
    slug: "business-tasks-to-automate-before-hiring",
    title: "7 Business Tasks You Should Automate Before Hiring More Staff",
    excerpt: "A practical framework for identifying repetitive work, choosing the right tools, and calculating whether automation is worth the investment.",
    category: "AI Automation",
    categorySlug: "ai-automation",
    tags: ["workflow-design", "small-business", "productivity"],
    readingTime: "8 min read",
    date: "July 19, 2026",
    author: "Coco",
    accent: "purple",
    keyTakeaways: [
      "Automate stable, repetitive work before adding payroll.",
      "Start with lead response, scheduling, intake, follow-up, and reporting.",
      "Measure time saved, error reduction, and conversion lift before expanding the system.",
    ],
    sections: [
      {
        id: "automation-before-headcount",
        title: "Why automation should come before headcount",
        paragraphs: [
          "Hiring is sometimes the right answer, but it is an expensive way to solve a process problem. When a team member spends hours copying information, sending the same messages, or checking whether routine work happened, the business is paying a person to compensate for a weak system.",
          "The better sequence is to simplify the workflow, automate the predictable parts, and then hire for judgment, relationships, and growth. That protects cash while giving future employees a cleaner operation to step into.",
        ],
      },
      {
        id: "tasks-to-automate",
        title: "The seven tasks to review first",
        paragraphs: [
          "The best first automations sit close to revenue or remove frequent administrative work. They should have clear triggers, repeatable rules, and an obvious definition of done.",
        ],
        bullets: [
          "New-lead acknowledgment and routing",
          "Appointment scheduling and reminders",
          "Client intake and document collection",
          "Estimate, proposal, and invoice follow-up",
          "CRM status updates and task creation",
          "Review requests after service delivery",
          "Weekly performance and pipeline reporting",
        ],
      },
      {
        id: "choose-first-workflow",
        title: "How to choose the first workflow",
        paragraphs: [
          "Score each candidate workflow by frequency, time consumed, error rate, revenue impact, and implementation difficulty. A task that happens every day, takes fifteen minutes, and causes lost leads when missed is usually a stronger first project than a complex process used once a month.",
          "Do not automate chaos. Document the current process, remove unnecessary steps, define ownership, and decide what should happen when the automation cannot complete its job.",
        ],
      },
      {
        id: "measure-return",
        title: "Measure the return before expanding",
        paragraphs: [
          "Track a small set of operational metrics before and after launch. Useful measures include response time, completion time, no-show rate, manual touches, conversion rate, and hours returned to the team.",
          "Once the first workflow is reliable, reuse the same architecture for the next bottleneck. A focused sequence of small systems usually creates more value than one oversized automation project.",
        ],
      },
    ],
  },
  {
    slug: "slow-lead-response-cost",
    title: "Why Slow Lead Response Costs Small Businesses More Than They Think",
    excerpt: "Learn where promising inquiries disappear and how an automated response system can protect more of your marketing spend.",
    category: "Lead Capture",
    categorySlug: "lead-capture",
    tags: ["lead-response", "crm", "conversion"],
    readingTime: "6 min read",
    date: "July 19, 2026",
    author: "Coco",
    accent: "lime",
    keyTakeaways: [
      "A lead is most valuable immediately after the inquiry.",
      "Fast acknowledgment does not require pretending a human is available.",
      "Routing, qualification, and follow-up should operate as one connected system.",
    ],
    sections: [
      {
        id: "hidden-cost",
        title: "The hidden cost of a slow reply",
        paragraphs: [
          "Marketing creates intent, but response operations determine whether that intent becomes revenue. When an inquiry sits in an inbox, the customer keeps searching, contacts competitors, or loses urgency.",
          "The visible loss is the missed sale. The less visible loss is wasted ad spend, inaccurate conversion data, and a pipeline filled with leads that were never truly worked.",
        ],
      },
      {
        id: "response-system",
        title: "What a useful response system does",
        paragraphs: [
          "A strong system immediately confirms receipt, sets expectations, captures missing information, and routes the lead to the correct person or next step. It should create a CRM record and preserve the original source so the business can measure which channels produce qualified opportunities.",
        ],
        bullets: [
          "Send an immediate, honest acknowledgment",
          "Ask one or two qualifying questions",
          "Offer the correct booking or callback path",
          "Create an owner and follow-up deadline",
          "Escalate high-value or urgent inquiries",
        ],
      },
      {
        id: "human-handoff",
        title: "Design the human handoff",
        paragraphs: [
          "Automation should shorten the distance to a useful human conversation, not trap the customer in a bot. Define the conditions that require manual review and make the context visible to the person taking over.",
          "The result is a faster customer experience and less time spent asking prospects to repeat information they already provided.",
        ],
      },
    ],
  },
  {
    slug: "landing-page-or-full-website",
    title: "Landing Page or Full Website: What Does Your Business Actually Need?",
    excerpt: "Choose the smallest digital system capable of achieving your current goal without paying for unnecessary pages or complexity.",
    category: "Landing Pages",
    categorySlug: "landing-pages",
    tags: ["web-strategy", "conversion", "small-business"],
    readingTime: "7 min read",
    date: "July 19, 2026",
    author: "Coco",
    accent: "ink",
    keyTakeaways: [
      "Choose the format based on the decision a visitor must make.",
      "Landing pages are best for focused campaigns and single offers.",
      "Full websites are justified when audiences, services, or trust requirements are more complex.",
    ],
    sections: [
      {
        id: "start-with-goal",
        title: "Start with the business goal",
        paragraphs: [
          "A website is not automatically more valuable because it has more pages. The right scope depends on the visitor, the offer, the traffic source, and the action the business needs someone to take.",
          "A focused landing page can outperform a larger site when the audience already understands the problem and needs a clear path to book, buy, or inquire.",
        ],
      },
      {
        id: "choose-landing-page",
        title: "Choose a landing page when focus matters",
        paragraphs: [
          "Landing pages work well for paid campaigns, new offers, event registration, lead magnets, consultations, and service launches. They reduce navigation choices and keep the message aligned with the ad, post, or referral that brought the visitor in.",
        ],
        bullets: [
          "One primary audience",
          "One offer or campaign",
          "One dominant conversion action",
          "A short path from interest to action",
        ],
      },
      {
        id: "choose-full-site",
        title: "Choose a full website when complexity is real",
        paragraphs: [
          "A multi-page site is appropriate when the business serves several audiences, needs substantial educational content, has multiple service lines, or must establish trust through detailed proof, policies, team information, and resources.",
          "The goal is not to build every possible page. It is to create a clear information architecture that helps each visitor find the right next step.",
        ],
      },
      {
        id: "smallest-system",
        title: "Build the smallest system that can win",
        paragraphs: [
          "Start with the minimum structure needed to convert and measure traffic. Add pages when customer questions, search demand, or operational needs justify them. This keeps the initial investment focused while preserving room to grow.",
        ],
      },
    ],
  },
];

export const categories = [
  { name: "AI Automation", slug: "ai-automation" },
  { name: "Landing Pages", slug: "landing-pages" },
  { name: "Lead Capture", slug: "lead-capture" },
  { name: "Business Systems", slug: "business-systems" },
  { name: "Integrations", slug: "integrations" },
  { name: "Small Business Growth", slug: "small-business-growth" },
];

export const tags = Array.from(new Set(articles.flatMap((article) => article.tags))).sort();

export function titleFromSlug(slug: string) {
  return slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
