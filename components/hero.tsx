"use client";
import { motion } from "framer-motion";
import MatchaCat from "@/components/matcha-cat";
import HeroWordmark from "@/components/hero-wordmark";

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen w-full flex-col items-center justify-center bg-white px-6 md:flex-row md:justify-between md:px-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute right-12 top-10 z-20 hidden gap-5 font-mono text-[11px] text-muted lowercase xl:flex"
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

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mt-36 w-full max-w-[580px] text-left md:mt-0 md:w-1/2 md:shrink-0"
      >
        <p className="mb-5 pl-1 font-mono text-[13px] font-normal tracking-[0.02em] text-[#84979e] md:mb-6 md:text-sm">
          hello, i&apos;m
        </p>

        <h1 className="-ml-1 w-full text-[#2C4248]">
          <span className="sr-only">nida</span>
          <HeroWordmark />
        </h1>

        <div className="mt-5 max-w-[325px] pl-1 md:mt-7">
          <p className="text-lg font-medium tracking-[-0.035em] text-[#40565e] md:text-[22px]">
            fullstack developer
          </p>
          <p className="mt-3 text-sm font-normal leading-relaxed text-[#7b888d] md:text-[15px]">
            I love building fun projects and enjoying a nice iced matcha.
          </p>
        </div>
      </motion.div>
      {/* Low-poly matcha companion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative mt-6 w-full max-w-[520px] md:mt-0 md:w-[46%]"
      >
        <MatchaCat />
      </motion.div>
      {/* mobile social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mb-8 mt-2 flex gap-6 font-mono text-[11px] text-muted lowercase md:hidden"
      >
        {[
          { name: "linkedin", url: "https://linkedin.com/in/nidarath" },
          { name: "resume", url: "/resume.pdf" },
          { name: "github", url: "https://github.com/nidarath" }
        ].map((social) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 transition-colors hover:text-ink"
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
