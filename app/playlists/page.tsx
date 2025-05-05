"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

import { FadeIn } from "@/components/fade-in"
import { AnimatedBackground } from "@/components/sun-background"
import { SpotifyEmbed } from "@/components/spotify-embed"
import { RandomSongPlayer } from "@/components/random-song-player"
import { playlists } from "@/lib/playlist-data"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedText } from "@/components/animated-text"
import { Navigation } from "@/components/navigation"
import Footer from '@/components/footer'

export default function PlaylistsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      {/* Back Button */}
      <div className="container mt-8">
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <motion.div whileHover={{ x: -3 }} whileTap={{ x: -6 }}>
            <ArrowLeft className="mr-2 h-4 w-4" />
          </motion.div>
          <span>Back to home</span>
        </Link>
      </div>

      {/* Playlist Header */}
      <section className="container my-12">
        <FadeIn>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <AnimatedText text="Sun Playlists" type="letter" />
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            <AnimatedText
              text="Curated playlists to accompany your sun journey, whether you're watching the sunrise, enjoying a sunny afternoon, or stargazing at night."
              delay={0.3}
            />
          </p>
        </FadeIn>

        {/* Survey and Random Song Section */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <FadeIn delay={0.2}>
            <Link href="/playlists/survey" className="block">
              <motion.div
                className="rounded-xl border bg-card/50 p-6 backdrop-blur-sm"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="text-xl font-semibold">Create Your Sun Playlist</h3>
                <p className="mt-2 text-muted-foreground">
                  Answer a few questions to get a personalized playlist that matches your current vibe and environment.
                </p>
                <div className="mt-4 flex items-center text-primary">
                  <span className="text-sm font-medium">Take the survey</span>
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            </Link>
          </FadeIn>

          <FadeIn delay={0.3}>
            <RandomSongPlayer />
          </FadeIn>
        </div>
      </section>

      {/* Curated Playlists */}
      <section className="container my-24">
        <FadeIn>
          <h2 className="text-2xl font-semibold tracking-tight">
            <AnimatedText text="Curated Playlists" type="letter" />
          </h2>
        </FadeIn>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {playlists.map((playlist, index) => (
            <FadeIn key={playlist.id} delay={0.1 + index * 0.05}>
              <motion.div
                className="rounded-xl border bg-card/50 p-6 backdrop-blur-sm"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <Image
                    src={playlist.coverImage}
                    alt={playlist.title}
                    width={400}
                    height={225}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{playlist.title}</h3>
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

      <Footer />
    </main>
  )
}
