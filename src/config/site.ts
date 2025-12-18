export const siteConfig = {
  name: "Empoweress",
  title: "Empoweress | Feminist Legal Analysis & Research",
  description:
    "Empoweress is a feminist research blog unpacking constitutional law, gender justice, and movement lawyering with rigorous analysis and gorgeous design.",
  url: "https://empoweress.site",
  keywords: [
    "feminist law",
    "gender justice",
    "constitutional law",
    "legal feminism",
    "movement lawyering",
  ],
  locale: "en_IN",
  social: {
    twitter: "https://twitter.com/empoweress",
    linkedin: "https://www.linkedin.com/company/empoweress",
    instagram: "https://www.instagram.com/empoweress",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Resources", href: "/resources" },
    { label: "Archive", href: "/archive" },
  ],
  contactEmail: "hello@empoweress.site",
  newsletter: {
    provider: "convertkit",
    description:
      "Monthly feminist legal analysis, curated reading lists, and research templates straight to your inbox.",
  },
  comments: {
    giscus: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO ?? "",
      repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "",
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "",
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "",
      mapping: "pathname",
      theme: "preferred_color_scheme",
    },
  },
};

export type SiteConfig = typeof siteConfig;
