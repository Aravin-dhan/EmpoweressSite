#!/usr/bin/env tsx

import fs from "node:fs/promises";
import path from "node:path";

const [slug, ...titleParts] = process.argv.slice(2);

if (!slug) {
  console.error("Usage: npm run new:post -- <slug> \"Optional Title\"");
  process.exit(1);
}

const title =
  titleParts.join(" ").trim() ||
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const today = new Date().toISOString().split("T")[0];

const template = `---
title: "${title}"
slug: "${slug}"
date: "${today}"
excerpt: "One-sentence summary for previews."
featuredImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80"
category: "Legal Feminism"
tags:
  - "tag-one"
  - "tag-two"
status: "draft"
author:
  name: "Empoweress Contributor"
  title: "Feminist Researcher"
---

## Introduction

Start writing your analysis here. Use Markdown/MDX components like <InfoBox> or <LegalCaseBox> as needed.
`;

async function main() {
  const postsDir = path.join(process.cwd(), "content", "posts");
  await fs.mkdir(postsDir, { recursive: true });
  const filePath = path.join(postsDir, `${slug}.mdx`);

  try {
    await fs.access(filePath);
    console.error(`File already exists: ${filePath}`);
    process.exit(1);
  } catch {
    // continue
  }

  await fs.writeFile(filePath, template, "utf-8");
  console.log(`Created ${filePath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
