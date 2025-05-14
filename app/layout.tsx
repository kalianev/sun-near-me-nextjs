import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"
import { CustomCursor } from "@/components/custom-cursor"
import { ClickAnimation } from "@/components/click-animation"
import { NavBar } from "@/components/nav-bar"
import { AuthProvider } from '@/contexts/AuthContext'

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
  generator: 'v0.dev',
  icons: {
    icon: [
      {
        url: '/repeat-favicon.gif',
        type: 'image/gif',
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${outfit.variable}`}>
      <head />
      <body>
        <AuthProvider>
          <ThemeProvider>
            <CustomCursor />
            <ClickAnimation />
            <NavBar />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
