"use client";

import Link from "next/link";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/content/projects";
import { ArrowRightIcon } from "@/components/shared/Icons";

export function ProjectsGrid() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="px-5 md:px-[72px] mt-[72px] pb-[100px]">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <div className="pf-eyebrow mb-2.5">Featured work</div>
          <h2 className="font-serif font-light text-[clamp(26px,3.5vw,40px)] tracking-[-0.025em] leading-[1.05]">
            Selected{" "}
            <span style={{ color: "var(--pf-amber-ink)" }}>projects</span>.
          </h2>
        </div>
        <Link href="/projects" className="text-[13px] inline-flex items-center gap-1.5" style={{ color: "var(--pf-text-muted)" }}>
          Browse all {projects.length} <ArrowRightIcon />
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {featured.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            palette={i === 0 ? { a: "#aa6373", b: "#e3b8a3", c: "#6b3842" } : { a: "#22361b", b: "#9fb59a", c: "#c8824a" }}
            hover={i === 0}
          />
        ))}
      </div>
    </section>
  );
}
