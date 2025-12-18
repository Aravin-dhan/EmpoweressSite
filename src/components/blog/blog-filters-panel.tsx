"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { BlogFilters } from "./blog-filters";
import { cn } from "@/lib/utils";

type CategoryOption = {
  label: string;
  value: string;
};

type TagOption = {
  name: string;
  count: number;
};

type BlogFiltersPanelProps = {
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

export function BlogFiltersPanel({
  categories,
  tags,
  initial,
}: BlogFiltersPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4 space-y-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm font-semibold text-[var(--color-foreground)] transition hover:border-brand-primary",
          open && "border-brand-primary bg-brand-primary/5 text-brand-primary",
        )}
      >
        <span>Advanced filters</span>
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 transition",
            open && "rotate-180 text-brand-primary",
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <BlogFilters categories={categories} tags={tags} initial={initial} />
      )}
    </div>
  );
}
