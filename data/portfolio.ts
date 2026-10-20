export interface ProjectScreenshot {
  title: string;
  image: string;
  caption?: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  category: 'fullstack' | 'webapps';
  featured: boolean;
  image: string;
  techStack: string[];
  problem: string;
  solution: string;
  keyFeatures: string[];
  challenges: string[];
  learnings: string[];
  githubUrl: string;
  liveUrl?: string;
  screenshots?: ProjectScreenshot[];
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number; icon: string }[];
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  type: 'education' | 'achievement' | 'certification';
  highlights?: string[];
}

export const PERSONAL_INFO = {
  name: 'Sandesh',
  shortName: 'Sandesh Hiremath',
  initials: 'SH',
  brandLogoText: 'CodeHomies',
  logoUrl: '/logo.png',
  title: 'Full Stack Developer (Fresher) | MERN & Java Spring Boot',
  roles: [
    'Full Stack Developer',
    'Java & Spring Boot Developer',
  ],
  location: 'Pune, Maharashtra, India',
  email: 'hiremathsandesh14@gmail.com',
  phone: '+91-9890154604',
  bio: 'Full-Stack Developer & Enthusiast in MERN stack, Java Spring Boot, and RESTful API development. Passionate about building clean, high-performance web applications and solving real-world engineering problems.',
  availability: 'Available for Full-Time Roles & Internships',
  education: 'Master in Computer Application (MCA)',
  socialLinks: {
    github: 'https://github.com/CommitWithSandy',
    linkedin: 'https://linkedin.com/in/sandesh-hiremath/',
    email: 'mailto:hiremathsandesh14@gmail.com',
    phone: 'tel:+919890154604',
    resumePdf: '/resume.pdf'
  },
  stats: {
    yearsExp: 'Fresher / 2025 Grad',
    projectsCompleted: '4',
    clientSatisfaction: '100%'
  }
};

export const PROJECTS: Project[] = [
  {
    slug: 'gaming-ecommerce-platform',
    name: 'Gaming E-Commerce Platform',
    tagline: 'Full-stack gaming e-commerce platform with Spring Boot REST API, MySQL database, and Admin Inventory Dashboard.',
    category: 'fullstack',
    featured: true,
    image: '/assets/project1.jpg',
    techStack: ['Java', 'Spring Boot', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
    problem: 'Gamers and store managers lacked an integrated platform to browse catalog items, perform checkout, and track real-time inventory and multi-stage order statuses.',
    solution: 'Engineered a scalable full-stack application leveraging Java Spring Boot for business logic and MySQL for persistent order and product management.',
    keyFeatures: [
      'User Authentication & Registration with session handling',
      'Category-based product search and shopping cart workflow',
      'Full Admin Dashboard to add, edit, and delete inventory items',
      'Multi-status order tracking (Pending, Confirmed, Shipped, Delivered, Canceled)'
    ],
    challenges: [
      'Managing relational database transactions across product orders and inventory count updates',
      'Designing clean REST API endpoints for seamless frontend integration'
    ],
    learnings: [
      'Mastered Spring Boot MVC architecture and Hibernate ORM mappings',
      'Implemented secure user authentication and error-handling middleware'
    ],
    githubUrl: 'https://github.com/CommitWithSandy/S-S-GearZone-Website.git',
    // liveUrl: 'https://github.com/CommitWithSandy/S-S-GearZone-Website.git'
  },
  {
    slug: 'expense-tracker',
    name: 'Expense  Tracker',
    tagline: 'An interactive, responsive financial management web app built with React 18, Vite, and JavaScript for real-time income, expense, category budget, and cashflow tracking.',
    category: 'webapps',
    featured: true,
    image: '/assets/project2.png',
    techStack: ['React 18', 'Vite', 'JavaScript (ES6+)', 'Lucide React', 'Canvas Confetti', 'CSS3', 'HTML5'],
    problem: 'Individuals struggle with manual transaction entry friction, fragmented expense tracking, and lack of real-time category budget feedback and cashflow visualizations.',
    solution: 'Engineered a modern SaaS financial management dashboard leveraging React 18 hooks architecture (useState, useEffect, useMemo, useCallback), mock async API integration, category budget caps, and canvas-confetti income celebration animations.',
    keyFeatures: [
      'KPI Financial Summary Cards: Instant insights into Net Balance, Total Income, Total Expenses, Savings Rate %, and overall Budget Cap progress.',
      'Global Month Filter & Category Budget Manager: Filter all dashboard analytics by month and set category budget limits with real-time percentage tracking.',
      'Advanced Transaction Management & Quick Presets: Modal form with quick transaction presets, multi-field search, category & type filters, and date/amount sorting.',
      'Analytics & Micro-Animations: Visual category expense distribution charts, monthly cashflow bar comparisons, and income celebration confetti animations.'
    ],
    challenges: [
      'Preventing expensive component re-renders during high-frequency transaction filtering by optimizing React 18 useMemo and useCallback memoization pipelines.',
      'Structuring a modular client-side state architecture with mock async API synchronization and dynamic toast feedback.'
    ],
    learnings: [
      'Mastered React 18 performance optimization (useMemo, useCallback, React.memo) and custom React hooks patterns.',
      'Built responsive SaaS dark mode financial dashboard layouts using vanilla CSS variables and Lucide React icons.'
    ],
    githubUrl: 'https://github.com/CommitWithSandy/Expense-Tracker.git',
    liveUrl: 'https://expense-tracker-1-r1mr.onrender.com/'
  },
  {
    slug: 'resume-information-extractor',
    name: 'Resume Information Extractor',
    tagline: 'Modern, enterprise-grade Applicant Tracking System (ATS) & Resume Information Extractor built with Spring Boot 3, MySQL 8, React 18, and Vite.',
    category: 'fullstack',
    featured: true,
    image: '/assets/project3.png',
    techStack: ['Java 17', 'Spring Boot 3', 'MySQL 8', 'React 18', 'Vite', 'Maven', 'REST API'],
    problem: 'Recruiters & HR systems struggle with multi-format resume parsing (Canva, LinkedIn, Europass, Word, PDFs) resulting in inaccurate data extraction and manual data entry friction.',
    solution: 'Engineered an enterprise-grade ATS resume parser with a format-independent parsing engine (Apache PDFBox & POI), automated multi-project splitting rules, and user-isolated candidate record management.',
    keyFeatures: [
      'Format-Independent Resume Parsing Engine: Universal support for Canva, LinkedIn, Europass, Word, Overleaf, Naukri, and PDF/DOCX layouts without hallucinating dummy values.',
      'Multi-Project Splitting Engine: Automatic project boundary detection using regex rules, dates, bullet titles, and inline headers into isolated card views.',
      'User Authentication & Data Isolation: BCrypt password encryption with candidate records linked via MySQL relational foreign keys.',
      'Modern Pixel-Perfect ATS UI/UX: Interactive drag & drop upload box on dashboard, candidate directory counters, and multi-field search filters.'
    ],
    challenges: [
      'Structuring deterministic regex rules and layout parsers to extract skills and project boundaries across diverse template formats without hallucinations.',
      'Enforcing strict candidate data isolation across multi-user sessions with Spring Security and MySQL relational foreign keys.'
    ],
    learnings: [
      'Mastered Apache PDFBox & POI document parsing, Spring Boot 3 security integration, and relational database schema design.',
      'Built high-performance React 18 frontend with Vite and responsive SaaS UI component architecture.'
    ],
    githubUrl: 'https://github.com/CommitWithSandy/Resume-Information-Extractor.git',
    // liveUrl: 'https://github.com/CommitWithSandy'
  },
  {
    slug: 'pulsesphere',
    name: 'PulseSphere — Atmosphere & Weather Hub',
    tagline: 'Real-time weather & atmospheric intelligence hub featuring live Open-Meteo REST API integrations, dynamic condition-adaptive cosmic glow backdrop, 6 atmospheric gauges, and interactive 24-hour bezier curves.',
    category: 'webapps',
    featured: true,
    image: '/assets/pulsesphere.png',
    techStack: ['JavaScript (ES6+)', 'HTML5', 'CSS3 (Glassmorphism)', 'Open-Meteo API', 'Air Quality API', 'Geocoding API', 'SVG Graphics', 'LocalStorage'],
    problem: 'Users frequently face cluttered, ad-heavy weather applications with bloated JavaScript framework footprints, paid API key restrictions, and static numbers that lack visual depth, air quality metrics, or solar progression context.',
    solution: 'Engineered a high-performance Vanilla ES6+ meteorological intelligence dashboard that loads in under 200ms with zero framework overhead. Connects directly to 3 public Open-Meteo endpoints (Forecast, Air Quality, Geocoding), featuring an ambient cosmic glow backdrop that smoothly shifts hue to match live weather conditions, 6 custom atmospheric gauges, and responsive SVG bezier trajectory charts.',
    keyFeatures: [
      'Live Meteorological & Atmospheric Intelligence: Instant readings of current temperature, "feels like" index, daily high/low range, precipitation volume, cloud cover, and wind gusts via Open-Meteo APIs.',
      'Dynamic Adaptive Ambient Backdrop: Cosmic glow orbs that smoothly morph color palettes based on live conditions (Sunny Amber, Rainy Cyan, Storm Indigo, Snowy Blue).',
      '6 Core Atmospheric & Environmental Gauges: Animated compass dial rotating to wind degrees, humidity & dew point comfort, graduated UV risk meter, US AQI with PM2.5/PM10 breakdown, barometric pressure gauge, and live daylight sun arc.',
      '24-Hour Hourly Trajectory & Interactive SVG Curve: Horizontal forecast carousel paired with a smooth bezier gradient area chart plotting hourly temperatures and precipitation probabilities.',
      '7-Day Extended Weekly Forecast: Visual temperature distribution bars indicating shifts in weekly min/max temperature ranges.',
      'Smart Search, GPS & Favorites: Real-time debounced geocoding autocomplete, HTML5 GPS geolocation with reverse geocoding, saved favorites persisted in localStorage, and instant Metric/Imperial (°C/km/h vs °F/mph) unit toggling.',
      'Reliability & Offline Resilience: Network connectivity status toast notifications, client-side caching fallback, and shimmer skeleton loading states during API network round-trips.'
    ],
    challenges: [
      'Engineering custom mathematical algorithms for dynamic SVG bezier curve paths and circular gauge needle angles without external charting libraries.',
      'Orchestrating concurrent asynchronous requests across Forecast, Air Quality, and Geocoding APIs while preserving seamless offline fallback and debounced input performance.'
    ],
    learnings: [
      'Mastered lightweight, modular Vanilla JavaScript (ES6+) controller architecture with zero framework overhead achieving sub-200ms load times.',
      'Gained deep experience in advanced CSS glassmorphism, dynamic CSS custom properties, and responsive multi-gauge dashboard design.'
    ],
    githubUrl: 'https://github.com/CommitWithSandy/ELiteTEch-Intern.git',
    // liveUrl: 'https://github.com/CommitWithSandy/ELiteTEch-Intern.git',
    screenshots: [
      {
        title: 'Main Dashboard & Overview',
        image: '/assets/pulsesphere.png',
        caption: 'Live weather metrics, dynamic atmospheric backdrop, feels like, daily high/low'
      },
      {
        title: '24-Hour Hourly Trajectory',
        image: '/assets/pulsesphere-24hr.png',
        caption: 'Hourly temperature trajectory, condition indicators, precipitation probability'
      },
      {
        title: '7-Day Extended Outlook',
        image: '/assets/pulsesphere-7day.png',
        caption: 'Visual weekly min/max temperature distribution bars & weather conditions'
      },
      {
        title: 'Atmospheric Gauges & AQI',
        image: '/assets/pulsesphere-info.png',
        caption: 'Animated compass dial, humidity, UV index, US AQI (PM2.5/PM10), pressure & sun arc'
      }
    ]
  }
];

export const SKILLS_DATA: SkillGroup[] = [
  {
    category: 'Frontend Development',
    skills: [
      { name: 'HTML5', level: 95, icon: 'FileCode' },
      { name: 'CSS3', level: 90, icon: 'Palette' },
      { name: 'JavaScript (ES6+)', level: 90, icon: 'Code' },
      { name: 'React.js', level: 90, icon: 'Atom' },
    ]
  },
  {
    category: 'Backend & APIs',
    skills: [
      { name: 'Java', level: 92, icon: 'Coffee' },
      { name: 'Spring Boot', level: 88, icon: 'Zap' },
      { name: 'REST APIs', level: 90, icon: 'Globe' },
    ]
  },
  {
    category: 'Databases & Analytics',
    skills: [
      { name: 'MongoDB', level: 88, icon: 'Database' },
      { name: 'MySQL / SQL', level: 90, icon: 'Table' },
      { name: 'Excel Modeling', level: 90, icon: 'FileSpreadsheet' }
    ]
  },
  {
    category: 'Tools & Workflow',
    skills: [
      { name: 'Git & GitHub', level: 90, icon: 'GitBranch' },
      { name: 'Docker', level: 80, icon: 'Box' },
      { name: 'VS Code', level: 95, icon: 'Laptop' },
      { name: 'Figma', level: 85, icon: 'Figma' }
    ]
  }
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'elite-tech-internship',
    year: '2026',
    title: 'Elite Tech Full Stack Development Internship',
    organization: 'Elite Tech Intern Program',
    location: 'Remote',
    description: 'T1- PulseSphere — Real-Time Weather & Atmosphere Intelligence Hub ',
    type: 'achievement',
  },
  {
    id: 'game-o-thon',
    year: '2026',
    title: 'Game-O-Thon Participant',
    organization: 'Technical Competitions & Professional Certification',
    location: 'India',
    description: 'Participated in Game-O-Thon (GOH) 2026 technical development hackathon.',
    type: 'certification',
  },
  {
    id: 'deloitte-simulation',
    year: '2026',
    title: 'Data Analytics Job Simulation',
    organization: 'Deloitte Australia (via Forage)',
    location: 'Remote / Virtual',
    description: 'Completed Deloitte Australia data analytics simulation involving forensic technology analysis, Tableau dashboard development, and business data classification.',
    type: 'achievement',
  },
];

export const portfolioData = {
  personalInfo: {
    ...PERSONAL_INFO,
    shortBio: PERSONAL_INFO.bio,
    socials: PERSONAL_INFO.socialLinks,
    resumeUrl: PERSONAL_INFO.socialLinks.resumePdf,
  },
  projects: PROJECTS.map((p) => ({
    ...p,
    title: p.name,
    pitch: p.tagline,
    description: p.solution,
    problemSolved: p.problem,
    features: p.keyFeatures,
    whatILearned: p.learnings ? p.learnings.join('. ') : '',
    challenges: p.challenges ? p.challenges.join('. ') : '',
    screenshots: p.screenshots || [],
  })),
  skills: SKILLS_DATA.map((sg) => ({
    category: sg.category,
    items: sg.skills,
  })),
  timeline: TIMELINE_DATA,
  certifications: TIMELINE_DATA.filter((t) => t.type === 'certification' || t.type === 'achievement'),
};

