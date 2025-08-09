// src/app/map/components/leafletMap.ts
"use client";

/**
 * File: src/app/map/components/leafletMap.ts
 */
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import marker images
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Configure default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

let Leaflet: typeof import("leaflet") | null = null;

async function getLeaflet() {
  if (!Leaflet) {
    Leaflet = await import("leaflet");
  }
  return Leaflet;
}

export async function createMap(
  container: HTMLDivElement,
  lat: number,
  lng: number
): Promise<import("leaflet").Map> {
  const L = await getLeaflet();

  const existing = (container as any)._leaflet_map as import("leaflet").Map | undefined;
  if (existing) {
    existing.off();
    existing.remove();
    delete (container as any)._leaflet_map;
    container.innerHTML = "";
  }

  container.style.position = "relative";
  container.style.zIndex = "0";

  const map = L.map(container).setView([lat, lng], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  (container as any)._leaflet_map = map;
  return map;
}

export async function addMarker(
  map: import("leaflet").Map | null,
  lat: number,
  lng: number
): Promise<void> {
  if (!map) {
    console.warn("addMarker called without valid map instance");
    return;
  }
  const L = await getLeaflet();

  // Remove existing markers
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Add new marker with default icon options
  const marker = L.marker([lat, lng]);
  marker.addTo(map);
}
