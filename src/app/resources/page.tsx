import { buildPageMetadata } from "@/lib/metadata";
import { resourceCollections } from "@/data/resources";
import { ResourceCard } from "@/components/resources/resource-card";
import { getArchiveGroups } from "@/lib/mdx";

export const metadata = buildPageMetadata({
  title: "Resources & Archive",
  path: "/resources",
  description: "Download litigation toolkits, bibliographies, and browse the Empoweress archive by month.",
});

export default async function ResourcesPage() {
  const archives = await getArchiveGroups();

  return (
    <div className="space-y-12">
      <header className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-10 shadow-subtle">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
          Resources
        </p>
        <h1 className="mt-3 font-serif text-4xl">Toolkits, bibliographies, and archives.</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          All downloads are peer reviewed and community tested. Use them in your litigation, policy advocacy, or classrooms.
        </p>
      </header>

      <section className="space-y-8">
        {resourceCollections.map((collection) => (
          <div key={collection.title} className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
                {collection.title}
              </p>
              <p className="text-[var(--color-muted)]">{collection.description}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {collection.items.map((item) => (
                <ResourceCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-subtle">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
          Archive by Month
        </p>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {archives.map((group) => (
            <div key={group.key} className="space-y-2 rounded-2xl border border-[var(--color-border)] p-4">
              <p className="text-sm font-semibold text-[var(--color-foreground)]">{group.label}</p>
              <ul className="space-y-1 text-sm text-[var(--color-muted)]">
                {group.posts.map((post) => (
                  <li key={post.slug} className="flex items-center justify-between">
                    <span>{post.title}</span>
                    <span>{post.readingTime.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
