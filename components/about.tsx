"use client";
import { motion } from "framer-motion";
import { Heart, Cpu, Coffee, Gamepad2, Music, Palette, Briefcase, Award } from "lucide-react";

// data
const experience = [
  { 
    year: "Aug 2025 - Dec 2025", 
    role: "Full-Stack Developer", 
    company: "Kids U Donor Database EPICS Project", 
    desc: "Built a custom full-stack app to optimize data management for a non-profit." 
  },
  { 
    year: "Aug 2025 - Dec 2025", 
    role: "Mobile Developer", 
    company: "MedGuide AIMD Project", 
    desc: "Developed an mobile app to track medication schedules." 
  },
];

const education = [
  { 
    year: "Exp. May 2028", 
    degree: "B.S. Computer Science", 
    school: "University of Texas at Dallas",
    details: "GPA: 3.4 | Top 10% Scholarship"
  },
];

const skills = [
  "Java", "C++", "Python", 
  "React", "Next.js", "Node.js",
  "CSS", "Tailwind", "TypeScript", 
  "PostgreSQL", "MongoDB", 
  "Git", "Docker", "Figma"
];

const hobbies = [
  { icon: <Coffee size={18} />, label: "Tea Enthusiast" },
  { icon: <Music size={18} />, label: "Listening to Music" },
  { icon: <Palette size={18} />, label: "Digital Art" },
  { icon: <Gamepad2 size={18} />, label: "Gaming" },
];

export default function About() {
  return (
    <section id="about" className="min-h-screen w-full bg-white py-20 px-6 md:px-20 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.12]" 
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* header */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-4xl font-light text-gray-200 md:text-6xl select-none">
              more details.
            </h2>
            <h3 className="text-4xl font-black tracking-tighter text-black md:text-5xl -mt-4 md:-mt-8 ml-2">
              about<span className="text-[#79ABBD]">.</span>me
            </h3>
          </div>
          
          {/* info badges */}
          <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
            <span className="flex items-center gap-1"><Award size={14} className="text-[#79ABBD]"/> UT Dallas &apos;28</span>
            <span className="flex items-center gap-1"><Briefcase size={14} className="text-[#79ABBD]"/> Open to Work</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          
          {/* timeline */}
          <div className="md:col-span-7 space-y-12">
            
            {/* experience */}
            <div className="relative">
              <h4 className="text-xl font-bold mb-8 flex items-center gap-2 text-black">
                <span className="w-8 h-0.5 bg-[#79ABBD] rounded-full"></span> experience
              </h4>
              <div className="border-l-2 border-gray-100 pl-8 space-y-10 ml-2">
                {experience.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative group"
                  >
                    {/* timeline dots */}
                    <div className="absolute -left-10.25 top-1.5 w-4 h-4 rounded-full bg-white border-4 border-gray-200 group-hover:border-[#79ABBD] transition-colors" />
                    
                    <span className="inline-block px-2 py-1 mb-2 text-[10px] font-black uppercase tracking-wider bg-gray-100 rounded-md text-gray-500">
                      {item.year}
                    </span>
                    <h5 className="text-xl font-black text-black leading-tight group-hover:text-[#79ABBD] transition-colors">
                      {item.role}
                    </h5>
                    <p className="text-sm font-bold text-gray-400 mb-2">{item.company}</p>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* education */}
            <div className="relative">
              <h4 className="text-xl font-bold mb-8 flex items-center gap-2 text-black">
                <span className="w-8 h-0.5 bg-[#79ABBD] rounded-full"></span> education
              </h4>
              <div className="border-l-2 border-gray-100 pl-8 space-y-10 ml-2">
                {education.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    <div className="absolute -left-10.25 top-1.5 w-4 h-4 rounded-full bg-white border-4 border-gray-200 group-hover:border-[#79ABBD] transition-colors" />
                    <span className="inline-block px-2 py-1 mb-2 text-[10px] font-black uppercase tracking-wider bg-gray-100 rounded-md text-gray-500">
                      {item.year}
                    </span>
                    <h5 className="text-xl font-black text-black leading-tight group-hover:text-[#79ABBD] transition-colors">{item.degree}</h5>
                    <p className="text-sm font-bold text-gray-400">{item.school}</p>
                    <p className="text-xs font-medium text-[#79ABBD] mt-1">{item.details}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* skills + hobbies */}
          <div className="md:col-span-5 space-y-12">
            
            {/* tech skills */}
            <div>
              <h4 className="text-xl text-[#e0e0e0] font-bold mb-6 flex items-center gap-2">
                <Cpu size={20} className="text-black" /> skills.
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((tech, i) => (
                  <motion.span 
                    key={i}
                    whileHover={{ y: -2, boxShadow: "3px 3px 0px 0px #79ABBD" }} 
                    className="px-3 py-1.5 border-2 border-gray-200 bg-white rounded-lg text-xs font-bold text-gray-600 cursor-default transition-all hover:border-black hover:text-black"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* hobbies */}
            <div>
              <h4 className="text-xl text-[#e0e0e0] font-bold mb-6 flex items-center gap-2">
                <Heart size={20} className="text-black" /> hobbies.
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {hobbies.map((hobby, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-100 bg-white hover:border-black transition-colors"
                  >
                    <div className="p-2 bg-[#d4f0fa] text-[#79ABBD] rounded-full">
                      {hobby.icon}
                    </div>
                    <span className="text-xs font-bold text-gray-700">{hobby.label}</span>
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