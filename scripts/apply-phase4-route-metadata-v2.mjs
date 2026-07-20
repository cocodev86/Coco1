import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const changed = [];

async function update(relativePath, transform) {
  const filePath = path.join(root, relativePath);
  const before = await readFile(filePath, "utf8");
  const after = transform(before);
  if (after === before) return;
  await writeFile(filePath, after);
  changed.push(relativePath);
}

function addMetadataHelperImport(source) {
  if (source.includes('from "@/lib/metadata"')) return source;
  const marker = 'import type { Metadata } from "next";\n';
  if (!source.includes(marker)) throw new Error("Metadata import marker not found.");
  return source.replace(marker, `${marker}import { createPageMetadata } from "@/lib/metadata";\n`);
}

function replaceStaticMetadata(source, { title, description, path: routePath }) {
  source = addMetadataHelperImport(source);
  const replacement = `export const metadata: Metadata = createPageMetadata({\n  title: ${JSON.stringify(title)},\n  description: ${JSON.stringify(description)},\n  path: ${JSON.stringify(routePath)},\n});`;
  const pattern = /export const metadata: Metadata = \{[\s\S]*?\n\};/;
  if (!pattern.test(source)) throw new Error(`Static metadata block not found for ${routePath}.`);
  return source.replace(pattern, replacement);
}

function replaceExportedFunction(source, functionName, replacement) {
  const marker = `export async function ${functionName}`;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`${functionName} was not found.`);
  const open = source.indexOf("{", start);
  if (open < 0) throw new Error(`${functionName} opening brace was not found.`);

  let depth = 0;
  let end = -1;
  for (let index = open; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") {
      depth -= 1;
      if (depth === 0) {
        end = index + 1;
        break;
      }
    }
  }

  if (end < 0) throw new Error(`${functionName} closing brace was not found.`);
  return `${source.slice(0, start)}${replacement}${source.slice(end)}`;
}

const staticRoutes = [
  ["app/blog/page.tsx", "AI Automation Insights", "Practical guides, automation ideas, and digital growth strategies for small businesses building smarter systems.", "/blog"],
  ["app/blog/search/page.tsx", "Search Insights", "Search Metaphor Consulting articles by automation topic, business challenge, category, or tag.", "/blog/search"],
  ["app/blog/case-studies/page.tsx", "Automation Case Studies", "Explore practical automation system designs for service businesses and independent consultants.", "/blog/case-studies"],
  ["app/automation-library/page.tsx", "Automation Library", "Explore practical automation playbooks for lead capture, booking, customer response, sales operations, and client delivery.", "/automation-library"],
  ["app/automation-explorer/page.tsx", "AI Automation Explorer", "Assess your workflow, estimate recoverable time, and receive a prioritized automation roadmap based on your business profile.", "/automation-explorer"],
  ["app/resources/page.tsx", "Business Automation Resources", "Free checklists, calculators, worksheets, templates, and guides for automation, CRM, lead capture, conversion, and client operations.", "/resources"],
  ["app/newsletter/page.tsx", "The Metaphor Memo", "A practical newsletter about AI automation, lead systems, CRM operations, web strategy, and better client delivery.", "/newsletter"],
];

for (const [file, title, description, routePath] of staticRoutes) {
  await update(file, (source) => replaceStaticMetadata(source, { title, description, path: routePath }));
}

await update("app/blog/[slug]/page.tsx", (source) => {
  source = addMetadataHelperImport(source);
  return replaceExportedFunction(source, "generateMetadata", `export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};

  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: \`/blog/\${article.slug}\`,
    type: "article",
    keywords: article.tags,
    authors: [article.author],
    publishedTime: article.date,
    modifiedTime: article.updated ?? article.date,
    tags: article.tags,
  });
}`);
});

await update("app/blog/category/[slug]/page.tsx", (source) => {
  source = addMetadataHelperImport(source);
  return replaceExportedFunction(source, "generateMetadata", `export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) return {};

  return createPageMetadata({
    title: \`\${category.name} Articles\`,
    description: \`Practical \${category.name.toLowerCase()} guides and strategies for growing businesses.\`,
    path: \`/blog/category/\${slug}\`,
  });
}`);
});

await update("app/blog/tag/[slug]/page.tsx", (source) => {
  source = addMetadataHelperImport(source);
  return replaceExportedFunction(source, "generateMetadata", `export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!tags.includes(slug)) return {};
  const title = titleFromSlug(slug);

  return createPageMetadata({
    title: \`\${title} Articles\`,
    description: \`Articles and practical guidance tagged \${title}.\`,
    path: \`/blog/tag/\${slug}\`,
  });
}`);
});

await update("app/blog/case-studies/[slug]/page.tsx", (source) => {
  source = addMetadataHelperImport(source);
  return replaceExportedFunction(source, "generateMetadata", `export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return createPageMetadata({
    title: study.title,
    description: study.summary,
    path: \`/blog/case-studies/\${study.slug}\`,
    type: "article",
  });
}`);
});

await update("app/automation-library/[slug]/page.tsx", (source) => {
  source = addMetadataHelperImport(source);
  return replaceExportedFunction(source, "generateMetadata", `export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const playbook = automations.find((item) => item.slug === slug);
  if (!playbook) return {};

  return createPageMetadata({
    title: \`\${playbook.title} Automation\`,
    description: playbook.summary,
    path: \`/automation-library/\${playbook.slug}\`,
    type: "article",
  });
}`);
});

await update("app/resources/[slug]/page.tsx", (source) => {
  source = addMetadataHelperImport(source);
  return replaceExportedFunction(source, "generateMetadata", `export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resource = resources.find((item) => item.slug === slug);
  if (!resource) return {};

  return createPageMetadata({
    title: resource.title,
    description: resource.description,
    path: \`/resources/\${resource.slug}\`,
    type: "article",
  });
}`);
});

await update("app/newsletter/[slug]/page.tsx", (source) => {
  source = addMetadataHelperImport(source);
  return replaceExportedFunction(source, "generateMetadata", `export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const issue = newsletterIssues.find((item) => item.slug === slug);
  if (!issue) return {};

  return createPageMetadata({
    title: issue.title,
    description: issue.summary,
    path: \`/newsletter/\${issue.slug}\`,
    type: "article",
    authors: ["Coco"],
  });
}`);
});

await update("lib/brand.ts", (source) => source.replace(
  'process.env.NEXT_PUBLIC_SITE_URL ?? "https://metaphor.dev"',
  'process.env.NEXT_PUBLIC_SITE_URL ?? "https://metaphor-consulting.vercel.app"',
));

await update("app/sitemap.ts", (source) => {
  source = source.replace('import { articles } from "@/app/blog/data";', 'import { articles, categories, tags } from "@/app/blog/data";');
  source = source.replace(
    '    ...articles.map((item) => `/blog/${item.slug}`),',
    '    ...articles.map((item) => `/blog/${item.slug}`),\n    ...categories.map((item) => `/blog/category/${item.slug}`),\n    ...tags.map((slug) => `/blog/tag/${slug}`),',
  );
  return source;
});

console.log(changed.length > 0
  ? `Updated ${changed.length} Phase 4 files:\n${changed.map((file) => `- ${file}`).join("\n")}`
  : "Phase 4 metadata routes were already normalized.");
