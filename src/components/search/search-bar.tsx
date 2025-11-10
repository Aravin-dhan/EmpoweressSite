"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export type SearchIndexEntry = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  tags: string[];
};

type SearchBarProps = {
  items: SearchIndexEntry[];
  placeholder?: string;
  className?: string;
};

export function SearchBar({
  items,
  placeholder = "Search articles, tags, and topics",
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return items
      .filter((item) => {
        const matchesTag = item.tags.some((tag) => tag.toLowerCase().includes(q));
        return (
          item.title.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          matchesTag
        );
      })
      .slice(0, 6);
  }, [items, query]);

  return (
    <div className={cn("relative w-full", className)}>
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
      </span>
      <Input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="pl-12"
      />
      {query && (
        <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-20 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-glow">
          {results.length === 0 ? (
            <p className="text-sm text-[var(--color-muted)]">
              No matches yet. Try another keyword.
            </p>
          ) : (
            <ul className="space-y-3">
              {results.map((result) => (
                <li key={result.slug}>
                  <Link
                    href={`/blog/${result.slug}`}
                    className="block rounded-xl p-3 hover:bg-brand-primary/5"
                  >
                    <p className="text-sm uppercase tracking-wide text-brand-primary">
                      {result.category}
                    </p>
                    <p className="font-semibold text-[var(--color-foreground)]">
                      {result.title}
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">
                      {result.readingTime}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
