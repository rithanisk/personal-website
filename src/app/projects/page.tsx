"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { projects } from "@/content/projects";
import type { Project } from "@/types/content";

const categories: Array<{
  name: Project["category"];
  color: string;
}> = [
  { name: "Product/SWE", color: "var(--pf-rose)" },
  { name: "Artificial Intelligence", color: "var(--pf-forest-ink)" },
  { name: "Machine Learning", color: "var(--pf-amber-ink)" },
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
      <div className="flex flex-col gap-14 mt-12">
        {categories.map((category) => {
          const categoryProjects = projects.filter(
            (project) => project.category === category.name,
          );

          return (
            <section key={category.name}>
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: category.color }}
                />
                <h2 className="font-serif text-[26px] font-light tracking-[-0.02em]">
                  {category.name}
                </h2>
                <span
                  className="font-mono text-[11px]"
                  style={{ color: "var(--pf-text-dim)" }}
                >
                  {categoryProjects.length.toString().padStart(2, "0")}
                </span>
                <div
                  className="h-px flex-1 ml-2"
                  style={{ background: "var(--pf-border)" }}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {categoryProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={projects.indexOf(project)}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
