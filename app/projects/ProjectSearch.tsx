"use client";

import { useState } from "react";
import { Project } from "contentlayer/generated";
import Link from "next/link";

export default function ProjectSearch({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()))
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
          placeholder="Search projects..."
          className="w-full bg-secondary/20 rounded-full pl-11 pr-4 py-3 outline-none focus:ring-2 ring-primary/20 transition-all text-sm border border-primary/10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-12">
        {filteredProjects.map((project, i) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="group flex flex-col md:flex-row gap-8 items-start">
            <div className="relative w-full md:w-64 aspect-video shrink-0 rounded-xl overflow-hidden bg-secondary/10 border border-primary/5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              {/* Note: In a real app we'd use project.thumbnail if available */}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors font-heading leading-tight">
                  {project.title} <span className="text-tertiary font-normal ml-2">· {project.time}</span>
                </h3>
                <p className="text-secondary text-sm leading-relaxed">{project.description}</p>
              </div>
            </div>
          </Link>
        ))}
        {filteredProjects.length === 0 && (
          <p className="text-secondary text-center py-20 font-sans">No projects found for "{query}"</p>
        )}
      </div>
    </div>
  );
}
