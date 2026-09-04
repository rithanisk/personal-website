"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

type Accent = "rose" | "forest" | "amber";

type ChapterPhoto = {
  src: string;
  alt: string;
  caption: string;
  objectPosition?: string;
};

type Chapter = {
  id: string;
  heading: string;
  date: string;
  place: string;
  stamp: string;
  accent: Accent;
  body: string;
  photos: ChapterPhoto[];
};

const chapters: Chapter[] = [
  {
    id: "roots",
    heading: "Who Am I?",
    date: "2005 — 2023",
    place: "India → United States",
    stamp: "ROOTS",
    accent: "rose",
    body: "I’m Rithani, a second-generation Indian American, born in India and raised in the US. I was born in Karur, a small town in Tamil Nadu, India, and just nine months later, my parents moved us to Seattle, WA. Growing up, I lived between two worlds. As hard as it was building my identity in a foreign country as a young girl, my parents worked equally hard to make sure we also didn't lose where we came from. They taught my younger brother and I to read and write our mother tongue, Tamil, not just speak it. Every other summer, we would all fly back to our parents' hometown to spend time with our grandparents, cousins, and relatives who felt both close and far away at the same time. Even our daily routines were a reminder of where we came from, with weekly temple visits, home-cooked South Indian food, and Tamil entertainment. Despite having multiple hobbies and doing well in anything I tried, I never knew what I wanted to pursue in college. Throughout high school, I switched career paths around four times before deciding to pursue computer science. Eventually, I realized I wanted to pursue a path where I could build products that mattered, while also gaining a new perspective about the world and staying connected to my roots.",
    photos: [
      { src: "/media-v1/usa.webp", alt: "Rithani growing up in the United States", caption: "Growing up between two worlds" },
      { src: "/media-v1/usa2.webp", alt: "A childhood photo of Rithani", caption: "Little me, always curious" },
      { src: "/media-v1/usa3.webp", alt: "Rithani with family in the United States", caption: "The people who made home feel like home" },
    ],
  },
  {
    id: "singapore",
    heading: "Moving to Singapore",
    date: "2023 — 2025",
    place: "Singapore",
    stamp: "NEW HOME",
    accent: "forest",
    body: "When my dad introduced me to the National University of Singapore (NUS), I immediately fell in love with the campus and the city. It was so different from what I grew up around, and it had the education, independence, thrill, and adventure that I was desperately seeking. As soon as I graduated high school and received my acceptance letter, I moved to Singapore to study computer science, knowing absolutely no one. It was hard to adjust to a new city, a new environment, and a new way of life. The first few months were unimaginably hard because I missed my family, friends, and the comfort of my home. But over time, I navigated all sorts of problems on my own and became more independent, resilient, and confident in myself. Soon enough, I found friends that became family and realized that Singapore was starting to feel more like home.",
    photos: [
      { src: "/media-v1/singapore1.webp", alt: "Rithani in front of Marina Bay Sands", caption: "The city that asked me to grow", objectPosition: "center 66%" },
      { src: "/media-v1/singapore2.webp", alt: "Rithani with friends in Singapore", caption: "Friends who became family" },
      { src: "/media-v1/singapore3.webp", alt: "A memory from university in Singapore", caption: "A new life at NUS" },
    ],
  },
  {
    id: "vietnam",
    heading: "Leaving for Vietnam",
    date: "Summer 2024",
    place: "Ho Chi Minh City, Vietnam",
    stamp: "FIRST STARTUP",
    accent: "amber",
    body: "In the summer of 2024, I was one of 25 people selected for an overseas internship program called NOC (NUS Overseas Colleges) in Vietnam. Less than a year after moving to Singapore, I packed up again and moved to Ho Chi Minh City for three months to work as a Software Engineer at a healthtech startup called Buymed. Being my first real internship and taste of startup culture, I had intense impostor syndrome. I felt like I knew nothing and didn't belong, but over time, I picked up the skills and knowledge I needed to succeed and built projects that had direct impact on customers. I shipped a Go-based scraping pipeline that cut manual work for the global team by 80%, delivered over fifteen production features, and prototyped a RAG-powered internal chatbot for the AI team. It was fast, sometimes chaotic, and exactly the kind of environment I had been looking for. By the end of my internship, I felt so sad to be leaving such a vibrant country and people I had come to love. I left Vietnam knowing I wanted to keep doing work that moved quickly and meant something.",
    photos: [
      { src: "/media-v1/vietnam.webp", alt: "Rithani during her summer in Vietnam", caption: "Three months in Ho Chi Minh City" },
      { src: "/media-v1/vietnam2.webp", alt: "A street scene from Vietnam", caption: "Learning a new city by living in it" },
      { src: "/media-v1/vietnam3.webp", alt: "Rithani with friends in Vietnam", caption: "The people behind the adventure" },
    ],
  },
  {
    id: "toronto",
    heading: "Building in Toronto",
    date: "2025 — 2026",
    place: "Toronto, Canada",
    stamp: "BUILDING",
    accent: "rose",
    body: "So, when the opportunity to participate in another NOC program came, I did not hesitate. In August of 2025, I became one of 10 people selected for the year-long NOC Toronto program. I moved into the heart of Toronto and joined another health tech startup, NiaHealth, as an AI Engineer. Building on my experience in Vietnam, I continued to create projects with direct customer impact, this time at a much larger scale. I collaborated with the company's CTO, joined the founding team's weekly sync, and gained much more visibility into how the company operated. Beyond the engineering work, I learned what it takes to build and sustain a startup from the ground up. Over the year, I built GPT-powered data pipelines, cycle-tracking experiences for women, and AI agents that help clinicians make faster, better decisions for their customers. It's not every day that you get to look at a product being used by customers and say, “Hey, I built that myself!” NiaHealth became some of the most meaningful work I've done so far and unlocked skills I could never have learned in a traditional role.",
    photos: [
      { src: "/media-v1/toronto.webp", alt: "Rithani in Toronto", caption: "A year in the heart of Toronto", objectPosition: "center 35%" },
      { src: "/media-v1/toronto2.webp", alt: "Rithani presenting her work at NiaHealth", caption: "Building and presenting at NiaHealth" },
      { src: "/media-v1/toronto3.webp", alt: "Rithani with the NiaHealth team", caption: "A team that taught me so much" },
    ],
  },
];

const photoLayouts = [
  "left-[5%] top-[7%] h-[52%] w-[56%]",
  "right-[4%] top-[13%] h-[40%] w-[39%]",
  "bottom-[7%] left-[24%] h-[43%] w-[60%]",
] as const;

const photoRotations = [-4, 5, 2] as const;

function JournalPhoto({ photo, index, priority, reduceMotion }: { photo: ChapterPhoto; index: number; priority: boolean; reduceMotion: boolean }) {
  return (
    <motion.figure
      className={`absolute ${photoLayouts[index]} bg-[#fffdf8] p-2 pb-8 sm:p-2.5 sm:pb-9`}
      style={{ boxShadow: "0 10px 28px rgba(48, 38, 28, 0.18)" }}
      initial={reduceMotion ? false : { opacity: 0, y: 16, rotate: index === 1 ? 9 : -8 }}
      animate={{ opacity: 1, y: 0, rotate: photoRotations[index] }}
      transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.12 + index * 0.1, ease }}
      whileHover={reduceMotion ? undefined : { zIndex: 20, scale: 1.035, rotate: 0 }}
    >
      <div className="relative h-full w-full overflow-hidden bg-[#eee9e1]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority={priority}
          sizes="(max-width: 767px) 68vw, 32vw"
          className="object-cover"
          style={{ objectPosition: photo.objectPosition ?? "center" }}
        />
      </div>
      <figcaption className="absolute inset-x-2 bottom-1.5 text-center font-serif text-[10px] leading-tight text-[#51463c] sm:bottom-2 sm:text-[11px]">
        {photo.caption}
      </figcaption>
    </motion.figure>
  );
}

function PhotoPage({ chapter, chapterIndex, reduceMotion }: { chapter: Chapter; chapterIndex: number; reduceMotion: boolean }) {
  return (
    <div className="relative min-h-[480px] overflow-hidden px-5 py-6 sm:min-h-[560px] md:min-h-[680px] md:px-8 md:py-9">
      <svg aria-hidden="true" className="absolute inset-x-8 top-7 h-16 w-[calc(100%-4rem)] opacity-30" viewBox="0 0 460 70" fill="none">
        <path d="M8 49C84 8 154 66 230 29C305 -7 361 57 452 19" stroke={`var(--pf-${chapter.accent})`} strokeWidth="1.5" strokeDasharray="5 7" strokeLinecap="round" />
        <circle cx="8" cy="49" r="4" fill={`var(--pf-${chapter.accent})`} />
        <circle cx="452" cy="19" r="4" fill={`var(--pf-${chapter.accent})`} />
      </svg>

      <div
        className="absolute right-5 top-5 z-20 flex h-[76px] w-[76px] rotate-6 items-center justify-center rounded-full border-2 text-center font-mono text-[8px] font-semibold tracking-[0.12em] opacity-70 sm:right-8 sm:top-8"
        style={{ color: `var(--pf-${chapter.accent})`, borderColor: `var(--pf-${chapter.accent})` }}
      >
        {chapter.stamp}
      </div>

      <div className="relative h-[430px] sm:h-[510px] md:h-[610px]">
        {chapter.photos.map((photo, index) => (
          <JournalPhoto key={photo.src} photo={photo} index={index} priority={chapterIndex === 0 && index === 0} reduceMotion={reduceMotion} />
        ))}
      </div>

      <div className="absolute bottom-4 right-6 font-mono text-[9px] tracking-[0.18em]" style={{ color: "var(--pf-text-dim)" }}>
        {String(chapterIndex * 2 + 2).padStart(2, "0")}
      </div>
    </div>
  );
}

function TextPage({ chapter, chapterIndex }: { chapter: Chapter; chapterIndex: number }) {
  return (
    <div className="relative flex min-h-[560px] flex-col px-7 py-9 sm:px-10 sm:py-11 md:min-h-[680px] md:px-12 lg:px-14">
      <div className="flex items-start justify-between gap-5">
        <div>
          <div className="font-mono text-[9px] font-medium uppercase tracking-[0.2em]" style={{ color: `var(--pf-${chapter.accent})` }}>
            Chapter {String(chapterIndex + 1).padStart(2, "0")}
          </div>
          <div className="mt-2 font-mono text-[10px] tracking-[0.12em]" style={{ color: "var(--pf-text-dim)" }}>
            {chapter.date}
          </div>
        </div>
        <div className="max-w-[150px] text-right font-serif text-[12px] leading-snug" style={{ color: "var(--pf-text-muted)" }}>
          {chapter.place}
        </div>
      </div>

      <div className="my-6 h-px w-full" style={{ background: "var(--pf-border)" }} />

      <h2 className="font-serif text-[clamp(31px,3.8vw,50px)] font-light leading-[1.02] tracking-[-0.035em]" style={{ color: "var(--pf-text)" }}>
        {chapter.heading}
      </h2>
      <p className="mt-6 text-[13.5px] leading-[1.72] tracking-[-0.01em] sm:text-[14px] lg:text-[14.5px]" style={{ color: "var(--pf-text-muted)" }}>
        {chapter.body}
      </p>

      <div className="mt-auto flex items-end justify-between gap-6 pt-8">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2 w-2 rounded-full" style={{ background: `var(--pf-${chapter.accent})` }} />
          <span className="h-px w-16" style={{ background: `var(--pf-${chapter.accent})`, opacity: 0.5 }} />
        </div>
        <div className="font-mono text-[9px] tracking-[0.18em]" style={{ color: "var(--pf-text-dim)" }}>
          {String(chapterIndex * 2 + 1).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

function TurningPage({ direction, accent }: { direction: number; accent: Accent }) {
  const next = direction > 0;

  return (
    <motion.div
      aria-hidden="true"
      className={`absolute bottom-0 top-0 z-30 hidden w-1/2 md:block ${next ? "left-1/2 origin-left" : "left-0 origin-right"}`}
      style={{
        background: "linear-gradient(90deg, var(--pf-bg-warm), var(--pf-surface) 18%, var(--pf-bg-warm))",
        border: "1px solid var(--pf-border)",
        boxShadow: next ? "-18px 0 36px rgba(30,24,18,0.18)" : "18px 0 36px rgba(30,24,18,0.18)",
        transformStyle: "preserve-3d",
      }}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: next ? -180 : 180 }}
      transition={{ duration: 0.72, ease: [0.45, 0, 0.2, 1] }}
    >
      <div className="absolute inset-x-8 top-1/2 h-px" style={{ background: `var(--pf-${accent})`, opacity: 0.18 }} />
    </motion.div>
  );
}

export function MyStoryContent() {
  const shouldReduceMotion = useReducedMotion();
  const [chapterIndex, setChapterIndex] = useState(0);
  const [turn, setTurn] = useState<{ direction: number; target: number; id: number } | null>(null);
  const timersRef = useRef<number[]>([]);
  const chapter = chapters[chapterIndex];

  const turnTo = useCallback((target: number) => {
    if (target < 0 || target >= chapters.length || target === chapterIndex || turn) return;

    if (shouldReduceMotion) {
      setChapterIndex(target);
      return;
    }

    const direction = target > chapterIndex ? 1 : -1;
    setTurn({ direction, target, id: Date.now() });
    timersRef.current.push(window.setTimeout(() => setChapterIndex(target), 330));
    timersRef.current.push(window.setTimeout(() => setTurn(null), 740));
  }, [chapterIndex, shouldReduceMotion, turn]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") turnTo(chapterIndex + 1);
      if (event.key === "ArrowLeft") turnTo(chapterIndex - 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [chapterIndex, turnTo]);

  useEffect(() => () => timersRef.current.forEach((timer) => window.clearTimeout(timer)), []);

  return (
    <main className="overflow-hidden px-5 pb-20 pt-16 sm:px-8 md:px-[72px] md:pb-28 md:pt-20">
      <motion.header
        className="mx-auto mb-9 max-w-[1296px] md:mb-11"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease }}
      >
        <div className="pf-eyebrow mb-4">My Story</div>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="font-serif text-[clamp(38px,5vw,64px)] font-light leading-[0.96] tracking-[-0.035em]">
              A life across <span style={{ color: "var(--pf-accent)" }}>timezones</span>
            </h1>
            <p className="mt-5 text-[16px] font-light leading-relaxed tracking-tight" style={{ color: "var(--pf-text-muted)" }}>
              Every move taught me something new. Turn the page to see how I got here.
            </p>
          </div>
          <div className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] md:flex" style={{ color: "var(--pf-text-dim)" }}>
            <span>Use arrow keys</span>
            <span aria-hidden="true">← →</span>
          </div>
        </div>
      </motion.header>

      <section className="mx-auto max-w-[1296px]" aria-label="Interactive travel journal">
        <div
          className="relative [perspective:2200px]"
          aria-live="polite"
          aria-label={`Chapter ${chapterIndex + 1} of ${chapters.length}: ${chapter.heading}`}
        >
          <div
            className="absolute -inset-x-3 bottom-[-14px] top-5 -z-10 hidden md:block"
            style={{ background: "var(--pf-bg-warm)", border: "1px solid var(--pf-border)", boxShadow: "var(--pf-shadow-lg)" }}
          />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={chapter.id}
              className="relative grid overflow-hidden border md:grid-cols-2"
              style={{
                background: "var(--pf-surface)",
                borderColor: "var(--pf-border)",
                boxShadow: "var(--pf-shadow-lg)",
              }}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0.55, scale: 0.992 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.65 }}
              transition={{ duration: shouldReduceMotion ? 0.15 : 0.32, ease }}
            >
              <TextPage chapter={chapter} chapterIndex={chapterIndex} />
              <div className="relative border-t md:border-l md:border-t-0" style={{ borderColor: "var(--pf-border)", background: "var(--pf-bg-warm)" }}>
                <PhotoPage chapter={chapter} chapterIndex={chapterIndex} reduceMotion={Boolean(shouldReduceMotion)} />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-8 -translate-x-1/2 md:block"
                style={{ background: "linear-gradient(90deg, transparent, rgba(25,20,15,0.08), transparent)" }}
              />
            </motion.div>
          </AnimatePresence>

          {turn && <TurningPage key={turn.id} direction={turn.direction} accent={chapter.accent} />}
        </div>

        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5" aria-label={`Chapter ${chapterIndex + 1} of ${chapters.length}`}>
            {chapters.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => turnTo(index)}
                disabled={Boolean(turn)}
                aria-label={`Go to chapter ${index + 1}: ${item.heading}`}
                aria-current={index === chapterIndex ? "step" : undefined}
                className="h-2 rounded-full transition-all duration-300 disabled:cursor-wait"
                style={{
                  width: index === chapterIndex ? 34 : 10,
                  background: index === chapterIndex ? `var(--pf-${chapter.accent})` : "var(--pf-border-strong)",
                }}
              />
            ))}
            <span className="ml-2 font-mono text-[10px] tracking-[0.14em]" style={{ color: "var(--pf-text-dim)" }}>
              {String(chapterIndex + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
            <button
              type="button"
              onClick={() => turnTo(chapterIndex - 1)}
              disabled={chapterIndex === 0 || Boolean(turn)}
              className="inline-flex min-w-[112px] items-center justify-center gap-2 border-b py-2 text-[13px] font-medium transition-all duration-200 hover:-translate-x-1 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-x-0"
              style={{ borderColor: "var(--pf-border-strong)", color: "var(--pf-text-muted)" }}
            >
              <span aria-hidden="true">←</span> Previous
            </button>
            <button
              type="button"
              onClick={() => turnTo(chapterIndex + 1)}
              disabled={chapterIndex === chapters.length - 1 || Boolean(turn)}
              className="inline-flex min-w-[112px] items-center justify-center gap-2 border-b py-2 text-[13px] font-medium transition-all duration-200 hover:translate-x-1 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-x-0"
              style={{ borderColor: `var(--pf-${chapter.accent})`, color: `var(--pf-${chapter.accent})` }}
            >
              Next page <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
