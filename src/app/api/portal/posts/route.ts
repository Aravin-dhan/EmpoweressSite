
import { NextResponse } from "next/server";
import { Octokit } from "octokit";
import matter from "gray-matter";

// Helper to construct MDX file content
const createMdxContent = (data: any) => {
    const { content, isNew, ...frontmatter } = data;

    // Construct author object if flat fields exist
    if (data.authorName) {
        frontmatter.author = {
            name: data.authorName,
            title: data.authorTitle,
            avatar: data.authorAvatar,
            organization: data.authorOrg
        };
        // remove flat fields from frontmatter
        delete frontmatter.authorName;
        delete frontmatter.authorTitle;
        delete frontmatter.authorAvatar;
        delete frontmatter.authorOrg;
    }

    // Default status
    if (!frontmatter.status) frontmatter.status = "draft";

    return matter.stringify(content || "", frontmatter);
};

export async function POST(request: Request) {
    try {
        const adminPassword = request.headers.get("x-admin-password");
        if (adminPassword !== process.env.ADMIN_PASSWORD) {
            // Allow local development bypass if desired, or strictly enforce env var.
            // For this user, checking process.env.ADMIN_PASSWORD which they need to set.
            if (!process.env.ADMIN_PASSWORD) {
                return new NextResponse("Server configuration error: ADMIN_PASSWORD not set", { status: 500 });
            }
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await request.json();
        const { slug, isNew } = body;

        if (!slug) {
            return new NextResponse("Slug is required", { status: 400 });
        }

        const filename = `${slug}.mdx`;
        const path = `content/posts/${filename}`;
        const fileContent = createMdxContent(body);
        const message = `${isNew ? "Create" : "Update"} post: ${body.title}`;

        const octokit = new Octokit({
            auth: process.env.GITHUB_TOKEN,
        });

        const owner = process.env.REPO_OWNER;
        const repo = process.env.REPO_NAME;

        if (!owner || !repo) {
            return new NextResponse("Server configuration error: REPO_OWNER or REPO_NAME not set", { status: 500 });
        }

        // Get current file sha if updating
        let sha;
        if (!isNew) {
            try {
                const { data } = await octokit.rest.repos.getContent({
                    owner,
                    repo,
                    path,
                });
                if (!Array.isArray(data) && data.sha) {
                    sha = data.sha;
                }
            } catch (e) {
                // If file not found during update, we might treat as create or error. 
                // Letting it fall through to create if not found might be okay, but unsafe if intending to edit.
                console.warn("File not found for update, creating new.");
            }
        }

        await octokit.rest.repos.createOrUpdateFileContents({
            owner,
            repo,
            path,
            message,
            content: Buffer.from(fileContent).toString("base64"),
            sha, // undefined for new files
        });

        return NextResponse.json({ success: true, slug });
    } catch (error: any) {
        console.error("Admin API Error:", error);
        return new NextResponse(error.message || "Internal Server Error", { status: 500 });
    }
}
