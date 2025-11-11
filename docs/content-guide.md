# Empoweress Content Guide

## Creating a New Post

Use the helper script to scaffold MDX posts with the correct frontmatter:

```bash
npm run new:post -- constitutional-remedies "Constitutional Remedies 101"
```

This creates `content/posts/constitutional-remedies.mdx` with starter fields. Update the frontmatter:

- `category`: use one of the defined categories in `src/data/categories.ts`
- `tags`: free-form, lowercase phrases (e.g. `gender justice`, `migration`)
- `status`: `draft`, `scheduled`, or `published`
- `priority`: optional number to influence trending ranking

## Required Frontmatter

```yaml
title: "Post Title"
slug: "post-slug"
date: "2024-12-31"
excerpt: "Short summary."
featuredImage: "https://images.unsplash.com/..."
category: "Legal Feminism"
tags:
  - "tag-one"
  - "tag-two"
status: "published"
author:
  name: "Contributor Name"
  title: "Role / Affiliation"
```

Optional fields include `lastUpdated`, `resources`, `priority`, `featured`, `pinned`, and `seo`.

## Writing Structure

- **Introduction**: 2–3 paragraphs that frame the legal issue and why it matters.
- **Analysis**: Break doctrine/evidence down by headings. Use components such as `<InfoBox>`, `<PullQuote>`, `<LegalCaseBox>`, `<Citation>`, or `<instagram-embed data-url="" />`.
- **Actionables**: Close with takeaways, toolkits, or community calls to action.

### Embeds

- Instagram: `<instagram-embed data-url="https://www.instagram.com/p/POST_ID/" data-caption="Optional caption" />`
- External resources: prepend `http(s)://` so Next.js treats them as absolute URLs.

## Tagging Tips

- Prefer 2–4 tags per post for better filtering.
- Reuse canonical spellings (`gender justice`, `pocso`, `migration`) to keep search results cohesive.
- Trend scoring favors posts with `featured`, `pinned`, or higher `priority`.

## Submission Workflow

1. Draft locally using the MDX template.
2. Preview via `npm run dev`.
3. Submit via the Google Form (linked on the Contact page) with:
   - 150–200 word pitch
   - Key citations / data sources
   - Confirmation that case studies have consent

Editors respond within five working days and may request additional metadata (cover image, resources, etc.).
