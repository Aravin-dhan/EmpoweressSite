import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { getPostBySlug, getRelatedPosts, getRecentPosts } from "@/lib/mdx";
import { buildArticleMetadata } from "@/lib/metadata";
import { RichText } from "@/components/content/rich-text";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ShareButtons } from "@/components/blog/share-buttons";
import { RelatedPosts } from "@/components/blog/related-posts";
import { AuthorBio } from "@/components/blog/author-bio";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { NewsletterSignup } from "@/components/newsletter/newsletter-card";
import { CategoryTag } from "@/components/blog/category-tag";
import { RecentPostsWidget } from "@/components/blog/recent-posts-widget";
import { siteConfig } from "@/config/site";
import { ArticleJsonLd } from "@/components/seo/article-json-ld";
import { PrintDownload } from "@/components/blog/print-download";
import { Comments } from "@/components/blog/comments";
import { formatDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return buildArticleMetadata(post);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();
  const related = await getRelatedPosts(post.slug, post.tags, 2);
  const latest = (await getRecentPosts(4)).filter(
    (article) => article.slug !== post.slug,
  );

  return (
    <div className="space-y-10">
      <ArticleJsonLd post={post} />
      <ReadingProgress target="#article-body" />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <header className="space-y-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-subtle">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
          <CategoryTag label={post.category} />
          <span className="tracking-normal">
            {formatDate(post.date)} · {post.readingTime.text}
          </span>
          {post.lastUpdated && post.lastUpdated !== post.date && (
            <span className="tracking-normal">
              Updated {formatDate(post.lastUpdated)}
            </span>
          )}
        </div>
        <h1 className="font-serif text-4xl font-semibold text-[var(--color-foreground)]">
          {post.title}
        </h1>
        <p className="text-lg text-[var(--color-muted)]">{post.excerpt}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr),minmax(260px,1fr)]">
        <article id="article-body" className="space-y-10">
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-10 shadow-subtle">
            <RichText content={post.content} />
          </div>

          {post.resources && post.resources.length > 0 && (
            <section className="space-y-3 rounded-3xl border border-brand-primary/30 bg-brand-primary/5 p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-brand-primary">
                Resources & Citations
              </p>
              <ul className="space-y-2 text-sm">
                {post.resources.map((resource) => (
                  <li key={resource.url}>
                    <Link
                      href={resource.url}
                      className="font-semibold text-brand-primary hover:underline"
                    >
                      {resource.title}
                    </Link>
                    {resource.description && (
                      <span className="text-[var(--color-muted)]"> — {resource.description}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <ShareButtons
              url={`${siteConfig.url}/blog/${post.slug}`}
              title={post.title}
            />
            <PrintDownload />
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-brand-secondary/40 px-4 py-1 text-sm text-brand-secondary"
              >
                #{tag}
              </span>
            ))}
          </div>

          <AuthorBio author={post.author} />

          <RelatedPosts posts={related} />

          <Comments />
        </article>

        <aside className="hidden lg:flex lg:flex-col lg:gap-6">
          <TableOfContents headings={post.headings} />
          <RecentPostsWidget posts={latest} />
          <NewsletterSignup />
        </aside>
      </div>

      <div className="grid gap-6 lg:hidden">
        <RecentPostsWidget posts={latest} />
        <NewsletterSignup />
      </div>
    </div>
  );
}
