"use client"

import { useEffect, useRef, useState } from "react"
import { animate, motion, useInView } from "framer-motion"
import { GraduationCap, Smartphone } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { experiences, site } from "@/lib/site"

const careerStart = new Date(2021, 10) // Nov 2021, first role at Rupyz

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  )
}

export default function About() {
  const years = Math.floor((Date.now() - careerStart.getTime()) / (365.25 * 24 * 3600 * 1000))
  const stats = [
    { value: years, suffix: "+", label: "years shipping frontend" },
    { value: experiences.length, suffix: "", label: "companies so far" },
    { value: 404, suffix: "", label: "bugs squashed (est.)" },
  ]

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeader eyebrow="01 / About" title="Hi, I'm Anshuman." />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          <p>
            I&apos;m <strong className="text-foreground">Anshuman Pathak</strong>, a software engineer who cares about the
            details: the 16ms frame budget, the focus ring nobody else noticed, the form that just <em>feels</em> right.
            I&apos;m currently an {experiences[0].position} at{" "}
            <a href={site.companyUrl} className="text-foreground underline decoration-brand underline-offset-4" target="_blank" rel="noopener noreferrer">
              {site.company}
            </a>
            , working on the web side of an AI platform that photographers use to cull, edit and deliver their work.
          </p>
          <p>
            Before that I built commerce tooling at Fynd, real-time calling and chat at Samespace, content tools at
            Compose.ly and dashboards at Rupyz. Most days you&apos;ll find me deep in React, Next.js and TypeScript.
          </p>
          <p>
            You might know me as <span className="font-mono text-foreground">@{site.handle}</span>. The handle goes back
            to my XDA days of building custom Android ROMs and kernels, long before I wrote my first{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-sm text-foreground">useEffect</code>.
          </p>
        </motion.div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border bg-card p-3 sm:p-5"
              >
                <div className="font-display text-2xl font-bold sm:text-4xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-[11px] leading-tight text-muted-foreground sm:text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Bachelor of Computer Applications</p>
              <p className="text-sm text-muted-foreground">IGNOU, New Delhi · 2018 – 2021</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-2/15 text-brand-2">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Origin story</p>
              <p className="text-sm text-muted-foreground">
                Device trees and kernels for the Redmi 3S. That&apos;s where the &ldquo;xda&rdquo; comes from.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
