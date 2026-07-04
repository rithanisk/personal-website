"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { PhotoCollageHero } from "@/components/shared/PhotoCollageHero";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function AboutContent() {
  const shouldReduceMotion = useReducedMotion();

  const container = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
      };

  const item = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
      };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <PhotoCollageHero />

      {/* Bio section */}
      <motion.div
        className="max-w-[820px] mx-auto px-5 sm:px-10 md:px-[72px] pb-20"
        variants={item}
      >
        <div className="space-y-5 text-[15px] leading-[1.8] tracking-[-0.01em]" style={{ color: "var(--pf-text-muted)" }}>
          <p>
            Growing up, I was the kid who always asked for more. To learn more, do more, be more. When I was little, I once asked my mom if I could have two jobs when I grew up. She laughed, but told me something I&apos;ve never forgotten: <em style={{ color: "var(--pf-text)" }}>&ldquo;If your passion is fierce enough, you can make anything happen.&rdquo;</em>
          </p>

          <p>
            While I don&apos;t want to be an actress and doctor anymore, I&apos;ve been chasing that ever since. Not a specific title or a destination, but the feeling of making something that matters to someone. It&apos;s why I packed up and moved to Singapore for university after growing up in the US for 18 years. It&apos;s why I spent a summer in Vietnam interning at a health tech startup and immersing myself in the local culture. And it&apos;s why I&apos;m currently spending an entire year out of my university program in Toronto, working alongside some of the brightest founders and developers I&apos;ve ever met. I&apos;m constantly putting myself in rooms where I know nobody and nothing is familiar because every new place has cracked something open in me. A different way of seeing problems. A deeper understanding of what the people there actually need. Because at the core, we&apos;re building for people, and how can we build for them if we don&apos;t understand them?
          </p>

          <p>
            So I build. An idea comes to me and I&apos;m already opening my laptop. Sometimes it becomes something real, like a visual Bharatnatyam mudra recognition application that lets young Bharatanatyam students practice on their own. Other times, something fun, like a telegram bot to keep track of a leetcode competition between my friend and I. If a solution helps even one person, let alone brings a smile to their face, that matters as much to me as a product used by millions.
          </p>

          <p>
            What most people don&apos;t expect is that before I ever wrote a line of code, I spent years investing in my creative side: dancing Bharatanatyam, singing Carnatic music, going to art classes, and cooking for my family. In fact, my name, <em style={{ color: "var(--pf-rose)" }}>Rithani</em>, means the Hindu goddess of the arts. What those 15 years gave me wasn&apos;t just a creative outlet. They taught me that the most powerful thing you can do is make someone feel something, whether that&apos;s through a performance, a well-told story, or a product that just works the way it should. That&apos;s what I&apos;m still doing, just with different tools now.
          </p>

          <p>
            I care most about the place where technology meets people and how I can build products and deliver stories that matter. I want to be a changemaker not someday, but in every role I take on right now. If that&apos;s the kind of work you resonate with, I&apos;d love to be part of it :)
          </p>
        </div>

        <Link
          href="/my-story"
          className="inline-flex items-center gap-2 mt-8 text-[14px] font-medium transition-colors duration-200"
          style={{ color: "var(--pf-rose)" }}
        >
          Read my story
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </motion.div>
    </motion.div>
  );
}
