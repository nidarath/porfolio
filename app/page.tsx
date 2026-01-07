import Nav from "@/components/navbar";
import Hero from "@/components/hero";
import Work from "@/components/project";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Work />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}