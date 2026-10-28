"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import PixelMark from "@/components/pixel-mark";
import type { Project } from "@/lib/projects";

function ProjectIllustration({ project }: { project: Project }) {
  const variant = project.tag === "Game" ? "game" : project.tag === "Design" ? "binary" : project.title === "GreenGain" ? "leaf" : "spark";
  return (
    <div className={`relative flex h-full items-center justify-center overflow-hidden ${variant === "leaf" ? "bg-sage" : "bg-cloud"}`}>
      <div className="absolute -bottom-12 -left-8 h-48 w-48 rounded-full border border-white/80" />
      <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full bg-white/45" />
      <PixelMark variant={variant} className={`relative h-28 w-32 transition-transform duration-500 group-hover:-rotate-6 ${variant === "leaf" ? "text-[#7f9972]" : "text-accent-strong/65"}`} />
    </div>
  );
}

export default function ProjectCard({ project, index = 0, headingLevel = 3 }: { project: Project; index?: number; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      viewport={{ once: true, margin: "0px 0px -30px 0px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.15) }}
      whileHover={{ y: -4 }}
      className="group flex h-full min-w-0 flex-col rounded-[32px] border border-line/80 bg-paper p-3 transition-shadow duration-300 hover:shadow-[0_16px_40px_-24px_rgba(44,66,72,0.25)]"
    >
      <div className="relative aspect-[1.4] overflow-hidden rounded-[23px] bg-cloud">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.035]" />
        ) : <ProjectIllustration project={project} />}
      </div>
      <div className="flex grow flex-col px-3 pb-4 pt-6 md:px-4">
        <div className="section-label mb-3 flex items-center justify-between gap-3 text-[10px]">
          <span>{String(index + 1).padStart(2, "0")} / {project.tag.toLowerCase()}</span>
          <span>{project.year}</span>
        </div>
        <Heading className="font-display text-[28px] font-medium leading-tight tracking-[-0.025em] text-ink">{project.title}</Heading>
        <p className="mt-3 grow text-sm leading-[1.75] text-muted">{project.description}</p>
        <div className="mb-6 mt-5 flex flex-wrap gap-1.5">{project.tech.map((tech) => <span key={tech} className="tech-tag">{tech}</span>)}</div>
        <div className="mt-auto flex flex-wrap gap-2">
          {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-strong" aria-label={`View ${project.title} demo`}>live demo <ArrowUpRight size={14} aria-hidden="true" /></a>}
          {project.repoLink && <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-accent hover:bg-cloud" aria-label={`View ${project.title} source code`}><Github size={13} aria-hidden="true" /> source</a>}
        </div>
      </div>
    </motion.article>
  );
}
