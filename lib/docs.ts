import "server-only";

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

export const DOC_CATEGORIES = [
  { slug: "mos", code: "MOS", title: "Metaphor Operating System", description: "Company constitution, engineering standards, product rules, and AI governance." },
  { slug: "playbook", code: "MPB", title: "Metaphor Playbook", description: "Delivery, operating, knowledge, and agent-governance playbooks." },
  { slug: "client-operations", code: "MCO", title: "Client Operations", description: "Client delivery, success, legal-template, and engagement standards." },
  { slug: "platform", code: "MCP", title: "Metaphor Platform", description: "Platform architecture, developer systems, and command-center documentation." },
  { slug: "strategy", code: "MST", title: "Metaphor Strategy", description: "Executive sequencing, priorities, investment logic, and roadmaps." },
  { slug: "templates", code: "TPL", title: "Templates", description: "Reusable product, engineering, architecture, and operating templates." },
] as const;

export type DocCategory = (typeof DOC_CATEGORIES)[number];
export type TocItem = { depth: number; id: string; title: string };
export type DocMetadata = {
  documentId?: string;
  version?: string;
  classification?: string;
  status?: string;
  owner?: string;
  date?: string;
};

export type DocEntry = {
  slug: string[];
  href: string;
  title: string;
  description: string;
  category: DocCategory | null;
  sourcePath: string;
  sourceHref: string;
  markdown: string;
  bodyText: string;
  metadata: DocMetadata;
  toc: TocItem[];
};

export type SearchRecord = {
  href: string;
  title: string;
  description: string;
  documentId?: string;
  category: string;
  headings: string[];
  bodyText: string;
};

const docsRoot = path.join(process.cwd(), "docs");
const repositoryUrl = "https://github.com/cocodev86/Coco1";
let cache: DocEntry[] | undefined;

function cleanInlineMarkdown(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .trim();
}

export function slugifyDoc(value: string) {
  return cleanInlineMarkdown(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function walkMarkdown(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walkMarkdown(fullPath) : entry.name.toLowerCase().endsWith(".md") ? [fullPath] : [];
  });
}

function metadataValue(markdown: string, key: string) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return markdown.match(new RegExp(`^\\*\\*${escaped}:\\*\\*\\s*(.+?)\\s*$`, "mi"))?.[1]?.trim();
}

function titleFromMarkdown(markdown: string, fallback: string) {
  return cleanInlineMarkdown(markdown.match(/^#\s+(.+)$/m)?.[1] || fallback);
}

function bodyText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/[#>*_`|~-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractToc(markdown: string): TocItem[] {
  const seen = new Map<string, number>();
  return Array.from(markdown.matchAll(/^(#{2,4})\s+(.+)$/gm)).map((match) => {
    const title = cleanInlineMarkdown(match[2]);
    const base = slugifyDoc(title);
    const duplicate = seen.get(base) || 0;
    seen.set(base, duplicate + 1);
    return { depth: match[1].length, id: duplicate ? `${base}-${duplicate}` : base, title };
  });
}

function categoryFor(relativeToDocs: string) {
  const first = relativeToDocs.split("/")[0];
  return DOC_CATEGORIES.find((category) => category.slug === first) || null;
}

export function routeSegmentsForSource(sourcePath: string) {
  const normalized = sourcePath.replaceAll("\\", "/").replace(/^docs\//, "");
  const parts = normalized.split("/").filter(Boolean);
  const fileName = parts.pop() || "documentation.md";
  const stem = fileName.replace(/\.md$/i, "");
  if (/^readme$/i.test(stem)) return [...parts.map(slugifyDoc), "overview"];
  return [...parts.map(slugifyDoc), slugifyDoc(stem)];
}

function createEntry(fullPath: string): DocEntry | null {
  const sourcePath = path.relative(process.cwd(), fullPath).replaceAll(path.sep, "/");
  if (sourcePath === "docs/README.md") return null;

  const relativeToDocs = sourcePath.replace(/^docs\//, "");
  const markdown = readFileSync(fullPath, "utf8");
  const slug = routeSegmentsForSource(sourcePath);
  const fallback = path.basename(fullPath, ".md").replaceAll("-", " ");
  const title = titleFromMarkdown(markdown, fallback);
  const plainText = bodyText(markdown);
  const headingId = title.match(/^([A-Z]{2,5}-\d{3,5})\b/)?.[1];

  return {
    slug,
    href: `/docs/${slug.join("/")}`,
    title,
    description: plainText.slice(0, 180),
    category: categoryFor(relativeToDocs),
    sourcePath,
    sourceHref: `${repositoryUrl}/blob/main/${sourcePath}`,
    markdown,
    bodyText: plainText,
    metadata: {
      documentId: metadataValue(markdown, "Document ID") || headingId,
      version: metadataValue(markdown, "Version"),
      classification: metadataValue(markdown, "Classification"),
      status: metadataValue(markdown, "Status"),
      owner: metadataValue(markdown, "Owner"),
      date: metadataValue(markdown, "Last updated") || metadataValue(markdown, "Date"),
    },
    toc: extractToc(markdown),
  };
}

export function getAllDocs() {
  if (cache) return cache;
  cache = walkMarkdown(docsRoot)
    .map(createEntry)
    .filter((doc): doc is DocEntry => Boolean(doc))
    .sort((a, b) => {
      const aCategory = a.category ? DOC_CATEGORIES.findIndex((item) => item.slug === a.category?.slug) : 99;
      const bCategory = b.category ? DOC_CATEGORIES.findIndex((item) => item.slug === b.category?.slug) : 99;
      return aCategory - bCategory || a.title.localeCompare(b.title);
    });
  return cache;
}

export function getDocBySlug(slug: string[]) {
  return getAllDocs().find((doc) => doc.slug.join("/") === slug.join("/"));
}

export function getCategoryDocs(categorySlug: string) {
  return getAllDocs().filter((doc) => doc.category?.slug === categorySlug);
}

export function getAdjacentDocs(doc: DocEntry) {
  const ordered = getAllDocs();
  const index = ordered.findIndex((entry) => entry.href === doc.href);
  return {
    previous: index > 0 ? ordered[index - 1] : undefined,
    next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined,
  };
}

export function getSearchIndex(): SearchRecord[] {
  return getAllDocs().map((doc) => ({
    href: doc.href,
    title: doc.title,
    description: doc.description,
    documentId: doc.metadata.documentId,
    category: doc.category?.title || "Contributor guidance",
    headings: doc.toc.map((item) => item.title),
    bodyText: doc.bodyText,
  }));
}

export function resolveMarkdownHref(href: string | undefined, doc: DocEntry) {
  if (!href) return "#";
  if (/^(https?:|mailto:|tel:|#)/i.test(href)) return href;

  const [pathname, hash] = href.split("#");
  const sourceDirectory = path.posix.dirname(doc.sourcePath);
  const target = path.posix.normalize(path.posix.join(sourceDirectory, pathname));

  if (pathname.toLowerCase().endsWith(".pdf")) {
    return `https://raw.githubusercontent.com/cocodev86/Coco1/main/${target}${hash ? `#${hash}` : ""}`;
  }

  if (pathname.toLowerCase().endsWith(".md")) {
    const route = `/docs/${routeSegmentsForSource(target).join("/")}`;
    return `${route}${hash ? `#${hash}` : ""}`;
  }

  if (pathname.endsWith("/")) {
    const route = `/docs/${pathname.split("/").filter(Boolean).map(slugifyDoc).join("/")}`;
    return `${route}${hash ? `#${hash}` : ""}`;
  }

  return href;
}
