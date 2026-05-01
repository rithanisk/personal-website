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
  stack: string[];
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  blurb: string;
  stack: string[];
  bullets: string[];
  featured?: boolean;
}

export interface PassionItem {
  title: string;
  note: string;
  image?: string;
}

export interface Passions {
  [category: string]: PassionItem[];
}
