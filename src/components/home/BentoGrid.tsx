"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/shared/Icons";

type CardImage = {
  src: string;
  alt: string;
  mode:
    | "bottom-half"
    | "bottom-full"
    | "bottom-center"
    | "bottom-side-left"
    | "bottom-side-right"
    | "group-strip"
    | "cover";
  size?: "default" | "large";
  offsetY?: string;
  scale?: number;
};

type CardProps = {
  type: "experience" | "project" | "hobby";
  title: string;
  role?: string;
  date?: string;
  description?: string;
  href?: string;
  wide?: boolean;
  images?: CardImage[];
};

function CardTitle({
  type,
  title,
  role,
  date,
  cover,
}: Pick<CardProps, "type" | "title" | "role" | "date"> & { cover?: boolean }) {
  const textColor = cover ? "#fff" : "var(--pf-text)";
  const mutedColor = cover ? "rgba(255,255,255,0.75)" : "var(--pf-text-muted)";
  const dimColor = cover ? "rgba(255,255,255,0.55)" : "var(--pf-text-dim)";

  if (type === "experience") {
    return (
      <div className="flex flex-wrap items-baseline gap-x-1.5">
        <span
          className="font-serif text-lg md:text-2xl tracking-[-0.02em] leading-tight"
          style={{ color: textColor }}
        >
          {title}
        </span>
        {role && (
          <>
            <span className="text-sm md:text-base" style={{ color: dimColor }}>
              ·
            </span>
            <span
              className="font-sans font-medium text-sm md:text-base leading-tight"
              style={{ color: mutedColor }}
            >
              {role}
            </span>
          </>
        )}
        {date && (
          <>
            <span className="text-sm md:text-base" style={{ color: dimColor }}>
              ·
            </span>
            <span
              className="font-sans font-normal text-sm md:text-base leading-tight"
              style={{ color: dimColor }}
            >
              {date}
            </span>
          </>
        )}
      </div>
    );
  }

  if (type === "hobby" && role) {
    return (
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span
          className="font-serif text-lg md:text-xl tracking-[-0.02em] leading-tight"
          style={{ color: "#fff" }}
        >
          {title}
        </span>
        <span className="text-sm" style={{ color: dimColor }}>
          ·
        </span>
        <span
          className="font-sans font-medium text-xs md:text-sm leading-tight"
          style={{ color: mutedColor }}
        >
          {role}
        </span>
      </div>
    );
  }

  return (
    <span
      className="font-serif text-lg md:text-2xl tracking-[-0.02em] leading-tight"
      style={{ color: textColor }}
    >
      {title}
    </span>
  );
}

function BentoCard({
  type,
  title,
  role,
  date,
  description,
  href,
  wide,
  images,
  index,
}: CardProps & { index: number }) {
  const hasCover = images?.some((img) => img.mode === "cover");
  const typeColor = type === "experience" ? "var(--pf-rose)" : "var(--pf-forest-ink)";

  const content = (
    <motion.div
      className={`group relative h-full overflow-hidden rounded-[18px] ${
        wide ? "aspect-[16/10] sm:aspect-[2/1] md:aspect-auto" : "aspect-square md:aspect-auto"
      }`}
      style={{
        background: "var(--pf-bg)",
        border: "1px solid var(--pf-border)",
        boxShadow: "var(--pf-shadow)",
      }}
      whileHover={{ y: -5, boxShadow: "var(--pf-shadow-lg)" }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
    >
      {/* Gradient overlay for readability on cover images */}
      {hasCover && (
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.08) 58%, rgba(0,0,0,0.2) 100%)",
          }}
        />
      )}

      {/* Top-left title */}
      <div className="absolute top-4 left-4 right-4 z-[2] md:top-5 md:left-5 md:right-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span
            className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em]"
            style={{ color: hasCover ? "rgba(255,255,255,0.72)" : typeColor }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: hasCover ? "rgba(255,255,255,0.8)" : typeColor }}
            />
            {type}
          </span>
          <span
            className="font-mono text-[9px] tracking-[0.14em]"
            style={{ color: hasCover ? "rgba(255,255,255,0.58)" : "var(--pf-text-dim)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <CardTitle
          type={type}
          title={title}
          role={role}
          date={date}
          cover={hasCover}
        />
        {description && (
          <p
            className={`mt-2 text-[13px] leading-relaxed tracking-tight line-clamp-2 ${
              wide ? "hidden sm:block" : ""
            }`}
            style={{
              color: hasCover
                ? "rgba(255,255,255,0.75)"
                : "var(--pf-text-muted)",
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Images */}
      {images && images.length > 0 && (
        <div className="absolute inset-0 z-[1]">
          {images.map((img, i) => {
            if (img.mode === "bottom-half") {
              return (
                <div
                  key={i}
                  className="absolute bottom-0 left-4"
                  style={{ height: "65%", width: "auto" }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={800}
                    className="h-full w-auto object-contain object-bottom"
                    style={{
                      filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.12))",
                    }}
                  />
                </div>
              );
            }
            if (img.mode === "bottom-full") {
              return (
                <div
                  key={i}
                  className="absolute bottom-0 right-4"
                  style={{ height: "65%", width: "auto" }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={400}
                    className="h-full w-auto object-contain object-bottom"
                    style={{
                      filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.12))",
                    }}
                  />
                </div>
              );
            }
            if (img.mode === "bottom-center") {
              const isLarge = img.size === "large";
              const scale = img.scale ?? (isLarge ? 1.22 : 1);
              const offsetY = img.offsetY ?? (isLarge ? "14%" : "0");

              return (
                <div
                  key={i}
                  className={
                    isLarge
                      ? "absolute inset-x-0 bottom-0"
                      : "absolute bottom-0 left-1/2 -translate-x-1/2"
                  }
                  style={
                    isLarge
                      ? {
                          height: "100%",
                          transform: `translateY(${offsetY}) scale(${scale})`,
                          transformOrigin: "bottom center",
                        }
                      : { height: "65%", width: "auto" }
                  }
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={isLarge ? 1400 : 400}
                    height={isLarge ? 900 : 800}
                    className={
                      isLarge
                        ? "h-full w-full object-contain object-bottom"
                        : "h-full w-auto object-contain object-bottom"
                    }
                    style={{
                      filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.12))",
                    }}
                  />
                </div>
              );
            }
            if (img.mode === "bottom-side-left") {
              return (
                <div
                  key={i}
                  className="absolute bottom-0 left-3"
                  style={{ width: "46%", height: "55%" }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover object-center rounded-lg"
                    style={{
                      filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.1))",
                    }}
                  />
                </div>
              );
            }
            if (img.mode === "bottom-side-right") {
              return (
                <div
                  key={i}
                  className="absolute bottom-0 right-3"
                  style={{ width: "46%", height: "55%" }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover object-center rounded-lg"
                    style={{
                      filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.1))",
                    }}
                  />
                </div>
              );
            }
            if (img.mode === "group-strip") {
              return (
                <div
                  key={i}
                  className="absolute inset-x-0 bottom-0 h-[56%] sm:h-[58%] md:h-[60%]"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1280px) 58vw, (min-width: 768px) 50vw, 100vw"
                    className="object-contain object-bottom"
                    style={{
                      filter: "drop-shadow(0 5px 14px rgba(0,0,0,0.14))",
                    }}
                  />
                </div>
              );
            }
            if (img.mode === "cover") {
              return (
                <Image
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              );
            }
            return null;
          })}
        </div>
      )}

      {/* Arrow on hover */}
      {href && (
        <div
          className="absolute bottom-3.5 right-3.5 z-[2] grid h-8 w-8 translate-y-1 place-items-center rounded-full opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
          style={{
            color: hasCover ? "#fff" : "var(--pf-text)",
            background: hasCover ? "rgba(0,0,0,0.45)" : "var(--pf-surface)",
            border: hasCover ? "1px solid rgba(255,255,255,0.22)" : "1px solid var(--pf-border)",
            backdropFilter: "blur(10px)",
          }}
        >
          <ArrowRightIcon />
        </div>
      )}
    </motion.div>
  );

  if (href) {
    return <Link href={href} className="block h-full">{content}</Link>;
  }

  return content;
}

const cards: CardProps[] = [
  {
    type: "experience",
    title: "Nia Health",
    role: "Software / AI Engineer",
    date: "Aug 2025 — Jul 2026",
    description:
      "Building async GPT parsing pipelines and a CGM data system in FastAPI + React. Cut report parsing latency by 70% and shipped end-to-end glucose review tooling deployed on Azure.",
    href: "/experience",
    wide: true,
    images: [
      {
        src: "/media-v1/NiaHealth.webp",
        alt: "Nia Health app dashboard",
        mode: "bottom-half",
      },
      {
        src: "/media-v1/NiaHealth2.webp",
        alt: "Nia Health kidney function chart",
        mode: "bottom-full",
      },
    ],
  },
  {
    type: "project",
    title: "Mudra Recognition",
    description:
      "Real-time Bharatanatyam mudra classification trained on custom dataset",
    href: "/projects",
    images: [
      {
        src: "/media-v1/bharatnatyam.webp",
        alt: "Mudra Recognition live hand gesture classification UI",
        mode: "bottom-center",
        size: "large",
        scale: 1.32,
        offsetY: "70%",
      },
    ],
  },
  {
    type: "experience",
    title: "Buymed",
    role: "Software Engineer Intern",
    date: "May — Aug 2024",
    description:
      "Built and scaled production full-stack systems, delivering 10+ features and fixing critical performance issues. Also developed a concurrent Go-based scraping pipeline and a RAG-powered company chatbot.",
    href: "/experience",
    wide: true,
    images: [
      {
        src: "/media-v1/Buymed.webp",
        alt: "Buymed delivery",
        mode: "bottom-side-left",
      },
      {
        src: "/media-v1/Buymed2.webp",
        alt: "Buymed platform",
        mode: "bottom-side-right",
      },
    ],
  },
  {
    type: "project",
    title: "Lock-In",
    description:
      "App for university students to beat procrastination through financial accountability",
    href: "/projects",
    images: [
      {
        src: "/media-v1/LockIn.webp",
        alt: "Lock-In app preview",
        mode: "bottom-center",
      },
    ],
  },
  {
    type: "experience",
    title: "NUS",
    role: "Teaching Assistant",
    date: "Aug 2024 — Present",
    description:
      "Led tutorials on responsible AI, data privacy law, and digital ethics for IS1108.",
    href: "/experience",
    wide: true,
    images: [
      {
        src: "/media-v1/experience/ta/ta-group-cutouts-v1.png",
        alt: "Five IS1108 tutorial groups taught by Rithani",
        mode: "group-strip",
      },
    ],
  },
  {
    type: "project",
    title: "Personal Website",
    description:
      "My personal website built with Next.js, Tailwind CSS, and Framer Motion",
    href: "/projects",
    images: [
      {
        src: "/media-v1/website.webp",
        alt: "Personal website homepage preview",
        mode: "bottom-center",
        size: "large",
        scale: 1.40,
        offsetY: "75%",
      },
    ],
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const cardLayouts = [
  "sm:col-span-2 md:col-span-6 md:row-span-3 xl:col-span-7",
  "md:col-span-3 md:row-span-3 xl:col-span-5",
  "sm:col-span-2 md:col-span-6 md:row-span-3 xl:col-span-8",
  "md:col-span-3 md:row-span-3 xl:col-span-4",
  "sm:col-span-2 md:col-span-3 md:row-span-3 xl:col-span-7 xl:row-span-2",
  "md:col-span-6 md:row-span-2 xl:col-span-5",
];

export function BentoGrid() {
  return (
    <section className="px-5 md:px-[72px] mt-6">
      <motion.div
        className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-pf-border pb-[18px] sm:flex-row sm:items-baseline"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <div className="pf-eyebrow mb-2.5">Highlights</div>
          <h2 className="font-serif font-light text-[clamp(26px,3.5vw,40px)] tracking-[-0.025em] leading-[1.05]">
            What I&apos;ve been{" "}
            <span style={{ color: "var(--pf-forest-ink)" }}>
              doing
            </span>
            .
          </h2>
        </div>
        <Link
          href="/experience"
          className="text-[13px] inline-flex items-center gap-1.5"
          style={{ color: "var(--pf-text-muted)" }}
        >
          Explore experience <ArrowRightIcon />
        </Link>
      </motion.div>

      <div className="relative">
        <motion.div
          className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:auto-rows-[118px] md:grid-cols-6 xl:grid-cols-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={`${card.type}-${card.title}`}
              variants={cardVariants}
              className={cardLayouts[i]}
            >
              <BentoCard {...card} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
