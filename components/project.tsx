"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink, Code2 } from "lucide-react";

const projects = [
  {
    title: "Project 1",
    description: "description",
    tech: ["Next.js", "React", "Tailwind"],
    imageColor: "bg-blue-100", 
    liveLink: "#",
    repoLink: "#",
  },
  {
    title: "Project 2",
    description: "description",
    tech: ["Node.js", "PostgreSQL", "Prisma"],
    imageColor: "bg-green-100",
    liveLink: "#",
    repoLink: "#",
  },
  {
    title: "Project 3",
    description:  "description",
    tech: ["HTML5", "CSS3", "JavaScript"],
    imageColor: "bg-rose-100",
    liveLink: "#",
    repoLink: "#",
  },
  {
    title: "Project 4",
    description:  "description",
    tech: ["React", "OpenWeather API"],
    imageColor: "bg-yellow-100",
    liveLink: "#",
    repoLink: "#",
  },
];

export default function Project() {
  return (
    <section id="work" className="min-h-screen py-20 bg-gray-50 flex flex-col items-center">
      
      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 px-6"
      >
        <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight">
          Featured Projects
        </h2>
        <p className="mt-4 text-gray-500 max-w-lg mx-auto">
          some of my recent projects. 
        </p>
      </motion.div>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-6 max-w-6xl w-full">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }} 
            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            {/* IMAGE */}
            {/* placeholder */}
            <div className={`h-64 w-full ${project.imageColor} flex items-center justify-center relative overflow-hidden`}>
              <Code2 className="text-black/10 w-32 h-32 group-hover:scale-110 transition-transform duration-500" />
              
              {/* overlay*/}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* content */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-rose-500 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-500 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* tech stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                    {tech}
                  </span>
                ))}
              </div>

              {/* buttons*/}
              <div className="flex items-center gap-4">
                <a 
                  href={project.liveLink}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-colors"
                >
                  <ExternalLink size={16} /> live Demo
                </a>
                <a 
                  href={project.repoLink}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-full text-sm font-bold hover:border-black hover:text-black transition-colors"
                >
                  <Github size={16} /> code
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}