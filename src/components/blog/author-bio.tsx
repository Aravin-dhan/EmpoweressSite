import Image from "next/image";
import Link from "next/link";
import type { AuthorProfile } from "@/types/content";

type AuthorBioProps = {
  author: AuthorProfile;
};

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-subtle">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative h-20 w-20 overflow-hidden rounded-full bg-brand-primary/10">
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-brand-primary">
              {author.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1 space-y-1">
          <p className="font-serif text-2xl font-semibold text-[var(--color-foreground)]">
            {author.name}
          </p>
          {author.title && (
            <p className="text-sm text-[var(--color-muted)]">{author.title}</p>
          )}
          {author.bio && (
            <p className="text-sm text-[var(--color-muted)]">{author.bio}</p>
          )}
        </div>
      </div>

      {author.socials && author.socials.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {author.socials.map((social) => (
            <Link
              key={social.url}
              href={social.url}
              className="rounded-full border border-brand-primary/30 px-4 py-1 text-brand-primary transition hover:bg-brand-primary/10"
            >
              {social.platform}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
