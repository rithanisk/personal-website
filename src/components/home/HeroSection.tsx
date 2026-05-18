"use client";

import Link from "next/link";
import { SiGmail, SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { HeroMedia } from "./HeroMedia";
import { HeroBlobs } from "./HeroBlobs";
import { profile } from "@/content/profile";
import { ArrowRightIcon, MapPinIcon } from "@/components/shared/Icons";

function Socials() {
  const socials = [
    { icon: SiGmail, href: profile.socials[0].href, label: "Email", color: "#EA4335" },
    { icon: FaLinkedin, href: profile.socials[1].href, label: "LinkedIn", color: "#0A66C2" },
    { icon: SiGithub, href: profile.socials[2].href, label: "GitHub", color: "var(--pf-text)" },
  ];

  return (
    <div className="flex gap-5">
      {socials.map((s, i) => (
        <motion.a
          key={i}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <s.icon size={26} color={s.color} />
        </motion.a>
      ))}
    </div>
  );
}

function HeroStatus() {
  return (
    <div className="flex flex-col gap-5">
      {/* Status line */}
      <div className="inline-flex items-center gap-2.5 self-start">
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: "var(--pf-text-muted)" }}
        />
        <span
          className="text-[16px] font-mono tracking-[0.01em] leading-relaxed tracking-tight"
          style={{ color: "var(--pf-text-muted)" }}
        >
          Currently building AI agents at Nia Health
        </span>
      </div>
      {/* Page links */}
      <div className="flex items-center gap-5">
        <Link
          href="/experience"
          className="inline-flex items-center gap-2 text-[16px] font-normal"
          style={{ color: "var(--pf-text)" }}
        >
          Check out my{" "}
          <span
            className="font-normal"
            style={{ color: "var(--pf-forest-ink)" }}
          >
            experience
          </span>
        </Link>
        <span
          className="w-1 h-1 rounded-full"
          style={{ background: "var(--pf-text-dim)" }}
        />
        <Link
          href="/my-story"
          className="inline-flex items-center gap-2 text-[16px] font-normal pb-[3px]"
          style={{ color: "var(--pf-text)" }}
        >
          Read my{" "}
          <span className="font-normal" style={{ color: "var(--pf-rose-ink)" }}>
            story
          </span>
        </Link>
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative px-5 md:px-[72px] pt-[140px] pb-[60px]">
      <HeroBlobs />
      <div className="relative z-[1] grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-center">
        {/* Left column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="pf-eyebrow mb-[26px]">
            Portfolio · 2026
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="font-serif font-light tracking-[-0.03em] leading-[1.05] mb-0"
            style={{ fontSize: "clamp(34px, 5vw, 64px)" }}
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
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-[18px] leading-relaxed tracking-tight mt-7 max-w-[620px] line-clamp-3 md:line-clamp-4"
            style={{ color: "var(--pf-text-muted)" }}
          >
            {profile.about}
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8">
            <HeroStatus />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-5 mt-7"
          >
            <Socials />
            <div
              className="w-px h-5"
              style={{ background: "var(--pf-border-strong)" }}
            />
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-150"
              style={{
                background: "transparent",
                border: "1.5px solid var(--pf-rose)",
                color: "var(--pf-rose)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Right column — media */}
        <motion.div
          className="relative z-[1]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroMedia />
        </motion.div>
      </div>
    </section>
  );
}
