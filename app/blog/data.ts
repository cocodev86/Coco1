export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  tags: string[];
  readingTime: string;
  date: string;
  accent: "purple" | "lime" | "ink";
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
    date: "Coming soon",
    accent: "purple",
  },
  {
    slug: "slow-lead-response-cost",
    title: "Why Slow Lead Response Costs Small Businesses More Than They Think",
    excerpt: "Learn where promising inquiries disappear and how an automated response system can protect more of your marketing spend.",
    category: "Lead Capture",
    categorySlug: "lead-capture",
    tags: ["lead-response", "crm", "conversion"],
    readingTime: "6 min read",
    date: "Coming soon",
    accent: "lime",
  },
  {
    slug: "landing-page-or-full-website",
    title: "Landing Page or Full Website: What Does Your Business Actually Need?",
    excerpt: "Choose the smallest digital system capable of achieving your current goal without paying for unnecessary pages or complexity.",
    category: "Landing Pages",
    categorySlug: "landing-pages",
    tags: ["web-strategy", "conversion", "small-business"],
    readingTime: "7 min read",
    date: "Coming soon",
    accent: "ink",
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
