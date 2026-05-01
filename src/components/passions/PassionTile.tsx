"use client";

import Image from "next/image";
import type { PassionItem } from "@/types/content";

export function PassionTile({ item }: { item: PassionItem; tab?: string; tall?: boolean }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl"
      style={{
        aspectRatio: "1 / 1",
        background: "var(--pf-surface-2)",
      }}
    >
      {item.image && (
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      )}
      {/* Caption */}
      <div
        className="absolute bottom-0 left-0 right-0 px-3 py-2.5"
        style={{
          background: "linear-gradient(transparent, rgba(0,0,0,0.5))",
        }}
      >
        <span className="text-[11px] font-mono tracking-[0.05em] text-white/90">
          {item.title}
        </span>
      </div>
    </div>
  );
}
