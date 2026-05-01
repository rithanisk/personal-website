"use client";

import { useTheme } from "@/lib/theme";
import { SunIcon, MoonIcon } from "@/components/shared/Icons";

export function MobileTopBar() {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <header
      className="sticky top-0 z-50 flex md:hidden items-center justify-between px-[18px] py-[14px]"
      style={{
        background: dark ? "rgba(15,15,15,0.72)" : "rgba(250,248,245,0.72)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
        borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(20,18,15,0.06)"}`,
      }}
    >
      <div
        className="flex items-center gap-2 font-serif text-base"
        style={{ color: "var(--pf-text)" }}
      >
        <span
          className="w-[7px] h-[7px] rounded-full"
          style={{
            background: "var(--pf-accent)",
            boxShadow: `0 0 0 3px ${dark ? "rgba(201,131,145,0.22)" : "rgba(170,99,115,0.2)"}`,
          }}
        />
        Rithani
      </div>
      <button
        onClick={toggle}
        className="flex items-center justify-center w-[30px] h-[30px] rounded-lg border border-pf-border bg-transparent cursor-pointer"
        style={{ color: "var(--pf-text-muted)" }}
      >
        {dark ? <MoonIcon size={14} /> : <SunIcon size={14} />}
      </button>
    </header>
  );
}
