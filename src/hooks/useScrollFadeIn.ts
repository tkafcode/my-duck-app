// File: src/hooks/useScrollFadeIn.ts
"use client"

import { useEffect, useRef } from "react"

type Offset = { x?: number; y?: number }

interface UseScrollFadeInProps {
  offset?: Offset
  duration?: number
  delay?: number
  threshold?: number
  rootMargin?: string
}

export function useScrollFadeIn<T extends HTMLElement>({
  offset = { y: 20 },
  duration = 0.8,
  delay = 0,
  threshold = 0.2,
  rootMargin = "0px",
}: UseScrollFadeInProps = {}) {
  const elementRef = useRef<T>(null)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const initialTransform = `translate(${offset.x ?? 0}px, ${offset.y ?? 0}px)`
    el.style.opacity = "0"
    el.style.transform = initialTransform
    el.style.transition = `
      opacity ${duration}s ease-out ${delay}s,
      transform ${duration}s ease-out ${delay}s
    `

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1"
          el.style.transform = "translate(0, 0)"
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [offset.x, offset.y, duration, delay, threshold, rootMargin])

  return elementRef
}
