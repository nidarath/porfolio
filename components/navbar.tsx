"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroWordmark from "@/components/hero-wordmark";

const navItems = [
  { id: "work", label: "work" },
  { id: "about", label: "about" },
  { id: "contact", label: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = window.scrollY + window.innerHeight * 0.4;
      let active = "hero";
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= marker) active = item.id;
      }
      setActiveSection(active);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2 }}
      className="fixed left-1/2 top-5 z-50 flex w-[calc(100%-2rem)] max-w-[420px] -translate-x-1/2 items-center justify-between gap-2 rounded-full border border-line bg-paper/90 p-2 shadow-[0_6px_28px_rgba(44,66,72,0.05)] backdrop-blur-xl"
    >
      <a href="#hero" aria-label="Nida — back to start" aria-current={activeSection === "hero" ? "location" : undefined} className="ml-3 w-[68px] shrink-0 text-ink"><HeroWordmark /></a>
      <div className="flex items-center gap-0.5">
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} aria-current={activeSection === item.id ? "location" : undefined} className={`rounded-full px-3 py-3 font-mono text-[11px] transition-colors sm:px-5 ${activeSection === item.id ? "bg-cloud text-ink" : "text-muted hover:bg-cloud/70 hover:text-ink"}`}>
            {item.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
