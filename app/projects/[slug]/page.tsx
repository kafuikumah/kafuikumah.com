import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx/Mdx";
import Link from "next/link";
import { ChevronLeftIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <div className="flex flex-col gap-10 animate-in" style={{ "--index": 1 } as React.CSSProperties}>
      <Link href="/projects" className="flex items-center gap-1 text-tertiary hover:text-primary transition-colors text-sm w-fit">
        <ChevronLeftIcon className="w-4 h-4" />
        Back to Projects
      </Link>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
           <h1 className="text-4xl font-bold tracking-tight text-primary font-heading leading-tight underline underline-offset-8 decoration-primary/10">
            {project.title}
          </h1>
          <p className="text-secondary text-lg leading-relaxed max-w-2xl">{project.description}</p>
        </div>
        
        <div className="flex items-center justify-between gap-4 border-y border-primary/10 py-4 my-2">
          <span className="text-tertiary font-medium">{project.time}</span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-brand font-semibold hover:underline underline-offset-4"
          >
            Visit Website
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </a>
        </div>
      </div>

      <Mdx code={project.body.code} />
    </div>
  );
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}
