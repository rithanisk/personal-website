"use client";

import { useTheme } from "@/lib/theme";
import { SunIcon, MoonIcon } from "@/components/shared/Icons";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="flex items-center justify-center w-9 h-9 rounded-full border border-pf-border bg-pf-surface text-pf-text-secondary hover:text-pf-text transition-colors duration-200"
    >
      {theme === "dark" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
    </button>
  );
}
