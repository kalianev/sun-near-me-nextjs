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

interface TestResult {
  archetype: string
  emoji: string
  coreLabel: string
  craving: string
  description: string
  recommendations: string[]
  activities: string[]
}

const chronotypeResults: Record<string, TestResult> = {
  sunriseLark: {
    archetype: "Sunrise Lark",
    emoji: "🌅",
    coreLabel: "Morning-type (M-type) chronotype · Matutinal / Diurnal",
    craving: "Early-morning light for mood & productivity, down time sunsets to say farewell to the light, seal their day, and rest",
    description: "You naturally wake up early and feel most energetic in the morning. Your peak alertness occurs between 5 AM and 11 AM, and melatonin fades right after dawn.",
    recommendations: [
      "First-Light Hikes—find trailheads that open before 6 AM",
      "Sunrise Café Map—discover east-facing windows and breakfast patios",
      "5-minute dawn breathing routine with mellow 'sun-salute' playlist",
      "Schedule important tasks and meetings in the morning",
      "Take advantage of early morning sunlight exposure"
    ],
    activities: [
      "Morning hikes",
      "Sunrise yoga",
      "Early bird breakfast spots",
      "Morning meditation"
    ]
  },
  solarSprinter: {
    archetype: "Solar Sprinter",
    emoji: "☀️",
    coreLabel: "Mid-day-peak diurnal (Meridianal)",
    craving: "Strong midday sun bursts",
    description: "You thrive in the midday sun with cortisol and body temperature peaking around 1 PM. You crave intense noon light bursts for optimal performance.",
    recommendations: [
      "Lunch-Break Light Spots—parks, rooftops, courtyards within 10-min walk",
      "UV-safe '45-min Power Sun' timer with SPF reminder",
      "Midday 'vitamin-D check-in' badge",
      "Remote-worker patio sessions",
      "Plan outdoor activities during peak sun hours"
    ],
    activities: [
      "Lunch break walks",
      "Outdoor meetings",
      "Midday workouts",
      "Sunbathing sessions"
    ]
  },
  goldenHourGlider: {
    archetype: "Golden-Hour Glider",
    emoji: "✨",
    coreLabel: "Late-afternoon / Vespertine–Crepuscular",
    craving: "Late-afternoon glow",
    description: "Your alertness crests between 4 PM and 7 PM. While mornings might be sluggish, you thrive in the warm glow of late afternoon light.",
    recommendations: [
      "Golden-Hour Alerts for runs, bike rides, and date ideas",
      "'Best Sunset Picnic' locator with wind + cloud scoring",
      "Auto-camera settings cheat-sheet for warm light photos",
      "Post-work bike rides",
      "Evening outdoor activities"
    ],
    activities: [
      "Sunset walks",
      "Evening bike rides",
      "Golden hour photography",
      "Outdoor dining"
    ]
  },
  nightOwlNomad: {
    archetype: "Night-Owl Nomad",
    emoji: "🌙",
    coreLabel: "Evening-type (E-type) chronotype · Nocturnal",
    craving: "Low-light/moonlight ambiance",
    description: "Your melatonin onset is delayed, and productivity peaks after dusk. You're most active into the night and prefer low-light environments.",
    recommendations: [
      "Moon-lit Paths & Safe Night Parks map",
      "Astro & city-skyline photo spots with light-pollution data",
      "Blue-light reduction tips + gentle 'wind-down' playlist",
      "Beach walks at night",
      "Neon city exploration"
    ],
    activities: [
      "Night photography",
      "Evening beach walks",
      "City nightlife",
      "Stargazing"
    ]
  },
  shiftWorkWarrior: {
    archetype: "Shift-Work Warrior",
    emoji: "⏰",
    coreLabel: "Circadian Misalignment / Shift-Work Disorder (SWD)",
    craving: "Sun fixes between odd shifts",
    description: "You work rotating or night shifts, requiring targeted light therapy to maintain circadian rhythm. Your schedule demands careful light exposure planning.",
    recommendations: [
      "Custom 'Between-Shifts Sun Dose Plan' (timed bright-light stops)",
      "24-hr cafés & gyms with skylights/windows",
      "In-app light-box hardware discounts & reminders",
      "Midnight snack spots",
      "3 PM 'first morning' sun exposure"
    ],
    activities: [
      "Shift transition walks",
      "Light therapy sessions",
      "Night shift breaks",
      "Early morning recovery"
    ]
  },
  jetLagHacker: {
    archetype: "Jet-Lag Hacker",
    emoji: "✈️",
    coreLabel: "Trans-meridian Desynchronosis",
    craving: "Light-exposure planning to reset clocks",
    description: "You frequently travel across time zones and need to manage your internal clock. Your body needs strategic light exposure to adapt to new time zones.",
    recommendations: [
      "Pre-flight Light Schedule synced to destination",
      "Post-landing 'Sun Chase' walking route to speed entrainment",
      "Adaptive 31-hr playlist trimmed to new daylight windows",
      "Travel itineraries that time outdoor stops for circadian realignment",
      "Strategic light exposure planning"
    ],
    activities: [
      "Time zone adaptation walks",
      "Strategic napping",
      "Light exposure scheduling",
      "Travel recovery routines"
    ]
  },
  polyPhasicTinkerer: {
    archetype: "Poly-Phasic Tinkerer",
    emoji: "🔄",
    coreLabel: "Polyphasic Sleep / Ultradian Segmenters",
    craving: "Custom light cues for unique sleep blocks",
    description: "You follow a polyphasic sleep schedule with multiple short sleep bouts. You rely on strategic light cues to maintain your unique sleep-wake cycle.",
    recommendations: [
      "Custom Light-Cue Scheduler—short bright-light bursts at each wake block",
      "'Micronap Zone' finder (shaded benches, quiet indoor nooks)",
      "Productivity sprints paired with targeted sun exposure",
      "Short bright 'wake windows'",
      "Blue-hour downtime recommendations"
    ],
    activities: [
      "Strategic napping",
      "Light exposure scheduling",
      "Power naps",
      "Wake window activities"
    ]
  }
}

export default function CircadianTest() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<TestResult | null>(null)

  const questions = [
    {
      id: "wakeTime",
      question: "When do you naturally wake up on days when you don't have to set an alarm?",
      options: [
        "Before 5 AM",
        "5 AM - 7 AM",
        "7 AM - 9 AM",
        "9 AM - 11 AM",
        "After 11 AM"
      ]
    },
    {
      id: "energyPeak",
      question: "When do you feel most energetic during the day?",
      options: [
        "Early morning (5 AM - 9 AM)",
        "Late morning (9 AM - 12 PM)",
        "Early afternoon (12 PM - 3 PM)",
        "Late afternoon (3 PM - 6 PM)",
        "Evening (6 PM - 9 PM)"
      ]
    },
    {
      id: "bedTime",
      question: "When do you naturally feel sleepy in the evening?",
      options: [
        "Before 9 PM",
        "9 PM - 11 PM",
        "11 PM - 1 AM",
        "1 AM - 3 AM",
        "After 3 AM"
      ]
    },
    {
      id: "productivity",
      question: "When are you most productive?",
      options: [
        "Early morning (5 AM - 9 AM)",
        "Late morning (9 AM - 12 PM)",
        "Early afternoon (12 PM - 3 PM)",
        "Late afternoon (3 PM - 6 PM)",
        "Evening (6 PM - 9 PM)"
      ]
    },
    {
      id: "schedule",
      question: "What best describes your typical schedule?",
      options: [
        "Regular 9-5 schedule",
        "Flexible work hours",
        "Rotating shifts",
        "Night shifts",
        "Frequent time zone changes"
      ]
    },
    {
      id: "sleepPattern",
      question: "How would you describe your sleep pattern?",
      options: [
        "One long sleep at night",
        "One long sleep, but at different times",
        "Multiple short sleeps throughout the day",
        "Irregular sleep pattern",
        "Adapts to different time zones"
      ]
    }
  ]

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    if (step < questions.length) {
      setStep(prev => prev + 1)
    } else {
      calculateResult()
    }
  }

  const calculateResult = () => {
    const scores = Object.values(answers)
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length

    let chronotype: keyof typeof chronotypeResults

    // Determine chronotype based on answers
    if (answers.schedule === 2) { // Rotating shifts
      chronotype = "shiftWorkWarrior"
    } else if (answers.schedule === 4) { // Frequent time zone changes
      chronotype = "jetLagHacker"
    } else if (answers.sleepPattern === 2) { // Multiple short sleeps
      chronotype = "polyPhasicTinkerer"
    } else if (averageScore <= 2) {
      chronotype = "sunriseLark"
    } else if (averageScore >= 4) {
      chronotype = "nightOwlNomad"
    } else if (answers.energyPeak === 2) { // Late morning peak
      chronotype = "solarSprinter"
    } else {
      chronotype = "goldenHourGlider"
    }

    setResult(chronotypeResults[chronotype])
  }

  const resetTest = () => {
    setStep(1)
    setAnswers({})
    setResult(null)
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

      <div className="container my-12 max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <AnimatedText text="Circadian Rhythm Test" type="letter" />
          </h1>
          <p className="mt-6 text-lg">
            <AnimatedText
              text="Discover your natural sleep-wake pattern and get personalized recommendations for optimizing your daily rhythm."
              delay={0.3}
            />
          </p>
        </FadeIn>

        {!result ? (
          <div className="mt-12">
            <div className="mb-8">
              <div className="h-2 w-full rounded-full bg-card">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / questions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Question {step} of {questions.length}
              </p>
            </div>

            <FadeIn>
              <div className="space-y-8">
                <h2 className="text-xl font-medium">
                  {questions[step - 1].question}
                </h2>
                <div className="grid gap-4">
                  {questions[step - 1].options.map((option, index) => (
                    <motion.button
                      key={option}
                      className="rounded-lg border bg-card p-4 text-left hover:bg-card/80"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(questions[step - 1].id, index + 1)}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        ) : (
          <FadeIn>
            <div className="mt-12 space-y-8">
              <div className="rounded-lg border bg-card p-8">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{result.emoji}</span>
                  <h2 className="text-2xl font-semibold">{result.archetype}</h2>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{result.coreLabel}</p>
                <p className="mt-4 text-muted-foreground">{result.description}</p>
                <p className="mt-2 text-sm italic text-muted-foreground">"{result.craving}"</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-medium">Recommendations</h3>
                <ul className="space-y-2">
                  {result.recommendations.map((recommendation, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <span>{recommendation}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-medium">Suggested Activities</h3>
                <div className="flex flex-wrap gap-2">
                  {result.activities.map((activity, index) => (
                    <motion.span
                      key={index}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {activity}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetTest}
                >
                  Take Test Again
                </motion.button>
                <Link href="/blog/circadian-rhythm-optimization">
                  <motion.button
                    className="rounded-full bg-card px-6 py-2 text-sm font-medium hover:bg-card/80"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </div>
          </FadeIn>
        )}
      </div>

      <Footer />
    </main>
  )
} 