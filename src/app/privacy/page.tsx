import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Privacy Policy | Empoweress",
  path: "/privacy",
  description: "How Empoweress collects, stores, and uses your information.",
});

const sections = [
  {
    title: "1. Data We Collect",
    body:
      "We collect contact details (name, email, organization) when you submit forms, subscribe to the newsletter, or pitch articles. We may also collect analytics data (page views, referrers) via privacy-friendly tools like Plausible.",
  },
  {
    title: "2. Newsletter & Forms",
    body:
      "Email addresses submitted through forms or newsletter flows are used solely to respond to inquiries, share updates, or process submissions. Each form includes a clickwrap checkbox linking back to this policy and our terms.",
  },
  {
    title: "3. Cookies & Analytics",
    body:
      "We rely on lightweight analytics that do not use invasive cookies. If we adopt third-party tools, we will update this section with explicit details.",
  },
  {
    title: "4. Data Storage",
    body:
      "Submissions are stored securely in our content management pipeline and may be retained for editorial records. You can request deletion by emailing privacy@empoweress.site.",
  },
  {
    title: "5. Third Parties",
    body:
      "We do not sell personal data. If we use processors (e.g., email or hosting providers), they are bound by confidentiality agreements.",
  },
  {
    title: "6. Your Rights",
    body:
      "You may request access to, correction of, or deletion of your data at any time by contacting privacy@empoweress.site. We respond within 14 days.",
  },
  {
    title: "7. Updates",
    body:
      "We may revise this policy as our tooling evolves. Changes will be posted here with a new effective date.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3 border-l-4 border-brand-primary bg-[var(--color-card)] p-6">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
          Privacy
        </p>
        <h1 className="mt-3 font-serif text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Effective date: January 05, 2025. This explains what we collect, why, and how you can exercise your rights.
        </p>
      </header>

      <section className="space-y-6">
        {sections.map((section) => (
          <article key={section.title} className="space-y-2 border-b border-[var(--color-border)] pb-4">
            <h2 className="font-serif text-2xl text-[var(--color-foreground)]">{section.title}</h2>
            <p className="text-[var(--color-muted)]">{section.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
