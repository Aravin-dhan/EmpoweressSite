
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface PostEditorProps {
    initialData?: {
        title: string;
        slug: string;
        date: string;
        excerpt: string;
        category: string;
        tags: string[];
        featuredImage: string;
        content: string;
        author: {
            name: string;
            title: string;
            avatar: string;
            organization: string;
        }
    };
    isNew?: boolean;
}

export function PostEditor({ initialData, isNew = false }: PostEditorProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        date: initialData?.date || new Date().toISOString().split("T")[0],
        excerpt: initialData?.excerpt || "",
        category: initialData?.category || "",
        tags: initialData?.tags.join(", ") || "",
        featuredImage: initialData?.featuredImage || "",
        content: initialData?.content || "",
        authorName: initialData?.author.name || "Amrita Azad",
        authorTitle: initialData?.author.title || "Founding Editor",
        authorAvatar: initialData?.author.avatar || "",
        authorOrg: initialData?.author.organization || "Empoweress",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const password = sessionStorage.getItem("admin_password");
        if (!password) {
            setError("Not authenticated");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/portal/posts", {
                method: isNew ? "POST" : "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-password": password,
                },
                body: JSON.stringify({
                    ...formData,
                    // Split tags string back into array
                    tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
                    isNew
                }),
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg || "Failed to save post");
            }

            router.push("/site-portal");
            router.refresh();
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{isNew ? "Create New Post" : `Edit: ${formData.title}`}</h2>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-brand-primary text-white px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Post"}
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
                <h3 className="text-lg font-semibold border-b border-[var(--color-border)] pb-2 mb-4">Meta Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Slug (URL)</label>
                        <input
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2"
                            required
                            readOnly={!isNew} // Lock slug for existing posts to avoid drift
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Date (YYYY-MM-DD)</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <input
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Excerpt</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange} // Corrected
                            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 h-20"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Featured Image URL</label>
                        <input
                            name="featuredImage"
                            value={formData.featuredImage}
                            onChange={handleChange}
                            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2"
                            placeholder="https://..."
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                        <input
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2"
                            placeholder="feminism, law, justice"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
                <h3 className="text-lg font-semibold border-b border-[var(--color-border)] pb-2 mb-4">Author Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            name="authorName"
                            value={formData.authorName}
                            onChange={handleChange}
                            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            name="authorTitle"
                            value={formData.authorTitle}
                            onChange={handleChange}
                            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Organization</label>
                        <input
                            name="authorOrg"
                            value={formData.authorOrg}
                            onChange={handleChange}
                            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Avatar URL</label>
                        <input
                            name="authorAvatar"
                            value={formData.authorAvatar}
                            onChange={handleChange}
                            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
                <h3 className="text-lg font-semibold border-b border-[var(--color-border)] pb-2 mb-4">Content (MDX)</h3>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 font-mono text-sm h-[500px]"
                    required
                />
            </div>
        </form>
    );
}
