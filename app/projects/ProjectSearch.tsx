"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { Project } from ".contentlayer/generated";
import Halo from "@/components/ui/Halo";
import Input from "@/app/blog/components/ui/Input";
import { IconSearch } from "@/app/blog/components/ui/Icons";

type Props = {
    projects: Project[];
};

export default function ProjectSearch({ projects }: Props) {
    const [search, setSearch] = useState("");

    const filtered = projects.filter(
        (project) =>
            project.title.toLowerCase().includes(search.toLowerCase()) ||
            project.description?.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className="flex flex-col gap-8">
            <Input
                id="project-search"
                type="search"
                placeholder="Search projects…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                pfix={<IconSearch className="h-5 w-5 text-secondary" />}
            />
            <ul className="animated-list flex animate-in flex-col">
                {filtered.length === 0 && (
                    <p className="text-secondary">No projects found.</p>
                )}
                {filtered.map((project) => (
                    <li
                        key={project.slug}
                        className={clsx(
                            "flex flex-col gap-4 py-6 transition-opacity first:pt-0 last:pb-0 md:flex-row md:gap-6",
                        )}
                    >
                        <Link
                            href={`/projects/${project.slug}`}
                            className="relative aspect-video w-full select-none overflow-clip rounded-lg border border-secondary bg-tertiary md:w-2/5"
                        >
                            <Halo strength={10}>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="h-full w-full"
                                />
                            </Halo>
                        </Link>
                        <div className="w-full space-y-2 md:w-3/5">
                            <div>
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="font-medium text-primary hover:underline"
                                >
                                    {project.title}
                                </Link>
                                <time className="text-secondary"> · {project.time}</time>
                            </div>
                            <p className="line-clamp-3 text-tertiary">{project.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
