import Script from "next/script";
import { siteConfig } from "@/config/site";
import type { PostRecord } from "@/types/content";

type BlogJsonLdProps = {
  posts: PostRecord[];
};

export function BlogJsonLd({ posts }: BlogJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Empoweress Blog",
    url: `${siteConfig.url}/blog`,
    description: "Feminist legal analysis spanning constitutional law, gender justice, migration, and research toolkits.",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.svg`,
      },
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.lastUpdated ?? post.date,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
    })),
  };

  return (
    <Script
      id="jsonld-blog"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
