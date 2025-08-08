// File: src/app/components/Navbar.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/cthulhu-therapy", label: "Therapy" },
    { href: "/planetary-hours", label: "Hours" },
    { href: "/map", label: "Map" },
    { href: "/artists", label: "Artists" },
    { href: "/duck", label: "Ducks" }
  ]

  return (
    <nav className="fixed top-0 w-full z-10 bg-white bg-opacity-80 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-serif font-bold text-wood-brown">
            WildWood
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {links.map(({ href, label }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={
                    "px-3 py-2 rounded-md font-serif font-medium transition-colors " +
                    (active
                      ? "text-forest-green underline"
                      : "text-wood-brown hover:text-forest-green")
                  }
                >
                  {label}
                </Link>
              )
            })}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-wood-brown hover:text-forest-green focus:outline-none"
            aria-label="Toggle navigation"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white bg-opacity-90 border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {links.map(({ href, label }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={
                    "block px-3 py-2 rounded-md font-serif font-medium transition-colors " +
                    (active
                      ? "text-forest-green bg-gray-100"
                      : "text-wood-brown hover:text-forest-green")
                  }
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
)
