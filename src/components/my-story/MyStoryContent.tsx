"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const sections = [
  {
    heading: "Who I Am",
    date: "2003 — 2022",
    accent: "rose",
    body: "I\u2019m Rithani, a second-generation Indian American, born in India and raised in the US. I was born in Karur, a small town in Tamil Nadu, India, and just nine months later, my parents moved us to Seattle, WA. That's kind of been the pattern of my life ever since: starting somewhere new and figuring it out. Growing up, I lived between two worlds. As hard as it was building my identity in a foreign country as a young girl, my parents worked equally hard to make sure we also didn't lose where we came from. They taught my younger brother and I to read and write our mother tongue, Tamil, not just speak it. Every other summer, we would all fly back to our parents' hometown to spend time with family — grandparents, cousins, relatives who felt both close and far away at the same time. I didn't fully appreciate those trips as a kid, but they're a big part of who I am. Even our daily routines were a reminder of where we came from. Weekly temple visits, eating home-cooked Tamil food, listening to Tamil music. By high school, I knew I wanted to do something with technology. I just didn't know what that looked like yet. What I did know was that I wanted to build things that actually mattered — and that I wasn't going to find that by staying comfortable.",
    images: ["/usa.JPG", "/usa2.jpg", "/usa3.png"],
  },
  {
    heading: "Moving to Singapore",
    date: "2022 — 2024",
    accent: "forest",
    body: "I moved to Singapore for university, knowing almost no one. The first few months were hard in a quiet way. Not dramatic, just disorienting. New country, new people, a completely different pace of life. I had to figure out a lot of things on my own, faster than I expected. But that discomfort ended up being exactly what I needed. I came out of it more independent, more adaptable, and honestly more confident in myself than I'd ever been. Singapore taught me that I could land somewhere unfamiliar and be okay. Singapore gave me confidence I didn\u2019t know I was missing.",
    images: ["/singapore1.png", "/singapore2.JPG", "/singapore3.JPG"],
  },
  {
    heading: "NOC Vietnam \u2014 Buymed",
    date: "Summer 2024",
    accent: "amber",
    body: "In the summer of 2024, I packed up again and moved to Ho Chi Minh City for three months to work as a Software Engineer at Buymed, a healthcare startup. It was my first real taste of startup culture — tight deadlines, real users, code that shipped and actually affected people. I built a Go-based scraping pipeline that cut manual work by 80%, shipped over ten production features, and prototyped a RAG-powered internal chatbot. It was fast, sometimes chaotic, and exactly the kind of environment I'd been looking for. I left Vietnam knowing I wanted to keep doing work that moved quickly and meant something.",
    images: ["/vietnam.png", "/vietnam2.png", "/vietnam3.png"],
  },
  {
    heading: "NOC Toronto \u2014 Nia Health",
    date: "2025 — Present",
    accent: "rose",
    body: "Now I'm in Toronto, a year into a program that brought me here to work as an AI Engineer at Nia Health. I'm building GPT-powered data pipelines, a real-time glucose monitoring system, and tools designed to help clinicians make faster, better decisions for their patients. It's the most meaningful work I've done so far. There's something different about writing code that directly touches someone's health — it raises the stakes in a way that makes you care more about getting it right.",
    images: ["/toronto.png", "/toronto2.png", "/toronto3.png"],
  },
];

// --- SCROLL BUDGET ---
// We allocate scroll progress into: image slots + transition gaps between sections.
// Each image gets 1 "unit" of scroll for its accordion entrance.
// Each gap between sections gets 1 "unit" for the exit/enter transition.
// This ensures transitions have enough scroll distance to feel gradual.

const totalImages = sections.reduce((sum, s) => sum + s.images.length, 0);
const totalGaps = sections.length - 1; // 3 transitions between 4 sections
const totalUnits = totalImages + totalGaps;
const unitSize = 1 / totalUnits; // each unit's scroll range

// Pre-compute section boundaries in scroll-progress space
// Each section occupies: (its images * unitSize) for content + (1 * unitSize) for exit transition
// Except the last section which has no exit transition.
interface SectionTiming {
  contentStart: number; // when first image begins
  contentEnd: number; // when last image is fully in
  exitStart: number; // when exit fade begins (= contentEnd for non-last)
  exitEnd: number; // when exit fade completes (= next section's enterStart)
  enterStart: number; // when this section's enter begins
  enterEnd: number; // when this section is fully visible
}

const sectionTimings: SectionTiming[] = [];
let cursor = 0;
for (let si = 0; si < sections.length; si++) {
  const imgCount = sections[si].images.length;
  const contentDuration = imgCount * unitSize;
  const isLast = si === sections.length - 1;
  const gapDuration = isLast ? 0 : unitSize;

  // Enter: happens in the gap BEFORE this section's content (the previous section's exit gap).
  // For section 0, it's visible from the start.
  // For others, enter starts partway through the preceding gap and finishes at contentStart.
  const enterStart = si === 0 ? 0 : cursor - unitSize * 0.55;
  const enterEnd = si === 0 ? 0 : cursor;

  const contentStart = cursor;
  const contentEnd = cursor + contentDuration;
  const exitStart = contentEnd;
  const exitEnd = contentEnd + gapDuration;

  sectionTimings.push({ contentStart, contentEnd, exitStart, exitEnd, enterStart, enterEnd });
  cursor = exitEnd;
}

// --- ACCORDION IMAGE (within a section) ---
function AccordionImage({
  src,
  alt,
  localIndex,
  sectionIndex,
  globalIndex,
  sectionContentStart,
  sectionImgCount,
  scrollProgress,
  mobile,
}: {
  src: string;
  alt: string;
  localIndex: number;
  sectionIndex: number;
  globalIndex: number;
  sectionContentStart: number;
  sectionImgCount: number;
  scrollProgress: MotionValue<number>;
  mobile?: boolean;
}) {
  // Within the section's content range, each image gets an equal slot
  const contentDuration = sectionImgCount * unitSize;
  const imgSlot = contentDuration / sectionImgCount;
  const triggerStart = sectionContentStart + localIndex * imgSlot;
  const triggerEnd = triggerStart + imgSlot * 0.7;

  // Only the very first image (section 0, image 0) is visible from the start.
  // All other images (including first images of later sections) slide in.
  const isGlobalFirst = sectionIndex === 0 && localIndex === 0;

  // Slide in from right (first image is always in place)
  // Images are always at full opacity — they slide in visibly and stack on top
  // Use a large value to ensure fully off-screen before trigger
  const x = useTransform(
    scrollProgress,
    isGlobalFirst ? [0, 1] : [triggerStart, triggerEnd],
    isGlobalFirst ? [0, 0] : [1200, 0]
  );

  // Hide completely before trigger so it's not visible off to the side
  const visibility = useTransform(
    scrollProgress,
    [Math.max(0, triggerStart - 0.001), triggerStart],
    ["hidden", "visible"]
  );

  // Each image is slightly smaller than the previous to reveal the stack underneath
  const baseScale = 1 - globalIndex * 0.015;
  const scale = useTransform(
    scrollProgress,
    isGlobalFirst ? [0, 1] : [triggerStart, triggerEnd],
    isGlobalFirst ? [1, 1] : [0.9, baseScale]
  );

  // Alternate tilt direction: even images tilt right, odd images tilt left
  const rotation = globalIndex === 0 ? 0 : (globalIndex % 2 === 0 ? 2.5 : -2.5);
  const rotate = useTransform(
    scrollProgress,
    isGlobalFirst ? [0, 1] : [triggerStart, triggerEnd],
    isGlobalFirst ? [0, 0] : [rotation * 3, rotation]
  );

  return (
    <motion.div
      className="absolute rounded-2xl overflow-hidden"
      style={{
        x,
        scale,
        rotate,
        visibility: isGlobalFirst ? "visible" : visibility,
        zIndex: globalIndex,
        inset: 0,
        boxShadow:
          globalIndex === 0
            ? "0 4px 20px rgba(0,0,0,0.1)"
            : "0 12px 40px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)",
        border: "1px solid var(--pf-border)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={mobile ? "85vw" : "42vw"}
        priority={localIndex === 0}
      />
    </motion.div>
  );
}

// --- SECTION IMAGE STACK (wraps all images for one section with a section-level exit opacity) ---
function SectionImageStack({
  section,
  sectionIndex,
  scrollProgress,
  mobile,
}: {
  section: (typeof sections)[number];
  sectionIndex: number;
  scrollProgress: MotionValue<number>;
  mobile?: boolean;
}) {
  const timing = sectionTimings[sectionIndex];
  const isFirst = sectionIndex === 0;
  const isLast = sectionIndex === sections.length - 1;

  // Compute global image offset so z-index stacks correctly across all sections
  let imgsBefore = 0;
  for (let i = 0; i < sectionIndex; i++) imgsBefore += sections[i].images.length;

  return (
    <div className="absolute inset-0">
      {section.images.map((src, li) => (
        <AccordionImage
          key={li}
          src={src}
          alt={`${section.heading} ${li + 1}`}
          localIndex={li}
          sectionIndex={sectionIndex}
          globalIndex={imgsBefore + li}
          sectionContentStart={timing.contentStart}
          sectionImgCount={section.images.length}
          scrollProgress={scrollProgress}
          mobile={mobile}
        />
      ))}
    </div>
  );
}

// --- SECTION TEXT ---
function SectionText({
  section,
  sectionIndex,
  scrollProgress,
  mobile,
}: {
  section: (typeof sections)[number];
  sectionIndex: number;
  scrollProgress: MotionValue<number>;
  mobile?: boolean;
}) {
  const timing = sectionTimings[sectionIndex];
  const isFirst = sectionIndex === 0;
  const isLast = sectionIndex === sections.length - 1;

  // Text exit: occupies the FIRST half of the gap (so it's fully gone before incoming starts)
  const gapSize = timing.exitEnd - timing.exitStart;
  const textExitStart = timing.exitStart;
  const textExitEnd = timing.exitStart + gapSize * 0.45;

  // Text enter: occupies the SECOND half of the gap (starts after outgoing is gone)
  const textEnterStart = timing.enterEnd - (timing.enterEnd - timing.enterStart) * 0.45;
  const textEnterEnd = timing.enterEnd;

  // Build opacity keyframes — clamp at both ends so values don't extrapolate
  let opacityInput: number[];
  let opacityOutput: number[];

  if (isFirst) {
    // Visible from start, fades out, stays at 0 forever after
    opacityInput = [0, Math.max(0.001, textExitStart), Math.max(0.002, textExitEnd), 1];
    opacityOutput = [1, 1, 0, 0];
  } else if (isLast) {
    // Hidden until enter, then stays visible
    opacityInput = [0, Math.max(0.001, textEnterStart - 0.001), textEnterStart, textEnterEnd];
    opacityOutput = [0, 0, 0, 1];
  } else {
    // Hidden, fades in, holds, fades out, stays hidden
    opacityInput = [0, Math.max(0.001, textEnterStart - 0.001), textEnterStart, textEnterEnd, textExitStart, textExitEnd, 1];
    opacityOutput = [0, 0, 0, 1, 1, 0, 0];
  }

  const textOpacity = useTransform(scrollProgress, opacityInput, opacityOutput);

  if (mobile) {
    return (
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{ opacity: textOpacity, zIndex: sectionIndex, pointerEvents: "none" }}
      >
        <div
          className="font-mono text-[11px] tracking-[0.2em] uppercase mb-3"
          style={{ color: `var(--pf-${section.accent})` }}
        >
          {section.date}
        </div>
        <h2
          className="font-serif font-light text-[28px] tracking-[-0.03em] leading-[1.12] mb-3"
          style={{ color: "var(--pf-text)" }}
        >
          {section.heading}
        </h2>
        <p
          className="text-[15px] leading-[1.7] tracking-tight"
          style={{ color: "var(--pf-text-muted)" }}
        >
          {section.body}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity: textOpacity, zIndex: sectionIndex, pointerEvents: "none" }}
    >
      <div
        className="font-mono text-[11px] tracking-[0.2em] uppercase mb-4"
        style={{ color: `var(--pf-${section.accent})` }}
      >
        {section.date}
      </div>
      <h2
        className="font-serif font-light text-[clamp(32px,4vw,52px)] tracking-[-0.03em] leading-[1.08] mb-6"
        style={{ color: "var(--pf-text)" }}
      >
        {section.heading}
      </h2>
      <p
        className="text-[16px] leading-[1.75] tracking-tight max-w-[480px]"
        style={{ color: "var(--pf-text-muted)" }}
      >
        {section.body}
      </p>
      {/* Section indicator */}
      <div className="flex gap-2 mt-8">
        {sections.map((_, i) => (
          <div
            key={i}
            className="h-[3px] rounded-full"
            style={{
              width: i === sectionIndex ? 32 : 12,
              background:
                i === sectionIndex
                  ? `var(--pf-${section.accent})`
                  : "var(--pf-border-strong)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// --- MAIN COMPONENT ---
export function MyStoryContent() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  // Total scroll height based on units. Extra 100vh at end ensures the sticky stays
  // pinned when scrollYProgress hits 1.0 (last section remains visible).
  const scrollHeight = `${totalUnits * 55 + 200}vh`;

  return (
    <main>
      {/* Hero header */}
      <section className="px-5 md:px-[72px] pt-[130px] pb-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
        >
          <div className="pf-eyebrow mb-5">My Story</div>
          <h1
            className="font-serif font-light tracking-[-0.035em] leading-[0.95]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            From India to the US, to Singapore, to{" "}
            <span className="italic" style={{ color: "var(--pf-accent)" }}>
              wherever&apos;s next
            </span>
            .
          </h1>
          <p
            className="text-[17px] font-light mt-6 leading-relaxed tracking-tight max-w-[580px]"
            style={{ color: "var(--pf-text-muted)" }}
          >
            Every move taught me something new. Here&apos;s how I got here.
          </p>
        </motion.div>
      </section>

      {/* Single scroll container */}
      <div ref={scrollContainerRef} style={{ height: scrollHeight }} className="relative">
        <div className="sticky top-0 h-screen flex items-center">
          {/* Desktop layout */}
          <div className="hidden md:grid grid-cols-2 gap-12 lg:gap-20 w-full px-8 lg:px-[72px] max-w-[1440px] mx-auto">
            {/* Left: text layers */}
            <div className="relative">
              {sections.map((section, i) => (
                <SectionText
                  key={i}
                  section={section}
                  sectionIndex={i}
                  scrollProgress={scrollYProgress}
                />
              ))}
            </div>

            {/* Right: image stacks per section */}
            <div className="flex items-center justify-center">
              <div
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: "4 / 5",
                  maxHeight: "70vh",
                }}
              >
                <div
                  className="relative w-full h-full"
                  style={{ padding: "0 24px 24px 0" }}
                >
                  {sections.map((section, i) => (
                    <SectionImageStack
                      key={i}
                      section={section}
                      sectionIndex={i}
                      scrollProgress={scrollYProgress}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="md:hidden flex flex-col gap-5 w-full px-5">
            {/* Text layers */}
            <div className="relative min-h-[200px]">
              {sections.map((section, i) => (
                <SectionText
                  key={i}
                  section={section}
                  sectionIndex={i}
                  scrollProgress={scrollYProgress}
                  mobile
                />
              ))}
            </div>
            {/* Image stacks */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 5", maxHeight: "40vh" }}>
              <div className="relative w-full h-full" style={{ padding: "0 15px 15px 0" }}>
                {sections.map((section, i) => (
                  <SectionImageStack
                    key={i}
                    section={section}
                    sectionIndex={i}
                    scrollProgress={scrollYProgress}
                    mobile
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
