"use client";

import Image from "next/image";
import Link from "next/link";
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
    | "cover";
};

type CardProps = {
  type: "experience" | "project" | "hobby";
  /** Primary name: company name, project name, or hobby name */
  title: string;
  /** Role (experience) or detail like food/location (hobby) */
  role?: string;
  /** Date range (experience only) */
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
      <div className="flex flex-wrap items-baseline gap-x-1.5">
        <span
          className="font-sans font-medium text-[11px] leading-tight"
          style={{ color: "#fff" }}
        >
          {title}
        </span>
        <span className="text-[11px]" style={{ color: dimColor }}>
          |
        </span>
        <span
          className="font-sans font-medium text-[11px] leading-tight"
          style={{ color: "#fff" }}
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
}: CardProps) {
  const hasCover = images?.some((img) => img.mode === "cover");

  const content = (
    <div
      className={`group relative overflow-hidden rounded-xl transition-shadow duration-200 hover:shadow-md ${wide ? "col-span-2" : ""}`}
      style={{
        aspectRatio: wide ? "2 / 1" : "1 / 1",
        background: "var(--pf-surface-2)",
        border: "1px solid var(--pf-border)",
      }}
    >
      {/* Gradient overlay for readability on cover images */}
      {hasCover && (
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 50%)",
          }}
        />
      )}

      {/* Top-left title */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-[2]">
        <CardTitle
          type={type}
          title={title}
          role={role}
          date={date}
          cover={hasCover}
        />
        {description && (
          <p
            className="text-[13px] mt-2 leading-relaxed tracking-tight line-clamp-2"
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
              return (
                <div
                  key={i}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
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
          className="absolute bottom-3 right-3 z-[2] opacity-0 group-hover:opacity-70 transition-opacity duration-200"
          style={{ color: "var(--pf-text-dim)" }}
        >
          <ArrowRightIcon />
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={wide ? "col-span-1 md:col-span-2" : ""}>
        {content}
      </Link>
    );
  }

  return (
    <div className={wide ? "col-span-1 md:col-span-2" : ""}>{content}</div>
  );
}

const cards: CardProps[] = [
  {
    type: "experience",
    title: "Nia Health",
    role: "Software / AI Engineer Intern",
    date: "Aug 2025 — Present",
    description:
      "Building async GPT parsing pipelines and a CGM data system in FastAPI + React. Cut report parsing latency by 70% and shipped end-to-end glucose review tooling deployed on Azure.",
    href: "/experience",
    wide: true,
    images: [
      {
        src: "/NiaHealth.png",
        alt: "Nia Health app dashboard",
        mode: "bottom-half",
      },
      {
        src: "/NiaHealth2.png",
        alt: "Nia Health kidney function chart",
        mode: "bottom-full",
      },
    ],
  },
  {
    type: "project",
    title: "Sepsis Mortality Prediction",
    description:
      "LSTM mortality prediction and early detection from MIMIC III time-series patient data.",
    href: "/projects",
  },
  {
    type: "hobby",
    title: "Photography",
    role: "NUS Campus",
    href: "/passions",
    images: [
      {
        src: "/passions/photography/photography-1.png",
        alt: "NUS sunset",
        mode: "cover",
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
        src: "/Buymed.png",
        alt: "Buymed delivery",
        mode: "bottom-side-left",
      },
      {
        src: "/Buymed2.png",
        alt: "Buymed platform",
        mode: "bottom-side-right",
      },
    ],
  },
  {
    type: "hobby",
    title: "Cooking",
    role: "Avocado Toast",
    href: "/passions",
    images: [
      {
        src: "/passions/cooking/cooking-1.png",
        alt: "Avocado toast with kiwi",
        mode: "cover",
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
        src: "/LockIn.png",
        alt: "Lock-In app preview",
        mode: "bottom-center",
      },
    ],
  },
  {
    type: "hobby",
    title: "Cooking",
    role: "Pesto Pasta",
    href: "/passions",
    images: [
      {
        src: "/passions/cooking/cooking-8.png",
        alt: "Avocado toast with kiwi",
        mode: "cover",
      },
    ],
  },
  {
    type: "experience",
    title: "NUS",
    role: "Teaching Assistant",
    date: "Aug 2024 — Apr 2025",
    description:
      "Led tutorials on responsible AI, data privacy law, and digital ethics for IS1108.",
    href: "/experience",
    wide: true,
  },
  {
    type: "project",
    title: "Personal Website",
    description: "My personal website built with Next.js and Tailwind CSS",
    href: "/projects",
    images: [
      {
        src: "/LockIn.png",
        alt: "Lock-In app preview",
        mode: "bottom-center",
      },
    ],
  },
];

export function BentoGrid() {
  return (
    <section className="px-5 md:px-[72px] mt-6">
      <div className="flex items-baseline justify-between mb-6 pb-[18px] border-b border-pf-border">
        <div>
          <div className="pf-eyebrow mb-2.5">Highlights</div>
          <h2 className="font-serif font-light text-[clamp(26px,3.5vw,40px)] tracking-[-0.025em] leading-[1.05]">
            What I&apos;ve been{" "}
            <span className="italic" style={{ color: "var(--pf-forest-ink)" }}>
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
          See full timeline <ArrowRightIcon />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <BentoCard key={i} {...card} />
        ))}
      </div>
    </section>
  );
}
