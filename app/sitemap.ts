import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/metadata";
import { articles } from "@/app/blog/data";
import { caseStudies } from "@/app/blog/case-studies/data";
import { automations } from "@/app/automation-library/data";
import { resources } from "@/app/resources/data";
import { newsletterIssues } from "@/app/newsletter/data";

const staticRoutes = [
  "/",
  "/blog",
  "/blog/search",
  "/blog/case-studies",
  "/automation-library",
  "/automation-explorer",
  "/resources",
  "/newsletter",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const dynamicRoutes = [
    ...articles.map((item) => `/blog/${item.slug}`),
    ...caseStudies.map((item) => `/blog/case-studies/${item.slug}`),
    ...automations.map((item) => `/automation-library/${item.slug}`),
    ...resources.map((item) => `/resources/${item.slug}`),
    ...newsletterIssues.map((item) => `/newsletter/${item.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length <= 3 ? 0.8 : 0.6,
  }));
}
