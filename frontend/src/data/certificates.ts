export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  /** Omitted where the certificate does not state one. */
  date?: string;
  /** Omitted until the file is in /public/certificates — the card then
      renders without a link rather than pointing at a 404. */
  fileUrl?: string;
  fileType: 'image' | 'pdf';
};

export const certificates: Certificate[] = [
  {
    id: 'ibm-design-thinking',
    title: 'IBM Certification in Enterprise Design Thinking',
    issuer: 'IBM',
    date: 'Oct 2025',
    fileUrl: '/certificates/Enterprise Design Thinking Practitioner Badge.pdf',
    fileType: 'pdf',
  },
  {
    id: 'ibm-ai-fundamentals',
    title: 'IBM Certification in Artificial Intelligence Fundamentals',
    issuer: 'IBM',
    date: 'Oct 2025',
    fileUrl: '/certificates/IBM AI Fundamentals.pdf',
    fileType: 'pdf',
  },
  {
    id: 'aws-genai',
    title: 'AWS Generative AI Foundations',
    issuer: 'AWS',
    date: '2026',
    fileUrl: '/certificates/AWS Generative AI Foundations.pdf',
    fileType: 'pdf',
  },
  /* ---- Added from the updated résumé. Neither states a date. ---- */
  {
    id: 'av-ai-accelerator',
    title: 'AI Accelerator Program on Pinnacle Plus Program',
    issuer: 'Analytics Vidhya',
    fileUrl: '/certificates/Certificate_pinnacle-plus.webp',
    fileType: 'image',
  },
  {
    id: 'gen-ai-professional',
    title: 'Gen AI Professional',
    issuer: 'Western State University, California',
    fileUrl: '/certificates/Western State University California Gen AI Proffesional.png',
    fileType: 'image',
  },
];
