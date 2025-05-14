"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { FadeIn } from "@/components/fade-in"
import { AnimatedBackground } from "@/components/sun-background"
import { SpotifyEmbed } from "@/components/spotify-embed"
import { RandomSongPlayer } from "@/components/random-song-player"
import { playlists } from "@/lib/playlist-data"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedText } from "@/components/animated-text"
import { Navigation } from "@/components/navigation"
import Footer from '@/components/footer'

// Define tag categories
const tagCategories = {
  "Time of Day": ["morning", "afternoon", "evening", "night", "sunrise", "sunset", "dawn", "dusk", "midnight", "noon"],
  "Mood & Energy": ["energetic", "calm", "peaceful", "relaxing", "uplifting", "dreamy", "mellow", "vibrant", "bright", "cozy"],
  "Genre & Style": ["electronic", "rock", "funk", "disco", "psychedelic", "ambient", "experimental", "trip-hop", "psytrance", "krautrock"],
  "Environment": ["nature", "urban", "coastal", "mountain", "forest", "desert", "beach", "city"],
  "Season": ["spring", "summer", "autumn", "winter"],
  "Characteristics": ["groove", "dance", "atmospheric", "cosmic", "organic", "vintage", "modern", "raw", "gritty"]
}

export default function PlaylistsPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const featuredPlaylist = playlists[0]
  const otherPlaylists = playlists.slice(1)

  // Get all unique tags from playlists and verify they exist in at least one playlist
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    playlists.forEach(playlist => {
      playlist.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  // Filter playlists based on selected tags
  const filteredPlaylists = useMemo(() => {
    if (selectedTags.length === 0) return otherPlaylists
    return otherPlaylists.filter(playlist =>
      selectedTags.every(tag => playlist.tags.includes(tag))
    )
  }, [selectedTags, otherPlaylists])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

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

      {/* Featured Playlist */}
      <section className="container my-24">
        <FadeIn>
          <h2 className="text-2xl font-semibold tracking-tight mb-8">
            <AnimatedText text="Featured Playlist" type="letter" />
          </h2>
          <div className="rounded-xl border bg-card/50 p-8 backdrop-blur-sm">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="aspect-square w-full overflow-hidden rounded-lg">
                <Image
                  src={featuredPlaylist.coverImage}
                  alt={featuredPlaylist.title}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-3xl font-semibold">{featuredPlaylist.title}</h3>
                <p className="mt-4 text-lg text-muted-foreground">{featuredPlaylist.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {featuredPlaylist.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className="rounded-full bg-card/80 px-4 py-2 text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <div className="mt-8">
                  <SpotifyEmbed url={featuredPlaylist.spotifyUrl} width="100%" height="352" />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Other Playlists */}
      <section className="container my-24">
        <FadeIn>
          <h2 className="text-2xl font-semibold tracking-tight mb-8">
            <AnimatedText text="More Playlists" type="letter" />
          </h2>
        </FadeIn>

        {/* Tag Filter Bar */}
        <div className="mb-8 space-y-4">
          {Object.entries(tagCategories).map(([category, tags]) => {
            const isExpanded = expandedCategories.includes(category)
            const categoryTags = tags.filter(tag => allTags.includes(tag))
            
            if (categoryTags.length === 0) return null

            return (
              <div key={category} className="rounded-lg border bg-card/50 p-4 backdrop-blur-sm">
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold">{category}</h3>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 flex flex-wrap gap-2">
                        {categoryTags.map((tag) => (
                          <motion.button
                            key={tag}
                            className={`rounded-full px-4 py-2 text-sm transition-colors ${
                              selectedTags.includes(tag)
                                ? "bg-primary text-primary-foreground"
                                : "bg-card/80 text-muted-foreground hover:bg-card/90"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlaylists.map((playlist, index) => (
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
