"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/shared/Icons";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { projects } from "@/content/projects";
import type { Project } from "@/types/content";

type FeaturedProject = {
  title: string;
  description: string;
  videoSrc: string;
  projectId?: string;
  href: string;
};

const featured: FeaturedProject[] = [
  {
    title: "Sepsis Mortality Prediction",
    description:
      "LSTM-based mortality prediction and early detection of sepsis from MIMIC III time-series patient data.",
    videoSrc: "/NHouse Application Video.mp4",
    projectId: "sepsis",
    href: "/projects",
  },
  {
    title: "Bioinformatics Independent Research",
    description:
      "ML approach to classify and select bio-inks for 3D-printed tissue quality.",
    videoSrc: "/PGPR Cluster Leader Application Video.mp4",
    projectId: "bioinks",
    href: "/projects",
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleCardClick = (fp: FeaturedProject) => {
    if (fp.projectId) {
      const proj = projects.find((p) => p.id === fp.projectId);
      if (proj) {
        setSelectedProject(proj);
        return;
      }
    }
  };

  return (
    <section className="px-5 md:px-[72px] mt-[72px]">
      <motion.div
        className="flex items-baseline justify-between mb-6 pb-[18px] border-b border-pf-border"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <div className="pf-eyebrow mb-2.5">Projects</div>
          <h2 className="font-serif font-light text-[clamp(26px,3.5vw,40px)] tracking-[-0.025em] leading-[1.05]">
            What I&apos;m{" "}
            <span className="italic" style={{ color: "var(--pf-amber-ink)" }}>
              building
            </span>
            .
          </h2>
        </div>
        <Link
          href="/projects"
          className="text-[13px] inline-flex items-center gap-1.5"
          style={{ color: "var(--pf-text-muted)" }}
        >
          View all <ArrowRightIcon />
        </Link>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {featured.map((project) => (
          <motion.div key={project.title} variants={cardVariants}>
            <div
              className="group block cursor-pointer"
              onClick={() => handleCardClick(project)}
            >
              <div
                className="relative overflow-hidden rounded-xl transition-all duration-300"
                style={{
                  background: "var(--pf-surface-2)",
                  border: "1px solid var(--pf-border)",
                }}
              >
                {/* Video */}
                <div className="relative w-full aspect-video overflow-hidden rounded-t-xl bg-black/5">
                  <video
                    src={project.videoSrc}
                    muted
                    loop
                    playsInline
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Description */}
                <div className="p-5">
                  <h3
                    className="font-serif font-normal text-[20px] tracking-[-0.02em] leading-tight mb-2"
                    style={{ color: "var(--pf-text)" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-[13.5px] leading-relaxed tracking-tight"
                    style={{ color: "var(--pf-text-muted)" }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Hover arrow */}
                <div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-70 transition-opacity duration-200"
                  style={{ color: "var(--pf-text-dim)" }}
                >
                  <ArrowRightIcon />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
