"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Copy, Github, Linkedin } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
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
    { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: site.social.github, label: "GitHub", Icon: Github },
  ]

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeader eyebrow="06 / Contact" title="Let's build something." subtitle="Got an idea, a role, or just want to say hi? My inbox is open." />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-60px" }}
        className="flex flex-col justify-between gap-8 rounded-3xl border border-border bg-gradient-to-br from-brand/15 via-card to-brand-2/15 p-6 sm:p-10 lg:flex-row lg:items-end"
      >
          <div>
            <p className="text-sm text-muted-foreground">Email me at</p>
            <button
              onClick={copyEmail}
              className="group mt-2 flex max-w-full items-center gap-3 text-left font-display text-xl font-bold sm:text-4xl"
            >
              <span className="break-all">{site.email}</span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors group-hover:text-foreground">
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </span>
            </button>
            <p className="mt-2 h-5 font-mono text-xs text-muted-foreground" aria-live="polite">
              {copied ? "copied to clipboard ✓" : "click to copy"}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer me"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
              >
                <Icon className="h-4 w-4" /> {label}
              </a>
            ))}
          </div>
      </motion.div>
    </section>
  )
}
