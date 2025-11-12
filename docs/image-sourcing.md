Image sourcing workflow (CC-licensed)

Overview
- Source diverse, relevant images per post via Openverse + Wikimedia Commons.
- Store suggestions locally for review and keep attribution data (title, creator, license, source URL).
- Apply selected images by downloading full-size assets to `public/images/<slug>/` and updating the post’s frontmatter.

Commands
- Generate suggestions (10 per post) and thumbnails:
  - `npm run images:suggest`
  - Outputs manifest: `content/image-sources.json`
  - Saves preview files: `public/images/_suggestions/<slug>/*`

- Apply one suggestion to a post (downloads full image and updates frontmatter):
  - `npm run apply:image -- <slug> <index>`
  - Example: `npm run apply:image -- constitutional-morality-feminist-judgments 1`
  - Updates:
    - `featuredImage` and `seo.image` to `/images/<slug>/<filename>`
    - Appends a `resources` entry: `Image: <title> (<license>) -> <source page>`

Attribution guidelines
- Keep the `resources` entry added by the script; it serves as the public source credit.
- If a post displays explicit credits, you can also surface `resources` items in the UI.
- Licenses returned may include: CC BY, CC BY-SA, CC0, BY-NC variants, etc. Ensure commercial use policies match your deployment context.

Notes
- The suggestion step filters out non-image documents (PDF/DJVU) and de-duplicates results.
- Suggestions favor Openverse (Flickr/Wikimedia/other CC sources) and then Wikimedia Commons.
- If you need different imagery for a post, edit the query directly in `scripts/fetch-image-suggestions.ts` or append manual links in the manifest and re-run apply.

