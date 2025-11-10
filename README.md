# Empoweress – Feminist Research Blog

Empoweress is a modern, research-forward feminist blog built with **Next.js 16**, **App Router**, and **MDX**. It delivers long-form legal analysis, curated resources, and reusable litigation toolkits in a design system inspired by Playfair Display and Inter. Production domain: **https://empoweress.site**

## Highlights

- **Content pipeline**: Markdown/MDX posts with typed frontmatter, auto reading-time, table of contents, related posts, and JSON-LD metadata.
- **Design system**: Tailwind CSS 3, custom components (PostCard, FeaturedPostCard, InfoBox, LegalCaseBox, PullQuote, CategoryTag, ShareButtons, TOC, Newsletter, etc.), dark mode with `next-themes`, and smooth page chrome.
- **Pages**: Home, Blog (typeahead + advanced filters), Post detail, About, Resources/Archive, Contact, Custom 404.
- **SEO / performance**: Dynamic metadata helpers, OpenGraph/Twitter tags, article structured data, RSS feed, sitemap, robots, optimized images, reading progress bar, and newsletter + analytics hooks.
- **Content directory**: `content/posts/*.mdx` with sample posts across Legal Feminism, Constitutional Law, Migration, POCSO, and Reviews.

## Tech Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS 3 + @tailwindcss/forms/typography/aspect-ratio
- MDX via `next-mdx-remote`, `remark-gfm`, `remark-footnotes`, `rehype-slug`, `rehype-autolink-headings`, `rehype-prism-plus`
- Utilities: `gray-matter`, `reading-time`, `unified`, `github-slugger`, `date-fns`, `next-themes`

## Getting Started

```bash
npm install
npm run dev
# open http://localhost:3000
```

Recommended scripts:

| Script        | Description                     |
| ------------- | -------------------------------- |
| `npm run dev` | Start local dev server           |
| `npm run build` | Production build (includes static generation) |
| `npm run start` | Serve built output             |
| `npm run lint` | Run ESLint over the project     |
| `npm run new:post -- <slug> "Optional Title"` | Scaffold an MDX post |

## Content authoring

- Add new posts under `content/posts/*.mdx` (run `npm run new:post -- my-slug "Readable Title"` to scaffold).
- Required frontmatter fields are validated via Zod: `title`, `slug`, `date`, `excerpt`, `featuredImage`, `category`, `tags`, `status`, and `author` object. Optional data includes `featured`, `pinned`, `seo`, `resources`, etc.
- Custom MDX components available inside posts:
  - `<InfoBox variant="info" title="...">`
  - `<PullQuote quote="" attribution="" />`
  - `<LegalCaseBox title="" citation="">`
  - `<ResourceCard title="" description="" category="" href="" />`
  - `<Citation id="1" />`
- See `docs/content-guide.md` for tagging guidance and the Google Form submission workflow.

## Configuration

- Update site-wide metadata/navigation/social links in `src/config/site.ts`.
- Categories and resource cards live in `src/data/categories.ts` and `src/data/resources.ts`.
- Optional analytics (Plausible): set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=mydomain.com` to inject the script automatically.

## Deployment Notes

- Ready for Vercel out of the box. RSS feed is served from `/rss`, sitemap from `/sitemap.xml`, and robots at `/robots.txt`.
- Remote images allowed from `images.unsplash.com` and `images.ctfassets.net` (adjust in `next.config.ts` as needed).
- Pre-rendered static routes + dynamic blog/category pages via `generateStaticParams`.

## Project Structure (key folders)

```
src/
  app/              # App Router routes
  components/       # UI + layout + MDX building blocks
  config/site.ts    # Site metadata/nav/social config
  data/             # Category/resource seeds
  lib/              # MDX pipeline, metadata helpers, utilities
  styles/fonts.ts   # Playfair/Inter/JetBrains Mono font setup
content/posts/      # MDX articles
docs/               # Playbooks / contributor docs
public/             # Static assets (logo, favicon)
```

## New Platform Features

- **Advanced research filters**: Single search field with collapsible filters (category, tag, date-range, popularity) + pagination.
- **Structured data + feeds**: JSON-LD for site & articles, RSS, sitemap, robots.
- **Print/PDF friendly posts**: Dedicated “Download PDF” control + WCAG-compliant print styles.
- **Community & outreach**: Giscus-ready comments, Plausible analytics hook, newsletter + contact API endpoints (Resend/ConvertKit friendly).
- **Archive intelligence**: `/archive` timeline view, trending debates module, shareable popularity index.

## Next Steps

- Hook the contact/newsletter forms to your provider (Resend, ConvertKit, etc.).
- Set `NEXT_PUBLIC_SITE_URL=https://empoweress.site` for share buttons if you fork the project.
- Add more MDX posts or import from an external CMS.
- Swap Plausible for another analytics stack if desired.

Feel free to iterate on the design system, extend categories, or integrate a CMS/admin UI as your editorial workflow grows.
