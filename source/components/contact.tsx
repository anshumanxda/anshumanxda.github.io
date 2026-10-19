"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Check, Copy } from "lucide-react"
import { site } from "@/lib/site"

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  const socials = [
    { href: site.social.linkedin, label: "LinkedIn" },
    { href: site.social.github, label: "GitHub" },
  ]

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-28 text-center sm:px-6 sm:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[380px] w-[680px] -translate-x-1/2 translate-y-1/2 rounded-full bg-brand/15 blur-[120px]"
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative mx-auto max-w-6xl"
      >
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-brand">Contact</p>
        <h2 className="font-display text-[clamp(3rem,11vw,9.5rem)] font-bold leading-[0.9] tracking-tighter">
          Let&apos;s build
          <br />
          <span className="text-gradient">something.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-md text-muted-foreground sm:text-lg">Got an idea, a role, or just want to say hi? My inbox is open.</p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex max-w-full items-center gap-2 break-all font-display text-xl font-bold underline decoration-brand decoration-2 underline-offset-8 transition-colors hover:text-brand sm:text-3xl"
          >
            {site.email}
            <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-live="polite"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-brand" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "copied to clipboard" : "copy email"}
          </button>
        </div>

        <div className="mt-10 flex justify-center gap-8 font-mono text-sm">
          {socials.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer me"
              className="group inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
