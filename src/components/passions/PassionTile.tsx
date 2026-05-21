"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { PassionItem } from "@/types/content";

interface PassionTileProps {
  item: PassionItem;
  index: number;
  onClick: () => void;
}

export function PassionTile({ item, index, onClick }: PassionTileProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl cursor-pointer"
      style={{
        aspectRatio: "1 / 1",
        background: "var(--pf-surface-2)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.04,
        ease: [0.2, 0.7, 0, 1],
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
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
    </motion.div>
  );
}
