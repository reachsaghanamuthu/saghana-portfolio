/*
 * Single source of truth for the masthead, navigation and contact details.
 * Everything the header, ticker and footer render comes from here.
 */

export const site = {
  masthead: 'The Saghana Chronicle',
  name: 'Saghana Muthukumaran',
  /* Kept short — it sits on one line beside the masthead. */
  role: 'AI & Data Science',
  location: 'Coimbatore, India',
  established: '2025',
  availability: 'Available for internships',
  email: 'reachsaghana.muthu@gmail.com',
  github: 'https://github.com/reachsaghanamuthu',
  /* An empty string hides the link. */
  linkedin: 'https://linkedin.com/in/saghana-muthukumaran',
  /* Lives alongside the certificates — public/resume.pdf no longer exists.
     The space is encoded so the href is a valid URL. */
  resume: '/certificates/Saghana%20Resume.pdf',
};

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'contact', label: 'Contact' },
];

/* The standing bulletin that runs under the masthead. */
export const tickerItems = [
  'Available for internships',
  'B.Tech in Artificial Intelligence & Data Science',
  'Full-stack engineering · Spring Boot · React',
  'AI systems and applied machine learning',
  'Four projects shipped',
  'Based in Coimbatore, India',
];