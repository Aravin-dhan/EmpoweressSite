import Image from "next/image";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { NewsletterSignup } from "@/components/newsletter/newsletter-card";
import { editorialTeam } from "@/data/editorial";

export const metadata = buildPageMetadata({
  title: "About Empoweress",
  path: "/about",
  description:
    "Empoweress is a feminist publication combining rigorous legal research with design-led storytelling.",
});

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <header className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-10 shadow-subtle">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">About</p>
        <h1 className="mt-3 font-serif text-4xl">Who we are.</h1>
        <p className="mt-2 text-lg text-[var(--color-muted)]">
          Empoweress is a feminist research collective documenting litigation strategies, designing toolkits,
          and archiving constitutional history from gendered lenses.
        </p>
      </header>

      <section className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-subtle">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
          Editorial Team
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {editorialTeam.map((member) => (
            <article
              key={member.name}
              className="space-y-3 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              <div className="relative h-40 w-full overflow-hidden rounded-2xl">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-2xl">{member.name}</h3>
                <p className="text-sm uppercase tracking-wide text-brand-primary">
                  {member.role}
                </p>
                <p className="text-sm text-[var(--color-muted)]">{member.focus}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
                {member.socials.map((social) => (
                  <Link
                    key={social.href}
                    href={social.href}
                    className="rounded-full border border-brand-primary/40 px-3 py-1 text-brand-primary hover:bg-brand-primary/10"
                  >
                    {social.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <NewsletterSignup />
    </div>
  );
}
