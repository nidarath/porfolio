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
            I love building clean code and minimal interfaces, with the occasional 
            habit of drinking too much caffiene.
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative mt-12 md:mt-0 md:w-1/2 flex justify-center"
      >
        {/* Floating Animation Wrapper */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative w-80 h-80 md:w-125 md:h-125"
        >
           {/* Custom SVG Line Art Skeleton */}
           <svg viewBox="0 0 200 200" className="w-full h-full stroke-gray-400 stroke-3 fill-none stroke-linecap-round stroke-linejoin-round">
              
              {/* Skull */}
              <path d="M60 90 Q 60 40 100 40 Q 140 40 140 90 Q 140 130 100 130 Q 60 130 60 90 Z" className="stroke-gray-500" />
              
              {/* Eyes (Cute & Large) */}
              <circle cx="85" cy="85" r="8" className="fill-black stroke-none" />
              <circle cx="115" cy="85" r="8" className="fill-black stroke-none" />
              
              {/* Sparkles in eyes */}
              <circle cx="88" cy="82" r="2" className="fill-white stroke-none" />
              <circle cx="118" cy="82" r="2" className="fill-white stroke-none" />

              {/* Nose */}
              <path d="M100 95 L 98 100 L 102 100 Z" className="fill-black stroke-none" />

              {/* Mouth (Stitched smile) */}
              <path d="M85 110 Q 100 115 115 110" />
              <path d="M90 108 L 90 114" />
              <path d="M100 110 L 100 116" />
              <path d="M110 108 L 110 114" />

              {/* Body / Ribs */}
              <path d="M100 130 L 100 160" />
              <path d="M85 140 Q 100 145 115 140" />
              <path d="M88 150 Q 100 155 112 150" />
              
              {/* Arms (Waving) */}
              <path d="M115 140 Q 140 130 150 100" /> 
              <path d="M145 95 L 150 100 L 158 98" /> 
              <path d="M85 140 Q 60 160 60 180" /> 


           </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}