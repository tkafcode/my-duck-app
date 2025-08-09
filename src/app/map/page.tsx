// File: src/app/map/page.tsx
"use client"

import GeocodeAddress from "./components/GeocodeAddress"
import Map from "./components/Map"
import WeatherCalendar from "./components/WeatherCalendar"
import { useLocation } from "../../context/location-context"

export default function MapPage() {
  const { location } = useLocation()

  return (
    <div className="min-h-screen p-4 space-y-6 bg-gray-50">
      <h1 className="text-3xl font-bold">Interactive Map & Weather</h1>
      <GeocodeAddress />

      {location && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{location.display_name}</h2>
          <p className="text-gray-600">
            Lat: {location.lat.toFixed(5)}, Lon: {location.lng.toFixed(5)}
          </p>

          <div className="h-64 w-full rounded-lg overflow-hidden shadow">
            <Map />
          </div>

          <WeatherCalendar />
        </div>
      )}
    </div>
  )
}
