import Script from "next/script";
import { siteConfig } from "@/config/site";

type BreadcrumbItem = {
  name: string;
  item: string;
};

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[];
};

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.item.startsWith("http")
        ? breadcrumb.item
        : `${siteConfig.url}${breadcrumb.item}`,
    })),
  };

  return (
    <Script
      id={`jsonld-breadcrumb-${items.map(i => i.name).join('-').replace(/\s+/g, '-').toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
