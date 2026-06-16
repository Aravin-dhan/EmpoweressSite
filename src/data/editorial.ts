export type EditorialMember = {
  name: string;
  role: string;
  focus: string;
  photo: string;
  socials: { label: string; href: string }[];
};

export const editorialTeam: EditorialMember[] = [
  {
    name: "Adv. Mira Bhatt",
    role: "Editor-in-Chief",
    focus: "Gender justice litigation, appellate advocacy",
    photo: "/images/team/mira-bhatt.png",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/mirabhatt" },
      { label: "Twitter", href: "https://twitter.com/mirabhatt" },
    ],
  },
  {
    name: "Dr. Tamanna Singh",
    role: "Research Director",
    focus: "Constitutional law, feminist pedagogy",
    photo: "/images/team/tamanna-singh.png",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/tamannasingh" },
      { label: "Twitter", href: "https://twitter.com/tamannaresearch" },
    ],
  },
  {
    name: "Nida Mehta",
    role: "Child Rights Lead",
    focus: "POCSO courts, restorative justice",
    photo: "/images/team/nida-mehta.png",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/nidamehta" },
      { label: "Instagram", href: "https://www.instagram.com/nidamehta" },
    ],
  },
];
