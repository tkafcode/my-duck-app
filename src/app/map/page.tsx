// src/app/map/page.tsx
"use client";

import { useState } from "react";
import GeocodeAddress from "./components/GeocodeAddress";
import Map from "./components/Map";
import WeatherCalendar from "./components/WeatherCalendar";

type Location = {
  lat: number;
  lng: number;
  display_name: string;
};

export default function MapPage() {
  const [location, setLocation] = useState<Location | null>(null);

  function handleSelect(raw: {
    lat: string | number;
    lon: string | number;
    display_name: string;
  }) {
    const lat = typeof raw.lat === "string" ? parseFloat(raw.lat) : raw.lat;
    const lng = typeof raw.lon === "string" ? parseFloat(raw.lon) : raw.lon;
    setLocation({ lat, lng, display_name: raw.display_name });
  }

  return (
    <div className="min-h-screen p-4 space-y-6 bg-gray-50">
      <h1 className="text-3xl font-bold">Interactive Map & Weather</h1>

      <GeocodeAddress onSelect={handleSelect} />

      {location && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{location.display_name}</h2>
          <p className="text-gray-600">
            Lat: {location.lat.toFixed(5)}, Lon: {location.lng.toFixed(5)}
          </p>

          <div className="h-64 w-full rounded-lg overflow-hidden shadow">
            <Map location={location} />
          </div>

          <WeatherCalendar coords={location} />
        </div>
      )}
    </div>
  );
}
