"use client";

import { motion } from "framer-motion";
import { GraduationCap, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import FavoriteObject, { type FavoriteKind } from "@/components/favorite-object";

const experience = [
  { year: "Aug 2025 — Dec 2025", role: "Full-Stack Developer", company: "Kids U Donor Database EPICS Project", desc: "Built a custom full-stack app to optimize data management for a non-profit." },
  { year: "Aug 2025 — Dec 2025", role: "Mobile Developer", company: "MedGuide AIMD Project", desc: "Developed a mobile app to track medication schedules." },
];
const skills = ["Java", "C++", "Python", "React", "Next.js", "Node.js", "CSS", "Tailwind", "TypeScript", "PostgreSQL", "MongoDB", "Git", "Docker", "Figma"];
const hobbies: { kind: FavoriteKind; label: string; tilt: string }[] = [
  { kind: "tea", label: "tea enthusiast", tilt: "-rotate-2 group-hover:rotate-2" },
  { kind: "music", label: "listening to music", tilt: "rotate-2 group-hover:-rotate-2" },
  { kind: "art", label: "digital art", tilt: "rotate-2 group-hover:-rotate-2" },
  { kind: "gaming", label: "gaming", tilt: "-rotate-2 group-hover:rotate-2" },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 md:py-28">
      <div className="section-shell">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 grid items-end gap-7 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <SectionHeading number="02" label="the person behind the pixels" id="about-heading">a little about me</SectionHeading>
          <div className="max-w-sm">
            <p className="text-[15px] leading-[1.8] text-muted">I&apos;m a computer science student at UT Dallas who loves building fun projects, making digital art, and finding a good cup of tea.</p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-sage/70 px-3.5 py-2 font-mono text-[10px] text-[#5b7454]"><span className="h-1.5 w-1.5 rounded-full bg-[#7b9870]" />open to work</span>
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-12 md:gap-6">
          <div className="space-y-5 md:col-span-7 md:space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[32px] bg-cloud p-6 md:p-9">
              <h3 className="mb-8 font-display text-[28px] font-medium tracking-tight text-ink">experience</h3>
              <ol className="ml-1 space-y-8 border-l border-accent pl-6">
                {experience.map((item) => (
                  <li key={item.role} className="relative">
                    <span className="absolute -left-[28px] top-1 h-[7px] w-[7px] bg-accent-strong" aria-hidden="true" />
                    <p className="section-label mb-2 text-[10px]">{item.year.toLowerCase()}</p>
                    <h4 className="text-lg font-semibold tracking-[-0.035em] text-ink">{item.role}</h4>
                    <p className="mt-1 text-xs font-medium text-accent-strong">{item.company}</p>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{item.desc}</p>
                  </li>
                ))}
              </ol>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[32px] border border-line p-6 md:p-9">
              <div className="mb-6 flex items-center justify-between gap-4"><h3 className="font-display text-[28px] font-medium tracking-tight text-ink">education</h3><GraduationCap className="h-6 w-6 text-accent-strong" strokeWidth={1.5} aria-hidden="true" /></div>
              <p className="section-label mb-2 text-[10px]">expected may 2028</p>
              <h4 className="text-lg font-semibold tracking-tight text-ink">B.S. Computer Science</h4>
              <p className="mt-1 text-sm text-muted">University of Texas at Dallas</p>
              <p className="mt-4 font-mono text-[11px] text-accent-strong">GPA 3.4 <span className="mx-2 text-accent">/</span> Top 10% Scholarship</p>
            </motion.div>
          </div>

          <div className="space-y-5 md:col-span-5 md:space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[32px] border border-line p-6 md:p-9">
              <p className="section-label mb-2">my toolbox</p>
              <h3 className="mb-6 font-display text-[28px] font-medium tracking-tight text-ink">things i work with</h3>
              <div className="flex flex-wrap gap-2">{skills.map((skill) => <span key={skill} className="rounded-full bg-cloud px-3 py-2 font-mono text-[11px] text-ink-soft">{skill}</span>)}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[32px] bg-cream p-6 md:p-9">
              <p className="section-label mb-2">when i&apos;m away from the keyboard</p>
              <h3 id="favorites-heading" className="mb-5 font-display text-[28px] font-medium tracking-tight text-ink">a few favorites</h3>
              <ul aria-labelledby="favorites-heading" className="grid grid-cols-2 gap-x-5 gap-y-5">
                {hobbies.map(({ kind, label, tilt }) => (
                  <li key={kind} className="group flex flex-col items-center gap-2 text-center">
                    <span className={`block h-24 w-24 transition-transform duration-300 ease-out group-hover:-translate-y-1 ${tilt}`}>
                      <FavoriteObject kind={kind} />
                    </span>
                    <span className="max-w-[135px] text-balance font-display text-[18px] font-medium leading-[1.15] tracking-[-0.02em] text-ink-soft">{label}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-full border border-line px-6 py-4 font-mono text-xs text-muted transition-colors hover:bg-cloud hover:text-ink">the longer version <span className="flex items-center gap-2 text-ink">my resume <ArrowUpRight size={14} aria-hidden="true" /></span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
