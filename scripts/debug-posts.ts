
import { getAllPosts } from "../src/lib/mdx";

async function main() {
    console.log("Fetching all posts...");
    try {
        const posts = await getAllPosts({ includeDrafts: true });
        console.log(`Found ${posts.length} posts.`);
        posts.forEach(p => {
            console.log(`- [${p.status}] ${p.title} (Slug: ${p.slug}, Date: ${p.date})`);
            if (p.slug.includes("family-as-site")) {
                console.log("  >>> FOUND THE MISSING POST <<<");
                console.log("  Is Published flag:", p.isPublished);
            }
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

main();
