"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function QuickBrowseBar() {
  const pathname = usePathname();
  const items = siteConfig.navigation.filter((item) => item.href !== "/");

  if (items.length === 0) return null;

  return (
    <nav className="mt-2 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 pb-4 pt-5 shadow-sm sm:px-6 lg:px-8 lg:hidden">
      <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-wide transition",
                active
                  ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                  : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-brand-primary hover:text-brand-primary",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
