export type Project = {
  id: string;
  name: string;
  /** Newspaper standfirst — one line, sits under the headline. */
  kicker: string;
  description: string;
  githubUrl: string;
  /** Omitted where a project was never deployed. */
  liveUrl?: string;
  /** Drop a screenshot at this path and it replaces the placeholder. */
  image: string;
};

export const projects: Project[] = [
  {
    id: 'taskflow',
    name: 'TASKFLOW',
    kicker: 'Todo Management Application',
    description:
      'Full-stack Todo Management Application built with Spring Boot, featuring full CRUD REST APIs, JWT-based authentication, and ownership-verified user-specific data access via Spring Security and Spring Data JPA/Hibernate. Includes soft delete and restore, file attachment support, bulk CSV/Excel import, and a Kanban-style frontend for task organization. Uses PostgreSQL for production data, documented with Swagger, and tested via Postman.',
    githubUrl: 'https://github.com/reachsaghanamuthu/TaskFlow',
    // Ran locally only — deliberately no live demo.
    image: '/images/taskflow-ui.png',
  },
  {
    id: 'investwise-ai',
    name: 'INVESTWISE AI',
    kicker: 'FinTech Intelligence',
    description:
      'An AI-powered fintech application focused on smart financial insights and investment guidance, featuring an interactive, user-friendly web interface with AI-based features for financial analysis and decision support.',
    githubUrl: 'https://github.com/reachsaghanamuthu/InvestWise-AI',
    liveUrl: 'https://investwiseai.netlify.app/',
    image: '/images/investwise-ui.png',
  },
  {
    id: 'healx-ai',
    name: 'HEALX AI',
    kicker: 'Healthcare Assistant',
    description:
      'An AI-powered healthcare assistance platform focused on providing smart health support and symptom-based guidance, with a responsive, user-friendly interface designed to enhance accessibility and healthcare awareness.',
    githubUrl: 'https://github.com/reachsaghanamuthu/HealX-AI',
    liveUrl: 'https://healxai.netlify.app/',
    image: '/images/healx-ui.png',
  },
  {
    id: 'lumina-rag-bot',
    name: 'LUMINA RAG BOT',
    kicker: 'Local-First RAG Assistant',
    description:
      'A RAG chatbot for intelligent Q&A over research papers. Built with LangChain and LLaMA 3.2 running locally via Ollama, ChromaDB for vector search, and a Chainlit UI — retrieving precise answers from documents rather than generating from memory.',
    githubUrl: 'https://github.com/reachsaghanamuthu/lumina-rag-bot',
    image: '/images/lumina-ui.png',
  },
];