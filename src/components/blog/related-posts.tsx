import type { PostSummary } from "@/types/content";
import { PostCard } from "./post-card";

type RelatedPostsProps = {
  posts: PostSummary[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
          Continue Reading
        </p>
        <h3 className="font-serif text-3xl font-semibold text-[var(--color-foreground)]">
          Related Articles
        </h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.slice(0, 2).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
