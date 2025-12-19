
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PostEditor } from "@/components/admin/PostEditor";
import { getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";

interface EditPostPageProps {
    params: {
        slug: string;
    };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug, { includeDrafts: true });

    if (!post) {
        notFound();
    }

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-sm uppercase tracking-wide text-[var(--color-muted)] mb-2">Editor</h1>
            </div>
            <PostEditor initialData={post} />
        </AdminLayout>
    );
}
