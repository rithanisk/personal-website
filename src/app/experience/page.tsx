"use client";

import { experiences } from "@/content/experiences";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { motion } from "framer-motion";

export default function ExperiencePage() {
  return (
    <main className="px-5 md:px-[72px] pt-[130px] pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pf-eyebrow mb-5">Experience</div>
        <h1 className="font-serif font-light text-[clamp(36px,5vw,64px)] tracking-[-0.035em] leading-[0.95]">
          A path through{" "}
          <span className="italic" style={{ color: "var(--pf-accent)" }}>five</span>{" "}
          countries.
        </h1>
        <p
          className="font-serif text-xl leading-[1.45] font-light mt-6 max-w-[580px]"
          style={{ color: "var(--pf-text-muted)" }}
        >
          Four internships, one TA role, and a lot of PRs. Here&apos;s what I&apos;ve been up to.
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2 + i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ExperienceCard experience={exp} active={i === 0} />
          </motion.div>
        ))}
      </div>
    </main>
  );
}
