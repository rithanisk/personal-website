"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/shared/Badge";
import { ArrowRightIcon } from "@/components/shared/Icons";
import type { Project } from "@/types/content";
import { ProjectMedia } from "./ProjectMedia";
import styles from "./ProjectsContent.module.css";

export function ProjectRow({ project, onDetails, autoPlayVideos = true }: { project: Project; onDetails: () => void; autoPlayVideos?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article id={project.id} className={styles.row} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .5, ease: [0.22, 1, 0.36, 1] }}>
      <header className={styles.rowHeader}><h2>{project.name}</h2><span>{project.category}</span></header>
      <div className={styles.rowBody}>
        <ProjectMedia project={project} autoPlayInView={autoPlayVideos} />
        <div className={styles.copy}>
          <p className={styles.blurb}>{project.description || project.blurb}</p>
          {project.bullets.length > 0 && <ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          <div className={styles.stack}>{project.stack.map((technology) => <Badge key={technology}>{technology}</Badge>)}</div>
          <div className={styles.actions}>
            <button type="button" onClick={onDetails} aria-label={`View ${project.name} details`}>Project details <ArrowRightIcon /></button>
            {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Live demo ↗</a>}
            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
