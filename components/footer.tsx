import { ArrowUpRight } from "lucide-react";
import HeroWordmark from "@/components/hero-wordmark";

export default function Footer() {
  return (
    <footer className="section-shell flex flex-wrap items-center justify-between gap-x-8 gap-y-6 py-8 md:py-10">
      <a href="/#hero" aria-label="Nida — back to start" className="block w-24 text-ink"><HeroWordmark /></a>
      <div className="text-center font-mono text-[10px] leading-relaxed text-muted sm:text-left"><p>© {new Date().getFullYear()} nida.</p><p className="mt-1">Next.js, Tailwind & a lot of matcha.</p></div>
      <a href="/#hero" className="flex min-h-10 items-center gap-2 font-mono text-[11px] text-ink-soft transition-colors hover:text-accent-strong">back to the top <ArrowUpRight size={14} aria-hidden="true" /></a>
    </footer>
  );
}
