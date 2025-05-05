import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"
import { CustomCursor } from "@/components/custom-cursor"
import { ClickAnimation } from "@/components/click-animation"
import { NavBar } from "@/components/nav-bar"

// Define fonts
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "Sun Near Me | Find Your Perfect Sunshine Moment",
  description: "The revolutionary app that tracks, predicts, and enhances your relationship with sunlight.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${outfit.variable}`}>
      <body>
        <ThemeProvider>
          <CustomCursor />
          <ClickAnimation />
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
