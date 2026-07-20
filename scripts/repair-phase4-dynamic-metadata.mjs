import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const changed = [];

async function replaceMetadataFunction(relativePath, replacement) {
  const filePath = path.join(root, relativePath);
  const before = await readFile(filePath, "utf8");
  const pattern = /export async function generateMetadata[\s\S]*?\n\}\n\nexport default/;
  if (!pattern.test(before)) throw new Error(`Metadata function boundary not found in ${relativePath}.`);
  const after = before.replace(pattern, `${replacement}\n\nexport default`);
  if (after === before) return;
  await writeFile(filePath, after);
  changed.push(relativePath);
}

await replaceMetadataFunction("app/blog/[slug]/page.tsx", `export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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

await replaceMetadataFunction("app/blog/category/[slug]/page.tsx", `export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) return {};

  return createPageMetadata({
    title: \`\${category.name} Articles\`,
    description: \`Practical \${category.name.toLowerCase()} guides and strategies for growing businesses.\`,
    path: \`/blog/category/\${slug}\`,
  });
}`);

await replaceMetadataFunction("app/blog/tag/[slug]/page.tsx", `export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!tags.includes(slug)) return {};
  const title = titleFromSlug(slug);

  return createPageMetadata({
    title: \`\${title} Articles\`,
    description: \`Articles and practical guidance tagged \${title}.\`,
    path: \`/blog/tag/\${slug}\`,
  });
}`);

await replaceMetadataFunction("app/blog/case-studies/[slug]/page.tsx", `export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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

await replaceMetadataFunction("app/automation-library/[slug]/page.tsx", `export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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

await replaceMetadataFunction("app/resources/[slug]/page.tsx", `export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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

await replaceMetadataFunction("app/newsletter/[slug]/page.tsx", `export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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

console.log(`Repaired ${changed.length} dynamic metadata files:\n${changed.map((file) => `- ${file}`).join("\n")}`);
