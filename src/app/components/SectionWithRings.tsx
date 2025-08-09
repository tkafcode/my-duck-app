// File: src/app/components/SectionWithRings.tsx
"use client"

import React from "react"
import CanvasTreeRings from "./CanvasTreeRings"

interface SectionWithRingsProps {
  id: string
  children?: React.ReactNode
}

export default function SectionWithRings({ id, children, }: SectionWithRingsProps) {
  return (
    <section
      id={id}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Canvas fills only this section */}
      <div className="absolute inset-0 -z-10">
        <CanvasTreeRings key={id} />
      </div>

      {/* Children will be the content of this section */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {children /* renders nothing if no children passed */}
      </div>
    </section>
  )
}
