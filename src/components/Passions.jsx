"use client";

import { useState } from "react";
import Image from "next/image";
import { passionUmbrella, passionTopics } from "@/content/passions";

function getTopicImages(topicId, imageCount) {
  if (!imageCount) return [];
  return Array.from({ length: imageCount }, (_, i) => `/passions/${topicId}/${topicId}-${i + 1}.png`);
}

export default function Passions() {
  const [activeId, setActiveId] = useState(passionTopics[0]?.id ?? "");

  const activeTopic = passionTopics.find((t) => t.id === activeId) ?? passionTopics[0];
  const images = getTopicImages(activeTopic.id, activeTopic.imageCount);

  return (
    <div id="passions">
      <div>

        {/* Umbrella + sliding topic bar */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {passionUmbrella}
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {passionTopics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => setActiveId(topic.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeId === topic.id
                    ? "bg-brand-pink text-white"
                    : "bg-brand-pink-soft text-black/80 hover:bg-brand-pink/20 dark:bg-brand-pink-soft dark:text-neutral-300 dark:hover:bg-brand-pink/30"
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active topic content */}
        <div className="mt-6">
          <h2 className="font-serif text-xl font-semibold text-neutral-900 dark:text-white">
            {activeTopic.label}
          </h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {activeTopic.description}
          </p>
          {images.length > 0 ? (
            <ul className="mt-6 grid grid-cols-3 gap-2">
              {images.map((src, i) => (
                <li
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700"
                >
                  <Image
                    src={src}
                    alt={`${activeTopic.label} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 33vw, 200px"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">
              Photos for this topic coming soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
