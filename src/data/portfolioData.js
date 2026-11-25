export const profileData = {
  name: 'Rishabh Sonawane',
  initials: 'RS',
  role: 'B.Tech Data Science · Analytics & AI',
  location: 'Palghar, Maharashtra, India',
  availability: 'Open to Internships & Data Roles',
  email: 'rishabhsonawane333@gmail.com',
  githubAnalytics: 'https://github.com/DataByRishabh',
  githubDev: 'https://github.com/risdev18',
  linkedin: 'https://www.linkedin.com/in/rishabh-sonawane-554014387',
  headline: {
    before: 'Turning raw data into ',
    italic: 'clear decisions',
    after: ' & AI-powered products.',
  },
  subheadline:
    'Second-year B.Tech Data Science student (2025–2029) exploring data analytics, intelligent systems, and AI-native product building — continuously learning, experimenting, and turning curiosity into real-world work.',
  metrics: [
    {
      value: '01',
      accent: '',
      label: 'Peer-Reviewed Journal Publication (MAT)',
      eyebrow: 'RESEARCH',
    },
    {
      value: '04',
      accent: '',
      label: 'Data, AI & Hardware Engineering Builds',
      eyebrow: 'SELECTED WORK',
    },
    {
      value: '05',
      accent: '',
      label: 'Verified AI, Data & Journal Credentials',
      eyebrow: 'CREDENTIALS',
    },
    {
      value: '2029',
      accent: '',
      label: 'B.Tech Data Science · St. John College',
      eyebrow: 'GRADUATION',
    },
  ],
};

export const projects = [
  {
    id: 'ecommerce-powerbi',
    category: 'Data Science',
    badge: 'Flagship BI Case Study',
    title: 'E-Commerce Sales & Business Performance',
    subtitle: 'Power BI · Jan 2024 – Nov 2025 · 3.35M Revenue · 35.83% Margin',
    description:
      'Designed and modeled an executive Power BI report analyzing 1,425 completed orders across 300 customers. Surfaces monthly revenue velocity, category-level profit margins, and top-performing SKUs.',
    highlights: [
      'Tracked 6 core KPIs: 3.35M Total Revenue, 1.26M Net Profit, 35.83% Margin, 1,425 Orders, ₹2,347.58 AOV, and 300 Customers',
      'Built Star Schema linking OrdersTable, ProductsTable, and DateTable with interactive Date & Category slicers',
      'Identified Home & Kitchen as top revenue driver while Fashion led in Profit Margin %',
    ],
    tags: ['Power BI', 'DAX', 'Star Schema', 'KPI Modeling', 'Time-Series'],
    kpis: [
      { label: 'Total Revenue', value: '3.35M' },
      { label: 'Net Profit', value: '1.26M' },
      { label: 'Profit Margin', value: '35.83%' },
    ],
    daxSnippet: `Profit Margin % = DIVIDE([Total Profit], [Completed Sales], 0)\nAVG Order Value = DIVIDE([Completed Sales], [Completed Orders], 0)`,
    image: 'images/powerbi-real-dashboard.jpg',
    link: 'https://github.com/DataByRishabh/powerbi-analytics-portfolio/tree/main/01-ecommerce-sales-analytics',
    linkLabel: 'View on GitHub',
  },
  {
    id: 'batman-robotics',
    category: 'Hardware',
    badge: 'Hardware & Embedded Build',
    title: 'Batman-Inspired Autonomous Robotics Car',
    subtitle: 'Arduino · Dual DC & Servo Motors · OLED Expressions',
    description:
      'Collaborated as a 4-member engineering team to design and assemble a Batmobile-inspired three-wheel robotic car featuring dual DC geared motors, dual servo arms, and a custom OLED expression display.',
    highlights: [
      'Assembled three-wheel robotic chassis with dual DC geared motors and two servo motors for arm movement',
      'Integrated an OLED display programmed with custom Batman-themed visual expressions',
      'Gained hands-on experience in embedded hardware integration, prototyping, and team problem-solving',
    ],
    tags: ['Robotics', 'Arduino', 'Embedded Systems', 'Hardware Prototyping'],
    image: 'images/batman-robotics.jpg',
    link: 'https://www.linkedin.com/in/rishabh-sonawane-554014387',
    linkLabel: 'View on LinkedIn',
  },
  {
    id: 'vyronix-gym-app',
    category: 'SaaS & Web Apps',
    badge: 'AI Workflow (Antigravity)',
    title: 'Vyronix / Prana AI — Fitness Telemetry Engine',
    subtitle: 'AI Logic Flow · Structured Prompting & Workout Metrics',
    description:
      'Built using AI-assisted workflows (Antigravity) to explore how structured user inputs (goals, splits, recovery) map to personalized workout volume and calorie telemetry.',
    highlights: [
      'Designed input-to-output feature flow for workout splits, calorie estimation, and volume tracking',
      'Applied structured LLM prompt logic rather than manual frontend/backend coding',
      'Deployed live on Vercel to validate end-to-end user data flow',
    ],
    tags: ['AI Logic', 'Prompt Engineering', 'Telemetry Modeling', 'Antigravity'],
    image: 'images/vyronix-preview.jpg',
    visualType: 'vyronix-pipeline',
    link: 'https://vyronix-web.vercel.app/',
    linkLabel: 'Inspect Live Concept',
  },
  {
    id: 'relief-hospital',
    category: 'SaaS & Web Apps',
    badge: 'AI Workflow (Antigravity)',
    title: 'Relief Hospital — Healthcare Data Schema',
    subtitle: 'Relational Modeling · Patient & Appointment Architecture',
    description:
      'Explored healthcare operations modeling using AI-assisted development (Antigravity), structuring normalized entities for patients, doctors, and appointment triage.',
    highlights: [
      'Mapped 1-to-Many relational joins across Patients, Doctors, and Appointments tables',
      'Structured operational KPIs around appointment queues and doctor slot utilization',
      'Focused on data structure and problem-solving rather than manual UI engineering',
    ],
    tags: ['Data Modeling', 'ERD Logic', 'Healthcare Analytics', 'Antigravity'],
    image: 'images/relief-preview.jpg',
    visualType: 'relief-erd',
    link: 'https://github.com/risdev18/relief-hoapilal',
    linkLabel: 'View Repository',
  },
];

export const capabilities = [
  {
    id: 'bi-dax',
    number: '01',
    title: 'Business Intelligence & Power BI',
    tagline: 'Turning complex datasets into executive-ready visual stories.',
    skills: ['Power BI Desktop', 'DAX Measures', 'Power Query (ETL)', 'Star Schema Modeling', 'KPI Cards & Slicers'],
    details:
      'Hands-on experience building clean data models, writing custom DAX calculations (DIVIDE, aggregations, time intelligence), and designing high-contrast, decision-focused dashboards.',
  },
  {
    id: 'sql-prog',
    number: '02',
    title: 'SQL & Programming Foundations',
    tagline: 'Querying structured data and building core programming logic.',
    skills: ['SQL (Basic–Intermediate)', 'C / C++', 'Data Cleaning'],
    details:
      'Actively practicing SQL queries (SELECT, WHERE, GROUP BY, JOINs, aggregations) to explore datasets, alongside foundational coursework in C and C++.',
  },
  {
    id: 'ai-building',
    number: '03',
    title: 'AI, LLMs & Accelerated Building',
    tagline: 'Using modern AI tools to go from idea to deployed product fast.',
    skills: ['Prompt Engineering', 'Large Language Models', 'Antigravity AI Workflows', 'Product Scoping'],
    details:
      'Strong focus on AI fundamentals and prompt engineering — leveraging AI agents to prototype and ship full web concepts like Vyronix and Relief Hospital while understanding product logic.',
  },
  {
    id: 'digital-growth',
    number: '04',
    title: 'YouTube Strategy & Content Analytics',
    tagline: 'Data-driven storytelling beyond spreadsheets.',
    skills: ['YouTube Channel Management', 'Content Strategy', 'Audience Retention Analytics', 'Digital Growth'],
    details:
      'Practical experience managing YouTube content workflows, analyzing viewer engagement metrics, and optimizing content strategy for organic reach.',
  },
];

export const journey = [
  {
    period: 'Schooling · SSC',
    title: 'Secondary School Certificate (SSC)',
    place: 'Don Bosco School, Boisar',
    description:
      'Built strong analytical and mathematical foundations while developing curiosity for technology and problem-solving.',
    current: false,
  },
  {
    period: 'Higher Secondary · HSC',
    title: 'Higher Secondary Certificate (HSC)',
    place: 'AECS-1, Tarapur',
    description:
      'Completed higher secondary education with a focus on science and mathematics, preparing for engineering and data science.',
    current: false,
  },
  {
    period: '2025 — 2029',
    title: 'B.Tech in Data Science',
    place: 'St. John College of Engineering and Management',
    description:
      'Pursuing undergraduate studies in Data Science, focusing on Business Intelligence, Power BI, SQL, C/C++, and AI/ML exploration.',
    current: true,
  },
];

export const certifications = [
  {
    id: 'mat-publication',
    index: '01',
    folderTag: '3RD PRIZE · RESEARCH PAPER',
    title: 'Statistical Machine Learning-based Odometry Correction',
    issuer: 'MAT Journals · 3rd Prize at National Anveshnam Workshop',
    date: 'Apr 2026',
    detail:
      'Won 3rd Prize at the National Level Anveshnam Workshop (SJCEM) and published in MAT Journals (Vol. 12, Issue 1, 2026). Uses Multivariate Linear Regression, Gaussian noise characterization, Fisher’s Kurtosis, and ArUco vision resets.',
    image: 'images/certs/cert-mat-publication.jpg',
  },
  {
    id: 'nasscom-llm',
    index: '02',
    folderTag: 'INDIA-AI × META × NASSCOM',
    title: 'LLM For Young Developers – Foundational Course',
    issuer: 'IndiaAI · Meta · NASSCOM FutureSkills Prime',
    date: 'Feb 2026',
    detail:
      'Foundational certification covering Large Language Models, AI architecture, and practical developer workflows.',
    image: 'images/certs/cert-nasscom-llm.jpg',
  },
  {
    id: 'ey-microsoft',
    index: '03',
    folderTag: 'EY × MICROSOFT',
    title: 'AI Skills Passport',
    issuer: 'EY & Microsoft',
    date: '2026',
    detail:
      'Completed employability and AI technology modules offered jointly by EY and Microsoft.',
    image: 'images/certs/cert-ey-microsoft.jpg',
  },
  {
    id: 'data-analyst-101',
    index: '04',
    folderTag: 'MICROSOFT × SIMPLILEARN',
    title: 'Data Analyst 101',
    issuer: 'Microsoft · Simplilearn SkillUp',
    date: 'Nov 2025',
    detail:
      'Core data analytics foundations, KPI interpretation, and analytical problem-solving (Certificate Code: 9498204).',
    image: 'images/certs/cert-data-analyst.jpg',
  },
  {
    id: 'prompt-eng',
    index: '05',
    folderTag: 'AI & PYTHON',
    title: 'Python for Prompt Engineering',
    issuer: 'Verified LinkedIn Credential',
    date: '2026',
    detail:
      'Applied Python scripting and structured prompt engineering patterns for LLM workflows.',
    image: null,
  },
];

export const creativeHabits = [
  {
    index: '01',
    title: 'Think in Schemas',
    detail:
      'Before designing a single chart, map out relationships, fact tables, and grain so every KPI stays mathematically honest.',
    tag: 'Data Discipline',
  },
  {
    index: '02',
    title: 'Question Every Metric',
    detail:
      'A number without context is noise. Always pair totals with margins, averages, and time-series movement.',
    tag: 'Analytical Rigor',
  },
  {
    index: '03',
    title: 'Prototype With AI Speed',
    detail:
      'Use AI-native workflows to turn raw product ideas into live, clickable web experiences instead of waiting months.',
    tag: 'AI-Native Craft',
  },
  {
    index: '04',
    title: 'Document & Share Publicly',
    detail:
      'Write clear READMEs, commit clean versions, and treat every student project as a production-grade case study.',
    tag: 'Open Portfolio',
  },
];

