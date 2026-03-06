import Link from "next/link";
import { Post } from "contentlayer/generated";
import { formatDate } from "@/lib/formatDate";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="flex flex-col gap-4 animated-list">
      {posts.map((post, i) => (
        <li key={post.slug} className="transition-opacity" style={{ "--index": i } as React.CSSProperties}>
          <Link href={`/blog/${post.slug}`} className="flex items-baseline gap-12 group py-2">
            <time className="text-secondary text-sm shrink-0 w-28">
              {formatDate(post.publishedAt)}
            </time>
            <h3 className="text-primary group-hover:text-secondary transition-colors text-sm md:text-base">
              {post.title}
            </h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
