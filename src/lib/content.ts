/**
 * Every factual claim on this site lives here, sourced from
 * AnuragGokhale_AIEngineer_Resume (Aug 2026). Opinions are marked as opinions
 * and dated. If a line here can't be defended in an interview, cut it.
 */

export const SITE = {
  domain: "https://anuragworks.in",
  title: "Anurag Gokhale, AI Engineer",
  description:
    "AI engineer shipping LLM, retrieval, multi-agent and vision systems in explosives, defence and aerospace manufacturing. Tool-calling pipelines, voice RAG, human-in-the-loop agents.",
} as const;

export const PROFILE = {
  name: "Anurag Gokhale",
  role: "AI Engineer",
  /** named once, in the timeline; everywhere else we describe the industry */
  company: "Solar Industries India Ltd.",
  industry: "Explosives, defence & aerospace",
  team: "AI/ML team",
  location: "Nagpur, India",
  timezone: "IST, UTC+5:30",
  email: "anuraggokhaleai@gmail.com",
  github: "https://github.com/AnuragGokhale17",
  githubHandle: "AnuragGokhale17",
  linkedin: "https://linkedin.com/in/anuraggokhale",
  linkedinHandle: "in/anuraggokhale",
  resumeHref: "/AnuragGokhale_AIEngineer_Resume.pdf",
  roostUrl: "https://roost.anuragworks.in",
  roostLabel: "roost.anuragworks.in",
} as const;

export const INTRO = {
  lines: ["I build AI", "that survives", "production."],
  body: "AI engineer at India’s largest explosives manufacturer, a group that also builds for defence and aerospace. I design tool-calling pipelines, retrieval workflows and agent orchestration that connect models to real APIs, databases and business tools. In the same role I’ve led its computer vision division, running 350+ cameras across its plants, which is where I learned what production actually means.",
} as const;

/* ------------------------------------------------------------------
   WORK — shipped systems, AI first, vision as the foundation
   ------------------------------------------------------------------ */

export type Status = "Production" | "Pilot" | "In progress" | "Personal";

export interface Work {
  id: string;
  name: string;
  oneLine: string;
  status?: Status;
  year: string;
  problem: string;
  decisions: string[];
  outcome?: string;
  stack: string[];
  /** a working, public link to the thing itself */
  live?: { href: string; label: string };
}

export const WORK: Work[] = [
  {
    id: "agents",
    name: "Agent orchestration for internal tools",
    oneLine: "LLMs wired into the internal APIs, databases and tools of a defence and explosives manufacturer",
    status: "In progress",
    year: "2025–now",
    problem:
      "Internal systems hold the answers, but each one has its own API, schema and owner. The goal is models that can act across them, not a chatbot that describes them.",
    decisions: [
      "Tool and function-calling pipelines that expose internal APIs and databases to models as typed, scoped actions",
      "Retrieval-augmented workflows where the model needs grounding in company documents",
      "An orchestration layer that routes work between agents and tools for autonomous task execution",
    ],
    stack: ["Tool calling", "Multi-agent orchestration", "RAG", "LangChain", "FastAPI", "PostgreSQL"],
  },
  {
    id: "roost",
    name: "Roost",
    oneLine: "A six-agent job search system that never submits without a yes",
    status: "Personal",
    year: "2026",
    problem:
      "Finding, scoring and applying to jobs is a long chain of small judgments and a lot of tedious form-filling. It’s also a good place to learn how agents fail when they run unattended.",
    decisions: [
      "Discovery uses no LLM at all: it queries Greenhouse, Lever, Ashby, SmartRecruiters, Recruitee and Workday directly, plus JSON-LD on arbitrary career pages",
      "Agents coordinate through deterministic code, not LLM-to-LLM messages, to keep token spend tied to actual decisions",
      "A Playwright agent with vision fills real application forms, then stops for explicit approval by click or voice",
      "API keys rotate across providers on rate limits, and scored jobs are cached so nothing is paid for twice",
      "A React dashboard shows the live browser session, with hands-free control through the Gemini Live API",
    ],
    outcome: "Six specialised agents, six ATS integrations, a human approving every submission.",
    stack: ["Python", "Groq", "Gemini", "Gemini Live API", "Playwright", "React", "SQLite"],
    live: { href: "https://roost.anuragworks.in", label: "roost.anuragworks.in" },
  },
  {
    id: "voice-rag",
    name: "Voice RAG for maintenance crews",
    oneLine: "Fault codes and repair procedures, asked aloud in Hindi or English",
    status: "Production",
    year: "2025",
    problem:
      "The Mechanical & Instrumentation team needed answers from a shelf of equipment manuals while standing at the equipment. Nobody there was going to type a query.",
    decisions: [
      "Embedding-based retrieval across multiple manuals, orchestrated with LangChain",
      "A bilingual speech-to-text and text-to-speech loop, because that’s how the floor talks",
      "Scope held to the two questions people actually ask: what does this fault code mean, and how do I fix it",
    ],
    stack: ["LangChain", "Vector embeddings", "STT / TTS", "FastAPI"],
  },
  {
    id: "smart-factory",
    name: "LLM chat over live plant telemetry",
    oneLine: "Questions answered against real sensor data, behind real access control",
    status: "Production",
    year: "2025–now",
    problem:
      "A plant head, a production head and a floor supervisor need different answers from the same data, and an LLM must never show someone a number they aren’t allowed to see.",
    decisions: [
      "Telemetry context is filtered by the user’s role before it reaches the model",
      "Master/module RBAC with OIDC single sign-on across platform modules",
      "Live ingestion with dynamic KPI computation and real-time alerting underneath the chat layer",
    ],
    stack: ["Next.js", "React", "FastAPI", "PostgreSQL", "OIDC SSO", "LLM tool calling"],
  },
  {
    id: "vlm",
    name: "Natural-language search over camera footage",
    oneLine: "Vision-language models for asking questions of visual data",
    year: "2025",
    problem:
      "Hundreds of cameras record far more than anyone will review. Fixed detection classes only answer the questions someone thought of in advance.",
    decisions: [
      "Integrated VLMs so visual data can be queried semantically, in plain language",
    ],
    stack: ["VLMs", "OpenCV", "Python", "MinIO"],
  },
  {
    id: "site-gen",
    name: "Prompt-to-website generator",
    oneLine: "An agentic pipeline that turns a description into a working site",
    status: "Personal",
    year: "2025",
    problem: "Generating a whole site in one model call produces something that looks finished and isn’t.",
    decisions: [
      "Decomposes the prompt into structured build steps before any code is written",
      "Generates full, responsive websites end to end from those steps",
    ],
    stack: ["Agentic AI", "LLM", "React", "FastAPI", "Python"],
  },
  {
    id: "ppe",
    name: "PPE violation detection",
    oneLine: "Safety gear checked continuously across an explosives plant",
    status: "Production",
    year: "2024–now",
    problem:
      "No pretrained model had ever seen this plant. Off-the-shelf weights failed on its lighting, uniforms and camera angles, and a missed violation here is an incident, not a metric.",
    decisions: [
      "Trained a YOLO detector from scratch on plant-collected imagery instead of fine-tuning generic weights",
      "Deployed entirely on-premise across 350+ cameras; no frame leaves the site",
      "Alerts routed to the supervisor who owns the zone",
      "Operating threshold tuned against supervisor tolerance, not a validation-set score",
    ],
    outcome: "Daily violations down from about 8,000 to under 300, at 95%+ detection accuracy.",
    stack: ["YOLO (from scratch)", "OpenCV", "MinIO", "Python", "On-prem GPU"],
  },
  {
    id: "anpr",
    name: "ANPR at the gates",
    oneLine: "Every vehicle in and out, read and logged automatically",
    status: "Production",
    year: "2025",
    problem:
      "Number plates arrive skewed, half-lit and partly hidden. Finding the plate is the easy half; reading it correctly in every gate condition is the job.",
    decisions: [
      "Fine-tuned YOLO for plate localisation feeding a dedicated OCR stage",
      "Built for the three ways gate ANPR fails: variable light, oblique angles, occlusion",
      "Crops and frames stored in MinIO and indexed in PostgreSQL as a searchable audit trail",
    ],
    outcome: "200+ vehicle entries and exits logged daily.",
    stack: ["Fine-tuned YOLO", "OCR", "OpenCV", "MinIO", "PostgreSQL", "FastAPI"],
  },
];

export const STATS = [
  { value: 350, suffix: "+", label: "Cameras running my models on-premise" },
  { value: 8000, to: 300, label: "Daily safety violations, before and after" },
  { value: 6, label: "Specialised agents in Roost" },
  { value: 200, suffix: "+", label: "Vehicles read and logged at the gates daily" },
] as const;

export const MARQUEE = [
  "Tool calling", "Multi-agent orchestration", "RAG", "Voice AI", "Vision-language models",
  "Browser agents", "Human in the loop", "On-prem inference", "FastAPI", "Next.js",
];

/** The vision systems: where the production instincts came from. */
export const FOUNDATIONS = {
  title: "More vision systems on plant floors",
  body: "Before LLMs, I owned computer vision from model to deployment across multiple plant sites: on-premise, often with no internet, where a false alarm costs a supervisor’s trust.",
  items: [
    { name: "Headcount AI", fact: "DeepStream with NvDCF re-identification, a 20-camera pilot aimed at 150+ feeds", status: "Pilot" as Status },
    { name: "X-ray defect inspection", fact: "Framed as anomaly detection because real defects are too rare to classify", status: "Production" as Status },
    { name: "ProcessGuard", fact: "Flags skipped or out-of-order steps in a critical process as they happen", status: "In progress" as Status },
  ],
} as const;

/* ------------------------------------------------------------------
   PRINCIPLES — how I build, each backed by something shipped
   ------------------------------------------------------------------ */

export const PRINCIPLES = [
  {
    title: "Code coordinates. Models decide.",
    body: "Every LLM call should be paying for a judgment. Routing, retries, fan-out and hand-offs are ordinary code, which makes them cheap, testable and boring in the right way.",
    evidence: "Roost’s six agents talk through deterministic code, and its discovery agent makes zero model calls.",
  },
  {
    title: "Nothing irreversible without a person.",
    body: "Agents that act in the world need an approval point placed exactly where the action can’t be undone. Everywhere else they should move without asking.",
    evidence: "Roost fills the whole application, then waits for a click or a spoken yes.",
  },
  {
    title: "Access control lives below the prompt.",
    body: "A system prompt is not a permission system. Filter what the model can see by who is asking, before the model sees it.",
    evidence: "The plant telemetry chat filters context by RBAC role ahead of the model call.",
  },
  {
    title: "The interface is part of the system.",
    body: "Retrieval quality doesn’t matter if the people who need the answer can’t ask the question. Build for how they actually work.",
    evidence: "Maintenance RAG is voice-first and bilingual because the crew’s hands are full.",
  },
  {
    title: "Assume the provider will fail.",
    body: "Rate limits, outages and slow responses are normal operating conditions. Design for them on day one and cache anything you’ve already paid for.",
    evidence: "Key rotation across providers and a persistent result cache in Roost.",
  },
  {
    title: "Measure the number the business feels.",
    body: "An accuracy score is a checkpoint. The result is whatever changes on the floor because the system exists.",
    evidence: "PPE detection is reported as violations per day, about 8,000 down to under 300.",
  },
] as const;

/* ------------------------------------------------------------------
   STACK — only what I've actually shipped or built with
   ------------------------------------------------------------------ */

export const STACK = [
  {
    name: "In production",
    note: "Shipped and maintained for real users",
    items: ["Tool / function calling", "RAG", "Vector embeddings", "LangChain", "STT / TTS", "VLMs", "FastAPI", "PostgreSQL", "MinIO", "YOLO", "NVIDIA DeepStream", "React", "Next.js", "OIDC SSO + RBAC"],
  },
  {
    name: "Built with",
    note: "Used end to end in my own projects",
    items: ["Multi-agent orchestration", "Groq", "Gemini", "Gemini Live API", "Playwright", "SQLite", "Flask", "Node.js", "MongoDB", "PyTorch", "TensorFlow"],
  },
  {
    name: "Classic ML",
    note: "Internship projects, 2024",
    items: ["Time-series analysis", "Price prediction", "Classification", "ABC customer analysis", "Survival analysis (Cox-PH)", "Churn prediction", "NLP extraction", "Power BI", "Tableau"],
  },
] as const;

/* ------------------------------------------------------------------
   PATH
   ------------------------------------------------------------------ */

export const PATH = [
  { when: "2021–25", what: "B.Tech in Artificial Intelligence", where: "GH Raisoni College of Engineering, Nagpur", detail: "BioMedical Hackathon finalist (2022). Smart India Hackathon and Kavach cybersecurity hackathon (2023)." },
  {
    when: "Jun – Dec 2024",
    what: "Data Analysis Intern",
    where: "Solar Industries India Ltd., India’s largest explosives manufacturer",
    detail: "A run of smaller ML and deep learning projects that built the fundamentals, and one big one: the PPE detection pipeline across 350+ cameras that’s still running today.",
    tags: ["Time-series analysis", "Price prediction", "Classification", "ABC customer analysis", "Churn prediction with Cox-PH, 85%+", "NLP data extraction", "PPE detection"],
  },
  {
    when: "May 2025 – now",
    what: "AI Engineer",
    where: "Same organisation, full time",
    detail: "One role, two halves. Led the Computer Vision division in IIoT: model architecture, training and on-premise deployment across plant sites, shipping ANPR, X-ray inspection and the Headcount AI pilot. Now, with the AI/ML team, architecting LLM-integrated multi-agent systems and tool-calling pipelines over internal APIs and data.",
    tags: ["LLM agents", "Tool calling", "RAG", "Voice interfaces", "Computer vision", "On-prem deployment"],
  },
  { when: "2026", what: "Built Roost, independently, end to end", detail: "Six agents, six ATS integrations, a person approving every submission. Live at roost.anuragworks.in." },
] as const;

export const LOOKING_FOR = {
  roles: ["AI Engineer", "Applied AI Engineer", "LLM / Agents Engineer"],
  basis: "Full-time or contract, remote or relocation",
} as const;
