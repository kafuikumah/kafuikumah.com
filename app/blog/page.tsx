import { allPosts } from "contentlayer/generated";
import BlogSearch from "./BlogSearch";

export default function Blog() {
  const posts = allPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div className="flex flex-col gap-8 animate-in" style={{ "--index": 1 } as React.CSSProperties}>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary font-heading">Blog</h1>
          <p className="max-w-xl text-secondary mt-2">
            I write about my experience as a developer, founder, and more!
          </p>
        </div>
      </div>

      <div className="animate-in" style={{ "--index": 2 } as React.CSSProperties}>
        <BlogSearch posts={posts} />
      </div>
    </div>
  );
}
