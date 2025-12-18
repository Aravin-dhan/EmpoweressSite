"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PullQuoteProps = {
  quote: ReactNode;
  attribution?: string;
  className?: string;
};

export function PullQuote({
  quote,
  attribution,
  className,
}: PullQuoteProps) {
  return (
    <figure
      className={cn(
        "my-8 rounded-3xl border border-brand-secondary/30 bg-brand-secondary/10 p-6 text-lg italic text-brand-secondary shadow-subtle",
        className,
      )}
    >
      <blockquote>{quote}</blockquote>
      {attribution && (
        <figcaption className="mt-4 text-right text-sm not-italic text-[var(--color-muted)]">
          — {attribution}
        </figcaption>
      )}
    </figure>
  );
}
