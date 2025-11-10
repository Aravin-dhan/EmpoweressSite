import Link from "next/link";

type SocialLink = {
  label: string;
  href: string;
};

type SocialLinksProps = {
  links: SocialLink[];
  className?: string;
};

export function SocialLinks({ links, className }: SocialLinksProps) {
  if (!links.length) return null;

  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/20 text-brand-primary transition hover:bg-brand-primary/10"
            aria-label={link.label}
          >
            {link.label.slice(0, 2)}
          </Link>
        ))}
      </div>
    </div>
  );
}
