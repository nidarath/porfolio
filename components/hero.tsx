"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Hero() {
  const [particles, setParticles] = useState<{ id: number; x: number; size: number; rotation: number; delay: number }[]>([]);

  const spawnParticles = () => {
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: (Math.random() - 0.5) * 160, 
      size: Math.random() * 12 + 12,  
      rotation: Math.random() * 360,
      delay: Math.random() * 0.1
    }));

    setParticles((prev) => [...prev, ...newParticles]);
    
    setTimeout(() => {
      setParticles((prev) => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 2000);
  };

  return (
    <section id="hero" className="relative flex min-h-screen w-full flex-col items-center justify-center bg-white px-6 md:flex-row md:justify-between md:px-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="hidden md:flex absolute top-8 right-12 gap-6 text-lg font-bold text-gray-300 lowercase z-20"
      >
        <a href="https://www.linkedin.com/in/nidarath/" target="_blank" rel="noopener noreferrer" className="hover:text-[#79ABBD] transition-colors">
          linkedin
        </a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#79ABBD] transition-colors">
          resume
        </a>
        <a href="https://github.com/nidarath" target="_blank" rel="noopener noreferrer" className="hover:text-[#79ABBD] transition-colors">
          github
        </a>
      </motion.div>
      {/* mobile nav bar*/}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex md:hidden absolute top-8 left-6 flex-col items-start gap-2 text-lg font-bold lowercase z-30"
      >
        {[
          { id: "work", label: "work." },
          { id: "about", label: "about." },
          { id: "contact", label: "contact." }
        ].map((item) => (
          <motion.a
            key={item.id}
            href={`#${item.id}`}
            className="text-gray-300"
            whileTap={{ scale: 0.9, color: "#79ABBD" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {item.label}
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 mt-40 md:mt-0 max-w-lg text-left"
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
            I am a <span className="text-black">fullstack developer</span>, who loves building fun projects and enjoying a nice iced matcha.
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
          className="relative w-75 h-75 md:w-112.5 md:h-112.5 cursor-pointer group"
          onClick={spawnParticles}
        >
          {particles.map(p => (
             <motion.div
                key={p.id}
                initial={{ opacity: 1, y: 0, x: p.x, scale: 0, rotate: p.rotation }}
                animate={{ opacity: 0, y: -250, scale: 1, rotate: p.rotation + (p.x > 0 ? 180 : -180) }}
                transition={{ duration: 1.5, ease: "easeOut", delay: p.delay }}
                className="absolute top-[35%] left-1/2 pointer-events-none z-10"
                style={{ 
                  marginLeft: `${-p.size/2}px`, 
                  marginTop: `${-p.size/2}px`,
                  width: p.size,
                  height: p.size
                }}
             >
                <div className="w-full h-full bg-[#87A887] rounded-tl-full rounded-br-full shadow-sm" />
             </motion.div>
          ))}
          <motion.div whileTap={{ scale: 0.95 }} className="w-full h-full">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl group-hover:drop-shadow-2xl transition-all duration-300">

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
      </motion.div>
      {/* mobile social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex md:hidden gap-6 mt-2 mb-8 text-lg font-bold lowercase"
      >
        {[
          { name: "linkedin", url: "https://linkedin.com/in/nidarath" },
          { name: "resume", url: "/resume.pdf" },
          { name: "github", url: "https://github.com/nidarath" }
        ].map((social) => (
          <motion.a
            key={social.name}
            href={social.url}
            target={social.name === "resume" ? "_blank" : "_self"}
            className="text-gray-300"
            whileTap={{ scale: 0.9, color: "#79ABBD" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {social.name}
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}