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

function replaceStaticMetadata(source, options) {
  source = addMetadataHelperImport(source);
  const replacement = `export const metadata: Metadata = createPageMetadata({\n  title: ${JSON.stringify(options.title)},\n  description: ${JSON.stringify(options.description)},\n  path: ${JSON.stringify(options.path)},\n});`;
  const pattern = /export const metadata: Metadata = \{[\s\S]*?\n\};/;
  if (!pattern.test(source)) throw new Error(`Static metadata block not found for ${options.path}`);
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
    const character = source[index];
    if (character === "{") depth += 1;
    if (character === "}") {
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
  {
    file: "app/blog/page.tsx",
    title: "AI Automation Insights",
    description: "Practical guides, automation ideas, and digital growth strategies for small businesses building smarter systems.",
    path: "/blog",
  },
  {
    file: "app/blog/search/page.tsx",
    title: "Search Insights",
    description: "Search Metaphor Consulting articles by automation topic, business challenge, category, or tag.",
    path: "/blog/search",
  },
  {
    file: "app/blog/case-studies/page.tsx",
    title: "Automation Case Studies",
    description: "Explore practical automation system designs for service businesses and independent consultants.",
    path: "/blog/case-studies",
  },
  {
    file: "app/automation-library/page.tsx",
    title: "Automation Library",
    description: "Explore practical automation playbooks for lead capture, booking, customer response, sales operations, and client delivery.",
    path: "/automation-library",
  },
  {
    file: "app/automation-explorer/page.tsx",
    title: "AI Automation Explorer",
    description: "Assess your workflow, estimate recoverable time, and receive a prioritized automation roadmap based on your business profile.",
    path: "/automation-explorer",
  },
  {
    file: "app/resources/page.tsx",
    title: "Business Automation Resources",
    description: "Free checklists, calculators, worksheets, templates, and guides for automation, CRM, lead capture, conversion, and client operations.",
    path: "/resources",
  },
  {
    file: "app/newsletter/page.tsx",
    title: "The Metaphor Memo",
    description: "A practical newsletter about AI automation, lead systems, CRM operations, web strategy, and better client delivery.",
    path: "/newsletter",
  },
];

for (const route of staticRoutes) {
  await update(route.file, (source) => replaceStaticMetadata(source, route));
}

await update("app/blog/[slug]/page.tsx", (source) => {
  source = addMetadataHelperImport(source);
  return replaceExportedFunction(
    source,
    "generateMetadata",
    `export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {\n  const { slug } = await params;\n  const article = articles.find((item) => item.slug === slug);\n  if (!article) return {};\n\n  return createPageMetadata({\n    title: article.title,\n    description: article.excerpt,\n    path: \`/blog/\${article.slug}\`,\n    type: "article",\n    keywords: article.tags,\n    authors: [article.author],\n    publishedTime: article.date,\n    modifiedTime: article.updated ?? article.date,\n    tags: article.tags,\n  });\n}`,
  );
});

await update("app/blog/category/[slug]/page.tsx", (source) => {
  source = addMetadataHelperImport(source);
  return replaceExportedFunction(
    source,
    "generateMetadata",
    `export async function generateMetadata({ params }: Props): Promise<Metadata> {\n  const { slug } = await params;\n  const category = categories.find((item) => item.slug === slug);\n  if (!category) return {};\n\n  return createPageMetadata({\n    title: \`\${category.name} Articles\`,\n    description: \`Practical \${category.name.toLowerCase()} guides and strategies for growing businesses.\`,\n    path: \`/blog/category/\${slug}\`,\n  });\n}`,
  );
});

await update("app/blog/tag/[slug]/page.tsx", (source) => {
  source = addMetadataHelperImport(source);
  return replaceExportedFunction(
    source,
    "generateMetadata",
    `export async function generateMetadata({ params }: Props): Promise<Metadata> {\n  const { slug } = await params;\n  if (!tags.includes(slug)) return {};\n  const title = titleFromSlug(slug);\n\n  return createPageMetadata({\n    title: \`\${title} Articles\`,\n    description: \`Articles and practical guidance tagged \${title}.\`,\n    path: \`/blog/tag/\${slug}\`,\n  });\n}`,
  );
});

await update("app/blog/case-studies/[slug]/page.tsx", (source) => {
  source = addMetadataHelperImport(source);
  return replaceExportedFunction(
    source,
    "generateMetadata",
    `export async function generateMetadata({ params }: PageProps): Promise<Metadata> {\n  const { slug } = await params;\n  const study = getCaseStudy(slug);\n  if (!study) return {};\n\n  return createPageMetadata({\n    title: study.title,\n    description: study.summary,\n    path: \`/blog/case-studies/\${study.slug}\`,\n    type: "article",\n  });\n}`,
  );
});

await update("app/automation-library/[slug]/page.tsx", (source) => {
  source = addMetadataHelperImport(source);
  return replaceExportedFunction(
    source,
    "generateMetadata",
    `export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {\n  const { slug } = await params;\n  const playbook = automations.find((item) => item.slug === slug);\n  if (!playbook) return {};\n\n  return createPageMetadata({\n    title: \`\${playbook.title} Automation\`,\n    description: playbook.summary,\n    path: \`/automation-library/\${playbook.slug}\`,\n    type: "article",\n  });\n}`,
  );
});

await update("app/resources/[slug]/page.tsx", (source) => {
  source = addMetadataHelperImport(source);
  return replaceExportedFunction(
    source,
    "generateMetadata",
    `export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {\n  const { slug } = await params;\n  const resource = resources.find((item) => item.slug === slug);\n  if (!resource) return {};\n\n  return createPageMetadata({\n    title: resource.title,\n    description: resource.description,\n    path: \`/resources/\${resource.slug}\`,\n    type: "article",\n  });\n}`,
  );
});

await update("app/newsletter/[slug]/page.tsx", (source) => {
  source = addMetadataHelperImport(source);
  return replaceExportedFunction(
    source,
    "generateMetadata",
    `export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {\n  const { slug } = await params;\n  const issue = newsletterIssues.find((item) => item.slug === slug);\n  if (!issue) return {};\n\n  return createPageMetadata({\n    title: issue.title,\n    description: issue.summary,\n    path: \`/newsletter/\${issue.slug}\`,\n    type: "article",\n    authors: ["Coco"],\n  });\n}`,
  );
});

await update("lib/brand.ts", (source) =>
  source.replace('process.env.NEXT_PUBLIC_SITE_URL ?? "https://metaphor.dev"', 'process.env.NEXT_PUBLIC_SITE_URL ?? "https://metaphor-consulting.vercel.app"'),
);

await update("app/sitemap.ts", (source) => {
  source = source.replace('import { articles } from "@/app/blog/data";', 'import { articles, categories, tags } from "@/app/blog/data";');
  source = source.replace(
    '    ...articles.map((item) => `/blog/${item.slug}`),',
    '    ...articles.map((item) => `/blog/${item.slug}`),\n    ...categories.map((item) => `/blog/category/${item.slug}`),\n    ...tags.map((slug) => `/blog/tag/${slug}`),',
  );
  return source;
});

const validator = `import { access, readFile } from "node:fs/promises";\nimport path from "node:path";\n\nconst root = process.cwd();\nconst read = (file) => readFile(path.join(root, file), "utf8");\nconst failures = [];\n\nfunction requireMatch(source, pattern, message) {\n  if (!pattern.test(source)) failures.push(message);\n}\n\nconst layout = await read("app/layout.tsx");\nrequireMatch(layout, /metadataBase:\\s*new URL\\(brand\\.url\\)/, "Root metadata must define metadataBase from brand.url.");\nrequireMatch(layout, /title:\\s*\\{[\\s\\S]*default:[\\s\\S]*template:/, "Root metadata must define a title default and template.");\nrequireMatch(layout, /alternates:\\s*\\{\\s*canonical:/, "Root metadata must define a canonical URL.");\nrequireMatch(layout, /openGraph:\\s*\\{/, "Root metadata must define Open Graph metadata.");\nrequireMatch(layout, /twitter:\\s*\\{/, "Root metadata must define Twitter metadata.");\nrequireMatch(layout, /robots:\\s*\\{/, "Root metadata must define robots directives.");\nrequireMatch(layout, /\\/opengraph-image/, "Root Open Graph metadata must use the PNG image route.");\nrequireMatch(layout, /\\/twitter-image/, "Root Twitter metadata must use the PNG image route.");\n\nconst helper = await read("lib/metadata.ts");\nrequireMatch(helper, /alternates:\\s*\\{\\s*canonical\\s*\\}/, "Metadata helper must emit a canonical URL.");\nrequireMatch(helper, /url:\\s*canonical/, "Metadata helper must emit route-correct Open Graph URLs.");\nrequireMatch(helper, /summary_large_image/, "Metadata helper must emit large Twitter cards.");\nrequireMatch(helper, /width:\\s*1200/, "Metadata helper must describe 1200-pixel social images.");\nrequireMatch(helper, /height:\\s*630/, "Metadata helper must describe 630-pixel social images.");\n\nconst openGraphImage = await read("app/opengraph-image.tsx");\nrequireMatch(openGraphImage, /width:\\s*1200/, "Open Graph image width must be 1200 pixels.");\nrequireMatch(openGraphImage, /height:\\s*630/, "Open Graph image height must be 630 pixels.");\nrequireMatch(openGraphImage, /contentType\\s*=\\s*"image\\/png"/, "Open Graph image must render as PNG.");\n\nconst staticRoutes = [\n  "app/blog/page.tsx",\n  "app/blog/search/page.tsx",\n  "app/blog/case-studies/page.tsx",\n  "app/automation-library/page.tsx",\n  "app/automation-explorer/page.tsx",\n  "app/resources/page.tsx",\n  "app/newsletter/page.tsx",\n];\n\nconst dynamicRoutes = [\n  "app/blog/[slug]/page.tsx",\n  "app/blog/category/[slug]/page.tsx",\n  "app/blog/tag/[slug]/page.tsx",\n  "app/blog/case-studies/[slug]/page.tsx",\n  "app/automation-library/[slug]/page.tsx",\n  "app/resources/[slug]/page.tsx",\n  "app/newsletter/[slug]/page.tsx",\n];\n\nfor (const file of [...staticRoutes, ...dynamicRoutes]) {\n  const source = await read(file);\n  requireMatch(source, /createPageMetadata\\(/, \\`\\${file} must use the centralized metadata helper.\\`);\n  requireMatch(source, /path:\\s*/, \\`\\${file} must define a route-specific canonical path.\\`);\n  if (/title:\\s*[\\`"'][^\\n]*\\|\\s*(Metaphor Consulting|The Metaphor Memo|Metaphor Case Study)/.test(source)) {\n    failures.push(\\`\\${file} contains a pre-branded child title that would duplicate the global title template.\\`);\n  }\n}\n\nconst sitemap = await read("app/sitemap.ts");\nfor (const routeFamily of ["/blog/category/", "/blog/tag/", "/automation-library/", "/resources/", "/newsletter/"]) {\n  if (!sitemap.includes(routeFamily)) failures.push(\\`Sitemap must include \\${routeFamily} routes.\\`);\n}\n\nconst brand = await read("lib/brand.ts");\nif (brand.includes("https://metaphor.dev")) failures.push("Canonical fallback must not use the placeholder metaphor.dev domain.");\n\nfor (const file of ["app/twitter-image.tsx", "app/robots.ts", "app/sitemap.ts"]) {\n  try {\n    await access(path.join(root, file));\n  } catch {\n    failures.push(\\`\\${file} is required.\\`);\n  }\n}\n\nif (/openGraph[\\s\\S]{0,500}\\.svg/i.test(layout) || /twitter[\\s\\S]{0,500}\\.svg/i.test(layout)) {\n  failures.push("Social preview metadata must not reference SVG images.");\n}\n\nif (failures.length > 0) {\n  console.error("Metadata validation failed:\\n");\n  for (const failure of failures) console.error(\\`- \\${failure}\\`);\n  process.exit(1);\n}\n\nconsole.log("Route metadata and social-preview validation passed.");\n`;

await update("scripts/validate-metadata.mjs", () => validator);

console.log(changed.length > 0 ? `Updated ${changed.length} Phase 4 files:\n${changed.map((file) => `- ${file}`).join("\n")}` : "Phase 4 metadata routes were already normalized.");
