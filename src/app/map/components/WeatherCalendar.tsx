// src/app/map/components/WeatherCalendar.tsx
"use client";

import { useState, useEffect } from "react";
import { fetchYrNoWeather } from "./YrNoWeather";
import { fetchMoonPhase } from "./MoonPhase";
import DayCard from "./DayCard";

interface WeatherCalendarProps {
  coords: { lat: number; lng: number };
  startDate?: string;
}

interface DayInfo {
  date: string;
  weather: any;
  moon: any;
  rainChance?: number;
  pressure?: number;
}

export default function WeatherCalendar({ coords, startDate }: WeatherCalendarProps) {
  const [weekData, setWeekData] = useState<DayInfo[] | null>(null);

  const base = new Date(startDate || new Date().toISOString().slice(0, 10));
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    return d.toISOString().slice(0, 10);
  });

  useEffect(() => {
    Promise.all(
      dates.map(async (date) => {
        const weather = await fetchYrNoWeather(coords.lat, coords.lng, date);
        const moon = await fetchMoonPhase(date);
        // TODO: fetch or calculate rainChance and pressure
        return { date, weather, moon, rainChance: Math.round(Math.random()*30), pressure: 1010 + Math.round(Math.random()*20) };
      })
    ).then(setWeekData);
  }, [coords.lat, coords.lng, startDate]);

  if (!weekData) return <div>Loading…</div>;

  return (
    <div className="max-w-screen-lg mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-4">
      {weekData.map((info) => (
        <DayCard key={info.date} {...info} coords={coords} />
      ))}
    </div>
  );
}
