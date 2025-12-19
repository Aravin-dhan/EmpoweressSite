
import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";

export const dynamic = "force-dynamic"; // Always fetch fresh data

export default async function AdminDashboard() {
    const posts = await getAllPosts({ includeDrafts: true });

    return (
        <AdminLayout>
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-serif font-bold">Posts</h1>
                <Link
                    href="/site-portal/new"
                    className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 font-semibold text-white transition hover:opacity-90"
                >
                    <PlusIcon className="h-5 w-5" />
                    New Post
                </Link>
            </div>

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[var(--color-background)] border-b border-[var(--color-border)]">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-sm">Title</th>
                            <th className="px-6 py-4 font-semibold text-sm">Status</th>
                            <th className="px-6 py-4 font-semibold text-sm">Date</th>
                            <th className="px-6 py-4 font-semibold text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border)]">
                        {posts.map((post) => (
                            <tr key={post.slug} className="hover:bg-[var(--color-background)] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-medium">{post.title}</span>
                                    <div className="text-xs text-[var(--color-muted)] mt-1">{post.slug}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${post.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                        post.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                            'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                                        }`}>
                                        {post.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-[var(--color-muted)]">
                                    {post.date}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link
                                        href={`/site-portal/edit/${post.slug}`}
                                        className="inline-flex items-center justify-center p-2 rounded-lg text-[var(--color-muted)] hover:text-brand-primary hover:bg-brand-primary/10 transition"
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
