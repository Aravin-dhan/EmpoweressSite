import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "content/posts");
const files = fs.readdirSync(dir).filter(f => f.endsWith(".mdx") && f !== "_template.mdx" && f !== "posh-act-womens-advocates-blind-spot.mdx" && f !== "from-courtrooms-to-newsrooms-posh-compliance.mdx");

const piiRegex = /^(?:#{1,6}\s*)?(?:Title|Author|Institutional Affiliation|Designation|Email|Contact Number|Contact|Phone|Name|Theme|Word Count)\s*[:\-].*$/gmi;

files.forEach(file => {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, "utf8");
  
  const parts = content.split("---");
  if (parts.length < 3) return;
  
  const frontmatterStr = parts[1];
  let body = parts.slice(2).join("---");
  
  // Extract actual title from frontmatter
  const titleMatch = frontmatterStr.match(/title:\s*"(.*?)"/);
  const title = titleMatch ? titleMatch[1] : "";
  
  // Clean PII and headers
  body = body.replace(piiRegex, "");
  
  // Also remove headers that just repeat the title (case insensitive, ignoring non-alphanumeric)
  const titleRegexStr = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, "\\s*");
  const exactTitleRegex = new RegExp(`^(?:#{1,6}\\s*)?${titleRegexStr}\\s*$`, "gmi");
  body = body.replace(exactTitleRegex, "");

  // Remove multiple empty lines
  body = body.replace(/\n{3,}/g, "\n\n");
  body = body.replace(/^\s+/, "");
  
  // Generate a better excerpt
  const paragraphs = body.split("\n\n").filter(p => !p.startsWith(">") && !p.startsWith("#") && p.trim().length > 20);
  const introText = paragraphs[0] ? paragraphs[0].replace(/\n/g, " ") : "An essay from the Empoweress collection.";
  const sentences = introText.match(/[^.!?]+[.!?]+/g) || [introText];
  const excerpt = sentences.slice(0, 2).join(" ").trim().replace(/"/g, "'");
  
  // Update frontmatter excerpt
  let newFrontmatter = frontmatterStr.replace(/excerpt:\s*".*?"/, `excerpt: "${excerpt}"`);
  
  const newContent = `---\n${newFrontmatter.trim()}\n---\n\n${body}`;
  fs.writeFileSync(filePath, newContent);
  console.log("Cleaned " + file);
});
