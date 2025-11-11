import Link from "next/link";
import { getFeaturedPosts, getRecentPosts, getSearchIndex } from "@/lib/mdx";
import { getCategorySummaries } from "@/lib/categories";
import { FeaturedPostCard } from "@/components/blog/featured-post-card";
import { PostCard } from "@/components/blog/post-card";
import { NewsletterSignup } from "@/components/newsletter/newsletter-card";
import { SearchBar } from "@/components/search/search-bar";
import { Button } from "@/components/ui/button";
import { CategoryTag } from "@/components/blog/category-tag";
import { categories } from "@/data/categories";

export default async function HomePage() {
  const [featured, recent, searchIndex, categorySummaries] = await Promise.all([
    getFeaturedPosts(),
    getRecentPosts(6),
    getSearchIndex(),
    getCategorySummaries(),
  ]);

  return (
    <div className="space-y-12">
      <section className="relative overflow-visible rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-brand-primary via-[#2d0a4b] to-[#0b0419] p-10 text-white shadow-glow">
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
            <SearchBar items={searchIndex} variant="inverted" />
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

      <section className="rounded-3xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/10 p-8 shadow-subtle">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-secondary">
              Submissions
            </p>
            <h2 className="font-serif text-3xl">Pitch Empoweress</h2>
            <p className="text-sm text-[var(--color-muted)]">
              Send us your feminist legal analysis, case notes, and toolkits. We review pitches weekly.
            </p>
          </div>
          <Button variant="ghost" asChild className="border border-brand-primary/30 px-6 py-2 text-brand-primary hover:bg-brand-primary/10">
            <Link href="/contact">Submit a pitch →</Link>
          </Button>
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
