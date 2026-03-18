import { buildPageMetadata } from "@/lib/metadata";
import { getAllPosts } from "@/lib/mdx";
import { PostCard } from "@/components/blog/post-card";
import { PaginationControls } from "@/components/blog/pagination-controls";

export const metadata = buildPageMetadata({
  title: "Empoweress Blog",
  path: "/blog",
  description:
    "Feminist legal analysis spanning constitutional law, gender justice, migration, and research toolkits.",
});

type BlogPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

const PAGE_SIZE = 9;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const posts = await getAllPosts();
  const page = Math.max(1, Number(searchParams.page ?? 1));

  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-10">
      <section className="pb-2 pt-4">
        <h1 className="font-serif text-4xl text-[var(--color-foreground)]">Blogs</h1>
      </section>

      <section className="space-y-4">
        {paginated.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-brand-primary/40 p-8 text-center">
            <p className="font-semibold text-[var(--color-foreground)]">No essays yet.</p>
            <p className="text-sm text-[var(--color-muted)]">Check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginated.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      <PaginationControls page={page} totalPages={totalPages} searchParams={searchParams} />
    </div>
  );
}
