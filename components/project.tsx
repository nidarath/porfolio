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
    <section id="work" className="min-h-screen py-20 bg-white flex flex-col items-center relative overflow-hidden ">
      
      {/* background */}
      <div className="absolute inset-0 opacity-[0.12]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />

      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 px-6 relative z-10" 
      >
        <h2 className="text-4xl font-light text-gray-200 md:text-5xl select-none">
          selected.
        </h2>
        <h3 className="text-3xl md:text-4xl font-black text-black tracking-tight -mt-4 md:-mt-6">
          featured<span className="text-rose-500">.</span>projects
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 max-w-4xl w-full relative z-10">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, boxShadow: "8px 8px 0px 0px #FDA4AF" }} 
            className="group bg-white rounded-2xl overflow-hidden border-2 border-black transition-all duration-300 flex flex-col"
          >
            {/* IMAGE */}
            <div className={`h-48 w-full ${project.imageColor} flex items-center justify-center relative overflow-hidden border-b-2 border-black`}>
              <Code2 className="text-black/10 w-24 h-24 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* content */}
            <div className="p-6 flex flex-col grow">
              <h3 className="text-xl font-black text-black mb-2 group-hover:text-rose-500 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-500 mb-4 text-sm leading-relaxed font-medium grow">
                {project.description}
              </p>

              {/* tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-white border-2 border-gray-100 text-gray-600 text-[10px] font-bold rounded-md group-hover:border-black transition-colors uppercase tracking-wider">
                    {tech}
                  </span>
                ))}
              </div>

              {/* buttons*/}
              <div className="flex items-center gap-3">
                <a 
                  href={project.liveLink}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-xs font-bold border-2 border-black hover:bg-gray-800 transition-colors"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
                <a 
                  href={project.repoLink}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-xs font-bold border-2 border-gray-200 hover:border-black transition-colors"
                >
                  <Github size={14} /> Code
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}