// File: src/app/planetary-hours/layout.tsx

export const metadata = {
  title: "Planetary Hours",
  description: "Live display of the current time for planetary hour calculations.",
}

export default function PlanetaryHoursLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
