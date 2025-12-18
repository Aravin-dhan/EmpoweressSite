"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type CategoryOption = {
  label: string;
  value: string;
};

type TagOption = {
  name: string;
  count: number;
};

type BlogFiltersProps = {
  categories: CategoryOption[];
  tags: TagOption[];
  initial: {
    query?: string;
    category?: string;
    tag?: string;
    from?: string;
    to?: string;
    sort?: string;
  };
};

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "popular", label: "Most popular" },
];

export function BlogFilters({ categories, tags, initial }: BlogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initial.query ?? "");

  const updateParam = useCallback(
    (key: string, value?: string) => {
      const params = new URLSearchParams(searchParams);
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      params.delete("page");
      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    },
    [pathname, router, searchParams],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateParam("q", query.trim() || undefined);
  };

  const clearFilters = () => {
    setQuery("");
    router.push(pathname);
  };

  return (
    <section className="space-y-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-subtle">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:flex-row">
        <Input
          placeholder="Search titles, excerpts, or tags"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search blog posts"
        />
        <Button type="submit" className="md:w-auto">
          Apply
        </Button>
        <Button type="button" variant="ghost" className="md:w-auto" onClick={clearFilters}>
          Reset
        </Button>
      </form>

      <div className="grid gap-4 md:grid-cols-4">
        <label className="flex flex-col text-xs uppercase tracking-[0.3em] text-brand-secondary">
          Category
          <select
            className="mt-2 rounded-2xl border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm text-[var(--color-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
            value={initial.category ?? ""}
            onChange={(event) => updateParam("category", event.target.value || undefined)}
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col text-xs uppercase tracking-[0.3em] text-brand-secondary">
          Tag
          <select
            className="mt-2 rounded-2xl border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm text-[var(--color-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
            value={initial.tag ?? ""}
            onChange={(event) => updateParam("tag", event.target.value || undefined)}
          >
            <option value="">All</option>
            {tags.map((tag) => (
              <option key={tag.name} value={tag.name}>
                {tag.name} ({tag.count})
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col text-xs uppercase tracking-[0.3em] text-brand-secondary">
          From
          <Input
            type="date"
            className="mt-2"
            value={initial.from ?? ""}
            onChange={(event) => updateParam("from", event.target.value || undefined)}
          />
        </label>

        <label className="flex flex-col text-xs uppercase tracking-[0.3em] text-brand-secondary">
          To
          <Input
            type="date"
            className="mt-2"
            value={initial.to ?? ""}
            onChange={(event) => updateParam("to", event.target.value || undefined)}
          />
        </label>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-secondary">
          Sort by
        </p>
        <div className="flex flex-wrap gap-3">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateParam("sort", option.value)}
              className={`rounded-full border px-4 py-1 text-sm ${
                (initial.sort ?? "newest") === option.value
                  ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                  : "border-brand-primary/30 text-[var(--color-muted)] hover:border-brand-primary/60"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
