import { experience } from "@/content/experience";

export default function ExperienceList() {
  if (!experience?.length) {
    return (
      <p className="text-black/70">
        Add your experience in <code className="rounded bg-brand-pink-soft px-1 text-brand-pink-dark">src/content/experience.js</code>.
      </p>
    );
  }
  return (
    <ul className="relative">
      {/* Vertical timeline line */}
      <span
        className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-brand-pink/40"
        aria-hidden
      />
      {experience.map((job, i) => (
        <li key={i} className="relative pl-10 pb-12 last:pb-0">
          {/* Timeline node */}
          <span
            className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-brand-pink bg-white ring-2 ring-white"
            aria-hidden
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-black">
                {job.title}
              </h3>
              <span className="text-sm font-medium text-black/60 tabular-nums">
                {job.startDate} – {job.endDate}
              </span>
            </div>
            <p className="mt-0.5 font-medium text-brand-green">
              {job.company}
              {job.location && ` · ${job.location}`}
            </p>
            {job.tech?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {job.tech.map((t, k) => (
                  <span
                    key={k}
                    className="rounded-md bg-brand-green-soft px-2 py-0.5 text-xs font-medium text-brand-green"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            <ul className="mt-3 list-disc space-y-1 pl-5 text-black/75">
              {job.bullets.map((bullet, j) => (
                <li key={j}>{bullet}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
