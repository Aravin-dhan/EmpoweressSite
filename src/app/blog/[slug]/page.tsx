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
    <div className="space-y-8 max-w-[1600px] mx-auto px-4 sm:px-6 mt-6">
      <ArticleJsonLd post={post} />
      <ReadingProgress />
      
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <header className="mb-12">
        <div className="grid gap-8 lg:grid-cols-[1.8fr,1fr] lg:items-start border-b border-[var(--color-border)] pb-8">
          <div className="space-y-4">
             <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
              <CategoryTag label={post.category} />
              <span className="tracking-normal">
                {formatDate(post.date)} · {post.readingTime.text}
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[var(--color-foreground)] leading-tight">
              {post.title}
            </h1>
          </div>
          <div className="lg:pl-8 lg:pt-2">
            <p className="text-xl text-[var(--color-muted)] leading-relaxed italic font-serif">
              {post.excerpt}
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr),280px] items-start">
        <article id="article-body" className="space-y-8 min-w-0">
          {/* Main Content */}
          <div className="py-0">
            <RichText content={post.content} />
          </div>

          {/* Resources - Subtle styling */}
          {post.resources && post.resources.length > 0 && (
            <section className="space-y-4 border-t border-[var(--color-border)] pt-8">
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-muted)]">
                Resources & Citations
              </p>
              <ul className="space-y-2 text-sm">
                {post.resources.map((resource) => (
                  <li key={resource.url}>
                    <Link
                      href={resource.url}
                      className="font-medium text-brand-primary hover:underline"
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

          <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center border-t border-[var(--color-border)] pt-8">
            <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                <span
                    key={tag}
                    className="text-sm text-[var(--color-muted)] hover:text-brand-primary transition-colors cursor-pointer"
                >
                    #{tag}
                </span>
                ))}
            </div>
            <div className="flex gap-4">
                 <ShareButtons
                url={`${siteConfig.url}/blog/${post.slug}`}
                title={post.title}
                />
            </div>
          </div>

          <div className="border-t border-[var(--color-border)] pt-8">
             <AuthorBio author={post.author} />
          </div>

          <Comments />
        </article>

        <aside className="hidden lg:block sticky top-32 space-y-8 w-full">
          <div className="pl-6 border-l border-[var(--color-border)]">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)] mb-4">
                  On This Page
              </p>
              <TableOfContents headings={post.headings} />
          </div>
        </aside>
      </div>


      <div className="grid gap-6 lg:hidden">
        <RecentPostsWidget posts={latest} />
        <NewsletterSignup />
      </div>

      <div className="hidden lg:grid gap-6">
        <RecentPostsWidget posts={latest} />
        <NewsletterSignup />
      </div>
    </div>
  );
}
