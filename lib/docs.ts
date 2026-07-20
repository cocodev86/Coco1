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
  order: number;
  isFullManual: boolean;
  isVirtual: boolean;
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
const headingPattern = /^(#{1,6})\s+(.+)$/gm;
const numberedHeadingPattern = /^##\s+((?:MOS|MPB|MCP)-\d{4})\s+[—-]\s+(.+)$/gm;
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

function toBodyText(markdown: string) {
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
  return Array.from(markdown.matchAll(headingPattern))
    .filter((match) => match[1].length >= 2 && match[1].length <= 4)
    .map((match) => {
      const title = cleanInlineMarkdown(match[2]);
      const base = slugifyDoc(title);
      const duplicate = seen.get(base) || 0;
      seen.set(base, duplicate + 1);
      return { depth: match[1].length, id: duplicate ? `${base}-${duplicate}` : base, title };
    });
}

function extractMetadata(markdown: string, title: string, documentId?: string): DocMetadata {
  const headingId = title.match(/^([A-Z]{2,5}-\d{3,5})\b/)?.[1];
  return {
    documentId: documentId || metadataValue(markdown, "Document ID") || headingId,
    version: metadataValue(markdown, "Version"),
    classification: metadataValue(markdown, "Classification"),
    status: metadataValue(markdown, "Status"),
    owner: metadataValue(markdown, "Owner"),
    date: metadataValue(markdown, "Last updated") || metadataValue(markdown, "Date"),
  };
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
  if (/^(readme|index)$/i.test(stem)) return parts.map(slugifyDoc);
  return [...parts.map(slugifyDoc), slugifyDoc(stem)];
}

function manualSections(markdown: string) {
  const matches = Array.from(markdown.matchAll(numberedHeadingPattern));
  return matches.map((match, index) => {
    const start = match.index || 0;
    const end = matches[index + 1]?.index || markdown.length;
    const section = markdown.slice(start, end).trim().replace(/^## /, "# ");
    return {
      id: match[1],
      title: `${match[1]} — ${match[2].trim()}`,
      markdown: `${section}\n`,
    };
  });
}

function makeEntry(args: {
  slug: string[];
  markdown: string;
  sourcePath: string;
  category: DocCategory | null;
  order: number;
  title?: string;
  metadataSource?: string;
  documentId?: string;
  isFullManual?: boolean;
  isVirtual?: boolean;
}): DocEntry {
  const title = args.title || titleFromMarkdown(args.markdown, args.slug.at(-1) || "Documentation");
  const plainText = toBodyText(args.markdown);
  return {
    slug: args.slug,
    href: `/docs/${args.slug.join("/")}`,
    title,
    description: plainText.slice(0, 180),
    category: args.category,
    sourcePath: args.sourcePath,
    sourceHref: `${repositoryUrl}/blob/main/${args.sourcePath}`,
    markdown: args.markdown,
    bodyText: plainText,
    metadata: extractMetadata(args.metadataSource || args.markdown, title, args.documentId),
    toc: extractToc(args.markdown),
    order: args.order,
    isFullManual: args.isFullManual || false,
    isVirtual: args.isVirtual || false,
  };
}

export function getAllDocs(): DocEntry[] {
  if (cache) return cache;
  if (!existsSync(docsRoot)) return [];

  const entries: DocEntry[] = [];
  for (const fullPath of walkMarkdown(docsRoot)) {
    const sourcePath = path.relative(process.cwd(), fullPath).replaceAll(path.sep, "/");
    if (sourcePath === "docs/README.md") continue;

    const relativeToDocs = sourcePath.replace(/^docs\//, "");
    const category = categoryFor(relativeToDocs);
    const raw = readFileSync(fullPath, "utf8");
    const baseSlug = routeSegmentsForSource(sourcePath);
    const sections = manualSections(raw);

    if (sections.length > 1 && category) {
      entries.push(makeEntry({
        slug: baseSlug,
        markdown: raw,
        sourcePath,
        category,
        order: 0,
        isFullManual: true,
      }));
      sections.forEach((section, index) => {
        entries.push(makeEntry({
          slug: [category.slug, slugifyDoc(section.title)],
          markdown: section.markdown,
          sourcePath,
          category,
          order: index + 1,
          title: section.title,
          metadataSource: raw,
          documentId: section.id,
          isVirtual: true,
        }));
      });
    } else {
      entries.push(makeEntry({ slug: baseSlug, markdown: raw, sourcePath, category, order: 100 }));
    }
  }

  const routeOwners = new Map<string, string>();
  for (const entry of entries) {
    const existing = routeOwners.get(entry.href);
    if (existing && existing !== entry.sourcePath) {
      throw new Error(`Documentation route collision at ${entry.href}: ${existing} and ${entry.sourcePath}`);
    }
    routeOwners.set(entry.href, entry.sourcePath);
  }

  cache = entries.sort((a, b) => {
    const aCategory = a.category ? DOC_CATEGORIES.findIndex((item) => item.slug === a.category?.slug) : 99;
    const bCategory = b.category ? DOC_CATEGORIES.findIndex((item) => item.slug === b.category?.slug) : 99;
    return aCategory - bCategory || a.order - b.order || a.title.localeCompare(b.title);
  });
  return cache;
}

export function getDocBySlug(slug: string[]) {
  return getAllDocs().find((doc) => doc.slug.join("/") === slug.join("/"));
}

export function getCategoryDocs(categorySlug: string, includeManual = false) {
  return getAllDocs().filter((doc) => doc.category?.slug === categorySlug && (includeManual || !doc.isFullManual));
}

export function getCategoryManual(categorySlug: string) {
  return getAllDocs().find((doc) => doc.category?.slug === categorySlug && doc.isFullManual);
}

export function getAdjacentDocs(doc: DocEntry) {
  const ordered = getAllDocs().filter((entry) => !entry.isFullManual);
  const index = ordered.findIndex((entry) => entry.href === doc.href);
  return {
    previous: index > 0 ? ordered[index - 1] : undefined,
    next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined,
  };
}

export function getSearchIndex(): SearchRecord[] {
  return getAllDocs().filter((doc) => !doc.isFullManual).map((doc) => ({
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
