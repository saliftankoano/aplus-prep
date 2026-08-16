export type CoreKey = "core1" | "core2";
export type ExamCode = "220-1201" | "220-1202";

export interface PracticeDeck {
  id: number;
  title: string;
  description: string;
  questions: number;
  difficulty?: "Beginner" | "Intermediate" | "Advanced" | "Mixed";
  topics?: string[];
}

export interface ExamCollection {
  slug: string;
  label: string;
  source: string;
  version?: string;
  sourceSlug?: string;
  description: string;
  questionCount: number;
  decks: PracticeDeck[];
  legacy?: boolean;
}

export interface ExamConfig {
  core: CoreKey;
  code: ExamCode;
  label: string;
  shortLabel: string;
  accent: "core1" | "core2";
  eyebrow: string;
  description: string;
  totalQuestions: number;
  totalDecks: number;
  domains: string[];
  collections: ExamCollection[];
}

const numberedDecks = (count: number, lastCount = 30): PracticeDeck[] =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: `Deck ${index + 1}`,
    description: "Mixed exam-style questions from this source bank.",
    questions: index === count - 1 ? lastCount : 30,
    difficulty: "Mixed",
  }));

const core1Curated: PracticeDeck[] = [
  ["Mobile Devices & Hardware", "Mobile features, laptop hardware, and connectivity", "Beginner", ["Mobile devices", "Laptop components", "Display types"]],
  ["Networking Fundamentals", "Protocols, cabling, and wireless configuration", "Intermediate", ["TCP/IP", "Common ports", "Wireless standards"]],
  ["Hardware Components", "Processors, memory, storage, and motherboards", "Intermediate", ["Processors", "Memory types", "Storage devices"]],
  ["Virtualization & Cloud", "Cloud models and client-side virtualization", "Advanced", ["Cloud models", "SaaS / PaaS / IaaS", "Hypervisors"]],
  ["Hardware Troubleshooting", "Diagnose physical hardware and printer issues", "Advanced", ["POST errors", "Storage issues", "Printers"]],
  ["Network Troubleshooting", "Resolve connectivity and IP configuration issues", "Advanced", ["IP configuration", "Network tools", "Signal strength"]],
  ["Printers & MFDs", "Printer types, maintenance, and setup", "Intermediate", ["Laser", "Inkjet", "Thermal"]],
  ["Comprehensive Review", "Mixed review of all Core 1 objectives", "Advanced", ["Mixed objectives", "Scenarios", "Exam preparation"]],
].map(([title, description, difficulty, topics], index) => ({
  id: index + 1,
  title: String(title),
  description: String(description),
  difficulty: difficulty as PracticeDeck["difficulty"],
  topics: topics as string[],
  questions: index === 7 ? 26 : 30,
}));

const core2LegacyTitles = [
  "System Installation & Configuration",
  "Security & User Management",
  "Software Troubleshooting",
  "Network Configuration & Security",
  "System Maintenance & Optimization",
  "Mobile Device Management",
  "Cloud Services & Virtualization",
  "Data Protection & Privacy",
  "Troubleshooting & Resolution",
  "Customer Service & Communication",
  "Hardware & Component Management",
  "Peripheral & External Devices",
  "Network Security & Monitoring",
  "Administration & Policies",
  "Final Comprehensive Review",
];

const core2Legacy: PracticeDeck[] = core2LegacyTitles.map((title, index) => ({
  id: index + 1,
  title,
  description: "Focused review from the original 220-1102 question collection.",
  questions: index === 14 ? 9 : 30,
  difficulty: index === 14 ? "Advanced" : index % 3 === 0 ? "Intermediate" : "Mixed",
}));

export const examConfigs: Record<CoreKey, ExamConfig> = {
  core1: {
    core: "core1",
    code: "220-1201",
    label: "Core 1 (220-1201)",
    shortLabel: "Core 1",
    accent: "core1",
    eyebrow: "Hardware · Networking · Cloud",
    description: "Build confidence across mobile devices, networking, hardware, virtualization, and troubleshooting.",
    totalQuestions: 686,
    totalDecks: 23,
    domains: ["Mobile devices", "Networking", "Hardware", "Virtualization & cloud", "Troubleshooting"],
    collections: [
      {
        slug: "dumpsgate-v17-5",
        label: "Dump",
        source: "Dump",
        version: "17.5",
        sourceSlug: "dumpsgate-v17-5",
        description: "450 current 220-1201 questions, divided into focused 30-question practice decks.",
        questionCount: 450,
        decks: numberedDecks(15),
      },
      {
        slug: "curated",
        label: "Curated",
        source: "A+ Prep",
        description: "The original topic-organized Core 1 practice collection.",
        questionCount: 236,
        decks: core1Curated,
        legacy: true,
      },
    ],
  },
  core2: {
    core: "core2",
    code: "220-1202",
    label: "Core 2 (220-1202)",
    shortLabel: "Core 2",
    accent: "core2",
    eyebrow: "Operating Systems · Security · Operations",
    description: "Sharpen operating-system, security, software troubleshooting, and operational-procedure knowledge.",
    totalQuestions: 735,
    totalDecks: 27,
    domains: ["Operating systems", "Security", "Software troubleshooting", "Operational procedures", "Support"],
    collections: [
      {
        slug: "dumpsgate",
        label: "Dump",
        source: "Dump",
        version: "2025",
        sourceSlug: "dumpsgate",
        description: "153 current Core 2 questions with detailed source explanations.",
        questionCount: 153,
        decks: numberedDecks(6, 3),
      },
      {
        slug: "surepass-v5-3",
        label: "Sure",
        source: "Sure",
        version: "5.3",
        sourceSlug: "surepass-v5-3",
        description: "153 current Core 2 questions from the Sure version 5.3 source bank.",
        questionCount: 153,
        decks: numberedDecks(6, 3),
      },
      {
        slug: "legacy-220-1102",
        label: "Legacy 220-1102",
        source: "A+ Prep",
        version: "220-1102",
        description: "The original 429-question Core 2 collection for additional review.",
        questionCount: 429,
        decks: core2Legacy,
        legacy: true,
      },
    ],
  },
};

export function deckHref(core: CoreKey, collection: ExamCollection, deckId: number) {
  const base = `/tests/${core}/quiz/${deckId}`;
  return collection.sourceSlug ? `${base}?source=${collection.sourceSlug}` : base;
}

export function collectionForSource(core: CoreKey, source: string | null) {
  const config = examConfigs[core];
  if (!source) return config.collections.find((collection) => collection.legacy) ?? config.collections[0];
  return config.collections.find((collection) => collection.sourceSlug === source) ?? config.collections[0];
}

export function sourceDisplayName(core: CoreKey, source: string | null) {
  return collectionForSource(core, source).label;
}
