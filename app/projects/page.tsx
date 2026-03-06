import { allProjects } from "contentlayer/generated";
import ProjectSearch from "./ProjectSearch";

export const metadata = {
  title: "Projects | Kafui Kumah",
  description: "Here are some of the projects I've worked on.",
};

export default function Projects() {
  const projects = allProjects;

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div className="flex flex-col gap-8 animate-in" style={{ "--index": 1 } as React.CSSProperties}>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary font-heading">Projects</h1>
          <p className="max-w-xl text-secondary mt-2">
            Here are some of the projects I've worked on.
          </p>
        </div>
      </div>
      
      <div className="animate-in" style={{ "--index": 2 } as React.CSSProperties}>
        <ProjectSearch projects={projects} />
      </div>
    </div>
  );
}
