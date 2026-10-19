import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import VelocityMarquee from "@/components/velocity-marquee"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import BugBash from "@/components/bug-bash"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { TimeMachineProvider } from "@/components/time-machine"

export default function Home() {
  return (
    <TimeMachineProvider>
      <Navbar />
      <main className="relative">
        <Hero />
        <VelocityMarquee items={["React", "Next.js", "TypeScript", "Framer Motion", "WebRTC", "Tailwind", "Redux"]} />
        <About />
        <Experience />
        <Skills />
        <BugBash />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </TimeMachineProvider>
  )
}
