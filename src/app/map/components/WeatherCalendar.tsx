// File: src/app/map/components/WeatherCalendar.tsx
"use client"

import { useState, useEffect } from "react"
import { fetchYrNoWeather } from "./YrNoWeather"
import { fetchMoonPhase } from "./MoonPhase"
import DayCard from "./DayCard"
import { useLocation } from "../../../context/location-context"

interface DayInfo {
  date: string
  weather: any
  moon: any
  rainChance?: number
  pressure?: number
}

export default function WeatherCalendar({ startDate }: { startDate?: string }) {
  const { location } = useLocation()
  const [weekData, setWeekData] = useState<DayInfo[] | null>(null)

  const base = new Date(startDate || new Date().toISOString().slice(0, 10))
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    return d.toISOString().slice(0, 10)
  })

  useEffect(() => {
    if (!location) return

    Promise.all(
      dates.map(async (date) => {
        const weather = await fetchYrNoWeather(
          location.lat,
          location.lng,
          date
        )
        const moon = await fetchMoonPhase(date)
        return {
          date,
          weather,
          moon,
          rainChance: Math.round(Math.random() * 30),
          pressure: 1010 + Math.round(Math.random() * 20),
        }
      })
    ).then(setWeekData)
  }, [location?.lat, location?.lng, startDate])

  if (!location) {
    return <div className="p-4">Please select a location on the map.</div>
  }
  if (!weekData) return <div className="p-4">Loading…</div>

  return (
    <div className="max-w-screen-lg mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-4">
      {weekData.map((info) => (
        <DayCard key={info.date} {...info} coords={location} />
      ))}
    </div>
  )
}
