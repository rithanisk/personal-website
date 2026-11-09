"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { ProjectModal } from "@/components/projects/ProjectModal";
import styles from "@/components/projects/ProjectsContent.module.css";
import { projects } from "@/content/projects";
import type { Project } from "@/types/content";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <main className={styles.page}>
      <motion.header className={styles.pageHeader} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
        <div className="pf-eyebrow">Projects</div>
        <h1>Side quests when I&apos;m <span style={{ color: "var(--pf-amber-ink)" }}>bored</span></h1>
        <p>Products, AI systems, and research built from user interviews through evaluation and launch.</p>
      </motion.header>
      <div className={styles.list}>{projects.map((project) => <ProjectRow key={project.id} project={project} autoPlayVideos={!selectedProject} onDetails={() => setSelectedProject(project)} />)}</div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}
