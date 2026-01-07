"use client";
import { motion } from "framer-motion";
import {Cpu, Coffee, Gamepad2, Music, BookHeart } from "lucide-react";

// data 

const education = [
  { year: "2024", degree: "B.S. Computer Science", school: "University of Texas at Dallas" },
];

const skills = ["Next.js", "React", "TypeScript", "Tailwind", "Node.js", "PostgreSQL", "Framer Motion", "Figma"];

const hobbies = [
  { icon: <Coffee  size={18} />, label: "Tea Enthusiast" },
  { icon: <Gamepad2 size={18} />, label: "Gaming" },
  { icon: <Music size={18} />, label: "Listening to Music" },
  { icon: <BookHeart size={18} />, label: "Art" },
];

export default function About() {
  return (
    <section id="about" className="min-h-screen w-full bg-white py-20 px-6 md:px-20 overflow-hidden relative">
      
      <div className="max-w-6xl mx-auto">
        
        {/* section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-light text-gray-200 md:text-6xl select-none">
            more details.
          </h2>
          <h3 className="text-4xl font-black tracking-tighter text-black md:text-5xl -mt-4 md:-mt-8 ml-2">
            about<span className="text-rose-500">.</span>me
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* timeline */}
          <div className="space-y-12">

            {/* education */}
            <div className="relative">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Cpu className="text-rose-500" size={20} /> education
              </h4>
              <div className="border-l-2 border-gray-100 pl-6 space-y-8">
                {education.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    <div className="absolute -left-7.75 top-1.5 w-3 h-3 rounded-full bg-white border-2 border-gray-300 group-hover:border-rose-500 transition-colors" />
                    <span className="text-xs font-bold text-gray-400">{item.year}</span>
                    <h5 className="text-lg font-bold text-black">{item.degree}</h5>
                    <p className="text-sm text-gray-500">{item.school}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* skills & hobbies */}
          <div className="space-y-12">
            
            {/* tech stack */}
            <div>
              <h4 className="text-xl font-bold mb-6">skills.</h4>
              <div className="flex flex-wrap gap-3">
                {skills.map((tech, i) => (
                  <motion.span 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -3, boxShadow: "4px 4px 0px 0px #FDA4AF" }} // Rose shadow on hover
                    className="px-4 py-2 border-2 border-gray-900 rounded-lg text-sm font-semibold bg-white cursor-default transition-all"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* hobbies & likes */}
            <div>
              <h4 className="text-xl font-bold mb-6">hobbies & likes.</h4>
              <div className="grid grid-cols-2 gap-4">
                {hobbies.map((hobby, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 hover:bg-white transition-colors"
                  >
                    <div className="p-2 bg-white rounded-lg border border-gray-100 text-rose-500 shadow-sm">
                      {hobby.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-600">{hobby.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}