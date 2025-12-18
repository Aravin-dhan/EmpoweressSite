import { buildPageMetadata } from "@/lib/metadata";
import { ContactForm } from "@/components/forms/contact-form";
import { NewsletterSignup } from "@/components/newsletter/newsletter-card";
import { siteConfig } from "@/config/site";

export const metadata = buildPageMetadata({
  title: "Contact Empoweress",
  path: "/contact",
  description: "Reach out for research collaborations, workshops, or speaking requests.",
});

const contactChannels = [
  {
    label: "Email",
    value: siteConfig.contactEmail,
  },
  {
    label: "LinkedIn",
    value: siteConfig.social.linkedin,
  },
  {
    label: "Twitter",
    value: siteConfig.social.twitter,
  },
];

const submissionGuidelines = [
  "Pitch original feminist legal analysis (150–200 words) with clear jurisdictional context.",
  "Attach key citations or data sources—no PDFs larger than 10 MB.",
  "Disclose conflicts of interest and confirm consent for client narratives.",
  "Expect an editorial response within 5 working days.",
];

const submissionFormUrl = "https://forms.gle/empoweressSubmissions";

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <header className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-10 shadow-subtle">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
          Contact
        </p>
        <h1 className="mt-3 font-serif text-4xl">Collaborate with Empoweress.</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Workshops, editorial partnerships, data collaborations, or legal clinics—drop us a note.
        </p>
      </header>

      <section className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-subtle">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
              Open Submissions
            </p>
            <h2 className="font-serif text-3xl">Guidelines for pitching the editorial desk</h2>
            <p className="text-sm text-[var(--color-muted)]">
              We accept rolling submissions via Google Forms. Please review the checklist before uploading drafts.
            </p>
          </div>
          <a
            href={submissionFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-brand-primary/40 px-6 py-2 text-sm font-semibold text-brand-primary hover:bg-brand-primary/10"
          >
            Submit via Google Form →
          </a>
        </div>
        <ul className="mt-6 grid gap-3 text-sm text-[var(--color-foreground)] md:grid-cols-2">
          {submissionGuidelines.map((guideline) => (
            <li
              key={guideline}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              {guideline}
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-subtle">
          <ContactForm />
        </div>
        <aside className="space-y-6">
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-subtle">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
              Direct Channels
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {contactChannels.map((channel) => (
                <li key={channel.label}>
                  <p className="text-[var(--color-muted)]">{channel.label}</p>
                  <p className="font-semibold text-[var(--color-foreground)]">
                    {channel.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <NewsletterSignup />
        </aside>
      </div>
    </div>
  );
}
