"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
export const MONO = 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, monospace';

export type Accent = { ink: string; soft: string };

/* Entry animations play once when the tile scrolls in. Loops only run while the
   tile is on screen, and nothing moves when the visitor prefers reduced motion. */
export function useTileMotion() {
  const ref = useRef<HTMLDivElement>(null);
  const entered = useInView(ref, { once: true, margin: "-40px" });
  const visible = useInView(ref, { margin: "0px" });
  const reduce = useReducedMotion() ?? false;
  return { ref, entered: entered || reduce, loop: visible && !reduce, reduce };
}

export function FeatureHeader({
  index,
  kind = "project",
  accent,
  title,
  description,
  stack,
}: {
  index: string;
  kind?: string;
  accent: Accent;
  title: ReactNode;
  description: string;
  stack: string[];
}) {
  return (
    <div className="absolute left-4 right-4 top-4 z-[3] md:left-5 md:right-5 md:top-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span
          className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em]"
          style={{ color: accent.ink }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.ink }} />
          {kind}
        </span>
        <span className="font-mono text-[9px] tracking-[0.14em]" style={{ color: "var(--pf-text-dim)" }}>
          {index}
        </span>
      </div>

      <h3 className="-mt-0.5 flex flex-wrap items-baseline gap-x-[0.28em] font-serif text-[24px] leading-[1.08] tracking-[-0.035em] md:text-[26px]">
        {title}
      </h3>

      <p
        className="mt-2.5 line-clamp-2 text-[13px] leading-relaxed tracking-tight"
        style={{ color: "var(--pf-text-muted)" }}
      >
        {description}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {stack.map((item) => (
          <span
            key={item}
            className="whitespace-nowrap rounded-full border px-2 py-1 text-[9px] leading-none"
            style={{
              color: accent.ink,
              borderColor: `color-mix(in oklab, ${accent.ink} 28%, transparent)`,
              background: `color-mix(in oklab, ${accent.soft} 34%, var(--pf-surface))`,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── 07 · Agent Observability ─────────────────────────── */

const traceSpans = [
  { label: "orchestrator", depth: 0, start: 0, width: 100, dur: "2.41s", kind: "agent" },
  { label: "planner", depth: 1, start: 1, width: 15, dur: "0.36s", kind: "llm" },
  { label: "web_search", depth: 1, start: 17, width: 33, dur: "0.82s", kind: "tool" },
  { label: "code_exec", depth: 1, start: 51, width: 22, dur: "timeout", kind: "error" },
  { label: "code_exec ↻", depth: 1, start: 74, width: 12, dur: "0.29s", kind: "tool" },
  { label: "summarize", depth: 1, start: 87, width: 13, dur: "0.31s", kind: "llm" },
] as const;

const spanFill: Record<(typeof traceSpans)[number]["kind"], string> = {
  agent: "rgba(108, 195, 174, 0.38)",
  llm: "#9db7f0",
  tool: "#d9b26c",
  error: "repeating-linear-gradient(135deg, #ef7d6b 0 4px, #c95e4f 4px 8px)",
};

export function AgentObservabilityFeature() {
  const accent = { ink: "var(--tile-ink)", soft: "var(--tile-soft)" };
  const { ref, entered, loop, reduce } = useTileMotion();

  return (
    <div className="pf-tile-observability absolute inset-0">
      <div
        className="absolute inset-x-0 bottom-0 h-[180px]"
        style={{
          background: "radial-gradient(ellipse at 30% 100%, rgba(66, 140, 128, 0.2), transparent 70%)",
        }}
      />

      <div
        ref={ref}
        className="absolute bottom-[6px] left-1/2 z-[1] w-[300px] -translate-x-[56%] -rotate-[2.5deg]"
      >
        {/* Backdrop blob, tilted a little further than the panel */}
        <div
          className="absolute -bottom-10 -left-[4%] -right-[6%] -top-4 origin-bottom-left -rotate-[2.5deg] rounded-[28px]"
          style={{ background: "rgba(66, 140, 128, 0.16)" }}
        />

        <div
          className="relative overflow-hidden rounded-[14px] p-3 pb-2.5"
          style={{
            background: "#121715",
            fontFamily: MONO,
            boxShadow: "0 16px 36px rgba(12, 24, 21, 0.26), inset 0 0 0 1px rgba(255,255,255,0.07)",
          }}
        >
          {/* Window chrome */}
          <div className="mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {["#ef7d6b", "#e6c27a", "#6cc3ae"].map((c) => (
                  <span key={c} className="h-[6px] w-[6px] rounded-full" style={{ background: c, opacity: 0.8 }} />
                ))}
              </div>
              <span className="text-[8.5px] tracking-[0.02em]" style={{ color: "rgba(255,255,255,0.55)" }}>
                trace · run_8f2a
              </span>
            </div>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-1.5 py-[3px] text-[7px] uppercase tracking-[0.16em]"
              style={{ color: "#8fe0c9", background: "rgba(108, 195, 174, 0.12)" }}
            >
              <motion.span
                className="h-[5px] w-[5px] rounded-full"
                style={{ background: "#6cc3ae" }}
                animate={loop ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
                transition={loop ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : undefined}
              />
              live
            </span>
          </div>

          {/* Time axis */}
          <div className="mb-1 flex text-[7px]" style={{ color: "rgba(255,255,255,0.28)" }}>
            <span className="w-[72px] shrink-0" />
            <div className="flex flex-1 justify-between">
              {["0s", "0.6", "1.2", "1.8", "2.4"].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <span className="w-[36px] shrink-0" />
          </div>

          {/* Span waterfall */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-[72px] right-[36px] overflow-hidden">
              {[25, 50, 75].map((p) => (
                <span
                  key={p}
                  className="absolute inset-y-0 w-px"
                  style={{ left: `${p}%`, background: "rgba(255,255,255,0.05)" }}
                />
              ))}
              {!reduce && (
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent 70%, rgba(108, 195, 174, 0.09))",
                  }}
                  initial={{ x: "-100%" }}
                  animate={loop ? { x: ["-100%", "0%"] } : { x: "-100%" }}
                  transition={
                    loop ? { duration: 3.6, repeat: Infinity, ease: "linear", repeatDelay: 0.9 } : undefined
                  }
                >
                  <span
                    className="absolute inset-y-0 right-0 w-px"
                    style={{ background: "rgba(143, 224, 201, 0.75)", boxShadow: "0 0 8px rgba(108,195,174,0.8)" }}
                  />
                </motion.div>
              )}
            </div>

            {traceSpans.map((span, i) => {
              const isError = span.kind === "error";
              return (
                <div key={`${span.label}-${i}`} className="flex h-[15px] items-center">
                  <span
                    className="w-[72px] shrink-0 truncate text-[8px]"
                    style={{ color: isError ? "#f3a093" : "rgba(255,255,255,0.7)" }}
                  >
                    {span.depth > 0 && <span style={{ color: "rgba(255,255,255,0.22)" }}>└ </span>}
                    {span.label}
                  </span>
                  <div className="relative h-[8px] flex-1">
                    <motion.span
                      className="absolute top-0 h-full rounded-[3px]"
                      style={{
                        left: `${span.start}%`,
                        width: `${span.width}%`,
                        background: spanFill[span.kind],
                        originX: 0,
                      }}
                      initial={reduce ? false : { scaleX: 0 }}
                      animate={entered ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 + i * 0.14, ease }}
                    />
                  </div>
                  <span
                    className="w-[36px] shrink-0 text-right text-[7.5px]"
                    style={{ color: isError ? "#f3a093" : "rgba(255,255,255,0.4)" }}
                  >
                    {span.dur}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Run summary */}
          <div
            className="mt-2 flex items-center justify-between border-t pt-2 text-[7.5px]"
            style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.42)" }}
          >
            <span>
              tokens <span style={{ color: "rgba(255,255,255,0.82)" }}>12.4k</span>
            </span>
            <span>
              p95 <span style={{ color: "rgba(255,255,255,0.82)" }}>1.82s</span>
            </span>
            <span>
              tools <span style={{ color: "rgba(255,255,255,0.82)" }}>4</span>
            </span>
            <span style={{ color: "#f3a093" }}>1 error</span>
          </div>
        </div>

        {/* Floating eval card */}
        <motion.div
          className="absolute -right-[50px] -top-[22px] z-[2] w-[116px] rotate-[5deg] rounded-[11px] border p-2"
          style={{
            background: "var(--pf-surface)",
            borderColor: "var(--pf-border)",
            boxShadow: "0 10px 24px rgba(20, 18, 15, 0.14)",
          }}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 1.2, duration: 0.5, ease }}
        >
          <div
            className="flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.12em]"
            style={{ color: accent.ink }}
          >
            <span>eval</span>
            <span style={{ color: "var(--pf-text-dim)" }}>v12 → v13</span>
          </div>
          <svg viewBox="0 0 100 30" className="mt-1.5 block h-[26px] w-full" aria-hidden>
            <polyline
              points="2,21 15,18 28,19 41,14 54,13 67,10 80,11"
              fill="none"
              style={{ stroke: accent.ink }}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="80,11 96,24"
              fill="none"
              stroke="#d0533f"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="2.5 2"
            />
            <circle cx="96" cy="24" r="2.6" fill="#d0533f" />
          </svg>
          <div className="mt-1 flex items-center gap-1 text-[8.5px] leading-none" style={{ color: "var(--pf-text)" }}>
            <span className="h-1 w-1 rounded-full" style={{ background: "#d0533f" }} />
            regression caught
          </div>
        </motion.div>
      </div>

      <FeatureHeader
        index="07"
        accent={accent}
        title={
          <>
            <span>Agent</span>
            <span className="italic" style={{ color: accent.ink }}>
              Observability
            </span>
          </>
        }
        description="Live traces of multi-agent tool calls, latency, and tokens, with an eval harness that catches regressions."
        stack={["React", "TypeScript", "WebSockets", "LLM Evals"]}
      />
    </div>
  );
}

/* ─────────────────────────── 08 · Sepsis Mortality ─────────────────────────── */

const CHART_W = 276;
const CHART_H = 84;
const RISK = [0.1, 0.12, 0.14, 0.17, 0.21, 0.26, 0.33, 0.41, 0.5, 0.6, 0.69, 0.76, 0.82];
const THRESHOLD = 0.55;
const riskY = (r: number) => CHART_H - 6 - r * (CHART_H - 14);
const riskPoints = RISK.map((r, i) => [(i / (RISK.length - 1)) * CHART_W, riskY(r)] as [number, number]);

function smoothPath(pts: [number, number][]) {
  let d = `M${pts[0][0]},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

const riskLine = smoothPath(riskPoints);
const riskArea = `${riskLine} L${CHART_W},${CHART_H} L0,${CHART_H} Z`;
const crossIdx = RISK.findIndex((r) => r >= THRESHOLD);
const crossT =
  crossIdx - 1 + (THRESHOLD - RISK[crossIdx - 1]) / (RISK[crossIdx] - RISK[crossIdx - 1]);
const alertX = (crossT / (RISK.length - 1)) * CHART_W;
const alertY = riskY(THRESHOLD);
const abxX = (3 / 48) * CHART_W;

export function SepsisFeature() {
  const accent = { ink: "var(--tile-ink)", soft: "var(--tile-soft)" };
  const alert = "var(--tile-alert)";
  const alertSoft = "var(--tile-alert-soft)";
  const drawDelay = 0.35;
  const drawDuration = 2.4;
  const alertDelay = drawDelay + drawDuration * (alertX / CHART_W);
  const { ref, entered, loop, reduce } = useTileMotion();

  return (
    <div className="pf-tile-sepsis absolute inset-0">
      <div
        className="absolute inset-x-0 bottom-0 h-[170px]"
        style={{
          background: "radial-gradient(ellipse at 70% 100%, rgba(84, 130, 178, 0.2), transparent 70%)",
        }}
      />

      <div ref={ref} className="absolute -bottom-[2px] left-1/2 z-[1] w-[300px] -translate-x-1/2 rotate-[2.5deg]">
        <div
          className="absolute -bottom-10 -left-[6%] -right-[3%] -top-4 origin-bottom-right rotate-[2.5deg] rounded-[28px]"
          style={{ background: "rgba(84, 130, 178, 0.16)" }}
        />

        <div
          className="relative rounded-[16px] border p-3"
          style={{
            background: "var(--pf-surface)",
            borderColor: "var(--pf-border)",
            boxShadow: "0 16px 36px rgba(28, 46, 66, 0.16)",
          }}
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <div className="font-mono text-[7.5px] uppercase tracking-[0.14em]" style={{ color: "var(--pf-text-dim)" }}>
                ICU stay · MIMIC-III
              </div>
              <div className="mt-0.5 text-[11px] font-medium leading-tight" style={{ color: "var(--pf-text)" }}>
                Mortality risk, first 48h
              </div>
            </div>
            <div className="relative h-[16px] w-[64px]">
              <motion.span
                className="absolute inset-0 inline-flex items-center justify-center gap-1 rounded-full font-mono text-[7.5px] uppercase tracking-[0.12em]"
                style={{ color: accent.ink, background: `color-mix(in oklab, ${accent.soft} 60%, var(--pf-surface))` }}
                initial={reduce ? false : { opacity: 1 }}
                animate={{ opacity: entered && !reduce ? 0 : reduce ? 0 : 1 }}
                transition={{ delay: alertDelay, duration: 0.25 }}
              >
                stable
              </motion.span>
              <motion.span
                className="absolute inset-0 inline-flex items-center justify-center gap-1 rounded-full font-mono text-[7.5px] uppercase tracking-[0.12em]"
                style={{ color: alert, background: alertSoft }}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: entered ? 1 : 0 }}
                transition={{ delay: reduce ? 0 : alertDelay, duration: 0.25 }}
              >
                <span className="h-1 w-1 rounded-full" style={{ background: alert }} />
                alert
              </motion.span>
            </div>
          </div>

          {/* Risk curve */}
          <div className="relative">
            <svg
              viewBox={`0 0 ${CHART_W} ${CHART_H}`}
              className="block h-auto w-full overflow-visible"
              role="img"
              aria-label="Illustrative sepsis mortality risk rising over the first 48 hours and crossing the alert threshold"
            >
              <defs>
                <linearGradient id="sepsis-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" style={{ stopColor: accent.ink, stopOpacity: 0.22 }} />
                  <stop offset="100%" style={{ stopColor: accent.ink, stopOpacity: 0 }} />
                </linearGradient>
              </defs>

              {[0.25, 0.5, 0.75].map((g) => (
                <line
                  key={g}
                  x1="0"
                  x2={CHART_W}
                  y1={CHART_H * g}
                  y2={CHART_H * g}
                  stroke="var(--pf-border)"
                  strokeWidth="1"
                />
              ))}

              {/* First antibiotic dose marker */}
              <line x1={abxX} x2={abxX} y1="6" y2={CHART_H} stroke="var(--pf-text-dim)" strokeWidth="1" strokeDasharray="2 3" />
              <text x={abxX + 4} y="11" fontSize="7" fill="var(--pf-text-dim)" style={{ fontFamily: MONO }}>
                abx
              </text>

              {/* Alert threshold */}
              <line
                x1="0"
                x2={CHART_W}
                y1={alertY}
                y2={alertY}
                style={{ stroke: alert }}
                strokeOpacity="0.55"
                strokeWidth="1"
                strokeDasharray="4 3"
              />

              <motion.path
                d={riskArea}
                fill="url(#sepsis-area)"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: entered ? 1 : 0 }}
                transition={{ delay: drawDelay + drawDuration * 0.6, duration: 0.8 }}
              />
              <motion.path
                d={riskLine}
                fill="none"
                style={{ stroke: accent.ink }}
                strokeWidth="2"
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: entered ? 1 : 0 }}
                transition={{ delay: drawDelay, duration: drawDuration, ease: "easeInOut" }}
              />

              <motion.g
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: entered ? 1 : 0 }}
                transition={{ delay: reduce ? 0 : alertDelay, duration: 0.3 }}
              >
                <motion.circle
                  cx={alertX}
                  cy={alertY}
                  r="4"
                  style={{ fill: alert, transformBox: "fill-box", transformOrigin: "center" }}
                  animate={loop ? { scale: [1, 3.2], opacity: [0.4, 0] } : { scale: 1, opacity: 0 }}
                  transition={loop ? { duration: 1.8, repeat: Infinity, ease: "easeOut" } : undefined}
                />
                <circle cx={alertX} cy={alertY} r="3.4" style={{ fill: alert, stroke: "var(--pf-surface)" }} strokeWidth="1.5" />
              </motion.g>
            </svg>

            <motion.span
              className="absolute -translate-x-full -translate-y-full whitespace-nowrap rounded-[5px] px-1.5 py-[3px] font-mono text-[7px] uppercase tracking-[0.1em]"
              style={{
                left: `${(alertX / CHART_W) * 100}%`,
                top: `${(alertY / CHART_H) * 100}%`,
                marginLeft: -6,
                marginTop: -5,
                color: alert,
                background: alertSoft,
              }}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
              transition={{ delay: reduce ? 0 : alertDelay + 0.15, duration: 0.35, ease }}
            >
              early warning
            </motion.span>
          </div>

          {/* LSTM time steps, one per 4h window */}
          <div className="mt-2 flex gap-[3px]">
            {RISK.map((r, i) => {
              const past = i >= crossIdx;
              return (
                <motion.span
                  key={i}
                  className="h-[8px] flex-1 rounded-[2.5px]"
                  style={{ background: past ? alert : accent.ink }}
                  initial={reduce ? false : { opacity: 0.1 }}
                  animate={{ opacity: entered ? 0.25 + r * 0.75 : 0.1 }}
                  transition={{ delay: reduce ? 0 : drawDelay + drawDuration * (i / (RISK.length - 1)), duration: 0.3 }}
                />
              );
            })}
          </div>
          <div
            className="mt-1 flex justify-between font-mono text-[7px] uppercase tracking-[0.1em]"
            style={{ color: "var(--pf-text-dim)" }}
          >
            <span>0h</span>
            <span>lstm · 4h windows</span>
            <span>48h</span>
          </div>
        </div>
      </div>

      <FeatureHeader
        index="08"
        accent={accent}
        title={
          <>
            <span>Sepsis</span>
            <span className="italic" style={{ color: accent.ink }}>
              Mortality
            </span>
            <span>Prediction</span>
          </>
        }
        description="Early sepsis detection and mortality prediction from 40K+ MIMIC-III patient records with an LSTM."
        stack={["BigQuery", "Keras LSTM", "Python", "MIMIC-III"]}
      />
    </div>
  );
}

/* ─────────────────────────── 09 · RAG for Domain-Specific QA ─────────────────────────── */

const ragDocs = [
  { tag: "MD", color: "#7a7066", rotate: -10, x: 0, y: 44 },
  { tag: "DOCX", color: "#3f6fc4", rotate: -5, x: 10, y: 30 },
  { tag: "PDF", color: "#c4553f", rotate: 0, x: 20, y: 18 },
];
const docLines = [92, 78, 86, 70, 90, 64, 82, 74, 88, 58];
const retrieved = [3, 4, 7];
const answerWords =
  "Overlap is configurable per document, and sentence-aware splits keep each chunk's context intact.".split(" ");

export function RagFeature() {
  const accent = { ink: "var(--tile-ink)", soft: "var(--tile-soft)" };
  const { ref, entered, loop, reduce } = useTileMotion();

  return (
    <div className="pf-tile-rag absolute inset-0">
      <div
        className="absolute inset-x-0 bottom-0 h-[170px]"
        style={{
          background: "radial-gradient(ellipse at 30% 100%, rgba(196, 136, 74, 0.22), transparent 70%)",
        }}
      />

      <div ref={ref} className="absolute -bottom-[16px] left-1/2 z-[1] h-[200px] w-[312px] -translate-x-1/2 -rotate-[2deg]">
        <div
          className="absolute -bottom-10 left-[6%] -right-[4%] top-[6px] origin-bottom-left -rotate-[2.5deg] rounded-[28px]"
          style={{ background: "rgba(196, 136, 74, 0.16)" }}
        />

        {/* Source documents */}
        {ragDocs.map((doc, d) => {
          const isTop = d === ragDocs.length - 1;
          return (
            <div
              key={doc.tag}
              className="absolute w-[104px] rounded-[10px] border p-2.5"
              style={{
                left: doc.x,
                top: doc.y,
                height: 150,
                rotate: `${doc.rotate}deg`,
                background: "var(--pf-surface)",
                borderColor: "var(--pf-border)",
                boxShadow: "0 6px 16px rgba(60, 40, 20, 0.1)",
              }}
            >
              <span
                className="inline-block rounded-[4px] px-1 py-[2px] font-mono text-[6.5px] font-semibold tracking-[0.08em] text-white"
                style={{ background: doc.color }}
              >
                {doc.tag}
              </span>
              <div className="mt-2 space-y-[5px]">
                {docLines.map((w, i) => {
                  const hit = isTop && retrieved.includes(i);
                  return (
                    <div key={i} className="relative h-[4px]" style={{ width: `${w}%` }}>
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{ background: "var(--pf-text)", opacity: 0.09 }}
                      />
                      {hit && (
                        <motion.span
                          className="absolute -inset-x-[2px] -inset-y-[1.5px] rounded-[3px]"
                          style={{ background: accent.ink }}
                          initial={reduce ? false : { opacity: 0 }}
                          animate={
                            loop
                              ? { opacity: [0.2, 0.75, 0.2] }
                              : { opacity: entered ? 0.55 : 0 }
                          }
                          transition={
                            loop
                              ? { duration: 2.4, repeat: Infinity, delay: retrieved.indexOf(i) * 0.35, ease: "easeInOut" }
                              : { duration: 0.4 }
                          }
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Grounded answer */}
        <div
          className="absolute left-[118px] top-0 w-[194px] rounded-[14px] border p-2.5"
          style={{
            background: "var(--pf-surface)",
            borderColor: "var(--pf-border)",
            boxShadow: "0 14px 32px rgba(60, 40, 20, 0.16)",
          }}
        >
          <div
            className="ml-auto w-fit max-w-[88%] rounded-[10px] rounded-br-[3px] px-2 py-1.5 text-[9px] leading-snug"
            style={{
              color: "var(--pf-text)",
              background: `color-mix(in oklab, ${accent.soft} 55%, var(--pf-surface))`,
            }}
          >
            How is chunk overlap chosen?
          </div>

          <div
            className="mt-2.5 flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.12em]"
            style={{ color: "var(--pf-text-dim)" }}
          >
            <span className="inline-flex items-center gap-1" style={{ color: accent.ink }}>
              <span className="h-1 w-1 rounded-full" style={{ background: accent.ink }} />
              mistral · grounded
            </span>
            <span>top-k 3</span>
          </div>

          <p className="mt-1.5 text-[9.5px] leading-[1.4]" style={{ color: "var(--pf-text-muted)" }}>
            {answerWords.map((word, i) => (
              <motion.span
                key={i}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: entered ? 1 : 0 }}
                transition={{ delay: reduce ? 0 : 0.6 + i * 0.07, duration: 0.2 }}
              >
                {word}{" "}
              </motion.span>
            ))}
          </p>

          <motion.div
            className="mt-2 flex flex-wrap gap-1"
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            transition={{ delay: reduce ? 0 : 0.7 + answerWords.length * 0.07, duration: 0.35, ease }}
          >
            {["1 · paper.pdf p4", "2 · notes.md"].map((cite) => (
              <span
                key={cite}
                className="rounded-[5px] border px-1.5 py-[3px] font-mono text-[7px] leading-none"
                style={{
                  color: accent.ink,
                  borderColor: `color-mix(in oklab, ${accent.ink} 30%, transparent)`,
                }}
              >
                [{cite}]
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <FeatureHeader
        index="09"
        accent={accent}
        title={
          <>
            <span>RAG for</span>
            <span className="italic" style={{ color: accent.ink }}>
              Domain-Specific
            </span>
            <span>QA</span>
          </>
        }
        description="Grounded answers over academic PDFs, DOCX, and Markdown, with sentence-aware chunking and a local LLM."
        stack={["LlamaIndex", "Weaviate", "Ollama · Mistral", "Streamlit"]}
      />
    </div>
  );
}

/* ─────────────────────────── 03 · Buymed (experience) ─────────────────────────── */

const priceSources = 6;
const priceRows = [
  { name: "Paracetamol 500mg", unit: "box · 10 strips", price: "32.500₫", delta: "−4%" },
  { name: "Amoxicillin 250mg", unit: "box · 10 strips", price: "58.000₫", delta: "−2%" },
];

function CapsuleIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 16 8" className="block h-[6px] w-[12px]" aria-hidden>
      <rect x="0.6" y="0.6" width="14.8" height="6.8" rx="3.4" fill="none" style={{ stroke: color }} strokeWidth="1.2" />
      <path d="M0.6 4 A3.4 3.4 0 0 1 4 0.6 H8 V7.4 H4 A3.4 3.4 0 0 1 0.6 4 Z" style={{ fill: color }} />
    </svg>
  );
}

/* Right-hand visual for the Buymed experience tile. The tile's text column stays in BentoGrid. */
export function BuymedPipelineVisual() {
  const accent = { ink: "var(--tile-ink)", soft: "var(--tile-soft)" };
  const { ref, entered, loop, reduce } = useTileMotion();

  return (
    <div className="pf-tile-buymed absolute inset-0">
      {/* RAG assistant bubble */}
      <motion.div
        className="absolute right-[18px] top-[100px] z-[2] hidden w-[158px] xl:block -rotate-[2deg] rounded-[12px] border p-2"
        style={{
          background: "var(--pf-surface)",
          borderColor: "var(--pf-border)",
          boxShadow: "0 10px 24px rgba(20, 70, 39, 0.12)",
        }}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 0.9, duration: 0.5, ease }}
      >
        <div
          className="ml-auto w-fit rounded-[9px] rounded-br-[3px] px-2 py-1 text-[8.5px] leading-snug"
          style={{ color: "var(--pf-text)", background: `color-mix(in oklab, ${accent.soft} 70%, var(--pf-surface))` }}
        >
          Is paracetamol 500mg in stock?
        </div>
        <div className="mt-1.5 flex items-center gap-1.5">
          <span
            className="grid h-[16px] w-[16px] shrink-0 place-items-center rounded-full font-mono text-[6.5px] font-semibold"
            style={{ background: accent.ink, color: "var(--pf-bg)" }}
          >
            AI
          </span>
          <div className="flex-1 space-y-[3px]">
            {[100, 72].map((w, i) => (
              <motion.span
                key={w}
                className="block h-[4px] rounded-full"
                style={{ width: `${w}%`, background: "var(--pf-text)", opacity: 0.12, originX: 0 }}
                initial={reduce ? false : { scaleX: 0 }}
                animate={entered ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 1.3 + i * 0.2, duration: 0.5, ease }}
              />
            ))}
          </div>
        </div>
        <div className="mt-1.5 flex items-center justify-between font-mono text-[6.5px] uppercase tracking-[0.1em]">
          <span style={{ color: accent.ink }}>rag answer</span>
          <span style={{ color: "var(--pf-text-dim)" }}>10s · was 5 min</span>
        </div>
      </motion.div>

      {/* Nightly pricing pipeline */}
      <div
        ref={ref}
        className="absolute bottom-[10px] right-[14px] z-[2] w-[180px] origin-bottom-right rotate-[3deg] scale-[0.86] rounded-[14px] border p-2.5 xl:scale-100"
        style={{
          background: "var(--pf-surface)",
          borderColor: "var(--pf-border)",
          boxShadow: "0 16px 34px rgba(20, 70, 39, 0.16)",
        }}
      >
        <div className="mb-2 flex items-center justify-between">
          <span
            className="whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.14em]"
            style={{ color: "var(--pf-text-dim)" }}
          >
            nightly pricing
          </span>
          <span
            className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-1.5 py-[2px] font-mono text-[7px] uppercase tracking-[0.08em]"
            style={{ color: accent.ink, background: `color-mix(in oklab, ${accent.soft} 60%, var(--pf-surface))` }}
          >
            <motion.span
              className="h-1 w-1 rounded-full"
              style={{ background: accent.ink }}
              animate={loop ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
              transition={loop ? { duration: 1.4, repeat: Infinity } : undefined}
            />
            go · {priceSources} src
          </span>
        </div>

        {/* Sources */}
        <div className="grid grid-cols-6 gap-1">
          {Array.from({ length: priceSources }).map((_, i) => (
            <span
              key={i}
              className="grid h-[18px] place-items-center rounded-[5px] border"
              style={{
                borderColor: `color-mix(in oklab, ${accent.ink} 22%, transparent)`,
                background: `color-mix(in oklab, ${accent.soft} 30%, var(--pf-surface))`,
              }}
            >
              <CapsuleIcon color={accent.ink} />
            </span>
          ))}
        </div>

        {/* Concurrent lanes fanning into one merge step */}
        <div className="grid h-[28px] grid-cols-6 gap-1">
          {Array.from({ length: priceSources }).map((_, i) => (
            <div key={i} className="relative flex justify-center">
              <span
                className="h-full w-px"
                style={{ background: `color-mix(in oklab, ${accent.ink} 25%, transparent)` }}
              />
              <motion.span
                className="absolute left-1/2 top-0 -ml-[2.5px] h-[5px] w-[5px] rounded-full"
                style={{ background: accent.ink }}
                initial={false}
                animate={loop ? { y: [0, 22], opacity: [0, 1, 1, 0] } : { y: 11, opacity: 1 }}
                transition={
                  loop
                    ? { duration: 1.1, repeat: Infinity, repeatDelay: 0.5 + (i % 3) * 0.25, delay: i * 0.22, ease: "easeIn" }
                    : undefined
                }
              />
            </div>
          ))}
        </div>

        <div
          className="flex h-[17px] items-center justify-center rounded-[5px] font-mono text-[7px] uppercase tracking-[0.12em]"
          style={{ background: accent.ink, color: "var(--pf-bg)" }}
        >
          fan-in · merge · validate
        </div>

        {/* Updated catalogue prices */}
        <div className="mt-2 space-y-1">
          {priceRows.map((row, i) => (
            <div key={row.name} className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-[8.5px] font-medium leading-tight" style={{ color: "var(--pf-text)" }}>
                  {row.name}
                </div>
                <div className="text-[7px] leading-tight" style={{ color: "var(--pf-text-dim)" }}>
                  {row.unit}
                </div>
              </div>
              <div className="relative shrink-0 rounded-[5px] px-1.5 py-[3px]">
                <motion.span
                  className="absolute inset-0 rounded-[5px]"
                  style={{ background: accent.soft }}
                  initial={false}
                  animate={loop ? { opacity: [0, 0.9, 0] } : { opacity: 0.5 }}
                  transition={
                    loop ? { duration: 1.6, repeat: Infinity, repeatDelay: 2.2, delay: 1.2 + i * 0.5 } : undefined
                  }
                />
                <span className="relative font-mono text-[8.5px] font-semibold" style={{ color: "var(--pf-text)" }}>
                  {row.price}
                </span>
                <span className="relative ml-1 font-mono text-[7px]" style={{ color: accent.ink }}>
                  {row.delta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
