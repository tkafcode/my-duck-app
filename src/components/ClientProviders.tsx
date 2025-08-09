// File: src/components/ClientProviders.tsx
"use client"

import { ReactNode } from "react"
import { LocationProvider } from "../context/location-context"
import { SunProvider } from "../context/sun-context"

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LocationProvider>
      <SunProvider>
        {children}
      </SunProvider>
    </LocationProvider>
  )
}
