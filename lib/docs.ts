import "server-only";

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

export const DOC_CATEGORIES = [
  { slug: "mos", code: "MOS", title: "Metaphor Operating System", description: "Company constitution, architecture, engineering, product, and AI standards." },
  { slug: "playbook", code: "MPB", title: "Metaphor Playbook", description: "Operating, knowledge, agent-governance, and delivery playbooks." },
  { slug: "client-operations", code: "MCO", title: "Client Operations", description: "Client experience and client-success operating standards." },
  { slug: "platform", code: "MCP", title: "Metaphor Platform", description: "Command Center, enterprise architecture, developer platform, and Metaphor OS." },
  { slug: "strategy", code: "MST", title: "Metaphor Strategy", description: "Executive strategy, sequencing, investment priorities, and roadmaps." },
  { slug: "templates", code: "TPL", title: "Templates", description: "Reusable PRD, TDD, and ADR starter documents." },
] as const;

export type DocCategory = (typeof DOC_CATEGORIES)[number];

export type TocItem = {
  depth: number;
  id: string;
  title: string;
};

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
  category: DocCategory | null;
  sourcePath: string;
  sourceHref: string;
  markdown: string;
  bodyText: string;
  metadata: DocMetadata;
  toc: TocItem[];
  order: number;
  isFullManual: boolean;
};

export type SearchRecord = Pick<DocEntry, "href" | "title" | "bodyText"> & {
  documentId?: string;
  category: string;
  headings: string[];
};

const docsRoot = path.join(process.cwd(), "docs");
const headingPattern = /^(#{1,6})\s+(.+)$/gm;
const numberedHeadingPattern = /^##\s+((?:MOS|MPB|MCP)-\d{4})\s+[—-]\s+(.+)$/gm;

function cleanInlineMarkdown(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .trim();
}

export function slugifyHeading(value: string) {
  return cleanInlineMarkdown(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function metadataValue(markdown: string, key: string) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return markdown.match(new RegExp(`^\\*\\*${escaped}:\\*\\*\\s*(.+?)\\s*$`, "mi"))?.[1]?.trim();
}

function extractMetadata(markdown: string, title: string): DocMetadata {
  const headingId = title.match(/^([A-Z]{2,4}-\d{4})\b/)?.[1];
  return {
    documentId: metadataValue(markdown, "Document ID") || headingId,
    version: metadataValue(markdown, "Version"),
    classification: metadataValue(markdown, "Classification"),
    status: metadataValue(markdown, "Status"),
    owner: metadataValue(markdown, "Owner"),
    date: metadataValue(markdown, "Last updated") || metadataValue(markdown, "Date"),
  };
}

function extractToc(markdown: string): TocItem[] {
  const seen = new Map<string, number>();
  return Array.from(markdown.matchAll(headingPattern))
    .filter((match) => match[1].length >= 2 && match[1].length <= 4)
    .map((match) => {
      const title = cleanInlineMarkdown(match[2]);
      const base = slugifyHeading(title);
      const count = seen.get(base) || 0;
      seen.set(base, count + 1);
      return { depth: match[1].length, id: count ? `${base}-${count}` : base, title };
    });
}

function toBodyText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/[#>*_`|\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleFromMarkdown(markdown: string, fallback: string) {
  return cleanInlineMarkdown(markdown.match(/^#\s+(.+)$/m)?.[1] || fallback);
}

function categoryFor(slug: string): DocCategory | null {
  return DOC_CATEGORIES.find((category) => category.slug === slug) || null;
}

function makeEntry(args: {
  slug: string[];
  markdown: string;
  sourcePath: string;
  category: DocCategory | null;
  order: number;
  title?: string;
  isFullManual?: boolean;
}): DocEntry {
  const title = args.title || titleFromMarkdown(args.markdown, args.slug.at(-1) || "Documentation");
  return {
    slug: args.slug,
    href: `/docs/${args.slug.join("/")}`,
    title,
    category: args.category,
    sourcePath: args.sourcePath,
    sourceHref: `https://github.com/cocodev86/Coco1/blob/main/${args.sourcePath}`,
    markdown: args.markdown,
    bodyText: toBodyText(args.markdown),
    metadata: extractMetadata(args.markdown, title),
    toc: extractToc(args.markdown),
    order: args.order,
    isFullManual: args.isFullManual || false,
  };
}

function walkMarkdown(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walkMarkdown(fullPath) : entry.name.endsWith(".md") ? [fullPath] : [];
  });
}

function manualSections(markdown: string) {
  const matches = Array.from(markdown.matchAll(numberedHeadingPattern));
  return matches.map((match, index) => {
    const start = match.index || 0;
    const end = matches[index + 1]?.index || markdown.length;
    const preamble = markdown.slice(0, markdown.indexOf("## ")).trim();
    const section = markdown.slice(start, end).trim().replace(/^## /, "# ");
    return { id: match[1], title: `${match[1]} — ${match[2].trim()}`, markdown: `${section}\n`, preamble };
  });
}

let cache: DocEntry[] | undefined;

export function getAllDocs(): DocEntry[] {
  if (cache) return cache;
  if (!existsSync(docsRoot)) return [];

  const entries: DocEntry[] = [];
  for (const fullPath of walkMarkdown(docsRoot)) {
    const relativePath = path.relative(process.cwd(), fullPath).replaceAll(path.sep, "/");
    if (relativePath === "docs/README.md") continue;
    const relativeToDocs = path.relative(docsRoot, fullPath).replaceAll(path.sep, "/");
    const parts = relativeToDocs.split("/");
    const fileName = parts.pop() || "";
    const category = categoryFor(parts[0]);
    const raw = readFileSync(fullPath, "utf8");
    const fileSlug = slugifyHeading(fileName.replace(/\.md$/i, ""));
    const baseSlug = [...parts, fileSlug];
    const sections = manualSections(raw);

    if (sections.length > 1 && category) {
      entries.push(makeEntry({ slug: baseSlug, markdown: raw, sourcePath: relativePath, category, order: 0, isFullManual: true }));
      sections.forEach((section, index) => {
        entries.push(makeEntry({
          slug: [category.slug, slugifyHeading(section.title)],
          markdown: section.markdown,
          sourcePath: relativePath,
          category,
          order: index + 1,
          title: section.title,
        }));
      });
    } else {
      const slug = parts.length ? baseSlug : [fileSlug];
      entries.push(makeEntry({ slug, markdown: raw, sourcePath: relativePath, category, order: 10 }));
    }
  }

  cache = entries.sort((a, b) => {
    const categoryA = a.category ? DOC_CATEGORIES.findIndex((item) => item.slug === a.category?.slug) : 99;
    const categoryB = b.category ? DOC_CATEGORIES.findIndex((item) => item.slug === b.category?.slug) : 99;
    return categoryA - categoryB || a.order - b.order || a.title.localeCompare(b.title);
  });
  return cache;
}

export function getDocBySlug(slug: string[]) {
  return getAllDocs().find((doc) => doc.slug.join("/") === slug.join("/"));
}

export function getCategoryDocs(categorySlug: string, includeManual = false) {
  return getAllDocs().filter((doc) => doc.category?.slug === categorySlug && (includeManual || !doc.isFullManual));
}

export function getAdjacentDocs(doc: DocEntry) {
  const ordered = getAllDocs().filter((entry) => !entry.isFullManual && entry.category);
  const index = ordered.findIndex((entry) => entry.href === doc.href);
  return { previous: index > 0 ? ordered[index - 1] : undefined, next: index >= 0 ? ordered[index + 1] : undefined };
}

export function getSearchIndex(): SearchRecord[] {
  return getAllDocs().filter((doc) => !doc.isFullManual).map((doc) => ({
    href: doc.href,
    title: doc.title,
    documentId: doc.metadata.documentId,
    category: doc.category?.title || "Documentation",
    headings: doc.toc.map((item) => item.title),
    bodyText: doc.bodyText,
  }));
}

export function getSourceUpdatedAt(doc: DocEntry) {
  const fullPath = path.join(process.cwd(), doc.sourcePath);
  return existsSync(fullPath) ? statSync(fullPath).mtime.toISOString() : undefined;
}

export function resolveMarkdownHref(href: string | undefined, doc: DocEntry) {
  if (!href || /^(https?:|mailto:|#)/.test(href)) return href || "#";
  const [pathname, hash] = href.split("#");
  if (!pathname.endsWith(".md") && !pathname.endsWith("/")) return href;
  const sourceDir = path.posix.dirname(doc.sourcePath.replace(/^docs\//, ""));
  const target = path.posix.normalize(path.posix.join(sourceDir, pathname)).replace(/\/?README\.md$/i, "").replace(/\.md$/i, "");
  const normalized = target.split("/").filter(Boolean).map(slugifyHeading);
  return `/docs${normalized.length ? `/${normalized.join("/")}` : ""}${hash ? `#${hash}` : ""}`;
}
