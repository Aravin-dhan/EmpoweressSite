import Link from "next/link";

type PaginationControlsProps = {
  page: number;
  totalPages: number;
  searchParams: Record<string, string | string[] | undefined>;
};

const buildHref = (
  page: number,
  searchParams: Record<string, string | string[] | undefined>,
) => {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (key === "page") return;
    if (typeof value === "string" && value) {
      params.set(key, value);
    }
    if (Array.isArray(value)) {
      value.forEach((entry) => params.append(key, entry));
    }
  });
  params.set("page", String(page));
  const query = params.toString();
  return query ? `/blog?${query}` : `/blog?page=${page}`;
};

export function PaginationControls({
  page,
  totalPages,
  searchParams,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav className="flex items-center justify-between rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 text-sm shadow-subtle">
      <span>
        Page {page} of {totalPages}
      </span>
      <div className="flex items-center gap-3">
        <Link
          aria-disabled={!hasPrev}
          className={`rounded-full px-4 py-1 ${
            hasPrev
              ? "border border-brand-primary/40 text-brand-primary hover:bg-brand-primary/10"
              : "cursor-not-allowed border border-transparent text-[var(--color-muted)]"
          }`}
          href={hasPrev ? buildHref(page - 1, searchParams) : "#"}
        >
          Previous
        </Link>
        <Link
          aria-disabled={!hasNext}
          className={`rounded-full px-4 py-1 ${
            hasNext
              ? "border border-brand-primary/40 text-brand-primary hover:bg-brand-primary/10"
              : "cursor-not-allowed border border-transparent text-[var(--color-muted)]"
          }`}
          href={hasNext ? buildHref(page + 1, searchParams) : "#"}
        >
          Next
        </Link>
      </div>
    </nav>
  );
}
