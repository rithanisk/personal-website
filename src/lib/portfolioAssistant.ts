import { experiences } from "@/content/experiences";
import { passions } from "@/content/passions";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export type AssistantLink = {
  label: string;
  href: string;
};

export type AssistantAnswer = {
  text: string;
  links?: AssistantLink[];
};

type KnowledgeDocument = {
  title: string;
  keywords: string;
  answer: AssistantAnswer;
};

const STOP_WORDS = new Set([
  "a",
  "about",
  "an",
  "and",
  "are",
  "can",
  "did",
  "do",
  "does",
  "for",
  "from",
  "has",
  "have",
  "her",
  "i",
  "in",
  "is",
  "me",
  "of",
  "on",
  "she",
  "tell",
  "the",
  "to",
  "what",
  "where",
  "who",
  "with",
  "you",
]);

const cleanFormatting = (value: string) => value.replaceAll("**", "");

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, " ")
    .trim();

const tokens = (value: string) =>
  normalize(value)
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));

const hasAny = (query: string, terms: string[]) => {
  const normalizedQuery = normalize(query);
  const queryTokens = new Set(tokens(query));

  return terms.some((term) => {
    const normalizedTerm = normalize(term);
    return normalizedTerm.includes(" ")
      ? normalizedQuery.includes(normalizedTerm)
      : queryTokens.has(normalizedTerm);
  });
};

const experienceAliases: Record<string, string[]> = {
  "icu-mortality-research": [
    "icu",
    "mortality",
    "dysrhythmia",
    "neural ode",
    "medical imaging",
    "resnet",
  ],
  nia: [
    "nia",
    "niahealth",
    "toronto",
    "cycle tracking",
    "clinician",
    "nutrition5k",
  ],
  "nus-ta": ["teaching assistant", "is1108", "data ethics", "digital privacy", "taught"],
  "nes-entrepreneurial-education": [
    "nes",
    "startathon",
    "entrepreneurial education",
    "entrepreneurship society",
    "venture capitalists",
  ],
  buymed: ["buymed", "vietnam", "ho chi minh", "pharma", "scraping pipeline"],
};

const projectAliases: Record<string, string[]> = {
  sepsis: ["sepsis", "mimic iii", "mortality prediction", "lstm"],
  bioinks: ["bioink", "bio ink", "bioprinting", "3d printed tissue"],
  mudra: ["mudra", "bharatnatyam recognition", "hand gesture", "mediapipe"],
  rag: ["rag", "retrieval augmented generation", "document question answering", "llamaindex"],
  dropout: ["dropout", "student prediction", "lightgbm", "mlflow"],
  "aws-rek": ["aws image", "rekognition", "image label", "s3"],
};

const experienceAnswer = (id: string): AssistantAnswer | null => {
  const experience = experiences.find((item) => item.id === id);
  if (!experience) return null;

  const impact = cleanFormatting(experience.bullets[0]);
  return {
    text: `${experience.title} at ${experience.company} (${experience.dates}, ${experience.location}). ${experience.overview ?? ""} Key impact: ${impact}`,
    links: [{ label: "View experience", href: "/experience" }],
  };
};

const projectAnswer = (id: string): AssistantAnswer | null => {
  const project = projects.find((item) => item.id === id);
  if (!project) return null;

  return {
    text: `${project.name} is a ${project.category.toLowerCase()} project. ${project.blurb} It was built with ${project.stack.slice(0, 6).join(", ")}.`,
    links: [{ label: "View projects", href: "/projects" }],
  };
};

const knowledgeDocuments: KnowledgeDocument[] = [
  {
    title: "About Rithani",
    keywords: "about bio introduction background computer science student builder product people technology",
    answer: {
      text: `${profile.name} is a computer science student at the National University of Singapore. She builds backend systems, AI-powered tools, and human-centered products, with startup experience across Singapore, Vietnam, and Canada.`,
      links: [{ label: "Read about Rithani", href: "/about" }],
    },
  },
  {
    title: "Roots and story",
    keywords: "born childhood roots family identity india indian american seattle california usa tamil hometown karur story",
    answer: {
      text: "Rithani is a second-generation Indian American, born in Karur, Tamil Nadu and raised in the United States. She grew up connected to Tamil language and culture, then moved to Singapore in 2023 to study computer science at NUS.",
      links: [{ label: "Read her story", href: "/my-story" }],
    },
  },
  {
    title: "What motivates her",
    keywords: "motivation goals values why computer science mission future human centered impact changemaker build products matters",
    answer: {
      text: "Rithani cares most about the point where technology meets people. She is drawn to fast-moving, human-centered work where she can build useful products, understand the people behind a problem, and create measurable impact.",
      links: [{ label: "Read her perspective", href: "/about" }],
    },
  },
  {
    title: "Places she has lived and worked",
    keywords: "countries travel moved lived singapore usa america india vietnam canada toronto ho chi minh seattle noc overseas",
    answer: {
      text: "Her story spans India and the United States, university in Singapore, a three-month NOC internship in Ho Chi Minh City, and a year-long NOC placement in Toronto. Those moves shaped both her independence and how she thinks about building for different communities.",
      links: [{ label: "Explore the timeline", href: "/my-story" }],
    },
  },
];

const rankedKnowledgeAnswer = (question: string): AssistantAnswer | null => {
  const queryTokens = tokens(question);
  if (!queryTokens.length) return null;

  const ranked = knowledgeDocuments
    .map((document) => {
      const searchable = new Set(tokens(`${document.title} ${document.keywords} ${document.answer.text}`));
      const score = queryTokens.reduce(
        (total, token) => total + (searchable.has(token) ? 1 : 0),
        0,
      );
      return { document, score };
    })
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.score ? ranked[0].document.answer : null;
};

export function answerPortfolioQuestion(question: string): AssistantAnswer {
  const query = normalize(question);

  if (hasAny(query, ["hello", "hey", "hi", "hiya"])) {
    return {
      text: "Hi! I can help you explore Rithani’s experience, projects, skills, story, and interests. What would you like to know?",
    };
  }

  if (hasAny(query, ["contact", "email", "reach", "connect", "linkedin", "github", "hire"])) {
    return {
      text: "The easiest way to reach Rithani is by email at rithanisk@gmail.com. You can also connect with her on LinkedIn or explore her code on GitHub.",
      links: [
        { label: "Email", href: "mailto:rithanisk@gmail.com" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/rithanisk/" },
        { label: "GitHub", href: "https://github.com/rithanisk" },
      ],
    };
  }

  if (hasAny(query, ["resume", "cv", "curriculum vitae"])) {
    return {
      text: "You can open Rithani’s latest AI engineering resume here.",
      links: [{ label: "Open resume", href: "/rithani_ai_engineer_resume.pdf" }],
    };
  }

  if (hasAny(query, ["current", "currently", "now", "today", "latest", "working on"])) {
    return {
      text: "Rithani is currently researching multimodal ICU mortality prediction at the National University of Singapore and serving as a Teaching Assistant for IS1108. Her research combines chest X-rays, ECG data, and longitudinal lab data, while her teaching covers data ethics and digital privacy.",
      links: [{ label: "See current work", href: "/experience" }],
    };
  }

  for (const [id, aliases] of Object.entries(experienceAliases)) {
    if (hasAny(query, aliases)) {
      const answer = experienceAnswer(id);
      if (answer) return answer;
    }
  }

  for (const [id, aliases] of Object.entries(projectAliases)) {
    if (hasAny(query, aliases)) {
      const answer = projectAnswer(id);
      if (answer) return answer;
    }
  }

  if (hasAny(query, ["education", "university", "college", "school", "degree", "study", "student", "nus"])) {
    return {
      text: "Rithani studies Computer Science at the National University of Singapore. She moved to Singapore for university in 2023 and has also taken part in NUS Overseas Colleges programs in Vietnam and Toronto.",
      links: [{ label: "Read her story", href: "/my-story" }],
    };
  }

  if (hasAny(query, ["skills", "skill", "stack", "technologies", "technology", "languages", "tools", "technical"])) {
    return {
      text: "Her toolkit spans Python, TypeScript, React, Next.js, FastAPI, Go, PyTorch, PostgreSQL, Docker, Azure, AWS, and RAG/LLM frameworks. Her strongest through-line is building full-stack and AI systems that move from prototype to real users.",
      links: [
        { label: "Experience", href: "/experience" },
        { label: "Projects", href: "/projects" },
      ],
    };
  }

  if (hasAny(query, ["ai", "artificial intelligence", "llm", "gpt", "machine learning", "ml work"])) {
    return {
      text: "Rithani’s AI work includes multimodal ICU mortality research, GPT-powered medical document pipelines and safety agents at NiaHealth, a RAG chatbot at Buymed, sepsis prediction with LSTMs, and research on ML-based bio-ink selection.",
      links: [
        { label: "AI experience", href: "/experience" },
        { label: "ML projects", href: "/projects" },
      ],
    };
  }

  if (hasAny(query, ["hobby", "hobbies", "interests", "passion", "passions", "fun", "outside work", "free time", "dance", "cooking", "photography", "music", "singing"])) {
    return {
      text: `Outside tech, Rithani loves ${Object.keys(passions).join(", ").toLowerCase()}, and Carnatic music. She has spent about 15 years developing her creative side and sees storytelling and craft as central to how she builds products.`,
      links: [{ label: "Explore her passions", href: "/passions" }],
    };
  }

  if (hasAny(query, ["leadership", "leader", "managed", "management", "mentor", "teaching"])) {
    return {
      text: "Her leadership experience includes heading entrepreneurial education for NUS Entrepreneurship Society, managing a 20-person team for NES Startathon, coordinating 26 founder mentors and 5 VC judges, and teaching data ethics and privacy to 100+ IS1108 students.",
      links: [{ label: "See leadership experience", href: "/experience" }],
    };
  }

  if (hasAny(query, ["experience", "internship", "internships", "worked", "work history", "roles", "career"])) {
    return {
      text: `Rithani’s experience includes ${experiences
        .map((experience) => `${experience.title} at ${experience.company}`)
        .join("; ")}. Her work spans health tech, AI/ML research, software engineering, education, and entrepreneurship.`,
      links: [{ label: "Explore all experience", href: "/experience" }],
    };
  }

  if (hasAny(query, ["project", "projects", "built", "builds", "portfolio", "side quest"])) {
    return {
      text: `Featured projects include ${projects.map((project) => project.name).join(", ")}. They span machine learning, AI, cloud engineering, and product development.`,
      links: [{ label: "Explore all projects", href: "/projects" }],
    };
  }

  const rankedAnswer = rankedKnowledgeAnswer(query);
  if (rankedAnswer) return rankedAnswer;

  return {
    text: "I couldn’t find that detail in Rithani’s portfolio. Try asking about her current work, internships, projects, technical skills, education, story, passions, or how to contact her.",
  };
}
