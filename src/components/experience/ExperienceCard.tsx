"use client";

import { Badge } from "@/components/shared/Badge";
import type { Experience } from "@/types/content";

function renderBullet(text: string) {
  // Split on **..** to bold metrics
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

export function ExperienceCard({ experience: item, active }: { experience: Experience; active: boolean }) {
  return (
    <div
      className="relative rounded-2xl p-7 h-full"
      style={{
        background: "var(--pf-surface)",
        border: `1px solid ${active ? "color-mix(in oklab, var(--pf-accent) 40%, var(--pf-border))" : "var(--pf-border)"}`,
        boxShadow: active
          ? "0 4px 24px color-mix(in oklab, var(--pf-accent) 8%, transparent)"
          : "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div className="mb-5">
        <div
          className="font-mono text-[11px] tracking-[0.15em] uppercase mb-2"
          style={{ color: active ? "var(--pf-accent)" : "var(--pf-text-dim)" }}
        >
          {item.dates} {active && "· Current"}
        </div>
        <h3
          className="font-serif font-normal text-2xl tracking-[-0.02em] leading-[1.15] mb-1.5"
          style={{ color: "var(--pf-text)" }}
        >
          {item.title}
        </h3>
        <div className="flex items-center gap-2.5 flex-wrap text-[13px]" style={{ color: "var(--pf-text-muted)" }}>
          <span className="font-medium" style={{ color: "var(--pf-accent)" }}>{item.company}</span>
          {item.program && (
            <>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{item.program}</span>
            </>
          )}
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{item.location}</span>
        </div>
      </div>

      {/* Stack */}
      {item.stack.length > 0 && (
        <div className="flex flex-wrap gap-[5px] mb-5">
          {item.stack.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      )}

      {/* Bullets */}
      <ul className="flex flex-col gap-3 m-0 p-0 list-none">
        {item.bullets.map((b, i) => (
          <li
            key={i}
            className="relative pl-[18px] text-[13.5px] leading-[1.7]"
            style={{ color: "var(--pf-text-muted)" }}
          >
            <span
              className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--pf-accent)", opacity: 0.5 }}
            />
            {renderBullet(b)}
          </li>
        ))}
      </ul>
    </div>
  );
}
