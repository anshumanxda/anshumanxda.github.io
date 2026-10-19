"use client"

import { useTimeMachine } from "@/components/time-machine"
import { site } from "@/lib/site"

export default function Footer() {
  const { travel } = useTimeMachine()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-center text-sm text-muted-foreground sm:flex-row sm:px-6 sm:text-left">
        <p>
          © {year} {site.name} · <span className="font-mono">@{site.handle}</span>
        </p>
        <p className="flex items-center gap-1">
          Hand-crafted with Next.js & too many protein shakes
          {/* Easter egg: the original v1 of this site lives behind this cassette. */}
          <button
            onClick={travel}
            title="Be kind, rewind"
            aria-label="Rewind to version 1 of this site"
            className="ml-1 rounded px-1 opacity-30 grayscale transition-all hover:scale-125 hover:opacity-100 hover:grayscale-0 focus-visible:opacity-100"
          >
            📼
          </button>
        </p>
      </div>
    </footer>
  )
}
