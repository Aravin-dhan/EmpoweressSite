"use client";

import Script from "next/script";
import { siteConfig } from "@/config/site";

export function Comments() {
  const config = siteConfig.comments?.giscus;
  if (!config?.repo || !config?.repoId) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-subtle">
      <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
        Community Dialogue
      </p>
      <p className="text-sm text-[var(--color-muted)]">
        Share case notes, cite precedents, or add reading recommendations below.
      </p>
      <div className="mt-6">
        <div id="empoweress-comments" className="giscus" />
        <Script
          src="https://giscus.app/client.js"
          data-repo={config.repo}
          data-repo-id={config.repoId}
          data-category={config.category}
          data-category-id={config.categoryId}
          data-mapping={config.mapping ?? "pathname"}
          data-strict="0"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-input-position="top"
          data-theme={config.theme ?? "preferred_color_scheme"}
          data-lang="en"
          crossOrigin="anonymous"
          async
        />
      </div>
    </section>
  );
}
