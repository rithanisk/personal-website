"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme";
import { SunIcon, MoonIcon } from "@/components/shared/Icons";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/my-story", label: "My Story" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/passions", label: "Passions" },
];

export function FloatingNav() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <nav className="fixed top-7 right-7 z-30 hidden md:flex items-center gap-2.5">
      <div
        className="flex items-center gap-0.5 px-2 py-1.5"
        style={{
          borderRadius: 10,
          background: dark ? "rgba(23,20,15,0.55)" : "rgba(255,255,255,0.55)",
          backdropFilter: "blur(18px) saturate(150%)",
          WebkitBackdropFilter: "blur(18px) saturate(150%)",
          border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(20,18,15,0.08)"}`,
          boxShadow: dark ? "0 4px 20px rgba(0,0,0,0.25)" : "0 4px 20px rgba(20,18,15,0.05)",
        }}
      >
        {navItems.map((item) => {
          const isActive = item.href === pathname;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-[13px] transition-colors duration-200"
              style={{
                fontWeight: isActive ? 550 : 400,
                color: isActive ? "var(--pf-text)" : "var(--pf-text-dim)",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="flex items-center justify-center cursor-pointer"
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          flexShrink: 0,
          border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(20,18,15,0.08)"}`,
          background: dark ? "rgba(23,20,15,0.55)" : "rgba(255,255,255,0.55)",
          backdropFilter: "blur(18px) saturate(150%)",
          WebkitBackdropFilter: "blur(18px) saturate(150%)",
          boxShadow: dark ? "0 4px 20px rgba(0,0,0,0.25)" : "0 4px 20px rgba(20,18,15,0.05)",
          color: "var(--pf-text-muted)",
        }}
      >
        {dark ? <MoonIcon size={15} /> : <SunIcon size={15} />}
      </button>
    </nav>
  );
}
