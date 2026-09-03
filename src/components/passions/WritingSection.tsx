"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { writingEntries } from "@/content/writing";
import type { WritingEntry } from "@/types/content";

function WritingCard({ entry, index }: { entry: WritingEntry; index: number }) {
  const [open, setOpen] = useState(false);
  const contentId = `writing-${entry.slug}`;

  return (
    <motion.article
      className="overflow-hidden rounded-2xl"
      style={{
        background: "var(--pf-surface)",
        border: "1px solid var(--pf-border)",
        boxShadow: "var(--pf-shadow)",
      }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={contentId}
        className="w-full text-left p-5 sm:p-7 cursor-pointer"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <time
              className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
              style={{ color: "var(--pf-rose)" }}
            >
              {entry.date}
            </time>
            <h2 className="font-serif text-[25px] sm:text-[29px] font-light tracking-[-0.025em] leading-tight mt-2">
              {entry.title}
            </h2>
            {entry.excerpt && (
              <p className="text-[14px] leading-relaxed mt-2 max-w-[680px]" style={{ color: "var(--pf-text-muted)" }}>
                {entry.excerpt}
              </p>
            )}
          </div>
          <span
            className="text-[20px] transition-transform duration-300 shrink-0"
            style={{ color: "var(--pf-text-dim)", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
            aria-hidden="true"
          >
            +
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="px-5 sm:px-7 py-6 space-y-5 max-w-[760px]"
              style={{ borderTop: "1px solid var(--pf-border)", background: "var(--pf-bg-warm)" }}
            >
              {entry.body.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className="font-serif text-[18px] sm:text-[19px] font-light leading-[1.75]"
                  style={{ color: "var(--pf-text-muted)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function WritingSection() {
  if (writingEntries.length === 0) {
    return (
      <motion.div
        className="relative overflow-hidden rounded-2xl px-6 py-12 sm:px-10 sm:py-16 text-center"
        style={{ background: "var(--pf-rose-soft)", color: "var(--pf-rose-ink)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] opacity-65">Notes, eventually</div>
        <h2 className="font-serif text-[28px] sm:text-[34px] font-light tracking-[-0.025em] mt-3">
          A corner for unfinished thoughts.
        </h2>
        <p className="text-[14px] leading-relaxed max-w-[500px] mx-auto mt-3 opacity-75">
          Short pieces, reflections, and whatever else feels worth writing down will live here.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-[900px]">
      {writingEntries.map((entry, index) => (
        <WritingCard key={entry.slug} entry={entry} index={index} />
      ))}
    </div>
  );
}
