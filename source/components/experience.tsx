"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowUpRight, MapPin } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { experiences } from "@/lib/site"
import { cn } from "@/lib/utils"

export default function Experience() {
  const listRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeader
        eyebrow="02 / Experience"
        title="Where I've shipped"
        subtitle="Five teams, one habit: leave the codebase faster and friendlier than I found it."
      />

      <div ref={listRef} className="relative">
        <div aria-hidden className="absolute bottom-2 top-2 left-[7px] w-[2px] rounded bg-border md:left-[calc(11rem+7px)]" />
        <motion.div
          aria-hidden
          className="absolute bottom-2 top-2 left-[7px] w-[2px] origin-top rounded bg-gradient-to-b from-brand to-brand-2 md:left-[calc(11rem+7px)]"
          style={{ scaleY: progress }}
        />

        <ol className="space-y-10 md:space-y-14">
        {experiences.map((exp, i) => (
          <motion.li
            key={exp.company}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative pl-8 md:pl-[calc(11rem+2.5rem)]"
          >
            <motion.span
              aria-hidden
              initial={{ scale: 0.4 }}
              whileInView={{ scale: 1 }}
              viewport={{ margin: "-45% 0px -45% 0px" }}
              className={cn(
                "absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-background ring-2 md:left-[11rem]",
                exp.current ? "bg-brand ring-brand/40" : "bg-muted-foreground ring-border",
              )}
            >
              {exp.current && <span className="absolute inset-0 animate-ping rounded-full bg-brand/60" />}
            </motion.span>

            <p className="mb-2 font-mono text-xs text-muted-foreground md:absolute md:left-0 md:top-1 md:mb-0 md:w-[9.5rem] md:text-right md:text-sm">
              {exp.period}
            </p>

            <SpotlightCard className="p-5 sm:p-7">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold sm:text-2xl">
                    {exp.url ? (
                      <a href={exp.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-brand">
                        {exp.company}
                        <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    ) : (
                      exp.company
                    )}
                  </h3>
                  <p className="font-medium text-brand">{exp.position}</p>
                </div>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {exp.location}
                </p>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {exp.description.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.tags.map((t) => (
                  <span key={t} className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[11px] text-secondary-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </motion.li>
        ))}
        </ol>
      </div>
    </section>
  )
}
