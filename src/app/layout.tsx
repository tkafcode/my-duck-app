// File: src/app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

export const metadata: Metadata = {
  title: "WildWood Workshop",
  description: "One-man artisanal fabrication studio.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-cream-beige text-wood-brown font-serif flex flex-col min-h-screen">
        {/* Fixed navbar with higher z-index */}
        <Navbar
          className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-80 backdrop-blur-sm shadow-md"
        />

        {/* Add top padding equal (or slightly more) to navbar height (e.g. 4rem) */}
        <main className="flex-grow pt-16 px-6 md:px-12 lg:px-24">
          {children}
        </main>

        <Footer className="bg-white bg-opacity-80 backdrop-blur-sm shadow-inner mt-auto" />
      </body>
    </html>
  )
}
