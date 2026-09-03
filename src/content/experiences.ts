import { Experience } from "@/types/content";

export const experiences: Experience[] = [
  {
    id: "icu-mortality-research",
    title: "ICU Mortality Risk Prediction Machine Learning Researcher",
    company: "National University of Singapore",
    program: "Supervisor: Dr. Kabir",
    location: "Singapore",
    dates: "August 2026 – Present",
    current: true,
    overview:
      "Researching multimodal methods for predicting mortality risk in ICU patients with cardiac dysrhythmias.",
    stack: ["PyTorch", "ResNet-50", "Neural ODEs", "ECG", "Medical Imaging"],
    bullets: [
      "Designing a **multimodal ICU mortality prediction model** that fuses a ResNet-50 chest X-ray encoder, a 1D ResNet ECG encoder, and a Neural ODE-based encoder for irregular longitudinal lab data.",
    ],
  },
  {
    id: "nia",
    title: "AI/Software Engineer Intern",
    company: "NiaHealth",
    program: "Health Tech · Series A",
    location: "Toronto, ON",
    dates: "August 2025 – July 2026",
    overview:
      "NiaHealth is a digital health startup building AI-powered tools for chronic disease management and clinician workflows.",
    stack: ["Agno", "FastAPI", "React", "TypeScript", "Python", "Postgres", "Azure", "Docker"],
    bullets: [
      "Improved food-photo macro extraction accuracy by **27%** over the baseline GPT vision model by integrating FNDDS nutrition retrieval into an Agno multi-agent pipeline and evaluating it on Google Nutrition5k.",
      "Built and deployed an asynchronous GPT integration and external-document pipeline on Azure, reducing medical-report parsing latency by **70%** (**10 to 3 minutes**) and saving the COO **9 hours/week** of manual review.",
      "Developed an AI-agent safety layer in Agno to validate patient reports against clinical recommendations, catching **8 report errors** before delivery and reducing legal-risk exposure.",
      "Owned end-to-end delivery of a React and Python cycle-tracking application for **8,000+ users**, partnering with clinical stakeholders from requirements through iterative UI and technical design.",
    ],
    photos: [
      { src: "/media-v1/NiaHealth.webp", alt: "NiaHealth application dashboard", caption: "Product work at NiaHealth" },
      { src: "/media-v1/NiaHealth2.webp", alt: "NiaHealth kidney function chart", caption: "Clinical data tooling" },
      { src: "/media-v1/toronto.webp", alt: "Rithani in Toronto", caption: "Toronto, Ontario" },
    ],
    cardPhotos: [
      { src: "/media-v1/toronto2.webp", alt: "Rithani presenting her work at NiaHealth", caption: "Presenting at NiaHealth" },
      { src: "/media-v1/toronto3.webp", alt: "Rithani with the NiaHealth team", caption: "The NiaHealth team" },
    ],
    artifacts: [
      {
        title: "Final Internship Presentation",
        href: "/reports/niahealth/final-internship-presentation.pdf",
        type: "presentation",
        description: "A retrospective on the work, learning, and impact of the NiaHealth internship.",
        preview: {
          basePath: "/slides/niahealth/internship",
          pageCount: 15,
          filePrefix: "slide",
          aspect: "landscape",
        },
      },
      {
        title: "TR3203 Final Business Presentation",
        href: "/reports/niahealth/tr3203-final-business-presentation.pdf",
        type: "presentation",
        description: "Final business presentation developed around the NiaHealth experience.",
        preview: {
          basePath: "/slides/niahealth/business",
          pageCount: 31,
          filePrefix: "slide",
          aspect: "landscape",
        },
      },
      {
        title: "TR3203 Teaching Case",
        href: "/reports/niahealth/tr3203-teaching-case.pdf",
        type: "report",
        description: "Teaching case examining the NiaHealth business experience.",
        preview: {
          basePath: "/previews/niahealth/teaching-case",
          pageCount: 17,
          filePrefix: "page",
          aspect: "portrait",
        },
      },
      {
        title: "TR3203 Teaching Note",
        href: "/reports/niahealth/tr3203-teaching-note.pdf",
        type: "report",
        description: "Companion teaching note for the NiaHealth case.",
        preview: {
          basePath: "/previews/niahealth/teaching-note",
          pageCount: 14,
          filePrefix: "page",
          aspect: "portrait",
        },
      },
    ],
  },
  {
    id: "nus-ta",
    title: "Teaching Assistant — IS1108",
    company: "National University of Singapore",
    location: "Singapore",
    dates: "August 2024 – Present",
    current: true,
    overview:
      "IS1108 examines data ethics, digital privacy, and the real-world consequences of technology.",
    stack: ["Data Ethics", "Digital Privacy", "Critical Thinking", "Teaching"],
    bullets: [
      "Facilitated weekly tutorial sessions for **100+ students** on data ethics, digital privacy, and responsible technology use.",
      "Mentored students through real-world ethical dilemmas involving data collection, surveillance, and internal biases.",
    ],
    photos: [
      { src: "/media-v1/singapore1.webp", alt: "National University of Singapore campus", caption: "National University of Singapore" },
      { src: "/media-v1/passions/photography/photography-1.webp", alt: "University Town at NUS", caption: "University Town" },
      { src: "/media-v1/passions/photography/photography-2.webp", alt: "Campus life photograph", caption: "Campus life" },
    ],
    cardPhotos: [
      { src: "/media-v1/ta.webp", alt: "Rithani with her IS1108 students", caption: "IS1108 teaching assistant" },
    ],
  },
  {
    id: "buymed",
    title: "Software Engineer Intern",
    company: "Buymed",
    program: "B2B Pharma E-Commerce · Series B",
    location: "Ho Chi Minh City, Vietnam",
    dates: "May 2024 – August 2024",
    overview:
      "Buymed connects pharmacies with drug manufacturers through a B2B pharmaceutical e-commerce platform across Southeast Asia.",
    stack: ["Go", "React", "Next.js", "MongoDB", "Python", "OpenAI API", "LangChain", "Pinecone"],
    bullets: [
      "Implemented REST API endpoints in Go for a concurrent pipeline that automated nightly pricing collection across **6 pharmaceutical sources**, plus a React dashboard used by a **35-person internal team**.",
      "Reduced website information retrieval time from **5 minutes to 10 seconds** by building a user-facing RAG chatbot with Pinecone, LangChain, and the OpenAI API.",
      "Collaborated with global engineering teams to deliver **10+ production features** and **15+ bug fixes** across the Thailand and Cambodia Next.js websites.",
    ],
    photos: [
      { src: "/media-v1/Buymed.webp", alt: "Buymed delivery operations", caption: "Buymed in Ho Chi Minh City" },
      { src: "/media-v1/Buymed2.webp", alt: "Buymed platform", caption: "B2B pharmaceutical platform" },
      { src: "/media-v1/vietnam.webp", alt: "Rithani in Vietnam", caption: "Ho Chi Minh City, Vietnam" },
    ],
    cardPhotos: [
      { src: "/media-v1/vietnam.webp", alt: "Rithani at the Buymed office", caption: "Buymed, Ho Chi Minh City", objectPosition: "center 30%" },
      { src: "/media-v1/vietnam3.webp", alt: "Rithani having dinner with friends in Vietnam", caption: "Life in Ho Chi Minh City" },
    ],
    artifacts: [
      {
        title: "ETP3205 Final Presentation",
        href: "/reports/buymed/etp3205-final-presentation.pdf",
        type: "presentation",
        description: "Final presentation reflecting on the Buymed internship experience in Vietnam.",
        preview: {
          basePath: "/slides/buymed/etp3205",
          pageCount: 15,
          filePrefix: "slide",
          aspect: "landscape",
        },
      },
    ],
  },
];
