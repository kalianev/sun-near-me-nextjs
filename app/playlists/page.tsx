"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

import { FadeIn } from "@/components/fade-in"
import { AnimatedBackground } from "@/components/sun-background"
import { SpotifyEmbed } from "@/components/spotify-embed"
import { playlists } from "@/lib/playlist-data"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedText } from "@/components/animated-text"

export default function PlaylistsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      {/* Header */}
      <header className="container flex items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <motion.div
            className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <span className="text-xl font-medium tracking-tight">Sun Near Me</span>
        </div>
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
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <motion.button className="text-foreground" whileTap={{ scale: 0.9 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.button>
        </div>
      </header>

      {/* Back Button */}
      <div className="container mt-8">
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <motion.div whileHover={{ x: -3 }} whileTap={{ x: -6 }}>
            <ArrowLeft className="mr-2 h-4 w-4" />
          </motion.div>
          <span>Back to home</span>
        </Link>
      </div>

      {/* Playlists Header */}
      <section className="container mt-12">
        <FadeIn>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <AnimatedText text="Sun Playlists" type="letter" />
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            <AnimatedText
              text="Custom playlists curated to accompany your sun adventures. From dawn meditations to sunset celebrations, find the perfect soundtrack for your heliocentric experiences."
              delay={0.3}
            />
          </p>
        </FadeIn>
      </section>

      {/* Featured Playlist */}
      <section className="container mt-16">
        <FadeIn>
          <h2 className="text-2xl font-semibold tracking-tight">
            <AnimatedText text="Featured Playlist" type="letter" />
          </h2>
          <motion.div
            className="mt-6 rounded-xl border bg-card/50 p-6 backdrop-blur-sm md:p-8"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <motion.div
                  className="aspect-square overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Golden Hour Vibes"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-medium">
                    <AnimatedText text="Golden Hour Vibes" type="gradient" />
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    <AnimatedText
                      text="The perfect soundtrack for that magical time when the sun bathes everything in a warm, golden glow. Featuring ambient electronic, indie folk, and atmospheric instrumentals."
                      delay={0.2}
                    />
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <motion.span
                      className="rounded-full bg-amber-500/20 px-3 py-1 text-xs text-amber-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sunset
                    </motion.span>
                    <motion.span
                      className="rounded-full bg-orange-500/20 px-3 py-1 text-xs text-orange-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Relaxing
                    </motion.span>
                    <motion.span
                      className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Atmospheric
                    </motion.span>
                  </div>
                </div>
                <div className="mt-8">
                  <SpotifyEmbed
                    url="https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn"
                    width="100%"
                    height="152"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </section>

      {/* Playlist Grid */}
      <section className="container my-16">
        <FadeIn>
          <h2 className="text-2xl font-semibold tracking-tight">
            <AnimatedText text="All Playlists" type="letter" />
          </h2>
        </FadeIn>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {playlists.map((playlist, index) => (
            <FadeIn key={playlist.id} delay={0.1 + index * 0.05}>
              <motion.div
                className="rounded-xl border bg-card/50 p-6 backdrop-blur-sm"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="aspect-square overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src={playlist.coverImage || "/placeholder.svg"}
                    alt={playlist.title}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                <h3 className="mt-4 text-xl font-medium">
                  <AnimatedText text={playlist.title} type="letter" delay={0.1 + index * 0.05} />
                </h3>
                <p className="mt-2 text-muted-foreground">{playlist.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {playlist.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className="rounded-full bg-card/80 px-3 py-1 text-xs"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <div className="mt-6">
                  <SpotifyEmbed url={playlist.spotifyUrl} width="100%" height="80" />
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container pb-12 pt-24">
        <div className="flex flex-col items-center justify-between gap-6 border-t pt-8 md:flex-row">
          <div className="flex items-center gap-2">
            <motion.div
              className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-accent"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <span className="text-sm font-medium">Sun Near Me</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <Link href="/blog" className="hover:text-foreground">
              Journal
            </Link>
            <Link href="/playlists" className="hover:text-foreground">
              Playlists
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sun Near Me. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
