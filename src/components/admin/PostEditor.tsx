"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
    PhotoIcon, 
    LinkIcon, 
    ListBulletIcon, 
    QueueListIcon,
    CodeBracketIcon, 
    CommandLineIcon
} from "@heroicons/react/24/outline";

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
    const [activeTab, setActiveTab] = useState<"edit" | "preview" | "split">("split");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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

    // Formatting Logic
    const insertFormat = (type: string, arg?: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = formData.content;
        const selection = text.substring(start, end);
        
        let before = "";
        let after = "";
        let newSelection = selection;

        switch (type) {
            case "bold":
                before = "**";
                after = "**";
                break;
            case "italic":
                before = "*";
                after = "*";
                break;
            case "strikethrough":
                before = "~~";
                after = "~~";
                break;
            case "heading":
                before = "## ";
                break;
            case "quote":
                before = "> ";
                break;
            case "list-ul":
                before = "- ";
                break;
            case "list-ol":
                before = "1. ";
                break;
            case "code":
                before = "`";
                after = "`";
                break;
            case "code-block":
                before = "```\n";
                after = "\n```";
                break;
            case "link":
                const url = arg || prompt("Enter URL:");
                if (!url) return;
                before = "[";
                after = `](${url})`;
                break;
            case "image":
                const imgUrl = arg || prompt("Enter Image URL:");
                if (!imgUrl) return;
                before = "![";
                after = `](${imgUrl})`;
                newSelection = selection || "Alt Text";
                break;
        }

        const newText = text.substring(0, start) + before + newSelection + after + text.substring(end);
        
        // Update state
        setFormData(prev => ({ ...prev, content: newText }));

        // Restore focus and selection (async to wait for render)
        setTimeout(() => {
            textarea.focus();
            const newCursorPos = start + before.length + newSelection.length + after.length;
            // If wrapping, select the inner text
            if (type === 'bold' || type === 'italic' || type === 'strikethrough' || type === 'code') {
                 textarea.setSelectionRange(start + before.length, start + before.length + newSelection.length);
            } else {
                 textarea.setSelectionRange(newCursorPos, newCursorPos);
            }
        }, 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.ctrlKey || e.metaKey)) {
            switch(e.key.toLowerCase()) {
                case 'b':
                    e.preventDefault();
                    insertFormat('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    insertFormat('italic');
                    break;
                case 'k':
                    e.preventDefault();
                    insertFormat('link');
                    break;
                case 's': // Strikethrough? Usually Shift+CMD+X or something, but let's override save?
                    // Let's keep S for save usually, but here we can check shift
                    if (e.shiftKey) {
                        e.preventDefault();
                        insertFormat('strikethrough');
                    }
                    break;
            }
        }
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
                {/* Meta Sidebar - Unchanged */}
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
                            <div>
                                <label className="block text-xs font-medium mb-1">Excerpt</label>
                                <textarea
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm h-20 resize-none"
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
                             <div>
                                <label className="block text-xs font-medium mb-1">Title</label>
                                <input
                                    name="authorTitle"
                                    value={formData.authorTitle}
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
                        {/* Toolbar */}
                        <div className="bg-[var(--color-background)] px-3 py-2 border-b border-[var(--color-border)] flex flex-wrap items-center gap-1">
                             <ToolbarBtn onClick={() => insertFormat('bold')} label="Bold (Ctrl+B)" icon={<span className="font-bold text-lg leading-none font-serif">B</span>} />
                             <ToolbarBtn onClick={() => insertFormat('italic')} label="Italic (Ctrl+I)" icon={<span className="italic text-lg leading-none font-serif">I</span>} />
                             <ToolbarBtn onClick={() => insertFormat('strikethrough')} label="Strikethrough" icon={<span className="line-through text-lg leading-none font-serif">S</span>} />
                             <div className="w-px h-5 bg-[var(--color-border)] mx-1" />
                             <ToolbarBtn onClick={() => insertFormat('heading')} label="Heading" icon={<span className="font-bold text-sm leading-none">H</span>} />
                             <ToolbarBtn onClick={() => insertFormat('quote')} label="Quote" icon={<span className="font-serif italic text-lg leading-none">“</span>} />
                             <ToolbarBtn onClick={() => insertFormat('code')} label="Inline Code" icon={<CodeBracketIcon className="w-4 h-4" />} />
                             <div className="w-px h-5 bg-[var(--color-border)] mx-1" />
                             <ToolbarBtn onClick={() => insertFormat('list-ul')} label="Bullet List" icon={<ListBulletIcon className="w-4 h-4" />} />
                             <ToolbarBtn onClick={() => insertFormat('list-ol')} label="Numbered List" icon={<QueueListIcon className="w-4 h-4" />} />
                             <div className="w-px h-5 bg-[var(--color-border)] mx-1" />
                             <ToolbarBtn onClick={() => insertFormat('link')} label="Link (Ctrl+K)" icon={<LinkIcon className="w-4 h-4" />} />
                             <ToolbarBtn onClick={() => insertFormat('image')} label="Image" icon={<PhotoIcon className="w-4 h-4" />} />
                        </div>

                        <textarea
                            ref={textareaRef}
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            className="flex-1 w-full p-4 bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed"
                            placeholder="# Write your masterpiece..."
                            required
                        />
                    </div>

                    {/* Preview Pane */}
                    <div className={`flex flex-col h-full overflow-y-auto bg-[var(--color-background)] custom-scrollbar ${(activeTab === 'edit') ? 'hidden' : 'block'}`}>
                         <div className="bg-[var(--color-card)] px-4 py-2 border-b border-[var(--color-border)] sticky top-0 z-10 flex justify-between items-center h-[45px]">
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

function ToolbarBtn({ onClick, icon, label }: { onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={label}
            className="p-1.5 rounded hover:bg-[var(--color-card)] text-[var(--color-muted)] hover:text-brand-primary transition-colors flex items-center justify-center min-w-[28px] min-h-[28px]"
        >
            {icon}
        </button>
    );
}