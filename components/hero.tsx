"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen w-full flex-col items-center justify-center bg-white px-6 md:flex-row md:justify-between md:px-20 overflow-hidden">      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-8 right-6 md:top-12 md:right-20 flex gap-6 text-lg font-bold text-gray-300 lowercase z-20"
      >
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#79ABBD] transition-colors">
          linkedin
        </a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#79ABBD] transition-colors">
          resume
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#79ABBD] transition-colors">
          github
        </a>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 mt-20 md:mt-0 max-w-lg text-left"
      >
        <h2 className="text-4xl font-light text-gray-200 md:text-6xl">
          hello,
          <br />
          my name is
        </h2>
        
        <h1 className="mt-2 text-6xl font-black tracking-tighter text-black md:text-8xl">
          nida<span className="text-[#79ABBD]">.</span>
        </h1>

        <div className="mt-8 space-y-4 text-sm font-medium text-gray-500 md:text-base max-w-xs">
          <p>
            I am a <span className="text-black">fullstack developer</span>, a 
            problem solver, and a digital creator.
          </p>
          <p>
            I love building fun projects and minimal interfaces, with the occasional 
            habit of drinking too much caffeine.
          </p>
        </div>
      </motion.div>
      {/* cup */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative mt-12 md:mt-0 md:w-1/2 flex justify-center md:justify-end"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative w-75 h-75 md:w-112.5 md:h-112.5"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
              
              {/* Steam Animation */}
              <motion.path 
                d="M80 40 Q 90 20 100 40 T 120 40" 
                stroke="#79ABBD" strokeWidth="4" fill="none" strokeLinecap="round"
                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
              <motion.path 
                d="M100 30 Q 110 10 120 30 T 140 30" 
                stroke="#79ABBD" strokeWidth="4" fill="none" strokeLinecap="round"
                animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              />

              {/* Cup Body */}
              <path 
                d="M50 70 L 55 140 C 55 165, 75 180, 100 180 C 125 180, 145 165, 145 140 L 150 70 Z" 
                fill="white" stroke="black" strokeWidth="3" strokeLinejoin="round"
              />
              
              {/* Cup Handle */}
              <path 
                d="M150 85 C 175 85, 175 130, 148 130" 
                fill="white" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              />

              {/* Face */}
              <circle cx="85" cy="120" r="6" fill="black" />
              <circle cx="115" cy="120" r="6" fill="black" />
              
              {/* Cheeks */}
              <circle cx="75" cy="132" r="5" fill="#79ABBD" opacity="0.4" />
              <circle cx="125" cy="132" r="5" fill="#79ABBD" opacity="0.4" />

              {/* Smile */}
              <path 
                d="M95 125 Q 100 130 105 125" 
                fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" 
              />
          </svg>
        </motion.div>
      </motion.div>
  </section>
  );
}