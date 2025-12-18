import Link from "next/link";
import type { PostSummary } from "@/types/content";
import { formatDate } from "@/lib/utils";

type TrendingListProps = {
  posts: PostSummary[];
};

export function TrendingList({ posts }: TrendingListProps) {
  if (posts.length === 0) return null;

  return (
    <ol className="space-y-4">
      {posts.map((post, index) => (
        <li
          key={post.slug}
          className="flex gap-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-subtle"
        >
          <span className="text-3xl font-semibold text-brand-primary lg:text-4xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="space-y-2">
            <Link
              href={`/blog/${post.slug}`}
              className="font-serif text-2xl font-semibold text-[var(--color-foreground)] hover:text-brand-primary"
            >
              {post.title}
            </Link>
            <p className="text-sm text-[var(--color-muted)]">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
              <span>{post.category}</span>
              <span>{formatDate(post.date)}</span>
              <span>{post.readingTime.text}</span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
