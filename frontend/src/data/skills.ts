export type SkillCategory = {
  label: string;
  /** The line printed under the category heading in the diary. */
  note: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    label: 'Programming',
    note: 'The two languages everything else is built on.',
    skills: ['Java', 'Python'],
  },
  {
    label: 'Backend & Frameworks',
    note: 'The stack behind TaskFlow and the web applications.',
    skills: [
      'Spring Boot',
      'Spring Security',
      'Spring Data JPA / Hibernate',
      'REST APIs',
      'JWT',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Vite',
    ],
  },
  {
    label: 'AI Tools & Platforms',
    note: 'Where the AI work actually happens.',
    skills: [
      'n8n',
      'Claude',
      'Google AI Studio',
      'Antigravity',
      'NotebookLM',
      'LangChain',
      'ChromaDB',
      'Ollama',
      'Chainlit',
      'LLaMA',
    ],
  },
  {
    label: 'Dev Tools',
    note: 'Build, test, ship, repeat.',
    skills: [
      'Git & GitHub',
      'Vercel',
      'Docker',
      'Postman',
      'Swagger',
      'Maven',
      'npm',
      'pip',
      'PostgreSQL',
      'Netlify',
    ],
  },
];

/* Transcribed from the résumé. These sit in the diary rather than in About,
   where they would read as filler between the profile and the numbers. */
export const languages = [
  { name: 'English', level: 'Proficient' },
  { name: 'Tamil', level: 'Native' },
];

export const interests = [
  'Generative & Agentic AI',
  'Web Development',
  'Problem Solving',
  'Automation',
  'Open-Source Contributions',
];

export const hobbies = ['Singing', 'Violin'];

export const allSkills = skillCategories.flatMap((category) => category.skills);