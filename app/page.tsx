import Nav from "@/components/navbar";
import Hero from "@/components/hero";
import Work from "@/components/project";
import About from "@/components/about";
export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Work />
      <About />

      <section id="contact" className="h-screen flex items-center justify-center bg-gray-50 border-t">
        <h2 className="text-3xl text-gray-300">Contact Placeholder</h2>
      </section>

    </main>
  );
}