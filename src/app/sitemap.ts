import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const postEntries = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.lastUpdated ?? post.date,
  }));

  const staticRoutes = ["/", "/blog", "/categories", "/about", "/resources", "/contact"].map(
    (path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date().toISOString(),
    }),
  );

  return [...staticRoutes, ...postEntries];
}
