"use client"

import { cn } from "@/lib/utils"

/** Card with a soft glow that follows the pointer. */
export function SpotlightCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`)
  }
  return (
    <div
      onPointerMove={onPointerMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand/40",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(400px circle at var(--mx) var(--my), hsl(var(--brand) / 0.12), transparent 60%)" }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
