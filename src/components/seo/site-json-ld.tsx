import Script from "next/script";
import { siteConfig } from "@/config/site";

export function SiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: [
      siteConfig.social.twitter,
      siteConfig.social.linkedin,
      siteConfig.social.instagram,
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: siteConfig.contactEmail,
        contactType: "editorial",
      },
    ],
  };

  return (
    <Script
      id="jsonld-site"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
