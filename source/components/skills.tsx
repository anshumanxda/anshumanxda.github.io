"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import {
  Code,
  Layers,
  Terminal,
  Braces,
  FileCode,
  Paintbrush,
  Database,
  GitBranch,
  Cpu,
  Globe,
  LayoutGrid,
} from "lucide-react"

export default function Skills() {
  const skillCategories = [
    {
      category: "Languages",
      icon: <Code className="h-6 w-6 text-[#E44D26]" />,
      skills: [
        { name: "HTML", icon: <FileCode className="h-4 w-4" /> },
        { name: "CSS", icon: <Paintbrush className="h-4 w-4" /> },
        { name: "JavaScript", icon: <Braces className="h-4 w-4" /> },
        { name: "C", icon: <Terminal className="h-4 w-4" /> },
        { name: "C++", icon: <Terminal className="h-4 w-4" /> },
      ],
    },
    {
      category: "Frameworks & Libraries",
      icon: <Layers className="h-6 w-6 text-[#61DAFB]" />,
      skills: [
        { name: "ReactJS", icon: <Globe className="h-4 w-4" /> },
        { name: "Redux", icon: <Database className="h-4 w-4" /> },
        { name: "Redux Toolkit", icon: <Database className="h-4 w-4" /> },
        { name: "Recoil", icon: <Cpu className="h-4 w-4" /> },
        { name: "NextJS", icon: <LayoutGrid className="h-4 w-4" /> },
        { name: "NodeJS", icon: <Terminal className="h-4 w-4" /> },
        { name: "Tailwind", icon: <Paintbrush className="h-4 w-4" /> },
        { name: "Framer Motion", icon: <Layers className="h-4 w-4" /> },
        { name: "React Query", icon: <Database className="h-4 w-4" /> },
        { name: "Apollo GraphQL", icon: <Database className="h-4 w-4" /> },
      ],
    },
    {
      category: "Developer Tools",
      icon: <GitBranch className="h-6 w-6 text-[#F05032]" />,
      skills: [
        { name: "VS Code", icon: <Code className="h-4 w-4" /> },
        { name: "Git", icon: <GitBranch className="h-4 w-4" /> },
      ],
    },
  ]

  return (
    <section id="skills" className="py-12">
      <div className="container px-4 md:px-6">
        <SectionHeader
          title="Technical Skills"
          subtitle="Technologies and tools I work with to build amazing web experiences."
        />

        <div className="grid gap-8 mt-12">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="card-hover-effect">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {category.icon}
                    <h3 className="text-xl font-semibold">{category.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 + skillIndex * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <Badge
                          variant="outline"
                          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors flex items-center gap-1.5 py-1.5"
                        >
                          {skill.icon}
                          {skill.name}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
