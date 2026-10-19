"use client"

import { useEffect, useRef } from "react"

type Particle = { x: number; y: number; hx: number; hy: number; vx: number; vy: number; a: number; d: number; c: number }

const COLOR_BUCKETS = 8

function readHsl(name: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const [h, s, l] = v.split(/\s+/).map((p) => parseFloat(p))
  return { h: h || 0, s: s || 0, l: l || 50 }
}

function bucketColors() {
  const a = readHsl("--brand")
  const b = readHsl("--brand-2")
  // Hue goes the short way around the wheel (pink → violet).
  let dh = b.h - a.h
  if (dh > 180) dh -= 360
  if (dh < -180) dh += 360
  return Array.from({ length: COLOR_BUCKETS }, (_, i) => {
    const t = i / (COLOR_BUCKETS - 1)
    return `hsl(${a.h + dh * t} ${a.s + (b.s - a.s) * t}% ${a.l + (b.l - a.l) * t}%)`
  })
}

/** Name drawn as particles that run from the pointer and scatter on scroll. Decorative only. */
export default function ParticleName({ text = "ANSHUMAN" }: { text?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let particles: Particle[] = []
    let colors = bucketColors()
    let width = 0
    let height = 0
    let dpr = 1
    let size = 2
    let raf = 0
    let visible = true
    let scatter = 0
    const pointer = { x: -9999, y: -9999 }

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = wrap.clientWidth
      height = wrap.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const off = document.createElement("canvas")
      off.width = width
      off.height = height
      const o = off.getContext("2d")!
      const family = getComputedStyle(canvas).fontFamily
      const fontSize = Math.min(height * 0.8, width / (text.length * 0.66))
      o.font = `700 ${fontSize}px ${family}`
      o.textAlign = "center"
      o.textBaseline = "middle"
      o.fillStyle = "#000"
      o.fillText(text, width / 2, height / 2)

      const gap = width < 640 ? 3 : width < 1024 ? 4 : 5
      size = Math.max(1.5, gap - 1.5)
      const data = o.getImageData(0, 0, width, height).data
      const next: Particle[] = []
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          if (data[(y * width + x) * 4 + 3] > 128) {
            const start = reduceMotion
              ? { x, y }
              : { x: Math.random() * width, y: Math.random() * height + (Math.random() > 0.5 ? height : -height) }
            next.push({
              x: start.x,
              y: start.y,
              hx: x,
              hy: y,
              vx: 0,
              vy: 0,
              a: Math.random() * Math.PI * 2,
              d: 0.4 + Math.random() * 1.2,
              c: Math.min(COLOR_BUCKETS - 1, Math.floor((x / width) * COLOR_BUCKETS)),
            })
          }
        }
      }
      particles = next
    }

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      for (let b = 0; b < COLOR_BUCKETS; b++) {
        ctx.fillStyle = colors[b]
        for (const p of particles) if (p.c === b) ctx.fillRect(p.x, p.y, size, size)
      }
    }

    const step = () => {
      const radius = Math.max(60, width * 0.08)
      const spread = Math.max(width, height) * 0.6
      for (const p of particles) {
        const tx = p.hx + Math.cos(p.a) * spread * p.d * scatter
        const ty = p.hy + Math.sin(p.a) * spread * p.d * scatter
        const dx = p.x - pointer.x
        const dy = p.y - pointer.y
        const dist2 = dx * dx + dy * dy
        if (dist2 < radius * radius) {
          const dist = Math.sqrt(dist2) || 1
          const force = (1 - dist / radius) * 6
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }
        p.vx = (p.vx + (tx - p.x) * 0.06) * 0.82
        p.vy = (p.vy + (ty - p.y) * 0.06) * 0.82
        p.x += p.vx
        p.y += p.vy
      }
      draw()
      raf = visible ? requestAnimationFrame(step) : 0
    }

    const start = () => {
      if (!reduceMotion && !raf) raf = requestAnimationFrame(step)
    }

    const setPointer = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = clientX - r.left
      pointer.y = clientY - r.top
    }
    const onPointer = (e: PointerEvent) => setPointer(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => e.touches[0] && setPointer(e.touches[0].clientX, e.touches[0].clientY)
    const clearPointer = () => {
      pointer.x = -9999
      pointer.y = -9999
    }
    const onScroll = () => {
      scatter = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)))
      if (reduceMotion) return
      start()
    }

    let lastWidth = 0
    const ro = new ResizeObserver(() => {
      // Ignore height-only changes (mobile URL bar) to avoid rebuilding on scroll.
      if (wrap.clientWidth === lastWidth) return
      lastWidth = wrap.clientWidth
      build()
      reduceMotion ? draw() : start()
    })
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    const mo = new MutationObserver(() => {
      colors = bucketColors()
      if (reduceMotion) draw()
    })

    document.fonts.ready.then(() => {
      lastWidth = wrap.clientWidth
      build()
      reduceMotion ? draw() : start()
      ro.observe(wrap)
      io.observe(wrap)
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    window.addEventListener("pointermove", onPointer, { passive: true })
    window.addEventListener("pointerdown", onPointer, { passive: true })
    window.addEventListener("touchmove", onTouch, { passive: true })
    window.addEventListener("touchend", clearPointer, { passive: true })
    document.documentElement.addEventListener("pointerleave", clearPointer)
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      window.removeEventListener("pointermove", onPointer)
      window.removeEventListener("pointerdown", onPointer)
      window.removeEventListener("touchmove", onTouch)
      window.removeEventListener("touchend", clearPointer)
      document.documentElement.removeEventListener("pointerleave", clearPointer)
      window.removeEventListener("scroll", onScroll)
    }
  }, [text])

  return (
    <div ref={wrapRef} aria-hidden className="relative h-[110px] w-full sm:h-[180px] md:h-[210px] lg:h-[240px]">
      <canvas ref={canvasRef} className="absolute inset-0 font-display" />
    </div>
  )
}
