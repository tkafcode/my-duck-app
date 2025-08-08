// File: src/app/components/GetStarted.tsx
"use client";

import React, { forwardRef } from "react";
import Link from "next/link";

type GetStartedProps = {};

/**
 * Displays links to all main sections of the app,
 * occupies most of the viewport height on load.
 */
const GetStarted = forwardRef<HTMLElement, GetStartedProps>((_, ref) => {
  return (
    <section
      ref={ref}
      className="
        relative
        flex flex-col items-center justify-center
        h-[80vh] min-h-[600px]
        w-full max-w-4xl
        mx-auto
        px-6 sm:px-12
        mb-16
        bg-gradient-to-br from-cream-beige/70 to-forest-green/10
        rounded-2xl
        overflow-hidden
        shadow-xl
      "
    >
      <div className="relative z-10 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-forest-green mb-6">
          Get Started
        </h2>
        <p className="max-w-lg mx-auto text-lg sm:text-xl text-gray-700 mb-8">
          Explore every corner of our workshop. Click below to dive into each
          section and discover what we craft.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="
              px-6 py-3
              bg-wood-brown text-cream-beige
              rounded-full
              shadow-neu
              hover:bg-forest-green
              transition
            "
          >
            Home
          </Link>
          <Link
            href="/about"
            className="
              px-6 py-3
              bg-wood-brown text-cream-beige
              rounded-full
              shadow-neu
              hover:bg-forest-green
              transition
            "
          >
            About
          </Link>
          <Link
            href="/cthulhu-therapy"
            className="
              px-6 py-3
              bg-wood-brown text-cream-beige
              rounded-full
              shadow-neu
              hover:bg-forest-green
              transition
            "
          >
            Cthulhu Therapy
          </Link>
          <Link
            href="/planetary-hours"
            className="
              px-6 py-3
              bg-wood-brown text-cream-beige
              rounded-full
              shadow-neu
              hover:bg-forest-green
              transition
            "
          >
            Planetary Hours
          </Link>
          <Link
            href="/map"
            className="
              px-6 py-3
              bg-wood-brown text-cream-beige
              rounded-full
              shadow-neu
              hover:bg-forest-green
              transition
            "
          >
            Map
          </Link>
        </div>
      </div>
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
    </section>
  );
});

GetStarted.displayName = "GetStarted";

export default GetStarted;
