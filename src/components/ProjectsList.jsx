import { projects } from "@/content/projects";

export default function ProjectsList() {
  if (!projects?.length) {
    return (
      <p className="text-black/70 dark:text-neutral-400">
        Add your projects in <code className="rounded bg-brand-green-soft px-1 text-brand-green">src/content/projects.js</code>.
      </p>
    );
  }
  return (
    <>
      {projects.map((project, i) => (
        <article
          key={i}
          className="rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-neutral-700"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-white">
              {project.name}
            </h3>
            {(project.startDate || project.endDate) && (
              <span className="shrink-0 text-sm tabular-nums text-neutral-500 dark:text-neutral-400">
                {[project.startDate, project.endDate].filter(Boolean).join(" – ")}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {project.description}
          </p>
            {project.tech?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t, j) => (
                <span
                  key={j}
                  className="rounded-full bg-brand-green-soft px-2.5 py-1 text-xs font-medium text-brand-green dark:bg-brand-green-soft/80"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          {project.bullets?.length > 0 && (
            <ul className="mt-4 space-y-2 border-t border-neutral-200 pt-4 dark:border-neutral-700">
              {project.bullets.map((bullet, j) => (
                <li key={j} className="flex gap-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
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
        </article>
      ))}
    </>
  );
}
