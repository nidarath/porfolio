"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useId, useState } from "react";
import PixelMark from "@/components/pixel-mark";
import type { Project } from "@/lib/projects";
import "./project-card.css";

function ProjectCover({ project, index, showCategoryOnCover }: { project: Project; index: number; showCategoryOnCover: boolean }) {
  const variant = project.symbol;
  return (
    <div aria-hidden="true" className={`project-card-cover ${variant === "leaf" ? "bg-sage" : "bg-[#e8f0f2]"}`}>
      <div className="absolute -bottom-20 -left-6 h-56 w-64 -rotate-[25deg] rounded-full border border-white/80" />
      <div className="absolute -right-14 -top-16 h-52 w-52 rounded-full bg-white/45" />
      <PixelMark variant={variant} className={`relative h-16 w-16 ${variant === "leaf" ? "text-[#7f9972]" : "text-accent"}`} />
      <span className="absolute bottom-4 left-5 font-mono text-[10px] text-muted">
        {String(index + 1).padStart(2, "0")}{showCategoryOnCover && ` / ${project.tag.toLowerCase()}`}
      </span>
    </div>
  );
}

export default function ProjectCard({ project, index = 0, headingLevel = 3, showCategoryOnCover = false }: { project: Project; index?: number; headingLevel?: 2 | 3; showCategoryOnCover?: boolean }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const previewId = useId();
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <motion.article
      data-preview-open={previewOpen}
      onPointerEnter={event => {
        if (project.image && (event.pointerType === "mouse" || event.pointerType === "pen")) setPreviewOpen(true);
      }}
      onPointerLeave={event => {
        if (event.pointerType === "mouse" || event.pointerType === "pen") setPreviewOpen(false);
      }}
      onPointerCancel={() => setPreviewOpen(false)}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget) && !event.currentTarget.matches(":hover")) setPreviewOpen(false);
      }}
      onKeyDown={event => {
        if (event.key === "Escape") setPreviewOpen(false);
      }}
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      viewport={{ once: true, margin: "0px 0px -30px 0px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.15) }}
      className="project-card group flex h-full min-w-0 flex-col rounded-[32px] border border-line/80 bg-paper p-3 transition-shadow duration-300 hover:shadow-[0_16px_40px_-24px_rgba(44,66,72,0.25)]"
    >
      <div className="relative aspect-[1.9] overflow-hidden rounded-[23px] bg-cloud">
        {project.image && (
          <>
            <div id={previewId} aria-hidden={!previewOpen} className="project-card-image h-full w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="h-full w-full object-cover object-top" />
            </div>
            <button
              type="button"
              aria-label={`${previewOpen ? "Hide" : "Show"} ${project.title} preview`}
              aria-expanded={previewOpen}
              aria-controls={previewId}
              onClick={() => setPreviewOpen(open => !open)}
              className="project-card-preview-toggle absolute inset-0 z-10 h-full w-full rounded-[23px] bg-transparent"
            />
          </>
        )}
        <ProjectCover project={project} index={index} showCategoryOnCover={showCategoryOnCover} />
      </div>
      <div className="flex grow flex-col px-3 pb-4 pt-6 md:px-4">
        <p className={showCategoryOnCover ? "sr-only" : "section-label mb-3 text-[10px]"}>{project.tag.toLowerCase()}</p>
        <div className="flex items-baseline justify-between gap-3">
          <Heading className="min-w-0 font-display text-[28px] font-medium leading-tight tracking-[-0.025em] text-ink">{project.title}</Heading>
          <span className="shrink-0 font-mono text-[10px] text-muted">{project.year}</span>
        </div>
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
