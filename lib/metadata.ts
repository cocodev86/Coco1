import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const defaultSocialImage = "/opengraph-image";

export function absoluteUrl(path = "/") {
  return new URL(path, brand.url).toString();
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
  image?: string;
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
    image = defaultSocialImage,
  } = options;

  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const imageMetadata = {
    url: imageUrl,
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
            publishedTime,
            modifiedTime,
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
      images: [imageUrl],
    },
  };
}
