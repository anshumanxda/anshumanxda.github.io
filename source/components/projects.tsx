"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowRight, ExternalLink, Github, LayoutGrid, Music, Newspaper, Thermometer } from "lucide-react"

const projects = [
  {
    title: "Music Player",
    Icon: Music,
    color: "#E8577E",
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
    color: "#7C8CFF",
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
    color: "#3FBF7F",
    date: "2023",
    description: "Classic UI interview problems (tic-tac-toe and friends) solved in vanilla JS. No frameworks, just the DOM.",
    technologies: ["JavaScript", "HTML", "CSS"],
    code: "https://github.com/anshumanxda/dom-challenges",
    demo: "https://anshumanpathak.com/dom-challenges/tic-tac-toe/",
  },
  {
    title: "Weather App",
    Icon: Thermometer,
    color: "#F2A541",
    date: "2021",
    description: "Finds you via IP geolocation and serves up a clean, quick weather report. One of my first React apps.",
    technologies: ["React", "Tailwind"],
    code: "https://github.com/anshumanxda/weather-app",
    demo: "https://zweather.netlify.com",
  },
]

function ProjectCard({ p, i }: { p: (typeof projects)[number]; i: number }) {
  return (
    <article className="group flex w-[82vw] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-border bg-card sm:w-[420px] md:h-[min(560px,72vh)] md:w-[440px]">
      <div className="relative flex h-44 shrink-0 items-end justify-between overflow-hidden p-6 md:h-[45%]" style={{ background: `${p.color}1f` }}>
        <span
          aria-hidden
          className="absolute -right-4 -top-10 font-display text-[11rem] font-bold leading-none tracking-tighter opacity-20 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105"
          style={{ color: p.color }}
        >
          {String(i + 1).padStart(2, "0")}
        </span>
        <div className="relative grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" style={{ background: p.color, color: "#0b0f0d" }}>
          <p.Icon className="h-6 w-6" />
        </div>
        <span className="relative font-mono text-xs text-muted-foreground">{p.date}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-bold tracking-tight">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">{p.description}</p>
        <p className="mt-4 font-mono text-xs text-muted-foreground">{p.technologies.join(" · ")}</p>
        <div className="mt-5 flex gap-2">
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
    </article>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollMode, setScrollMode] = useState(false)
  const [distance, setDistance] = useState(0)
  const [viewport, setViewport] = useState(0)

  // Desktop: vertical scroll drives the track sideways. Touch / small / reduced-motion: native swipe.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)")
    const measure = () => {
      setScrollMode(mq.matches)
      setViewport(window.innerHeight)
      const track = trackRef.current
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener("resize", measure)
    mq.addEventListener("change", measure)
    return () => {
      window.removeEventListener("resize", measure)
      mq.removeEventListener("change", measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative"
      style={scrollMode && distance ? { height: distance + viewport } : undefined}
    >
      <div className={scrollMode ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-24 sm:py-32"}>
        <div className="mx-auto mb-8 flex w-full max-w-6xl items-end justify-between gap-4 px-4 sm:px-6 md:mb-10">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-brand">Projects</p>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">Side quests</h2>
          </div>
          <p className="hidden items-center gap-2 font-mono text-xs text-muted-foreground sm:flex">
            {scrollMode ? "keep scrolling" : "swipe"} <ArrowRight className="h-3.5 w-3.5" />
          </p>
        </div>

        <div className={scrollMode ? "" : "snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"}>
          <motion.div
            ref={trackRef}
            style={scrollMode ? { x } : undefined}
            className="flex w-max gap-4 px-4 sm:gap-6 sm:px-6 lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
          >
            {projects.map((p, i) => (
              <ProjectCard key={p.title} p={p} i={i} />
            ))}
            <a
              href="https://github.com/anshumanxda?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-[60vw] shrink-0 snap-start flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border text-center transition-colors hover:border-brand sm:w-[300px] md:h-[min(560px,72vh)]"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full bg-secondary transition-transform group-hover:scale-110 group-hover:bg-brand group-hover:text-brand-foreground">
                <Github className="h-7 w-7" />
              </span>
              <span className="font-display text-xl font-bold">More on GitHub</span>
              <span className="font-mono text-xs text-muted-foreground">@anshumanxda</span>
            </a>
          </motion.div>
        </div>

        {scrollMode && (
          <div className="mx-auto mt-8 w-full max-w-6xl px-6">
            <div className="h-px bg-border">
              <motion.div className="h-px origin-left bg-brand" style={{ scaleX: progress }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
