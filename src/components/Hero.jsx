import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import HomePageBackground from "./HomePageBackground";
import SocialIcons from "./SocialIcons";

export default function Hero() {
  return (
    <section className="relative border-b border-brand-pink/30 bg-white dark:bg-[var(--background)] dark:border-neutral-800 overflow-hidden">
      <HomePageBackground />
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-12">
          <div className="flex-shrink-0">
            <div className="relative h-56 w-56 overflow-hidden border-2 border-brand-pink/30 shadow-lg sm:h-64 sm:w-64 md:h-72 md:w-72">
              <Image
                src="/hero-photo.png"
                alt={`${site.name} - headshot`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 256px, 288px"
                priority
              />
            </div>
          </div>
          <div className="min-w-0 flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
              {site.name}
            </h1>
            <p className="mt-2 text-lg text-black/80 dark:text-neutral-300">
              {site.tagline}
            </p>
            <p className="mt-6 max-w-2xl text-black/70 dark:text-neutral-400 md:mx-0 md:mr-auto">
              {site.about}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <Link
                href="/experience"
                className="inline-flex items-center justify-center rounded-full bg-brand-pink px-5 py-2 text-sm font-medium text-white transition hover:bg-brand-pink-dark"
              >
                View Experience
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                View Projects
              </Link>
              <SocialIcons className="ml-0 md:ml-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
