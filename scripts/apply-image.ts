#!/usr/bin/env tsx
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
const MANIFEST = path.join(ROOT, 'content', 'image-sources.json');
const PUBLIC_IMAGES = path.join(ROOT, 'public', 'images');

async function download(url: string, dest: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, buf);
}

async function main() {
  const [slug, indexStr] = process.argv.slice(2);
  if (!slug || !indexStr) {
    console.error('Usage: npm run apply:image -- <slug> <index>');
    process.exit(1);
  }
  const idx = parseInt(indexStr, 10);
  if (Number.isNaN(idx) || idx < 0) {
    throw new Error('index must be a non-negative integer');
  }

  const manifest = JSON.parse(await fs.readFile(MANIFEST, 'utf8')) as Record<string, any[]>;
  const suggestions = manifest[slug];
  if (!suggestions || !suggestions.length) {
    throw new Error(`No suggestions found for slug ${slug}`);
  }
  const choice = suggestions[idx];
  if (!choice) {
    throw new Error(`Invalid index ${idx}; suggestions available: 0..${suggestions.length - 1}`);
  }

  const srcUrl = choice.imageUrl || choice.thumbUrl;
  if (!srcUrl) throw new Error('Chosen suggestion has no usable URL');
  try {
    const ext = new URL(srcUrl).pathname.toLowerCase();
    if (/[.](pdf|djvu)$/.test(ext)) {
      throw new Error('Chosen suggestion is not an image (looks like a document)');
    }
  } catch {}

  const url = new URL(srcUrl);
  const base = path.basename(url.pathname).split('?')[0] || `image-${Date.now()}.jpg`;
  const destDir = path.join(PUBLIC_IMAGES, slug);
  const destPath = path.join(destDir, base);
  await download(srcUrl, destPath);

  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = await fs.readFile(mdxPath, 'utf8');
  const fm = matter(raw);
  const webPath = `/images/${slug}/${base}`;
  fm.data.featuredImage = webPath;
  fm.data.seo = Object.assign({}, fm.data.seo || {}, { image: webPath });
  const resTitle = `Image: ${choice.title}${choice.license ? ` (${choice.license})` : ''}`;
  const resUrl = choice.pageUrl || srcUrl;
  const existing = Array.isArray(fm.data.resources) ? fm.data.resources : [];
  existing.push({ title: resTitle, url: resUrl });
  fm.data.resources = existing;

  const updated = matter.stringify(fm.content, fm.data);
  await fs.writeFile(mdxPath, updated, 'utf8');
  console.log(`Updated ${mdxPath}\n- featuredImage: ${webPath}\n- added resource: ${resTitle} -> ${resUrl}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
