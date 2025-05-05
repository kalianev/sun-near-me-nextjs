"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, MapPin, Clock, Sun, Plus, Cloud, Droplets, Wind, Camera } from "lucide-react"
import { motion } from "framer-motion"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

import { FadeIn } from "@/components/fade-in"
import { AnimatedBackground } from "@/components/sun-background"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedText } from "@/components/animated-text"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { locations, recommendations } from "@/lib/trip-data"
import { Navigation } from "@/components/navigation"
import Footer from '@/components/footer'
import SunScoreBadge from '@/components/SunScoreBadge'
import { mockLocations } from '@/lib/mock-data'

// Google Maps API key should be in environment variables
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

interface Activity {
  id: string
  title: string
  time: string
  location: string
  type: "breakfast" | "walk" | "lunch" | "activity"
  coordinates: {
    lat: number
    lng: number
  }
}

const mapContainerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "0.5rem"
}

const center = {
  lat: 37.7749,
  lng: -122.4194
}

export default function TripsPage() {
  const [tripType, setTripType] = useState<"quick" | "long">("quick")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [location, setLocation] = useState("")
  const [duration, setDuration] = useState("")
  const [preferences, setPreferences] = useState<string[]>([])
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      title: "Sunrise Breakfast",
      time: "7:00 AM",
      location: "Beach Cafe",
      type: "breakfast",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
    },
    {
      id: "2",
      title: "Morning Walk",
      time: "9:00 AM",
      location: "Coastal Trail",
      type: "walk",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
    },
    {
      id: "3",
      title: "Lunch Break",
      time: "12:00 PM",
      location: "Seaside Restaurant",
      type: "lunch",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
    }
  ])

  const [itinerary, setItinerary] = useState([
    {
      id: '1',
      name: 'Breakfast at Sunshine Cafe',
      time: '9:00 AM',
      location: '123 Main St, Boston',
      sunScore: 85,
      description: 'Start your day with breakfast at this sun-filled cafe with floor-to-ceiling windows.',
      imageUrl: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg'
    },
    {
      id: '2',
      name: 'Boston Common Walk',
      time: '11:00 AM',
      location: 'Boston Common',
      sunScore: 90,
      description: 'Take a scenic walk through Boston Common during peak sunlight hours.',
      imageUrl: 'https://images.pexels.com/photos/772429/pexels-photo-772429.jpeg'
    },
    {
      id: '3',
      name: 'Rooftop Lunch',
      time: '1:00 PM',
      location: 'Rooftop Garden Restaurant',
      sunScore: 92,
      description: 'Enjoy lunch with panoramic views at this sunny rooftop venue.',
      imageUrl: 'https://images.pexels.com/photos/5997967/pexels-photo-5997967.jpeg'
    }
  ])

  const handlePreferenceChange = (pref: string) => {
    setPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    )
  }

  const handleAddActivity = (location: typeof locations[0]) => {
    const newActivity = {
      id: Date.now().toString(),
      title: location.name,
      time: location.bestTime.goldenHour,
      location: location.name,
      type: "activity" as const,
      coordinates: location.coordinates
    }
    setActivities((prev) => [...prev, newActivity])
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

      {/* Trip Planner Content */}
      <section className="container my-12">
        <FadeIn>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <AnimatedText text="Plan Your Sun Adventure" type="letter" />
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            <AnimatedText
              text="Create your perfect day with sun-optimized activities and real-time weather updates."
              delay={0.3}
            />
          </p>
        </FadeIn>

        {/* Trip Type Selection */}
        <FadeIn delay={0.2}>
          <Card className="p-6 mt-8">
            <h3 className="text-lg font-semibold mb-4">Choose Your Adventure</h3>
            <RadioGroup
              value={tripType}
              onValueChange={(value) => setTripType(value as "quick" | "long")}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="quick"
                  id="quick"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="quick"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Sun className="mb-3 h-6 w-6" />
                  <div className="space-y-1 text-center">
                    <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Quick Adventure
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Perfect for a few hours
                    </p>
                  </div>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="long"
                  id="long"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="long"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Clock className="mb-3 h-6 w-6" />
                  <div className="space-y-1 text-center">
                    <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Longer Journey
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Full day or weekend trip
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </Card>
        </FadeIn>

        {/* Trip Details Form */}
        <FadeIn delay={0.3}>
          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Trip Details</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Enter your location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
              </div>
              <div className="space-y-4">
                {tripType === "long" && (
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day</SelectItem>
                        <SelectItem value="2">2 days</SelectItem>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="4">4 days</SelectItem>
                        <SelectItem value="5">5 days</SelectItem>
                        <SelectItem value="6">6 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Preferences</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Sunrise", "Sunset", "Golden Hour", "Hiking", "Beach", "Photography"].map((pref) => (
                      <Button
                        key={pref}
                        variant={preferences.includes(pref) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePreferenceChange(pref)}
                      >
                        {pref}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* Left Column - Activities and Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weather Forecast */}
            <FadeIn delay={0.2}>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Weather Forecast</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Sun size={24} className="text-amber-500 mr-2" />
                    <div>
                      <div className="font-medium">75°F</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Sunny</div>
                    </div>
                  </div>
                  <SunScoreBadge score={92} size="lg" />
                </div>
              </Card>
            </FadeIn>

            {/* Recommendations */}
            <FadeIn delay={0.3}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Recommended Spots</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Sunrise
                    </Button>
                    <Button variant="outline" size="sm">
                      Golden Hour
                    </Button>
                    <Button variant="outline" size="sm">
                      Sunset
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {recommendations.slice(0, 6).map((rec) => (
                    <div key={rec.id} className="flex gap-4 p-4 rounded-lg border bg-card">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={rec.location.image}
                          alt={rec.location.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold truncate">{rec.location.name}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">{rec.reason}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            <Camera className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium whitespace-nowrap">{rec.bestTime}</span>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Sun className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">Sun Score: {rec.sunScore}/10</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAddActivity(rec.location)}
                            className="ml-auto"
                          >
                            Add to Plan
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Recommendations
                </Button>
              </Card>
            </FadeIn>

            {/* Itinerary Section */}
            <FadeIn delay={0.4}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Your Plan</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Activity
                  </Button>
                </div>
                <div className="space-y-4">
                  {itinerary.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <Clock size={16} className="text-slate-500 mr-2" />
                            <span className="text-sm font-medium">{activity.time}</span>
                            <SunScoreBadge score={activity.sunScore} size="sm" className="ml-3" />
                          </div>
                          <h3 className="font-medium mb-1">{activity.name}</h3>
                          <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center mb-2">
                            <MapPin size={14} className="mr-1" />
                            {activity.location}
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            {activity.description}
                          </p>
                        </div>
                        <img
                          src={activity.imageUrl}
                          alt={activity.name}
                          className="w-24 h-24 rounded-lg object-cover ml-4"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </FadeIn>
          </div>

          {/* Right Column - Map and Route Overview */}
          <div className="space-y-6">
            {/* Map */}
            <FadeIn delay={0.2}>
              <Card className="p-4">
                <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY || ""}>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={12}
                  >
                    {activities.map((activity) => (
                      <Marker
                        key={activity.id}
                        position={activity.coordinates}
                      />
                    ))}
                  </GoogleMap>
                </LoadScript>
              </Card>
            </FadeIn>

            {/* Route Overview */}
            <FadeIn delay={0.3}>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Route Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Distance</span>
                    <span className="font-semibold">3.2 miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Walking Time</span>
                    <span className="font-semibold">45 mins</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Sun Score</span>
                    <span className="font-semibold">8.5/10</span>
                  </div>
                </div>
              </Card>
            </FadeIn>

            {/* Golden Hour Recommendations */}
            <FadeIn delay={0.4}>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Golden Hour Spots</h3>
                <div className="space-y-4">
                  {locations
                    .filter((loc) => loc.activities.includes("Photography"))
                    .slice(0, 2)
                    .map((location) => (
                      <div key={location.id} className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Sun className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{location.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Best time: {location.bestTime.goldenHour}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 