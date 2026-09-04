"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const POLAROID_WIDTH = 154;
const POLAROID_HEIGHT = 154;
const POLAROID_GAP = 48;

const highlightTones = {
  rose: { background: "var(--pf-rose-soft)", color: "var(--pf-rose-ink)" },
  forest: { background: "var(--pf-forest-soft)", color: "var(--pf-forest-ink)" },
  amber: { background: "var(--pf-amber-soft)", color: "var(--pf-amber-ink)" },
} as const;

type Tone = keyof typeof highlightTones;

type AboutMediaItem = {
  key: string;
  src: string;
  alt: string;
  caption: string;
  side: "left" | "right";
  rotate: number;
  tone: Tone;
  xOffset: number;
  yOffset: number;
  gapBefore?: number;
  objectPosition?: string;
};

type Placement = AboutMediaItem & {
  top: number;
  cardX: number;
  anchorX: number;
  anchorY: number;
};

const aboutMedia: AboutMediaItem[] = [
  { key: "curiosity", src: "/media-v1/fam.webp", alt: "Rithani with her family on a university campus", caption: "The people who taught me to stay curious", side: "right", rotate: -7, tone: "rose", xOffset: 34, yOffset: -190 },
  { key: "singapore", src: "/media-v1/singapore1.webp", alt: "Rithani in front of Marina Bay Sands at night", caption: "A new home in Singapore", side: "left", rotate: 6, tone: "forest", xOffset: -24, yOffset: -325, objectPosition: "center 66%" },
  { key: "united-states", src: "/media-v1/usa2.webp", alt: "A childhood photo of Rithani outdoors", caption: "Growing up in California", side: "right", rotate: 4, tone: "amber", xOffset: -8, yOffset: 10 },
  { key: "vietnam", src: "/media-v1/vietnam3.webp", alt: "Rithani at a group dinner in Vietnam", caption: "A summer in Ho Chi Minh City", side: "left", rotate: -5, tone: "rose", xOffset: 22, yOffset: -68, gapBefore: 28 },
  { key: "toronto", src: "/media-v1/toronto3.webp", alt: "Rithani with the NiaHealth team in Toronto", caption: "The NiaHealth team in Toronto", side: "right", rotate: -4, tone: "forest", xOffset: 28, yOffset: -4 },
  { key: "building", src: "/media-v1/bharatnatyam.webp", alt: "Rithani's Bharatanatyam mudra recognition project", caption: "Turning ideas into things", side: "left", rotate: 7, tone: "amber", xOffset: -18, yOffset: -60, gapBefore: 28 },
  { key: "joy", src: "/media-v1/friends.webp", alt: "Rithani hiking with friends", caption: "The people who make it fun", side: "left", rotate: 6, tone: "rose", xOffset: -16, yOffset: -18, gapBefore: 28 },
  { key: "dance", src: "/media-v1/passions/dancing/dancing-1.webp", alt: "Rithani performing Bharatanatyam on stage", caption: "Bharatanatyam, always", side: "right", rotate: -7, tone: "forest", xOffset: 30, yOffset: 18 },
  { key: "cooking", src: "/media-v1/passions/cooking/cooking-1.webp", alt: "A meal prepared by Rithani", caption: "Made with love (and avocado)", side: "left", rotate: -6, tone: "amber", xOffset: 20, yOffset: -52, gapBefore: 28 },
  { key: "human-centered-tech", src: "/media-v1/NiaHealth.webp", alt: "A health technology interface designed for NiaHealth", caption: "Technology built around people", side: "right", rotate: 5, tone: "rose", xOffset: -10, yOffset: 24 },
];

const mediaByKey = new Map(aboutMedia.map((media) => [media.key, media]));

function StoryHighlight({ children, mediaKey, tone }: { children: ReactNode; mediaKey: string; tone: Tone }) {
  return (
    <mark data-media-key={mediaKey} className="rounded-[4px] px-1 py-0.5 font-medium box-decoration-clone" style={highlightTones[tone]}>
      {children}
    </mark>
  );
}

function Polaroid({ media, compact = false }: { media: AboutMediaItem; compact?: boolean }) {
  return (
    <motion.figure
      className={compact ? "w-[148px] shrink-0" : "absolute w-[154px]"}
      style={compact ? undefined : { transform: `rotate(${media.rotate}deg)` }}
      whileHover={{ rotate: 0, y: -4, scale: 1.025 }}
      transition={{ duration: 0.25, ease }}
    >
      <div className="border border-black/[0.08] bg-[#fffdf8] p-2 pb-2.5" style={{ boxShadow: "0 8px 24px rgba(45, 34, 24, 0.14)" }}>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#eee9e1]">
          <Image src={media.src} alt={media.alt} fill sizes={compact ? "148px" : "154px"} className="object-cover" style={{ objectPosition: media.objectPosition ?? "center" }} />
        </div>
        <figcaption className="mt-2 min-h-8 text-center font-serif text-[11px] italic leading-[1.3] text-[#51463c]">
          {media.caption}
        </figcaption>
      </div>
    </motion.figure>
  );
}

function MobileMoments({ mediaKeys }: { mediaKeys: string[] }) {
  const items = mediaKeys.map((key) => mediaByKey.get(key)).filter((media): media is AboutMediaItem => Boolean(media));

  return (
    <div className="-mx-1 mt-5 flex snap-x gap-4 overflow-x-auto px-1 pb-4 xl:hidden">
      {items.map((media) => (
        <div key={media.key} className="snap-start py-1" style={{ transform: `rotate(${media.rotate * 0.6}deg)` }}>
          <Polaroid media={media} compact />
        </div>
      ))}
    </div>
  );
}

function DesktopAnnotations({ placements, height }: { placements: Placement[]; height: number }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 hidden xl:block" style={{ height }} aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full overflow-visible">
        {placements.map((placement) => {
          const startX = placement.side === "left" ? placement.cardX + POLAROID_WIDTH : placement.cardX;
          const startY = placement.top + POLAROID_HEIGHT / 2;
          const direction = placement.side === "left" ? 1 : -1;
          const bend = Math.max(42, Math.abs(placement.anchorX - startX) * 0.48);
          const stroke = `var(--pf-${placement.tone})`;

          return (
            <g key={placement.key}>
              <path d={`M ${startX} ${startY} C ${startX + direction * bend} ${startY}, ${placement.anchorX - direction * 34} ${placement.anchorY}, ${placement.anchorX} ${placement.anchorY}`} fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray="4 5" strokeLinecap="round" opacity="0.58" />
              <circle cx={placement.anchorX} cy={placement.anchorY} r="3" fill={stroke} opacity="0.76" />
            </g>
          );
        })}
      </svg>

      {placements.map((placement) => (
        <div key={placement.key} className="pointer-events-auto absolute" style={{ left: placement.cardX, top: placement.top }}>
          <Polaroid media={placement} />
        </div>
      ))}
    </div>
  );
}

export function AboutContent() {
  const shouldReduceMotion = useReducedMotion();
  const letterRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [annotationHeight, setAnnotationHeight] = useState(0);

  const positionAnnotations = useCallback(() => {
    const letter = letterRef.current;
    const copy = copyRef.current;
    if (!letter || !copy || window.innerWidth < 1280) {
      setPlacements([]);
      setAnnotationHeight(copy?.offsetHeight ?? 0);
      return;
    }

    const letterRect = letter.getBoundingClientRect();
    const copyRect = copy.getBoundingClientRect();
    const railInset = Math.max(8, (copyRect.left - letterRect.left - POLAROID_WIDTH) * 0.42);
    const nextBottom = { left: -280, right: -220 };
    let maxBottom = copy.offsetHeight;

    const nextPlacements = aboutMedia.map((media) => {
      const highlight = copy.querySelector<HTMLElement>(`[data-media-key="${media.key}"]`);
      const highlightRect = highlight?.getBoundingClientRect();
      const anchorY = highlightRect ? highlightRect.top - letterRect.top + highlightRect.height / 2 : 0;
      const minimumTop = media.side === "left" ? -280 : -220;
      const preferredTop = Math.max(minimumTop, anchorY - POLAROID_HEIGHT / 2 + media.yOffset);
      const top = Math.max(preferredTop, nextBottom[media.side] + (media.gapBefore ?? 0));
      const baseCardX = media.side === "left" ? railInset : letterRect.width - railInset - POLAROID_WIDTH;
      const cardX = baseCardX + media.xOffset;
      const anchorX = highlightRect ? (media.side === "left" ? highlightRect.left : highlightRect.right) - letterRect.left : copyRect.left - letterRect.left;

      nextBottom[media.side] = top + POLAROID_HEIGHT + POLAROID_GAP;
      maxBottom = Math.max(maxBottom, top + POLAROID_HEIGHT);
      return { ...media, top, cardX, anchorX, anchorY };
    });

    setPlacements(nextPlacements);
    setAnnotationHeight(maxBottom);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(positionAnnotations);
    const observer = new ResizeObserver(positionAnnotations);
    if (letterRef.current) observer.observe(letterRef.current);
    if (copyRef.current) observer.observe(copyRef.current);
    window.addEventListener("resize", positionAnnotations);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", positionAnnotations);
    };
  }, [positionAnnotations]);

  const container = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };

  const item = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };

  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <motion.div className="mx-auto max-w-[1380px] px-5 pb-20 pt-24 sm:px-10 md:pt-28 xl:px-8" variants={item}>
        <div className="mx-auto mb-10 w-full max-w-[620px] overflow-hidden">
          <Image src="/media-v1/handwritten-intro-transparent.png" alt="Hi! I'm Rithani" width={2172} height={724} className="h-[clamp(70px,12vw,112px)] w-full object-cover" sizes="(max-width: 768px) 90vw, 620px" priority />
        </div>

        <div ref={letterRef} className="relative mx-auto w-full" style={{ minHeight: annotationHeight || undefined }}>
          <DesktopAnnotations placements={placements} height={annotationHeight} />

          <div ref={copyRef} className="relative z-10 mx-auto max-w-[700px]">
            <div className="space-y-5 text-[15px] leading-[1.8] tracking-[-0.01em]" style={{ color: "var(--pf-text-muted)" }}>
              <div>
                <p>
                  Growing up, I was the kid who always asked for more. <StoryHighlight mediaKey="curiosity" tone="rose">To learn more, do more, be more.</StoryHighlight> When I was little, I once asked my mom if I could have two jobs when I grew up. She laughed, but told me something I&apos;ve never forgotten: <em style={{ color: "var(--pf-text)" }}>&ldquo;If your passion is fierce enough, you can make anything happen.&rdquo;</em>
                </p>
                <MobileMoments mediaKeys={["curiosity"]} />
              </div>

              <div>
                <p>
                  While I don&apos;t want to be an actress and doctor anymore, I&apos;ve been chasing that ever since. Not a specific title or a destination, but the feeling of making something that matters to someone. It&apos;s why I packed up and <StoryHighlight mediaKey="singapore" tone="forest">moved to Singapore</StoryHighlight> for university after <StoryHighlight mediaKey="united-states" tone="amber">growing up in the US</StoryHighlight> for 18 years. It&apos;s why I spent a <StoryHighlight mediaKey="vietnam" tone="rose">summer in Vietnam</StoryHighlight> interning at a health tech startup and immersing myself in the local culture. And it&apos;s why I&apos;m currently spending an entire year out of my university <StoryHighlight mediaKey="toronto" tone="forest">program in Toronto</StoryHighlight>, working alongside some of the brightest founders and developers I&apos;ve ever met. I&apos;m constantly putting myself in rooms where I know nobody and nothing is familiar because every new place has cracked something open in me. A different way of seeing problems. A deeper understanding of what the people there actually need. Because at the core, we&apos;re building for people, and how can we build for them if we don&apos;t understand them?
                </p>
                <MobileMoments mediaKeys={["singapore", "united-states", "vietnam", "toronto"]} />
              </div>

              <div>
                <p>
                  <StoryHighlight mediaKey="building" tone="amber">So I build.</StoryHighlight> An idea comes to me and I&apos;m already opening my laptop. Sometimes it becomes something real, like a visual Bharatnatyam mudra recognition application that lets young Bharatanatyam students practice on their own. Other times, something fun, like a telegram bot to keep track of a leetcode competition between my friend and I. If a solution helps even one person, let alone <StoryHighlight mediaKey="joy" tone="rose">brings a smile to their face</StoryHighlight>, that matters as much to me as a product used by millions.
                </p>
                <MobileMoments mediaKeys={["building", "joy"]} />
              </div>

              <div>
                <p>
                  What most people don&apos;t expect is that before I ever wrote a line of code, I spent years investing in my creative side: <StoryHighlight mediaKey="dance" tone="forest">dancing Bharatanatyam</StoryHighlight>, singing Carnatic music, going to art classes, and <StoryHighlight mediaKey="cooking" tone="amber">cooking for my family</StoryHighlight>. In fact, my name, <em style={{ color: "var(--pf-rose)" }}>Rithani</em>, means the Hindu goddess of the arts. What those 15 years gave me wasn&apos;t just a creative outlet. They taught me that the most powerful thing you can do is make someone feel something, whether that&apos;s through a performance, a well-told story, or a product that just works the way it should. That&apos;s what I&apos;m still doing, just with different tools now.
                </p>
                <MobileMoments mediaKeys={["dance", "cooking"]} />
              </div>

              <div>
                <p>
                  I care most about the place where <StoryHighlight mediaKey="human-centered-tech" tone="rose">technology meets people</StoryHighlight> and how I can build products and deliver stories that matter. I want to be a changemaker not someday, but in every role I take on right now. If that&apos;s the kind of work you resonate with, I&apos;d love to be part of it :)
                </p>
                <MobileMoments mediaKeys={["human-centered-tech"]} />
              </div>
            </div>

            <Link href="/my-story" className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium transition-colors duration-200" style={{ color: "var(--pf-rose)" }}>
              Read my story
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
