"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/shared/Badge";
import { experiences } from "@/content/experiences";
import type { Experience, ExperienceArtifact } from "@/types/content";

function RichBullet({ children }: { children: string }) {
  return children.split(/\*\*(.*?)\*\*/g).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-semibold" style={{ color: "var(--pf-text)" }}>
        {part}
      </strong>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

function ArrowIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-300"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function previewPageSrc(artifact: ExperienceArtifact, page: number) {
  const preview = artifact.preview;
  return `${preview?.basePath}/${preview?.filePrefix}-${String(page).padStart(2, "0")}.webp`;
}

function ArtifactViewer({ artifact, onClose }: { artifact: ExperienceArtifact; onClose: () => void }) {
  const [page, setPage] = useState(1);
  const pageCount = artifact.preview?.pageCount ?? 1;
  const pageLabel = artifact.type === "presentation" ? "slide" : "page";

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") setPage((current) => Math.max(1, current - 1));
      if (event.key === "ArrowRight") setPage((current) => Math.min(pageCount, current + 1));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, pageCount]);

  useEffect(() => {
    const nextPage = Math.min(pageCount, page + 1);
    if (nextPage === page) return;
    const nextPreviewPage = new window.Image();
    nextPreviewPage.src = previewPageSrc(artifact, nextPage);
  }, [artifact, page, pageCount]);

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${artifact.title} document viewer`}
      className="fixed inset-0 z-[100] flex flex-col p-3 sm:p-5"
      style={{ background: "rgba(25, 27, 20, 0.96)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-4 pb-3 text-white">
        <div className="min-w-0">
          <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/55">{artifact.type}</div>
          <h3 className="truncate font-serif text-[17px] sm:text-[21px]">{artifact.title}</h3>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={artifact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-white/20 px-3 py-2 text-[11px] text-white/80 transition-colors hover:bg-white/10 sm:block"
          >
            Open PDF ↗
          </a>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="Close document viewer"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/20 text-xl text-white transition-colors hover:bg-white/10"
          >
            ×
          </button>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 items-center justify-center overflow-hidden rounded-xl bg-black/25">
        <div
          className={
            artifact.preview?.aspect === "portrait"
              ? "relative h-full max-w-full aspect-[8.5/11]"
              : "relative aspect-video max-h-full w-full max-w-full"
          }
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={previewPageSrc(artifact, page)}
                alt={`${artifact.title}, ${pageLabel} ${page} of ${pageCount}`}
                fill
                priority={page === 1}
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={page === 1}
          aria-label="Previous page"
          className="absolute inset-y-0 left-0 w-1/3 cursor-w-resize disabled:cursor-default"
        />
        <button
          type="button"
          onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
          disabled={page === pageCount}
          aria-label="Next page"
          className="absolute inset-y-0 right-0 w-1/3 cursor-e-resize disabled:cursor-default"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
            className="pointer-events-auto grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-black/65 text-lg text-white backdrop-blur-sm transition-opacity disabled:cursor-default disabled:opacity-30"
            aria-label="Previous page"
          >
            ←
          </button>
          <span className="rounded-full bg-black/65 px-4 py-2 font-mono text-[11px] text-white backdrop-blur-sm">
            {page} / {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
            disabled={page === pageCount}
            className="pointer-events-auto grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-black/65 text-lg text-white backdrop-blur-sm transition-opacity disabled:cursor-default disabled:opacity-30"
            aria-label="Next page"
          >
            →
          </button>
        </div>
      </div>

      <div className="pt-2 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">
        Click either side or use your arrow keys
      </div>
    </motion.div>,
    document.body,
  );
}

function ArtifactCard({ artifact, onPreview }: { artifact: ExperienceArtifact; onPreview: () => void }) {
  if (artifact.preview) {
    const pageLabel = artifact.type === "presentation" ? "slides" : "pages";

    return (
      <button
        type="button"
        onClick={onPreview}
        className="group w-full cursor-pointer overflow-hidden rounded-xl text-left transition-transform hover:-translate-y-1"
        style={{ background: "var(--pf-surface-2)", border: "1px solid var(--pf-border)" }}
      >
        <div
          className={`relative overflow-hidden ${artifact.preview.aspect === "portrait" ? "aspect-[4/3]" : "aspect-video"}`}
          style={{ background: "color-mix(in oklab, var(--pf-surface) 76%, var(--pf-accent))" }}
        >
          <Image
            src={previewPageSrc(artifact, 1)}
            alt={`Preview of ${artifact.title}`}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-[1.025]"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 40vw"
          />
          <span className="absolute right-3 top-3 rounded-full bg-black/65 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white backdrop-blur-sm">
            Preview
          </span>
        </div>
        <div className="flex items-start justify-between gap-4 p-4">
          <div>
            <div
              className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.14em]"
              style={{ color: "var(--pf-amber-ink)" }}
            >
              {artifact.type} · {artifact.preview.pageCount} {pageLabel}
            </div>
            <h4 className="font-serif text-[18px] leading-tight">{artifact.title}</h4>
            {artifact.description && (
              <p className="mt-1.5 text-[12px] leading-relaxed" style={{ color: "var(--pf-text-muted)" }}>
                {artifact.description}
              </p>
            )}
          </div>
          <span className="mt-1 text-[16px] transition-transform group-hover:scale-110" aria-hidden="true">⤢</span>
        </div>
      </button>
    );
  }

  return (
    <a
      href={artifact.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start justify-between gap-4 rounded-xl p-4 transition-transform hover:-translate-y-0.5"
      style={{ background: "var(--pf-surface-2)", border: "1px solid var(--pf-border)" }}
    >
      <div>
        <div
          className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1.5"
          style={{ color: "var(--pf-amber-ink)" }}
        >
          {artifact.type}
        </div>
        <h4 className="font-serif text-[18px] leading-tight">{artifact.title}</h4>
        {artifact.description && (
          <p className="text-[13px] leading-relaxed mt-1.5" style={{ color: "var(--pf-text-muted)" }}>
            {artifact.description}
          </p>
        )}
      </div>
      <span
        className="text-[18px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      >
        ↗
      </span>
    </a>
  );
}

function ExperienceEntry({ experience, index }: { experience: Experience; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedArtifact, setSelectedArtifact] = useState<ExperienceArtifact | null>(null);
  const photos = experience.photos ?? [];
  const cardPhotos = experience.cardPhotos ?? photos.slice(0, 1);
  const hasDetails = Boolean(
    experience.reflection?.length || experience.artifacts?.length,
  );
  const detailId = `${experience.id}-details`;

  return (
    <motion.div
      className="relative pl-9 md:pl-14"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute left-[2px] md:left-[6px] top-7 z-10 w-3 h-3 rounded-full border-[3px]"
        style={{
          borderColor: "var(--pf-rose)",
          background: experience.current ? "var(--pf-rose)" : "var(--pf-surface)",
        }}
      />
      {experience.current && (
        <div
          className="absolute left-[2px] md:left-[6px] top-7 w-3 h-3 rounded-full animate-ping"
          style={{ background: "var(--pf-rose)", opacity: 0.22 }}
        />
      )}

      <article
        className="overflow-hidden rounded-2xl"
        style={{
          background: "var(--pf-surface)",
          border: "1px solid var(--pf-border)",
          boxShadow: "var(--pf-shadow)",
        }}
      >
        <div className={`grid ${cardPhotos.length ? "lg:grid-cols-[1.25fr_0.75fr]" : "grid-cols-1"}`}>
          <div className="p-5 sm:p-7 lg:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
                style={{ color: experience.current ? "var(--pf-rose)" : "var(--pf-text-dim)" }}
              >
                {experience.dates}
              </span>
              {experience.current && <Badge variant="accent">Current</Badge>}
            </div>

            <h2 className="font-serif text-[clamp(24px,3vw,34px)] font-light tracking-[-0.025em] leading-[1.05]">
              {experience.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-[13px]">
              <span className="font-medium" style={{ color: "var(--pf-rose)" }}>
                {experience.company}
              </span>
              {experience.program && (
                <>
                  <span style={{ color: "var(--pf-text-dim)" }}>·</span>
                  <span style={{ color: "var(--pf-text-muted)" }}>{experience.program}</span>
                </>
              )}
              <span style={{ color: "var(--pf-text-dim)" }}>·</span>
              <span style={{ color: "var(--pf-text-muted)" }}>{experience.location}</span>
            </div>

            {experience.overview && (
              <p className="text-[14px] leading-relaxed mt-4 max-w-[720px]" style={{ color: "var(--pf-text-muted)" }}>
                {experience.overview}
              </p>
            )}

            <div className="flex flex-wrap gap-1.5 mt-5">
              {experience.stack.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>

            <ul className="flex flex-col gap-3 mt-6 m-0 p-0 list-none">
              {experience.bullets.map((bullet, bulletIndex) => (
                <li
                  key={bulletIndex}
                  className="relative pl-5 text-[13.5px] sm:text-[14px] leading-[1.65]"
                  style={{ color: "var(--pf-text-muted)" }}
                >
                  <span
                    className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--pf-rose)", opacity: 0.55 }}
                  />
                  <RichBullet>{bullet}</RichBullet>
                </li>
              ))}
            </ul>
          </div>

          {cardPhotos.length > 0 && (
            <div
              className={`grid min-h-[260px] overflow-hidden bg-pf-surface-2 lg:min-h-full ${
                cardPhotos.length > 1 ? "grid-rows-2" : "grid-rows-1"
              }`}
            >
              {cardPhotos.map((photo) => (
                <div key={photo.src} className="group relative min-h-[210px] overflow-hidden lg:min-h-0">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    style={{ objectPosition: photo.objectPosition }}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    sizes="(max-width: 1024px) 100vw, 34vw"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 px-4 py-3 font-mono text-[11px] tracking-[0.04em]"
                    style={{
                      color: "rgba(255,255,255,0.9)",
                      background: "linear-gradient(transparent, rgba(0,0,0,0.58))",
                    }}
                  >
                    {photo.caption ?? experience.company}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {hasDetails && (
          <>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={detailId}
              onClick={() => setExpanded((value) => !value)}
              className="flex w-full items-center justify-between gap-4 px-5 sm:px-7 lg:px-8 py-4 text-left cursor-pointer"
              style={{ borderTop: "1px solid var(--pf-border)", color: "var(--pf-text-muted)" }}
            >
              <span className="text-[13px] font-medium">
                {expanded ? "Close details" : "Explore this experience"}
              </span>
              <ArrowIcon open={expanded} />
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={detailId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className="grid lg:grid-cols-2 gap-8 px-5 sm:px-7 lg:px-8 py-7 lg:py-9"
                    style={{ background: "var(--pf-bg-warm)", borderTop: "1px solid var(--pf-border)" }}
                  >
                    {experience.reflection?.length ? (
                      <section>
                        <div className="pf-eyebrow mb-4">Reflection</div>
                        <div className="space-y-4">
                          {experience.reflection.map((paragraph, paragraphIndex) => (
                            <p key={paragraphIndex} className="text-[14px] leading-[1.75]" style={{ color: "var(--pf-text-muted)" }}>
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </section>
                    ) : null}

                    {experience.artifacts?.length ? (
                      <section className={experience.reflection?.length ? "" : "lg:col-span-2"}>
                        <div className="pf-eyebrow mb-4">Artifacts</div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {experience.artifacts.map((artifact) => (
                            <ArtifactCard
                              key={artifact.href}
                              artifact={artifact}
                              onPreview={() => setSelectedArtifact(artifact)}
                            />
                          ))}
                        </div>
                      </section>
                    ) : null}

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </article>
      <AnimatePresence>
        {selectedArtifact && (
          <ArtifactViewer artifact={selectedArtifact} onClose={() => setSelectedArtifact(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ExperiencePage() {
  return (
    <main className="px-5 md:px-[72px] pt-20 md:pt-24 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pf-eyebrow mb-5">Experience</div>
        <h1 className="font-serif font-light text-[clamp(36px,5vw,64px)] tracking-[-0.035em] leading-[0.95]">
          Where I&apos;ve{" "}
          <span className="italic" style={{ color: "var(--pf-accent)" }}>clocked in</span>
        </h1>
        <p className="font-serif text-xl leading-[1.45] font-light mt-6 max-w-[620px]" style={{ color: "var(--pf-text-muted)" }}>
          Research, product work, and engineering across healthcare, education, and fast-moving teams.
        </p>
      </motion.div>

      <div className="relative max-w-[1180px] mt-14 md:mt-16">
        <div
          className="absolute left-[7px] md:left-[11px] top-7 bottom-8 w-px"
          style={{ background: "color-mix(in oklab, var(--pf-rose) 38%, var(--pf-border))" }}
          aria-hidden="true"
        />
        <div className="flex flex-col gap-8 md:gap-10">
          {experiences.map((experience, index) => (
            <ExperienceEntry key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
