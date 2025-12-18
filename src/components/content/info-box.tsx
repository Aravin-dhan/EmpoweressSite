"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "info" | "warning" | "success";

const variantClasses: Record<Variant, string> = {
  info: "border-brand-primary/40 bg-brand-primary/5 text-brand-primary",
  warning: "border-amber-500/40 bg-amber-50 text-amber-700 dark:bg-amber-500/10",
  success: "border-emerald-500/40 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10",
};

type InfoBoxProps = {
  title?: string;
  variant?: Variant;
  children: ReactNode;
};

export function InfoBox({
  title,
  children,
  variant = "info",
}: InfoBoxProps) {
  return (
    <div
      className={cn(
        "my-6 rounded-2xl border px-6 py-4 text-sm leading-relaxed shadow-subtle",
        variantClasses[variant],
      )}
    >
      {title && (
        <p className="text-xs font-semibold uppercase tracking-[0.3em]">
          {title}
        </p>
      )}
      <div className="mt-2 space-y-2 text-[var(--color-foreground)]">
        {children}
      </div>
    </div>
  );
}
