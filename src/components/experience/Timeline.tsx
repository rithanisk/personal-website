"use client";

import { Badge } from "@/components/shared/Badge";
import type { Experience } from "@/types/content";

function TimelineNode({ item, active }: { item: Experience; active: boolean }) {
  return (
    <div className="relative" style={{ paddingLeft: 48, paddingBottom: 52 }}>
      {/* Dot marker */}
      <div
        className="absolute"
        style={{
          left: 12,
          top: 4,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "var(--pf-bg)",
          border: `2px solid ${active ? "var(--pf-accent)" : "var(--pf-border-strong)"}`,
          boxShadow: active ? "0 0 0 4px color-mix(in oklab, var(--pf-accent) 20%, transparent)" : "none",
          zIndex: 2,
        }}
      >
        {active && (
          <>
            <div className="absolute rounded-full" style={{ inset: -10, border: "2px solid var(--pf-accent)", opacity: 0.35 }} />
            <div className="absolute rounded-full" style={{ inset: -18, border: "1.5px solid var(--pf-accent)", opacity: 0.18 }} />
          </>
        )}
      </div>

      {/* Dates */}
      <div
        className="font-mono text-[11px] tracking-[0.15em] uppercase mb-2"
        style={{ color: active ? "var(--pf-accent)" : "var(--pf-text-dim)" }}
      >
        {item.dates} {active && "· Current"}
      </div>

      {/* Title */}
      <h3 className="font-serif font-normal text-2xl tracking-[-0.02em] leading-[1.15] mb-1.5" style={{ color: "var(--pf-text)" }}>
        {item.title}
      </h3>

      {/* Meta */}
      <div className="flex items-center gap-2.5 flex-wrap mb-4 text-[13px]" style={{ color: "var(--pf-text-muted)" }}>
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

      {/* Stack */}
      {item.stack.length > 0 && (
        <div className="flex flex-wrap gap-[5px] mb-4">
          {item.stack.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      )}

      {/* Bullets */}
      <ul className="flex flex-col gap-2.5 m-0 p-0 list-none">
        {item.bullets.map((b, i) => (
          <li
            key={i}
            className="relative pl-[18px] text-[13.5px] leading-[1.65]"
            style={{ color: "var(--pf-text-muted)" }}
          >
            <span
              className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--pf-accent)", opacity: 0.5 }}
            />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Timeline({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="relative">
      {/* The pink line */}
      <div
        className="absolute z-[1]"
        style={{
          left: 19,
          top: 8,
          bottom: 8,
          width: 1.5,
          background: "linear-gradient(180deg, var(--pf-accent) 0%, color-mix(in oklab, var(--pf-accent) 40%, transparent) 70%, transparent 100%)",
        }}
      />
      {experiences.map((it, i) => (
        <TimelineNode key={it.id} item={it} active={i === 0} />
      ))}
      {/* Terminus dot */}
      <div
        className="absolute rounded-full"
        style={{ left: 15, bottom: -4, width: 8, height: 8, background: "var(--pf-border-strong)" }}
      />
    </div>
  );
}
