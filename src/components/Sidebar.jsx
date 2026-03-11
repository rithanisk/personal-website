"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { navLinks, site } from "@/content/site";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  const router = useRouter();
  const navRef = useRef(null);
  const itemRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, top: 0, height: 0 });
  const [hoveredKey, setHoveredKey] = useState(null);

  const items = [
    { key: "name", href: "/", label: site.name.split(" ")[0] },
    ...navLinks.filter((l) => l.href !== "/").map((l) => ({ ...l, key: l.href })),
  ];

  const isActive = (item) => {
    if (item.key === "name") return router.pathname === "/";
    return router.pathname === item.href;
  };

  const updateIndicator = (key) => {
    const el = key ? itemRefs.current[key] : null;
    const nav = navRef.current;
    if (!nav || !el) return;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicator({
      left: elRect.left - navRect.left,
      width: elRect.width,
      top: elRect.top - navRect.top,
      height: elRect.height,
    });
  };

  useEffect(() => {
    if (hoveredKey) return;
    const active = items.find(isActive);
    if (active) updateIndicator(active.key);
  }, [router.pathname, hoveredKey]);

  const handleMouseEnter = (e, key) => {
    setHoveredKey(key);
    const el = e.currentTarget;
    const nav = navRef.current;
    if (!nav) return;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicator({
      left: elRect.left - navRect.left,
      width: elRect.width,
      top: elRect.top - navRect.top,
      height: elRect.height,
    });
  };

  const handleMouseLeave = () => {
    setHoveredKey(null);
    const active = items.find(isActive);
    if (active) updateIndicator(active.key);
  };

  return (
    <header className="fixed left-6 right-6 top-6 z-50 flex items-center justify-between font-sans">
      <div className="flex items-center gap-3">
        <nav
          ref={navRef}
          onMouseLeave={handleMouseLeave}
          className="relative flex items-center gap-0 rounded-lg border border-neutral-200/80 bg-white/80 px-2 py-1 shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80"
          aria-label="Main navigation"
        >
          {/* Sliding indicator - only on hover */}
          <span
            className="absolute rounded-md bg-neutral-100 transition-all duration-200 ease-out dark:bg-neutral-600/70"
            style={{
              left: indicator.left,
              width: indicator.width,
              top: indicator.top,
              height: indicator.height,
              opacity: hoveredKey ? 1 : 0,
            }}
            aria-hidden
          />
          {items.map((item) => {
            const active = isActive(item);
            const hovered = hoveredKey === item.key;
            const linkClass = `relative z-10 rounded-md px-2 py-1 text-sm font-normal transition-colors duration-150 ${
              active && !hovered
                ? "text-neutral-900 dark:text-white"
                : hovered
                  ? "text-neutral-900 dark:text-white"
                  : "text-neutral-600 dark:text-neutral-400"
            } hover:text-neutral-900 dark:hover:text-white`;

            const setRef = (el) => {
              itemRefs.current[item.key] = el;
            };

            return (
              <Link
                key={item.key}
                ref={setRef}
                href={item.href}
                className={linkClass}
                onMouseEnter={(e) => handleMouseEnter(e, item.key)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="rounded-lg border border-neutral-200/80 bg-white/80 p-1.5 shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
          <ThemeToggle />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <a
          href={site.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-normal text-neutral-600 transition-colors duration-150 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          GitHub
        </a>
        <a
          href={site.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-normal text-neutral-600 transition-colors duration-150 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          LinkedIn
        </a>
      </div>
    </header>
  );
}
