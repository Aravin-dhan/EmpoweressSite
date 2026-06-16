import Script from "next/script";
import { siteConfig } from "@/config/site";

export function SiteJsonLd() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    sameAs: [
      siteConfig.social.twitter,
      siteConfig.social.linkedin,
      siteConfig.social.instagram,
    ].filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: siteConfig.contactEmail,
        contactType: "editorial",
      },
    ],
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const data = [organizationData, websiteData];

  return (
    <Script
      id="jsonld-site"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
