"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

import { FadeIn } from "@/components/fade-in"
import { AnimatedBackground } from "@/components/sun-background"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedText } from "@/components/animated-text"
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

export default function PlaylistSurvey() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isComplete, setIsComplete] = useState(false)

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

  const handleGeneratePlaylist = () => {
    // TODO: Implement playlist generation logic
    console.log("Generating playlist with answers:", answers)
  }

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
          <Link href="/trips" className="text-sm hover:text-primary transition-colors">
            Trip Planner
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
              <h2 className="text-2xl font-semibold">Ready to Generate Your Playlist?</h2>
              <p className="mt-4 text-muted-foreground">
                Based on your preferences, we'll create a custom playlist that matches your current vibe.
              </p>
              <motion.button
                className="mt-8 rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGeneratePlaylist}
              >
                Generate Playlist
              </motion.button>
            </div>
          </FadeIn>
        )}
      </section>

      <Footer />
    </main>
  )
} 