import Link from "next/link";
import type { PostSummary } from "@/types/content";
import { formatDate } from "@/lib/utils";

type RecentPostsWidgetProps = {
  posts: PostSummary[];
};

export function RecentPostsWidget({ posts }: RecentPostsWidgetProps) {
  if (!posts.length) return null;

  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-subtle">
      <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
        Recent Posts
      </p>
      <ul className="mt-4 space-y-4 text-sm">
        {posts.map((post) => (
          <li key={post.slug} className="space-y-1">
            <Link
              href={`/blog/${post.slug}`}
              className="font-semibold text-[var(--color-foreground)] hover:text-brand-primary"
            >
              {post.title}
            </Link>
            <p className="text-[var(--color-muted)]">
              {formatDate(post.date)} · {post.readingTime.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
