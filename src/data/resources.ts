export const resourceCollections = [
  {
    title: "Litigation Toolkits",
    description:
      "Editable templates for feminist petitions, affidavits, and compliance trackers.",
    items: [
      {
        title: "Feminist PIL Brief Template",
        description: "Comprehensive brief with pleading checklist and footnotes.",
        category: "Litigation",
        href: "https://example.com/toolkits/feminist-pil-template.pdf",
        format: "pdf" as const,
      },
      {
        title: "Compliance Monitoring Dashboard",
        description: "Spreadsheet to track court-ordered relief and budgets.",
        category: "Implementation",
        href: "https://example.com/toolkits/compliance-dashboard.xlsx",
        format: "dataset" as const,
      },
    ],
  },
  {
    title: "Reading Lists",
    description:
      "Curated bibliographies for constitutional law, climate migration, and child rights.",
    items: [
      {
        title: "Climate Migration Feminist Bibliography",
        description: "30 essential readings with annotations and discussion prompts.",
        category: "Research",
        href: "https://example.com/reading/climate-migration.pdf",
        format: "pdf" as const,
      },
      {
        title: "POCSO Restorative Justice Starter Pack",
        description: "Case summaries, facilitator scripts, and trauma-informed guides.",
        category: "Child Rights",
        href: "https://example.com/reading/pocso-restorative.zip",
        format: "dataset" as const,
      },
    ],
  },
];
