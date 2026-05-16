"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/shared/Icons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function StorySnapshot() {
  return (
    <section className="px-5 md:px-[72px] mt-[72px] pb-[100px]">
      <motion.div
        className="flex items-baseline justify-between mb-6 pb-[18px] border-b border-pf-border"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <div className="pf-eyebrow mb-2.5">About</div>
          <h2 className="font-serif font-light text-[clamp(26px,3.5vw,40px)] tracking-[-0.025em] leading-[1.05]">
            My{" "}
            <span className="italic" style={{ color: "var(--pf-rose-ink)" }}>
              story
            </span>
            .
          </h2>
        </div>
        <Link
          href="/my-story"
          className="text-[13px] inline-flex items-center gap-1.5"
          style={{ color: "var(--pf-text-muted)" }}
        >
          Read more <ArrowRightIcon />
        </Link>
      </motion.div>

      <div className="max-w-[640px]">
        <motion.p
          className="font-serif text-[20px] font-light leading-relaxed tracking-tight"
          style={{ color: "var(--pf-text)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Born in India, raised in the US, and currently building software across Singapore, Vietnam, and Toronto. I&apos;ve always been drawn to the unconventional path.
        </motion.p>
        <motion.div
          className="flex flex-col gap-4 mt-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={itemVariants} className="flex items-baseline gap-3">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
              style={{ background: "var(--pf-forest)" }}
            />
            <p
              className="text-[15px] leading-relaxed tracking-tight"
              style={{ color: "var(--pf-text-muted)" }}
            >
              Moved to Singapore for university knowing no one — learned independence the hard way.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-baseline gap-3">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
              style={{ background: "var(--pf-amber)" }}
            />
            <p
              className="text-[15px] leading-relaxed tracking-tight"
              style={{ color: "var(--pf-text-muted)" }}
            >
              Shipped production code at a Vietnamese startup, building scraping pipelines and AI tools.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-baseline gap-3">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
              style={{ background: "var(--pf-rose)" }}
            />
            <p
              className="text-[15px] leading-relaxed tracking-tight"
              style={{ color: "var(--pf-text-muted)" }}
            >
              Now in Toronto, building AI-driven health tools that make a real difference.
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/my-story"
            className="inline-flex items-center gap-2 mt-7 text-[14px] font-medium pb-[2px]"
            style={{
              color: "var(--pf-rose-ink)",
              borderBottom:
                "1px solid color-mix(in oklab, var(--pf-rose) 35%, transparent)",
            }}
          >
            Read the full story <ArrowRightIcon />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
