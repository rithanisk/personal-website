"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Project } from "@/types/content";
import { TimecapsulePreview } from "./TimecapsulePreview";
import styles from "./ProjectsContent.module.css";

const overviews: Record<string, { steps: string[]; note: string }> = {
  "intent-ledger": { steps: ["Conversation & shopping intent", "Hybrid retrieval & reranking", "Ranked product recommendations"], note: "50,000 products · 96.5% Hit Rate@10" },
  "agent-observability": { steps: ["Multi-agent runs", "Live tool calls & traces", "Evaluation across versions"], note: "Latency, tokens, failures, and regressions" },
  sepsis: { steps: ["MIMIC III patient records", "Time-series clinical data", "LSTM mortality predictions"], note: "40,000+ patient records" },
  bioinks: { steps: ["Chemical & biological properties", "Classification models", "Predicted tissue quality"], note: "85% AUC-ROC" },
  rag: { steps: ["Academic documents", "Chunking & semantic retrieval", "Grounded answers with Mistral"], note: "LlamaIndex · Weaviate · Ollama" },
  dropout: { steps: ["Student records", "67 engineered features", "LightGBM dropout predictions"], note: "382 records · 80% AUC-ROC" },
  "aws-rek": { steps: ["Upload an image", "Store image in Amazon S3", "Detect labels with Rekognition"], note: "Amazon S3 · IAM · Rekognition" },
};

function ProjectVideo({ project, autoPlayInView }: { project: Project; autoPlayInView: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlayInView) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let disposed = false;
    const updatePlayback = () => {
      if (inView && !document.hidden && !reducedMotion.matches) {
        // Browsers allow muted inline playback without a click. Controls remain available.
        video.muted = true;
        void video.play().then(() => {
          if (disposed || !inView || document.hidden || reducedMotion.matches) video.pause();
        }).catch(() => { /* Keep native controls available if autoplay is blocked. */ });
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= .4;
      updatePlayback();
    }, { threshold: [0, .4] });
    observer.observe(video);
    document.addEventListener("visibilitychange", updatePlayback);
    reducedMotion.addEventListener("change", updatePlayback);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      reducedMotion.removeEventListener("change", updatePlayback);
      video.pause();
    };
  }, [autoPlayInView]);

  return <video ref={videoRef} className={styles.video} src={project.videoSrc} poster={project.images?.[0]} muted loop={autoPlayInView} controls playsInline preload="none" aria-label={`${project.name} demo video`} />;
}

export function ProjectMedia({ project, autoPlayInView = false }: { project: Project; autoPlayInView?: boolean }) {
  const image = project.images?.[0];
  const overview = overviews[project.id];

  return (
    <div className={styles.media}>
      {project.videoSrc ? (
        <ProjectVideo project={project} autoPlayInView={autoPlayInView} />
      ) : project.id === "timecapsule" ? (
        <TimecapsulePreview />
      ) : image ? (
        <Image src={image} alt={`${project.name} preview`} fill sizes="(max-width: 800px) 90vw, 42vw" className={styles.image} />
      ) : overview ? (
        <div className={styles.overview} role="img" aria-label={`${project.name} overview: ${overview.steps.join(" → ")}. ${overview.note}`}>
          <p className={styles.previewLabel}>Project overview</p>
          <div className={styles.flow}>{overview.steps.map((step, index) => <div className={styles.flowStep} key={step}><span>{step}</span>{index < overview.steps.length - 1 && <small aria-hidden="true">↓</small>}</div>)}</div>
          <p className={styles.previewNote}>{overview.note}</p>
        </div>
      ) : null}
    </div>
  );
}
