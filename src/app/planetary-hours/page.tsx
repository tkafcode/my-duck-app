// File: src/app/planetary-hours/page.tsx
'use client'

import { useState, useEffect } from "react"

export const metadata = {
  title: "Planetary Hours",
  description: "Live display of the current time for planetary hour calculations.",
}

export default function PlanetaryHoursPage() {
  const [currentTime, setCurrentTime] = useState<string>("")

  useEffect(() => {
    function updateTime() {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      const seconds = now.getSeconds().toString().padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}:${seconds}`)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-serif font-bold mb-4">Planetary Hours</h1>
      <p className="text-2xl">
        Current Time: <b>{currentTime}</b>
      </p>
    </main>
  )
}
