"use client";

import { countries } from "@/content/countries";

export function CountriesStrip() {
  return (
    <div
      className="flex items-center gap-8 flex-wrap p-[22px_26px] rounded-2xl border border-pf-border"
      style={{
        background: "linear-gradient(135deg, var(--pf-sky-soft), color-mix(in oklab, var(--pf-sky-soft) 40%, var(--pf-surface)))",
      }}
    >
      <div>
        <div
          className="font-mono text-[9.5px] tracking-[0.22em] uppercase mb-1.5"
          style={{ color: "var(--pf-sky-ink)" }}
        >
          On the map
        </div>
        <div className="font-serif text-2xl font-light tracking-[-0.02em]" style={{ color: "var(--pf-text)" }}>
          Five countries. One notebook.
        </div>
      </div>
      <div className="flex-1" />
      <div className="flex gap-[18px] flex-wrap">
        {countries.map((co) => (
          <div key={co.code} className="flex items-center gap-2">
            <div
              className="w-[30px] h-[20px] rounded-[3px] flex items-center justify-center font-mono text-[9px] font-medium tracking-[0.05em]"
              style={{
                background: "var(--pf-surface)",
                border: "1px solid var(--pf-border)",
                color: "var(--pf-sky-ink)",
              }}
            >
              {co.code}
            </div>
            <div>
              <div className="text-xs font-medium" style={{ color: "var(--pf-text)" }}>{co.name}</div>
              <div className="text-[10.5px]" style={{ color: "var(--pf-text-dim)" }}>{co.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
