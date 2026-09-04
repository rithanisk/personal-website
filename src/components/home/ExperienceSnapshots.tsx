"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@/components/shared/Icons";

type BubbleProps = {
  size?: number;
  x?: number;
  y?: number;
  palette?: { a: string; b: string; c: string };
  caption?: string;
  accent: string;
  kind?: "photo" | "code" | "chart" | "team" | "doc" | "lab";
};

function Bubble({ size = 150, x = 0, y = 0, palette, caption, kind = "photo" }: BubbleProps) {
  const p = palette || { a: "#e8b7c1", b: "#c98391", c: "#6b3842" };
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        left: `calc(50% + ${x}px - ${size / 2}px)`,
        top: `calc(50% + ${y}px - ${size / 2}px)`,
        width: size,
        height: size,
        borderRadius: "50%",
        border: "2px solid var(--pf-surface)",
        boxShadow: "0 12px 30px rgba(20,18,15,0.18)",
        background: `
          radial-gradient(ellipse 70% 60% at 30% 30%, ${p.b}, transparent 60%),
          radial-gradient(ellipse 60% 60% at 75% 75%, ${p.c}, transparent 55%),
          linear-gradient(140deg, ${p.a} 0%, color-mix(in oklab, ${p.a} 65%, #000) 100%)
        `,
      }}
    >
      {/* grain */}
      <div className="absolute inset-0" style={{ background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='n'><feTurbulence baseFrequency='1.0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/></svg>")`, mixBlendMode: "overlay", opacity: 0.35 }} />
      {/* icon */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ color: "rgba(255,255,255,0.85)" }}>
        {kind === "photo" && <svg width={size * 0.32} height={size * 0.32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><circle cx="12" cy="13" r="4" /><path d="M3 8h3l2-3h8l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" /></svg>}
        {kind === "code" && <svg width={size * 0.34} height={size * 0.34} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" /></svg>}
        {kind === "chart" && <svg width={size * 0.34} height={size * 0.34} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m7 14 3-3 4 4 5-7" /></svg>}
        {kind === "team" && <svg width={size * 0.34} height={size * 0.34} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c1-4 3.5-6 6-6s5 2 6 6M14 19c.5-3 2.5-4 4-4s3 1 3.5 3" /></svg>}
        {kind === "doc" && <svg width={size * 0.34} height={size * 0.34} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg>}
        {kind === "lab" && <svg width={size * 0.34} height={size * 0.34} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6M10 3v7L4 20a2 2 0 0 0 1.7 3h12.6A2 2 0 0 0 20 20l-6-10V3" /><path d="M7 16h10" /></svg>}
      </div>
      {/* caption chip */}
      {caption && (
        <div
          className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-2 py-[3px] rounded-full whitespace-nowrap"
          style={{
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            fontFamily: "var(--font-mono)",
            fontSize: 8.5,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}

type SnapshotProps = {
  tone: "rose" | "forest" | "amber";
  company: string;
  role: string;
  dates: string;
  summary: string;
  bubbles: Omit<BubbleProps, "accent">[];
  reverse?: boolean;
};

function ExperienceSnapshot({ tone, company, role, dates, summary, bubbles, reverse }: SnapshotProps) {
  const accent = `var(--pf-${tone})`;
  const accentInk = `var(--pf-${tone}-ink)`;
  const accentSoft = `var(--pf-${tone}-soft)`;

  return (
    <div
      className="grid gap-14 items-center py-10"
      style={{ gridTemplateColumns: reverse ? "1fr 1.4fr" : "1.4fr 1fr" }}
    >
      {/* Text */}
      <div style={{ order: reverse ? 2 : 1 }}>
        <div className="inline-flex items-center gap-2.5 mb-[18px]">
          <span
            className="inline-flex items-center gap-1.5 px-[11px] py-[5px] rounded-full font-mono text-[10px] tracking-[0.18em] uppercase font-medium"
            style={{
              background: accentSoft,
              color: accentInk,
              border: `1px solid color-mix(in oklab, ${accent} 22%, var(--pf-border))`,
            }}
          >
            {dates}
          </span>
          <span className="font-mono text-[10.5px] tracking-[0.14em]" style={{ color: "var(--pf-text-dim)" }}>
            · {company}
          </span>
        </div>
        <h3
          className="font-serif font-normal tracking-[-0.02em] leading-[1.12] mb-[18px]"
          style={{ fontSize: 38, color: "var(--pf-text)" }}
        >
          {role}
        </h3>
        <p className="font-serif text-[19px] leading-[1.55] font-light" style={{ color: "var(--pf-text-muted)" }}>
          {summary}
        </p>
        <Link
          href="/experience"
          className="inline-flex items-center gap-1.5 mt-[22px] text-[13.5px] font-medium pb-[2px] cursor-pointer"
          style={{
            color: accentInk,
            borderBottom: `1px solid color-mix(in oklab, ${accent} 35%, transparent)`,
          }}
        >
          Read the full story <ArrowRightIcon />
        </Link>
      </div>

      {/* Bubbles */}
      <div className="relative h-[280px] hidden md:flex items-center" style={{ order: reverse ? 1 : 2, justifyContent: reverse ? "flex-start" : "flex-end" }}>
        {bubbles.map((b, i) => (
          <Bubble key={i} {...b} accent={accent} />
        ))}
      </div>
    </div>
  );
}

export function ExperienceSnapshots() {
  return (
    <section className="px-5 md:px-[72px] mt-6">
      <div className="flex items-baseline justify-between mb-3 pb-[18px] border-b border-pf-border">
        <div>
          <div className="pf-eyebrow mb-2.5">Snapshots</div>
          <h2 className="font-serif font-light text-[clamp(26px,3.5vw,40px)] tracking-[-0.025em] leading-[1.05]">
            Where I&apos;ve{" "}
            <span style={{ color: "var(--pf-forest-ink)" }}>built</span> things.
          </h2>
        </div>
        <Link href="/experience" className="text-[13px] inline-flex items-center gap-1.5" style={{ color: "var(--pf-text-muted)" }}>
          See full timeline <ArrowRightIcon />
        </Link>
      </div>

      <div className="flex flex-col">
        <ExperienceSnapshot
          tone="rose"
          dates="AUG 2025 — NOW · TORONTO"
          company="Nia Health"
          role="Software / AI Engineer Intern"
          summary="Building async GPT parsing pipelines and a CGM data system in FastAPI + React. Cut report parsing latency by 70% and shipped end-to-end glucose review tooling deployed on Azure."
          bubbles={[
            { size: 170, x: -80, y: -30, kind: "code", caption: "Pipeline · v2", palette: { a: "#aa6373", b: "#e3b8a3", c: "#6b3842" } },
            { size: 130, x: 80, y: 40, kind: "team", caption: "Toronto stand-up", palette: { a: "#c98391", b: "#e8c5cb", c: "#5a2a36" } },
            { size: 100, x: 120, y: -70, kind: "doc", caption: "Report v3.2", palette: { a: "#b87080", b: "#dfa3ad", c: "#4d1f29" } },
          ]}
        />
        <div className="h-px" style={{ background: "var(--pf-border)", margin: "8px 0" }} />
        <ExperienceSnapshot
          tone="forest"
          reverse
          dates="AUG 2024 — APR 2025 · SINGAPORE"
          company="National University of Singapore"
          role="Teaching Assistant — Digital Ethics & Data Privacy"
          summary="Led tutorials on responsible AI, data privacy law, and digital ethics for IS1108. Marked projects, ran discussions, and helped students think critically about AI policy."
          bubbles={[
            { size: 160, x: 90, y: -20, kind: "team", caption: "Tutorial · Wk 6", palette: { a: "#5d7a52", b: "#a8c49f", c: "#1a2a14" } },
            { size: 120, x: -70, y: 40, kind: "doc", caption: "IS1108", palette: { a: "#7a9472", b: "#c1d6b9", c: "#2f4827" } },
            { size: 100, x: -120, y: -60, kind: "photo", caption: "NUS · COM1", palette: { a: "#677f5b", b: "#b3c8a9", c: "#243519" } },
          ]}
        />
        <div className="h-px" style={{ background: "var(--pf-border)", margin: "8px 0" }} />
        <ExperienceSnapshot
          tone="amber"
          dates="MAY 2024 — AUG 2024 · HCMC"
          company="Buymed"
          role="Software Engineer Intern"
          summary="Shipped 10+ features in a high-traffic Next.js + MongoDB app, built a Go-based scraping pipeline cutting manual data work by 80%, and prototyped an internal RAG search system."
          bubbles={[
            { size: 165, x: -80, y: -30, kind: "chart", caption: "−80% manual", palette: { a: "#c8824a", b: "#e8b97f", c: "#5a3815" } },
            { size: 125, x: 80, y: 50, kind: "code", caption: "Go scraper", palette: { a: "#b87538", b: "#dca57a", c: "#4d2e10" } },
            { size: 100, x: 130, y: -60, kind: "lab", caption: "RAG · v0", palette: { a: "#a06b34", b: "#c89868", c: "#3f2510" } },
          ]}
        />
      </div>
    </section>
  );
}
