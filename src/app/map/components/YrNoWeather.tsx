// src/app/map/components/YrNoWeather.ts
"use client";

/**
 * File: src/app/map/components/YrNoWeather.ts
 */

import axios from "axios";

export interface YrNoWeatherData {
  temperature: number;      // in °C
  windSpeed: number;        // in km/h
  windDirection: string;    // e.g. “NW”
  summary: string;          // e.g. “Partly cloudy”
}

/**
 * Fetches weather data from your Next.js API route.
 *
 * @param lat  Latitude
 * @param lon  Longitude
 * @param date ISO date string (YYYY-MM-DD)
 * @returns    Parsed YrNoWeatherData
 */
export async function fetchYrNoWeather(
  lat: number,
  lon: number,
  date: string
): Promise<YrNoWeatherData> {
  const response = await axios.get("/api/weather", {
    params: { lat, lon, date },
  });

  if (response.data.error) {
    throw new Error(response.data.error);
  }

  // Assuming API returns fields as: temperature, wind_speed, wind_dir, summary
  const api = response.data;
  return {
    temperature: api.temperature,
    windSpeed: api.wind_speed,
    windDirection: api.wind_dir,
    summary: api.summary,
  };
}
