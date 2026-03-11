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
    <section id="passions" className="border-b border-brand-pink/30 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-2xl font-bold text-black sm:text-3xl">
          Get to know me
        </h2>
        <p className="mt-2 text-black/70">
          Beyond work—here’s what I’m into and what keeps me inspired.
        </p>

        {/* Umbrella + sliding topic bar */}
        <div className="mt-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-black/60">
            {passionUmbrella}
          </p>
          <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:px-0">
            {passionTopics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => setActiveId(topic.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeId === topic.id
                    ? "bg-brand-pink text-white"
                    : "bg-brand-pink-soft text-black/80 hover:bg-brand-pink/20"
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active topic content */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-black">
            {activeTopic.label}
          </h3>
          <p className="mt-1 text-sm text-black/70">
            {activeTopic.description}
          </p>
          {images.length > 0 ? (
            <ul className="mt-6 grid grid-cols-3 gap-1 sm:gap-2">
              {images.map((src, i) => (
                <li
                  key={i}
                  className="relative aspect-square overflow-hidden border border-brand-pink/20 bg-brand-pink-soft/30"
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
            <p className="mt-6 text-sm text-black/50">
              Photos for this topic coming soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
