import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length <= 1) return null;

  return (
    <nav className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-2">
          {item.href ? (
            <Link
              href={item.href}
              className="font-medium text-brand-primary hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-[var(--color-foreground)]">
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <ChevronRightIcon className="h-4 w-4 text-[var(--color-muted)]" />
          )}
        </span>
      ))}
    </nav>
  );
}
