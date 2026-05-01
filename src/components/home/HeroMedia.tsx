"use client";

import { useTheme } from "@/lib/theme";

export function HeroMedia() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div
      className="relative w-full overflow-hidden mx-auto"
      style={{
        aspectRatio: "9 / 16",
        maxHeight: 640,
        borderRadius: 16,
        boxShadow: "var(--pf-shadow-lg)",
        border: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(20,18,15,0.06)"}`,
      }}
    >
      <video
        src="/intro-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        controls
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
