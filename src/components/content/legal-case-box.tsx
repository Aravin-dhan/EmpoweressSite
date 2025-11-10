"use client";

import type { ReactNode } from "react";

type LegalCaseBoxProps = {
  title: string;
  citation?: string;
  holding?: string;
  children?: ReactNode;
};

export function LegalCaseBox({
  title,
  citation,
  holding,
  children,
}: LegalCaseBoxProps) {
  return (
    <div className="my-6 rounded-2xl border border-brand-primary/30 bg-white/80 p-5 shadow-subtle dark:bg-surface-dark/70">
      <p className="text-xs uppercase tracking-[0.4em] text-brand-primary">
        Legal Case
      </p>
      <h4 className="mt-1 font-serif text-2xl text-[var(--color-foreground)]">
        {title}
      </h4>
      {citation && (
        <p className="text-sm font-medium text-[var(--color-muted)]">
          {citation}
        </p>
      )}
      {holding && (
        <p className="mt-3 text-sm text-[var(--color-foreground)]">
          <span className="font-semibold text-brand-primary">Holding:</span>{" "}
          {holding}
        </p>
      )}
      {children && <div className="mt-3 text-sm text-[var(--color-muted)]">{children}</div>}
    </div>
  );
}
