import Link from "next/link";
import {
  getFeaturedPosts,
  getRecentPosts,
  getSearchIndex,
  getTrendingPosts,
} from "@/lib/mdx";
import { getCategorySummaries } from "@/lib/categories";
import { FeaturedPostCard } from "@/components/blog/featured-post-card";
import { PostCard } from "@/components/blog/post-card";
import { NewsletterSignup } from "@/components/newsletter/newsletter-card";
import { SearchBar } from "@/components/search/search-bar";
import { Button } from "@/components/ui/button";
import { CategoryTag } from "@/components/blog/category-tag";
import { TrendingList } from "@/components/blog/trending-list";
import { categories } from "@/data/categories";

export default async function HomePage() {
  const [featured, recent, searchIndex, categorySummaries, trending] = await Promise.all([
    getFeaturedPosts(),
    getRecentPosts(6),
    getSearchIndex(),
    getCategorySummaries(),
    getTrendingPosts(),
  ]);

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-brand-primary via-[#2d0a4b] to-[#0b0419] p-10 text-white shadow-glow">
        <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-hero)] opacity-80" />
        <div className="relative space-y-6">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white">
              Empoweress
            </span>
            <h1 className="text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Challenging Patriarchy, One Argument at a Time
            </h1>
            <p className="text-base text-white/85 sm:text-lg">
              Feminist legal analysis on constitutional law, gender justice, and
              movement lawyering. Peer-reviewed, research-backed, and accessible.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/blog">Explore Latest Posts</Link>
              </Button>
              <Button
                variant="secondary"
                asChild
                className="border-white/40 text-white hover:bg-white/10"
              >
                <Link href="/resources">Download Toolkits</Link>
              </Button>
            </div>
          </div>
          <div className="relative mt-4 max-w-2xl">
            <SearchBar items={searchIndex} />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
              Featured
            </p>
            <h2 className="font-serif text-3xl">Editorial Highlights</h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-brand-primary hover:underline"
          >
            View all posts →
          </Link>
        </div>
        <div className="space-y-5">
          {featured.map((post) => (
            <FeaturedPostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {trending.length > 0 && (
        <section className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
                Trending
              </p>
              <h2 className="font-serif text-3xl">Most cited arguments this week</h2>
            </div>
            <Link
              href="/blog?sort=popular"
              className="text-sm font-semibold text-brand-primary hover:underline"
            >
              View popularity index →
            </Link>
          </div>
          <TrendingList posts={trending} />
        </section>
      )}

      <section className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
              Categories
            </p>
            <h2 className="font-serif text-3xl">Research Streams</h2>
          </div>
          <Link
            href="/blog?q="
            className="text-sm font-semibold text-brand-primary hover:underline"
          >
            Browse all →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {categorySummaries.slice(0, 3).map((category) => (
            <Link
              key={category.slug}
              href={`/blog?category=${category.slug}`}
              className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition hover:-translate-y-1 hover:shadow-glow"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-brand-primary">
                {category.title}
              </p>
              <p className="mt-2 text-lg font-semibold text-[var(--color-foreground)]">
                {category.description}
              </p>
              <p className="mt-4 text-sm text-[var(--color-muted)]">
                {category.count} published essays
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
              Latest
            </p>
            <h2 className="font-serif text-3xl">Recent Articles</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recent.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <NewsletterSignup />
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-subtle">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-secondary">
            Categories
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <CategoryTag key={category.slug} label={category.title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
