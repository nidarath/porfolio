"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight } from "lucide-react";
import PixelMark from "@/components/pixel-mark";

const EMAIL = "nidarzx@gmail.com";
const socials = [
  { icon: Github, label: "github", href: "https://github.com/nidarath" },
  { icon: Linkedin, label: "linkedin", href: "https://www.linkedin.com/in/nidarath/" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setCopyError(false);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="mx-3 mb-4 rounded-[36px] bg-[#e9f2f5] py-14 sm:mx-5 md:mb-5 md:rounded-[48px] md:py-20">
      <div className="section-shell">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative mb-10 flex items-start justify-between gap-5 md:mb-14">
          <div><p className="section-label mb-5">03 <span className="mx-3 text-accent-strong">/</span> get in touch</p><h2 id="contact-heading" className="font-display text-[clamp(3.8rem,9vw,7.5rem)] font-semibold leading-none tracking-[-0.045em] text-ink">let&apos;s talk.</h2></div>
          <PixelMark className="mt-7 h-14 w-14 shrink-0 text-accent sm:h-20 sm:w-20 md:h-28 md:w-28" />
        </motion.div>
        <div className="grid items-start gap-9 md:grid-cols-2 md:gap-20">
          <div className="max-w-md">
            <p className="text-[15px] leading-[1.85] text-ink-soft">I&apos;m looking for new opportunities. Have a project in mind, a question, or just want to say hi? My inbox is always open.</p>
            <div className="mt-7 flex flex-wrap gap-2.5">{socials.map(({ icon: Icon, label, href }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="pill-link border-white bg-white/75"><Icon size={15} strokeWidth={1.6} aria-hidden="true" />{label}<ArrowUpRight size={13} className="ml-2 text-muted" aria-hidden="true" /></a>)}</div>
          </div>
          <div>
            <button type="button" onClick={copyEmail} aria-label="Copy email address" className="group flex w-full flex-col rounded-[28px] border border-white bg-white/85 p-6 text-left transition-colors hover:bg-white md:p-8">
              <div className="mb-5 flex w-full items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-cloud text-accent-strong"><Mail size={19} strokeWidth={1.5} aria-hidden="true" /></span><ArrowUpRight size={20} strokeWidth={1.5} className="text-accent-strong transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></div>
              <span className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] font-medium tracking-tight text-ink [overflow-wrap:anywhere]">{EMAIL}</span>
              <span className="mt-4 flex min-h-4 items-center gap-2 font-mono text-[10px] text-muted" aria-live="polite">{copied ? <Check size={13} className="text-[#718b66]" aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}{copied ? "copied. talk soon!" : copyError ? "couldn't copy — use the mail link below" : "click to copy the address"}</span>
            </button>
            <a href={`mailto:${EMAIL}`} className="mt-4 flex min-h-10 items-center justify-end gap-2 font-mono text-[11px] text-ink-soft transition-colors hover:text-accent-strong">or open your mail app <ArrowUpRight size={13} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
