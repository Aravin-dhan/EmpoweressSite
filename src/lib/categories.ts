import { categories, categoryMap } from "@/data/categories";
import { getAllPosts } from "./mdx";

export const getCategorySummaries = async () => {
  const posts = await getAllPosts();

  return categories.map((category) => {
    const related = posts.filter(
      (post) =>
        post.category === category.title || post.category === category.slug,
    );

    return {
      ...category,
      count: related.length,
      latest: related.slice(0, 3),
    };
  });
};

export const resolveCategoryMeta = (name: string) => {
  return categoryMap[name] ?? categoryMap[name.toLowerCase()] ?? null;
};
