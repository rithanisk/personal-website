import "server-only";

import { countries } from "@/content/countries";
import { experiences } from "@/content/experiences";
import { passions } from "@/content/passions";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { story } from "@/content/story";
import { writingEntries } from "@/content/writing";

const cleanFormatting = (value: string) => value.replaceAll("**", "");

export const portfolioContext = {
  profile: {
    name: profile.name,
    tagline: profile.tagline,
    about: profile.about,
    contact: profile.socials,
    resume: "/rithani_ai_engineer_resume.pdf",
  },
  story,
  places: countries.map(({ name, code, note }) => ({ name, code, note })),
  experiences: experiences.map((experience) => ({
    id: experience.id,
    title: experience.title,
    company: experience.company,
    program: experience.program,
    location: experience.location,
    dates: experience.dates,
    current: Boolean(experience.current),
    overview: experience.overview,
    stack: experience.stack,
    highlights: experience.bullets.map(cleanFormatting),
    reflections: experience.reflection,
    publicArtifacts: experience.artifacts?.map(({ title, href, type, description }) => ({
      title,
      href,
      type,
      description,
    })),
  })),
  projects: projects.map((project) => ({
    id: project.id,
    name: project.name,
    category: project.category,
    summary: project.blurb,
    description: project.description,
    stack: project.stack,
    highlights: project.bullets.map(cleanFormatting),
    github: project.github,
    live: project.live,
  })),
  passions: Object.entries(passions).map(([category, items]) => ({
    category,
    items: items.map(({ title, note }) => ({ title, note })),
  })),
  writing: writingEntries.map(({ slug, title, date, excerpt, body }) => ({
    slug,
    title,
    date,
    excerpt,
    body,
  })),
  websiteNavigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Projects", href: "/projects" },
    { label: "My story", href: "/my-story" },
    { label: "Passions", href: "/passions" },
  ],
};

export const serializedPortfolioContext = JSON.stringify(portfolioContext);
