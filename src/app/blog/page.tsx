import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { getAllPosts, getPostTags, getSearchIndex } from "@/lib/mdx";
import { CategoryTag } from "@/components/blog/category-tag";
import { PostCard } from "@/components/blog/post-card";
import { SearchBar } from "@/components/search/search-bar";
import { categories } from "@/data/categories";
import { PaginationControls } from "@/components/blog/pagination-controls";
import { BlogFiltersPanel } from "@/components/blog/blog-filters-panel";

export const metadata = buildPageMetadata({
  title: "Empoweress Blog",
  path: "/blog",
  description:
    "Feminist legal analysis spanning constitutional law, gender justice, migration, and research toolkits.",
});

type BlogPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

const sortByNewest = (a: { date: string }, b: { date: string }) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

const sortByOldest = (a: { date: string }, b: { date: string }) =>
  new Date(a.date).getTime() - new Date(b.date).getTime();

const PAGE_SIZE = 9;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const [posts, tags, searchIndex] = await Promise.all([
    getAllPosts(),
    getPostTags(),
    getSearchIndex(),
  ]);

  const categoryFilter = typeof searchParams.category === "string" ? searchParams.category : undefined;
  const tagFilter = typeof searchParams.tag === "string" ? searchParams.tag : undefined;
  const sortParam = typeof searchParams.sort === "string" ? searchParams.sort : "newest";
  const query = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const from = typeof searchParams.from === "string" ? searchParams.from : undefined;
  const to = typeof searchParams.to === "string" ? searchParams.to : undefined;
  const page = Math.max(1, Number(searchParams.page ?? 1));

  const filtersKey = (() => {
    const params = new URLSearchParams();
    Object.keys(searchParams)
      .sort()
      .forEach((key) => {
        const value = searchParams[key];
        if (typeof value === "string" && value) {
          params.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((entry) => {
            if (entry) params.append(key, entry);
          });
        }
      });
    const key = params.toString();
    return key || "root";
  })();

  const filtered = posts
    .filter((post) => {
      if (!categoryFilter) return true;
      const normalized = categoryFilter.toLowerCase();
      const category = post.category.toLowerCase();
      return (
        category === normalized ||
        category.replace(/\s+/g, "-") === normalized ||
        post.category.toLowerCase().includes(normalized)
      );
    })
    .filter((post) => (tagFilter ? post.tags.includes(tagFilter) : true))
    .filter((post) => {
      if (!query?.trim()) return true;
      const q = query.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    })
    .filter((post) => {
      if (!from && !to) return true;
      const published = new Date(post.date);
      if (from && published < new Date(from)) return false;
      if (to && published > new Date(to)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortParam === "popular") {
        const score = (post: (typeof posts)[number]) =>
          (post.priority ?? 0) * 2 +
          (post.featured ? 5 : 0) +
          (post.pinned ? 3 : 0);
        return score(b) - score(a);
      }
      if (sortParam === "oldest") {
        return sortByOldest(a, b);
      }
      return sortByNewest(a, b);
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-subtle">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
            Browse
          </p>
          <h1 className="font-serif text-3xl">Search the Empoweress archive</h1>
          <p className="text-sm text-[var(--color-muted)]">
            Start with a keyword, then expand with filters for category, tags, or dates.
          </p>
        </div>
        <div className="mt-4">
          <SearchBar items={searchIndex} />
        </div>
        <BlogFiltersPanel
          key={filtersKey}
          categories={categories.map((category) => ({
            label: category.title,
            value: category.slug,
          }))}
          tags={tags}
          initial={{
            query,
            category: categoryFilter,
            tag: tagFilter,
            from,
            to,
            sort: sortParam,
          }}
        />
        <div className="mt-4 overflow-x-auto">
          <div className="flex min-w-max gap-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog?category=${category.slug}`}
                className="transition hover:-translate-y-0.5"
              >
                <CategoryTag label={category.title} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-sm text-[var(--color-muted)]">
          Showing {paginated.length} of {filtered.length} article{filtered.length === 1 ? "" : "s"}
        </p>
        {paginated.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-brand-primary/40 p-8 text-center">
            <p className="font-semibold text-[var(--color-foreground)]">No essays yet.</p>
            <p className="text-sm text-[var(--color-muted)]">
              Adjust your filters or browse the latest posts from the archive above.
            </p>
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
