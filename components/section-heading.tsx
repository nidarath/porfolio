import type { ReactNode } from "react";
import PixelMark from "@/components/pixel-mark";

export default function SectionHeading({ number, label, children, id }: { number: string; label: string; children: ReactNode; id?: string }) {
  return (
    <div>
      <p className="section-label mb-5 flex items-center gap-3"><span className="text-accent-strong">{number}</span><span className="h-px w-6 bg-accent" />{label}</p>
      <div className="flex items-start gap-4 md:gap-6">
        <h2 id={id} className="section-title">{children}</h2>
        <PixelMark className="mt-1 h-7 w-7 shrink-0 text-accent md:mt-2 md:h-10 md:w-10" />
      </div>
    </div>
  );
}
