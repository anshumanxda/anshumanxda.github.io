"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useScroll, useSpring } from "framer-motion"
import { ArrowUpRight, Plus } from "lucide-react"
import { experiences, type Experience as Exp } from "@/lib/site"
import { cn } from "@/lib/utils"

const startYear = (period: string) => period.match(/\d{4}/)?.[0] ?? ""

function Row({ exp, index, open, onToggle, onActive }: { exp: Exp; index: number; open: boolean; onToggle: () => void; onActive: () => void }) {
  const ref = useRef<HTMLLIElement>(null)
  // "Active" = the row crossing the middle band of the viewport.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" })
  useEffect(() => {
    if (inView) onActive()
  }, [inView, onActive])

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      viewport={{ once: true, margin: "-60px" }}
      className="border-b border-border"
    >
      <button onClick={onToggle} aria-expanded={open} className="group flex w-full items-start gap-4 py-6 text-left sm:gap-6 sm:py-8">
        <span className="pt-1.5 font-mono text-xs text-muted-foreground sm:pt-3">{String(index + 1).padStart(2, "0")}</span>
        <span className="flex-1">
          <span className="flex items-center gap-3">
            <span className="font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-brand sm:text-4xl">
              {exp.company.replace(/ \(.*\)$/, "")}
            </span>
            {exp.current && (
              <span className="rounded-full bg-brand px-2 py-0.5 font-mono text-[10px] font-medium uppercase text-brand-foreground">now</span>
            )}
          </span>
          <span className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground sm:text-sm">
            <span className="text-foreground">{exp.position}</span>
            <span>·</span>
            <span>{exp.period}</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">{exp.location}</span>
          </span>
        </span>
        <Plus className={cn("mt-1.5 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 sm:mt-3", open && "rotate-45 text-brand")} />
      </button>

      {/* Collapsed with grid rows (not unmounted) so the text stays in the HTML for search engines. */}
      <div className={cn("grid transition-[grid-template-rows] duration-500 ease-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <div className="pb-8 pl-8 sm:pl-12">
            <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {exp.description.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[0.6em] h-px w-3 shrink-0 bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
              <span>{exp.tags.join(" / ")}</span>
              {exp.url && (
                <a href={exp.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-foreground hover:text-brand">
                  visit <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  )
}

export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]))
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })

  const year = startYear(experiences[active].period)

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-brand">Experience</p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Where I&apos;ve shipped</h2>
          <p className="mt-4 max-w-sm text-muted-foreground">Five teams, one habit: leave the codebase faster and friendlier than I found it.</p>

          <div className="mt-10 hidden lg:block">
            <div className="relative h-[1.1em] overflow-hidden font-display text-8xl font-bold leading-none tracking-tighter text-brand">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={year}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                  className="block"
                >
                  {year}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="mt-6 h-px w-full bg-border">
              <motion.div className="h-px origin-left bg-brand" style={{ scaleX: progress }} />
            </div>
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              {String(active + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")} · {experiences[active].company.replace(/ \(.*\)$/, "")}
            </p>
          </div>
        </aside>

        <ol ref={listRef} className="border-t border-border">
          {experiences.map((exp, i) => (
            <Row key={exp.company} exp={exp} index={i} open={open.has(i)} onToggle={() => toggle(i)} onActive={() => setActive(i)} />
          ))}
        </ol>
      </div>
    </section>
  )
}
