"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  return (
    <nav className="hidden md:flex items-center gap-8">
      <Link href="/" className="text-sm hover:text-primary transition-colors">
        Home
      </Link>
      <Link href="/blog" className="text-sm hover:text-primary transition-colors">
        Journal
      </Link>
      <Link href="/playlists" className="text-sm hover:text-primary transition-colors">
        Playlists
      </Link>
      <Link href="/trips" className="text-sm hover:text-primary transition-colors">
        Trip Planner
      </Link>
      <Link href="/explore" className="text-sm hover:text-primary transition-colors">
        Explore
      </Link>
      <ThemeToggle />
    </nav>
  )
} 