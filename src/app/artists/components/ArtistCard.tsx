// File: src/app/artists/components/ArtistCard.tsx
"use client"

import React from "react"
import ArtistPicture from "./ArtistPicture"
import { Artist } from "./artists"

interface ArtistCardProps {
  artist: Artist
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <div className="w-64 h-80 bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
      {/* Generated avatar */}
      <ArtistPicture size={96} />

      <h3 className="text-xl font-semibold text-wood-brown mt-4 mb-2">
        {artist.name}
      </h3>
      <p className="text-sm text-gray-600 text-center">{artist.bio}</p>
    </div>
  )
}
