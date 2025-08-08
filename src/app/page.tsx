// File: src/app/page.tsx
import React from "react"
import FileTree from "./components/FileTree"
import ScrollSections from "./components/ScrollSections"

export const metadata = {
  title: "WildWood Workshop",
  description: "Artisanal, one-man fabrication studio.",
}

export default function LandingPage() {
  return (
    <>
      {/* ===== Hero Header ===== */}
      <section
        className="
          mb-12
          flex flex-col items-center justify-center text-center
          h-screen
          px-6 sm:px-12 lg:px-24
          relative
          transform
          -translate-y-[15vh]
        "
      >
        <h1 className="whitespace-nowrap text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-forest-green leading-tight">
          WildWood Workshop
        </h1>
        <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-2xl">
          Artisanal, one-man fabrication studio.
        </p>
      </section>


      {/* ===== Scroll Sections ===== */}
      <ScrollSections />

      {/* ===== Project File Tree ===== */}
      <section className="mt-12 mb-12 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-serif font-semibold text-forest-green mb-4">
          Project File Tree
        </h2>
        <FileTree />
      </section>
    </>
  )
}
