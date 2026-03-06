import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx/Mdx";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
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
      
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-heading leading-tight">
          {post.title}
        </h1>
        <time className="text-secondary text-sm">
          {formatDate(post.publishedAt)}
        </time>
      </div>

      <Mdx code={post.body.code} />
    </div>
  );
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}
