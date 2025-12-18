import Link from "next/link";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

type ResourceCardProps = {
  title: string;
  description: string;
  category: string;
  href: string;
  format?: "pdf" | "article" | "dataset";
};

const formatMap = {
  pdf: "PDF",
  article: "Article",
  dataset: "Dataset",
};

export function ResourceCard({
  title,
  description,
  category,
  href,
  format = "article",
}: ResourceCardProps) {
  return (
    <article className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-subtle">
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-brand-secondary">
        <span>{category}</span>
        <span className="rounded-full border border-brand-primary/30 px-3 py-1">
          {formatMap[format]}
        </span>
      </div>
      <h3 className="mt-4 font-serif text-2xl font-semibold text-[var(--color-foreground)]">
        {title}
      </h3>
      <p className="mt-2 text-[var(--color-muted)]">{description}</p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-primary hover:underline"
      >
        Download
        <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
