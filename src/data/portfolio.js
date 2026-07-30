export const ABOUT = {
  name: 'Stepan Muradkhanyan',
  tagline: 'Building the future with code',
  description:
    'CS student at UC Santa Cruz passionate about AI, full-stack development, and solving complex problems with elegant code.',
  email: 'smuradkh@gmail.com',
  phone: '(415) 248-6119',
  github: 'https://github.com/stepm01',
  linkedin: 'https://www.linkedin.com/in/stepan-muradkhanyan-675896238/',
  location: 'San Francisco, CA',
};

/*
 * PROJECTS
 * ────────
 * Each project drives three things: the 3D "road" marker (Scene3D.jsx),
 * the card overlay on the home page, and its detail page (ProjectDetail.jsx).
 *
 * To wire up a live demo, set `liveDemo` to the deployed URL. If the host
 * allows being embedded in an iframe, also set `liveEmbeddable: true` and the
 * detail page will render the app inline (with an "Open Live Demo" fallback).
 * Leave `liveDemo` as null to show a placeholder slot you can fill in later.
 */
export const PROJECTS = [
  {
    id: 'transfer-map',
    title: 'TransferMap',
    emoji: '🎓',
    color: '#3b82f6',
    role: 'Full-Stack · CruzHacks 2026',
    year: '2026',
    short: 'AI-assisted UC transfer eligibility verifier, built at CruzHacks 2026.',
    description:
      'A web app that helps California community-college students verify their UC transfer eligibility against official sources. Students enter the courses they have taken and a target major; the tool cross-checks Assist.org and UC requirement pages and returns a clear checklist of what is complete, what is missing, and where the risks are — with every result linked back to its official source. Built in a weekend at CruzHacks 2026.',
    features: [
      'Google sign-in with your school email (Firebase Auth)',
      'Manual course entry or one-click demo transcript loading',
      'Real-time eligibility check against official UC requirements',
      'Source-backed results — every item links to Assist.org or an official UC page',
      'UCSC-themed, responsive UI with smooth animations',
    ],
    highlights: [
      '93% accuracy in identifying missing coursework',
      'Source-backed second opinion — not advice, every result cites its official source',
      'React 18 + Vite + Tailwind front end with Firebase Google authentication',
      'FastAPI + Python backend exposing a clean eligibility-verification API',
    ],
    tech: ['React', 'FastAPI', 'Python', 'Tailwind', 'Firebase'],
    techStack: {
      Frontend: ['React 18', 'Vite', 'Tailwind CSS', 'Firebase Auth', 'Lucide'],
      Backend: ['Python 3.11', 'FastAPI', 'Pydantic', 'SQLAlchemy'],
      Data: ['Assist.org', 'UC requirements'],
    },
    stats: [
      { value: '93%', label: 'Accuracy' },
      { value: 'CruzHacks', label: '2026 Hackathon' },
    ],
    github: 'https://github.com/stepm01/TransferMap',
    liveDemo: null,
    liveEmbeddable: false,
    demoNote: 'Runs locally — React front end + FastAPI backend. See the README for setup.',
  },
  {
    id: 'psview-agent',
    title: 'Engagement Agent',
    emoji: '🤝',
    color: '#8b5cf6',
    role: 'AI Agent · PSVIEW technical test',
    year: '2026',
    short: 'Autonomous recruiting agent that designs its own persona and reasons over a live conversation.',
    description:
      "An autonomous recruiting agent that configures its own personality from a company's context, then reasons through a candidate conversation turn by turn. It follows a perceive → reason → act loop: an LLM classifies the candidate's intent and sentiment, a deterministic, unit-tested Python policy maps that state to a strategy, and the LLM writes the next message strictly in persona — calling a scheduling tool when it decides to propose a meeting. State persists across turns, so behaviour is driven by an evolving model of the conversation, not a single prompt.",
    features: [
      'Self-configuration — designs its own name, voice, values, and boundaries from a company brief',
      'A/B persona morph — the same candidate reply run through two different companies, side by side',
      'Self-critique — reviews its own draft against persona and boundaries, then revises',
      'Schedule tool that produces real "Add to Google Calendar" links (simulated, nothing sent)',
      'Stateless API — full conversation state travels with each request, so it scales horizontally',
    ],
    highlights: [
      'Perceive → reason → act architecture: LLM for language, deterministic Python policy for strategy',
      'Decision policy, schema validation, and JSON parsing covered by pytest — no LLM needed to test',
      'FastAPI + React (Vite) + Framer Motion packaged as a single Docker image',
      'Groq (gpt-oss-120b) via the OpenAI-compatible API — swapping to Claude/GPT is a one-line change',
    ],
    tech: ['FastAPI', 'React', 'Groq', 'Docker'],
    techStack: {
      Backend: ['Python', 'FastAPI', 'Groq LLM', 'pytest'],
      Frontend: ['React', 'Vite', 'Framer Motion'],
      Infra: ['Docker', 'Render'],
    },
    stats: [
      { value: '3-step', label: 'Perceive·Reason·Act' },
      { value: 'Live', label: 'Deployed on Render' },
    ],
    github: 'https://github.com/stepm01/psview-agent',
    liveDemo: 'https://psview-agent.onrender.com',
    // Render's free tier blocks iframe embedding and cold-starts slowly, so we
    // show a polished "Open Live Demo" card instead of a broken embed. If you
    // confirm your host allows framing, flip this to `true` to embed inline.
    liveEmbeddable: false,
    demoNote: "Hosted on Render's free tier — the first load can take ~30s while the instance wakes up.",
  },
  {
    id: 'data-quality-monitor',
    title: 'Data Quality Monitor',
    emoji: '🔎',
    color: '#10b981',
    role: 'Multi-Agent AI · Solo build',
    year: '2026',
    short: 'A multi-agent system that turns any CSV into an AI-powered data-quality report.',
    description:
      'A multi-agent data-quality system: drop in any CSV and three agents collaborate to produce an actionable report. A Collector agent parses the data and computes summary statistics, an Analyzer agent uses LLM reasoning to detect anomalies and classify each by severity, and a Reporter agent formats the findings into a structured report. It also supports a chat mode for asking follow-up questions about your data in natural language. Deployed on Maritime.sh.',
    features: [
      'Sequential Collector → Analyzer → Reporter agent pipeline (CrewAI)',
      'Catches nulls above threshold, statistical outliers (>3σ), negatives, duplicates, and volume spikes',
      'Natural-language chat mode for follow-up questions about your data',
      'Single HTTP endpoint — POST a CSV, get a structured quality report back',
    ],
    highlights: [
      'Three-agent CrewAI pipeline orchestrated sequentially',
      'LLM reasoning (Llama 3.3 70B via Groq) catches anomalies rule-based checks miss',
      'Pandas-driven statistics: nulls, outliers, duplicates, distributions, and volume checks',
      'Deployed as an agent on Maritime.sh with a simple invoke API',
    ],
    tech: ['CrewAI', 'Llama 3.3', 'Groq', 'Pandas'],
    techStack: {
      Agents: ['CrewAI', 'Llama 3.3 70B', 'Groq'],
      Data: ['Python', 'Pandas'],
      Deploy: ['Maritime.sh'],
    },
    stats: [
      { value: '3', label: 'AI Agents' },
      { value: 'CSV → Report', label: 'One call' },
    ],
    github: 'https://github.com/stepm01/maritime-project',
    liveDemo: null,
    liveEmbeddable: false,
    demoNote: 'Deployed on Maritime.sh as an API. Add your invoke URL to `liveDemo` to enable a live demo here.',
  },
  {
    id: 'tesla-demand-pipeline',
    title: 'Tesla Demand Pipeline',
    emoji: '⚙️',
    color: '#f59e0b',
    role: 'Data Engineering · Solo build',
    year: '2026',
    short: 'End-to-end demand-planning pipeline: Apache Airflow + ClickHouse + Claude AI.',
    description:
      'An end-to-end demand-planning data pipeline built with Apache Airflow, ClickHouse, and Claude. It orchestrates three DAGs — ingest and clean raw demand data, run AI-powered data-quality checks, and auto-generate an LLM-ready metadata catalog — then loads everything into a columnar ClickHouse warehouse tuned with partitioning and materialized views. It also ships a ClickHouse → Apache Iceberg migration prototype with a full tradeoff analysis.',
    features: [
      '3 Airflow DAGs with task dependencies, retries, and XCom data passing',
      'AI data-quality checks: Claude analyzes table stats and flags anomalies a null check would miss',
      'Auto-generated semantic metadata catalog any LLM can use as context',
      'ClickHouse schema tuned with monthly partitioning, ordering keys, and materialized views',
      'Apache Iceberg migration demo with a step-by-step plan and risk analysis',
    ],
    highlights: [
      'ETL orchestration across 3 Airflow DAGs with retries and XCom data passing',
      'Claude-powered quality checks that catch anomalies rule-based checks miss',
      'ClickHouse optimizations: partition pruning, ordering keys, SummingMergeTree rollups',
      'ClickHouse → Iceberg migration prototype with a hot/cold data architecture recommendation',
    ],
    tech: ['Airflow', 'ClickHouse', 'Claude', 'Docker'],
    techStack: {
      Orchestration: ['Apache Airflow'],
      Database: ['ClickHouse', 'Apache Iceberg'],
      AI: ['Claude (Anthropic)'],
      Infra: ['Docker Compose', 'MinIO'],
    },
    stats: [
      { value: '3', label: 'Airflow DAGs' },
      { value: 'OLAP', label: 'ClickHouse' },
    ],
    github: 'https://github.com/stepm01/Tesla-demand-pipeline',
    liveDemo: null,
    liveEmbeddable: false,
    demoNote: 'Runs locally via Docker Compose (Airflow + ClickHouse). Screenshots of the DAGs and query output are in the repo.',
  },
  {
    id: 'armenian-whisper',
    title: 'Armenian Whisper',
    emoji: '🗣️',
    color: '#ec4899',
    role: 'ML / Speech · Open research project',
    year: '2025',
    short: 'Armenian speech → English subtitle generator using fine-tuned Whisper.',
    description:
      'An open research project that turns Armenian speech into accurate English subtitles. It pairs OpenAI Whisper with lightweight LoRA fine-tuning and community-curated datasets to improve low-resource Armenian speech recognition, building an end-to-end pipeline: transcription → word-level alignment → translation. The goal is to make Armenian cultural content easier to share, archive, and access.',
    features: [
      'Armenian ASR covering Eastern and Western dialects with LoRA fine-tuning',
      'Word-level subtitle timing via WhisperX alignment',
      'Export to .srt / .vtt, or paste a YouTube URL',
      'FastAPI backend with a Svelte + Vite front-end prototype',
      'Reproducible training and evaluation notebooks (WER, BLEU, latency)',
    ],
    highlights: [
      '15% reduction in Word Error Rate on the Armenian dev split',
      'End-to-end latency under 1.5 seconds',
      'Whisper-small + LoRA fine-tuning via PEFT / Transformers',
      'Faster-Whisper (CTranslate2) inference with WhisperX word-level alignment',
    ],
    tech: ['Whisper', 'PyTorch', 'FastAPI', 'Svelte'],
    techStack: {
      Model: ['OpenAI Whisper', 'LoRA / PEFT', 'NLLB-200'],
      Inference: ['Faster-Whisper', 'WhisperX'],
      Backend: ['Python', 'FastAPI'],
      Frontend: ['Svelte', 'Vite'],
    },
    stats: [
      { value: '-15%', label: 'Word Error Rate' },
      { value: '<1.5s', label: 'Latency' },
    ],
    github: 'https://github.com/stepm01/ArmenianWhisper',
    liveDemo: null,
    liveEmbeddable: false,
    demoNote: 'Research prototype — run the FastAPI backend and Svelte front end locally (see the README).',
  },
  {
    id: 'secret-link',
    title: 'Secret Link',
    emoji: '🔐',
    color: '#06b6d4',
    role: 'Full-Stack · Solo build',
    year: '2024',
    short: 'One-time secret sharing with browser-side end-to-end encryption.',
    description:
      "A full-stack app for sharing one-time secrets. Sensitive text is encrypted in the browser with AES-GCM (the Web Crypto API) before it ever leaves the device, so the server only ever stores ciphertext. Each secret is delivered through a link that self-destructs after a single view.",
    features: [
      'Client-side AES-GCM encryption — the server never sees plaintext',
      'One-time retrieval: secrets are flagged used after the first fetch to prevent replays',
      'Clipboard-friendly UX with automatic copy and a manual fallback',
      'Clean, responsive card UI',
    ],
    highlights: [
      'End-to-end encryption in the browser via the Web Crypto API (AES-GCM)',
      'Single-use links enforced server-side (200 → 410 Gone after retrieval)',
      'React front end + Express API + PostgreSQL storing only ciphertext',
      'Minimal, auditable API surface (store-secret / retrieve-once)',
    ],
    tech: ['React', 'Express', 'PostgreSQL', 'Web Crypto'],
    techStack: {
      Frontend: ['React', 'Web Crypto API'],
      Backend: ['Node.js', 'Express'],
      Database: ['PostgreSQL'],
    },
    stats: [
      { value: 'AES-GCM', label: 'E2E Encrypted' },
      { value: 'One-time', label: 'Self-destruct' },
    ],
    github: 'https://github.com/stepm01/Secret_link',
    liveDemo: null,
    liveEmbeddable: false,
    demoNote: 'Run locally: React client + Express API + PostgreSQL (see the README).',
  },
];

export const EXPERIENCE = [
  {
    id: 'pioneers',
    role: 'Software Project Manager',
    company: 'Pioneers in Engineering',
    location: 'UC Berkeley',
    period: 'Dec 2024 – Jul 2025',
    bullets: [
      'Led a cross-functional team of 15 engineers and designers',
      'Built a live tournament website for high-school robotics competitions',
      'Coordinated frontend (React) and backend (API integration) workflows',
      'Managed 7-month project timeline from recruiting through delivery',
    ],
  },
  {
    id: 'mamble',
    role: 'Software Engineer Intern',
    company: 'Mamble Labs',
    location: 'Yerevan, Armenia',
    period: 'Jul 2022 – Dec 2022',
    bullets: [
      'Developed and launched 3 production web apps with React and Next.js',
      'Improved load speed by 25% through optimization',
      'Reduced support tickets by 30% with Tailwind CSS UI consistency',
      'Refactored legacy API modules to eliminate data-fetching bottlenecks',
    ],
  },
];

export const EDUCATION = [
  {
    degree: 'B.S. Computer Science',
    school: 'University of California, Santa Cruz',
    period: 'Sep 2025 – May 2027',
    gpa: '4.0',
    courses: 'Data Structures & Algorithms, Machine Learning, C Programming',
  },
  {
    degree: 'A.S. Computer Science',
    school: 'City College of San Francisco',
    period: 'Aug 2023 – May 2025',
    gpa: '3.7',
    courses: 'Computer Architecture, Linear Algebra, Java, Discrete Math',
  },
];

export const SKILLS = {
  Languages: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS', 'Java', 'C/C++'],
  'Frameworks & Libraries': ['React.js', 'Next.js', 'Node.js', 'FastAPI', 'Svelte', 'PyTorch', 'CrewAI', 'Tailwind'],
  'Tools & Platforms': ['Git', 'Docker', 'Apache Airflow', 'ClickHouse', 'PostgreSQL', 'Vercel', 'GitLab'],
};
