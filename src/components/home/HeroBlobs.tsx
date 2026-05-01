"use client";

import { useTheme } from "@/lib/theme";

export function HeroBlobs() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div
        className="absolute"
        style={{
          top: -140, right: -100, width: 460, height: 460, borderRadius: "50%",
          background: dark
            ? "radial-gradient(circle, rgba(213,141,155,0.32), transparent 65%)"
            : "radial-gradient(circle, #f5e8eb, transparent 65%)",
          filter: "blur(50px)",
          opacity: dark ? 0.75 : 0.92,
        }}
      />
      <div
        className="absolute"
        style={{
          top: 200, left: -80, width: 340, height: 340, borderRadius: "50%",
          background: dark
            ? "radial-gradient(circle, rgba(168,196,159,0.22), transparent 65%)"
            : "radial-gradient(circle, #dce5d7, transparent 65%)",
          filter: "blur(55px)",
          opacity: dark ? 0.7 : 0.9,
        }}
      />
      <div
        className="absolute"
        style={{
          top: 60, left: "40%", width: 260, height: 260, borderRadius: "50%",
          background: dark
            ? "radial-gradient(circle, rgba(214,155,110,0.18), transparent 65%)"
            : "radial-gradient(circle, #f5e6d3, transparent 65%)",
          filter: "blur(55px)",
          opacity: 0.7,
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: -60, right: 200, width: 280, height: 280, borderRadius: "50%",
          background: dark
            ? "radial-gradient(circle, rgba(176,163,204,0.18), transparent 65%)"
            : "radial-gradient(circle, #eae5f0, transparent 65%)",
          filter: "blur(60px)",
          opacity: 0.7,
        }}
      />
    </div>
  );
}
