export interface Social {
  kind: "email" | "linkedin" | "github";
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  tagline: string;
  about: string;
  socials: Social[];
}

export interface Country {
  name: string;
  code: string;
  x: number;
  y: number;
  note: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  program?: string;
  location: string;
  dates: string;
  current?: boolean;
  overview?: string;
  stack: string[];
  bullets: string[];
  reflection?: string[];
  photos?: ExperiencePhoto[];
  cardPhotos?: ExperiencePhoto[];
  artifacts?: ExperienceArtifact[];
}

export interface ExperiencePhoto {
  src: string;
  alt: string;
  caption?: string;
  objectPosition?: string;
}

export interface ExperienceArtifact {
  title: string;
  href: string;
  type: "report" | "presentation" | "demo" | "other";
  description?: string;
  preview?: {
    basePath: string;
    pageCount: number;
    filePrefix: "slide" | "page";
    aspect: "landscape" | "portrait";
  };
}

export interface Project {
  id: string;
  name: string;
  category: "Product/SWE" | "Artificial Intelligence" | "Machine Learning";
  blurb: string;
  stack: string[];
  bullets: string[];
  featured?: boolean;
  description?: string;
  images?: string[];
  videoSrc?: string;
  github?: string;
  live?: string;
}

export interface PassionItem {
  title: string;
  note: string;
  image?: string;
}

export interface Passions {
  [category: string]: PassionItem[];
}

export interface WritingEntry {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  body: string[];
}
