"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Music, Cloud, Thermometer } from "lucide-react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"

export default function Projects() {
  const projects = [
    {
      title: "Music Player",
      icon: <Music className="h-5 w-5 text-[#E91E63]" />,
      description:
        "Designed and developed a music player with functionalities including song playback control, playlist, and intuitive music library exploration.",
      technologies: ["React", "Redux", "Tailwind", "GraphQL"],
      date: "June 2023",
      details: [
        "Utilized React for a dynamic UI, Redux for centralized state management, Tailwind CSS for rapid and responsive styling, and GraphQL for optimized data fetching in my music player project.",
        "Enhanced my understanding of state management using Redux and explored efficient data retrieval methodologies through GraphQL implementation.",
      ],
    },
    {
      title: "Dev.to Clone",
      icon: <Cloud className="h-5 w-5 text-[#3B49DF]" />,
      description:
        "Built a dev community platform inspired by dev.to, with features like fetching articles, searching articles, listing feature, etc.",
      technologies: ["Javascript", "NextJS", "React Query", "Tailwind"],
      date: "October 2022",
      details: [
        "Utilized Next.js for server-side rendering and static generation, React Query for efficient data fetching, Redux for global state management, and Tailwind CSS for a consistent and customizable user interface.",
      ],
    },
    {
      title: "Weather App",
      icon: <Thermometer className="h-5 w-5 text-[#2196F3]" />,
      description:
        "Developed a weather application that automatically retrieves the user's location through IP geolocation and displays a basic weather report.",
      technologies: ["React", "Tailwind CSS"],
      date: "August 2021",
      details: ["Used React for a dynamic interface and Tailwind CSS for a clean and responsive design."],
    },
  ]

  return (
    <section id="projects" className="py-12">
      <div className="container px-4 md:px-6">
        <SectionHeader title="Projects" subtitle="A showcase of my technical projects and applications." />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="h-full flex flex-col card-hover-effect">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {project.icon}
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                  </div>
                  <CardDescription>{project.date}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {project.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1 transition-all hover:scale-105">
                    <Github className="h-4 w-4" />
                    <span>Code</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 transition-all hover:scale-105">
                    <ExternalLink className="h-4 w-4" />
                    <span>Demo</span>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
