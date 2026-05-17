"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const sections = [
  {
    heading: "Who Am I?",
    date: "2005 — 2023",
    accent: "rose",
    body: "I\u2019m Rithani, a second-generation Indian American, born in India and raised in the US. I was born in Karur, a small town in Tamil Nadu, India, and just nine months later, my parents moved us to Seattle, WA. Growing up, I lived between two worlds. As hard as it was building my identity in a foreign country as a young girl, my parents worked equally hard to make sure we also didn't lose where we came from. They taught my younger brother and I to read and write our mother tongue, Tamil, not just speak it. Every other summer, we would all fly back to our parents' hometown to spend time with our grandparents, cousins, and relatives who felt both close and far away at the same time. Even our daily routines were a reminder of where we came from, with weekly temple visits, home-cooked South Indian food, and Tamil entertainment. Despite having multiple hobbies and doing well in anything I tried, I never knew what I wanted to pursue in college. Throughout high school, I switched career paths around four times before deciding to pursue computer science. Eventually, I realized I wanted to pursue a path where I could build products that mattered, while also gaining a new perspective about the world and staying connected to my roots.",
    images: ["/usa.JPG", "/usa2.jpg", "/usa3.png"],
  },
  {
    heading: "Moving to Singapore",
    date: "2023 — 2025",
    accent: "forest",
    body: "When my dad introduced me to the National University of Singapore (NUS), I immediately fell in love with the campus and the city. It was so different from what I grew up around, and it had the education, independence, thrill, and adventure that I was desperately seeking. As soon as I graduated high school and received my acceptance letter, I moved to Singapore to study computer science, knowing absolutely no one. It was hard to adjust to a new city, a new environment, and a new way of life. The first few months were unimaginably hard because I missed my family, friends, and the comfort of my home. But over time, I naviaged all sorts of problems on my own and became more independent, resilient, and confident in myself. Soon enough, I found friends that became family and realized that Singapore was starting to feel more like home.",
    images: ["/singapore1.png", "/singapore2.JPG", "/singapore3.JPG"],
  },
  {
    heading: "Leaving for Vietnam",
    date: "Summer 2024",
    accent: "amber",
    body: "In the summer of 2024, I was one of 25 people to be selected to go on an overseas internship program called NOC (NUS Overseas Colleges) in Vietnam. Within less than a year of moving to Singaore, I packed up again and moved to Ho Chi Minh City for three months to work as a Software Engineer at a healthtech startup called Buymed. Being my first real internship and taste of startup culture, I had insane impostor syndrome. I felt like I knew nothing and didn't belong, but over time, I picked up on the skills and knowledge I needed to succeed and built projects that had direct impact on their customers. I ended up shipping a Go-based scraping pipeline that cut manual work for the global team by 80%, shipped over fifteen production features, and prototyped a RAG-powered internal chatbot for the AI team. It was fast, sometimes chaotic, and exactly the kind of environment I had been looking for. By the end of my internship, I felt so sad to be leaving such a vibrant country and people I had come to love. I left Vietnam knowing I wanted to keep doing work that moved quickly and meant something.",
    images: ["/vietnam.png", "/vietnam2.png", "/vietnam3.png"],
  },
  {
    heading: "Building in Toronto",
    date: "2025 — Present",
    accent: "rose",
    body: "So, when the opportunity to participate in another NOC program came, I did not hesitate. In August of 2025, I became one of 10 people to be selected to go on the NOC Toronto program for an entire year. I'm now living in the heart of Toronto, working at another health tech startup called Nia Health as an AI Engineer. Building off of my experience in Vietnam, I'm continuing to build projects that have direct impact on their customers, but this time at a much larger scale. I collaborate with the company's CTO, engage in the founding team's weekly sync, and have so much more visibility into the company's operations. Apart from the amazing engineering work I'm doing, I'm also learning what it takes to build and sustain a startup from the ground up. Over the past year, I've built numerous projects using the hottest technologies such as GPT-powered data pipelines, cycle tracking applications for women, and AI agents to help clinicians make faster, better decisions for their customers. It's not everyday that you get to look at a product being used by customers and say \u201cHey, I built that myself!\u201d Being here at Nia has probably been some of the most meaningful work I've done so far, and it has unlocked so many important skills that I would never have learned at any other job.",
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

  sectionTimings.push({
    contentStart,
    contentEnd,
    exitStart,
    exitEnd,
    enterStart,
    enterEnd,
  });
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
    isGlobalFirst ? [0, 0] : [1200, 0],
  );

  // Hide completely before trigger so it's not visible off to the side
  const visibility = useTransform(
    scrollProgress,
    [Math.max(0, triggerStart - 0.001), triggerStart],
    ["hidden", "visible"],
  );

  // Each image is slightly smaller than the previous to reveal the stack underneath
  const baseScale = 1 - globalIndex * 0.015;
  const scale = useTransform(
    scrollProgress,
    isGlobalFirst ? [0, 1] : [triggerStart, triggerEnd],
    isGlobalFirst ? [1, 1] : [0.9, baseScale],
  );

  // Alternate tilt direction: even images tilt right, odd images tilt left
  const rotation = globalIndex === 0 ? 0 : globalIndex % 2 === 0 ? 2.5 : -2.5;
  const rotate = useTransform(
    scrollProgress,
    isGlobalFirst ? [0, 1] : [triggerStart, triggerEnd],
    isGlobalFirst ? [0, 0] : [rotation * 3, rotation],
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
  for (let i = 0; i < sectionIndex; i++)
    imgsBefore += sections[i].images.length;

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
  const textEnterStart =
    timing.enterEnd - (timing.enterEnd - timing.enterStart) * 0.45;
  const textEnterEnd = timing.enterEnd;

  // Build opacity keyframes — clamp at both ends so values don't extrapolate
  let opacityInput: number[];
  let opacityOutput: number[];

  if (isFirst) {
    // Visible from start, fades out, stays at 0 forever after
    opacityInput = [
      0,
      Math.max(0.001, textExitStart),
      Math.max(0.002, textExitEnd),
      1,
    ];
    opacityOutput = [1, 1, 0, 0];
  } else if (isLast) {
    // Hidden until enter, then stays visible
    opacityInput = [
      0,
      Math.max(0.001, textEnterStart - 0.001),
      textEnterStart,
      textEnterEnd,
    ];
    opacityOutput = [0, 0, 0, 1];
  } else {
    // Hidden, fades in, holds, fades out, stays hidden
    opacityInput = [
      0,
      Math.max(0.001, textEnterStart - 0.001),
      textEnterStart,
      textEnterEnd,
      textExitStart,
      textExitEnd,
      1,
    ];
    opacityOutput = [0, 0, 0, 1, 1, 0, 0];
  }

  const textOpacity = useTransform(scrollProgress, opacityInput, opacityOutput);

  if (mobile) {
    return (
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{
          opacity: textOpacity,
          zIndex: sectionIndex,
          pointerEvents: "none",
        }}
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
      style={{
        opacity: textOpacity,
        zIndex: sectionIndex,
        pointerEvents: "none",
      }}
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
      <div
        ref={scrollContainerRef}
        style={{ height: scrollHeight }}
        className="relative"
      >
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
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "4 / 5", maxHeight: "40vh" }}
            >
              <div
                className="relative w-full h-full"
                style={{ padding: "0 15px 15px 0" }}
              >
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
