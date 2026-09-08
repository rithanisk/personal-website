"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { projects } from "@/content/projects";
import type { Project } from "@/types/content";

const projectLayouts = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-7",
  "md:col-span-5",
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="px-5 md:px-[72px] pt-20 md:pt-24 pb-20">
      <div className="pf-eyebrow mb-5">Projects</div>
      <h1
        className="font-serif font-light tracking-[-0.035em] leading-[0.95]"
        style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
      >
        Side quests when I&apos;m{" "}
        <span style={{ color: "var(--pf-amber-ink)" }}>
          bored
        </span>
      </h1>
      <p
        className="font-serif text-xl font-light mt-6 max-w-[580px]"
        style={{ color: "var(--pf-text-muted)" }}
      >
        Side projects and research across ML, NLP, and cloud engineering.
      </p>
      <div className="mt-10 flex items-center justify-between border-y border-pf-border py-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--pf-text-dim)" }}>
          Selected builds
        </span>
        <span className="text-[12px]" style={{ color: "var(--pf-text-muted)" }}>
          {projects.length} projects · 3 disciplines
        </span>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-12">
        {projects.map((project, index) => (
          <div key={project.id} className={projectLayouts[index]}>
            <ProjectCard
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          </div>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
