// File: src/context/sun-context.tsx
"use client"

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

interface SunTimes {
  sunrise: Date
  sunset: Date
}

interface SunContextValue {
  sunTimes: SunTimes | null
  setSunTimes: (times: SunTimes) => void
}

const SunContext = createContext<SunContextValue | undefined>(undefined)

export function SunProvider({ children }: { children: ReactNode }) {
  const [sunTimes, setSunTimesState] = useState<SunTimes | null>(null)

  // Hydrate on mount
  useEffect(() => {
    const stored = localStorage.getItem("sun-times")
    if (stored) {
      const { sunrise, sunset } = JSON.parse(stored)
      setSunTimesState({
        sunrise: new Date(sunrise),
        sunset: new Date(sunset),
      })
    }
  }, [])

  // Persist on change
  useEffect(() => {
    if (sunTimes) {
      localStorage.setItem(
        "sun-times",
        JSON.stringify({
          sunrise: sunTimes.sunrise.toISOString(),
          sunset: sunTimes.sunset.toISOString(),
        })
      )
    }
  }, [sunTimes])

  const setSunTimes = (times: SunTimes) => {
    setSunTimesState(times)
  }

  return (
    <SunContext.Provider value={{ sunTimes, setSunTimes }}>
      {children}
    </SunContext.Provider>
  )
}

export function useSun() {
  const context = useContext(SunContext)
  if (!context) {
    throw new Error("useSun must be used within a SunProvider")
  }
  return context
}
