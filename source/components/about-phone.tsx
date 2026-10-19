"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { ArrowLeft, Battery, ChevronRight, Code2, Signal, Smartphone, Wifi } from "lucide-react"
import { useTimeMachine } from "@/components/time-machine"
import { experiences, site } from "@/lib/site"
import { cn } from "@/lib/utils"

const TAPS_FOR_DEV = 7
const careerStart = new Date(2021, 10) // Nov 2021, first role at Rupyz

// The phone is a device, not the page: it keeps its own dark palette in both themes.
const screen = {
  bg: "#0d1411",
  card: "#16201b",
  line: "#22302a",
  text: "#eeeccf",
  dim: "#93a093",
  accent: "#f9d65c",
  mint: "#62cf8f",
}

function useClock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])
  return time
}

function Row({ label, value, onClick, highlight }: { label: string; value: string; onClick?: () => void; highlight?: boolean }) {
  const Tag = onClick ? "button" : "div"
  return (
    <Tag
      onClick={onClick}
      className={cn("block w-full px-5 py-2.5 text-left", onClick && "select-none transition-colors active:bg-white/5 hover:bg-white/[0.03]")}
      style={{ borderTop: `1px solid ${screen.line}` }}
    >
      <span className="block text-[13px]" style={{ color: highlight ? screen.accent : screen.text }}>
        {label}
      </span>
      <span className="mt-0.5 block text-[12px] leading-snug" style={{ color: screen.dim }}>
        {value}
      </span>
    </Tag>
  )
}

function Toggle({ label, hint, on, onChange }: { label: string; hint: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!on)} className="flex w-full items-center gap-3 px-5 py-3 text-left" style={{ borderTop: `1px solid ${screen.line}` }}>
      <span className="flex-1">
        <span className="block text-[13px]" style={{ color: screen.text }}>
          {label}
        </span>
        <span className="mt-0.5 block text-[12px]" style={{ color: screen.dim }}>
          {hint}
        </span>
      </span>
      <span className="relative h-5 w-9 shrink-0 rounded-full transition-colors" style={{ background: on ? screen.accent : screen.line }}>
        <span
          className="absolute top-0.5 h-4 w-4 rounded-full transition-all"
          style={{ left: on ? 18 : 2, background: on ? screen.bg : screen.dim }}
        />
      </span>
    </button>
  )
}

/** An Android "About phone" screen. Tap the build number 7 times, like on a real device. */
export default function AboutPhone() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-120px" })
  const [booted, setBooted] = useState(false)
  const [taps, setTaps] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const [view, setView] = useState<"about" | "dev">("about")
  const [bounds, setBounds] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const clock = useClock()
  const { travel } = useTimeMachine()
  const isDev = taps >= TAPS_FOR_DEV
  const years = Math.floor((Date.now() - careerStart.getTime()) / (365.25 * 24 * 3600 * 1000))

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setBooted(true), 2200)
    return () => clearTimeout(t)
  }, [inView])

  // "Show layout bounds" outlines every element on the real page.
  useEffect(() => {
    document.documentElement.classList.toggle("layout-bounds", bounds)
    return () => document.documentElement.classList.remove("layout-bounds")
  }, [bounds])

  const showToast = (msg: string) => {
    clearTimeout(toastTimer.current)
    setToast(msg)
    toastTimer.current = setTimeout(() => setToast(null), 1800)
  }

  const tapBuild = () => {
    if (isDev) return showToast("No need, you are already a developer.")
    const next = taps + 1
    setTaps(next)
    const left = TAPS_FOR_DEV - next
    if (left === 0) showToast("You are now a developer!")
    else if (next >= 3) showToast(`You are now ${left} step${left === 1 ? "" : "s"} away from being a developer.`)
    navigator.vibrate?.(10)
  }

  return (
    <div ref={ref} className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -4 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
        className="relative h-[600px] w-[296px] rounded-[3rem] bg-[#1b1d1c] p-[10px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5),inset_0_0_0_2px_#2c2f2d]"
      >
        {/* side buttons */}
        <span aria-hidden className="absolute -right-[3px] top-28 h-16 w-[3px] rounded-r bg-[#2c2f2d]" />
        <span aria-hidden className="absolute -right-[3px] top-48 h-10 w-[3px] rounded-r bg-[#2c2f2d]" />

        <div className="relative h-full w-full overflow-hidden rounded-[2.3rem] font-sans" style={{ background: screen.bg, color: screen.text }}>
          {/* punch-hole camera */}
          <span aria-hidden className="absolute left-1/2 top-3 z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />

          <AnimatePresence mode="wait">
            {!booted ? (
              <motion.div key="boot" exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 grid place-items-center bg-black">
                {inView && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="text-center">
                    <motion.p
                      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                      className="bg-clip-text font-mono text-xl font-bold text-transparent"
                      style={{ backgroundImage: `linear-gradient(90deg, #444 0%, ${screen.accent} 50%, #444 100%)`, backgroundSize: "200% 100%" }}
                    >
                      anshumanxda
                    </motion.p>
                    <p className="mt-2 font-mono text-[10px] tracking-[0.3em] text-white/30">CUSTOM ROM</p>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div key="os" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col">
                {/* status bar */}
                <div className="flex items-center justify-between px-6 pb-1 pt-2.5 text-[11px] font-medium" style={{ color: screen.text }}>
                  <span className="tabular-nums">{clock}</span>
                  <span className="flex items-center gap-1">
                    <Signal className="h-3 w-3" />
                    <Wifi className="h-3 w-3" />
                    <Battery className="h-3.5 w-3.5" />
                  </span>
                </div>

                <AnimatePresence mode="popLayout" initial={false}>
                  {view === "about" ? (
                    <motion.div
                      key="about"
                      initial={{ x: "-30%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "-30%", opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 overflow-y-auto [scrollbar-width:none]"
                    >
                      <p className="px-5 pb-3 pt-4 text-[24px] font-normal leading-tight">About phone</p>
                      <div className="mx-4 mb-3 flex items-center gap-3 rounded-2xl p-3.5" style={{ background: screen.card }}>
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-sm font-bold" style={{ background: screen.accent, color: screen.bg }}>
                          AP
                        </span>
                        <span>
                          <span className="block text-[15px] font-medium">{site.name}</span>
                          <span className="block text-[12px]" style={{ color: screen.dim }}>
                            @{site.handle}
                          </span>
                        </span>
                      </div>
                      <Row label="Model" value={`${experiences[0].position} · ${site.company}`} />
                      <Row label="Location" value={experiences[0].location} />
                      <Row label="Uptime" value={`${years}+ years shipping frontend`} />
                      <Row label="Firmware" value="BCA, IGNOU (2018 – 2021)" />
                      <Row label="Kernel version" value="4.9-anshumanxda · Redmi 3S (land)" />
                      <Row label="Build number" value={`APX.${new Date().getFullYear()}.${experiences.length}.0-release`} onClick={tapBuild} />
                      {isDev && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                          <button
                            onClick={() => setView("dev")}
                            className="flex w-full items-center gap-3 px-5 py-3 text-left"
                            style={{ borderTop: `1px solid ${screen.line}` }}
                          >
                            <Code2 className="h-4 w-4" style={{ color: screen.accent }} />
                            <span className="flex-1 text-[13px]" style={{ color: screen.accent }}>
                              Developer options
                            </span>
                            <ChevronRight className="h-4 w-4" style={{ color: screen.dim }} />
                          </button>
                        </motion.div>
                      )}
                      <div className="h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="dev"
                      initial={{ x: "30%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "30%", opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 overflow-y-auto"
                    >
                      <button onClick={() => setView("about")} aria-label="Back" className="ml-3 mt-3 grid h-9 w-9 place-items-center rounded-full hover:bg-white/5">
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                      <p className="px-5 pb-4 pt-2 text-[26px] font-normal leading-tight">Developer options</p>
                      <Toggle label="Show layout bounds" hint="Outline every element on this site" on={bounds} onChange={setBounds} />
                      <Row label="Bugs squashed" value="404 (estimated, conservatively)" />
                      <Row label="Coffee driver" value="Protein shakes, actually" />
                      <button onClick={travel} className="block w-full px-5 py-3 text-left" style={{ borderTop: `1px solid ${screen.line}` }}>
                        <span className="block text-[13px]" style={{ color: screen.mint }}>
                          Flash previous ROM
                        </span>
                        <span className="mt-0.5 block text-[12px]" style={{ color: screen.dim }}>
                          Boot into v1 of this website ⚠
                        </span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* nav pill */}
                <span aria-hidden className="mx-auto mb-2 mt-1 h-1 w-24 shrink-0 rounded-full bg-white/40" />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {toast && (
              <motion.p
                role="status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute inset-x-6 bottom-10 z-30 select-none rounded-2xl px-4 py-2.5 text-center text-[12px] shadow-lg"
                style={{ background: "#2b3530", color: screen.text }}
              >
                {toast}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <p className="mt-6 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
        <Smartphone className="h-3.5 w-3.5" />
        {isDev ? "developer mode unlocked. check the new menu" : "psst: tap the build number 7 times"}
      </p>
    </div>
  )
}
