import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { PostRecord } from "@/types/content";

export const absoluteUrl = (path = "/") =>
  new URL(path, siteConfig.url).toString();

type BaseMeta = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
};

export const buildPageMetadata = ({
  title,
  description = siteConfig.description,
  path = "/",
  image,
  keywords = siteConfig.keywords,
}: BaseMeta): Metadata => {
  const fullUrl = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: fullUrl,
      type: "website",
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image,
    },
    alternates: {
      canonical: fullUrl,
    },
  };
};

export const buildArticleMetadata = (post: PostRecord): Metadata => {
  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt;
  const image = post.seo?.image ?? post.featuredImage;
  const canonical = post.seo?.canonicalUrl ?? absoluteUrl(`/blog/${post.slug}`);

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      authors: [post.author.name],
      publishedTime: post.date,
      modifiedTime: post.lastUpdated,
      images: [{ url: image }],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical,
    },
  };
};
