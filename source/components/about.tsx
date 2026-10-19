"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import AboutPhone from "@/components/about-phone"
import { site } from "@/lib/site"

const STATEMENT =
  "I build interfaces that feel fast, look sharp and work for everyone. I sweat the small stuff: the 16ms frame budget, the focus ring nobody noticed, the form that just feels right."

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  )
}

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
function ScrollRevealText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] })
  const words = text.split(" ")
  return (
    <p ref={ref} className="font-display text-[1.7rem] font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
      {words.map((w, i) => (
        <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  )
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-36">
      <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-brand">About me</h2>
      <ScrollRevealText text={STATEMENT} />

      <div className="mt-20 grid items-center gap-14 sm:mt-28 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p className="text-xl leading-snug text-foreground sm:text-2xl">
            I&apos;m <strong className="text-foreground">Anshuman Pathak</strong>, a software engineer currently at{" "}
            <a href={site.companyUrl} className="text-foreground underline decoration-brand decoration-2 underline-offset-4" target="_blank" rel="noopener noreferrer">
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
            to my XDA days of building device trees and kernels for the Redmi 3S, long before I wrote my first{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-sm text-foreground">useEffect</code>.
          </p>
        </div>

        <AboutPhone />
      </div>
    </section>
  )
}
