
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
            title?: string;
            avatar?: string;
            organization?: string;
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

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ... inside component ...

    const [activeTab, setActiveTab] = useState<"edit" | "preview" | "split">("split");

    // ... handle submit ...

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-[1600px] mx-auto h-[calc(100vh-140px)] flex flex-col">
            <div className="flex items-center justify-between bg-[var(--color-card)] p-4 rounded-xl border border-[var(--color-border)]">
                <div className="flex items-center gap-4">
                     <h2 className="text-xl font-bold font-serif">{isNew ? "New Post" : formData.title}</h2>
                     <div className="flex items-center gap-1 bg-[var(--color-background)] rounded-lg p-1 border border-[var(--color-border)]">
                        <button
                            type="button"
                            onClick={() => setActiveTab("edit")}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition ${activeTab === 'edit' ? 'bg-brand-primary text-white' : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)]'}`}
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("split")}
                            className={`hidden lg:block px-3 py-1 text-xs font-medium rounded-md transition ${activeTab === 'split' ? 'bg-brand-primary text-white' : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)]'}`}
                        >
                            Split
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("preview")}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition ${activeTab === 'preview' ? 'bg-brand-primary text-white' : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)]'}`}
                        >
                            Preview
                        </button>
                     </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-brand-primary text-white px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 text-sm font-semibold shadow-lg shadow-brand-primary/20"
                >
                    {loading ? "Saving..." : "Save Post"}
                </button>
            </div>

            {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    {error}
                </div>
            )}

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
                {/* Meta Sidebar */}
                <div className="lg:col-span-3 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)] border-b border-[var(--color-border)] pb-2 mb-3">Meta Data</h3>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium mb-1">Title</label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm focus:ring-1 focus:ring-brand-primary"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1">Slug</label>
                                <input
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-muted)]"
                                    required
                                    readOnly={!isNew}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1">Category</label>
                                <input
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm"
                                    required
                                />
                            </div>
                             <div>
                                <label className="block text-xs font-medium mb-1">Tags</label>
                                <input
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm"
                                    placeholder="law, justice"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm">
                         <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)] border-b border-[var(--color-border)] pb-2 mb-3">Author</h3>
                         <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium mb-1">Name</label>
                                <input
                                    name="authorName"
                                    value={formData.authorName}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm"
                                />
                            </div>
                         </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className={`lg:col-span-9 flex flex-col h-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm ${activeTab === 'split' ? 'grid grid-cols-2 divide-x divide-[var(--color-border)]' : ''}`}>
                    
                    {/* Editor Pane */}
                    <div className={`flex flex-col h-full ${(activeTab === 'preview') ? 'hidden' : 'block'}`}>
                        <div className="bg-[var(--color-background)] px-4 py-2 border-b border-[var(--color-border)] flex justify-between items-center">
                            <span className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">Markdown Source</span>
                        </div>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="flex-1 w-full p-4 bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed"
                            placeholder="# Write your masterpiece..."
                            required
                        />
                    </div>

                    {/* Preview Pane */}
                    <div className={`flex flex-col h-full overflow-y-auto bg-[var(--color-background)] custom-scrollbar ${(activeTab === 'edit') ? 'hidden' : 'block'}`}>
                         <div className="bg-[var(--color-card)] px-4 py-2 border-b border-[var(--color-border)] sticky top-0 z-10">
                            <span className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">Live Preview</span>
                        </div>
                        <div className="p-8 prose prose-sm max-w-none dark:prose-invert">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {formData.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
