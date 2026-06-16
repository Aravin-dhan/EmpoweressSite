import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "content/posts");
const files = fs.readdirSync(dir).filter(f => f.endsWith(".mdx") && f !== "_template.mdx" && f !== "posh-act-womens-advocates-blind-spot.mdx" && f !== "from-courtrooms-to-newsrooms-posh-compliance.mdx");

files.forEach(file => {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, "utf8");
  
  // Regex to match the entire blockquote block starting with "> #### Jury Comments & Evaluation"
  // It matches lines starting with ">" and any blank lines in between, up until a non-blockquote line.
  // Actually, a simpler way is to split by \n and filter out lines starting with "> " or ">" as long as we know we only have the Jury comments as blockquotes at the top.
  // Wait, some essays might have actual blockquotes in the body!
  // So let's match specifically the Jury Comments block.
  
  // Find the start of the jury comments
  const lines = content.split("\n");
  let newLines = [];
  let inJuryBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("#### Jury Comments & Evaluation")) {
      inJuryBlock = true;
      continue;
    }
    
    if (inJuryBlock) {
      // If we are in the jury block, and the line starts with ">", we skip it.
      // If it's an empty line right after a ">", we also skip it if the next line is also ">".
      // Let's just say the jury block ends when we encounter a line that is NOT empty and does NOT start with ">"
      if (line.trim() === "" || line.trim().startsWith(">")) {
        continue;
      } else {
        inJuryBlock = false;
        newLines.push(line);
      }
    } else {
      newLines.push(line);
    }
  }
  
  // Remove multiple consecutive empty lines that might have been left
  let newContent = newLines.join("\n").replace(/\n{3,}/g, "\n\n");
  
  fs.writeFileSync(filePath, newContent);
  console.log("Removed jury comments from " + file);
});
