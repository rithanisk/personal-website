"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/shared/Icons";

export function HeroBentoTile({
  href,
  eyebrow,
  title,
  description,
  accentInk,
  accent,
  accentSoft,
  live,
  image,
  imageClassName,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  accentInk: string;
  accent: string;
  accentSoft: string;
  live?: boolean;
  image?: string;
  imageClassName?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link
        href={href}
        className="group flex flex-col justify-between h-full min-h-[160px] sm:min-h-[180px] p-5 sm:p-6 rounded-2xl transition-[border-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          background: accentSoft,
          border: "none",
          boxShadow: "var(--pf-shadow)",
          outlineColor: "var(--pf-accent)",
        }}
      >
        <div>
          {live ? (
            <div className="inline-flex items-center gap-2 mb-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: accent }}
              />
              <span
                className="text-[10.5px] font-mono uppercase tracking-[0.16em]"
                style={{ color: accentInk }}
              >
                {eyebrow}
              </span>
            </div>
          ) : (
            <div className="pf-eyebrow mb-2.5" style={{ color: accentInk }}>
              {eyebrow}
            </div>
          )}
          <h3
            className="font-serif font-normal text-[21px] sm:text-[24px] leading-snug tracking-[-0.01em] mb-2"
            style={{ color: accentInk }}
          >
            {title}
          </h3>
          <p
            className="text-[14px] leading-relaxed tracking-tight line-clamp-3"
            style={{ color: accentInk, opacity: 0.75 }}
          >
            {description}
          </p>
        </div>
        {image && (
          <div className="mt-4 flex-1 flex items-end overflow-hidden rounded-lg">
            <img
              src={image}
              alt=""
              className={`w-full h-auto object-contain max-h-[200px] ${imageClassName ?? ""}`}
            />
          </div>
        )}
        <div
          className="flex items-center gap-1.5 mt-4 text-[13px] font-medium"
          style={{ color: accentInk, opacity: 0.7 }}
        >
          <span className="group-hover:translate-x-0.5 transition-transform inline-flex">
            <ArrowRightIcon />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
