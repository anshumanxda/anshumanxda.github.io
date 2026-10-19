"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ExternalLink, Github, LayoutGrid, Music, Newspaper, Thermometer } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"

const projects = [
  {
    title: "Music Player",
    Icon: Music,
    color: "#E91E63",
    date: "2023",
    description:
      "A Spotify-style music player with playback controls, playlists and library browsing. Redux for state, GraphQL for lean data fetching.",
    technologies: ["React", "Redux", "GraphQL", "Tailwind"],
    code: "https://github.com/anshumanxda/spotify-music",
    demo: "https://same-space.netlify.app",
  },
  {
    title: "Dev.to Clone",
    Icon: Newspaper,
    color: "#3B49DF",
    date: "2022",
    description:
      "A dev community platform inspired by dev.to: article feeds, search and listings, server-rendered with Next.js and cached with React Query.",
    technologies: ["Next.js", "React Query", "Redux", "Tailwind"],
    code: "https://github.com/anshumanxda/dev.to-clone",
    demo: "https://devtoo.vercel.app",
  },
  {
    title: "DOM Challenges",
    Icon: LayoutGrid,
    color: "#10B981",
    date: "2023",
    description:
      "Classic UI interview problems (tic-tac-toe and friends) solved in vanilla JS, no frameworks, just the DOM.",
    technologies: ["JavaScript", "HTML", "CSS"],
    code: "https://github.com/anshumanxda/dom-challenges",
    demo: "https://anshumanpathak.com/dom-challenges/tic-tac-toe/",
  },
  {
    title: "Weather App",
    Icon: Thermometer,
    color: "#2196F3",
    date: "2021",
    description: "Finds you via IP geolocation and serves up a clean, quick weather report. One of my first React apps.",
    technologies: ["React", "Tailwind"],
    code: "https://github.com/anshumanxda/weather-app",
    demo: "https://zweather.netlify.com",
  },
]

function TiltCard({ children }: { children: React.ReactNode }) {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 })

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width)
        my.set((e.clientY - r.top) / r.height)
      }}
      onPointerLeave={() => {
        mx.set(0.5)
        my.set(0.5)
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeader eyebrow="05 / Projects" title="Side quests" subtitle="Things I built to learn, tinker and have fun." />

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <TiltCard>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/40 sm:p-7">
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                  style={{ background: p.color }}
                />
                <div className="relative flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: `${p.color}22`, color: p.color }}>
                    <p.Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{p.date}</span>
                </div>
                <h3 className="relative mt-5 font-display text-xl font-bold sm:text-2xl">{p.title}</h3>
                <p className="relative mt-2 flex-grow text-sm leading-relaxed text-muted-foreground sm:text-[15px]">{p.description}</p>
                <div className="relative mt-4 flex flex-wrap gap-2">
                  {p.technologies.map((t) => (
                    <span key={t} className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="relative mt-6 flex gap-2">
                  <a
                    href={p.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-4 text-sm transition-colors hover:border-foreground"
                  >
                    <Github className="h-4 w-4" /> Code
                  </a>
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm text-background transition-transform hover:scale-105"
                  >
                    <ExternalLink className="h-4 w-4" /> Live demo
                  </a>
                </div>
              </div>
            </TiltCard>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
