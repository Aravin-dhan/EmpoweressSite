import Image from "next/image";
import Link from "next/link";
import type { PostSummary } from "@/types/content";
import { CategoryTag } from "./category-tag";
import { formatDate } from "@/lib/utils";
import { ShareInlineButton } from "./share-inline-button";
import { siteConfig } from "@/config/site";

type PostCardProps = {
  post: PostSummary;
  orientation?: "vertical" | "horizontal";
};

export function PostCard({
  post,
  orientation = "vertical",
}: PostCardProps) {
  const isVertical = orientation === "vertical";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-subtle transition hover:-translate-y-1 hover:shadow-glow">
      <div
        className={`relative overflow-hidden rounded-2xl ${isVertical ? "pb-48" : "pb-56"}`}
      >
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="mt-6 flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CategoryTag label={post.category} />
          <div className="flex items-center gap-4 text-xs uppercase tracking-wide text-[var(--color-muted)]">
            <span>{formatDate(post.date)}</span>
            <span>{post.readingTime.text}</span>
          </div>
        </div>

        <Link href={`/blog/${post.slug}`} className="space-y-3">
          <h3 className="font-serif text-2xl font-semibold text-[var(--color-foreground)] group-hover:text-brand-primary">
            {post.title}
          </h3>
          <p className="text-[var(--color-muted)]">{post.excerpt}</p>
        </Link>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2 text-sm text-[var(--color-muted)]">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand-secondary/10 px-3 py-1 text-xs font-medium text-brand-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
          <ShareInlineButton title={post.title} url={postUrl} />
        </div>
      </div>
    </article>
  );
}
