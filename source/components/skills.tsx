"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { Hand, RotateCcw } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { cn } from "@/lib/utils"

const groups = [
  {
    name: "Languages",
    tone: "bg-brand/10 text-brand border-brand/30",
    skills: ["TypeScript", "JavaScript", "HTML", "CSS", "C", "C++"],
  },
  {
    name: "Frameworks & libraries",
    tone: "bg-brand-2/10 text-brand-2 border-brand-2/30",
    skills: ["React", "Next.js", "Redux Toolkit", "React Query", "Recoil", "Node.js", "Tailwind", "Framer Motion", "Radix UI", "Apollo GraphQL"],
  },
  {
    name: "Real-time & tooling",
    tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    skills: ["WebRTC", "WebSockets", "LiveKit", "Git", "VS Code", "Figma"],
  },
]

function Chip({ label, tone, constraints, draggable }: { label: string; tone: string; constraints: React.RefObject<HTMLDivElement | null>; draggable: boolean }) {
  const controls = useAnimationControls()
  const boing = () => {
    if (draggable) return
    controls.start({ rotate: [0, -12, 10, -6, 0], scale: [1, 1.25, 0.95, 1.05, 1], transition: { duration: 0.5 } })
  }
  return (
    <motion.button
      type="button"
      animate={controls}
      drag={draggable}
      dragConstraints={constraints}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 12 }}
      whileHover={draggable ? { scale: 1.08, rotate: -2 } : undefined}
      whileDrag={{ scale: 1.15, rotate: 6, zIndex: 10 }}
      onTap={boing}
      className={cn(
        "select-none rounded-full border px-4 py-2 font-mono text-sm shadow-sm backdrop-blur",
        draggable ? "cursor-grab active:cursor-grabbing" : "cursor-pointer",
        tone,
      )}
    >
      {label}
    </motion.button>
  )
}

export default function Skills() {
  const constraintsRef = useRef<HTMLDivElement>(null)
  const [draggable, setDraggable] = useState(false)
  const [round, setRound] = useState(0)

  useEffect(() => {
    // Only fine pointers get drag; on touch it would hijack page scrolling.
    const mq = window.matchMedia("(pointer: fine)")
    setDraggable(mq.matches)
    const on = () => setDraggable(mq.matches)
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeader eyebrow="03 / Skills" title="My toolbox" subtitle="Go on, play with them. They don't bite." />

      <div ref={constraintsRef} className="relative rounded-3xl border border-dashed border-border bg-card/40 p-5 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Hand className="h-3.5 w-3.5" />
            {draggable ? "drag & fling the chips" : "tap a chip"}
          </span>
          {draggable && (
            <button onClick={() => setRound((r) => r + 1)} className="flex items-center gap-1.5 rounded-full px-2 py-1 hover:bg-secondary hover:text-foreground">
              <RotateCcw className="h-3.5 w-3.5" /> tidy up
            </button>
          )}
        </div>

        <div key={round} className="space-y-6">
          {groups.map((g, gi) => (
            <div key={g.name}>
              <p className="mb-3 text-sm font-medium">{g.name}</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {g.skills.map((s, si) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: gi * 0.15 + si * 0.04 }}
                  >
                    <Chip label={s} tone={g.tone} constraints={constraintsRef} draggable={draggable} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
