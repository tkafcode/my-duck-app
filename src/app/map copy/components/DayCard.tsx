// src/app/map/components/DayCard.tsx
"use client";

/**
 * File: src/app/map/components/DayCard.tsx
 */
import * as SunCalc from "suncalc";
import { YrNoWeatherData } from "./YrNoWeather";
import { MoonPhaseData } from "./MoonPhase";

interface DayCardProps {
  date: string;               // "YYYY-MM-DD"
  coords: { lat: number; lng: number };
  weather: YrNoWeatherData;
  moon: MoonPhaseData;
  rainChance?: number;        // 0–100%
  pressure?: number;          // hPa
}

export default function DayCard({
  date,
  coords,
  weather,
  moon,
  rainChance,
  pressure,
}: DayCardProps) {
  const day = new Date(`${date}T12:00:00`);

  // sunrise/sunset & moonrise/moonset
  const { sunrise, sunset, moonrise, moonset } = SunCalc.getTimes(
    day,
    coords.lat,
    coords.lng
  );

  // Moon illumination data (no `age` property anymore)
  const illum = SunCalc.getMoonIllumination(day);
  // Calculate approximate age in days
  const synodicMonth = 29.53;
  const lunarAge = (illum.phase * synodicMonth).toFixed(1);

  const dt = new Date(`${date}T00:00:00`);
  const dayName = new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(dt);
  const dayNum = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(dt);

  return (
    <div className="bg-paper bg-paper-grain border border-accentGray rounded-lg p-3 divide-y divide-accentGray font-almanacBody">
      {/* Header */}
      <div className="pb-2 text-center">
        <div className="text-sm uppercase font-almanacTitle">{dayName}</div>
        <div className="text-xs italic text-accentGray">{dayNum}</div>
      </div>

      {/* Weather */}
      <div className="py-2 text-center space-y-1">
        <div className="text-lg">☁️</div>
        <div><b>{weather.temperature}°C</b></div>
        <div className="text-xs text-accentGray">
          {weather.windSpeed} km/h {weather.windDirection}
        </div>
      </div>

      {/* Moon Phase */}
      <div className="py-2 text-center space-y-1">
        <div className="text-2xl">{moon.emoji}</div>
        <div className="text-xs">{moon.phaseName}</div>
      </div>

      {/* Sun & Moon Times */}
      <div className="pt-2 text-xs space-y-1">
        <div>
          ☀️{" "}
          {sunrise.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} –{" "}
          {sunset.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div>
          🌙{" "}
          {moonrise
            ? moonrise.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "--"}{" "}
          –{" "}
          {moonset
            ? moonset.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "--"}
        </div>
      </div>

      {/* Additional Stats */}
      <div className="pt-2 text-xs space-y-1">
        {rainChance != null && <div>☔ {rainChance}%</div>}
        {pressure != null && <div>🔽 {pressure} hPa</div>}
        <div>🌓 Age: <b>{lunarAge}</b> days</div>
      </div>
    </div>
  );
}
