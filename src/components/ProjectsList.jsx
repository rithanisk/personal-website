import { projects } from "@/content/projects";

export default function ProjectsList() {
  if (!projects?.length) {
    return (
      <p className="text-black/70">
        Add your projects in <code className="rounded bg-brand-green-soft px-1 text-brand-green">src/content/projects.js</code>.
      </p>
    );
  }
  return (
    <ul className="grid gap-6 sm:grid-cols-1">
      {projects.map((project, i) => (
        <li
          key={i}
          className="group relative overflow-hidden rounded-xl border border-brand-green/15 bg-white shadow-sm transition hover:border-brand-pink/25 hover:shadow-md"
        >
          {/* Accent bar */}
          <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-brand-green to-brand-pink opacity-80" aria-hidden />
          <div className="pl-6 pr-6 py-5 sm:pl-7 sm:pr-6 sm:py-6">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-xl font-semibold tracking-tight text-black">
                {project.name}
              </h3>
              {(project.startDate || project.endDate) && (
                <span className="shrink-0 text-sm text-black/55 tabular-nums">
                  {[project.startDate, project.endDate].filter(Boolean).join(" – ")}
                </span>
              )}
            </div>
            <p className="mt-3 leading-relaxed text-black/75">
              {project.description}
            </p>
            {project.tech?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t, j) => (
                  <span
                    key={j}
                    className="rounded-full bg-brand-green-soft px-2.5 py-1 text-xs font-medium text-brand-green"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            {project.bullets?.length > 0 && (
              <ul className="mt-4 space-y-2 border-t border-black/5 pt-4">
                {project.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-2 text-sm leading-relaxed text-black/75">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-pink" aria-hidden />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-pink transition hover:text-brand-pink-dark hover:underline"
              >
                View project
                <span aria-hidden>→</span>
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
