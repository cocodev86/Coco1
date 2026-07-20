import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const defaultOpenGraphImage = "/opengraph-image";
export const defaultTwitterImage = "/twitter-image";

export function absoluteUrl(path = "/") {
  return new URL(path, brand.url).toString();
}

function normalizeDate(value?: string) {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString();
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  keywords?: string[];
  authors?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  openGraphImage?: string;
  twitterImage?: string;
};

export function createPageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    type = "website",
    keywords,
    authors,
    publishedTime,
    modifiedTime,
    tags,
    openGraphImage = defaultOpenGraphImage,
    twitterImage = defaultTwitterImage,
  } = options;

  const canonical = absoluteUrl(path);
  const openGraphImageUrl = absoluteUrl(openGraphImage);
  const twitterImageUrl = absoluteUrl(twitterImage);
  const imageMetadata = {
    url: openGraphImageUrl,
    width: 1200,
    height: 630,
    alt: `${title} — ${brand.shortName}`,
  };

  return {
    title,
    description,
    keywords,
    authors: authors?.map((name) => ({ name })),
    alternates: { canonical },
    openGraph:
      type === "article"
        ? {
            type: "article",
            title,
            description,
            url: canonical,
            siteName: brand.shortName,
            locale: "en_US",
            images: [imageMetadata],
            publishedTime: normalizeDate(publishedTime),
            modifiedTime: normalizeDate(modifiedTime),
            authors,
            tags,
          }
        : {
            type: "website",
            title,
            description,
            url: canonical,
            siteName: brand.shortName,
            locale: "en_US",
            images: [imageMetadata],
          },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [twitterImageUrl],
    },
  };
}
