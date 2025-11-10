"use client";

import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-2xl border border-[var(--color-border)] bg-transparent px-4 py-3 text-base text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary",
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";
