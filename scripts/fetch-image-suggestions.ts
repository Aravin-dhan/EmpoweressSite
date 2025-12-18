#!/usr/bin/env tsx
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

type PostMeta = {
  slug: string;
  title: string;
  tags: string[];
  category?: string;
};

type ImageSuggestion = {
  title: string;
  pageUrl: string;
  imageUrl: string;
  thumbUrl?: string;
  author?: string;
  license?: string;
  licenseUrl?: string;
  width?: number;
  height?: number;
  mime?: string;
  savedPath?: string;
};

type Manifest = Record<string, ImageSuggestion[]>;

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
const SUGGEST_DIR = path.join(ROOT, 'public', 'images', '_suggestions');

async function readPosts(): Promise<PostMeta[]> {
  const entries = await fs.readdir(POSTS_DIR);
  const posts: PostMeta[] = [];
  for (const file of entries) {
    if (!file.endsWith('.mdx')) continue;
    const full = path.join(POSTS_DIR, file);
    const raw = await fs.readFile(full, 'utf8');
    const { data } = matter(raw);
    const slug = (data.slug || file.replace(/\.mdx$/, '')) as string;
    const title = (data.title || slug) as string;
    const tags = (data.tags || []) as string[];
    const category = (data.category || undefined) as string | undefined;
    posts.push({ slug, title, tags, category });
  }
  return posts;
}

async function commonsSearch(query: string, limit = 6): Promise<ImageSuggestion[]> {
  const api = new URL('https://commons.wikimedia.org/w/api.php');
  api.searchParams.set('action', 'query');
  api.searchParams.set('format', 'json');
  api.searchParams.set('generator', 'search');
  api.searchParams.set('gsrnamespace', '6'); // File namespace
  api.searchParams.set('gsrlimit', String(limit));
  api.searchParams.set('gsrsearch', query);
  api.searchParams.set('prop', 'imageinfo|info');
  api.searchParams.set('inprop', 'url');
  api.searchParams.set('iiprop', 'url|mime|size|extmetadata');
  api.searchParams.set('iiurlwidth', '1600');

  const res = await fetch(api.toString(), {
    headers: { 'User-Agent': 'EmpoweressImageFetcher/1.0 (local dev)' },
  });
  if (!res.ok) throw new Error(`Commons API error ${res.status}`);
  const json = await res.json();
  const pages = json?.query?.pages || {};
  const suggestions: ImageSuggestion[] = [];
  for (const key of Object.keys(pages)) {
    const p = pages[key];
    const ii = p?.imageinfo?.[0];
    if (!ii) continue;
    const meta = ii.extmetadata || {};
    suggestions.push({
      title: p.title?.replace('File:', '') || 'Untitled',
      pageUrl: p.fullurl || ii.descriptionurl || '',
      imageUrl: ii.url,
      thumbUrl: ii.thumburl,
      author: meta?.Artist?.value || meta?.Credit?.value || undefined,
      license: meta?.LicenseShortName?.value || undefined,
      licenseUrl: meta?.LicenseUrl?.value || undefined,
      width: ii.width,
      height: ii.height,
      mime: ii.mime,
    });
  }
  return suggestions;
}

async function openverseSearch(query: string, limit = 10): Promise<ImageSuggestion[]> {
  const api = new URL('https://api.openverse.engineering/v1/images/');
  api.searchParams.set('q', query);
  api.searchParams.set('page_size', String(limit));
  api.searchParams.set('license_type', 'all');
  api.searchParams.set('license', 'by,cc0,by-sa,by-nd,by-nc,by-nc-sa,by-nc-nd,pdm');
  const res = await fetch(api.toString(), {
    headers: { 'User-Agent': 'EmpoweressImageFetcher/1.0 (local dev)' },
  });
  if (!res.ok) throw new Error(`Openverse API error ${res.status}`);
  const json = await res.json();
  const results = (json?.results || []) as any[];
  return results.map((r) => ({
    title: r.title || 'Untitled',
    pageUrl: r.foreign_landing_url || r.url || '',
    imageUrl: r.url || r.thumbnail || '',
    thumbUrl: r.thumbnail || r.url || '',
    author: r.creator || undefined,
    license: r.license || undefined,
    licenseUrl: r.license_url || undefined,
    width: r.width,
    height: r.height,
    mime: r.mime_type || undefined,
  }));
}

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function download(url: string, dest: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
}

function pickQueries(post: PostMeta): string[] {
  const base = [post.title];
  const tagChunk = post.tags.slice(0, 3).join(' ');
  const extra = [post.category, tagChunk].filter(Boolean).join(' ');
  const queries = [] as string[];
  const full = `${post.title} ${extra}`.trim();
  if (full) queries.push(full);
  if (post.title) queries.push(post.title);
  if (tagChunk) queries.push(tagChunk);
  const fallbacks = [
    'women rights India',
    'gender justice',
    'feminism protest',
    'courtroom India',
    'scales of justice India',
  ];
  const merged = Array.from(new Set([...queries, ...fallbacks]));
  return merged.slice(0, 6);
}

async function main() {
  await ensureDir(SUGGEST_DIR);
  const posts = await readPosts();
  const manifest: Manifest = {};

  for (const post of posts) {
    const outDir = path.join(SUGGEST_DIR, post.slug);
    await ensureDir(outDir);
    const queries = pickQueries(post);
    const seen = new Set<string>();
    const suggestions: ImageSuggestion[] = [];

    for (const q of queries) {
      try {
        // Prefer Openverse (diverse CC sources), then Commons
        const ov = await openverseSearch(q, 10);
        const cm = await commonsSearch(q, 6);
        const results = [...ov, ...cm];
        for (const r of results) {
          if (seen.has(r.imageUrl)) continue;
          const u = r.thumbUrl || r.imageUrl;
          try {
            const pathname = new URL(u).pathname.toLowerCase();
            if (/[.](pdf|djvu)$/.test(pathname)) continue; // skip docs
          } catch {}
          seen.add(r.imageUrl);
          // Save a thumbnail preview locally
          const url = r.thumbUrl || r.imageUrl;
          const ext = path.extname(new URL(url).pathname) || '.jpg';
          const safe = r.title.replace(/[^a-z0-9]+/gi, '-').replace(/(^-|-$)/g, '').toLowerCase();
          const dest = path.join(outDir, `${safe}${ext}`);
          try {
            await download(url, dest);
            r.savedPath = dest.replace(ROOT, '').replace(/\\/g, '/');
          } catch {
            // ignore download failures per item
          }
          suggestions.push(r);
          if (suggestions.length >= 10) break;
        }
        if (suggestions.length >= 10) break;
      } catch (err) {
        // proceed with best-effort for other queries
        console.warn(`Search failed for "${q}":`, (err as Error).message);
      }
    }

    manifest[post.slug] = suggestions;
  }

  const manifestPath = path.join(ROOT, 'content', 'image-sources.json');
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`Wrote manifest: ${manifestPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
