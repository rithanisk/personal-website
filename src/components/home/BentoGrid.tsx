"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Allura } from "next/font/google";
import { ArrowRightIcon } from "@/components/shared/Icons";
import { LaptopMockup } from "@/components/shared/LaptopMockup";
import {
  AgentObservabilityFeature,
  BuymedPipelineVisual,
  RagFeature,
  SepsisFeature,
} from "@/components/home/ProjectTileFeatures";
import {
  ClosetStylistVisual,
  LockInFeature,
  MudraLaptopVisual,
  NiaHealthPhoneVisual,
  NusTaFeature,
} from "@/components/home/BentoTileVisuals";

const recognitionFont = Allura({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

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
    | "laptop"
    | "phone-video"
    | "cover";
  size?: "default" | "large";
  offsetY?: string;
  scale?: number;
  offsetX?: string;
  objectPosition?: string;
  align?: "center" | "right";
  height?: string;
};

type CardProps = {
  type: "experience" | "project" | "hobby";
  title: string;
  variant?:
    | "niahealth-feature"
    | "mudra-feature"
    | "buymed-feature"
    | "closet-feature"
    | "observability-feature"
    | "sepsis-feature"
    | "rag-feature"
    | "lockin-feature"
    | "nus-feature";
  companyNote?: string;
  role?: string;
  date?: string;
  description?: string;
  href?: string;
  wide?: boolean;
  images?: CardImage[];
  descriptionMaxWidth?: string;
};

function CardTitle({
  type,
  title,
  companyNote,
  role,
  date,
  cover,
}: Pick<CardProps, "type" | "title" | "companyNote" | "role" | "date"> & { cover?: boolean }) {
  const textColor = cover ? "#fff" : "var(--pf-text)";
  const mutedColor = cover ? "rgba(255,255,255,0.75)" : "var(--pf-text-muted)";
  const dimColor = cover ? "rgba(255,255,255,0.55)" : "var(--pf-text-dim)";

  if (type === "experience") {
    return (
      <div>
        <div>
          {companyNote ? (
            <span
              className="block whitespace-nowrap font-serif text-lg leading-tight tracking-[-0.03em] md:text-2xl"
              style={{ color: textColor }}
            >
              {title} ({companyNote})
            </span>
          ) : (
            <span
              className="font-serif text-lg leading-tight tracking-[-0.02em] md:text-[21px]"
              style={{ color: textColor }}
            >
              {title}
            </span>
          )}
        </div>
        {(role || date) && (
          <div className="mt-1 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            {role && (
              <span
                className="font-sans text-xs font-medium leading-tight md:text-[13px]"
                style={{ color: mutedColor }}
              >
                {role}
              </span>
            )}
            {role && date && (
              <span className="text-xs" style={{ color: dimColor }}>
                ·
              </span>
            )}
            {date && (
              <span className="font-sans text-xs font-normal leading-tight" style={{ color: dimColor }}>
                {date}
              </span>
            )}
          </div>
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

function NiaHealthFeature() {
  const metrics = [
    { value: "70%", label: "faster report processing" },
    { value: "9×", label: "operations capacity" },
    { value: "8K+", label: "active users" },
  ];
  const stack = ["Python", "FastAPI", "React", "AI agents", "Postgres"];

  return (
    <div className="pf-tile-nia contents">
      <div
        className="absolute bottom-0 left-0 z-0 h-[170px] w-[250px]"
        style={{
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(231, 211, 179, 0.46), transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-[100px] right-12 z-[1] h-[350px] w-[175px] rotate-[7deg] rounded-[42px]"
        style={{ background: "rgba(214, 170, 103, 0.26)" }}
      />

      <div className="absolute left-4 right-4 top-4 z-[3] md:left-5 md:right-5 md:top-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span
            className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em]"
            style={{ color: "var(--pf-rose)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--pf-rose)" }} />
            experience
          </span>
          <span
            className="font-mono text-[9px] tracking-[0.14em]"
            style={{ color: "var(--pf-text-dim)" }}
          >
            01
          </span>
        </div>

        <div className="flex h-8 flex-nowrap items-center gap-2.5">
          <Image
            src="/media-v1/niahealth-official-icon.png"
            alt="NiaHealth logo"
            width={32}
            height={32}
            className="block h-6 w-6 shrink-0 rounded-[7px] object-cover"
          />
          <span
            role="img"
            aria-label="NiaHealth"
            className="block h-[21px] w-[100px] shrink-0"
            style={{
              backgroundColor: "var(--pf-text)",
              WebkitMaskImage: "url('/media-v1/niahealth-official-logo.png')",
              maskImage: "url('/media-v1/niahealth-official-logo.png')",
              WebkitMaskPosition: "left center",
              maskPosition: "left center",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
          <span
            className="hidden items-center gap-1.5 rounded-full px-2.5 py-1.5 font-mono text-[8px] uppercase leading-none tracking-[0.08em] sm:inline-flex"
            style={{
              color: "#8a642d",
              background: "color-mix(in oklab, #d5aa67 22%, var(--pf-surface))",
            }}
          >
            <span className="h-1 w-1 rounded-full" style={{ background: "#b9873d" }} />
            Health Tech · Series A
          </span>
        </div>

        <div className="mt-1 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span className="font-sans text-xs font-medium leading-tight md:text-[13px]" style={{ color: "var(--pf-text-muted)" }}>
            AI/Software Engineer Intern
          </span>
          <span className="text-xs" style={{ color: "var(--pf-text-dim)" }}>·</span>
          <span className="font-sans text-xs font-normal leading-tight" style={{ color: "var(--pf-text-dim)" }}>
            Aug 2025 — Jul 2026
          </span>
        </div>

        <p
          className="mt-3.5 max-w-[54%] text-[13px] leading-relaxed tracking-tight line-clamp-3"
          style={{ color: "var(--pf-text-muted)" }}
        >
          Built AI and full-stack health products used by thousands, from medical-report processing to nutrition analysis.
        </p>

        <div className="mt-4 grid max-w-[54%] grid-cols-3 gap-2">
          {metrics.map((metric) => (
            <div key={metric.value} className="text-center">
              <div className="font-serif text-[23px] font-semibold leading-none md:text-[27px]" style={{ color: "#bc8432" }}>
                {metric.value}
              </div>
              <div className="mt-1 text-[9px] leading-[1.2]" style={{ color: "var(--pf-text-muted)" }}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 max-w-[54%] border-t pt-3" style={{ borderColor: "var(--pf-border)" }}>
          <div className="flex flex-wrap gap-1.5">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-full px-2 py-1 text-[9px] leading-none"
                style={{
                  color: "var(--pf-text-muted)",
                  background: "color-mix(in oklab, var(--pf-surface) 72%, #eadfce)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <NiaHealthPhoneVisual />
    </div>
  );
}

function MudraFeature() {
  const stack = ["MediaPipe", "Python", "Flask", "ElevenLabs TTS"];

  return (
    <div className="pf-tile-mudra contents">
      <MudraLaptopVisual scriptClassName={recognitionFont.className} />

      <div className="absolute left-4 right-4 top-4 z-[3] md:left-5 md:right-5 md:top-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span
            className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em]"
            style={{ color: "var(--tile-ink)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--tile-ink)" }} />
            project
          </span>
          <span
            className="font-mono text-[9px] tracking-[0.14em]"
            style={{ color: "var(--pf-text-dim)" }}
          >
            02
          </span>
        </div>

        <h3 className="-mt-0.5 flex items-baseline gap-2 whitespace-nowrap font-serif text-[26px] leading-none tracking-[-0.035em]">
          <span>Mudra</span>
          <span
            className={`${recognitionFont.className} text-[34px] font-normal tracking-normal`}
            style={{ color: "var(--tile-ink)" }}
          >
            Recognition
          </span>
        </h3>

        <p className="mt-3 text-[13px] leading-relaxed tracking-tight" style={{ color: "var(--pf-text-muted)" }}>
          Live-camera practice with real-time Bharatanatyam hand-gesture checks and spoken feedback.
        </p>

        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {stack.map((item) => (
            <span
              key={item}
              className="whitespace-nowrap rounded-full border px-2 py-1 text-[9px] leading-none"
              style={{
                color: "var(--tile-ink)",
                borderColor: "color-mix(in oklab, var(--tile-ink) 28%, transparent)",
                background: "color-mix(in oklab, var(--tile-soft) 34%, var(--pf-surface))",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClosetAiFeature() {
  const accent = "var(--tile-ink)";
  const stack = ["Next.js", "FastAPI", "Supabase", "LLM styling", "Image segmentation"];

  return (
    <div className="pf-tile-closet contents">
      <ClosetStylistVisual />

      <div className="absolute left-4 right-4 top-4 z-[3] md:left-5 md:right-5 md:top-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span
            className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em]"
            style={{ color: "var(--pf-forest-ink)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--pf-forest-ink)" }} />
            project
          </span>
          <span
            className="font-mono text-[9px] tracking-[0.14em]"
            style={{ color: "var(--pf-text-dim)" }}
          >
            06
          </span>
        </div>

        <h3 className="-mt-0.5 flex items-baseline gap-1.5 whitespace-nowrap font-serif text-[26px] leading-none tracking-[-0.035em]">
          <span>Closet</span>
          <span className="italic" style={{ color: accent }}>
            AI
          </span>
        </h3>

        <p className="mt-3 text-[13px] leading-relaxed tracking-tight" style={{ color: "var(--pf-text-muted)" }}>
          Upload photos of your clothes and get outfits styled and ranked from your own wardrobe, then try them on a
          photoreal avatar.
        </p>

        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {stack.map((item) => (
            <span
              key={item}
              className="whitespace-nowrap rounded-full border px-2 py-1 text-[9px] leading-none"
              style={{
                color: "var(--tile-ink)",
                borderColor: "color-mix(in oklab, var(--tile-ink) 28%, transparent)",
                background: "color-mix(in oklab, var(--tile-soft) 34%, var(--pf-surface))",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function BuymedFeature() {
  const metrics = [
    { value: "10+", label: "features shipped" },
    { value: "Go", label: "pricing pipeline" },
    { value: "RAG", label: "company chatbot" },
  ];
  const stack = ["Go", "Concurrency", "RAG", "LLMs", "REST APIs"];

  return (
    <div className="pf-tile-buymed contents">
      <div
        className="absolute -bottom-[92px] right-5 z-[1] h-[300px] w-[230px] rotate-[6deg] rounded-[42px]"
        style={{ background: "rgba(60, 140, 80, 0.17)" }}
      />
      <BuymedPipelineVisual />

      <div className="absolute left-4 right-4 top-4 z-[3] md:left-5 md:right-5 md:top-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span
            className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em]"
            style={{ color: "var(--pf-rose)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--pf-rose)" }} />
            experience
          </span>
          <span
            className="font-mono text-[9px] tracking-[0.14em]"
            style={{ color: "var(--pf-text-dim)" }}
          >
            03
          </span>
        </div>

        <div className="flex h-8 flex-nowrap items-center gap-2.5">
          <Image
            src="/media-v1/buymed-icon-green.png"
            alt="Buymed logo mark"
            width={32}
            height={32}
            className="block h-6 w-6 shrink-0 rounded-[7px] object-cover"
          />
          <span
            className="font-sans text-[22px] font-semibold leading-none tracking-[-0.04em]"
            style={{ color: "var(--tile-ink)" }}
            aria-label="Buymed"
          >
            buymed
          </span>
          <span
            className="hidden items-center gap-1.5 rounded-full px-2.5 py-1.5 font-mono text-[8px] uppercase leading-none tracking-[0.08em] sm:inline-flex"
            style={{
              color: "var(--tile-ink)",
              background: "color-mix(in oklab, var(--tile-soft) 50%, var(--pf-surface))",
            }}
          >
            <span className="h-1 w-1 rounded-full" style={{ background: "var(--tile-ink)" }} />
            B2B E-commerce · Series B
          </span>
        </div>

        <div className="mt-1 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span className="font-sans text-xs font-medium leading-tight md:text-[13px]" style={{ color: "var(--pf-text-muted)" }}>
            Software Engineer Intern
          </span>
          <span className="text-xs" style={{ color: "var(--pf-text-dim)" }}>·</span>
          <span className="font-sans text-xs font-normal leading-tight" style={{ color: "var(--pf-text-dim)" }}>
            May 2024 — Aug 2024 · Vietnam
          </span>
        </div>

        <p className="mt-3.5 max-w-[56%] text-[13px] leading-relaxed tracking-tight line-clamp-3" style={{ color: "var(--pf-text-muted)" }}>
          Built backend and AI features for a pharmaceutical supply platform, from pricing infrastructure to an internal knowledge assistant.
        </p>

        <div className="mt-4 grid max-w-[56%] grid-cols-3 gap-2">
          {metrics.map((metric) => (
            <div key={metric.value}>
              <div className="font-serif text-xl leading-none md:text-2xl" style={{ color: "var(--tile-ink)" }}>
                {metric.value}
              </div>
              <div className="mt-1 text-[9px] leading-[1.2]" style={{ color: "var(--pf-text-muted)" }}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 max-w-[56%] border-t pt-3" style={{ borderColor: "var(--pf-border)" }}>
          <div className="flex flex-wrap gap-1.5">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-full px-2 py-1 text-[9px] leading-none"
                style={{
                  color: "var(--pf-text-muted)",
                  background: "color-mix(in oklab, var(--pf-surface) 72%, var(--tile-soft))",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BentoCard({
  type,
  title,
  variant,
  companyNote,
  role,
  date,
  description,
  href,
  wide,
  images,
  descriptionMaxWidth,
  index,
}: CardProps & { index: number }) {
  const isNiaHealthFeature = variant === "niahealth-feature";
  const isMudraFeature = variant === "mudra-feature";
  const isBuymedFeature = variant === "buymed-feature";
  const isClosetFeature = variant === "closet-feature";
  const isObservabilityFeature = variant === "observability-feature";
  const isSepsisFeature = variant === "sepsis-feature";
  const isRagFeature = variant === "rag-feature";
  const isLockInFeature = variant === "lockin-feature";
  const isNusFeature = variant === "nus-feature";
  const isCustomFeature =
    isNiaHealthFeature ||
    isMudraFeature ||
    isBuymedFeature ||
    isClosetFeature ||
    isObservabilityFeature ||
    isSepsisFeature ||
    isRagFeature ||
    isLockInFeature ||
    isNusFeature;
  const hasCover = images?.some((img) => img.mode === "cover");
  const typeColor = type === "experience" ? "var(--pf-rose)" : "var(--pf-forest-ink)";

  const content = (
    <motion.div
      className="group relative h-full min-h-[392px] overflow-hidden rounded-[18px] md:min-h-0"
      style={{
        background: "var(--pf-bg)",
        border: "1px solid var(--pf-border)",
        boxShadow: "var(--pf-shadow)",
      }}
      whileHover={{ y: -5, boxShadow: "var(--pf-shadow-lg)" }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
    >
      {isNiaHealthFeature && <NiaHealthFeature />}
      {isMudraFeature && <MudraFeature />}
      {isBuymedFeature && <BuymedFeature />}
      {isClosetFeature && <ClosetAiFeature />}
      {isObservabilityFeature && <AgentObservabilityFeature />}
      {isSepsisFeature && <SepsisFeature />}
      {isRagFeature && <RagFeature />}
      {isLockInFeature && <LockInFeature />}
      {isNusFeature && <NusTaFeature />}

      {/* Gradient overlay for readability on cover images */}
      {!isCustomFeature && hasCover && (
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.08) 58%, rgba(0,0,0,0.2) 100%)",
          }}
        />
      )}

      {/* Top-left title */}
      {!isCustomFeature && <div className="absolute top-4 left-4 right-4 z-[2] md:top-5 md:left-5 md:right-5">
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
          companyNote={companyNote}
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
              maxWidth: descriptionMaxWidth,
            }}
          >
            {description}
          </p>
        )}
      </div>}

      {/* Images */}
      {!isCustomFeature && images && images.length > 0 && (
        <div className="absolute inset-0 z-[1]">
          {images.map((img, i) => {
            if (img.mode === "phone-video") {
              return (
                <div
                  key={i}
                  className="absolute bottom-0 left-1/2 overflow-hidden"
                  style={{
                    height: img.height ?? "60%",
                    aspectRatio: "1180 / 1917",
                    transform: `translateX(calc(-50% + ${img.offsetX ?? "0px"})) scale(${img.scale ?? 1})`,
                    transformOrigin: "bottom center",
                  }}
                >
                  <div
                    className="absolute left-0 top-0 w-full overflow-hidden rounded-[26px] border-[5px] border-[#171717] bg-[#171717]"
                    style={{
                      height: "133.333%",
                      boxShadow: "0 10px 28px rgba(0,0,0,0.2)",
                    }}
                  >
                    <video
                      src={img.src}
                      aria-label={img.alt}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              );
            }
            if (img.mode === "bottom-half") {
              return (
                <div
                  key={i}
                  className={`absolute bottom-0 ${
                    img.align === "center" ? "left-1/2 -translate-x-1/2" : "left-4"
                  }`}
                  style={{ height: img.height ?? "65%", width: "auto" }}
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
                      : "absolute bottom-0 left-1/2"
                  }
                  style={
                    isLarge
                      ? {
                          height: "100%",
                          transform: `translateY(${offsetY}) scale(${scale})`,
                          transformOrigin: "bottom center",
                        }
                      : {
                          height: img.height ?? "65%",
                          width: "auto",
                          transform: `translateX(calc(-50% + ${img.offsetX ?? "0px"})) scale(${img.scale ?? 1})`,
                          transformOrigin: "bottom center",
                        }
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
                  style={{ width: "46%", height: img.height ?? "55%" }}
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
                  style={{ width: "46%", height: img.height ?? "55%" }}
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
                  style={img.height ? { height: img.height } : undefined}
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
            if (img.mode === "laptop") {
              return (
                <div
                  key={i}
                  className={`absolute inset-x-3 bottom-2 z-[1] flex h-[58%] items-end sm:inset-x-5 ${
                    img.align === "right" ? "justify-end" : "justify-center"
                  }`}
                  style={{
                    transform: `translateY(${img.offsetY ?? "0"}) scale(${img.scale ?? 1})`,
                    transformOrigin: img.align === "right" ? "bottom right" : "bottom center",
                  }}
                >
                  <LaptopMockup
                    src={img.src}
                    alt={img.alt}
                    objectPosition={img.objectPosition}
                    className={
                      img.align === "right"
                        ? "w-[62%] max-w-[400px]"
                        : "w-[78%] max-w-[500px]"
                    }
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
    title: "NiaHealth",
    variant: "niahealth-feature",
    companyNote: "Health Tech Startup, Series A",
    role: "AI/Software Engineer Intern",
    date: "Aug 2025 — Jul 2026",
    description:
      "Built AI and full-stack health products used by thousands, cutting report processing by 70% and scaling operations 9×.",
    href: "/experience",
    wide: true,
  },
  {
    type: "project",
    title: "Mudra Recognition",
    variant: "mudra-feature",
    description:
      "Live-camera practice tool with 88.7% accuracy across 28 Bharatanatyam mudras, tested with 20+ students",
    href: "/projects",
  },
  {
    type: "experience",
    title: "Buymed",
    variant: "buymed-feature",
    companyNote: "B2B E-commerce Startup, Series B",
    role: "Software Engineer Intern",
    date: "May 2024 — Aug 2024",
    description:
      "Shipped 10+ production features, a concurrent Go pricing pipeline, and a RAG-powered company chatbot.",
    href: "/experience",
    wide: true,
  },
  {
    type: "project",
    title: "Lock-In",
    variant: "lockin-feature",
    description:
      "Financial-accountability app co-built through two MVPs and tested with 45+ university students",
    href: "/projects",
  },
  {
    type: "experience",
    title: "National University of Singapore",
    variant: "nus-feature",
    role: "Teaching Assistant, Digital Ethics and Data Privacy",
    date: "Aug 2024 — Present",
    description:
      "Led tutorials on responsible AI, data privacy law, and digital ethics for IS1108.",
    href: "/experience",
    wide: true,
  },
  {
    type: "project",
    title: "Closet AI",
    variant: "closet-feature",
    description: "AI-ranked outfits from your own wardrobe",
    href: "/projects",
  },
  {
    type: "project",
    title: "Agent Observability Dashboard",
    variant: "observability-feature",
    description:
      "Real-time tracing and evaluation for multi-agent tool calls, latency, token usage, failures, and regressions",
    href: "/projects",
  },
  {
    type: "project",
    title: "Sepsis Mortality Prediction",
    variant: "sepsis-feature",
    description:
      "Early sepsis detection and mortality prediction from longitudinal patient records using an LSTM pipeline",
    href: "/projects",
  },
  {
    type: "project",
    title: "RAG for Domain-Specific QA",
    variant: "rag-feature",
    description:
      "Question answering over academic PDFs, DOCX, and Markdown using semantic retrieval and grounded local generation",
    href: "/projects",
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
  "md:col-span-3 md:row-span-3 xl:col-span-12",
  "md:col-span-3 md:row-span-3 xl:col-span-9",
  "md:col-span-3 md:row-span-3 xl:col-span-11",
  "md:col-span-3 md:row-span-3 xl:col-span-8",
  "md:col-span-3 md:row-span-3 xl:col-span-14",
  "md:col-span-3 md:row-span-3 xl:col-span-10",
  "md:col-span-3 md:row-span-3 xl:col-span-12",
  "md:col-span-3 md:row-span-3 xl:col-span-10",
  "md:col-span-3 md:row-span-3 xl:col-span-10",
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
          className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:auto-rows-[118px] md:grid-cols-6 xl:grid-cols-[repeat(32,minmax(0,1fr))]"
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
