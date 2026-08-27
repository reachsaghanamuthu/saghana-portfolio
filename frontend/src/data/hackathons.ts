export type Hackathon = {
  id: string;
  /** The event as the certificate names it. */
  event: string;
  /** The host institution or programme. */
  host: string;
  /** The wider symposium or summit it sat inside, where there was one. */
  context?: string;
  /** Left undefined where the certificate does not state one — never guessed. */
  dates?: string;
  role: string;
  /** The award or citation, where the certificate carries one. */
  award?: string;
  note: string;
  fileUrl: string;
};

/*
 * Transcribed from the certificates in /public/certificates. Every field here
 * appears on the document itself; where a certificate omits a date, the field
 * is left out rather than inferred from the event's usual calendar slot.
 */
export const hackathons: Hackathon[] = [
  {
    id: 'nasa-space-apps',
    event: 'NASA International Space Apps Challenge',
    host: 'NASA',
    context: '2025 global edition',
    dates: 'October 4–5, 2025',
    role: 'Participant',
    award: 'Galactic Problem Solver',
    note: 'Recognised for outstanding participation and efforts to address challenges we face on Earth and in space.',
    fileUrl: '/certificates/NASA Space Apps Challenge.pdf',
  },
  {
    id: 'thooral-infinitum',
    event: 'Thooral Hackathon',
    host: 'PSG College of Technology',
    context: 'Infinitum 2026 · Computer Science & Engineering Association',
    dates: 'February 13–14, 2026',
    role: 'Participant',
    note: 'A national-level technical symposium hosted by the CSEA at PSG College of Technology.',
    fileUrl: '/certificates/Thooral Hackathon Infitinium 2026.pdf',
  },
  {
    id: 'iitm-shaastra',
    event: 'Digital Address DPI Innovation Hackathon',
    host: 'Indian Institute of Technology, Madras',
    context: 'Shaastra 2026 · India Post · Digital Governance Summit',
    /* The certificate states no date. */
    role: 'Participant',
    note: 'Held under the Digital Governance Summit at Shaastra, IIT Madras, in partnership with India Post.',
    fileUrl: '/certificates/IITM Hackathon.pdf',
  },
];