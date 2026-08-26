export const personalData = {
  name: "Aman Singh Negi",
  role: "Full-Stack Developer",
  status: "Available for Full-Time SDE Opportunities",
  email: "amanyt27082005@gmail.com",
  summary:
    "Full-Stack Developer building robust, end-to-end web applications with React, Node.js, Express, and MongoDB. Experienced in designing RESTful APIs, implementing JWT-based authentication, and working across the stack from responsive user interfaces to database schema design.",
  resumePath: "/Resume.pdf",
  profilePhoto: "/profile.jpg",
};

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/amannegi001",
    handle: "@amannegi001",
    priority: 1,
    featured: true,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/aman-negi-08a166386/",
    handle: "Aman-Negi",
    priority: 2,
    featured: true,
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/aman_negi_001/",
    handle: "aman_negi_001",
    priority: 3,
    featured: true,
  },
  {
    name: "X",
    url: "https://x.com/negiaman001",
    handle: "@negiaman001",
    priority: 4,
    featured: false,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/aman.negi.001/",
    handle: "@aman.negi.001",
    priority: 5,
    featured: false,
  },
];

export const projects = [
  {
    id: "aifinity",
    title: "AIFinity",
    badge: "In Progress · Team Project",
    isTeam: true,
    inProgress: true,
    featured: true,
    tagline: "AI-Powered Learning-Gap & Career-Readiness Platform",
    overview:
      "AIFinity is an AI-powered platform engineered to help students understand why they make mistakes, diagnose root conceptual weaknesses, and build personalized roadmaps toward target career roles.",
    repositoryUrl: "https://github.com/Ishika-Gaur/Aifinity-hacksynergy",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Vite", "RESTful APIs"],
    architectureHighlights: [
      {
        title: "ConceptRoot AI",
        desc: "Root-cause diagnostics that isolate conceptual weaknesses behind incorrect answers and recommend targeted prerequisite revisions.",
      },
      {
        title: "MistakeMap AI",
        desc: "Pattern tracking engine that identifies recurring mistakes, accuracy trends, and knowledge gaps across multiple assessments.",
      },
      {
        title: "SkillGap AI",
        desc: "Career alignment module mapping student profiles, skills, and assessments against industry benchmarks to generate personalized roadmaps.",
      },
      {
        title: "Assessment & Admin Ecosystem",
        desc: "Full management suite for admin question staging, attempt evaluation, and student progress telemetry.",
      },
    ],
  },
  {
    id: "devtinder",
    title: "DevTinder",
    badge: "Completed Engineering Project",
    isTeam: false,
    inProgress: false,
    featured: false,
    tagline: "Developer Networking Platform Backend & API Architecture",
    overview:
      "Engineered a production-ready RESTful backend for a developer networking application, creating 11 secure API endpoints covering authentication, profile management, and matchmaking connection workflows.",
    repositoryUrl: "https://github.com/amannegi001/devTinder",
    technologies: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "bcrypt"],
    architectureHighlights: [
      {
        title: "11 RESTful Endpoints",
        desc: "Designed and implemented robust API routes covering auth, user feeds, profile modifications, and connection states.",
      },
      {
        title: "JWT & bcrypt Security",
        desc: "Enforced stateless JWT authentication with bcrypt password hashing, input validation, and protected route middleware.",
      },
      {
        title: "Feed & Connection Engine",
        desc: "Engineered interested/ignore and accept/reject flows with duplicate-request prevention and paginated MongoDB queries.",
      },
    ],
  },
  {
    id: "bankist",
    title: "Bankist App",
    badge: "Completed Project",
    isTeam: false,
    inProgress: false,
    featured: false,
    tagline: "Interactive Banking Simulation & Event-Driven Engine",
    overview:
      "Developed a responsive banking application using vanilla JavaScript and DOM manipulation, modeling simulated banking transactions, loan workflows, and session state lifecycles.",
    repositoryUrl: "https://github.com/amannegi001/bankist-app",
    technologies: ["JavaScript", "DOM Manipulation", "HTML5", "CSS3"],
    architectureHighlights: [
      {
        title: "Financial Workflows",
        desc: "Built simulated credential authentication, dynamic peer-to-peer transfers, and instant loan request calculations.",
      },
      {
        title: "Functional Data Processing",
        desc: "Leveraged array methods (map, filter, reduce) for real-time balance computation, transaction history, and date formatting.",
      },
      {
        title: "Session Timer & State",
        desc: "Implemented an auto-logout security timer and event-driven DOM mutations for a realistic user session experience.",
      },
    ],
  },
];

export const skillsData = [
  {
    category: "Languages",
    skills: ["JavaScript", "C++", "Python"],
  },
  {
    category: "Frontend",
    skills: ["React.js", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js"],
  },
  {
    category: "Database",
    skills: ["MongoDB", "Supabase"],
  },
  {
    category: "Tools & Technologies",
    skills: ["Git", "GitHub", "Postman", "VS Code"],
  },

];

export const educationData = {
  degree: "Bachelor of Technology in Computer Science & Engineering",
  institution: "Kothiwal Institute of Technology and Professional Studies",
  cgpa: "7.5",
  graduation: "Expected Graduation: 2027",
  statusNote: "Final Year · Prepared for Full-Time SDE Opportunities",
};

export const certificationsData = [
  {
    title: "Hacksynergy 2026 – Hackathon Participant",
    organization: "National-Level 24-Hours Hackathon",
    year: "2026",
    badgeText: "National Hackathon",
    hasCertificate: true,
  },
  {
    title: "AI Fluency: Framework & Foundations",
    organization: "Anthropic Academy",
    year: "2026",
    badgeText: "Anthropic Certified",
    hasCertificate: true,
  },
];

export const personalInterests = [
  { name: "Problem Solving", desc: "Data structures, algorithms & logical optimization" },
  { name: "Photography", desc: "Visual framing, composition & light capture" },
  { name: "Cricket", desc: "Strategy, team coordination & athletic focus" },
];
