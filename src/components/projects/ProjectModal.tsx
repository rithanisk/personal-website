"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/shared/Badge";
import type { Project } from "@/types/content";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 10,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (project) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, handleKeyDown]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-[900px] max-h-[85vh] overflow-y-auto rounded-2xl"
            style={{
              background: "var(--pf-surface)",
              border: "1px solid var(--pf-border)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
            }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150"
              style={{
                background: "var(--pf-surface-2)",
                border: "1px solid var(--pf-border)",
                color: "var(--pf-text-muted)",
              }}
              aria-label="Close modal"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Left — Media */}
              <div className="md:w-[45%] p-6 flex flex-col gap-4">
                {project.videoSrc && (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/5">
                    <video
                      src={project.videoSrc}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {project.images?.map((src, i) => (
                  <div
                    key={i}
                    className="relative w-full aspect-video rounded-xl overflow-hidden"
                    style={{ background: "var(--pf-surface-2)" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${project.name} screenshot ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {!project.videoSrc && !project.images?.length && (
                  <div
                    className="w-full aspect-video rounded-xl flex items-center justify-center"
                    style={{ background: "var(--pf-surface-2)", color: "var(--pf-text-dim)" }}
                  >
                    <span className="text-sm">No media available</span>
                  </div>
                )}
              </div>

              {/* Right — Details */}
              <div className="md:w-[55%] p-6 md:pl-2">
                <h2
                  className="font-serif font-normal text-[26px] tracking-[-0.02em] leading-tight mb-3"
                  style={{ color: "var(--pf-text)" }}
                >
                  {project.name}
                </h2>

                <p
                  className="text-[14px] leading-relaxed mb-5"
                  style={{ color: "var(--pf-text-muted)" }}
                >
                  {project.description || project.blurb}
                </p>

                {/* Bullets */}
                {project.bullets.length > 0 && (
                  <ul className="space-y-2 mb-5">
                    {project.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="text-[13px] leading-relaxed pl-4 relative"
                        style={{ color: "var(--pf-text-muted)" }}
                      >
                        <span
                          className="absolute left-0 top-[7px] w-1.5 h-1.5 rounded-full"
                          style={{ background: "var(--pf-rose)" }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>

                {/* Links */}
                {(project.github || project.live) && (
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150"
                        style={{
                          background: "var(--pf-surface-2)",
                          border: "1px solid var(--pf-border)",
                          color: "var(--pf-text)",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150"
                        style={{
                          background: "var(--pf-rose-soft)",
                          border: "1px solid color-mix(in oklab, var(--pf-rose) 25%, var(--pf-border))",
                          color: "var(--pf-rose-ink)",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
