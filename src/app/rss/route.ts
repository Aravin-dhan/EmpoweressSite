import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/mdx";
import { siteConfig } from "@/config/site";

export async function GET() {
  const posts = await getAllPosts();
  const items = posts
    .map(
      (post) => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteConfig.url}/blog/${post.slug}</link>
        <guid>${siteConfig.url}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.excerpt}]]></description>
      </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>${siteConfig.name}</title>
      <link>${siteConfig.url}</link>
      <description>${siteConfig.description}</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
