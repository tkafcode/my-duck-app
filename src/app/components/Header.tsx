// File: src/app/components/Header.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/cthulhu-therapy", label: "Cthulhu Therapy" },
  ]

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <h1 className="text-2xl font-bold text-gray-800">
          Artisanal Fabrication
        </h1>

        {/* Desktop Links */}
        <nav className="hidden md:flex space-x-6">
          {links.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-md text-gray-800 transition ${
                  active
                    ? "font-semibold bg-gray-100 underline"
                    : "hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-gray-800 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t">
          <div className="flex flex-col space-y-1 px-6 py-4">
            {links.map(({ href, label }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-gray-800 transition ${
                    active
                      ? "font-semibold bg-gray-100"
                      : "hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
