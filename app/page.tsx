import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { allPosts } from "contentlayer/generated";
import PostList from "./blog/components/ui/PostList";

export default function Home() {
  const latestPosts = allPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* ... existing introduction section ... */}
      <div className="flex flex-col gap-8 animate-in" style={{ "--index": 1 } as React.CSSProperties}>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Kafui Kumah
          </h1>
          <p className="text-secondary font-heading">
            Full-Stack Engineer · Product Designer · Founder
          </p>
        </div>

        <p className="max-w-lg text-primary">
          Full-stack software engineer and product designer with a decade of
          experience building digital products for startups, agencies, and
          institutional clients across Africa and beyond.
        </p>

        <p className="max-w-lg text-primary">
          As Founder of{" "}
          <a
            href="https://nerdionsystems.com"
            target="_blank"
            className="underline underline-offset-4 hover:text-secondary transition-colors"
          >
            Nerdion Systems
          </a>
          , I design and develop decision-support tools and data intelligence
          platforms for governments, international development organizations,
          and institutional clients.
        </p>

        <ul className="flex flex-col gap-2 text-secondary md:flex-row md:gap-6">
          <li>
            <a
              href="mailto:kafui.kofi.kumah@gmail.com"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <ArrowUpRightIcon className="h-5 w-5" />
              <span>Email me</span>
            </a>
          </li>
          <li>
            <Link
              href="/about"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <ArrowUpRightIcon className="h-5 w-5" />
              <span>Learn more about me</span>
            </Link>
          </li>
        </ul>
      </div>

      <div
        className="flex flex-col gap-8 animate-in"
        style={{ "--index": 2 } as React.CSSProperties}
      >
        <h2 className="text-xl font-bold tracking-tight text-primary">Blog</h2>
        <PostList posts={latestPosts} />
        <Link
          href="/blog"
          className="text-secondary underline underline-offset-4 hover:text-primary transition-colors text-sm"
        >
          See All Posts
        </Link>
      </div>
    </div>
  );
}
