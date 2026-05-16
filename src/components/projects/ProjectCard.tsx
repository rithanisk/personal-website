"use client";

import { Badge } from "@/components/shared/Badge";
import { motion } from "framer-motion";
import type { Project } from "@/types/content";

type Palette = { a: string; b: string; c: string };

const defaultPalettes: Palette[] = [
  { a: "#aa6373", b: "#e3b8a3", c: "#6b3842" },
  { a: "#22361b", b: "#9fb59a", c: "#c8824a" },
  { a: "#c8824a", b: "#e8b97f", c: "#5a3815" },
  { a: "#8a7fa8", b: "#c0b5dc", c: "#4f466a" },
  { a: "#5c7a99", b: "#8aafc8", c: "#324d6b" },
];

export function ProjectCard({
  project,
  index = 0,
  palette,
  hover,
}: {
  project: Project;
  index?: number;
  palette?: Palette;
  hover?: boolean;
}) {
  const p = palette || defaultPalettes[index % defaultPalettes.length];

  return (
    <motion.div
      className="relative overflow-hidden transition-all duration-300"
      style={{
        background: "var(--pf-surface)",
        border: `1px solid ${hover ? "color-mix(in oklab, var(--pf-rose) 28%, var(--pf-border))" : "var(--pf-border)"}`,
        borderRadius: 16,
        boxShadow: hover ? "var(--pf-glow)" : "var(--pf-shadow)",
        minHeight: 320,
        transform: hover ? "perspective(1200px) rotateX(2deg) rotateY(-3deg) translateY(-4px)" : "none",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      {/* Visual header */}
      <div
        className="h-[170px] relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 20% 30%, ${p.b}, transparent 58%),
            radial-gradient(ellipse 60% 50% at 80% 70%, ${p.c}, transparent 55%),
            linear-gradient(135deg, ${p.a} 0%, color-mix(in oklab, ${p.a} 60%, #000) 100%)
          `,
        }}
      >
        {/* grain */}
        <div
          className="absolute inset-0"
          style={{
            background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='.9'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/></svg>")`,
            mixBlendMode: "overlay",
            opacity: 0.4,
          }}
        />
        {/* chart lines */}
        <svg viewBox="0 0 400 180" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" style={{ opacity: 0.55 }}>
          <path d="M 0 140 Q 60 90, 110 110 T 220 85 T 340 60 T 400 50" fill="none" stroke="#fff" strokeWidth="2" strokeOpacity="0.7" />
          <path d="M 0 160 Q 60 130, 110 140 T 220 125 T 340 110 T 400 100" fill="none" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.4" />
          <g fill="#fff" fillOpacity="0.7">
            <circle cx="110" cy="110" r="3" /><circle cx="220" cy="85" r="3" /><circle cx="340" cy="60" r="3" />
          </g>
        </svg>
        {/* arrow button */}
        <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.9)", color: "#1a0f15" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M7 17L17 7M8 7h9v9" /></svg>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <h3 className="font-serif font-normal text-[22px] tracking-[-0.02em] leading-[1.15] mb-2" style={{ color: "var(--pf-text)" }}>
          {project.name}
        </h3>
        <p className="text-[13.5px] leading-relaxed tracking-tight line-clamp-3 md:line-clamp-4 mb-4" style={{ color: "var(--pf-text-muted)" }}>
          {project.blurb}
        </p>
        <div className="flex flex-wrap gap-[5px]">
          {project.stack.slice(0, 5).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
