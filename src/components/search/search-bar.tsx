"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
  variant?: "default" | "inverted";
};

export function SearchBar({
  items,
  placeholder = "Search articles, tags, and topics",
  className,
  variant = "default",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

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
    <form
      className={cn("relative w-full", className)}
      onSubmit={(event) => {
        event.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) return;
        router.push(`/blog?q=${encodeURIComponent(trimmed)}`);
        setQuery("");
      }}
    >
      <span
        className={cn(
          "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2",
          variant === "inverted"
            ? "text-white/70"
            : "text-[var(--color-muted)]",
        )}
      >
        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
      </span>
      <Input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className={cn(
          "pl-12",
          variant === "inverted" &&
            "border-white/40 text-white placeholder:text-white/70 focus-visible:ring-white focus-visible:ring-offset-[var(--color-card)]",
        )}
      />
      {query && (
        <div
          className={cn(
            "absolute inset-x-0 top-[calc(100%+0.5rem)] z-20 rounded-2xl border p-4 shadow-glow",
            variant === "inverted"
              ? "border-white/30 bg-[#0b0419e6] text-white"
              : "border-[var(--color-border)] bg-[var(--color-card)]",
          )}
        >
          {results.length === 0 ? (
            <p
              className={cn(
                "text-sm",
                variant === "inverted"
                  ? "text-white/70"
                  : "text-[var(--color-muted)]",
              )}
            >
              No matches yet. Try another keyword.
            </p>
          ) : (
            <ul className="space-y-3">
              {results.map((result) => (
                <li key={result.slug}>
                  <Link
                    href={`/blog/${result.slug}`}
                    className={cn(
                      "block rounded-xl p-3",
                      variant === "inverted"
                        ? "hover:bg-white/10"
                        : "hover:bg-brand-primary/5",
                    )}
                  >
                    <p className="text-sm uppercase tracking-wide text-brand-primary">
                      {result.category}
                    </p>
                    <p
                      className={cn(
                        "font-semibold",
                        variant === "inverted"
                          ? "text-white"
                          : "text-[var(--color-foreground)]",
                      )}
                    >
                      {result.title}
                    </p>
                    <p
                      className={cn(
                        "text-sm",
                        variant === "inverted"
                          ? "text-white/70"
                          : "text-[var(--color-muted)]",
                      )}
                    >
                      {result.readingTime}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}
