import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import GitHub from "@/components/GitHub";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground font-sans">
      <Loader />
      <div className="hidden md:block">
        <Cursor />
      </div>
      
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <GitHub />
        <Testimonials />
        <Contact />
        <SocialLinks />
      </main>
      <Footer />
      
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}