// File: src/app/planetary-hours/page.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useLocation } from "@/context/location-context"
import { useSun } from "@/context/sun-context"

const WEEKDAY_STARTERS = [
  { name: "Sunday", emoji: "☀️" },
  { name: "Monday", emoji: "🌙" },
  { name: "Tuesday", emoji: "♂️" },
  { name: "Wednesday", emoji: "☿️" },
  { name: "Thursday", emoji: "♃" },
  { name: "Friday", emoji: "♀️" },
  { name: "Saturday", emoji: "♄" },
]

const CHALDEAN_ORDER = ["♄", "♃", "♂️", "☀️", "♀️", "☿️", "🌙"]

export default function PlanetaryHoursPage() {
  const today = new Date()
  const weekdayIndex = today.getDay()
  const starterEmoji = WEEKDAY_STARTERS[weekdayIndex].emoji

  const { location } = useLocation()
  const { sunTimes } = useSun()

  const [daySlots, setDaySlots] = useState<{ emoji: string; time: string }[]>([])
  const [nightSlots, setNightSlots] = useState<{ emoji: string; time: string }[]>([])

  function buildSequence() {
    const startIdx = CHALDEAN_ORDER.indexOf(starterEmoji)
    return Array.from({ length: 24 }, (_, i) =>
      CHALDEAN_ORDER[(startIdx + i) % CHALDEAN_ORDER.length]
    )
  }

  function fmt(date: Date) {
    const h = date.getHours().toString().padStart(2, "0")
    const m = date.getMinutes().toString().padStart(2, "0")
    return `${h}:${m}`
  }

  useEffect(() => {
    const emojis = buildSequence()

    if (!location) {
      setDaySlots(emojis.slice(0, 12).map(e => ({ emoji: e, time: "" })))
      setNightSlots(emojis.slice(12, 24).map(e => ({ emoji: e, time: "" })))
      return
    }

    if (sunTimes) {
      const { sunrise, sunset } = sunTimes
      const dayDur = sunset.getTime() - sunrise.getTime()
      const nightDur = 24 * 3600e3 - dayDur

      const dayTimes = Array.from({ length: 12 }, (_, i) =>
        new Date(sunrise.getTime() + (dayDur / 12) * i)
      )
      const nightTimes = Array.from({ length: 12 }, (_, i) =>
        new Date(sunset.getTime() + (nightDur / 12) * i)
      )

      setDaySlots(dayTimes.map((dt, i) => ({
        emoji: emojis[i],
        time: fmt(dt),
      })))
      setNightSlots(nightTimes.map((dt, i) => ({
        emoji: emojis[i + 12],
        time: fmt(dt),
      })))
    } else {
      setDaySlots(emojis.slice(0, 12).map(e => ({ emoji: e, time: "" })))
      setNightSlots(emojis.slice(12, 24).map(e => ({ emoji: e, time: "" })))
    }
  }, [location, sunTimes, starterEmoji])

  const { name, emoji } = WEEKDAY_STARTERS[weekdayIndex]

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-500 to-purple-600 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">
        Today is <b>{name}</b> {emoji}
      </h1>

      {location ? (
        <p className="mb-6 text-center">
          📍 Your location: <b>{location.display_name}</b>
        </p>
      ) : (
        <Link
          href="/map"
          className="mb-6 px-5 py-2 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-100"
        >
          Enable Location
        </Link>
      )}

      <table className="w-full max-w-md border-collapse text-center">
        <thead>
          <tr>
            <th className="border px-4 py-2">Day</th>
            <th className="border px-4 py-2">Night</th>
          </tr>
        </thead>
        <tbody>
          {daySlots.map((slot, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? "bg-white/20" : ""}>
              <td className="border px-4 py-2 text-2xl">
                {slot.emoji}
                {slot.time && ` ${slot.time}`}
              </td>
              <td className="border px-4 py-2 text-2xl">
                {nightSlots[idx].emoji}
                {nightSlots[idx].time && ` ${nightSlots[idx].time}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
