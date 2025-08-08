// File: src/app/artists/components/ArtistCarousel.tsx
"use client"

import React, { useState, useRef, useEffect } from "react"
import * as use from "@tensorflow-models/universal-sentence-encoder"
import ArtistCard from "./ArtistCard"
import { artists } from "./artists"

type Artist = {
  id: number
  name: string
  bio: string
  // …other props
}

export default function ArtistCarousel() {
  const [ordered, setOrdered] = useState<Artist[]>(artists)
  const [model, setModel] = useState<use.UniversalSentenceEncoder | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // 1. Load the USE model once
  useEffect(() => {
    use.load().then(setModel)
  }, [])

  // 2. Compute embeddings & reorder when model loads
  useEffect(() => {
    if (!model) return

    async function reorder() {
      // Example user interests
      const userInterests = ["woodworking", "sculpture", "minimalist"]
      const texts = artists.map((a) => a.bio)
      const embeddings = await model.embed([...texts, ...userInterests])
      const data = await embeddings.array() as number[][]

      const artistEmbeddings = data.slice(0, artists.length)
      const interestEmbeddings = data.slice(artists.length)

      // Compute similarity score = max cosine against any interest
      const scores = artistEmbeddings.map((vec) =>
        Math.max(
          ...interestEmbeddings.map((intVec) =>
            dot(vec, intVec) / (norm(vec) * norm(intVec))
          )
        )
      )

      // Pair, sort, and update state
      const paired = artists.map((a, i) => ({ artist: a, score: scores[i] }))
      paired.sort((a, b) => b.score - a.score)
      setOrdered(paired.map((p) => p.artist))
    }

    reorder()
  }, [model])

  // Utility for dot product & norm
  const dot = (a: number[], b: number[]) =>
    a.reduce((sum, v, i) => sum + v * b[i], 0)
  const norm = (v: number[]) =>
    Math.sqrt(v.reduce((sum, x) => sum + x * x, 0))

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: "smooth" })
  }
  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <button onClick={scrollLeft} aria-label="Scroll left" className="absolute left-0 top-1/2 ...">‹</button>
      <div ref={containerRef} className="flex space-x-4 overflow-x-auto px-8">
        {ordered.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
      <button onClick={scrollRight} aria-label="Scroll right" className="absolute right-0 top-1/2 ...">›</button>
    </div>
  )
}
