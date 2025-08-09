// File: src/app/components/Header.tsx
"use client"

import { useEffect, useState } from "react"
import Navbar from "./Navbar"

export default function Header() {
  const [visible, setVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Show header once you've scrolled past the hero (one viewport height)
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY >= window.innerHeight)
    }
    window.addEventListener("scroll", onScroll)
    onScroll()   // initial check on mount
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`
        fixed top-0 w-full z-30 bg-white/90 backdrop-blur-sm border-b
        transition-opacity duration-500 ease-out
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <Navbar
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
        className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3"
      />
    </header>
  )
}
