import { Experience } from "@/types/content";

export const experiences: Experience[] = [
  {
    id: "nia",
    title: "AI/Software Engineer",
    company: "NiaHealth",
    program: "NOC 1 Year Program",
    location: "Toronto, ON",
    dates: "August 2025 – July 2026",
    current: true,
    stack: ["FastAPI", "React", "TypeScript", "Python", "Postgres", "Azure", "Docker", "Agno"],
    bullets: [
      "Reduced medical report parsing latency by **70%** (**10→3 min**) and saved the COO **6–8 hrs/week** of manual review by architecting an asynchronous, background-worker GPT pipeline for external document ingestion.",
      "Eliminated **8** critical data errors before patient-facing delivery, protecting a team of 10 clinicians from potential legal liability, by engineering AI report quality checks using Agno into a clinician-facing internal reporting tool.",
      "Improved food photo calorie extraction accuracy by **27%** over baseline GPT pipeline by integrating FNDDS nutritional database search into a multiagent AI pipeline and validating through systematic model evaluations.",
      "Achieved **80%** female user engagement on a net-new cycle tracker by owning the full product lifecycle from requirements gathering with clinical stakeholders through UI mockups, technical spec, and iterative development.",
    ],
  },
  {
    id: "buymed",
    title: "Software Engineer Intern",
    company: "Buymed",
    program: "NOC 3 Month Program",
    location: "Ho Chi Minh City, VN",
    dates: "May 2024 – August 2024",
    stack: ["React", "Next.js", "Golang", "Node.js", "MongoDB", "Python", "OpenAI API", "LangChain", "Pinecone"],
    bullets: [
      "Improved page load time by **25%** and boosted user retention by **10%** across high-traffic web applications by shipping 10+ production features and resolving 15+ critical performance bugs.",
      "Reduced competitor pricing data collection effort, measured across **6** external pharmaceutical sources, by building a concurrent web scraping and pricing aggregation pipeline with simultaneous multi-source extraction.",
      "Decreased customer information retrieval time from **minutes to seconds** by scraping and embedding the company website into a vector database and deploying a user-facing RAG chatbot with hallucination guardrails.",
    ],
  },
];
