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
    <div className="min-h-screen bg-cream-beige flex flex-col">
      {/* Navbar is rendered by the global layout */}

      <main className="flex-grow w-full max-w-4xl mx-auto p-8">
        {/* ===== Hero Header ===== */}
        {/* (Could also delegate this into ScrollSections if desired) */}
        {/* … */}

        {/* ===== Project File Tree ===== */}
        <section className="mb-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-serif font-semibold text-forest-green mb-4">
            Project File Tree
          </h2>
          <FileTree />
        </section>

        {/* ScrollSections includes:
              - Hero Header with scroll-reveal
              - Get Started with scroll-reveal
              - Featured Artists (Carousel) with scroll-reveal */}
        <ScrollSections />

        {/* ===== Testimonials Slider ===== */}
        {/* PSEUDOCODE: Uncomment when ready
            // fetch testimonials from /api/testimonials
            // preload next slide for smooth transition
            // <TestimonialSlider data={testimonials} />
        */}

        {/* ===== Engagement Engine UI ===== */}
        {/* PSEUDOCODE: Future Engagement Engine
            // Step 1: Load TensorFlow.js & embed model on client
            //    useEffect ⇒ await tf.loadLayersModel('/models/engagement/model.json')
            // Step 2: Capture user input (text, clicks, time on section)
            //    build `<EngagementInput onSubmit={handleEngagement} />`
            // Step 3: Preprocess text ⇒ tokenize, remove stopwords
            //    integrate useTextPreprocessor() hook
            // Step 4: Compute embeddings ⇒ model.embed(userText)
            //    compute cosine similarity against reference embeddings
            // Step 5: Aggregate metrics ⇒ timeSpent * similarityScore
            //    calculate composite engagement score
            // Step 6: Display result
            //    <EngagementScore value={score} loading={false} />
            // Future: Cache embeddings in IndexedDB for offline reuse
        */}
      </main>
    </div>
  )
}
