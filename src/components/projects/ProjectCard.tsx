"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/shared/Badge";
import type { Project } from "@/types/content";

type Palette = { a: string; b: string; c: string };

const categoryColors = {
  "Product/SWE": "var(--pf-rose)",
  "Artificial Intelligence": "var(--pf-forest-ink)",
  "Machine Learning": "var(--pf-amber-ink)",
};

export function ProjectCard({
  project,
  index = 0,
  onClick,
}: {
  project: Project;
  index?: number;
  palette?: Palette;
  hover?: boolean;
  onClick?: () => void;
}) {
  const image = project.id === "mudra" ? "/media-v1/bharatnatyam.webp" : undefined;
  const categoryColor = categoryColors[project.category];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group relative flex h-full min-h-[390px] w-full cursor-pointer flex-col overflow-hidden rounded-[20px] text-left"
      style={{
        background: "var(--pf-bg)",
        border: "1px solid var(--pf-border)",
        boxShadow: "var(--pf-shadow)",
      }}
      initial={{ opacity: 0, y: 24, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: (index % 2) * 0.06,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      whileHover={{ y: -5, boxShadow: "var(--pf-shadow-lg)" }}
    >
      <div
        className="relative aspect-[16/9] w-full overflow-hidden"
        style={{ background: "var(--pf-surface-2)" }}
      >
        {image ? (
          <Image
            src={image}
            alt={`${project.name} preview`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            style={{
              background: `color-mix(in oklab, ${categoryColor} 8%, var(--pf-bg))`,
            }}
          >
            <span
              className="font-serif text-[clamp(72px,10vw,132px)] font-light tracking-[-0.08em] opacity-[0.1]"
              style={{ color: categoryColor }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="absolute text-[11px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: "var(--pf-text-muted)" }}
            >
              View project
            </span>
          </div>
        )}

        <div className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md">
          {project.category}
        </div>
        <div className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#1a1610] shadow-sm backdrop-blur-md transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--pf-text-dim)" }}
          >
            Project
          </span>
          <span className="text-[10px] tracking-[0.12em]" style={{ color: "var(--pf-text-dim)" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="font-serif text-[24px] font-normal leading-[1.08] tracking-[-0.025em]" style={{ color: "var(--pf-text)" }}>
          {project.name}
        </h3>
        <p className="mt-3 line-clamp-3 text-[13.5px] leading-relaxed tracking-tight" style={{ color: "var(--pf-text-muted)" }}>
          {project.blurb}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.stack.slice(0, 5).map((technology) => (
            <Badge key={technology}>{technology}</Badge>
          ))}
        </div>
      </div>
    </motion.button>
  );
}
