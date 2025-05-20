"use client"

import { motion } from "framer-motion"

export function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-2"
      >
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{title}</h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto max-w-[700px] text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </div>
  )
}
