import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import ContentCard from "@/components/ContentCard";
import WorldMap from "@/components/WorldMap";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { passionTopics } from "@/content/passions";

export default function Home() {
  const firstProject = projects?.[0];
  const secondProject = projects?.[1];
  const currentRole = experience?.[0];

  return (
    <>
      <Head>
        <title>{`${site.name} | Personal Website`}</title>
        <meta name="description" content={site.tagline} />
        <meta property="og:title" content={site.name} />
        <meta property="og:description" content={site.tagline} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Intro block - Chester style */}
      <motion.section
        className="mb-12 sm:mb-16 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="min-w-0 flex-1">
          <h1 className="font-serif text-4xl font-semibold text-neutral-900 dark:text-white sm:text-5xl md:text-6xl">
            Hey there, I'm {site.name.split(" ")[0]}
          </h1>
          <p className="mt-3 font-serif text-2xl text-neutral-700 dark:text-neutral-300 sm:text-3xl md:text-4xl">
            Welcome to my digital garden
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-xl md:text-2xl">
            {site.about}
          </p>
        </div>
        <div className="relative h-56 w-56 shrink-0 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700 sm:h-72 sm:w-72">
          <Image
            src="/hero-photo.png"
            alt={site.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 224px, 288px"
            priority
          />
        </div>
      </motion.section>

      {/* Content cards grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ContentCard
          href="#intro-video"
          category="About"
          title="A quick intro"
          description="A short video introduction to me."
          imageSrc="/hero-photo.png"
          variant="video"
        />
        <ContentCard
          href="/passions"
          category="Passions"
          title={passionTopics[0]?.label ?? "Cooking"}
          description={passionTopics[0]?.description}
          imageSrc="/passions/cooking/cooking-1.png"
        />
        <ContentCard
          href="/passions"
          category="Passions"
          title={passionTopics[1]?.label ?? "Photography"}
          description={passionTopics[1]?.description}
          imageSrc="/passions/photography/photography-1.png"
        />
        {firstProject && (
          <ContentCard
            href="/projects"
            category="Projects"
            title={firstProject.name}
            description={firstProject.description}
          />
        )}
        {secondProject && (
          <ContentCard
            href="/projects"
            category="Projects"
            title={secondProject.name}
            description={secondProject.description}
          />
        )}
        {currentRole && (
          <ContentCard
            href="/experience"
            category="Experience"
            title={currentRole.title}
            description={`${currentRole.company} · ${currentRole.location}`}
          />
        )}
      </section>

      {/* Video (no separate section heading; card links here) */}
      <div id="intro-video" className="scroll-mt-8 pt-14 sm:pt-20">
        <div className="relative aspect-video overflow-hidden rounded-xl border border-neutral-200 bg-neutral-900 dark:border-neutral-700">
          <video
            className="h-full w-full object-contain"
            controls
            playsInline
            poster="/hero-photo.png"
            preload="metadata"
            aria-label="Introduction video"
          >
            <source src="/intro%20video.MP4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* World map section */}
      <section id="map" className="scroll-mt-8 pt-6">
        <WorldMap />
      </section>
    </>
  );
}
