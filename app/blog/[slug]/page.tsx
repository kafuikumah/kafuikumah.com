import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx/Mdx";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import { PostIllustration } from "@/components/illustrations/Post";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <div className="flex flex-col gap-10 animate-in" style={{ "--index": 1 } as React.CSSProperties}>
      <Link href="/blog" className="flex items-center gap-1 text-tertiary hover:text-primary transition-colors text-sm w-fit">
        <ChevronLeftIcon className="w-4 h-4" />
        Back to Blog
      </Link>
      
      <header className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-heading leading-tight">
          {post.title}
        </h1>
        <p className="text-secondary text-lg leading-relaxed">{post.summary}</p>
        <div className="flex items-center gap-2 text-tertiary text-sm">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span>{readingTime(post.body.raw)} min read</span>
        </div>
      </header>

      <PostIllustration slug={post.slug} />

      <Mdx code={post.body.code} />
    </div>
  );
}

function readingTime(text: string) {
  return Math.max(1, Math.round(text.split(/\s+/).length / 225));
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}
