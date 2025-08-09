// src/app/map/components/MoonPhase.ts
"use client";

/**
 * File: src/app/map/components/MoonPhase.ts
 */
import * as SunCalc from "suncalc";

export interface MoonPhaseData {
  phaseName: string;   // e.g. "Full Moon"
  emoji: string;       // e.g. "🌕"
  description: string; // human-readable description
}

const PHASE_BUCKETS: { max: number; data: MoonPhaseData }[] = [
  {
    max: 0.03,
    data: {
      phaseName: "New Moon",
      emoji: "🌑",
      description: "The Moon is not visible in the night sky.",
    },
  },
  {
    max: 0.22,
    data: {
      phaseName: "Waxing Crescent",
      emoji: "🌒",
      description: "A sliver of the Moon is visible, waxing toward first quarter.",
    },
  },
  {
    max: 0.28,
    data: {
      phaseName: "First Quarter",
      emoji: "🌓",
      description: "Half of the Moon is illuminated, waxing phase.",
    },
  },
  {
    max: 0.47,
    data: {
      phaseName: "Waxing Gibbous",
      emoji: "🌔",
      description: "More than half of the Moon is illuminated, waxing toward full.",
    },
  },
  {
    max: 0.53,
    data: {
      phaseName: "Full Moon",
      emoji: "🌕",
      description: "The Moon is completely illuminated. A great night for stargazing!",
    },
  },
  {
    max: 0.72,
    data: {
      phaseName: "Waning Gibbous",
      emoji: "🌖",
      description: "Lessening illumination after a full Moon.",
    },
  },
  {
    max: 0.78,
    data: {
      phaseName: "Last Quarter",
      emoji: "🌗",
      description: "Half of the Moon is illuminated, waning phase.",
    },
  },
  {
    max: 0.97,
    data: {
      phaseName: "Waning Crescent",
      emoji: "🌘",
      description: "A thin crescent is visible before the new Moon.",
    },
  },
  {
    max: 1.0,
    data: {
      phaseName: "New Moon",
      emoji: "🌑",
      description: "The Moon is not visible in the night sky.",
    },
  },
];

/**
 * Calculates the moon phase on a given ISO date.
 *
 * @param dateStr ISO date string (YYYY-MM-DD)
 * @returns Parsed MoonPhaseData
 */
export async function fetchMoonPhase(dateStr: string): Promise<MoonPhaseData> {
  const date = new Date(`${dateStr}T12:00:00`);
  const { phase } = SunCalc.getMoonIllumination(date);

  // Find the first bucket where phase ≤ max
  const bucket = PHASE_BUCKETS.find((b) => phase <= b.max)!;
  return bucket.data;
}
