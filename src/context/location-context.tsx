// File: src/context/location-context.tsx
"use client"

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

type Location = {
  lat: number
  lng: number
  display_name: string
} | null

interface LocationContextValue {
  location: Location
  setLocation: (loc: Location) => void
}

const LocationContext = createContext<LocationContextValue | undefined>(
  undefined
)

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location>(null)

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("user-location")
    if (stored) {
      setLocation(JSON.parse(stored))
    }
  }, [])

  // Persist changes to localStorage
  useEffect(() => {
    if (location) {
      localStorage.setItem("user-location", JSON.stringify(location))
    }
  }, [location])

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider")
  }
  return context
}
