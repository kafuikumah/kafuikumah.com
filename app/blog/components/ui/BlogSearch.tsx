"use client";

import { useState } from "react";
import type { Post as PostType } from ".contentlayer/generated";
import PostList from "./PostList";
import Input from "./Input";
import { IconSearch } from "./Icons";

type Props = {
    posts: PostType[];
};

export default function BlogSearch({ posts }: Props) {
    const [search, setSearch] = useState("");

    const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.summary?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-8">
            <Input
                id="search"
                type="search"
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                pfix={<IconSearch className="h-5 w-5 text-secondary" />}
            />
            <PostList posts={filtered} />
        </div>
    );
}
