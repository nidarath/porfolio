"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { projects } from "@/lib/projects";
import HeroWordmark from "@/components/hero-wordmark";
import ProjectCard from "@/components/project-card";
import PixelMark from "@/components/pixel-mark";
import Footer from "@/components/footer";

const allTags = ["All", ...Array.from(new Set(projects.map((project) => project.tag)))];

export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState("All");
  const [sortNewest, setSortNewest] = useState(true);
  const filtered = useMemo(() => {
    const selected = activeTag === "All" ? projects : projects.filter((project) => project.tag === activeTag);
    return [...selected].sort((a, b) => sortNewest ? Number(b.year) - Number(a.year) : Number(a.year) - Number(b.year));
  }, [activeTag, sortNewest]);

  return (
    <main className="min-h-screen bg-paper">
      <header className="section-shell flex items-center justify-between gap-6 py-7 md:py-9">
        <Link href="/" aria-label="Nida — home" className="w-24 text-ink"><HeroWordmark /></Link>
        <Link href="/#work" className="pill-link px-4 text-xs"><ArrowLeft size={14} aria-hidden="true" />back home</Link>
      </header>
      <div className="section-shell pb-12 pt-10 md:pb-16 md:pt-16">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="section-label mb-5">a collection of things i&apos;ve made</p>
          <div className="flex flex-wrap items-end justify-between gap-7">
            <div>
              <div className="flex items-start gap-5"><h1 className="font-display text-[clamp(3.5rem,9vw,7rem)] font-semibold leading-none tracking-[-0.045em] text-ink">the vault</h1><PixelMark className="mt-1 h-9 w-9 text-accent md:mt-2 md:h-14 md:w-14" /></div>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted md:text-base">Every project I&apos;ve built — shipped, hacked, and everything in between.</p>
            </div>
            <p aria-live="polite" aria-atomic="true" className="rounded-full bg-cloud px-4 py-2.5 font-mono text-[11px] text-ink-soft">{filtered.length} {filtered.length === 1 ? "project" : "projects"}<span className="mx-2 text-accent-strong">/</span>{projects.length} total</p>
          </div>
        </motion.div>
      </div>

      <section aria-label="Project archive" className="mx-3 rounded-[36px] bg-cloud py-8 sm:mx-5 md:rounded-[48px] md:py-12">
        <div className="section-shell">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-5 md:mb-10">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
              {allTags.map((tag) => <button key={tag} type="button" onClick={() => setActiveTag(tag)} aria-pressed={activeTag === tag} className={`min-h-10 rounded-full border px-4 py-2.5 font-mono text-[11px] transition-colors ${activeTag === tag ? "border-ink bg-ink text-white" : "border-line bg-paper text-muted hover:border-accent hover:text-ink"}`}>{tag.toLowerCase()}</button>)}
            </div>
            <button type="button" onClick={() => setSortNewest(!sortNewest)} aria-label={`Sort projects: ${sortNewest ? "newest first" : "oldest first"}`} className="flex min-h-10 items-center gap-2 rounded-full px-2 py-2 font-mono text-[11px] text-ink-soft transition-colors hover:text-accent-strong"><ArrowUpDown size={13} aria-hidden="true" />{sortNewest ? "newest first" : "oldest first"}</button>
          </div>
          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            <AnimatePresence initial={false}>{filtered.map((project, index) => <ProjectCard key={project.title} project={project} index={index} headingLevel={2} showCategoryOnCover />)}</AnimatePresence>
          </motion.div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-accent/60 pt-7 font-mono text-[11px] text-muted"><p>always building something.</p><Link href="/#contact" className="text-ink transition-colors hover:text-accent-strong">have something in mind? let&apos;s talk ↗</Link></div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
