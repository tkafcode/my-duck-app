// src/app/map/components/Map.tsx
"use client";

import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { createMap, addMarker } from "./leafletMap";
import type { Map as LeafletMap } from "leaflet";

interface MapProps {
  location: { lat: number; lng: number } | null;
}

export default function Map({ location }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!location || !mapRef.current) return;

    (async () => {
      const { lat, lng } = location;

      if (!mapInstance.current) {
        mapInstance.current = await createMap(mapRef.current, lat, lng);
      } else {
        mapInstance.current.setView([lat, lng], 13);
      }

      await addMarker(mapInstance.current, lat, lng);
    })();
  }, [location]);

  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} className="h-64 w-full rounded-lg" />;
}
