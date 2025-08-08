// File: src/app/components/ScrollSections.tsx
'use client'

import React, { useEffect, useState } from "react"
import ArtistCarousel from "../artists/components/ArtistCarousel"
import { useScrollFadeIn } from "../../hooks/useScrollFadeIn"

export default function ScrollSections() {
  const heroRef = useScrollFadeIn("up", 0.8, 0)
  const getStartedRef = useScrollFadeIn("up", 0.8, 0.4)
  const artistsRef = useScrollFadeIn("up", 0.8, 0.6)

  // Scroll progress state
  const [scrollPct, setScrollPct] = useState(0)
  useEffect(() => {
    function updateProgress() {
      const scrollY = window.scrollY
      const docH = document.body.scrollHeight - window.innerHeight
      setScrollPct(Math.min(100, Math.max(0, (scrollY / docH) * 100)))
    }
    window.addEventListener("scroll", updateProgress)
    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return (
    <>
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-forest-green transition-width duration-150"
        style={{ width: `${scrollPct}%` }}
      />

      {/* ===== Hero Header (Glassmorphism) ===== */}
      <section
        ref={heroRef}
        className="
          mb-12
          bg-white/30
          backdrop-blur-xl
          border border-white/20
          rounded-2xl
          shadow-lg
          px-8 py-12
          transition-transform
          duration-700
          ease-out
        "
        style={{ clipPath: "inset(0 100% 0 0)" }}
        data-visible
      >
        <h1 className="text-5xl font-serif font-bold text-wood-brown text-center mb-4">
          WildWood Workshop
        </h1>
        <p className="prose prose-lg prose-neutral text-center">
          Handcrafting heirloom-quality pieces with patience, precision, and passion.
        </p>
      </section>

      {/* ===== Get Started (Gradient Overlay) ===== */}
      <section
        ref={getStartedRef}
        className="
          mb-12
          relative
          rounded-2xl
          overflow-hidden
          shadow-lg
        "
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cream-beige/60 to-forest-green/20"></div>
        <div className="relative bg-white/80 p-6 backdrop-blur-md">
          <h2 className="text-2xl font-serif font-semibold text-forest-green mb-4">
            Get Started
          </h2>
          <p className="prose prose-neutral text-gray-700 mb-6">
            Use the navigation above to explore our site. Learn about our one-man
            craft on the About page or venture into “Cthulhu Therapy” for a cosmic
            fabrication twist.
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <a
              href="/about"
              className="
                px-5 py-2
                bg-wood-brown text-cream-beige
                rounded-full
                shadow-neu
                hover:bg-forest-green
                transform hover:scale-105
                transition
              "
            >
              About
            </a>
            <a
              href="/cthulhu-therapy"
              className="
                px-5 py-2
                bg-wood-brown text-cream-beige
                rounded-full
                shadow-neu
                hover:bg-forest-green
                transform hover:scale-105
                transition
              "
            >
              Cthulhu Therapy
            </a>
          </div>
        </div>
      </section>

      {/* ===== Featured Artists (Horizontal Scroll Snap) ===== */}
      <section
        ref={artistsRef}
        className="
          mb-12
          bg-white
          rounded-2xl
          shadow-lg
          p-6
        "
      >
        <h2 className="text-2xl font-serif font-semibold text-forest-green mb-4">
          Featured Artists
        </h2>
        <div className="overflow-x-auto snap-x snap-mandatory space-x-4 pb-4">
          <ArtistCarousel />
        </div>
      </section>
    </>
  )
}
