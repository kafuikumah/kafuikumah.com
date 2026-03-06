"use client";

import { useState } from "react";
import { Post } from "contentlayer/generated";
import PostList from "./components/ui/PostList";

export default function BlogSearch({ posts }: { posts: Post[] }) {
    const [query, setQuery] = useState("");

    const filteredPosts = posts.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.summary.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-12">
            <div className="relative group max-w-sm">
                <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-tertiary group-focus-within:text-primary transition-colors"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Search blog..."
                    className="w-full bg-secondary/20 rounded-full pl-11 pr-4 py-3 outline-none focus:ring-2 ring-primary/20 transition-all text-sm border border-primary/10 font-sans"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="animate-in" style={{ "--index": 2 } as React.CSSProperties}>
                <PostList posts={filteredPosts} />
                {filteredPosts.length === 0 && (
                    <p className="text-secondary text-center py-20 font-sans">No posts found for "{query}"</p>
                )}
            </div>
        </div>
    );
}
