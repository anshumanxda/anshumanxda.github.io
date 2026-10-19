"use client"

import { motion } from "framer-motion"

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className="mb-10 sm:mb-14"
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-brand">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-muted-foreground sm:text-lg">{subtitle}</p>}
    </motion.div>
  )
}
