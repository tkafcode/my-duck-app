// src/app/api/weather/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const date = searchParams.get("date");    // ← accept an optional date

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "lat & lon required" },
      { status: 400 }
    );
  }

  try {
    const { data } = await axios.get(
      "https://api.met.no/weatherapi/locationforecast/2.0/compact",
      {
        params: { lat, lon },
        headers: {
          "User-Agent": "my-duck-app/1.0 (contact@example.com)",
        },
      }
    );

    // If no date filter, return raw API payload
    if (!date) {
      return NextResponse.json(data);
    }

    // Filter timeseries entries matching the requested date
    const targetDay = date; // "YYYY-MM-DD"
    const entries = data.properties.timeseries.filter((ts: any) => {
      const entryDay = ts.time.slice(0, 10); // first 10 chars = YYYY-MM-DD
      return entryDay === targetDay;
    });

    if (entries.length === 0) {
      return NextResponse.json(
        { error: "No data for requested date" },
        { status: 404 }
      );
    }

    // For simplicity: pick the midday entry (12:00) if available, else the first
    const midday =
      entries.find((ts: any) => ts.time.endsWith("T12:00:00Z")) || entries[0];
    const details = midday.data.instant.details;

    // Wind direction abbreviation from degrees
    function degToDir(deg: number) {
      const sectors = [
        "N","NNE","NE","ENE","E","ESE","SE","SSE",
        "S","SSW","SW","WSW","W","WNW","NW","NNW",
      ];
      const idx = Math.floor((deg / 22.5) + 0.5) % 16;
      return sectors[idx];
    }

    // Build a simplified payload
    const simplified = {
      temperature: details.air_temperature,         // °C
      wind_speed: details.wind_speed,               // m/s
      wind_dir: degToDir(details.wind_from_direction),
      summary: data.properties.timeseries[0].data.next_1_hours
        ? data.properties.timeseries[0].data.next_1_hours.summary.symbol_code.replace(/_/g," ")
        : "–",
    };

    return NextResponse.json(simplified);
  } catch (err) {
    return NextResponse.json(
      { error: "Met Norway fetch failed" },
      { status: 502 }
    );
  }
}
