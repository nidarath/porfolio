export type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string | null;
  liveLink: string | null;
  repoLink: string | null;
  tag: string;
  year: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "MedGuide",
    description:
      "A mobile app helping users track medication schedules and interactions based on symptoms.",
    tech: ["React Native", "Express.js", "MongoDB", "Node.js"],
    image: "/medguide.png",
    liveLink: "https://youtu.be/vfM3Prxhggk",
    repoLink: "https://github.com/Nsujatno/MedGuide",
    tag: "Mobile",
    year: "2025",
    featured: true,
  },
  {
    title: "Kids U Database",
    description:
      "Custom full-stack donor management system built for a non-profit to optimize data tracking.",
    tech: ["Next.js", "PostgreSQL", "Prisma", "Docker", "React"],
    image: "/kidsU.png",
    liveLink: "https://youtu.be/xM_jzEvte0I",
    repoLink: "https://github.com/UTDallasEPICS/Kids-U-Donor-Volunteer-Database",
    tag: "Full-Stack",
    year: "2025",
    featured: true,
  },
  {
    title: "KanbanSync",
    description:
      "HackUTD project: An AI-powered workflow assistant for datacenter ops, enabling natural language task creation and validation.",
    tech: ["React", "FastAPI", "OpenAI API", "Python", "Clerk", "Next.js"],
    image: "/hackutd25.png",
    liveLink: "https://www.youtube.com/watch?v=R-fUu01G1gE",
    repoLink: "https://github.com/Nsujatno/hackutd25",
    tag: "AI / Hackathon",
    year: "2025",
    featured: true,
  },
  {
    title: "Minesweeper Together",
    description:
      "A real-time multiplayer minesweeper game where players collaborate or compete in shared lobby rooms.",
    tech: ["Next.js", "Socket.io", "Node.js", "Express"],
    image: null,
    liveLink: null,
    repoLink: "https://github.com/Nsujatno/minesweeper-co-op-game",
    tag: "Game",
    year: "2026",
  },
  {
    title: "GreenGain",
    description:
      "HackEarth winner: An AI-powered home energy advisor that maps personalized upgrade roadmaps, estimates IRS Form 5695 federal tax credits, and tracks your CO2 impact.",
    tech: ["Next.js", "FastAPI", "LangGraph", "Gemini", "Supabase", "Pinecone", "Tailwind"],
    image: null,
    liveLink: null,
    repoLink: "https://github.com/Nsujatno/GreenGain",
    tag: "AI / Hackathon",
    year: "2026",
  },
  {
    title: "SkillDuel",
    description:
      "An AI micro-learning platform that generates personalized video lessons via D-ID + ElevenLabs, quizzes users, and lets them challenge friends to knowledge duels.",
    tech: ["Next.js", "FastAPI", "LangGraph", "Gemini", "Supabase", "D-ID", "ElevenLabs"],
    image: null,
    liveLink: null,
    repoLink: "https://github.com/Nsujatno/hack-ai-2026",
    tag: "AI / Hackathon",
    year: "2026",
  },
  {
    title: "ASCII Visualizer",
    description:
      "A web app that converts images into ASCII art, featuring drag-and-drop, a matrix binary rain background, and one-click export to clipboard or .txt.",
    tech: ["Python", "Flask", "Pillow", "HTML", "CSS", "JavaScript"],
    image: null,
    liveLink: null,
    repoLink: "https://github.com/nidarath/ascii-visualizer",
    tag: "Design",
    year: "2026",
  },
];

// Featured projects shown on the main page — set featured: true in the data above
export const featuredProjects = projects.filter((p) => p.featured);
