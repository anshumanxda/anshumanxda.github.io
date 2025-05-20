import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Contact from "@/components/contact"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20 pt-10 pb-32">
          <Hero />
          <Experience />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </div>
      </ScrollArea>
    </main>
  )
}
