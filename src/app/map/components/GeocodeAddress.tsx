// File: src/app/map/components/GeocodeAddress.tsx
"use client"

import React, { useState, useEffect } from "react"
import { useLocation } from "../../../context/location-context"
import { useSun } from "../../../context/sun-context"

export default function GeocodeAddress() {
  const { setLocation } = useLocation()
  const { setSunTimes } = useSun()              // ← import sun context setter
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [geoError, setGeoError] = useState<string | null>(null)
  const [permissionState, setPermissionState] =
    useState<PermissionState>("prompt")

  useEffect(() => {
    navigator.permissions
      ?.query({ name: "geolocation" })
      .then((status) => setPermissionState(status.state))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation not supported")
      return
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => handleLocation(coords.latitude, coords.longitude),
      (err) => {
        if (err.code !== err.PERMISSION_DENIED) {
          setGeoError(err.message || "Unable to retrieve location")
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }, [])

  async function handleLocation(lat: number, lon: number) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      )
      const data = await res.json()
      const loc = {
        lat,
        lng: lon,
        display_name: data.display_name || "Unnamed location",
      }

      setLocation(loc)

      // Fetch and set sunrise/sunset immediately after storing location
      fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`
      )
        .then((r) => r.json())
        .then(({ results }) => {
          setSunTimes({
            sunrise: new Date(results.sunrise),
            sunset: new Date(results.sunset),
          })
        })
        .catch(() => {
          /* silently ignore fetch errors */
        })
    } catch {
      setGeoError("Reverse geocode failed")
    }
  }

  async function fetchSuggestions(q: string) {
    if (!q) return setSuggestions([])
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          q
        )}`
      )
      setSuggestions(await res.json())
    } catch {
      setGeoError("Failed to fetch suggestions")
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setInputValue(value)
    fetchSuggestions(value)
  }

  function pick(loc: any) {
    setInputValue(loc.display_name)
    setSuggestions([])
    handleLocation(parseFloat(loc.lat), parseFloat(loc.lon))
  }

  return (
    <div className="space-y-2 p-4">
      <input
        type="text"
        value={inputValue}
        onChange={onChange}
        placeholder="Search for address…"
        className="w-full border p-2 rounded"
      />

      {permissionState === "denied" && !inputValue && (
        <p className="text-yellow-700">
          You’ve blocked location access. Please enable it in your browser
          settings.
        </p>
      )}

      {geoError && !inputValue && permissionState !== "denied" && (
        <p className="text-red-600">Location error: {geoError}</p>
      )}

      {suggestions.length > 0 && (
        <ul className="border rounded max-h-48 overflow-auto">
          {suggestions.map((loc) => (
            <li
              key={loc.place_id}
              onClick={() => pick(loc)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {loc.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
