"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/lib/projects";
import ProjectCard from "@/components/project-card";
import SectionHeading from "@/components/section-heading";

export default function Project() {
  return (
    <section id="work" aria-labelledby="work-heading" className="relative mx-3 rounded-[36px] bg-cloud py-16 sm:mx-5 md:rounded-[48px] md:py-24">
      <div className="section-shell">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 flex flex-wrap items-end justify-between gap-7 md:mb-14">
          <SectionHeading number="01" label="a few things i've made" id="work-heading">selected work</SectionHeading>
          <a href="/projects" className="pill-link">all projects <ArrowUpRight size={16} aria-hidden="true" /></a>
        </motion.div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {featuredProjects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
        </div>
      </div>
    </section>
  );
}
