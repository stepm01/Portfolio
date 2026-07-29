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

export const PROJECTS = [
  {
    id: 'transfer-map',
    title: 'Transfer Map',
    emoji: '🎓',
    short: 'AI platform streamlining the UC transfer process with 93% accuracy.',
    description:
      'An AI-driven platform that helps community college students navigate the complex UC transfer process. The system analyzes transcripts and identifies missing coursework, achieving 93% accuracy.',
    tech: ['Python', 'AI/ML', 'API Integration'],
    highlights: [
      '93% accuracy in identifying missing coursework',
      'Automated transcript analysis pipeline',
      'Integration with UC admissions requirements database',
      'Served hundreds of community college students',
    ],
    github: 'https://github.com/stepm01',
    color: '#3b82f6',
  },
  {
    id: 'armenian-whisper',
    title: 'Armenian Whisper Translator',
    emoji: '🗣️',
    short: 'Real-time Armenian-to-English translation under 1.5 seconds.',
    description:
      'A real-time speech translation tool using OpenAI Whisper, fine-tuned for Armenian. Delivers low-latency audio transcription and translation with significantly reduced word error rate.',
    tech: ['Python', 'Streamlit', 'OpenAI Whisper'],
    highlights: [
      '15% reduction in Word Error Rate',
      'Latency under 1.5 seconds end-to-end',
      'Streamlit web interface for live usage',
      'Custom fine-tuning on Armenian speech data',
    ],
    github: 'https://github.com/stepm01',
    color: '#8b5cf6',
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
  'Frameworks & Libraries': ['React.js', 'Next.js', 'Node.js', 'PyTorch', 'Pandas', 'Tailwind', 'FastAPI'],
  'Tools & Platforms': ['Git', 'GitHub', 'Docker', 'GitLab', 'Atlassian'],
};
