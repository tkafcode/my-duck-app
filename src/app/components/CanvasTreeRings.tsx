// File: src/app/components/CanvasTreeRings.tsx
"use client"

import React, { useEffect, useRef } from "react"

function throttle(fn: () => void, wait: number) {
  let last = 0
  return () => {
    const now = Date.now()
    if (now - last >= wait) {
      last = now
      fn()
    }
  }
}

export default function CanvasTreeRings() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const enhanceRef = useRef(false)

  const drawRings = () => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const { width: w, height: h } = canvas.parentElement!.getBoundingClientRect()
    canvas.width = w
    canvas.height = h
    ctx.clearRect(0, 0, w, h)

    const cx = w/2, cy = h/2, maxR = Math.hypot(cx, cy), rings = 30
    for (let i = 0; i < rings; i++) {
      const t = i / rings
      let hue = 120 + t * 60
      let light = 30 + t * 40
      if (enhanceRef.current) light = Math.min(90, light * 1.3)

      ctx.strokeStyle = `hsl(${hue},50%,${light}%)`
      ctx.lineWidth = enhanceRef.current ? 4 : 2
      ctx.beginPath()

      const steps = 200
      for (let j = 0; j <= steps; j++) {
        const θ = (j / steps) * Math.PI * 2
        const jitter = (Math.random() - 0.5) * 4
        const r = t * maxR + jitter
        const x = cx + r * Math.cos(θ)
        const y = cy + r * Math.sin(θ)
        j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.stroke()
    }
  }

  useEffect(() => {
    drawRings()
    window.addEventListener("resize", drawRings)
    return () => window.removeEventListener("resize", drawRings)
  }, [])

  useEffect(() => {
    const onEnhance = throttle(() => {
      enhanceRef.current = true
      drawRings()
      setTimeout(() => {
        enhanceRef.current = false
        drawRings()
      }, 150)
    }, 200)

    window.addEventListener("scroll", onEnhance)
    window.addEventListener("mousemove", onEnhance)
    return () => {
      window.removeEventListener("scroll", onEnhance)
      window.removeEventListener("mousemove", onEnhance)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ display: "block" }}
    />
  )
}
