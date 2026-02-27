"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink, Lock, FolderOpen } from "lucide-react";

const projects = [
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
    repoLink:
      "https://github.com/UTDallasEPICS/Kids-U-Donor-Volunteer-Database",
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

const tagColors: Record<string, string> = {
  Mobile: "bg-purple-50 text-purple-600 border-purple-200",
  "Full-Stack": "bg-green-50 text-green-600 border-green-200",
  "AI / Hackathon": "bg-orange-50 text-orange-600 border-orange-200",
  Game: "bg-blue-50 text-blue-600 border-blue-200",
  Design: "bg-pink-50 text-pink-600 border-pink-200",
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white relative overflow-x-hidden">
      {/* dot grid background */}
      <div
        className="fixed inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* header */}
      <div className="relative z-10 px-6 pt-16 pb-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <a
              href="/"
              className="text-sm text-gray-400 hover:text-[#79ABBD] transition-colors font-medium"
            >
              nida.dev
            </a>
            <span className="text-gray-300">/</span>
            <span className="text-sm text-[#79ABBD] font-bold">projects</span>
          </div>

          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-black tracking-tight leading-none">
                the vault
                <span className="text-[#79ABBD]">.</span>
              </h1>
              <p className="text-gray-400 font-medium mt-3 text-base md:text-lg">
                every project i&apos;ve built — shipped, hacked, and everything in between.
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-300 border border-gray-100 rounded-full px-4 py-2 text-sm font-medium">
              <FolderOpen size={14} />
              <span>{projects.length} projects</span>
            </div>
          </div>

          {/* divider */}
          <div className="mt-10 h-px bg-gray-100" />
        </motion.div>
      </div>

      {/* project grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 px-6 pb-24 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "6px 6px 0px 0px #79ABBD" }}
            className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-black overflow-hidden flex flex-col transition-all duration-300"
          >
            {/* image / placeholder */}
            <div className="h-44 w-full bg-gray-50 border-b-2 border-gray-100 group-hover:border-black overflow-hidden relative transition-colors duration-300">
              {project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Lock size={28} className="text-gray-200" />
                </div>
              )}

              {/* year badge */}
              <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-500 text-[10px] font-bold rounded-full px-2.5 py-1 tracking-widest">
                {project.year}
              </span>
            </div>

            {/* content */}
            <div className="p-5 flex flex-col grow">
              {/* tag + title */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h2 className="text-lg font-black text-black group-hover:text-[#79ABBD] transition-colors leading-tight">
                  {project.title}
                </h2>
                <span
                  className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${tagColors[project.tag] ?? "bg-gray-50 text-gray-500 border-gray-200"}`}
                >
                  {project.tag}
                </span>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed font-medium grow mb-4">
                {project.description}
              </p>

              {/* tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-500 text-[10px] font-bold rounded-md uppercase tracking-wider group-hover:border-[#79ABBD]/40 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* action buttons */}
              <div className="flex items-center gap-2 mt-auto">
                {project.liveLink ? (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded-lg text-xs font-bold border-2 border-black hover:bg-gray-800 transition-colors"
                  >
                    <ExternalLink size={12} />
                    Demo
                  </a>
                ) : (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-300 rounded-lg text-xs font-bold border-2 border-gray-100 cursor-not-allowed select-none">
                    <Lock size={12} />
                    Soon
                  </span>
                )}
                {project.repoLink && (
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black rounded-lg text-xs font-bold border-2 border-gray-200 hover:border-black transition-colors"
                  >
                    <Github size={12} />
                    Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* "more coming" card */}
        <motion.div
          variants={cardVariants}
          className="rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-10 text-center min-h-[200px]"
        >
          <p className="text-2xl mb-2">🚧</p>
          <p className="text-gray-400 text-sm font-bold">more coming soon</p>
          <p className="text-gray-300 text-xs mt-1">always building something</p>
        </motion.div>
      </motion.div>
    </main>
  );
}
