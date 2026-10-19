"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { GitBranch, Hand, Radio, RotateCcw, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

const dailyDrivers = ["React", "Next.js", "TypeScript", "Tailwind"]
// Two marquee rows with no overlap: state & data on top, UI / motion / server below.
const ecosystem = [
  ["Redux Toolkit", "React Query", "Recoil", "Apollo GraphQL"],
  ["Framer Motion", "Radix UI", "Chakra UI", "Node.js"],
]
const realtime = ["WebRTC", "WebSockets", "LiveKit"]
const roots = ["C", "C++", "JavaScript", "HTML", "CSS"]
const tools = [
  { name: "Git", hash: "a63f4e7" },
  { name: "VS Code", hash: "3b5ae23" },
  { name: "Figma", hash: "c18ad9c" },
]

function usePointerFine() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    // Only fine pointers get drag; on touch it would hijack page scrolling.
    const mq = window.matchMedia("(pointer: fine)")
    setFine(mq.matches)
    const on = () => setFine(mq.matches)
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])
  return fine
}

function Draggable({
  children,
  constraints,
  draggable,
}: {
  children: React.ReactNode
  constraints: React.RefObject<HTMLDivElement | null>
  draggable: boolean
}) {
  const controls = useAnimationControls()
  const boing = () => {
    if (draggable) return
    controls.start({ rotate: [0, -10, 8, -4, 0], scale: [1, 1.15, 0.97, 1.03, 1], transition: { duration: 0.5 } })
  }
  return (
    <motion.button
      type="button"
      animate={controls}
      drag={draggable}
      dragConstraints={constraints}
      dragElastic={0.25}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 12 }}
      whileHover={draggable ? { scale: 1.05, rotate: -2 } : undefined}
      whileDrag={{ scale: 1.1, rotate: 5, zIndex: 10 }}
      onTap={boing}
      className={cn("select-none", draggable ? "cursor-grab active:cursor-grabbing" : "cursor-pointer")}
    >
      {children}
    </motion.button>
  )
}

function Tile({ className, children, delay = 0 }: { className?: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
      viewport={{ once: true, margin: "-60px" }}
      className={cn("relative overflow-hidden rounded-3xl border border-border p-6 sm:p-7", className)}
    >
      {children}
    </motion.div>
  )
}

const label = "font-mono text-xs uppercase tracking-[0.2em]"

export default function Skills() {
  const playRef = useRef<HTMLDivElement>(null)
  const draggable = usePointerFine()
  const [round, setRound] = useState(0)

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <div className="mb-10 flex flex-col justify-between gap-4 sm:mb-14 md:flex-row md:items-end">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-brand">Skills</p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">The toolbox</h2>
        </div>
        <p className="max-w-xs text-muted-foreground md:text-right">What I reach for, from first commit to production. Go on, play with them.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Daily drivers: big and draggable */}
        <Tile className="border-transparent bg-brand text-brand-foreground md:col-span-2 md:row-span-2">
          <div ref={playRef} className="relative flex h-full min-h-[260px] flex-col sm:min-h-[340px]">
            <div className="flex items-center justify-between">
              <span className={label}>Daily drivers</span>
              <span className="flex items-center gap-3 font-mono text-xs opacity-70">
                <span className="flex items-center gap-1.5">
                  <Hand className="h-3.5 w-3.5" /> {draggable ? "drag me" : "tap me"}
                </span>
                {draggable && (
                  <button onClick={() => setRound((r) => r + 1)} className="hover:opacity-100" aria-label="Reset positions">
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
              </span>
            </div>
            <div key={round} className="mt-auto flex flex-wrap items-end gap-x-4 gap-y-1 pt-10 sm:gap-x-6">
              {dailyDrivers.map((s) => (
                <Draggable key={s} constraints={playRef} draggable={draggable}>
                  <span className="block font-display text-5xl font-bold leading-none tracking-tighter sm:text-7xl lg:text-8xl">{s}</span>
                </Draggable>
              ))}
            </div>
          </div>
        </Tile>

        {/* Real-time: a little live waveform */}
        <Tile className="bg-card" delay={0.1}>
          <div className="flex items-center justify-between">
            <span className={cn(label, "text-muted-foreground")}>Real-time</span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-brand-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-2 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-2" />
              </span>
              live
            </span>
          </div>
          <div aria-hidden className="my-6 flex h-10 items-center gap-1">
            {Array.from({ length: 28 }).map((_, i) => (
              <motion.span
                key={i}
                className="w-1 flex-1 rounded-full bg-brand-2/70"
                animate={{ height: ["20%", `${30 + ((i * 37) % 70)}%`, "20%"] }}
                transition={{ duration: 1.2 + (i % 5) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {realtime.map((s) => (
              <span key={s} className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-sm">
                <Radio className="h-3.5 w-3.5 text-brand-2" /> {s}
              </span>
            ))}
          </div>
        </Tile>

        {/* Roots: always a terminal, in both themes */}
        <Tile className="border-[#1f2e27] bg-[#07100c] font-mono text-[13px] text-[#efeccf]" delay={0.15}>
          <div className="mb-4 flex items-center gap-2 text-xs opacity-60">
            <Terminal className="h-3.5 w-3.5" /> roots.sh
          </div>
          <p>
            <span className="text-[#62cf8f]">$</span> cat where_it_started.txt
          </p>
          <p className="mt-2 leading-relaxed">{roots.join("  ")}</p>
          <p className="mt-3">
            <span className="text-[#62cf8f]">$</span> gcc first_love.c
            <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[#f9d65c]" />
          </p>
        </Tile>

        {/* Ecosystem */}
        <Tile className="bg-card md:col-span-2" delay={0.1}>
          <span className={cn(label, "text-muted-foreground")}>Ecosystem</span>
          <div className="group -mx-6 mt-5 space-y-3 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)] sm:-mx-7">
            {ecosystem.map((row, r) => (
              <div
                key={r}
                className={cn(
                  "flex w-max group-hover:[animation-play-state:paused]",
                  r === 0 ? "animate-marquee" : "animate-marquee-reverse",
                )}
              >
                {/* Each half is the row twice (wider than the tile); two halves make the -50% loop seamless */}
                {[...row, ...row, ...row, ...row].map((s, i) => (
                  <span
                    key={i}
                    aria-hidden={i >= row.length}
                    className={cn(
                      "mr-3 whitespace-nowrap rounded-full border px-4 py-2 font-display text-lg font-semibold tracking-tight sm:text-xl",
                      r === 0 ? "border-border" : "border-brand/30 text-brand",
                    )}
                  >
                    {s}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </Tile>

        {/* Tools: git log */}
        <Tile className="bg-card" delay={0.15}>
          <span className={cn(label, "text-muted-foreground")}>Tools</span>
          <ul className="mt-5 space-y-2.5 font-mono text-sm">
            {tools.map((t, i) => (
              <li key={t.name} className="flex items-center gap-3">
                <GitBranch className={cn("h-4 w-4", i === 0 ? "text-brand" : "text-muted-foreground")} />
                <span className="text-muted-foreground">{t.hash}</span>
                <span>{t.name}</span>
              </li>
            ))}
          </ul>
        </Tile>
      </div>
    </section>
  )
}
