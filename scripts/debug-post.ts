import { getPostBySlug } from "@/lib/mdx";

async function main() {
  const post = await getPostBySlug("book-review-queer-judgments");
  console.log(JSON.stringify(post, null, 2));
}

main();
