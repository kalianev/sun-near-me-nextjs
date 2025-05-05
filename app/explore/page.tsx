"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MapPin, Sun, MessageSquare, Send, Filter, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

import { FadeIn } from "@/components/fade-in"
import { AnimatedBackground } from "@/components/sun-background"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedText } from "@/components/animated-text"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { useChatStore } from "@/lib/chat-store"
import { locations } from "@/lib/trip-data"
import Footer from '@/components/footer'
import LocationCard from '@/components/LocationCard'
import LocationList from '@/components/LocationList'

// Google Maps API key should be in environment variables
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.5rem"
}

const center = {
  lat: 37.7749,
  lng: -122.4194
}

interface Sunspot {
  id: string
  name: string
  description: string
  type: "indoor" | "outdoor"
  coordinates: {
    lat: number
    lng: number
  }
  image: string
  sunScore: number
  tags: string[]
}

// Mock data for sunspots
const sunspots: Sunspot[] = [
  {
    id: "1",
    name: "Rooftop Garden",
    description: "Beautiful rooftop space with panoramic city views",
    type: "outdoor",
    coordinates: {
      lat: 37.7749,
      lng: -122.4194
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 92,
    tags: ["rooftop", "south-facing", "outdoor seating"]
  },
  {
    id: "2",
    name: "Sunny Cafe",
    description: "Cozy cafe with large windows and outdoor patio",
    type: "indoor",
    coordinates: {
      lat: 37.7849,
      lng: -122.4294
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 88,
    tags: ["indoor seating", "large windows", "patio"]
  },
  {
    id: "3",
    name: "Beachfront Deck",
    description: "Stunning ocean views with comfortable seating",
    type: "outdoor",
    coordinates: {
      lat: 37.7949,
      lng: -122.4394
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 95,
    tags: ["beachfront", "sunset views", "outdoor seating"]
  },
  {
    id: "4",
    name: "Glass House",
    description: "Modern space with floor-to-ceiling windows",
    type: "indoor",
    coordinates: {
      lat: 37.7649,
      lng: -122.4094
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 90,
    tags: ["modern", "large windows", "indoor seating"]
  },
  {
    id: "5",
    name: "Mountain View Terrace",
    description: "Elevated terrace with mountain and city views",
    type: "outdoor",
    coordinates: {
      lat: 37.7549,
      lng: -122.4294
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 93,
    tags: ["terrace", "mountain views", "outdoor seating"]
  },
  {
    id: "6",
    name: "Sun Room",
    description: "Dedicated sun room with comfortable loungers",
    type: "indoor",
    coordinates: {
      lat: 37.7749,
      lng: -122.4494
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 89,
    tags: ["sun room", "indoor seating", "relaxation"]
  },
  {
    id: "7",
    name: "Park Pavilion",
    description: "Open-air pavilion in a scenic park setting",
    type: "outdoor",
    coordinates: {
      lat: 37.7849,
      lng: -122.4594
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 91,
    tags: ["pavilion", "park", "outdoor seating"]
  },
  {
    id: "8",
    name: "Conservatory",
    description: "Historic glass conservatory with tropical plants",
    type: "indoor",
    coordinates: {
      lat: 37.7949,
      lng: -122.4694
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 87,
    tags: ["conservatory", "plants", "indoor seating"]
  }
]

export default function ExplorePage() {
  const [selectedType, setSelectedType] = useState<"all" | "indoor" | "outdoor">("all")
  const [sortBy, setSortBy] = useState("sunScore")
  const [chatInput, setChatInput] = useState("")
  const { messages, addMessage } = useChatStore()
  const [showPrompts, setShowPrompts] = useState(true)

  const handleSendMessage = () => {
    if (!chatInput.trim()) return
    addMessage({ role: "user", content: chatInput })
    setChatInput("")
    setShowPrompts(false)
  }

  const handlePromptClick = (prompt: string) => {
    addMessage({ role: "user", content: prompt })
    setShowPrompts(false)
  }

  const filteredSunspots = sunspots.filter((spot) => {
    if (selectedType === "all") return true
    return spot.type === selectedType
  })

  const sortedSunspots = [...filteredSunspots].sort((a, b) => {
    if (sortBy === "sunScore") return b.sunScore - a.sunScore
    return 0
  })

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

      {/* Explore Content */}
      <section className="container my-12">
        <FadeIn>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <AnimatedText text="Explore Sun Spots" type="letter" />
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            <AnimatedText
              text="Discover the best places to soak up the sun in your area."
              delay={0.3}
            />
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* Left Column - AI Chat */}
          <div className="space-y-6">
            <FadeIn delay={0.2}>
              <Card className="p-0 overflow-hidden shadow-lg border border-border bg-card/80 backdrop-blur h-full flex flex-col" style={{ minHeight: 500, maxHeight: 600 }}>
                {/* Header */}
                <div className="flex flex-col items-center justify-center pt-6 pb-2 px-6 border-b border-border bg-card/70">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mb-2">
                    <Sun className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">Sun Seeker AI</h3>
                  <div className="text-base font-semibold mt-1">Ask About Sunny Places</div>
                  <div className="text-sm text-muted-foreground text-center mt-1 mb-2">
                    I can help you find the sunniest spots near you or answer questions about sun-optimized locations.
                  </div>
                </div>
                {/* Chat History */}
                <div className="flex-1 px-6 py-4 space-y-3 overflow-y-auto" style={{ minHeight: 0 }}>
                  {messages.length === 0 && (
                    <div className="text-muted-foreground text-sm text-center mt-12">Ask me about sunny places, best times, or compare cities!</div>
                  )}
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                        message.role === "user"
                          ? "bg-primary/10 ml-auto text-right"
                          : "bg-muted mr-auto text-left"
                      }`}
                    >
                      {message.content}
                    </div>
                  ))}
                </div>
                {/* Prompt Buttons & Input */}
                <div className="px-6 pb-6 pt-2 bg-card/80 border-t border-border flex flex-col gap-2 sticky bottom-0">
                  {showPrompts && (
                    <>
                      <div className="mb-2 text-xs font-medium text-muted-foreground">Try asking:</div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Button variant="outline" size="sm" className="rounded-full px-4 py-1 text-xs" onClick={() => handlePromptClick("Where are the top 3 cities with the most sunlight hours in California?")}>Where are the top 3 cities with the most sunlight hours in California?</Button>
                        <Button variant="outline" size="sm" className="rounded-full px-4 py-1 text-xs" onClick={() => handlePromptClick("Find me a sunny cafe with outdoor seating near me")}>Find me a sunny cafe with outdoor seating near me</Button>
                        <Button variant="outline" size="sm" className="rounded-full px-4 py-1 text-xs" onClick={() => handlePromptClick("Where can I catch the sunset in San Francisco?")}>Where can I catch the sunset in San Francisco?</Button>
                        <Button variant="outline" size="sm" className="rounded-full px-4 py-1 text-xs" onClick={() => handlePromptClick("Which nearby parks have the most shade?")}>Which nearby parks have the most shade?</Button>
                        <Button variant="outline" size="sm" className="rounded-full px-4 py-1 text-xs" onClick={() => handlePromptClick("Compare sunlight hours in SF vs LA")}>Compare sunlight hours in SF vs LA</Button>
                      </div>
                    </>
                  )}
                  <div className="flex gap-2 mt-2">
                    <Input
                      className="rounded-full px-4 py-2 text-sm border border-border bg-background/80 focus:ring-2 focus:ring-primary"
                      placeholder="Ask me about sunny places..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} className="rounded-full px-4">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  {!showPrompts && (
                    <Button variant="ghost" size="sm" className="mt-2 self-start text-xs px-2 py-1" onClick={() => setShowPrompts(true)}>
                      Show suggestions
                    </Button>
                  )}
                </div>
              </Card>
            </FadeIn>
          </div>

          {/* Middle Column - Map and Sunspots */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <FadeIn delay={0.2}>
              <Card className="p-4">
                <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY || ""}>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={12}
                  >
                    {sortedSunspots.map((spot) => (
                      <Marker
                        key={spot.id}
                        position={spot.coordinates}
                      />
                    ))}
                  </GoogleMap>
                </LoadScript>
              </Card>
            </FadeIn>

            {/* Filter Bar */}
            <FadeIn delay={0.3}>
              <div className="flex items-center justify-between">
                <Tabs value={selectedType} onValueChange={(v) => setSelectedType(v as typeof selectedType)}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="indoor">Indoor</TabsTrigger>
                    <TabsTrigger value="outdoor">Outdoor</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunScore">Sun Score</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FadeIn>

            {/* Sunspot Cards */}
            <FadeIn delay={0.4}>
              <LocationList />
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 