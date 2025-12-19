
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PostEditor } from "@/components/admin/PostEditor";

export default function NewPostPage() {
    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-sm uppercase tracking-wide text-[var(--color-muted)] mb-2">Editor</h1>
                {/* Title is handled by Editor */}
            </div>
            <PostEditor isNew />
        </AdminLayout>
    );
}
