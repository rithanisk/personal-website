"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { PassionItem } from "@/types/content";

interface PassionModalProps {
  item: PassionItem | null;
  category: string;
  onClose: () => void;
}

export function PassionModal({ item, category, onClose }: PassionModalProps) {
  useEffect(() => {
    if (!item) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative flex flex-col md:flex-row rounded-2xl overflow-hidden max-w-[900px] w-full max-h-[85vh]"
            style={{
              background: "var(--pf-surface)",
              border: "1px solid var(--pf-border)",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.35)",
            }}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.2, 0.7, 0, 1] }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer border-none"
              style={{
                background: "rgba(0,0,0,0.4)",
                color: "white",
                fontSize: 18,
              }}
              aria-label="Close"
            >
              &times;
            </button>

            {/* Image side */}
            <div className="relative w-full md:w-1/2 shrink-0" style={{ minHeight: 280 }}>
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 450px"
                />
              )}
            </div>

            {/* Content side */}
            <div className="flex flex-col justify-center p-6 md:p-8 w-full md:w-1/2">
              <ModalContent item={item} category={category} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalContent({ item, category }: { item: PassionItem; category: string }) {
  const cat = category.toLowerCase();

  if (cat === "cooking") {
    return (
      <>
        <span
          className="font-mono text-[11px] tracking-[0.08em] uppercase mb-3"
          style={{ color: "var(--pf-accent)" }}
        >
          Recipe
        </span>
        <h2
          className="font-serif font-light tracking-[-0.02em] text-[28px] leading-tight mb-3"
          style={{ color: "var(--pf-text)" }}
        >
          {item.title}
        </h2>
        <p
          className="font-mono text-[13px] leading-relaxed"
          style={{ color: "var(--pf-text-muted)" }}
        >
          {item.note}
        </p>
      </>
    );
  }

  if (cat === "dancing") {
    return (
      <>
        <span
          className="font-mono text-[11px] tracking-[0.08em] uppercase mb-3"
          style={{ color: "var(--pf-accent)" }}
        >
          Performance
        </span>
        <h2
          className="font-serif font-light tracking-[-0.02em] text-[28px] leading-tight mb-3"
          style={{ color: "var(--pf-text)" }}
        >
          {item.title}
        </h2>
        <p
          className="font-mono text-[13px] leading-relaxed"
          style={{ color: "var(--pf-text-muted)" }}
        >
          {item.note}
        </p>
      </>
    );
  }

  // Photography
  return (
    <>
      <span
        className="font-mono text-[11px] tracking-[0.08em] uppercase mb-3"
        style={{ color: "var(--pf-accent)" }}
      >
        Photography
      </span>
      <h2
        className="font-serif font-light tracking-[-0.02em] text-[28px] leading-tight mb-3"
        style={{ color: "var(--pf-text)" }}
      >
        {item.title}
      </h2>
      <p
        className="font-mono text-[13px] leading-relaxed"
        style={{ color: "var(--pf-text-muted)" }}
      >
        {item.note}
      </p>
    </>
  );
}
