// File: src/app/page.tsx
import React from "react"
import SectionWithRings from "./components/SectionWithRings"
import FileTree from "./components/FileTree"
import ScrollSections from "./components/ScrollSections"

export default function LandingPage() {
  return (
    <>
      {/* Section 0: Rings only */}
      <SectionWithRings id="rings-0">
        {/* no extra content here */}
      </SectionWithRings>

      {/* Section 1: Hero */}
      <section
        id="hero"
        className="h-screen flex flex-col items-center justify-center px-8 bg-white"
      >
        <h1 className="text-6xl font-serif font-bold text-forest-green">
          WildWood Workshop
        </h1>
        <p className="mt-4 text-xl text-gray-700 max-w-xl text-center">
          Artisanal, one-man fabrication studio.
        </p>
      </section>


      {/* Section 2: Rings */}
      <SectionWithRings id="rings-1">
        {/* empty or custom overlay content */}
      </SectionWithRings>

      {/* Section 3: Scroll Sections */}
      <section className="min-h-screen py-16 bg-white">
        <ScrollSections />
      </section>

      {/* Section 4: Rings */}
      <SectionWithRings id="rings-2">
        {/* empty */}
      </SectionWithRings>

      {/* Section 5: File Tree + Footer */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-semibold text-forest-green mb-4">
            Project File Tree
          </h2>
          <FileTree />
        </div>
      </section>
    </>
  )
}
