import { experience } from "@/content/experience";

export default function ExperienceList() {
  if (!experience?.length) {
    return (
      <p className="text-black/70 dark:text-neutral-400">
        Add your experience in <code className="rounded bg-brand-pink-soft px-1 text-brand-pink-dark">src/content/experience.js</code>.
      </p>
    );
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-1">
      {experience.map((job, i) => (
        <li
          key={i}
          className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900/50"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-white">
              {job.title}
            </h3>
            <span className="text-sm tabular-nums text-neutral-500 dark:text-neutral-400">
              {job.startDate} – {job.endDate}
            </span>
          </div>
          <p className="mt-0.5 text-sm font-medium text-brand-green">
            {job.company}
            {job.location && ` · ${job.location}`}
          </p>
          {job.tech?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {job.tech.map((t, k) => (
                <span
                  key={k}
                  className="rounded-md bg-brand-green-soft px-2 py-0.5 text-xs font-medium text-brand-green dark:bg-brand-green-soft/80"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-400">
            {job.bullets.map((bullet, j) => (
              <li key={j}>{bullet}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
