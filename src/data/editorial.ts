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
    photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/mirabhatt" },
      { label: "Twitter", href: "https://twitter.com/mirabhatt" },
    ],
  },
  {
    name: "Dr. Tamanna Singh",
    role: "Research Director",
    focus: "Constitutional law, feminist pedagogy",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/tamannasingh" },
      { label: "Twitter", href: "https://twitter.com/tamannaresearch" },
    ],
  },
  {
    name: "Nida Mehta",
    role: "Child Rights Lead",
    focus: "POCSO courts, restorative justice",
    photo: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/nidamehta" },
      { label: "Instagram", href: "https://www.instagram.com/nidamehta" },
    ],
  },
];
