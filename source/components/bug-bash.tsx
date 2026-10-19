"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Bug, Play, RotateCcw, Sparkles, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

type Kind = "bug" | "golden" | "feature"
type Critter = { id: number; x: number; y: number; vx: number; vy: number; kind: Kind; squashedAt?: number }
type Floater = { id: number; x: number; y: number; text: string; good: boolean }

const DURATION = 20
const SIZE = 44
const POINTS: Record<Kind, number> = { bug: 1, golden: 5, feature: -3 }
const BEST_KEY = "bugbash:best"

function verdict(score: number) {
  if (score < 5) return "Production is on fire. 🔥"
  if (score < 15) return "Shipped… with a hotfix."
  if (score < 30) return "Clean release. QA is proud."
  return "Certified 10x bug hunter. 🏆"
}

function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0
  } catch {
    return 0
  }
}

export default function BugBash() {
  const arenaRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<"idle" | "playing" | "over">("idle")
  const [critters, setCritters] = useState<Critter[]>([])
  const [floaters, setFloaters] = useState<Floater[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(DURATION)
  const [best, setBest] = useState(0)
  const [newBest, setNewBest] = useState(false)

  const crittersRef = useRef<Critter[]>([])
  const scoreRef = useRef(0)
  const nextId = useRef(0)
  const timeLeftRef = useRef(DURATION)

  useEffect(() => setBest(readBest()), [])

  const spawn = useCallback(() => {
    const arena = arenaRef.current
    if (!arena) return
    const w = arena.clientWidth - SIZE
    const h = arena.clientHeight - SIZE
    const r = Math.random()
    const kind: Kind = r < 0.08 ? "golden" : r < 0.24 ? "feature" : "bug"
    const speed = (kind === "golden" ? 220 : 90) + Math.random() * 80 + (DURATION - timeLeftRef.current) * 6
    const angle = Math.random() * Math.PI * 2
    crittersRef.current.push({
      id: nextId.current++,
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      kind,
    })
  }, [])

  const start = () => {
    crittersRef.current = []
    scoreRef.current = 0
    timeLeftRef.current = DURATION
    setScore(0)
    setTimeLeft(DURATION)
    setFloaters([])
    setNewBest(false)
    for (let i = 0; i < 3; i++) spawn()
    setState("playing")
  }

  // Game loop
  useEffect(() => {
    if (state !== "playing") return
    let raf = 0
    let last = performance.now()
    let spawnAcc = 0
    const startedAt = last

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const arena = arenaRef.current
      if (!arena) return
      const w = arena.clientWidth - SIZE
      const h = arena.clientHeight - SIZE

      const elapsed = (now - startedAt) / 1000
      const left = Math.max(0, DURATION - elapsed)
      timeLeftRef.current = left

      spawnAcc += dt
      const spawnEvery = Math.max(0.35, 0.9 - elapsed * 0.03)
      const alive = crittersRef.current.filter((c) => !c.squashedAt).length
      if (spawnAcc > spawnEvery && alive < 9) {
        spawnAcc = 0
        spawn()
      }

      crittersRef.current = crittersRef.current.filter((c) => !c.squashedAt || now - c.squashedAt < 450)
      for (const c of crittersRef.current) {
        if (c.squashedAt) continue
        if (Math.random() < 0.01) {
          const s = Math.hypot(c.vx, c.vy)
          const a = Math.atan2(c.vy, c.vx) + (Math.random() - 0.5) * 2
          c.vx = Math.cos(a) * s
          c.vy = Math.sin(a) * s
        }
        c.x += c.vx * dt
        c.y += c.vy * dt
        if (c.x < 0 || c.x > w) {
          c.vx *= -1
          c.x = Math.max(0, Math.min(w, c.x))
        }
        if (c.y < 0 || c.y > h) {
          c.vy *= -1
          c.y = Math.max(0, Math.min(h, c.y))
        }
      }
      setCritters([...crittersRef.current])
      setTimeLeft(Math.ceil(left))

      if (left <= 0) {
        setState("over")
        const prev = readBest()
        if (scoreRef.current > prev) {
          try {
            localStorage.setItem(BEST_KEY, String(scoreRef.current))
          } catch {}
          setBest(scoreRef.current)
          setNewBest(true)
        }
        return
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [state, spawn])

  const squash = (id: number) => {
    const c = crittersRef.current.find((c) => c.id === id)
    if (!c || c.squashedAt || state !== "playing") return
    c.squashedAt = performance.now()
    const pts = POINTS[c.kind]
    scoreRef.current = Math.max(0, scoreRef.current + pts)
    setScore(scoreRef.current)
    const f: Floater = {
      id: c.id,
      x: c.x,
      y: c.y,
      text: c.kind === "feature" ? "that was a feature! −3" : `+${pts}`,
      good: pts > 0,
    }
    setFloaters((fs) => [...fs, f])
    setTimeout(() => setFloaters((fs) => fs.filter((x) => x.id !== f.id)), 800)
    if (navigator.vibrate) navigator.vibrate(pts > 0 ? 15 : [30, 40, 30])
  }

  return (
    <section id="play" className="relative overflow-hidden bg-brand text-brand-foreground">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-80px" }}
        className="mb-10 text-center sm:mb-14"
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] opacity-70">Intermission · a tiny game</p>
        <h2 className="font-display text-6xl font-bold tracking-tighter sm:text-8xl">Bug Bash</h2>
        <p className="mx-auto mt-4 max-w-md opacity-80 sm:text-lg">
          Release goes out in 20 seconds. Squash every bug you can, but don&apos;t touch the features.
        </p>
      </motion.div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 font-mono text-sm">
        <div className="flex items-center gap-4">
          <span>
            score <strong className="tabular-nums">{score}</strong>
          </span>
          <span>
            time <strong className={cn("tabular-nums", timeLeft <= 5 && state === "playing" && "text-destructive")}>{timeLeft}s</strong>
          </span>
        </div>
        <span className="flex items-center gap-1.5 opacity-80">
          <Trophy className="h-4 w-4" /> best <strong className="tabular-nums">{best}</strong>
        </span>
      </div>

      <div
        ref={arenaRef}
        className="bg-grid relative h-[380px] touch-manipulation select-none overflow-hidden rounded-3xl bg-card text-foreground shadow-2xl shadow-black/30 sm:h-[460px]"
      >
        {critters.map((c) => {
          const angle = (Math.atan2(c.vy, c.vx) * 180) / Math.PI + 90
          const Icon = c.kind === "feature" ? Sparkles : Bug
          return (
            <button
              key={c.id}
              aria-label={c.kind === "feature" ? "Feature, do not squash" : "Squash bug"}
              onPointerDown={() => squash(c.id)}
              className="absolute grid place-items-center rounded-full"
              style={{
                width: SIZE,
                height: SIZE,
                transform: `translate(${c.x}px, ${c.y}px) rotate(${c.kind === "feature" ? 0 : angle}deg) scale(${c.squashedAt ? 1.6 : 1})`,
                opacity: c.squashedAt ? 0 : 1,
                transition: c.squashedAt ? "opacity .4s, transform .4s" : undefined,
              }}
            >
              <Icon
                className={cn(
                  "h-8 w-8 drop-shadow",
                  c.kind === "bug" && "text-foreground",
                  c.kind === "golden" && "text-amber-400",
                  c.kind === "feature" && "animate-pulse text-emerald-500",
                )}
              />
            </button>
          )
        })}

        <AnimatePresence>
          {floaters.map((f) => (
            <motion.span
              key={f.id}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -40 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className={cn(
                "pointer-events-none absolute whitespace-nowrap font-mono text-sm font-bold",
                f.good ? "text-brand" : "text-destructive",
              )}
              style={{ left: f.x, top: f.y }}
            >
              {f.text}
            </motion.span>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {state !== "playing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 grid place-items-center bg-background/70 p-6 text-center backdrop-blur-sm"
            >
              <div className="space-y-4">
                {state === "idle" ? (
                  <>
                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Bug className="h-5 w-5 text-foreground" /> +1</span>
                      <span className="flex items-center gap-1.5"><Bug className="h-5 w-5 text-amber-400" /> +5</span>
                      <span className="flex items-center gap-1.5"><Sparkles className="h-5 w-5 text-emerald-500" /> −3</span>
                    </div>
                    <p className="font-display text-2xl font-bold sm:text-3xl">Ready to ship?</p>
                  </>
                ) : (
                  <>
                    <p className="font-mono text-sm text-muted-foreground">{newBest ? "🎉 new personal best" : "release shipped"}</p>
                    <p className="font-display text-5xl font-bold">{score}</p>
                    <p className="text-lg">{verdict(score)}</p>
                  </>
                )}
                <button
                  onClick={start}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 font-medium text-brand-foreground transition-transform hover:scale-105"
                >
                  {state === "idle" ? <Play className="h-4 w-4" /> : <RotateCcw className="h-4 w-4" />}
                  {state === "idle" ? "Start" : "Play again"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </section>
  )
}
