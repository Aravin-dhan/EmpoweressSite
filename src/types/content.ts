export type AuthorProfile = {
  name: string;
  title?: string;
  avatar?: string;
  bio?: string;
  organization?: string;
  socials?: { platform: string; url: string }[];
};

export type ResourceLink = {
  title: string;
  url: string;
  description?: string;
};

export type SeoMeta = {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  canonicalUrl?: string;
};

export type TocHeading = {
  id: string;
  title: string;
  level: 2 | 3;
};

export type PostFrontmatter = {
  title: string;
  slug: string;
  date: string;
  lastUpdated?: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  tags: string[];
  status: "draft" | "published" | "scheduled";
  featured?: boolean;
  pinned?: boolean;
  priority?: number;
  canonicalUrl?: string;
  seo?: SeoMeta;
  resources?: ResourceLink[];
  readTime?: number;
  author: AuthorProfile;
};

export type PostRecord = PostFrontmatter & {
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
  headings: TocHeading[];
  path: string;
  isPublished: boolean;
};

export type PostSummary = Pick<
  PostRecord,
  | "slug"
  | "title"
  | "date"
  | "excerpt"
  | "category"
  | "tags"
  | "featuredImage"
  | "readingTime"
  | "author"
  | "lastUpdated"
  | "featured"
  | "pinned"
>;

export type ArchiveGroup = {
  key: string;
  label: string;
  year: number;
  month: number;
  posts: PostSummary[];
};

export type CategoryMeta = {
  slug: string;
  title: string;
  description: string;
  color: string;
  accent: string;
  quote?: string;
  researchFocus?: string;
};
