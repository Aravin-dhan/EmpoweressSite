import Script from "next/script";
import { siteConfig } from "@/config/site";
import type { PostRecord } from "@/types/content";

type ArticleJsonLdProps = {
  post: PostRecord;
};

export function ArticleJsonLd({ post }: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.title,
      affiliation: post.author.organization ?? siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.svg`,
      },
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.lastUpdated ?? post.date,
    keywords: post.tags.join(", "),
  };

  return (
    <Script
      id={`jsonld-article-${post.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
