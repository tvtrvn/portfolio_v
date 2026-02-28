import type { SiteData } from '../types/content';

// All portfolio content lives here. Update this file to customize the site.
export const siteData: SiteData = {
  name: 'Thinh Tran',
  role: 'Computer Science Student',
  location: 'Toronto, Ontario, Canada',
  heroTagline: 'Building thoughtful experiences with code.',
  heroIntro:
    "I'm a computer science student who enjoys turning ideas into reliable, user-friendly software. I focus on clean code, strong fundamentals, and learning something new with every project.",
  heroHighlights: [
    {
      label: 'Interests',
      items: ['Web development', 'Systems', 'UI engineering', 'Cloud deployment', 'Software Engineering']
    },
    {
      label: 'Currently learning',
      items: ['Algorithms', 'Design systems', 'Cloud deployment', 'AI/ML', 'Web Development']
    },
    {
      label: 'Languages Spoken',
      items: ['English(Native)', 'French(Fluent)', 'Vietnamese(Advanced)']
    }
  ],
  about: {
    paragraphs: [
      "I'm a computer science student with a strong interest in web development and developer tools. I enjoy understanding how things work under the hood and writing code that is both clean and practical.",
      'In my projects, I like to explore real-world problems: building responsive UIs, designing APIs, and deploying applications. I care about good UX, accessibility, and maintainable codebases.',
      'Outside of classes, I learn by shipping projects, contributing to open source when I can, and reading about software architecture, distributed systems, and interface design.'
    ]
  },
  skills: {
    languages: ['Python', 'C++', 'Java', 'SQL', 'NoSQL', 'TypeScript', 'JavaScript'],
    frameworks: ['React', 'Node.js', 'Express', 'Vite', 'Tailwind CSS', 'Next.js', 'Agile Methodologies'],
    tools: ['Git & GitHub', 'VS Code', 'Linux', 'Figma', 'Google Cloud Platform', 'Trello']
  },
  experience: [
    {
      id: 'exp-1',
      role: 'Computer Science Student',
      company: 'York University',
      location: 'Toronto, Ontario, Canada',
      start: '2024',
      end: 'Present',
      description:
        'Studying core CS topics including data structures, algorithms, operating systems, and software engineering while building side projects to apply concepts in practice. Relevant Coursework: Advanced Object-Oriented Programming, Data Structures & Algorithms, Computer Architecture& Organization, Software Tools, Database Management Systems, Software Design, Calculus I–II, Elementary Probability,Linear Algebra.'

    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Music Video Analytics App',
      description:
        'A web app that tracks the top most viewed music videos on YouTube in the Vietnam region.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'YouTube API (REST)', 'Vercel'],
      links: [
        { label: 'Live demo', href: 'https://first-repo-live.vercel.app/' },
        { label: 'GitHub', href: 'https://github.com/tvtrvn/first-repo-live' }
      ],
      highlight: 'Includes interactive hover to preview and a responsive dashboard layout.'
    },
    {
      id: 'proj-2',
      title: 'Algorithm Visualizer (In Progress)',
      description:
        'Interactive visualizations for classic algorithms such as sorting and pathfinding, built to strengthen CS fundamentals and help others learn.',
      tech: ['React', 'TypeScript', 'Canvas', 'Algorithms'],
      links: [],
      highlight: 'In Progress'
    },
    {
      id: 'proj-3',
      title: 'Personal Portfolio Website',
      description:
        'This current portfolio site, built to practice modern frontend tooling, routing, and deployment pipelines.',
      tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Netlify'],
      links: [
        { label: 'Live demo', href: 'https://example.com/portfolio-v1' },
        { label: 'GitHub', href: 'https://github.com/tvtrvn/portfolio-v1' }
      ],
      highlight: 'Deployed with Vite and Netlify. Uses React Router for navigation and Tailwind CSS for styling. Includes a contact form and a resume page.'
    }
  ],
  contact: {
    email: 'thinhvt99@gmail.com',
    github: 'https://github.com/tvtrvn',
    linkedin: 'https://www.linkedin.com/in/thinh-tran-111/'
  },
  resume: {
    fileName: 'resume.pdf',
    summary: [
      'B.Sc. in Computer Science (expected 2027) with coursework in data structures, algorithms, operating systems, databases, and software engineering.',
      'Experience building full-stack projects with React, TypeScript, Node.js, and SQL/NoSQL databases.',
      'Strong focus on code quality, version control, and collaborative workflows using Git and GitHub.'
    ]
  },
  seo: {
    title: 'Thinh Tran — CS Student Portfolio',
    description: 'Portfolio of a computer science student showcasing projects, skills, resume, and contact information.'
  }
};

