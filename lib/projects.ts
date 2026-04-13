export type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string | null;
  liveLink: string | null;
  repoLink: string | null;
  tag: string;
  year: string;
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
    year: "2024",
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
    year: "2024",
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
  },
  {
    title: "Minesweeper Together",
    description:
      "A real-time multiplayer minesweeper game where players collaborate or compete in shared lobby rooms.",
    tech: ["Next.js", "Socket.io", "Node.js", "Express"],
    image: null,
    liveLink: null,
    repoLink: "https://github.com/Nsujatno/minesweeper-together",
    tag: "Game",
    year: "2025",
  },
  {
    title: "Portfolio",
    description:
      "The very site you're on. A minimal, animated developer portfolio built with Next.js and Framer Motion.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    image: null,
    liveLink: "https://nida.dev",
    repoLink: "https://github.com/Nsujatno/my-portfolio",
    tag: "Design",
    year: "2025",
  },
];

// The 3 featured projects shown on the main page
export const featuredProjects = projects.slice(0, 3);
