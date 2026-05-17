"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { projects } from "@/content/projects";
import type { Project } from "@/types/content";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="px-5 md:px-[72px] pt-[130px] pb-20">
      <div className="pf-eyebrow mb-5">Projects</div>
      <h1
        className="font-serif font-light tracking-[-0.035em] leading-[0.95]"
        style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
      >
        Research, engineering, and{" "}
        <span className="italic" style={{ color: "var(--pf-amber-ink)" }}>experiments</span>.
      </h1>
      <p
        className="font-serif text-xl font-light mt-6 max-w-[580px]"
        style={{ color: "var(--pf-text-muted)" }}
      >
        Side projects and research across ML, NLP, and cloud engineering.
      </p>
      <div className="grid md:grid-cols-2 gap-5 mt-12">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
