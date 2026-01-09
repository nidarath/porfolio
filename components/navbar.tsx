"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cat } from "lucide-react";

const navItems = [
  { id: "hero", label: "start" },
  { id: "work", label: "my work" },
  { id: "about", label: "about" },
  { id: "contact", label: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 300; 

      sections.forEach((section) => {
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 1, ease: "easeOut" }}
      className="fixed top-8 left-8 z-50 hidden md:flex flex-col gap-3" 
    >
      <div className="absolute left-1.75 top-2 bottom-2 w-px bg-gray-100 -z-10" />

      <ul className="flex flex-col gap-3"> 
        {navItems.map((item, index) => {
          const isActive = activeSection === item.id;

          return (
            <li
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                
                <div 
                    className={`w-2 h-2 rounded-full border-[1.5px] transition-all duration-300 ${
                        isActive ? "border-transparent bg-transparent" : "border-gray-200 bg-white group-hover:border-[#79ABBD]"
                    }`} 
                />

                {isActive && (
                  <motion.div
                    layoutId="active-cat"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute inset-0 flex items-center justify-center bg-transparent"
                  >
                      <Cat size={16} className="text-[#79ABBD] fill-[#ffffff]" />
                  </motion.div>
                )}
              </div>

              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-[#79ABBD] font-bold" : "text-gray-400 group-hover:text-[#79ABBD]"
                }`}
              >
                {index + 1}. {item.label}.
              </span>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}