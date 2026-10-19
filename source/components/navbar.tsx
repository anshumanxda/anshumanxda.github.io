"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion"
import { Menu, Moon, Sun, X } from "lucide-react"
import { useTimeMachine } from "@/components/time-machine"
import { cn } from "@/lib/utils"

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#play", label: "Play" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

const TAPS_TO_TRAVEL = 5

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [taps, setTaps] = useState(0)
  const tapTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const { travel } = useTimeMachine()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toggleTheme = () => {
    document.documentElement.classList.add("theme-transition")
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
    setTimeout(() => document.documentElement.classList.remove("theme-transition"), 300)
  }

  // Easter egg: tap the logo 5 times quickly to travel back to v1.
  const onLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0 })
    clearTimeout(tapTimer.current)
    const next = taps + 1
    if (next >= TAPS_TO_TRAVEL) {
      setTaps(0)
      travel()
      return
    }
    setTaps(next)
    tapTimer.current = setTimeout(() => setTaps(0), 1200)
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "border-b border-border/60 bg-background/75 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" onClick={onLogoClick} className="group relative flex items-center gap-2" aria-label="Anshuman Pathak, home">
          <motion.span
            animate={{ rotate: taps * 72 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="grid h-9 w-9 place-items-center rounded-lg bg-foreground font-display text-sm font-bold text-background"
          >
            AP
          </motion.span>
          <span className="font-display font-semibold tracking-tight">anshuman<span className="text-brand">.</span></span>
          <AnimatePresence>
            {taps >= 2 && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 top-11 whitespace-nowrap rounded bg-brand px-2 py-0.5 font-mono text-[10px] text-brand-foreground"
              >
                {TAPS_TO_TRAVEL - taps} more…
              </motion.span>
            )}
          </AnimatePresence>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {mounted && resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <ul className="flex flex-col px-4 pb-4">
              {links.map((l, i) => (
                <motion.li key={l.href} initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-3 font-display text-lg hover:bg-secondary"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-brand to-brand-2"
        style={{ scaleX: progress }}
      />
    </header>
  )
}
