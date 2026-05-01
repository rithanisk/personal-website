import { Experience } from "@/types/content";

export const experiences: Experience[] = [
  {
    id: "nia",
    title: "Software / AI Engineer Intern",
    company: "Nia Health",
    program: "NOC 1 Year Program",
    location: "Toronto, ON",
    dates: "Aug 2025 — Present",
    current: true,
    stack: ["FastAPI", "React", "TypeScript", "Python", "Postgres", "Azure", "Docker", "Agno"],
    bullets: [
      "Reduced parsing latency by 70% (from 10 minutes to under 3 minutes per report) and saved 6–8 hours of weekly manual review time by developing an asynchronous GPT-based parsing pipeline using Agno v2.0, Python (FastAPI), and background task processing to shift structured medical data parsing to non-blocking execution.",
      "Reduced manual data processing time by 60% by integrating Tiny Health's backend API into a FastAPI + PostgreSQL service, automating microbiome report retrieval, transformation, and synchronization within a containerized Docker environment deployed on Azure.",
      "Enabled 4–8× faster real-time glucose data review by leading end-to-end development of a scalable CGM system, building high-throughput FastAPI APIs, optimizing PostgreSQL queries, and developing a performant React + TypeScript frontend with scalability and system growth in mind.",
    ],
  },
  {
    id: "nus-ta",
    title: "Teaching Assistant — Digital Ethics & Data Privacy (IS1108)",
    company: "National University of Singapore",
    location: "Singapore",
    dates: "Aug 2024 — Apr 2025",
    stack: [],
    bullets: [
      "Guided students on digital ethics, data privacy laws, and responsible AI usage through class discussions and project work.",
      "Evaluated assignments, quizzes, and projects, providing constructive feedback to students.",
    ],
  },
  {
    id: "buymed",
    title: "Software Engineer Intern",
    company: "Buymed",
    program: "NOC 3 Month Program",
    location: "Ho Chi Minh City, VN",
    dates: "May 2024 — Aug 2024",
    stack: ["React", "Next.js", "Golang", "Node.js", "MongoDB", "Python", "OpenAI API", "LangChain", "Pinecone"],
    bullets: [
      "Improved page load time by 25% and increased user retention by 10% by delivering 10+ production features and resolving 15+ critical performance bugs in high-traffic Next.js applications backed by Node.js and MongoDB.",
      "Reduced manual competitor data collection effort by 80% by building a concurrent Go-based web scraping and data aggregation pipeline to extract and process pricing data from 6 external Thai pharmaceutical sources.",
      "Reduced internal information retrieval time from minutes to seconds by designing and deploying a retrieval-augmented generation (RAG) system using Python, OpenAI API, LangChain, and Pinecone, enabling semantic search across company knowledge bases.",
    ],
  },
];
