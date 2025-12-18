import Link from "next/link";
import { siteConfig } from "@/config/site";
import { SocialIcon } from "@/components/ui/social-icon";

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[var(--color-border)] bg-surface-muted/30 print:hidden">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-serif text-2xl font-semibold text-brand-primary">
            Empoweress
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            {siteConfig.description}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-secondary">
              Navigate
            </p>
            <ul className="mt-3 space-y-2">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[var(--color-muted)] hover:text-brand-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-secondary">
              Legal
            </p>
            <ul className="mt-3 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-muted)] hover:text-brand-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-4 text-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-secondary">
            Connect
          </p>
          <p className="text-[var(--color-muted)]">{siteConfig.contactEmail}</p>
          <p>
            <Link href="/contact" className="font-semibold text-brand-primary hover:underline">
              Collaborate with us →
            </Link>
          </p>
          <div className="flex gap-3">
            {Object.entries(siteConfig.social).map(([key, href]) => (
              <Link
                key={key}
                href={href}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-primary/30 text-brand-primary transition hover:bg-brand-primary/10"
                aria-label={key}
              >
                <SocialIcon
                  platform={key as "twitter" | "linkedin" | "instagram"}
                  className="h-5 w-5"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] py-8 text-center text-sm text-[var(--color-muted)]">
        © {new Date().getFullYear()} Empoweress. All rights reserved.
      </div>
    </footer>
  );
}
