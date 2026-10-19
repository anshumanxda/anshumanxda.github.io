"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]
const FROM_YEAR = new Date().getFullYear()
const TO_YEAR = 2020
// Full file path: the Next dev server does not resolve /v1/ to its index.html.
const V1_URL = "/v1/index.html"

type TimeMachineCtx = { travel: () => void }
const Ctx = createContext<TimeMachineCtx>({ travel: () => {} })
export const useTimeMachine = () => useContext(Ctx)

export function TimeMachineProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false)
  const [year, setYear] = useState(FROM_YEAR)
  const konamiIndex = useRef(0)

  const travel = useCallback(() => setActive(true), [])

  // ↑ ↑ ↓ ↓ ← → ← → B A
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      konamiIndex.current = key === KONAMI[konamiIndex.current] ? konamiIndex.current + 1 : key === KONAMI[0] ? 1 : 0
      if (konamiIndex.current === KONAMI.length) {
        konamiIndex.current = 0
        travel()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [travel])

  useEffect(() => {
    console.log(
      "%c👾 psst. You found the console.%c\nThere's an older version of this site hiding somewhere.\nTry ↑ ↑ ↓ ↓ ← → ← → B A, or tap the logo a few times.",
      "color:#ff427f;font-size:16px;font-weight:bold",
      "color:inherit;font-size:12px",
    )
  }, [])

  useEffect(() => {
    if (!active) return
    setYear(FROM_YEAR)
    const steps = FROM_YEAR - TO_YEAR
    let i = 0
    const tick = setInterval(() => {
      i++
      setYear(FROM_YEAR - i)
      if (i >= steps) clearInterval(tick)
    }, 2000 / Math.max(steps, 1))
    const go = setTimeout(() => {
      window.location.href = V1_URL
    }, 2900)
    return () => {
      clearInterval(tick)
      clearTimeout(go)
    }
  }, [active])

  return (
    <Ctx.Provider value={{ travel }}>
      {children}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-label="Travelling back to version 1 of this site"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(false)}
          >
            <div className="scanlines pointer-events-none absolute inset-0" />
            <motion.div
              className="pointer-events-none absolute inset-x-0 h-24 bg-white/10 blur-md"
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
            />
            <div className="animate-jitter flex flex-col items-center gap-4 px-6 text-center font-mono">
              <p className="text-sm tracking-[0.4em] text-[#ff427f] sm:text-base">◀◀ REWIND</p>
              <p className="font-display text-7xl font-bold tabular-nums sm:text-9xl">{year}</p>
              <p className="max-w-xs text-xs text-white/60 sm:text-sm">
                Taking you to v1, the very first version of this site, coded back when I was a student.
              </p>
            </div>
            <p className="absolute bottom-6 text-[10px] text-white/40">tap anywhere to stay in {FROM_YEAR}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  )
}
