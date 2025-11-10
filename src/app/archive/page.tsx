import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { getArchiveGroups } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { CategoryTag } from "@/components/blog/category-tag";

export const metadata = buildPageMetadata({
  title: "Empoweress Archive",
  path: "/archive",
  description:
    "Browse the Empoweress archive organized by month and year. Every essay, toolkit, and review in one chronological timeline.",
});

export default async function ArchivePage() {
  const groups = await getArchiveGroups();

  return (
    <div className="space-y-10">
      <header className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-10 shadow-subtle">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
          Archive
        </p>
        <h1 className="mt-3 font-serif text-4xl">
          Feminist litigation notes, month by month.
        </h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Dive into earlier essays or revisit breaking analyses. Filter by month, note reading times, and bookmark future
          citations.
        </p>
      </header>

      <section className="space-y-6">
        {groups.map((group) => (
          <article
            key={group.key}
            className="space-y-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-subtle"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
                  {group.label}
                </p>
                <p className="text-sm text-[var(--color-muted)]">
                  {group.posts.length} article{group.posts.length === 1 ? "" : "s"}
                </p>
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-brand-primary">
                {group.year}
              </span>
            </div>
            <ul className="divide-y divide-[var(--color-border)]">
              {group.posts.map((post) => (
                <li key={post.slug} className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-serif text-xl font-semibold text-[var(--color-foreground)] hover:text-brand-primary"
                    >
                      {post.title}
                    </Link>
                    <p className="text-sm text-[var(--color-muted)]">{post.excerpt}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[var(--color-muted)]">
                      <CategoryTag label={post.category} />
                      <span>{formatDate(post.date)}</span>
                      <span>{post.readingTime.text}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-semibold text-brand-primary hover:underline"
                  >
                    Read →
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
