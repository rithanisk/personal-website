"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExperienceSlideshow } from "@/components/experience/ExperienceSlideshow";
import styles from "@/components/experience/ExperienceContent.module.css";
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
          <h3 className="truncate font-display text-[17px] sm:text-[21px]">{artifact.title}</h3>
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

function ArtifactLink({ artifact, onPreview }: { artifact: ExperienceArtifact; onPreview: () => void }) {
  const content = <><div className={styles.documentCover}>{artifact.preview ? <Image src={previewPageSrc(artifact, 1)} alt="" fill sizes="44px" className="object-contain" /> : <span aria-hidden="true">▤</span>}</div><div><h4>{artifact.title}</h4><p>{artifact.description ?? artifact.type}</p></div><span className={styles.documentAction}>{artifact.preview ? "Preview" : "View PDF"} ↗</span></>;
  return artifact.preview ? <button type="button" className={styles.document} onClick={onPreview}>{content}</button> : <a className={styles.document} href={artifact.href} target="_blank" rel="noopener noreferrer">{content}</a>;
}

function ExperienceEntry({ experience }: { experience: Experience }) {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [artifactsExpanded, setArtifactsExpanded] = useState(false);
  const [selectedArtifact, setSelectedArtifact] = useState<ExperienceArtifact | null>(null);
  const photos = experience.photos ?? [];
  const bullets = expanded ? experience.bullets : experience.bullets.slice(0, 3);

  return (
    <motion.article id={experience.id} className={styles.entry} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}>
      <section className={styles.detailsTile} aria-label={`${experience.company} role details`}>
        <header className={styles.entryHeader}>
          <div><p className={styles.dates}>{experience.dates}</p><h2>{experience.company}</h2><p className={styles.role}>{experience.title}</p><p className={styles.context}>{[experience.program, experience.location].filter(Boolean).join(" · ")}</p></div>
          {experience.current && <Badge variant="accent">Current</Badge>}
        </header>
        <div className={styles.copy}>
          {experience.overview && <p className={styles.overview}>{experience.overview}</p>}
          <ul className={styles.bullets}>{bullets.map((bullet, i) => <li key={i}><RichBullet>{bullet}</RichBullet></li>)}</ul>
          <div className={styles.stack}>{experience.stack.map((item) => <Badge key={item}>{item}</Badge>)}</div>
          {experience.bullets.length > 3 && <button type="button" className={styles.more} aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? "Show less" : "More about the work"}<ArrowIcon open={expanded} /></button>}
        </div>
      </section>
      {photos.length > 0 && <ExperienceSlideshow photos={photos} name={experience.company} />}
      {Boolean(experience.artifacts?.length) && (
        <section className={styles.artifacts} aria-label={`${experience.company} artifacts`}>
          <h3>
            <button type="button" className={styles.artifactsToggle} aria-expanded={artifactsExpanded} aria-controls={`${experience.id}-artifacts`} aria-label={`${artifactsExpanded ? "Hide" : "Show"} ${experience.company} artifacts`} onClick={() => setArtifactsExpanded(!artifactsExpanded)}>
              <span>{artifactsExpanded ? "Hide artifacts" : "Show artifacts"}<small>{experience.artifacts?.length}</small></span>
              <ArrowIcon open={artifactsExpanded} />
            </button>
          </h3>
          <div id={`${experience.id}-artifacts`} className={styles.artifactList} hidden={!artifactsExpanded}>
            {experience.artifacts?.map((artifact) => <ArtifactLink key={artifact.href} artifact={artifact} onPreview={() => setSelectedArtifact(artifact)} />)}
          </div>
        </section>
      )}
      <AnimatePresence>{selectedArtifact && <ArtifactViewer artifact={selectedArtifact} onClose={() => setSelectedArtifact(null)} />}</AnimatePresence>
    </motion.article>
  );
}

const timelineLabels: Record<string, string> = {
  "icu-mortality-research": "NUS Research",
  nia: "NiaHealth",
  "nus-ta": "IS1108",
  "nes-entrepreneurial-education": "NES Startathon",
  buymed: "Buymed",
};

export default function ExperiencePage() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(experiences[0]?.id);
  const timelineRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = Math.min(window.innerHeight * .3, 240);
      let active = experiences[0]?.id;
      for (const experience of experiences) {
        const section = document.getElementById(experience.id);
        if (section && section.getBoundingClientRect().top <= readingLine) active = experience.id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) active = experiences.at(-1)?.id ?? active;
      setActiveId(active);
    };
    const queue = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    update();
    return () => { window.removeEventListener("scroll", queue); window.removeEventListener("resize", queue); window.cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 900px)").matches) return;
    const timeline = timelineRef.current;
    const active = timeline?.querySelector<HTMLElement>(`[href="#${activeId}"]`);
    if (timeline && active) timeline.scrollTo({ left: active.offsetLeft + active.offsetWidth / 2 - timeline.clientWidth / 2, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, [activeId]);

  return (
    <main className={styles.page}>
      <motion.header className={styles.pageHeader} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}><div className="pf-eyebrow">Experience</div><h1>Where I’ve clocked in.</h1><p>Research, product work, and engineering across healthcare, education, and early-stage teams.</p></motion.header>
      <div className={styles.layout}>
        <motion.aside className={styles.timeline} initial={reduceMotion ? false : { opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5, delay: .1 }}><p>Along the way</p><nav ref={timelineRef} aria-label="Experience timeline">{experiences.map((experience) => <a key={experience.id} href={`#${experience.id}`} className={activeId === experience.id ? styles.active : undefined} aria-current={activeId === experience.id ? "location" : undefined}><span>{experience.dates}</span><strong>{timelineLabels[experience.id] ?? experience.company}</strong></a>)}</nav></motion.aside>
        <div className={styles.entries}>{experiences.map((experience) => <ExperienceEntry key={experience.id} experience={experience} />)}</div>
      </div>
    </main>
  );
}
