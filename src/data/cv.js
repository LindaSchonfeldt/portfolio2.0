// CV data, sourced from public/pdfs/linda.schonfeldt_cv.pdf
// Dates use 'YYYY-MM' for sorting; `period` is the display string.

export const cvPdf = '/pdfs/linda.schonfeldt_cv.pdf'

export const experience = [
  {
    id: 'billig-bokforing',
    type: 'work',
    role: 'Frontend Developer',
    employmentType: 'Freelance',
    organization: 'Billig Bokföring',
    location: 'Remote',
    start: '2025-11',
    end: '2025-12',
    period: 'November 2025 – December 2025',
    tech: ['React', 'TypeScript', 'Chakra UI'],
    highlights: [
      'Built a responsive website from scratch for an accounting firm serving Swedish small businesses, using React, TypeScript and Chakra UI',
      'Developed an order form with real-time price calculation and automatic discount logic',
      'Structured the site for clarity and SEO, with transparent pricing and easy navigation'
    ]
  },
  {
    id: 'fixmeapp',
    type: 'work',
    role: 'Frontend Developer',
    employmentType: 'Internship',
    organization: 'FIXMEAPP (via Technigo)',
    location: 'Remote',
    start: '2025-09',
    end: '2025-10',
    period: 'September 2025 – October 2025',
    tech: ['React', 'Next.js', 'Tailwind CSS'],
    highlights: [
      'Implemented and refined reusable UI components with React, Next.js and Tailwind CSS',
      'Worked in short feedback loops to improve usability and consistency',
      'Contributed to a more consistent and maintainable frontend in an early-stage startup'
    ]
  },
  {
    id: 'univid',
    type: 'work',
    role: 'UX/UI Designer',
    employmentType: 'Internship',
    organization: 'Univid',
    location: 'Stockholm',
    start: '2023-11',
    end: '2024-05',
    period: 'November 2023 – May 2024',
    tech: ['Figma', 'User interviews', 'Usability testing', 'Prototyping'],
    highlights: [
      'Designed user-centered prototypes for a B2B webinar platform',
      'Planned and conducted user interviews and usability tests to inform product decisions',
      'Worked closely with developers in an agile, interdisciplinary team to deliver designs ready for implementation'
    ]
  }
]

export const education = [
  {
    id: 'technigo',
    type: 'education',
    role: 'Web Development Bootcamp',
    organization: 'Technigo',
    start: '2025-01',
    end: '2025-10',
    period: 'January 2025 – October 2025',
    tech: ['JavaScript (ES6+)', 'React', 'Node.js'],
    description:
      'JavaScript, React and Node.js, with a focus on accessible, user-friendly solutions.'
  },
  {
    id: 'stockholm-university',
    type: 'education',
    role: "Bachelor's Degree, Computer and Systems Sciences",
    organization: 'Stockholm University',
    start: '2021-08',
    end: '2024-06',
    period: '2021 – 2024',
    tech: [],
    description:
      'Specialization in Interaction Design. Thesis on how dark patterns in social media apps undermine user autonomy.'
  }
]

export const additionalExperience = [
  {
    id: 'olssons',
    type: 'other',
    role: 'Gardener',
    organization: 'Olssons Trädgårdstjänst',
    location: 'Stockholm',
    start: '2026-06',
    end: '2026-07',
    period: 'June 2026 – July 2026',
    tech: [],
    description:
      'Maintained outdoor areas for several housing associations, including pruning, weeding and general plant care.'
  },
  {
    id: 'mind',
    type: 'volunteer',
    role: 'Volunteer',
    organization: 'Mind',
    location: 'Remote',
    start: '2023-10',
    end: '2024-10',
    period: 'October 2023 – October 2024',
    tech: [],
    description:
      'Chat-based mental health support for young people, with a focus on empathy and active listening.'
  }
]

export const skills = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      'JavaScript (ES6+)',
      'TypeScript',
      'React',
      'Next.js',
      'HTML',
      'CSS',
      'Tailwind CSS',
      'Chakra UI',
      'Styled Components',
      'Zustand',
      'Vite'
    ]
  },
  {
    id: 'backend',
    label: 'Backend & tools',
    items: [
      'Node.js',
      'Express',
      'REST APIs',
      'Supabase',
      'MongoDB',
      'Git/GitHub'
    ]
  },
  {
    id: 'design',
    label: 'UX & design',
    items: [
      'Figma',
      'User interviews',
      'Usability testing',
      'User flows',
      'Wireframing',
      'Prototyping',
      'Accessibility (WCAG)'
    ]
  },
  {
    id: 'ways-of-working',
    label: 'Ways of working',
    items: ['Agile', 'Cross-functional collaboration', 'Workshop facilitation']
  },
  {
    id: 'ai',
    label: 'AI tools',
    items: [
      'GitHub Copilot/Claude Code for code generation',
      'ChatGPT/Claude for research and documentation'
    ]
  }
]

// All entries in one list, oldest first, so the timeline trail walks
// forward in time
export const timeline = [
  ...experience,
  ...education,
  ...additionalExperience
].sort((a, b) => a.start.localeCompare(b.start))
