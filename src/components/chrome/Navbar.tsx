"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme";
import { SunIcon, MoonIcon } from "@/components/shared/Icons";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/my-story", label: "My Story" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/passions", label: "Passions" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-5 sm:px-[72px] py-5"
      style={{
        background: dark ? "rgba(15,15,15,0.85)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px) saturate(140%)",
        WebkitBackdropFilter: "blur(12px) saturate(140%)",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 font-serif text-[18px] tracking-[-0.01em] shrink-0"
        style={{ color: "var(--pf-text)" }}
      >
        <span style={{ color: "var(--pf-rose)", fontSize: 22, lineHeight: 1 }}>
          ✳
        </span>
        RS
      </Link>

      {/* Center nav links */}
      <div className="hidden sm:flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = item.href === pathname;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] transition-colors duration-200"
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

      {/* Theme toggle */}
      <div className="flex items-center">
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer transition-colors duration-200"
          style={{ color: "var(--pf-text-muted)" }}
        >
          {dark ? <MoonIcon size={16} /> : <SunIcon size={16} />}
        </button>
      </div>
    </nav>
  );
}
