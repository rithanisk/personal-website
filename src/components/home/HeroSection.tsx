"use client";

import Link from "next/link";
import { SiGmail, SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { HeroMedia } from "./HeroMedia";
import { HeroBlobs } from "./HeroBlobs";
import { profile } from "@/content/profile";
import { ArrowRightIcon, MapPinIcon } from "@/components/shared/Icons";

function Socials() {
  const socials = [
    { icon: SiGmail, href: profile.socials[0].href, color: "#EA4335" },
    { icon: FaLinkedin, href: profile.socials[1].href, color: "#0A66C2" },
    { icon: SiGithub, href: profile.socials[2].href, color: "var(--pf-text)" },
  ];

  return (
    <div className="flex gap-2">
      {socials.map((s, i) => (
        <a
          key={i}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[34px] h-[34px] rounded-lg border border-pf-border flex items-center justify-center transition-all duration-200 hover:opacity-80 hover:scale-105"
          style={{ background: "var(--pf-surface)" }}
        >
          <s.icon size={16} color={s.color} />
        </a>
      ))}
    </div>
  );
}

function HeroStatus() {
  return (
    <div className="flex flex-col gap-5">
      {/* Status line */}
      <div className="inline-flex items-center gap-2.5 self-start">
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--pf-text-muted)" }} />
        <span className="text-[16px] font-mono tracking-[0.01em] leading-relaxed tracking-tight" style={{ color: "var(--pf-text-muted)" }}>
          Currently building AI agents at{" "}
          <span className="font-medium" style={{ color: "var(--pf-text)" }}>Nia Health</span>
        </span>
      </div>
      {/* Page links */}
      <div className="flex items-center gap-5">
        <Link
          href="/experience"
          className="inline-flex items-center gap-2 text-[16px] font-medium border-b border-pf-border-strong pb-[3px]"
          style={{ color: "var(--pf-text)" }}
        >
          Check out my{" "}
          <span className="italic font-serif font-normal" style={{ color: "var(--pf-forest-ink)" }}>experience</span>
          <ArrowRightIcon />
        </Link>
        <span className="w-1 h-1 rounded-full" style={{ background: "var(--pf-text-dim)" }} />
        <Link
          href="/my-story"
          className="inline-flex items-center gap-2 text-[16px] font-medium border-b border-pf-border-strong pb-[3px]"
          style={{ color: "var(--pf-text)" }}
        >
          Read my{" "}
          <span className="italic font-serif font-normal" style={{ color: "var(--pf-rose-ink)" }}>story</span>
          <ArrowRightIcon />
        </Link>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative px-5 md:px-[72px] pt-[140px] pb-[60px]">
      <HeroBlobs />
      <div className="relative z-[1] grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-center">
        {/* Left column */}
        <div>
          <div className="pf-eyebrow mb-[26px]">Portfolio · 2026</div>
          <h1
            className="font-serif font-light tracking-[-0.03em] leading-[1.05] mb-0"
            style={{ fontSize: "clamp(34px, 5vw, 64px)" }}
          >
            I&apos;m{" "}
            <span className="italic font-light" style={{ color: "var(--pf-rose)" }}>Rithani</span>
            , and I build{" "}
            <span className="italic font-light" style={{ color: "var(--pf-forest-ink)" }}>
              intelligent software
            </span>{" "}
            with real, measurable impact.
          </h1>
          <p className="text-[18px] leading-relaxed tracking-tight mt-7 max-w-[620px] line-clamp-3 md:line-clamp-4" style={{ color: "var(--pf-text-muted)" }}>
            {profile.about}
          </p>
          <div className="mt-8">
            <HeroStatus />
          </div>
          <div className="flex items-center gap-5 mt-7">
            <Socials />
            <div className="w-px h-5" style={{ background: "var(--pf-border-strong)" }} />
            <span className="inline-flex items-center gap-2 text-[14px] font-mono tracking-[0.05em]" style={{ color: "var(--pf-text-dim)" }}>
              <MapPinIcon /> Toronto · Singapore
            </span>
          </div>
        </div>

        {/* Right column — media */}
        <div className="relative z-[1]">
          <HeroMedia />
        </div>
      </div>
    </section>
  );
}
