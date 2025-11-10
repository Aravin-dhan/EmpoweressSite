import Image from "next/image";
import Link from "next/link";
import type { PostSummary } from "@/types/content";
import { CategoryTag } from "./category-tag";
import { formatDate } from "@/lib/utils";
import { ShareInlineButton } from "./share-inline-button";
import { siteConfig } from "@/config/site";

type FeaturedPostCardProps = {
  post: PostSummary;
};

export function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  return (
    <article className="grid gap-8 rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-surface-muted to-surface-base p-8 shadow-glow lg:grid-cols-2">
      <div className="relative overflow-hidden rounded-3xl pb-[70%] lg:pb-0 lg:min-h-[320px]">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="h-full w-full object-cover transition duration-700 hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="flex flex-col justify-between gap-6">
        <div className="space-y-4">
          <CategoryTag label={post.category} />
          <p className="text-xs uppercase tracking-[0.3em] text-brand-secondary">
            Featured Analysis
          </p>
          <Link href={`/blog/${post.slug}`}>
            <h3 className="font-serif text-3xl font-semibold text-[var(--color-foreground)] hover:text-brand-primary">
              {post.title}
            </h3>
          </Link>
          <p className="text-lg text-[var(--color-muted)]">{post.excerpt}</p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--color-muted)]">
          <span>{formatDate(post.date)}</span>
          <span>{post.readingTime.text}</span>
          <div className="inline-flex items-center gap-2">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-brand-primary/10" />
            <div>
              <p className="font-semibold text-[var(--color-foreground)]">
                {post.author.name}
              </p>
              <p className="text-xs text-[var(--color-muted)]">
                {post.author.title}
              </p>
            </div>
          </div>
          <ShareInlineButton title={post.title} url={postUrl} className="ml-auto" />
        </div>
      </div>
    </article>
  );
}
