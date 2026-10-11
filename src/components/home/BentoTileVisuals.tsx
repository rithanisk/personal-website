"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { FeatureHeader, MONO, ease, useTileMotion } from "@/components/home/ProjectTileFeatures";

const surface = {
  background: "var(--pf-surface)",
  borderColor: "var(--pf-border)",
} as const;

/* ─────────────────────────── 01 · NiaHealth phone ─────────────────────────── */

const bioAge = [36.4, 36.1, 35.9, 35.2, 35.4, 34.8, 34.5, 34.2];
const bioW = 128;
const bioH = 38;
const bioPath = bioAge
  .map((v, i) => {
    const x = (i / (bioAge.length - 1)) * bioW;
    const y = 4 + ((36.6 - v) / 2.6) * (bioH - 8);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  })
  .join(" ");

/* Replaces the NiaHealth screen recording. Sits in the same tilted phone slot. */
export function NiaHealthPhoneVisual() {
  const { ref, entered, loop, reduce } = useTileMotion();
  const gold = "#b9873d";

  return (
    <div className="pf-tile-nia absolute inset-0">
      <div
        ref={ref}
        className="absolute -bottom-[132px] right-3 z-[2] h-[365px] origin-bottom-right rotate-[3deg] scale-[0.86] xl:right-16 xl:scale-100 overflow-hidden rounded-[32px] border-[6px] border-[#171717] bg-[#171717]"
        style={{ aspectRatio: "1180 / 2556", boxShadow: "0 14px 34px rgba(0,0,0,0.22)" }}
        role="img"
        aria-label="NiaHealth app showing a biological age trend and a health insight"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[26px] px-2.5 pt-2" style={{ background: "#f7f3ec" }}>
          <div className="mx-auto h-[11px] w-[42px] rounded-full bg-[#171717]" />

          <div className="mt-2.5 text-[6.5px] uppercase tracking-[0.14em]" style={{ color: "#9a8f80" }}>
            Good morning
          </div>
          <div className="text-[11px] font-semibold leading-tight" style={{ color: "#1a1610" }}>
            Your health
          </div>

          {/* Biological age */}
          <div className="mt-2 rounded-[12px] bg-white p-2" style={{ boxShadow: "0 2px 8px rgba(60,40,10,0.06)" }}>
            <div className="text-[6.5px] uppercase tracking-[0.12em]" style={{ color: "#9a8f80" }}>
              Biological age
            </div>
            <div className="mt-0.5 flex items-baseline gap-1">
              <span className="font-serif text-[22px] leading-none" style={{ color: "#1a1610" }}>
                34.2
              </span>
              <span className="text-[7px]" style={{ color: "#9a8f80" }}>
                yrs
              </span>
              <span
                className="ml-auto rounded-full px-1.5 py-[2px] text-[6.5px] font-medium"
                style={{ color: "#2f7a4a", background: "#e1f0e4" }}
              >
                −2.1 vs actual
              </span>
            </div>
            <svg viewBox={`0 0 ${bioW} ${bioH}`} className="mt-1.5 block h-auto w-full overflow-visible" aria-hidden>
              <defs>
                <linearGradient id="nia-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={gold} stopOpacity="0.28" />
                  <stop offset="100%" stopColor={gold} stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d={`${bioPath} L${bioW},${bioH} L0,${bioH} Z`}
                fill="url(#nia-area)"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: entered ? 1 : 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              />
              <motion.path
                d={bioPath}
                fill="none"
                stroke={gold}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: entered ? 1 : 0 }}
                transition={{ delay: 0.4, duration: 1.4, ease: "easeInOut" }}
              />
            </svg>
            <div className="mt-0.5 flex justify-between text-[6px]" style={{ color: "#b0a596" }}>
              <span>Jan</span>
              <span>Apr</span>
              <span>Jul</span>
            </div>
          </div>

          {/* Insight */}
          <motion.div
            className="mt-1.5 rounded-[10px] p-2"
            style={{ background: "#efe2cc" }}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ delay: 1.6, duration: 0.45, ease }}
          >
            <div className="text-[6.5px] font-semibold uppercase tracking-[0.12em]" style={{ color: "#8a642d" }}>
              Insight
            </div>
            <div className="mt-0.5 text-[7.5px] leading-snug" style={{ color: "#3d3326" }}>
              Your metabolic markers improved since your last panel.
            </div>
          </motion.div>
        </div>
      </div>

      {/* Report pipeline card */}
      <motion.div
        className="absolute right-[4px] top-[148px] z-[3] hidden w-[112px] -rotate-[4deg] xl:block rounded-[11px] border p-2"
        style={{ ...surface, boxShadow: "0 10px 24px rgba(60, 40, 10, 0.14)" }}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 0.8, duration: 0.5, ease }}
      >
        <div className="flex items-center justify-between font-mono text-[6.5px] uppercase tracking-[0.12em]">
          <span style={{ color: "var(--tile-ink)" }}>lab report</span>
          <span style={{ color: "var(--pf-text-dim)" }}>pdf</span>
        </div>
        <div className="mt-1.5 h-[5px] overflow-hidden rounded-full" style={{ background: "var(--tile-soft)" }}>
          <motion.span
            className="block h-full rounded-full"
            style={{ background: "var(--tile-ink)", originX: 0 }}
            initial={reduce ? false : { scaleX: 0 }}
            animate={loop ? { scaleX: [0, 1, 1] } : { scaleX: 1 }}
            transition={loop ? { duration: 3.2, times: [0, 0.6, 1], repeat: Infinity, ease: "easeInOut" } : undefined}
          />
        </div>
        <div className="mt-1.5 flex items-baseline justify-between">
          <span className="font-serif text-[15px] leading-none" style={{ color: "var(--pf-text)" }}>
            3 min
          </span>
          <span className="text-[7px]" style={{ color: "var(--pf-text-dim)" }}>
            was 10
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────── 02 · Mudra camera ─────────────────────────── */

function LaptopFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="relative w-full pb-[3.5%]">
      <div
        className="relative z-[1] mx-auto w-[90%] rounded-t-[12px] bg-[#17191d] p-[1.7%] pb-[1.45%] sm:rounded-t-[16px]"
        style={{ boxShadow: "0 12px 30px rgba(23, 25, 29, 0.2), inset 0 0 0 1px rgba(255,255,255,0.14)" }}
      >
        <span className="absolute left-1/2 top-[0.65%] h-[2px] w-[2px] -translate-x-1/2 rounded-full bg-white/25 sm:h-[3px] sm:w-[3px]" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[5px] sm:rounded-[7px]" role="img" aria-label={label}>
          {children}
        </div>
      </div>
      <div
        className="relative z-[2] mx-auto h-[clamp(7px,1.45vw,13px)] w-full rounded-b-[14px]"
        style={{
          background: "linear-gradient(180deg, #d9dce0 0%, #aeb3b9 46%, #d7d9dc 100%)",
          boxShadow: "0 5px 10px rgba(22, 24, 28, 0.16), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
      >
        <span
          className="absolute left-1/2 top-0 h-[42%] w-[13%] -translate-x-1/2 rounded-b-full"
          style={{ background: "rgba(120, 125, 132, 0.28)" }}
        />
      </div>
      <div className="absolute bottom-0 left-[8%] right-[8%] h-[6%] rounded-full bg-black/20 blur-[7px]" />
    </div>
  );
}

/* MediaPipe's 21 hand landmarks, posed as Pataka: fingers together, thumb bent to the index base. */
const handPoints: [number, number][] = [
  [50, 92],
  [38, 84], [31, 74], [33, 64], [40, 60],
  [40, 56], [39, 40], [39, 30], [39, 21],
  [49, 54], [49, 37], [49, 26], [49, 16],
  [58, 56], [59, 40], [59, 30], [59, 22],
  [66, 60], [68, 47], [69, 39], [70, 32],
];
const handBones: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [17, 18], [18, 19], [19, 20], [0, 17],
];

export function MudraLaptopVisual({ scriptClassName }: { scriptClassName?: string }) {
  const { ref, entered, loop, reduce } = useTileMotion();
  const red = "#a94738";

  return (
    <>
      <div
        className="absolute inset-x-0 bottom-0 h-[150px]"
        style={{ background: "radial-gradient(ellipse at 75% 100%, rgba(186, 79, 61, 0.24), transparent 68%)" }}
      />
      <div ref={ref} className="absolute -bottom-[14px] left-1/2 z-[1] w-[285px] -translate-x-1/2 -rotate-[4deg] pt-5">
        <div
          className="absolute -bottom-10 left-[10%] -right-[1%] top-0 origin-bottom-left -rotate-[2.5deg] rounded-[26px]"
          style={{ background: "rgba(199, 105, 87, 0.22)" }}
        />
        <LaptopFrame label="Mudra Recognition detecting the Pataka hand gesture live with spoken feedback">
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 38% 45%, #6b4337 0%, #3a2520 55%, #1f1513 100%)" }}
          />
          {/* Detection box + landmarks */}
          <div className="absolute bottom-[6%] left-[8%] top-[8%] aspect-square">
            <motion.div
              className="absolute inset-[6%] rounded-[6px] border"
              style={{ borderColor: "rgba(255, 214, 196, 0.55)" }}
              initial={reduce ? false : { opacity: 0, scale: 1.08 }}
              animate={entered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
              transition={{ delay: 0.3, duration: 0.5, ease }}
            />
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
              {handBones.map(([a, b], i) => (
                <motion.line
                  key={i}
                  x1={handPoints[a][0]}
                  y1={handPoints[a][1]}
                  x2={handPoints[b][0]}
                  y2={handPoints[b][1]}
                  stroke="#f3b9a6"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                  animate={entered ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
                  transition={{ delay: 0.5 + i * 0.03, duration: 0.35 }}
                />
              ))}
              {handPoints.map(([x, y], i) => (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={i % 4 === 0 ? 2.4 : 1.9}
                  fill={i % 4 === 0 ? "#ffffff" : "#ffd7c8"}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  initial={reduce ? false : { scale: 0 }}
                  animate={
                    loop
                      ? { scale: [1, 1.25, 1] }
                      : { scale: entered ? 1 : 0 }
                  }
                  transition={
                    loop
                      ? { duration: 2, repeat: Infinity, delay: 1.2 + i * 0.05, ease: "easeInOut" }
                      : { delay: 0.5 + i * 0.03, duration: 0.25 }
                  }
                />
              ))}
            </svg>
          </div>

          <span
            className="absolute left-[4%] top-[6%] inline-flex items-center gap-1 rounded-full bg-black/35 px-1.5 py-[2px] text-[6px] font-semibold uppercase tracking-[0.14em] text-white"
          >
            <motion.span
              className="h-[4px] w-[4px] rounded-full bg-[#ff5a4a]"
              animate={loop ? { opacity: [1, 0.2, 1] } : { opacity: 1 }}
              transition={loop ? { duration: 1.2, repeat: Infinity } : undefined}
            />
            live
          </span>

          {/* Prediction panel */}
          <motion.div
            className="absolute right-[4%] top-[12%] w-[44%] rounded-[7px] p-1.5"
            style={{ background: "rgba(255, 250, 246, 0.94)" }}
            initial={reduce ? false : { opacity: 0, x: 8 }}
            animate={entered ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
            transition={{ delay: 1, duration: 0.45, ease }}
          >
            <div className="text-[5.5px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#9a6a60" }}>
              detected
            </div>
            <div className={`${scriptClassName ?? "italic"} text-[19px] leading-[1.05]`} style={{ color: red }}>
              Pataka
            </div>
            <div className="mt-1 flex items-center gap-1">
              <div className="h-[4px] flex-1 overflow-hidden rounded-full" style={{ background: "#f0d9d3" }}>
                <motion.span
                  className="block h-full w-[93%] rounded-full"
                  style={{ background: red, originX: 0 }}
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={{ scaleX: entered ? 1 : 0 }}
                  transition={{ delay: 1.3, duration: 0.8, ease }}
                />
              </div>
              <span className="text-[6px] font-semibold" style={{ color: red, fontFamily: MONO }}>
                0.93
              </span>
            </div>
          </motion.div>

          {/* Spoken feedback */}
          <motion.div
            className="absolute bottom-[8%] right-[4%] flex w-[52%] items-center gap-1 rounded-full bg-black/45 px-1.5 py-[3px] text-white"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ delay: 1.8, duration: 0.4, ease }}
          >
            <span className="flex h-[8px] items-end gap-[1.5px]">
              {[0, 1, 2].map((b) => (
                <motion.span
                  key={b}
                  className="block w-[1.5px] rounded-full bg-white"
                  style={{ height: 8, originY: 1 }}
                  animate={loop ? { scaleY: [0.35, 1, 0.35] } : { scaleY: 0.7 }}
                  transition={loop ? { duration: 0.8, repeat: Infinity, delay: b * 0.15 } : undefined}
                />
              ))}
            </span>
            <span className="truncate text-[5.5px] leading-none">Fingers together, thumb bent</span>
          </motion.div>
        </LaptopFrame>
      </div>
    </>
  );
}

/* ─────────────────────────── 04 · Lock-In ─────────────────────────── */

function FlameIcon() {
  return (
    <svg viewBox="0 0 12 14" className="h-[9px] w-[8px]" aria-hidden>
      <path
        d="M6 0.8C6.6 3 9.6 4.4 9.6 8.2A3.6 3.6 0 0 1 2.4 8.2C2.4 6.4 3.4 5.4 4 4.6C4.2 6 5 6.6 5.6 6.6C5.2 4.6 5.4 2.4 6 0.8Z"
        fill="#f08a3c"
      />
    </svg>
  );
}

export function LockInFeature() {
  const { ref, entered, loop, reduce } = useTileMotion();
  const ink = "var(--tile-ink)";
  const green = "#14996a";
  const crew = ["SM", "JK", "AR"];

  return (
    <div className="pf-tile-lockin absolute inset-0">
      <div
        className="absolute inset-x-0 bottom-0 h-[170px]"
        style={{ background: "radial-gradient(ellipse at 60% 100%, rgba(120, 90, 210, 0.2), transparent 70%)" }}
      />

      <div ref={ref} className="absolute bottom-[12px] left-1/2 z-[1] w-[236px] -translate-x-[52%] -rotate-[3deg]">
        <div
          className="absolute -bottom-10 -left-[5%] -right-[8%] -top-3 origin-bottom-left -rotate-[3deg] rounded-[28px]"
          style={{ background: "rgba(120, 90, 210, 0.14)" }}
        />

        {/* Stake card, modelled on the app's Active Stakes list */}
        <div
          className="relative rounded-[16px] border p-3"
          style={{ ...surface, boxShadow: "0 14px 32px rgba(40, 30, 80, 0.16)" }}
        >
          <div className="flex items-center gap-1.5">
            <span
              className="rounded-full px-1.5 py-[2px] text-[7.5px] font-medium"
              style={{ color: "var(--pf-text-muted)", background: "var(--pf-surface-2, rgba(0,0,0,0.05))" }}
            >
              Calculus
            </span>
            <span className="inline-flex items-center gap-[3px] text-[7.5px] font-semibold" style={{ color: "#e2782f" }}>
              <svg viewBox="0 0 12 12" className="h-[8px] w-[8px]" aria-hidden>
                <circle cx="6" cy="6" r="4.8" fill="none" stroke="currentColor" strokeWidth="1.3" />
                <path d="M6 3.4V6l1.8 1.1" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              6h
            </span>
            <span className="ml-auto font-sans text-[15px] font-semibold leading-none" style={{ color: green }}>
              $5
            </span>
          </div>
          <div className="mt-1.5 text-[10.5px] font-semibold leading-tight" style={{ color: "var(--pf-text)" }}>
            Complete Chapter 5 Problems
          </div>
          <div className="mt-2.5 flex items-center justify-between border-t pt-2" style={{ borderColor: "var(--pf-border)" }}>
            <span className="inline-flex items-center gap-1 text-[8px]" style={{ color: "var(--pf-text-muted)" }}>
              <span
                className="grid h-[14px] w-[14px] place-items-center rounded-full text-[6px] font-semibold"
                style={{ background: "var(--tile-soft)", color: ink }}
              >
                SM
              </span>
              Sarah M.
            </span>
            <motion.span
              className="inline-flex items-center gap-1 rounded-[7px] px-2 py-[5px] text-[8px] font-semibold"
              style={{ background: "var(--pf-text)", color: "var(--pf-bg)" }}
              animate={loop ? { scale: [1, 0.94, 1] } : { scale: 1 }}
              transition={loop ? { duration: 0.5, repeat: Infinity, repeatDelay: 3.5, delay: 0.6 } : undefined}
            >
              <svg viewBox="0 0 14 12" className="h-[8px] w-[9px]" aria-hidden>
                <path
                  d="M1.5 3.5h2.4L5 1.8h4l1.1 1.7h2.4v7H1.5z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <circle cx="7" cy="6.6" r="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              Submit
            </motion.span>
          </div>
        </div>

        {/* Streak */}
        <motion.span
          className="absolute -right-[18px] -top-[16px] z-[2] inline-flex items-center gap-1 rounded-[9px] px-2 py-1 text-white"
          style={{ background: "#141217", boxShadow: "0 8px 18px rgba(20, 16, 30, 0.25)", rotate: "6deg" }}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ delay: 0.5, duration: 0.4, ease }}
        >
          <motion.span
            animate={loop ? { scale: [1, 1.15, 1] } : { scale: 1 }}
            transition={loop ? { duration: 1.6, repeat: Infinity } : undefined}
            className="inline-flex"
          >
            <FlameIcon />
          </motion.span>
          <span className="text-[11px] font-semibold leading-none">12</span>
          <span className="text-[6px] uppercase tracking-[0.12em] text-white/60">streak</span>
        </motion.span>

        {/* Crew verification */}
        <motion.div
          className="relative z-[2] -mt-1 ml-[36px] w-[186px] rotate-[5deg] rounded-[13px] border p-2.5"
          style={{ ...surface, boxShadow: "0 12px 26px rgba(40, 30, 80, 0.16)" }}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ delay: 1, duration: 0.5, ease }}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[7px] uppercase tracking-[0.12em]" style={{ color: ink }}>
              crew check
            </span>
            <span className="text-[7px]" style={{ color: "var(--pf-text-dim)" }}>
              Finals Grind
            </span>
          </div>
          <div className="mt-1.5 flex items-center">
            {crew.map((c, i) => (
              <motion.span
                key={c}
                className="relative -ml-1 grid h-[20px] w-[20px] place-items-center rounded-full border-2 text-[6.5px] font-semibold first:ml-0"
                style={{ borderColor: "var(--pf-surface)", background: "var(--tile-soft)", color: ink }}
                initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                animate={entered ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
                transition={{ delay: 1.3 + i * 0.25, duration: 0.3, ease }}
              >
                {c}
                <span
                  className="absolute -bottom-[3px] -right-[3px] grid h-[9px] w-[9px] place-items-center rounded-full text-[5px] text-white"
                  style={{ background: green }}
                >
                  ✓
                </span>
              </motion.span>
            ))}
            <span className="ml-2 text-[8px] font-medium" style={{ color: "var(--pf-text)" }}>
              3/3 verified
            </span>
            <motion.span
              className="ml-auto rounded-full px-1.5 py-[2px] text-[7.5px] font-semibold"
              style={{ color: green, background: "color-mix(in oklab, #14996a 14%, var(--pf-surface))" }}
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={entered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 2.2, duration: 0.35, ease }}
            >
              +$5 back
            </motion.span>
          </div>
        </motion.div>
      </div>

      <FeatureHeader
        index="04"
        accent={{ ink, soft: "var(--tile-soft)" }}
        title={
          <>
            <span>Lock-</span>
            <span className="-ml-[0.28em] italic" style={{ color: ink }}>
              In
            </span>
          </>
        }
        description="Stake money on a goal, submit proof, and let your crew verify it. Tested with 45+ students."
        stack={["FastAPI", "Next.js", "Supabase", "Railway"]}
      />
    </div>
  );
}

/* ─────────────────────────── 05 · NUS teaching assistant ─────────────────────────── */

const pollOptions = [
  { label: "The deploying company", value: 46 },
  { label: "The developers", value: 33 },
  { label: "Regulators", value: 21 },
];
const stickies = [
  { text: "Who audits the auditors?", bg: "#fbe7a1", rotate: -7, top: 6, left: 0 },
  { text: "Consent ≠ awareness", bg: "#f7cfd6", rotate: 5, top: 0, left: 98 },
];

export function NusTaFeature() {
  const { ref, entered, reduce } = useTileMotion();
  const orange = "var(--tile-ink)";
  const blue = "var(--tile-blue)";
  const metrics = [
    { value: "100+", label: "students taught" },
    { value: "5", label: "tutorial groups" },
  ];
  const topics = ["Data ethics", "Privacy law", "Responsible AI", "Facilitation"];

  return (
    <div className="pf-tile-nus absolute inset-0">
      <div
        className="absolute bottom-0 right-0 h-[220px] w-[60%]"
        style={{ background: "radial-gradient(ellipse at 70% 100%, rgba(224, 122, 31, 0.18), transparent 70%)" }}
      />

      {/* Tutorial slide with a live poll */}
      <div
        ref={ref}
        className="absolute -bottom-[14px] right-[10px] z-[2] w-[244px] origin-bottom-right rotate-[2deg] scale-[0.72] xl:right-[22px] xl:scale-100"
      >
        <div
          className="absolute -bottom-10 -left-[6%] -right-[4%] top-[34px] origin-bottom-right rotate-[3deg] rounded-[28px]"
          style={{ background: "rgba(224, 122, 31, 0.13)" }}
        />

        <div className="relative hidden h-[52px] xl:block">
          {stickies.map((n, i) => (
            <motion.div
              key={n.text}
              className="absolute w-[92px] rounded-[3px] px-2 py-1.5 text-[8px] leading-snug"
              style={{
                top: n.top,
                left: n.left,
                rotate: `${n.rotate}deg`,
                background: n.bg,
                color: "#3b3122",
                boxShadow: "0 6px 12px rgba(60, 40, 10, 0.14)",
                fontFamily: '"Bradley Hand", "Segoe Print", "Comic Sans MS", cursive',
              }}
              initial={reduce ? false : { opacity: 0, y: -8 }}
              animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
              transition={{ delay: 1.6 + i * 0.25, duration: 0.4, ease }}
            >
              {n.text}
            </motion.div>
          ))}
        </div>

        <div
          className="relative rounded-[14px] border p-3"
          style={{ ...surface, boxShadow: "0 16px 34px rgba(30, 40, 70, 0.14)" }}
        >
          <div className="flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.14em]">
            <span style={{ color: blue }}>IS1108 · week 9</span>
            <span style={{ color: "var(--pf-text-dim)" }}>AI governance</span>
          </div>
          <div className="mt-1.5 font-serif text-[12.5px] leading-[1.25]" style={{ color: "var(--pf-text)" }}>
            When an AI system causes harm, who should be accountable?
          </div>

          <div className="mt-2.5 space-y-1.5">
            {pollOptions.map((o, i) => (
              <div key={o.label}>
                <div className="mb-[3px] flex justify-between text-[7.5px]" style={{ color: "var(--pf-text-muted)" }}>
                  <span>{o.label}</span>
                  <span style={{ fontFamily: MONO }}>{o.value}%</span>
                </div>
                <div className="h-[6px] overflow-hidden rounded-full" style={{ background: "var(--tile-soft)" }}>
                  <motion.span
                    className="block h-full rounded-full"
                    style={{ width: `${o.value}%`, background: i === 0 ? orange : blue, opacity: i === 0 ? 1 : 0.55, originX: 0 }}
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={{ scaleX: entered ? 1 : 0 }}
                    transition={{ delay: 0.5 + i * 0.18, duration: 0.9, ease }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-[7px]" style={{ color: "var(--pf-text-dim)" }}>
            Live class poll · then we debate it
          </div>
        </div>
      </div>

      {/* Text column */}
      <div className="absolute left-4 right-4 top-4 z-[3] md:left-5 md:right-5 md:top-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span
            className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em]"
            style={{ color: "var(--pf-rose)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--pf-rose)" }} />
            experience
          </span>
          <span className="font-mono text-[9px] tracking-[0.14em]" style={{ color: "var(--pf-text-dim)" }}>
            05
          </span>
        </div>

        <div className="flex h-8 flex-nowrap items-center gap-2.5">
          <span
            className="relative grid h-6 w-6 shrink-0 place-items-center overflow-hidden rounded-[7px] text-[7px] font-bold tracking-[0.02em] text-white"
            style={{ background: "#0b3d7a" }}
            aria-hidden
          >
            NUS
            <span className="absolute inset-x-0 bottom-0 h-[3px]" style={{ background: "#ef7c00" }} />
          </span>
          <span className="whitespace-nowrap font-serif text-[19px] leading-none tracking-[-0.02em] md:text-[21px]">
            National University of Singapore
          </span>
        </div>

        <div className="mt-1 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span className="font-sans text-xs font-medium leading-tight md:text-[13px]" style={{ color: "var(--pf-text-muted)" }}>
            Teaching Assistant, IS1108
          </span>
          <span className="text-xs" style={{ color: "var(--pf-text-dim)" }}>·</span>
          <span className="font-sans text-xs font-normal leading-tight" style={{ color: "var(--pf-text-dim)" }}>
            Aug 2024 — Present
          </span>
        </div>

        <p
          className="mt-3.5 hidden max-w-[50%] text-[13px] leading-relaxed tracking-tight line-clamp-3 xl:[display:-webkit-box]"
          style={{ color: "var(--pf-text-muted)" }}
        >
          Lead tutorials on responsible AI, data privacy law, and digital ethics, turning real cases into class debates.
        </p>

        <div className="mt-4 grid max-w-[50%] grid-cols-2 gap-2">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="font-serif text-[23px] leading-none md:text-[27px]" style={{ color: orange }}>
                {m.value}
              </div>
              <div className="mt-1 text-[9px] leading-[1.2]" style={{ color: "var(--pf-text-muted)" }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 max-w-[50%] border-t pt-3" style={{ borderColor: "var(--pf-border)" }}>
          <div className="flex flex-wrap gap-1.5">
            {topics.map((t) => (
              <span
                key={t}
                className="rounded-full px-2 py-1 text-[9px] leading-none"
                style={{ color: "var(--pf-text-muted)", background: "color-mix(in oklab, var(--tile-soft) 60%, var(--pf-surface))" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── 06 · Closet AI ─────────────────────────── */

type Garment = "halter" | "vest" | "shorts" | "trousers" | "sneakers" | "pale-sneakers";

function GarmentArt({ kind }: { kind: Garment }) {
  switch (kind) {
    case "halter":
      return (
        <svg viewBox="0 0 40 34" className="h-[30px] w-auto" aria-hidden>
          <path d="M14 11 Q20 -1 26 11" fill="none" stroke="#1d1b1f" strokeWidth="2" />
          <path d="M11 11 Q20 8 29 11 L30 24 Q34 28 33 31 Q20 34 7 31 Q6 28 10 24 Z" fill="#1d1b1f" />
        </svg>
      );
    case "vest":
      return (
        <svg viewBox="0 0 40 34" className="h-[30px] w-auto" aria-hidden>
          <path d="M10 4 L16 2 L20 15 L24 2 L30 4 L32 29 Q26 33 20 30 Q14 33 8 29 Z" fill="#7d7247" />
          {[18, 23, 28].map((y) => (
            <circle key={y} cx="20" cy={y} r="0.9" fill="#3d3822" />
          ))}
        </svg>
      );
    case "shorts":
      return (
        <svg viewBox="0 0 40 26" className="h-[24px] w-auto" aria-hidden>
          <path d="M8 3 H32 L35 22 L22.5 23 L20 12 L17.5 23 L5 22 Z" fill="#8fadcc" />
          <path d="M8 6 H32" stroke="#6f8fb0" strokeWidth="1" />
          <path d="M5 22 L17.5 23 M22.5 23 L35 22" stroke="#e8eef5" strokeWidth="1" strokeDasharray="1.5 1" />
        </svg>
      );
    case "trousers":
      return (
        <svg viewBox="0 0 40 44" className="h-[34px] w-auto" aria-hidden>
          <path d="M10 2 H30 L34 42 H23 L20 13 L17 42 H6 Z" fill="#e7dcc3" />
          <path d="M10 5 H30" stroke="#cfc2a5" strokeWidth="1" />
        </svg>
      );
    case "sneakers":
    case "pale-sneakers": {
      const upper = kind === "sneakers" ? "#232126" : "#eee9e0";
      const trim = kind === "sneakers" ? "#f4f1ea" : "#c8bfae";
      return (
        <svg viewBox="0 0 40 14" className="h-[11px] w-auto" aria-hidden>
          {[2, 21].map((x) => (
            <g key={x} transform={`translate(${x} 0)`}>
              <path d="M1 9 Q1 3 6 3 L10 6 Q16 7 16 10 H1 Z" fill={upper} />
              <path d="M1 10 H16 V12 H1 Z" fill={trim} />
            </g>
          ))}
        </svg>
      );
    }
  }
}

const looks: { option: number; garments: Garment[] }[] = [
  { option: 2, garments: ["vest", "shorts", "pale-sneakers"] },
  { option: 1, garments: ["halter", "shorts", "sneakers"] },
  { option: 3, garments: ["halter", "trousers", "pale-sneakers"] },
];

export function ClosetStylistVisual() {
  const { ref, entered, loop, reduce } = useTileMotion();
  const fan = [
    { x: -78, rotate: -9, y: 14 },
    { x: 0, rotate: 0, y: 0 },
    { x: 78, rotate: 9, y: 14 },
  ];

  return (
    <div className="pf-tile-closet absolute inset-0">
      <div
        className="absolute inset-x-0 bottom-0 h-[180px]"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(112, 120, 196, 0.22), transparent 70%)" }}
      />

      <div ref={ref} className="absolute -bottom-[12px] left-1/2 z-[1] h-[190px] w-[260px] -translate-x-1/2">
        <div
          className="absolute -bottom-6 left-[6%] right-[6%] top-[22px] -rotate-[2deg] rounded-[30px]"
          style={{ background: "rgba(120, 128, 200, 0.16)" }}
        />

        {looks.map((look, i) => {
          const isTop = look.option === 1;
          return (
            <motion.div
              key={look.option}
              className="absolute left-1/2 top-[18px] -ml-[48px] w-[96px] rounded-[14px] border p-1.5"
              style={{
                ...surface,
                zIndex: isTop ? 3 : 1,
                boxShadow: isTop ? "0 16px 32px rgba(40, 46, 110, 0.2)" : "0 8px 18px rgba(40, 46, 110, 0.12)",
              }}
              initial={reduce ? false : { x: 0, y: 20, rotate: 0, opacity: 0 }}
              animate={
                entered
                  ? { x: fan[i].x, y: isTop && loop ? [0, -4, 0] : fan[i].y, rotate: fan[i].rotate, opacity: 1 }
                  : { x: 0, y: 20, rotate: 0, opacity: 0 }
              }
              transition={
                isTop && loop
                  ? {
                      y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
                      default: { delay: 0.3, duration: 0.6, ease },
                    }
                  : { delay: 0.3 + i * 0.08, duration: 0.6, ease }
              }
            >
              <div
                className="relative flex h-[104px] flex-col items-center justify-center gap-1 rounded-[10px]"
                style={{ background: "linear-gradient(180deg, #f3f5fb 0%, #e8ecf6 100%)" }}
              >
                <span
                  className="absolute left-1 top-1 rounded-full bg-white px-1.5 py-[1.5px] text-[6px]"
                  style={{ color: "#4a4f63" }}
                >
                  Option {look.option}
                </span>
                {look.garments.map((g, gi) => (
                  <GarmentArt key={`${g}-${gi}`} kind={g} />
                ))}
              </div>
              <div className="mt-1.5 flex items-center gap-1">
                <span
                  className="flex-1 rounded-[6px] py-[4px] text-center text-[7px] font-medium"
                  style={{ background: "#141a26", color: "#fff" }}
                >
                  Try on
                </span>
                <span
                  className="grid h-[16px] w-[16px] place-items-center rounded-[6px] border text-[8px]"
                  style={{ borderColor: "var(--pf-border)", color: isTop ? "#d0506a" : "var(--pf-text-dim)" }}
                >
                  ♥
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Ranked + weather chips */}
        <motion.span
          className="absolute left-1/2 top-[6px] z-[4] -ml-[58px] inline-flex items-center gap-1 rounded-full px-2 py-[3px] text-[7px] font-semibold text-white"
          style={{ background: "var(--tile-ink)", boxShadow: "0 6px 14px rgba(40, 46, 110, 0.25)" }}
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          animate={entered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 1, duration: 0.35, ease }}
        >
          ★ Ranked #1 for you
        </motion.span>
        <motion.span
          className="absolute right-[-6px] top-[0px] z-[4] inline-flex items-center gap-1 rounded-full border px-2 py-[3px] text-[7px]"
          style={{ ...surface, color: "var(--pf-text-muted)", boxShadow: "0 6px 14px rgba(40, 46, 110, 0.12)" }}
          initial={reduce ? false : { opacity: 0, y: -6 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
          transition={{ delay: 1.2, duration: 0.35, ease }}
        >
          <span style={{ color: "#e2a33a" }}>☀</span> 24° · sunny
        </motion.span>
      </div>
    </div>
  );
}
