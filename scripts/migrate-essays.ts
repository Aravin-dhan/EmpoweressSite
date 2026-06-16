import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import TurndownService from "turndown";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const turndownService = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
});

turndownService.addRule("evaluationCard", {
  filter: function (node) {
    return node.nodeName === "DIV" && node.className.includes("evaluation-card");
  },
  replacement: function (content) {
    return content.trim().split("\n").map(line => `> ${line}`).join("\n") + "\n\n";
  }
});

turndownService.addRule("backToTop", {
  filter: function (node) {
    return node.nodeName === "A" && node.className.includes("back-to-top");
  },
  replacement: function () {
    return "";
  }
});

const htmlPath = "/Users/Admin/Documents/antigravity/zealous-heisenberg/final_essays_with_comments.html";
const contentDir = path.join(process.cwd(), "content/posts");
const imagesDir = path.join(process.cwd(), "public/images");

const htmlContent = fs.readFileSync(htmlPath, "utf-8");
const $ = cheerio.load(htmlContent);
const articles = $("article").toArray();
const today = new Date();

const generatedImages = [
  "/Users/Admin/.gemini/antigravity/brain/f10d3ca6-02f7-4ff1-a631-8bc31070c725/anthology_essay_0_abstract_1781606874382.png",
  "/Users/Admin/.gemini/antigravity/brain/f10d3ca6-02f7-4ff1-a631-8bc31070c725/anthology_essay_1_abstract_1781606888206.png",
  "/Users/Admin/.gemini/antigravity/brain/f10d3ca6-02f7-4ff1-a631-8bc31070c725/anthology_essay_2_abstract_1781606901486.png",
  "/Users/Admin/.gemini/antigravity/brain/f10d3ca6-02f7-4ff1-a631-8bc31070c725/anthology_essay_3_abstract_1781606917041.png",
  "/Users/Admin/.gemini/antigravity/brain/f10d3ca6-02f7-4ff1-a631-8bc31070c725/anthology_essay_4_abstract_1781606928797.png",
];

articles.forEach((articleEl, index) => {
  const $article = $(articleEl);
  const title = $article.find(".essay-title").text().trim();
  const author = $article.find(".essay-author").text().replace(/By\s+/i, "").trim();
  
  $article.find(".essay-title").remove();
  $article.find(".essay-author").remove();
  
  const htmlBody = $article.html() || "";
  const markdownBody = turndownService.turndown(htmlBody);
  
  const paragraphs = markdownBody.split("\n\n").filter(p => !p.startsWith(">") && p.trim().length > 10);
  const introText = paragraphs[0] ? paragraphs[0].replace(/\n/g, " ") : "An essay from the Empoweress collection.";
  const sentences = introText.match(/[^.!?]+[.!?]+/g) || [introText];
  const excerpt = sentences.slice(0, 2).join(" ").trim().replace(/"/g, "'");

  const slug = slugify(title);
  
  const postDate = new Date(today);
  postDate.setDate(postDate.getDate() - index);
  const dateStr = postDate.toISOString().split("T")[0];
  
  let category = "Opinion";
  const contentLower = markdownBody.toLowerCase();
  if (contentLower.includes("constitutional")) category = "Constitutional Law";
  else if (contentLower.includes("pocso") || contentLower.includes("child")) category = "POCSO & Child Rights";
  else if (contentLower.includes("gender")) category = "Gender Justice";
  else if (contentLower.includes("migration")) category = "Migration & Gender";
  else if (contentLower.includes("feminism")) category = "Legal Feminism";

  const imageSubdir = path.join(imagesDir, slug);
  if (!fs.existsSync(imageSubdir)) {
    fs.mkdirSync(imageSubdir, { recursive: true });
  }
  
  let featuredImagePath = "";
  if (index < 5) {
    const srcPath = generatedImages[index];
    const destPath = path.join(imageSubdir, "hero-abstract.png");
    fs.copyFileSync(srcPath, destPath);
    featuredImagePath = `/images/${slug}/hero-abstract.png`;
  } else {
    featuredImagePath = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1600&q=80'; // Placeholder
  }

  const mdxContent = '---\n' +
    'title: "' + title + '"\n' +
    'author:\n' +
    '  name: "' + author + '"\n' +
    '  title: "Guest Contributor"\n' +
    '  bio: "Contributor to the Empoweress collection."\n' +
    'date: "' + dateStr + '"\n' +
    'lastUpdated: "' + dateStr + '"\n' +
    'excerpt: "' + excerpt + '"\n' +
    'featuredImage: "' + featuredImagePath + '"\n' +
    'category: "' + category + '"\n' +
    'tags:\n' +
    '  - "essay"\n' +
    '---\n\n' +
    markdownBody + '\n';

  fs.writeFileSync(path.join(contentDir, slug + '.mdx'), mdxContent);
  console.log('Generated ' + slug + '.mdx');
});
