"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SpotifyEmbed } from "./spotify-embed"

const SUNRISE_PLAYLIST_ID = "70kKT7h6ZLM7kDjYeIjIDF"

export function RandomSongPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayRandom = () => {
    setIsPlaying(true)
  }

  return (
    <div className="rounded-xl border bg-card/50 p-6 backdrop-blur-sm">
      <h3 className="text-xl font-semibold">Random Sunrise Song</h3>
      <p className="mt-2 text-muted-foreground">
        Need a quick dose of sunshine? Play a random song from our curated sunrise playlist.
      </p>
      {isPlaying ? (
        <div className="mt-4">
          <SpotifyEmbed
            url={`https://open.spotify.com/playlist/${SUNRISE_PLAYLIST_ID}?si=211afa6fc4004969`}
            width="100%"
            height="80"
          />
        </div>
      ) : (
        <motion.button
          className="mt-4 rounded-full bg-primary px-6 py-2 font-medium text-primary-foreground"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlayRandom}
        >
          Play Random Song
        </motion.button>
      )}
    </div>
  )
} 