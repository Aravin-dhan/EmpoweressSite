"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-3 z-30 px-4 sm:px-6 lg:px-8 print:hidden">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-[var(--color-border)] bg-[var(--color-card)]/80 px-6 py-4 shadow-subtle backdrop-blur-xl">
        <Link
          href="/"
          className="font-serif text-2xl font-semibold text-brand-primary"
        >
          Empoweress
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--color-muted)] lg:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition hover:text-brand-primary",
                (pathname === item.href ||
                  pathname.startsWith(`${item.href}/`)) &&
                  "text-brand-primary underline decoration-brand-primary/30",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden rounded-full border border-brand-primary/30 px-4 py-2 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary/10 md:inline-flex"
          >
            Collaborate
          </Link>
        </div>
      </div>
    </header>
  );
}
