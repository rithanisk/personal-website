import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/content/projects";

export const metadata = {
  title: "Projects — Rithani Saravanakumar",
};

export default function ProjectsPage() {
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
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </main>
  );
}
