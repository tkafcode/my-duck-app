// File: src/app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import Footer from "./components/Footer"
import ClientProviders from "../components/ClientProviders"
import Header from "../app/components/Header"

export const metadata: Metadata = {
  title: "WildWood Workshop",
  description: "One-man artisanal fabrication studio.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-cream-beige text-wood-brown font-serif flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow pt-16 px-6 md:px-12 lg:px-24">
          <ClientProviders>{children}</ClientProviders>
        </main>

        <Footer className="bg-white bg-opacity-80 backdrop-blur-sm shadow-inner mt-auto" />
      </body>
    </html>
  )
}
