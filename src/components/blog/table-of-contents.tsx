"use client";

import { useEffect, useState } from "react";
import type { TocHeading } from "@/types/content";
import Link from "next/link";
import { cn } from "@/lib/utils";

type TocProps = {
  headings: TocHeading[];
};

export function TableOfContents({ headings }: TocProps) {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -60% 0px" },
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-28 hidden max-h-[70vh] flex-col gap-2 rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-sm shadow-subtle lg:flex">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-secondary">
        On this page
      </p>
      <ul className="mt-4 space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <Link
              href={`#${heading.id}`}
              className={cn(
                "block rounded-xl px-3 py-2 text-[var(--color-muted)] transition",
                heading.level === 3 && "ml-4 text-xs",
                active === heading.id &&
                  "bg-brand-primary/10 font-semibold text-brand-primary",
              )}
            >
              {heading.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
