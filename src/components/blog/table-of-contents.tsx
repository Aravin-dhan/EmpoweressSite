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
    <nav className="flex flex-col gap-2 text-sm">
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <Link
              href={`#${heading.id}`}
              className={cn(
                "block rounded-md px-2 py-1.5 transition hover:text-brand-primary",
                heading.level === 3 && "ml-4 text-xs",
                active === heading.id 
                  ? "font-semibold text-brand-primary bg-brand-primary/5" 
                  : "text-[var(--color-muted)]"
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
