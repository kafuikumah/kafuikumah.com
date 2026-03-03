import { Metadata } from "next";
import { allProjects } from ".contentlayer/generated";
import ProjectSearch from "./ProjectSearch";

export const metadata: Metadata = {
  title: "Projects | Kafui Kumah",
  description: "Here are some of the projects I've worked on.",
};

export default function Projects() {
  const projects = allProjects;

  return (
    <div className="mx-auto max-w-[700px]">
      <div className="flex flex-col gap-16 md:gap-24">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="animate-in text-3xl font-bold tracking-tight">
              Projects
            </h1>
            <p
              className="animate-in text-secondary"
              style={{ "--index": 1 } as React.CSSProperties}
            >
              Here are some of the projects I&apos;ve worked on.
            </p>
          </div>
        </div>
        <div
          className="animate-in"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <ProjectSearch projects={projects} />
        </div>
      </div>
    </div>
  );
}
