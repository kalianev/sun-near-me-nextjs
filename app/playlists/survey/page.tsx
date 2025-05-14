"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"

import { FadeIn } from "@/components/fade-in"
import { AnimatedBackground } from "@/components/sun-background"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedText } from "@/components/animated-text"
import { SpotifyService } from "@/lib/spotify-api"
import { SpotifyEmbed } from "@/components/spotify-embed"
import Footer from '@/components/footer'

const questions = [
  {
    id: "timeOfDay",
    question: "What time of day is it?",
    options: ["Sunrise", "Morning", "Afternoon", "Sunset", "Night"],
  },
  {
    id: "mood",
    question: "How are you feeling?",
    options: ["Energetic", "Calm", "Reflective", "Playful", "Focused"],
  },
  {
    id: "environment",
    question: "Where are you?",
    options: ["Indoors", "Outdoors", "In Nature", "Urban Setting", "At Home"],
  },
  {
    id: "musicType",
    question: "Do you prefer lyrics or instrumental?",
    options: ["Mostly Lyrics", "Mix of Both", "Mostly Instrumental"],
  },
  {
    id: "goal",
    question: "What's your goal?",
    options: ["Relax", "Dance", "Focus", "Meditate", "Exercise"],
  },
]

function SurveyContent() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPlaylist, setGeneratedPlaylist] = useState<{ id: string; url: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for authentication error in URL
    const authError = searchParams.get('error')
    if (authError) {
      setError('Authentication failed. Please try again.')
    }

    // Check if we have an access token
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check')
        const data = await response.json()
        setIsAuthenticated(data.isAuthenticated)
      } catch (err) {
        console.error('Error checking authentication:', err)
      }
    }

    checkAuth()
  }, [searchParams])

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: answer,
    }))

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setIsComplete(true)
    }
  }

  const handleAuthenticate = () => {
    const authUrl = SpotifyService.getAuthUrl()
    window.location.href = authUrl
  }

  const handleGeneratePlaylist = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/spotify/generate-playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeOfDay: answers.timeOfDay,
          mood: answers.mood,
          environment: answers.environment,
          musicType: answers.musicType,
          goal: answers.goal,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to generate playlist')
      }

      const playlist = await response.json()
      setGeneratedPlaylist(playlist)
    } catch (err) {
      console.error('Error generating playlist:', err)
      setError('Failed to generate playlist. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      {/* Back Button */}
      <div className="container mt-8">
        <Link href="/playlists" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <motion.div whileHover={{ x: -3 }} whileTap={{ x: -6 }}>
            <ArrowLeft className="mr-2 h-4 w-4" />
          </motion.div>
          <span>Back to playlists</span>
        </Link>
      </div>

      {/* Survey Content */}
      <section className="container my-12 max-w-2xl">
        <FadeIn>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <AnimatedText text="Create Your Sun Playlist" type="letter" />
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            <AnimatedText
              text="Answer a few questions to get a personalized playlist that matches your current vibe and environment."
              delay={0.3}
            />
          </p>
        </FadeIn>

        {!isComplete ? (
          <FadeIn delay={0.2}>
            <div className="mt-12">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold">
                  <AnimatedText text={questions[currentQuestion].question} type="letter" />
                </h2>
                <div className="mt-4 flex flex-col gap-3">
                  {questions[currentQuestion].options.map((option) => (
                    <motion.button
                      key={option}
                      className="w-full rounded-lg border bg-card/50 p-4 text-left backdrop-blur-sm hover:bg-card"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
              </div>
            </div>
          </FadeIn>
        ) : (
          <FadeIn delay={0.2}>
            <div className="mt-12 text-center">
              {!isAuthenticated ? (
                <>
                  <h2 className="text-2xl font-semibold">Connect with Spotify</h2>
                  <p className="mt-4 text-muted-foreground">
                    To create your personalized playlist, we need to connect to your Spotify account.
                  </p>
                  <motion.button
                    className="mt-8 rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAuthenticate}
                  >
                    Connect Spotify
                  </motion.button>
                </>
              ) : !generatedPlaylist ? (
                <>
                  <h2 className="text-2xl font-semibold">Ready to Generate Your Playlist?</h2>
                  <p className="mt-4 text-muted-foreground">
                    Based on your preferences, we'll create a custom playlist that matches your current vibe.
                  </p>
                  <motion.button
                    className="mt-8 rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGeneratePlaylist}
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Playlist'}
                  </motion.button>
                  {error && (
                    <p className="mt-4 text-sm text-red-500">{error}</p>
                  )}
                </>
              ) : (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold">Your Playlist is Ready!</h2>
                  <p className="mt-4 text-muted-foreground">
                    Enjoy your personalized sun playlist, curated just for you.
                  </p>
                  <div className="mt-8">
                    <SpotifyEmbed
                      url={generatedPlaylist.url}
                      width="100%"
                      height="352"
                    />
                  </div>
                  <motion.button
                    className="mt-8 rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setGeneratedPlaylist(null)
                      setAnswers({})
                      setCurrentQuestion(0)
                      setIsComplete(false)
                    }}
                  >
                    Create Another Playlist
                  </motion.button>
                </div>
              )}
            </div>
          </FadeIn>
        )}
      </section>

      <Footer />
    </main>
  )
}

export default function PlaylistSurvey() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SurveyContent />
    </Suspense>
  )
} 