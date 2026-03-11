"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function GardenCard({
  href,
  category,
  categoryHref,
  title,
  description,
  meta,
  children,
  as = "link",
}) {
  const content = (
    <>
      {(category || categoryHref) && (
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {categoryHref && as === "div" ? (
            <Link href={categoryHref} className="hover:text-brand-pink">
              {category}
            </Link>
          ) : (
            category
          )}
        </p>
      )}
      <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-white">
        {title}
      </h3>
      {meta && (
        <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
          {meta}
        </p>
      )}
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {description}
        </p>
      )}
      {children}
    </>
  );

  const cardClass =
    "group block rounded-xl border border-neutral-200 bg-white p-5 text-left transition hover:border-brand-pink/30 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-brand-pink/40";

  if (as === "div" || !href) {
    return (
      <motion.div
        className={cardClass}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-24px" }}
        transition={{ duration: 0.35 }}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: 0.35 }}
    >
      <Link href={href} className={cardClass}>
        {content}
      </Link>
    </motion.div>
  );
}
