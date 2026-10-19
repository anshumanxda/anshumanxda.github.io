"use client"

import { useRef } from "react"
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from "framer-motion"

/** A ticker that speeds up — and flips direction — with your scroll. */
export default function VelocityMarquee({ items, baseVelocity = -2 }: { items: string[]; baseVelocity?: number }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false })
  const direction = useRef(1)
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    let move = direction.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    move += direction.current * move * f
    baseX.set(baseX.get() + move)
  })

  const row = [...items, ...items]
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-border bg-card/40 py-4 sm:py-5">
      <motion.div className="flex w-max gap-8 whitespace-nowrap font-display text-2xl font-bold tracking-tight sm:text-4xl" style={{ x }}>
        {[...row, ...row].map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className={i % 2 ? "text-muted-foreground/50" : ""}>{item}</span>
            <span className="text-brand">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
