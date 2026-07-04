"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HeroMedia } from "./HeroMedia";
import { HeroBlobs } from "./HeroBlobs";
import { profile } from "@/content/profile";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.07, delayChildren: 0.1 },
        },
      };

  const itemVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        },
      };

  return (
    <section className="relative px-5 sm:px-10 pt-4 sm:pt-6 pb-[60px]">
      <HeroBlobs />

      <motion.div
        className="relative z-[1] flex flex-col sm:flex-row gap-6 sm:gap-8 items-stretch"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Video tile (left) */}
        <motion.div
          variants={itemVariants}
          className="sm:w-[45%] shrink-0"
        >
          <HeroMedia />
        </motion.div>

        {/* Intro text (right) */}
        <motion.div
          variants={itemVariants}
          className="relative flex flex-col justify-center p-6 sm:p-7 rounded-2xl flex-1"
        >
          <h1
            className="font-serif font-light tracking-[-0.03em] leading-[1.08] mb-0"
            style={{ fontSize: "clamp(32px, 4.4vw, 58px)" }}
          >
            I&apos;m{" "}
            <span className="font-light" style={{ color: "var(--pf-rose)" }}>
              Rithani
            </span>
            , and I build{" "}
            <span
              className="font-light"
              style={{ color: "var(--pf-forest-ink)" }}
            >
              intelligent software
            </span>{" "}
            with real, measurable impact.
          </h1>
          <p
            className="text-[16px] sm:text-[17px] leading-relaxed tracking-tight mt-4"
            style={{ color: "var(--pf-text-muted)" }}
          >
            {profile.about}
          </p>
          <div className="flex flex-wrap items-center gap-2.5 mt-5">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[13px] font-medium"
              style={{ background: "var(--pf-forest-soft)", color: "var(--pf-forest-ink)" }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "var(--pf-forest-ink)" }}
              />
              Building AI agents @ Nia Health
            </div>
            <div
              className="w-px h-6"
              style={{ background: "var(--pf-text-dim)" }}
            />
            <Link
              href="/experience"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-medium transition-colors duration-200"
              style={{
                background: "var(--pf-rose-soft)",
                color: "var(--pf-rose-ink)",
              }}
            >
              Experience
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </Link>
            <Link
              href="/my-story"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-medium transition-colors duration-200"
              style={{
                background: "var(--pf-amber-soft)",
                color: "var(--pf-amber-ink)",
              }}
            >
              My Story
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
