export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  location?: string;
  dates: string;
  bullets: string[];
  /** Completion certificate for the placement, where one was issued. */
  certificateUrl?: string;
};

export const experience: ExperienceEntry[] = [
  {
    id: 'codingmart',
    role: 'Web Developer Intern',
    company: 'Codingmart Technologies',
    dates: 'Jun 2026 – Jul 2026',
    /* The real completion certificate, already in /public/certificates —
       no placeholder needed. */
    certificateUrl: '/certificates/Codingmart Technologies Completion Certificate.pdf',
    bullets: [
      'Built TaskFlow, a full-stack Todo Management Application with Spring Boot, implementing full CRUD REST APIs, JWT-based authentication, and ownership-verified, user-specific data access via Spring Security and Spring Data JPA/Hibernate.',
      'Added soft delete & restore, file attachment support, and bulk CSV/Excel import, plus a Kanban-style frontend for task organization.',
      'Used PostgreSQL for production data (H2 for dev/testing), documented APIs with Swagger, tested endpoints in Postman, and managed version control through Git/GitHub.',
    ],
  },
  {
    id: 'inamigos',
    role: 'AI Content Writer Intern',
    company: 'InAmigos Foundation',
    location: 'Coimbatore, Tamil Nadu',
    dates: 'Apr 2026 – May 2026',
    certificateUrl: '/certificates/InAmigos Completion Certificate.pdf',
    bullets: [
      'Contributed to AI-driven content creation, research, and digital media development.',
      'Assisted in creating engaging content and optimizing AI-generated outputs.',
      'Supported innovative AI-based communication strategies.',
    ],
  },
];

export const education = {
  school: 'SNS College of Technology',
  degree: 'B.Tech, Artificial Intelligence & Data Science',
  dates: '2025–2029',
};