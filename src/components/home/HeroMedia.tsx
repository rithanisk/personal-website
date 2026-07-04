"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useTheme } from "@/lib/theme";

export function HeroMedia() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{
        borderRadius: 16,
        boxShadow: "var(--pf-shadow-lg)",
        border: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(20,18,15,0.06)"}`,
        aspectRatio: "9 / 10",
      }}
    >
      <video
        ref={videoRef}
        src="/intro-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-label="Short intro video of Rithani"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <button
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full backdrop-blur-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          background: dark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)",
          color: "var(--pf-text)",
          outlineColor: "var(--pf-accent)",
        }}
      >
        {muted ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
    </div>
  );
}
