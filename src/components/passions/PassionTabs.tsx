"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { passions } from "@/content/passions";
import { PassionTile } from "./PassionTile";
import { PassionModal } from "./PassionModal";
import type { PassionItem } from "@/types/content";

const categories = Object.keys(passions);

export function PassionTabs() {
  const [active, setActive] = useState(categories[0]);
  const [selectedItem, setSelectedItem] = useState<PassionItem | null>(null);
  const activeIdx = categories.indexOf(active);

  const handleClose = useCallback(() => setSelectedItem(null), []);

  return (
    <div>
      {/* Tab switcher */}
      <div
        className="inline-flex relative p-1 rounded-full"
        style={{
          background: "var(--pf-surface-2)",
          border: "1px solid var(--pf-border)",
        }}
      >
        {/* Sliding pill */}
        <div
          className="absolute rounded-full"
          style={{
            top: 4,
            bottom: 4,
            left: `calc(4px + ${activeIdx} * (100% - 8px) / ${categories.length})`,
            width: `calc((100% - 8px) / ${categories.length})`,
            background: "var(--pf-surface)",
            boxShadow: "0 2px 10px -2px color-mix(in oklab, var(--pf-accent) 40%, transparent), 0 0 0 1px color-mix(in oklab, var(--pf-accent) 22%, transparent)",
            transition: "left 540ms cubic-bezier(.2,.7,0,1)",
          }}
        />
        {categories.map((cat, i) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="relative z-[1] cursor-pointer bg-transparent border-none text-center"
            style={{
              padding: "9px 28px",
              minWidth: 140,
              fontSize: 13.5,
              fontWeight: i === activeIdx ? 500 : 450,
              color: i === activeIdx ? "var(--pf-accent-ink)" : "var(--pf-text-muted)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tiles grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="mt-9 grid grid-cols-3 md:grid-cols-4 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {passions[active].map((item, i) => (
            <PassionTile
              key={`${active}-${i}`}
              item={item}
              index={i}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      <PassionModal
        item={selectedItem}
        category={active}
        onClose={handleClose}
      />
    </div>
  );
}
