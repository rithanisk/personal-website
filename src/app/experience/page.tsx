"use client";

import { experiences } from "@/content/experiences";
import { Badge } from "@/components/shared/Badge";
import { motion } from "framer-motion";
import type { Experience } from "@/types/content";

function renderBullet(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold" style={{ color: "var(--pf-text)" }}>
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

const companyInfo: Record<string, { description: string; images: string[] }> = {
  nia: {
    description: "NiaHealth is a digital health startup building AI-powered tools for chronic disease management and clinician workflows.",
    images: ["/NiaHealth.png", "/NiaHealth2.png", "/toronto.png"],
  },
  buymed: {
    description: "Buymed is Vietnam's leading B2B pharmaceutical e-commerce platform, connecting pharmacies with drug manufacturers across Southeast Asia.",
    images: ["/Buymed.png", "/Buymed2.png", "/vietnam.png"],
  },
  "nus-ta": {
    description: "The National University of Singapore is Asia's top-ranked university. IS1108 explores ethical challenges in data collection, privacy, and algorithmic decision-making.",
    images: ["/singapore1.png", "/passions/photography/photography-1.png", "/passions/photography/photography-2.png"],
  },
};

function EntryContent({ exp }: { exp: Experience }) {
  return (
    <div>
      <div
        className="font-mono text-[11px] tracking-[0.15em] uppercase mb-2"
        style={{ color: exp.current ? "var(--pf-rose)" : "var(--pf-text-dim)" }}
      >
        {exp.dates} {exp.current && "· Current"}
      </div>
      <h3
        className="font-serif font-normal text-[22px] tracking-[-0.02em] leading-[1.15] mb-1.5"
        style={{ color: "var(--pf-text)" }}
      >
        {exp.title}
      </h3>
      <div
        className="flex items-center gap-2.5 flex-wrap text-[13px] mb-4"
        style={{ color: "var(--pf-text-muted)" }}
      >
        <span className="font-medium" style={{ color: "var(--pf-rose)" }}>{exp.company}</span>
        {exp.program && (
          <>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{exp.program}</span>
          </>
        )}
        <span style={{ opacity: 0.4 }}>·</span>
        <span>{exp.location}</span>
      </div>

      {exp.stack.length > 0 && (
        <div className="flex flex-wrap gap-[5px] mb-4">
          {exp.stack.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      )}

      <ul className="flex flex-col gap-2.5 m-0 p-0 list-none">
        {exp.bullets.map((b, i) => (
          <li
            key={i}
            className="relative pl-[18px] text-[13.5px] leading-[1.7]"
            style={{ color: "var(--pf-text-muted)" }}
          >
            <span
              className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--pf-rose)", opacity: 0.5 }}
            />
            {renderBullet(b)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompanySide({ exp }: { exp: Experience }) {
  const info = companyInfo[exp.id];

  if (!info) {
    return (
      <div className="flex items-center justify-center h-full">
        <div
          className="rounded-xl p-5 text-center"
          style={{ color: "var(--pf-text-dim)" }}
        >
          <div
            className="text-[40px] font-serif font-light mb-2"
            style={{ color: "var(--pf-rose)", opacity: 0.3 }}
          >
            {exp.company.charAt(0)}
          </div>
          <p className="text-[13px]">{exp.company}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 h-full justify-center w-full">
      {/* Collage grid */}
      <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-[320px]">
        {/* Large image spanning left column */}
        <div
          className="row-span-2 rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--pf-border)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={info.images[0]}
            alt={exp.company}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Top right */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--pf-border)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={info.images[1] || info.images[0]}
            alt={exp.company}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Bottom right */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--pf-border)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={info.images[2] || info.images[0]}
            alt={exp.company}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <p
        className="text-[13px] leading-relaxed mt-1"
        style={{ color: "var(--pf-text-dim)" }}
      >
        {info.description}
      </p>
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <main className="px-5 md:px-[72px] pt-[130px] pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pf-eyebrow mb-5">Experience</div>
        <h1 className="font-serif font-light text-[clamp(36px,5vw,64px)] tracking-[-0.035em] leading-[0.95]">
          A path through{" "}
          <span className="italic" style={{ color: "var(--pf-accent)" }}>five</span>{" "}
          countries.
        </h1>
        <p
          className="font-serif text-xl leading-[1.45] font-light mt-6 max-w-[580px]"
          style={{ color: "var(--pf-text-muted)" }}
        >
          Four internships, one TA role, and a lot of PRs. Here&apos;s what I&apos;ve been up to.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative mt-16">
        {/* Straight center line — desktop */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] hidden md:block"
          style={{ background: "color-mix(in oklab, var(--pf-rose) 40%, transparent)" }}
        />

        {/* Straight line — mobile */}
        <div
          className="absolute left-[7px] top-0 bottom-0 w-[2px] md:hidden"
          style={{ background: "color-mix(in oklab, var(--pf-rose) 40%, transparent)" }}
        />

        {/* Entries */}
        <div className="flex flex-col gap-20 relative z-10">
          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={exp.id}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
              >
                {/* Desktop dot */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-2 w-[14px] h-[14px] rounded-full border-[3px] z-20 hidden md:block"
                  style={{
                    borderColor: "var(--pf-rose)",
                    background: exp.current ? "var(--pf-rose)" : "var(--pf-surface)",
                  }}
                />
                {exp.current && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-2 w-[14px] h-[14px] rounded-full animate-ping z-10 hidden md:block"
                    style={{ background: "var(--pf-rose)", opacity: 0.25 }}
                  />
                )}

                {/* Mobile dot */}
                <div
                  className="absolute left-[3px] top-1 w-[10px] h-[10px] rounded-full border-2 md:hidden z-10"
                  style={{
                    borderColor: "var(--pf-rose)",
                    background: exp.current ? "var(--pf-rose)" : "var(--pf-surface)",
                  }}
                />

                {/* Desktop: two-column layout */}
                <div className="hidden md:grid md:grid-cols-[1fr_60px_1fr] items-start">
                  {isLeft ? (
                    <>
                      <div className="pr-8">
                        <EntryContent exp={exp} />
                      </div>
                      <div />
                      <div className="pl-8">
                        <CompanySide exp={exp} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="pr-8">
                        <CompanySide exp={exp} />
                      </div>
                      <div />
                      <div className="pl-8">
                        <EntryContent exp={exp} />
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile: single column */}
                <div className="pl-8 md:hidden">
                  <EntryContent exp={exp} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
