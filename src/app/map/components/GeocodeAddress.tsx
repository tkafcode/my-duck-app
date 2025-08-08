// src/app/map/components/GeocodeAddress.tsx
"use client";

/**
 * File: src/app/map/components/GeocodeAddress.tsx
 */
import React, { useState, useEffect } from "react";

interface RawLocation {
  lat: string;
  lon: string;
  display_name: string;
  place_id: number;
}

interface Props {
  onSelect: (location: {
    lat: number;
    lon: number;
    display_name: string;
  }) => void;
}

export default function GeocodeAddress({ onSelect }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<RawLocation[]>([]);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [permissionState, setPermissionState] =
    useState<PermissionState>("prompt");

  // Track permission state
  useEffect(() => {
    navigator.permissions
      ?.query({ name: "geolocation" })
      .then((status) => {
        setPermissionState(status.state);
      })
      .catch(() => {});
  }, []);

  // Initial geolocation attempt
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        reverseGeocode(coords.latitude, coords.longitude),
      (err) => {
        if (err.code !== err.PERMISSION_DENIED) {
          setGeoError(err.message || "Unable to retrieve location");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  async function reverseGeocode(lat: number, lon: number) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      onSelect({
        lat,
        lon,
        display_name: data.display_name || "Unnamed location",
      });
    } catch {
      setGeoError("Reverse geocode failed");
    }
  }

  async function fetchSuggestions(q: string) {
    if (!q) return setSuggestions([]);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          q
        )}`
      );
      setSuggestions(await res.json());
    } catch {
      setGeoError("Failed to fetch suggestions");
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);
    fetchSuggestions(value);
  }

  function pick(loc: RawLocation) {
    setInputValue(loc.display_name);
    setSuggestions([]);
    onSelect({
      lat: parseFloat(loc.lat),
      lon: parseFloat(loc.lon),
      display_name: loc.display_name,
    });
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
          You’ve blocked location access. Please enable it in your browser settings.
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
  );
}
