"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const cardBase =
  "group block overflow-hidden rounded-xl border border-neutral-200 bg-white text-left transition hover:border-neutral-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-neutral-700";

export default function ContentCard({
  href,
  category,
  title,
  description,
  imageSrc,
  variant = "image",
}) {
  const isVideo = variant === "video";

  const content = (
    <>
      {imageSrc && (
        <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {isVideo && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/30"
              aria-hidden
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg transition group-hover:scale-110 dark:bg-neutral-100">
                <svg
                  className="ml-1 h-6 w-6 text-neutral-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
      <div className={`p-4 ${!imageSrc ? "min-h-[120px] flex flex-col justify-center" : ""}`}>
        {category && (
          <p className="mb-0.5 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {category}
          </p>
        )}
        <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        )}
      </div>
    </>
  );

  if (href?.startsWith("#")) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-24px" }}
        transition={{ duration: 0.35 }}
      >
        <a href={href} className={cardBase}>
          {content}
        </a>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-24px" }}
        transition={{ duration: 0.35 }}
      >
        <Link href={href} className={cardBase}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: 0.35 }}
    >
      <div className={cardBase}>{content}</div>
    </motion.div>
  );
}
