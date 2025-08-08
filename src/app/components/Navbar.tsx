// src/app/components/Navbar.tsx
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
    { href: "/map", label: "Map" }
  ]

  return (
    <nav className="fixed top-0 w-full z-10 bg-white bg-opacity-80 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-serif font-bold text-wood-brown">
            WildWood
          </Link>

          <div className="hidden md:flex space-x-8">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={
                  "px-3 py-2 rounded-md font-serif font-medium transition-colors " +
                  (pathname === href
                    ? "text-forest-green"
                    : "text-wood-brown hover:text-forest-green")
                }
              >
                {label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-wood-brown hover:text-forest-green focus:outline-none"
          >
            <span className="sr-only">Toggle navigation</span>
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white bg-opacity-90 border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={
                  "block px-3 py-2 rounded-md font-serif font-medium transition-colors " +
                  (pathname === href
                    ? "text-forest-green"
                    : "text-wood-brown hover:text-forest-green")
                }
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
