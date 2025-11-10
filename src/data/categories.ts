import type { CategoryMeta } from "@/types/content";

export const categories: CategoryMeta[] = [
  {
    slug: "legal-feminism",
    title: "Legal Feminism",
    description:
      "Analytical essays on feminist jurisprudence, critical judgments, and theory-building across courts and tribunals.",
    color: "#6B46C1",
    accent: "#FCD34D",
    quote: "Every footnote can be feminist if we choose so.",
  },
  {
    slug: "constitutional-law",
    title: "Constitutional Law",
    description:
      "Deep dives into constitutional morality, separation of powers, and feminist interpretations of rights.",
    color: "#7834d4",
    accent: "#F472B6",
    quote: "Doctrine is only as feminist as its remedies.",
  },
  {
    slug: "gender-justice",
    title: "Gender Justice",
    description:
      "Strategic litigation notes on gender-based violence, labour, and economic justice.",
    color: "#EA4C89",
    accent: "#FCD34D",
  },
  {
    slug: "migration-and-gender",
    title: "Migration & Gender",
    description:
      "Care-centered frameworks for climate migration, relocation, and translocal solidarities.",
    color: "#DB2777",
    accent: "#38BDF8",
  },
  {
    slug: "pocso-and-child-rights",
    title: "POCSO & Child Rights",
    description:
      "Trauma-informed jurisprudence, child protection reforms, and feminist monitoring templates.",
    color: "#0EA5E9",
    accent: "#FCD34D",
  },
  {
    slug: "book-reviews",
    title: "Book Reviews",
    description:
      "Critical notes on feminist scholarship, reading lists, and research pedagogy.",
    color: "#BE123C",
    accent: "#F472B6",
  },
  {
    slug: "opinion",
    title: "Opinion",
    description:
      "Provocations, manifestos, and rapid responses from the Empoweress editorial desk.",
    color: "#111827",
    accent: "#FCD34D",
  },
];

export const categoryMap = categories.reduce<Record<string, CategoryMeta>>(
  (acc, category) => {
    acc[category.title] = category;
    acc[category.slug] = category;
    acc[category.title.toLowerCase()] = category;
    return acc;
  },
  {},
);
