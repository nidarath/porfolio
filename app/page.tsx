import StickyNav from "@/components/navbar";
import CuteHero from "@/components/hero";
import WorkSection from "@/components/project";

export default function Home() {
  return (
    <main className="relative">
      <StickyNav />
      <CuteHero />
      <WorkSection />
      
      <section id="about" className="h-screen flex items-center justify-center bg-white border-t">
        <h2 className="text-3xl text-gray-300">About Placeholder</h2>
      </section>

      <section id="contact" className="h-screen flex items-center justify-center bg-gray-50 border-t">
        <h2 className="text-3xl text-gray-300">Contact Placeholder</h2>
      </section>

    </main>
  );
}