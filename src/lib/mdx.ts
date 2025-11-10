import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime, { type ReadTimeResults } from "reading-time";
import { z } from "zod";
import Slugger from "github-slugger";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import { cache } from "react";
import type { Heading } from "mdast";
import type {
  AuthorProfile,
  PostFrontmatter,
  PostRecord,
  PostSummary,
  ResourceLink,
  TocHeading,
  ArchiveGroup,
} from "@/types/content";

const postsDirectory = path.join(process.cwd(), "content", "posts");

const socialsSchema = z
  .object({
    platform: z.string(),
    url: z.string().url(),
  })
  .array()
  .optional()
  .default([]);

const authorSchema: z.ZodType<AuthorProfile> = z.object({
  name: z.string(),
  title: z.string().optional(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  organization: z.string().optional(),
  socials: socialsSchema,
});

const resourceSchema: z.ZodType<ResourceLink> = z.object({
  title: z.string(),
  url: z.string().url(),
  description: z.string().optional(),
});

const seoSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    canonicalUrl: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  })
  .optional();

const frontmatterSchema = z.object({
  title: z.string(),
  slug: z.string().optional(),
  date: z.string(),
  lastUpdated: z.string().optional(),
  excerpt: z.string(),
  featuredImage: z.string(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published", "scheduled"]).default("published"),
  featured: z.boolean().optional(),
  pinned: z.boolean().optional(),
  priority: z.number().optional(),
  canonicalUrl: z.string().optional(),
  seo: seoSchema,
  resources: z.array(resourceSchema).optional(),
  readTime: z.number().optional(),
  author: authorSchema,
});

type ParsedMatter = {
  data: PostFrontmatter;
  content: string;
};

const ensureDirectory = async () => {
  try {
    await fs.access(postsDirectory);
  } catch {
    await fs.mkdir(postsDirectory, { recursive: true });
  }
};

const extractHeadings = (source: string): TocHeading[] => {
  const tree = unified().use(remarkParse).parse(source);
  const slugger = new Slugger();
  const headings: TocHeading[] = [];

  visit(tree, "heading", (node: Heading) => {
    if (node.depth < 2 || node.depth > 3) return;

    const title = toString(node).trim();
    if (!title) return;

    const id = slugger.slug(title);
    headings.push({
      id,
      title,
      level: node.depth as 2 | 3,
    });
  });

  return headings;
};

const normaliseReadingTime = (
  stats: ReadTimeResults,
  override?: number,
): ReadTimeResults => {
  const minutes = override ?? Math.max(1, Math.round(stats.minutes));

  return {
    ...stats,
    minutes,
    text: `${minutes} min read`,
  };
};

const parseMatter = (raw: string, fallbackSlug: string): ParsedMatter => {
  const { data, content } = matter(raw);
  const parsed = frontmatterSchema.safeParse({
    ...data,
    slug: data.slug ?? fallbackSlug,
  });

  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in ${fallbackSlug}.mdx: ${JSON.stringify(
        parsed.error.issues,
      )}`,
    );
  }

  return {
    data: parsed.data as PostFrontmatter,
    content,
  };
};

const isPublishable = (status: string, date: string) => {
  if (status === "draft") return false;
  if (status === "scheduled") {
    return new Date(date) <= new Date();
  }
  return true;
};

export type PostFilters = {
  includeDrafts?: boolean;
  category?: string;
  tag?: string;
};

export const getPostSlugs = cache(async () => {
  await ensureDirectory();
  const entries = await fs.readdir(postsDirectory);
  return entries.filter((file) => file.endsWith(".mdx"));
});

export const getPostBySlug = cache(
  async (
    slug: string,
    options: { includeDrafts?: boolean } = {},
  ): Promise<PostRecord | null> => {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);

    try {
      const file = await fs.readFile(fullPath, "utf-8");
      const { data, content } = parseMatter(file, realSlug);
      const headings = extractHeadings(content);
      const stats = normaliseReadingTime(readingTime(content), data.readTime);

      const published = isPublishable(data.status, data.date);
      if (!options.includeDrafts && !published) {
        return null;
      }

      const lastUpdated = data.lastUpdated ?? data.date;

      return {
        ...data,
        slug: data.slug ?? realSlug,
        lastUpdated,
        content,
        headings,
        readingTime: stats,
        path: `/blog/${data.slug ?? realSlug}`,
        isPublished: published,
      };
    } catch (error) {
      console.error(`Failed to load MDX file for slug "${slug}"`, error);
      return null;
    }
  },
);

export const getAllPosts = cache(
  async (filters: PostFilters = {}): Promise<PostRecord[]> => {
    const files = await getPostSlugs();
    const posts = await Promise.all(
      files.map((file) => getPostBySlug(file.replace(/\.mdx$/, ""), filters)),
    );

    const filtered = posts.filter((post): post is PostRecord => Boolean(post));

    return filtered
      .filter((post) => {
        if (!filters.includeDrafts && !post.isPublished) {
          return false;
        }

        if (filters.category) {
          const target = filters.category.toLowerCase();
          const categoryName = post.category.toLowerCase();
          const slugified = categoryName.replace(/\s+/g, "-");
          if (categoryName !== target && slugified !== target) {
            return false;
          }
        }

        if (filters.tag && !post.tags.includes(filters.tag)) {
          return false;
        }

        return true;
      })
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
  },
);

export const getFeaturedPosts = cache(async () => {
  const posts = await getAllPosts();
  return posts.filter((post) => post.featured).slice(0, 3);
});

export const getRecentPosts = cache(async (limit = 6) => {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
});

export const getPostsByCategory = async (category: string) => {
  const posts = await getAllPosts({ category });
  return posts;
};

export const getPostSummaries = cache(async (): Promise<PostSummary[]> => {
  const posts = await getAllPosts();
  return posts.map(
    ({
      slug,
      title,
      date,
      excerpt,
      category,
      tags,
      featuredImage,
      readingTime: rt,
      author,
      lastUpdated,
      featured,
      pinned,
    }) => ({
      slug,
      title,
      date,
      excerpt,
      category,
      tags,
      featuredImage,
      readingTime: rt,
      author,
      lastUpdated,
      featured,
      pinned,
    }),
  );
});

const scorePostPopularity = (post: PostRecord) => {
  const priorityScore = post.priority ?? 0;
  const featuredScore = post.featured ? 5 : 0;
  const pinnedScore = post.pinned ? 3 : 0;
  const recencyScore = Math.max(
    0,
    12 - Math.floor((Date.now() - new Date(post.date).getTime()) / (1000 * 60 * 60 * 24 * 7)),
  );

  return priorityScore * 2 + featuredScore + pinnedScore + recencyScore;
};

export const getTrendingPosts = cache(async (limit = 3) => {
  const posts = await getAllPosts();
  return posts
    .filter((post) => post.isPublished)
    .sort((a, b) => scorePostPopularity(b) - scorePostPopularity(a))
    .slice(0, limit);
});

export const getRelatedPosts = async (
  currentSlug: string,
  tags: string[],
  limit = 3,
) => {
  const posts = await getAllPosts();
  const related = posts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const overlap = post.tags.filter((tag) => tags.includes(tag)).length;
      return { post, score: overlap };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ post }) => post);

  return related.slice(0, limit);
};

export const getPostTags = cache(async () => {
  const posts = await getAllPosts();
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
});

export const getArchiveGroups = cache(async () => {
  const posts = await getAllPosts();
  const archiveMap = new Map<string, ArchiveGroup>();

  posts.forEach((post) => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const key = `${year}-${String(month + 1).padStart(2, "0")}`;
    const label = `${date.toLocaleString("default", { month: "long" })} ${year}`;

    if (!archiveMap.has(key)) {
      archiveMap.set(key, {
        key,
        label,
        year,
        month,
        posts: [],
      });
    }

    archiveMap.get(key)?.posts.push(post);
  });

  return Array.from(archiveMap.values()).sort((a, b) => {
    if (a.year === b.year) {
      return b.month - a.month;
    }
    return b.year - a.year;
  });
});

export const getSearchIndex = cache(async () => {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    tags: post.tags,
    category: post.category,
    date: post.date,
    readingTime: post.readingTime.text,
  }));
});
