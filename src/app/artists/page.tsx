// File: src/app/artists/page.tsx
import React from 'react'
import ArtistCard from '../components/ArtistCard'
import { artists } from '../components/artists'

export const metadata = {
    title: 'Featured Artists',
    description: 'Discover our diverse community of talented artisans.',
}

export default function ArtistsPage() {
    return (
        <div className="min-h-screen bg-cream-beige flex flex-col">
        <main className="flex-grow w-full max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-serif font-bold text-wood-brown mb-6">
        Featured Artists
        </h1>
        <p className="prose prose-lg prose-neutral text-gray-700 mb-8">
        Meet the talented creators whose work brings life to WildWood Workshop.
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {artists.map((artist, idx) => (
            <ArtistCard key={idx} artist={artist} />
        ))}
        </div>
        </main>
        </div>
    )
}
