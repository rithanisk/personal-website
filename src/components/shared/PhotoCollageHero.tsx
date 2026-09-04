"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const photos = [
  // Top — dense overlapping row above text
  { src: "/media-v1/collage/fam.webp", alt: "Family", width: 200, height: 260, rotate: -8, top: "-6%", left: "2%", mobileHidden: false },
  { src: "/media-v1/collage/india.webp", alt: "India", width: 180, height: 235, rotate: 4, top: "-2%", left: "16%", mobileHidden: true },
  { src: "/media-v1/collage/toronto2.webp", alt: "Toronto skyline", width: 190, height: 245, rotate: -3, top: "-8%", left: "36%", mobileHidden: true },
  { src: "/media-v1/collage/toronto3.webp", alt: "Toronto winter", width: 175, height: 225, rotate: 5, top: "-4%", right: "28%", mobileHidden: true },
  { src: "/media-v1/collage/singapore1.webp", alt: "Singapore", width: 185, height: 240, displayHeight: 190, rotate: -5, top: "-6%", right: "12%", mobileHidden: false },
  { src: "/media-v1/collage/vietnam3.webp", alt: "Vietnam coast", width: 170, height: 220, rotate: 7, top: "-2%", right: "0%", mobileHidden: true },

  // Left side — overlapping vertically along heading
  { src: "/media-v1/collage/vietnam.webp", alt: "Vietnam", width: 185, height: 240, rotate: 6, top: "30%", left: "0%", mobileHidden: true },
  { src: "/media-v1/collage/ta.webp", alt: "TA", width: 165, height: 215, rotate: -4, top: "64%", right: "4%", mobileHidden: true },

  // Right side — overlapping vertically along heading
  { src: "/media-v1/collage/toronto.webp", alt: "Toronto", width: 180, height: 235, rotate: -5, top: "28%", right: "0%", mobileHidden: true },

  // Bottom — dense overlapping row below text
  { src: "/media-v1/collage/usa3.webp", alt: "USA", width: 195, height: 250, rotate: -6, top: "60%", left: "4%", mobileHidden: true },
  { src: "/media-v1/collage/vietnam2.webp", alt: "Vietnam street", width: 180, height: 235, rotate: 5, top: "64%", left: "20%", mobileHidden: true },
  { src: "/media-v1/collage/flower.webp", alt: "Flower", width: 195, height: 250, rotate: -2, top: "62%", left: "38%", mobileHidden: true },
  { src: "/media-v1/collage/IMG_7519.webp", alt: "Rithani", width: 185, height: 240, rotate: 4, top: "66%", right: "22%", mobileHidden: true },
] as const;

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function PhotoCollageHero() {
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

  const photoVariant = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, scale: 0.92 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } },
      };

  return (
    <motion.section
      className="relative px-5 sm:px-10 md:px-[72px] pt-20 sm:pt-32 pb-20"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div className="relative max-w-[1100px] mx-auto min-h-[420px] sm:min-h-[600px]">
        {/* Scattered photos */}
        {photos.map((photo, i) => (
          <motion.div
            key={photo.src}
            className={`absolute z-[1] ${photo.mobileHidden ? "hidden md:block" : ""}`}
            style={{
              top: photo.top,
              left: "left" in photo ? photo.left : undefined,
              right: "right" in photo ? photo.right : undefined,
              width: photo.width,
              rotate: `${photo.rotate}deg`,
            }}
            variants={photoVariant}
            custom={i}
          >
            <div
              className="overflow-hidden rounded-lg"
              style={{ boxShadow: "var(--pf-shadow-lg)" }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="object-cover w-full h-auto"
                style={{ height: "displayHeight" in photo ? photo.displayHeight : undefined }}
                sizes="200px"
                fetchPriority={i < 2 ? "high" : "auto"}
              />
            </div>
          </motion.div>
        ))}

        {/* Heading — centered within photo wreath */}
        <motion.div
          className="absolute inset-0 z-[2] flex flex-col items-center justify-center text-center -mt-20 sm:-mt-28"
          variants={item}
        >
          <h1 className="relative w-full max-w-[680px]">
            <Image
              src="/media-v1/handwritten-intro-transparent.png"
              alt="Hi! I'm Rithani"
              width={2172}
              height={724}
              className="h-[clamp(70px,12vw,124px)] w-full object-cover"
              sizes="(max-width: 768px) 90vw, 680px"
              priority
            />
            <Link
              href="/about"
              aria-label="Learn more about Rithani"
              className="group/name absolute bottom-[8%] left-[45%] right-[3%] top-[8%] cursor-pointer rounded-xl outline-none ring-offset-4 transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:ring-2"
              style={{ '--tw-ring-color': "var(--pf-rose)", '--tw-ring-offset-color': "var(--pf-bg)" } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className="absolute bottom-[8%] left-[7%] right-[10%] h-[2px] origin-left scale-x-0 rounded-full bg-[color:var(--pf-rose)] opacity-70 transition-transform duration-300 group-hover/name:scale-x-100"
              />
            </Link>
          </h1>
          <div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-2"
            style={{ fontSize: "clamp(14px, 1.6vw, 18px)" }}
          >
            <span className="text-[0.9em]" style={{ color: "var(--pf-text-muted)" }}>I am a</span>
            {[
              { label: "Builder.", bg: "var(--pf-rose-soft)", color: "var(--pf-rose-ink)" },
              { label: "Storyteller.", bg: "var(--pf-forest-soft)", color: "var(--pf-forest-ink)" },
              { label: "Product Thinker.", bg: "var(--pf-amber-soft)", color: "var(--pf-amber-ink)" },
            ].map((role) => (
              <span
                key={role.label}
                className="inline-block px-3 py-1 rounded-full text-[0.9em] font-medium"
                style={{ background: role.bg, color: role.color }}
              >
                {role.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
