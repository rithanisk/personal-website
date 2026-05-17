"use client";

import { motion } from "framer-motion";
import { type IconType } from "react-icons";
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiGo,
  SiR,
  SiReact,
  SiNextdotjs,
  SiFastapi,
  SiNodedotjs,
  SiTailwindcss,
  SiKeras,
  SiPytorch,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiDocker,
  SiGit,
  SiPostgresql,
  SiMongodb,
  SiGooglecloud,
  SiOpenai,
  SiAnthropic,
  SiGooglegemini,
  SiGithubcopilot,
  SiWindsurf,
  SiPerplexity,
  SiNotebooklm,
  SiFigma,
  SiCanva,
  SiPosthog,
  SiNotion,
  SiLinear,
} from "react-icons/si";
import {
  FaJava,
  FaDatabase,
  FaAws,
  FaMicrosoft,
  FaCloud,
  FaServer,
} from "react-icons/fa";
import { Badge } from "@/components/shared/Badge";

type Skill = {
  name: string;
  icon: IconType;
};

type SkillGroup = {
  label: string;
  variant: "accent" | "forest" | "amber" | "lavender" | "sky" | "teal";
  skills: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    variant: "lavender",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Go", icon: SiGo },
      { name: "Java", icon: FaJava },
      { name: "R", icon: SiR },
      { name: "SQL", icon: FaDatabase },
    ],
  },
  {
    label: "Frameworks & Libraries",
    variant: "forest",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Keras", icon: SiKeras },
      { name: "PyTorch", icon: SiPytorch },
      { name: "Scikit-learn", icon: SiScikitlearn },
      { name: "Agno", icon: SiPython },
    ],
  },
  {
    label: "Data & ML",
    variant: "amber",
    skills: [
      { name: "Pandas", icon: SiPandas },
      { name: "NumPy", icon: SiNumpy },
      { name: "LightGBM", icon: SiScikitlearn },
      { name: "LlamaIndex", icon: SiPython },
      { name: "HuggingFace", icon: SiPython },
      { name: "MLflow", icon: SiPython },
      { name: "Jupyter", icon: SiJupyter },
    ],
  },
  {
    label: "Tools & Infrastructure",
    variant: "teal",
    skills: [
      { name: "AWS", icon: FaAws },
      { name: "GCP", icon: SiGooglecloud },
      { name: "Azure", icon: FaMicrosoft },
      { name: "Docker", icon: SiDocker },
      { name: "Git", icon: SiGit },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Pinecone", icon: FaDatabase },
      { name: "Weaviate", icon: FaCloud },
      { name: "S3", icon: FaServer },
    ],
  },
  {
    label: "AI Tools",
    variant: "accent",
    skills: [
      { name: "Claude Code", icon: SiAnthropic },
      { name: "Claude Design", icon: SiAnthropic },
      { name: "ChatGPT", icon: SiOpenai },
      { name: "Gemini", icon: SiGooglegemini },
      { name: "GitHub Copilot", icon: SiGithubcopilot },
      { name: "Cursor", icon: SiWindsurf },
      { name: "Antigravity", icon: SiAnthropic },
      { name: "Bolt", icon: SiWindsurf },
      { name: "Lovable", icon: SiWindsurf },
      { name: "Perplexity", icon: SiPerplexity },
      { name: "NotebookLM", icon: SiNotebooklm },
      { name: "Granola", icon: SiNotebooklm },
    ],
  },
  {
    label: "Design, Product, & Productivity",
    variant: "sky",
    skills: [
      { name: "Figma", icon: SiFigma },
      { name: "Canva", icon: SiCanva },
      { name: "PostHog", icon: SiPosthog },
      { name: "Notion", icon: SiNotion },
      { name: "Linear", icon: SiLinear },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const groupVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function SkillsSection() {
  return (
    <section className="px-5 md:px-[72px] mt-[72px]">
      <motion.div
        className="mb-6 pb-[18px] border-b border-pf-border"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pf-eyebrow mb-2.5">Skills</div>
        <h2 className="font-serif font-light text-[clamp(26px,3.5vw,40px)] tracking-[-0.025em] leading-[1.05]">
          What I{" "}
          <span className="italic" style={{ color: "var(--pf-lavender-ink)" }}>
            work with
          </span>
          .
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {skillGroups.map((group) => (
          <motion.div key={group.label} variants={groupVariants}>
            <p
              className="text-[14px] font-medium uppercase tracking-[0.08em] mb-4"
              style={{ color: "var(--pf-text-dim)" }}
            >
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {group.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  variants={badgeVariants}
                  whileHover={{ scale: 1.08, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Badge
                    variant={group.variant}
                    className="px-3.5 py-1.5 text-[13px]"
                  >
                    <skill.icon
                      className="inline-block mr-2 -mt-[1px]"
                      size={15}
                    />
                    {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
