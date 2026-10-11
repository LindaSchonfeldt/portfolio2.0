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
    organization: 'FIXMEAPP',
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
    tech: ['Interaction design', 'UX research'],
    // A highlight can be an object with `details` to nest sub-points under it
    highlights: [
      'Specialized in Interaction Design',
      {
        text: 'Thesis on how dark patterns in social media apps undermine user autonomy',
        details: [
          'Audited nine widely used social media apps and identified 34 dark patterns, 13 of them newly defined',
          'Analyzed the findings with thematic analysis, guided by an established dark pattern ontology'
        ]
      }
    ],
    // `projectId` ties a link to a case study, so it stays disabled while
    // that project is listed as under construction in siteConfig
    links: [
      {
        label: 'Read the case study',
        url: '/projects/exploitation-by-design',
        projectId: 2
      },
      {
        label: 'Download thesis (Swedish, PDF)',
        url: '/pdfs/exploitation-by-design(SE).pdf'
      }
    ]
  }
]

// `branch: true` puts an entry on a side trail off the main timeline trail
export const additionalExperience = [
  {
    id: 'olssons',
    type: 'other',
    branch: true,
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
    branch: true,
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

// Temporary last step: a placeholder for the next role, always at the end
export const nextStep = {
  id: 'next-step',
  type: 'next',
  role: 'Your team?',
  organization: 'Position open',
  period: 'Next up',
  tech: [],
  description:
    "This spot is saved for my next frontend role, ideally somewhere that makes people's everyday lives a little better. If that sounds like your team, let's fill it in together.",
  links: [{ label: 'Get in touch', url: '/contact' }]
}

// All entries in one list, oldest first, so the timeline trail walks
// forward in time
export const timeline = [
  ...[...experience, ...education, ...additionalExperience].sort((a, b) =>
    a.start.localeCompare(b.start)
  ),
  nextStep
]
