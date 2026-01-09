"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink} from "lucide-react";

const projects = [
  {
    title: "MedGuide",
    description: "An mobile app helping users track medication schedules and interactions based on symptoms.",
    tech: ["React Native", "Express.js", "MongoDB", "Node.js"],
    image: "medguide.png",
    liveLink: "https://youtu.be/vfM3Prxhggk",
    repoLink: "https://github.com/Nsujatno/MedGuide",
  },
  {
    title: "Kids U Database",
    description: "Custom full-stack donor management system built for a non-profit to optimize data tracking.",
    tech: ["Next.js", "PostgreSQL", "Prisma", "Docker", "React"],
    image: "kidsU.png",
    liveLink: "https://youtu.be/xM_jzEvte0I",
    repoLink: "https://github.com/UTDallasEPICS/Kids-U-Donor-Volunteer-Database",
  },
  {
    title: "KanbanSync",
    description: "HackUTD project: An AI-powered workflow assistant used in datacenter operations, enabling natural language task creation and validation.",
    tech: ["React", "FastAPI", "OpenAI API", "Python", "Clerk", "Next.js"],
    image: "hackutd25.png",
    liveLink: "https://www.youtube.com/watch?v=R-fUu01G1gE",
    repoLink: "https://github.com/Nsujatno/hackutd25",
  },
];

export default function Project() {
  return (
    <section id="work" className="min-h-screen py-20 bg-white flex flex-col items-center relative overflow-hidden border-t-2 border-gray-100">
      
      <div className="absolute inset-0 opacity-[0.12]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />

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
          featured<span className="text-[#79ABBD]">.</span>projects
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-6xl w-full relative z-10">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, boxShadow: "8px 8px 0px 0px #79ABBD" }} 
            className="group bg-white rounded-2xl overflow-hidden border-2 border-black transition-all duration-300 flex flex-col"
          >
            <div className="h-48 w-full relative border-b-2 border-black bg-gray-200 overflow-hidden">
              
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6 flex flex-col grow">
              <h3 className="text-xl font-black text-black mb-2 group-hover:text-[#79ABBD] transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-500 mb-4 text-sm leading-relaxed font-medium grow">
                {project.description}
              </p>

              {/* tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-white border-2 border-gray-100 text-gray-600 text-[10px] font-bold rounded-md group-hover:border-[#79ABBD] transition-colors uppercase tracking-wider">
                    {tech}
                  </span>
                ))}
              </div>

              {/* buttons */}
              <div className="flex items-center gap-3 mt-auto">
                <a 
                  href={project.liveLink}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-xs font-bold border-2 border-black hover:bg-gray-800 transition-colors"
                >
                  <ExternalLink size={14} /> Demo
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