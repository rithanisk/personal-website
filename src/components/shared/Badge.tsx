"use client";

import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant,
  className,
}: {
  children: React.ReactNode;
  variant?: "accent" | "forest" | "amber" | "lavender" | "sky" | "teal";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-[3px] rounded-full text-[11px] font-[450] leading-tight whitespace-nowrap",
        "border border-pf-border",
        className
      )}
      style={
        variant
          ? {
              background: `linear-gradient(180deg, var(--pf-${variant === "accent" ? "rose" : variant}-soft), color-mix(in oklab, var(--pf-${variant === "accent" ? "rose" : variant}-soft) 70%, transparent))`,
              color: `var(--pf-${variant === "accent" ? "rose" : variant}-ink)`,
              borderColor: `color-mix(in oklab, var(--pf-${variant === "accent" ? "rose" : variant}) 25%, var(--pf-border))`,
            }
          : {
              background: "linear-gradient(180deg, var(--pf-surface) 0%, var(--pf-surface-2) 100%)",
              color: "var(--pf-text-muted)",
            }
      }
    >
      {children}
    </span>
  );
}
