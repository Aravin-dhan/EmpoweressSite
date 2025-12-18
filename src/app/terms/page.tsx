import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Terms of Service | Empoweress",
  path: "/terms",
  description:
    "Terms governing use of Empoweress, submissions, and community participation.",
});

const sections = [
  {
    title: "1. Acceptance of Terms",
    body:
      "By accessing Empoweress, submitting content, subscribing to our newsletter, or interacting with any form on the site, you agree to these Terms of Service and our Privacy Policy. If you disagree, please discontinue use immediately.",
  },
  {
    title: "2. Editorial Content",
    body:
      "Empoweress publishes research-backed feminist legal analysis. While we cite reliable sources, posts are for informational purposes only and do not constitute legal advice. Opinions belong to their respective authors.",
  },
  {
    title: "3. User Submissions",
    body:
      "When you pitch or submit content, you confirm that you own the work, it is original, and it does not infringe the rights of any third party. You grant Empoweress a non-exclusive, royalty-free license to publish, edit for clarity, and promote the submission across our channels.",
  },
  {
    title: "4. Community Conduct",
    body:
      "Comments, emails, and submissions must remain respectful and free of harassment, hate speech, or discriminatory language. We may remove content or block access without notice if it violates this policy.",
  },
  {
    title: "5. Clickwrap Consent",
    body:
      "Every form that collects user data (newsletter, contact, submissions) includes a mandatory checkbox linking to these Terms and the Privacy Policy. Submitting the form constitutes affirmative consent and creates a binding agreement.",
  },
  {
    title: "6. Intellectual Property",
    body:
      "All site design, branding, and compiled posts belong to Empoweress unless otherwise noted. Do not reproduce or redistribute without written permission.",
  },
  {
    title: "7. Disclaimers",
    body:
      "Content is provided “as is.” We disclaim all warranties, and we are not liable for any damages arising from reliance on published material.",
  },
  {
    title: "8. Updates",
    body:
      "We may update these terms at any time. Continued use after changes constitutes acceptance. The latest version will always live at empoweress.site/terms.",
  },
];

export default function TermsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3 border-l-4 border-brand-primary bg-[var(--color-card)] p-6">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
          Terms
        </p>
        <h1 className="mt-3 font-serif text-4xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Effective date: January 05, 2025. These terms govern your use of Empoweress and all submissions to the platform.
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
